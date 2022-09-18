const apikey = "RGAPI-a129a28e-eecc-40cd-abfb-89feae4457fa";

var region= "na1";

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
async function pullSummonerID(user, url){
     return fetch(url)
        .then(data=>{return data.json()})
        .then(result=>{
            user.summonerID = result.id;
        })
        .catch(error=>alert(error))
}

// search for summoner
async function searchSummoner() {
    summoner_input = document.getElementById("summoner_name");
    player.name = summoner_input.value;
    summonerGrab = "https://"+region+".api.riotgames.com/lol/summoner/v4/summoners/by-name/"+player.name+"?api_key="+apikey;
    await pullSummonerID(player, summonerGrab);
    alert(player.summonerID);
    alert(player.name);
}


// function to populate 
async function populate(){

}

