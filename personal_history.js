const apikey = "RGAPI-a129a28e-eecc-40cd-abfb-89feae4457fa";

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
    return fetch("https://"+morebasicregion+".api.riotgames.com/lol/match/v5/matches/by-puuid/"+user.puuid+"/ids?start=0&count=20&api_key="+apikey)
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
    summonerGrab = "https://"+region+".api.riotgames.com/lol/summoner/v4/summoners/by-name/"+player.name+"?api_key="+apikey;
    await pullSummonerID(player, summonerGrab);
    await pullMatchHistory(player);
}


// function to populate
async function populate(){

}

