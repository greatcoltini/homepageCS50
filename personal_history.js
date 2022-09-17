const apikey = "RGAPI-a129a28e-eecc-40cd-abfb-89feae4457fa";

var region= "na1";

var summonerGrab = "";

// define an array of champion name, id
var champions = [];

// define structure for a summoner object
function summoner()
{
    this.name = "";
    this.summonerID = "";
    this.rank = 0;
    this.top5 = [];
    this.lp = 0;
}

var player = new summoner();

// Function to pull summoner id from API
async function pullSummonerID(user){
    return fetch("http://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/KatEvolved?api_key=RGAPI-a129a28e-eecc-40cd-abfb-89feae4457fa")
        .then(summdata=>{return summdata.json()})
        .then(result=>{
            user.summonerID = result.id;
            alert(user.summonerID);
        })
        .catch(error=>console.log(error))
}

// search for summoner
async function searchSummoner() {
    summoner_input = document.getElementById("summoner_name");
    player.name = summoner_input.value;
    summonerGrab = "https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/KatEvolved?api_key=RGAPI-a129a28e-eecc-40cd-abfb-89feae4457fa";
    await pullSummonerID(player);
}

