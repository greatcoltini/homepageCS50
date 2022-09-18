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
//function match()
//{
//    this.
//}

// list of past 20 matches
var matchHistory20 = [];

var player = new summoner();

// Function to pull summoner id from API
async function pullSummonerID(user, url){
     return fetch(url)
        .then(data=>{return data.json()})
        .then(result=>{
            user.summonerID = result.id;
            user.puuid = result.puuid;
        })
        .catch(error=>alert(error))
}

// Function to pull past 20 matches from summoner from API
async function pullMatchHistory(user){
    return fetch("https://"+morebasicregion+".api.riotgames.com/lol/match/v5/matches/by-puuid/"+user.puuid+"/ids?start=0&count=20&api_key="+api_key_imp.key)
        .then(data=>{return data.json()})
        .then(result=>{
            for (let i = 0; i < result.length; i++){
                matchHistory20[i] = result[i];
            }
        })
        .catch(error=>alert(error))
}

// search for summoner
async function searchSummoner() {
    summoner_input = document.getElementById("summoner_name");
    player.name = summoner_input.value;
    summonerGrab = "https://"+region+".api.riotgames.com/lol/summoner/v4/summoners/by-name/"+player.name+"?api_key="+api_key_imp.key;
    await pullSummonerID(player, summonerGrab);
    await pullMatchHistory(player);
    for (let i = 0; i < matchHistory20.length; i++)
    {
        populateSingleMatch(i);
    }
}


// function to populate matches into feed
function populateSingleMatch(matchNumber){

    let div_col_outer = document.createElement("mc_container");
    div_col_outer.classList.add("col-md-6");

    let div_row = document.createElement("div");
    div_row.classList.add("row", "g-0", "border", "rounded",
                        "overflow-hidden", "flex-md-row", "mb-4", "shadow-sm",
                         "h-md-600", "position-relative");

    let div_col_inner = document.createElement("div");
    div_col_inner.classList.add("col", "p-4", "d-flex", "flex-column", "position-static");

    let strong_text = document.createElement("strong");
    strong_text.classList.add("d-inline-block", "mb-2", "text-primary");
    strong_text.innerHTML = "MATCH " + (matchNumber + 1);

    let q_hr = document.createElement('hr');

    document.getElementById("matchhistory").append(div_col_outer);
    div_col_outer.append(div_row);
    div_col_outer.classList.add("container");
    div_row.append(div_col_inner);
    div_col_inner.append(strong_text, q_hr);
}

