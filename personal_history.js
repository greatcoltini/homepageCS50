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
}

// Function returns a random integer between min and max inclusive
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// list of past 20 matches
var matchHistory20 = [];

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

            playerInfo = 0;
            // first find participant == player
            for (let i = 0; i < 10; i++){
                if (result.info.participants[i].puuid == player.puuid){
                    playerInfo = i;
                }
            }
            match.victory = result.info.participants[playerInfo].win;
            match.champPlayed = result.info.participants[playerInfo].championName;
            if (result.info.participants[playerInfo].teamId == 200){
                match.side = "Red";
            }
            else {
                match.side = "Blue";
            }
            match.kills = result.info.participants[playerInfo].kills;
            match.assists = result.info.participants[playerInfo].assists;
            match.deaths = result.info.participants[playerInfo].deaths;
            match.fetched = true;
        })
        .catch(error=>alert(error))
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
//        genMatch(i);
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



    let strong_text = document.createElement("strong");
    strong_text.classList.add("mb-2", "text-primary", "mx-auto");
    strong_text.innerHTML = "MATCH " + (matchNumber + 1);



    let q_hr = document.createElement('hr');
    let r_hr = document.createElement('hr');

    if (currMatch.victory){
        div_row.classList.add("bg-success");
        strong_text.innerHTML += " - VICTORY";
    }
    else {
        div_row.classList.add("bg-danger");
        strong_text.innerHTML += " - DEFEAT";
    }

    let kda_text = document.createElement("h3");
    kda_text.innerHTML = "K/D/A : " + currMatch.kills + "/" + currMatch.deaths + "/" + currMatch.assists;

    let champ_played = document.createElement("h3");
    champ_played = currMatch.champPlayed;

    let side_text = document.createElement("h3");
    side_text.innerHTML = currMatch.side;


    document.getElementById("matchhistory").append(div_col_outer);
    div_col_outer.append(div_row);
    div_col_outer.classList.add("container");
    div_row.append(r_hr, strong_text, q_hr, div_col_inner, div_col_middle);
    div_col_inner.append(kda_text, champ_played, side_text);

    var img = document.createElement("img");
    img.src = "http://ddragon.leagueoflegends.com/cdn/12.17.1/img/champion/"+currMatch.champPlayed+".png";
    img.classList.add("char");
    div_col_middle.appendChild(img);
}

