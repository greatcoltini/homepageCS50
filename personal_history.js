var region= "na1";
var morebasicregion = "americas";

// define an array of champion name, id
var champions = [];

var winLoss = 0;

var won_matches = [];

var lost_matches = [];

// define structure for a summoner object
function summoner()
{
    this.name = "";
    this.puuid = "";
    this.summonerID = "";
    this.rank = 0;
    this.top5 = [];
    this.lp = 0;
}

// define structure for player in the match
function match_player()
{
    this.position = "";
    this.champion = "";
    this.name = "";
    this.kda = "";
    this.teamOrder = 0;
}

// define structure for match
function match()
{
    this.gameId = "";
    this.queueId = 0;
    this.playerId = "";
    this.champPlayed = "";
    this.victory = 0;
    this.lpGained = 0;
    this.side = "";
    this.kills = 0;
    this.deaths = 0;
    this.assists = 0;
    this.fetched = false;
    this.red_team = [];
    this.blue_team = [];
}

// Function returns a random integer between min and max inclusive
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// variables for match information
var matchHistory20 = [];
var red_team = [];
var blue_team = [];
var player = new summoner();

// Function to pull summoner id from API
function pullSummonerID(user){
     return fetch("https://"+region+".api.riotgames.com/lol/summoner/v4/summoners/by-name/"+user.name+"?api_key="+api_key_imp.key)
        .then(data=>{return data.json()})
        .then(result=>{
            user.summonerID = result.id;
            user.puuid = result.puuid;
        })
        .catch(error=>alert(error))
}

// Function to pull past 20 matches from summoner from API
function pullMatchHistory(user){
    return fetch("https://"+morebasicregion+".api.riotgames.com/lol/match/v5/matches/by-puuid/"+user.puuid+"/ids?start=0&count=20&api_key="+api_key_imp.key)
        .then(data=>{return data.json()})
        .then(result=>{
            for (let i = 0; i < result.length; i++){
                matchHistory20[i] = new match();
                matchHistory20[i].gameId = result[i];
            }
        })
        .catch(error=>alert(error))
}

// Function to pull match data from API for each match
async function pullIndividualMatch(match){
    return fetch("https://"+morebasicregion+".api.riotgames.com/lol/match/v5/matches/"+match.gameId+"?api_key="+api_key_imp.key)
        .then(data=>{return data.json()})
        .then(result=>{

            // first find participant == player
            for (let i = 0; i < 10; i++){
                if (result.info.participants[i].puuid == player.puuid){
                    match.victory = result.info.participants[i].win;
                    match.champPlayed = result.info.participants[i].championName;
                    if (result.info.participants[i].teamId == 200){
                        match.side = "Red";
                    }
                    else {
                        match.side = "Blue";
                    }
                    match.kills = result.info.participants[i].kills;
                    match.assists = result.info.participants[i].assists;
                    match.deaths = result.info.participants[i].deaths;
                }

                if (result.info.participants[i].teamId == 200) {
                    populate_team(result.info.participants[i], match.red_team);
                }
                else {
                    populate_team(result.info.participants[i], match.blue_team);
                }
            }

            match.queueId = result.info.queueId;
            match.fetched = true;
        })
        .catch(error=>alert(error))
}

// takes in a match participant, a summoner object, and a team, and fills the team with the summoner
function populate_team(match_participant, team){
    cur_player = new match_player();
    cur_player.position = match_participant.teamPosition;
    cur_player.champion = match_participant.championName;
    cur_player.name = match_participant.summonerName;
    cur_player.kda = match_participant.kills + "/" + match_participant.deaths + "/" + match_participant.assists;
    cur_player.teamOrder = set_team_order(match_participant.teamPosition);
    // set team order
    team.push(cur_player);
}

// dict for team order numeration
var team_order = {
    "TOP": 0,
    "JUNGLE": 1,
    "MIDDLE": 2,
    "BOTTOM": 3,
    "UTILITY": 4
}

var match_type = {
    420 : "RANKED SOLO QUEUE",
    440 : "RANKED FLEX QUEUE",
    700 : "CLASH"
}

// function for determining team order
function set_team_order(team_pos){
    return team_order[team_pos];
}

// takes in a team, generates their container
function generate_team_container(t, side){
    t.sort(function(a, b) {
        return parseFloat(a.teamOrder) - parseFloat(b.teamOrder);
    });

    let team_container = document.createElement("div");
    team_container.classList.add("row", "p-2", "mx-auto", "d-flex", "flex-md-row", "position-relative");

    for (let i = 0; i < 5; i++){
        team_container.append(generate_summoner_container(t[i], side));
    }

    return team_container;
}

// takes in a summoner from one team, generates their container
function generate_summoner_container(s, team_side){

    let summoner_container = document.createElement("div");
    summoner_container.classList.add("summoner_container");
    summoner_container.classList.add("rounded");

    // coloration based on the sides
    if (team_side == 0){
        summoner_container.style.backgroundColor = "#5139C6";
        summoner_container.classList.add("blue_team");
    }
    else {
        summoner_container.style.backgroundColor = "#AD0000";
        summoner_container.classList.add("red_team");
    }

    var c_ico = document.createElement("img");
    c_ico.src = "http://ddragon.leagueoflegends.com/cdn/12.17.1/img/champion/"+s.champion+".png";
    c_ico.classList.add("c_ico");

    let name_text = document.createElement("strong");
    name_text.classList.add("mb-2", "mx-auto");
    name_text.innerHTML = s.name + " - " + s.kda;

    if (s.name == player.name){
        summoner_container.classList.remove("bg-info");
        summoner_container.classList.remove("bg-warning");
        summoner_container.classList.remove("red_team");
        summoner_container.classList.remove("blue_team");
        summoner_container.classList.add("bg-success");
        summoner_container.classList.add("player");
    }

    summoner_container.append(c_ico);
    summoner_container.append(name_text);
    summoner_container.onclick = function(){
        search_for_summoner(s.name);
    };

    return summoner_container;
}

// function for searching for summoner
async function search_for_summoner(name){
    document.getElementById("summoner_name").value = name;
    await eliminateExistingMatches();
    player.name = name;
    await pullSummonerID(player);
    await pullMatchHistory(player);
    populateSummonerDisplay();
    initializeSummary();
    for (let i = 0; i < matchHistory20.length; i++)
    {
        await pullIndividualMatch(matchHistory20[i]);
        if (matchHistory20[i].fetched == true){
            populateSingleMatch(i);
        }
    }
}

// initializes the champion row
function initializeSummary(){
    let champRow = document.createElement("div");
    champRow.id = "champRow";
    champRow.classList.add("row");
    document.getElementById("display_main").append(champRow);

    let wonCol = document.createElement("div");
    wonCol.id = "wonCol";
    wonCol.classList.add("col");


    let lCol = document.createElement("div");
    lCol.id = "lCol";
    lCol.classList.add("col");

    champRow.append(wonCol, lCol);
}

function populateSummonerDisplay(){
     let display_main = document.createElement("div");
     display_main.classList.add("row", "g-0", "border", "rounded",
                            "overflow-hidden", "flex-md-row", "mb-2", "shadow-sm",
                             "h-md-300", "position-relative");
     display_main.id = "display_main";

     let win_bar = document.createElement("div");
     win_bar.classList.add("progress");

     let wins = document.createElement("div");
     wins.classList.add("progress-bar");
     wins.ariaValueMin = 0;
     wins.ariaValueMax = winLoss;
     wins.id = "wins";

     let losses = document.createElement("div");
     losses.classList.add("progress-bar");
     losses.ariaValueMin = winLoss;
     losses.ariaValueMax = 100;
     losses.classList.add("bg-danger");
     losses.id = "losses";

     win_bar.append(wins);
     win_bar.append(losses);

     display_main.append(win_bar);

     document.getElementById("matchhistory").append(display_main);
}

// search for summoner
function searchSummoner() {
    summoner_input = document.getElementById("summoner_name");
    search_for_summoner(summoner_input.value);
}

// function for key search
function keySearch(){
    if (event.code == 'Enter'){
        searchSummoner();
    }
}

// refreshes match history
function eliminateExistingMatches(){
    parent = document.getElementById("matchhistory");
    while (parent.firstChild){
        parent.removeChild(parent.firstChild);
    }
    winLoss = 0;
    return 0;
}

// change state function
function changeState(div_row){
    var nodes = div_row.getElementsByClassName("expanded");
    for(var i=0; i<nodes.length; i++) {
        if(nodes[i].classList.contains("hidden")){
            nodes[i].classList.remove("hidden");
            div_row.classList.remove("h-md-300");
        }
        else {
            nodes[i].classList.add("hidden");
            div_row.classList.add("h-md-300");
        }
    }
}

// function to populate matches into feed
function populateSingleMatch(matchNumber){
    currMatch = matchHistory20[matchNumber];

    let div_col_outer = document.createElement("mc_container");
    div_col_outer.classList.add("col-md-6");

    let div_row = document.createElement("div");
    div_row.classList.add("row", "g-0", "border", "rounded",
                        "overflow-hidden", "flex-md-row", "mb-2", "shadow-sm",
                         "h-md-300", "position-relative");

    let div_col_inner = document.createElement("div");
    div_col_inner.classList.add("col", "p-2", "d-flex", "flex-column", "position-relative", "expanded");

    let div_col_middle = document.createElement("div");
    div_col_middle.classList.add("col", "p-2", "d-flex", "flex-column", "position-relative", "expanded");

    let div_col_teams = document.createElement("div");
    div_col_teams.classList.add("col", "p-2", "d-flex", "flex-column", "position-relative", "expanded");

    let header_section = document.createElement("row");
    header_section.classList.add("header");

    let strong_text = document.createElement("strong");
    strong_text.classList.add("mb-2", "mx-auto");
    strong_text.innerHTML = "MATCH " + (matchNumber + 1);
    header_section.appendChild(strong_text);

    let q_hr = document.createElement('hr');
    let r_hr = document.createElement('hr');

    let championRow = document.getElementById("champRow");


    var img = document.createElement("img");
    img.src = "http://ddragon.leagueoflegends.com/cdn/12.17.1/img/champion/"+currMatch.champPlayed+".png";
    img.classList.add("char");
    div_col_middle.appendChild(img);

    var img2 = img;

    img2.classList.add("sChar");

    let kda_small = document.createElement("p");
    kda_small.innerHTML = "K/D/A : " + currMatch.kills + "/" + currMatch.deaths + "/" + currMatch.assists;

    if (currMatch.victory){
        div_row.classList.add("bg-primary");
        strong_text.innerHTML += " - VICTORY";
        div_row.classList.add("match_won");
        winLoss = winLoss + 1;
        won_matches.push(currMatch.champPlayed);
        document.getElementById("wonCol").append(img2, kda_small);
    }
    else {
        div_row.classList.add("bg-danger");
        strong_text.innerHTML += " - DEFEAT";
        div_row.classList.add("match_lost");
        lost_matches.push(currMatch.champPlayed);
        document.getElementById("lCol").append(img2, kda_small);
    }

    if (currMatch.queueId == 420){
        strong_text.innerHTML += " - RANKED SOLO QUEUE";
    }
    else if (currMatch.queueId == 440){
        strong_text.innerHTML += " - RANKED FLEX";
    }
    else if (currMatch.queueId == 700){
        strong_text.innerHTML += " - CLASH";
        div_row.classList.add("bg-success");
        div_row.classList.remove("bg-danger");
    }
    else{
        strong_text.innerHTML += " - REGULAR MATCH";
    }

    let more_arrow = document.createElement("i");
    more_arrow.classList.add("bi", "bi-arrow-down");
    header_section.appendChild(more_arrow);

    let kda_text = document.createElement("h3");
    kda_text.innerHTML = "K/D/A : " + currMatch.kills + "/" + currMatch.deaths + "/" + currMatch.assists;

    let champ_played = document.createElement("h3");
    champ_played = currMatch.champPlayed;

    let side_text = document.createElement("h3");
    side_text.innerHTML = currMatch.side;

    div_col_teams.append(generate_team_container(currMatch.blue_team, 0), r_hr, generate_team_container(currMatch.red_team, 1));

    document.getElementById("matchhistory").append(div_col_outer);
    div_col_outer.append(div_row);
    div_col_outer.classList.add("container");
    div_row.append(header_section, q_hr, div_col_inner, div_col_middle, div_col_teams);
    div_col_inner.append(kda_text, champ_played, side_text);



    div_row.onclick = function() {changeState(this)};

    let wins = document.getElementById("wins");
    wins.ariaValueNow = winLoss;
    wins.style.width = String(winLoss * 100 / 20) + "%";
    wins.innerHTML = winLoss + " wins out of 20.";

    let losses = document.getElementById("losses");
    losses.ariaValueNow = (100 - winLoss);
    losses.style.width = String(100 - winLoss / 20) + "%";
    losses.innerHTML = (20 - winLoss) + " losses out of 20.";

    // champ row function

}


function matches_played_champions_icons(){
    // display champions under each progress bar
     for (let i = 0; i < won_matches.length; i++){
         var img = document.createElement("img");
            img.src = "http://ddragon.leagueoflegends.com/cdn/12.17.1/img/champion/"+won_matches[i]+".png";
            img.classList.add("char");
            champRow.appendChild(img);
     }
     for (let i = 0; i < lost_matches.length; i ++){
         var img = document.createElement("img");
            img.src = "http://ddragon.leagueoflegends.com/cdn/12.17.1/img/champion/"+lost_matches[i]+".png";
            img.classList.add("char");
            champRow.appendChild(img);
     }
}