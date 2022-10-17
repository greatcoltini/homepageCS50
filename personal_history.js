var region= "na1";
var morebasicregion = "americas";

// define an array of champion name, id
var champions = [];

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

// list of past 20 matches
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

// function for determining team order
function set_team_order(team_pos){
    if (team_pos == "TOP"){
        return 0
    }
    else if (team_pos == "JUNGLE"){
        return 1
    }
    else if (team_pos == "MIDDLE"){
        return 2
    }
    else if (team_pos == "BOTTOM"){
        return 3
    }
    else {
        return 4
    }
}

// takes in a team, generates their container
function generate_team_container(t){
    t.sort(function(a, b) {
        return parseFloat(a.teamOrder) - parseFloat(b.teamOrder);
    });

    let team_container = document.createElement("div");
    team_container.classList.add("row", "p-2", "mx-auto", "d-flex", "flex-md-row", "position-relative");

    for (let i = 0; i < 5; i++){
        team_container.append(generate_summoner_container(t[i]));
    }

    return team_container;
}

// takes in a summoner from one team, generates their container
function generate_summoner_container(s){
    let summoner_container = document.createElement("div");

    var c_ico = document.createElement("img");
    c_ico.src = "http://ddragon.leagueoflegends.com/cdn/12.17.1/img/champion/"+s.champion+".png";
    c_ico.classList.add("c_ico");

    let name_text = document.createElement("strong");
    name_text.classList.add("mb-2", "mx-auto");
    name_text.innerHTML = s.name + " - " + s.kda;

    summoner_container.append(c_ico);
    summoner_container.append(name_text);

    return summoner_container;
}

// search for summoner
async function searchSummoner() {
    await eliminateExistingMatches();
    summoner_input = document.getElementById("summoner_name");
    player.name = summoner_input.value;
    await pullSummonerID(player);
    await pullMatchHistory(player);
    for (let i = 0; i < matchHistory20.length; i++)
    {
        await pullIndividualMatch(matchHistory20[i]);
        if (matchHistory20[i].fetched == true){
            populateSingleMatch(i);
        }
    }
}

// refreshes match history
function eliminateExistingMatches(){
    parent = document.getElementById("matchhistory");
    while (parent.firstChild){
        parent.removeChild(parent.firstChild);
    }
    return 0;
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
    div_col_inner.classList.add("col", "p-2", "d-flex", "flex-column", "position-relative");

    let div_col_middle = document.createElement("div");
    div_col_middle.classList.add("col", "p-2", "d-flex", "flex-column", "position-relative");

    let div_col_teams = document.createElement("div");
    div_col_teams.classList.add("col", "p-2", "d-flex", "flex-column", "position-relative");



    let strong_text = document.createElement("strong");
    strong_text.classList.add("mb-2", "text-primary", "mx-auto");
    strong_text.innerHTML = "MATCH " + (matchNumber + 1);



    let q_hr = document.createElement('hr');
    let r_hr = document.createElement('hr');

    if (currMatch.victory){
        div_row.classList.add("bg-primary");
        strong_text.innerHTML += " - VICTORY";
        div_row.classList.add("match_won");
        div_col_inner.classList.add("match_won");
        div_col_middle.classList.add("match_won");
        div_col_teams.classList.add("match_won");
    }
    else {
        div_row.classList.add("bg-danger");
        strong_text.innerHTML += " - DEFEAT";
        div_row.classList.add("match_lost");
        div_col_inner.classList.add("match_lost");
        div_col_middle.classList.add("match_lost");
        div_col_teams.classList.add("match_lost");
    }

    let kda_text = document.createElement("h3");
    kda_text.innerHTML = "K/D/A : " + currMatch.kills + "/" + currMatch.deaths + "/" + currMatch.assists;

    let champ_played = document.createElement("h3");
    champ_played = currMatch.champPlayed;

    let side_text = document.createElement("h3");
    side_text.innerHTML = currMatch.side;

    div_col_teams.append(generate_team_container(currMatch.blue_team), generate_team_container(currMatch.red_team));


    document.getElementById("matchhistory").append(div_col_outer);
    div_col_outer.append(div_row);
    div_col_outer.classList.add("container");
    div_row.append(r_hr, strong_text, q_hr, div_col_inner, div_col_middle, div_col_teams);
    div_col_inner.append(kda_text, champ_played, side_text);

    var img = document.createElement("img");
    img.src = "http://ddragon.leagueoflegends.com/cdn/12.17.1/img/champion/"+currMatch.champPlayed+".png";
    img.classList.add("char");
    div_col_middle.appendChild(img);
}

