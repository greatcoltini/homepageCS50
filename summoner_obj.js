const apikey = "RGAPI-bfaaca37-a788-4dce-9bf6-6aeeadae1727";

const url ="https://na1.api.riotgames.com/lol/league-exp/v4/entries/RANKED_SOLO_5x5/CHALLENGER/I?page=1&api_key="+apikey;

// define structure for a summoner object
function summoner()
{
    this.name = "";
    this.summonerID = "";
    this.rank = 0;
    this.top5 = [];
    this.lp = 0;
}

var summoners = [];

function createListSummoners() {
    for (var i = 0; i < 9; i++){
        summoners[i] = new summoner();
    }
}

// define function to pull top 10 ranked challenger players via api, allocate them to list of summoners
// grabs summoner and rank from challenger list
async function pullSummonerData() {
    return fetch(url)
        .then(data=>{return data.json()})
        .then(res=>{
            for (let i = 0; i < 9; i++)
            {
                summoners[i].name = res[i].summonerName;
                summoners[i].rank = i + 1;
                summoners[i].lp = res[i].leaguePoints;
            }})
        .catch(error=>console.log(error))
}

async function pullSummonerID(summoner){
    return fetch("https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/"+summoner.name+"?api_key="+apikey)
        .then(summdata=>{return summdata.json()})
        .then(result=>{
            summoner.summonerID = result.id;
        })
        .catch(error=>console.log(error))
}

// takes in a summoner object, and adds their top 5 most played champions
function pullTopChamps(summoner){
    return fetch("https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/"+summoner.summonerID+"/top?count=5&api_key="+apikey)
        .then(data=>{return data.json()})
        .then(res=>{
            for (let i = 0; i < 5; i++){
                summoner.top5[i] = res[i].championId;
            }
        })
        .catch(error=>console.log(error))
}



async function startup() {
    createListSummoners();
    await pullSummonerData();
    for (let i = 0; i < summoners.length; i++){
        await pullSummonerID(summoners[i]);
        await pullTopChamps(summoners[i]);
    }
    alert(summoners[0].top5);
    alert(summoners[0].summonerID);

}

window.addEventListener('load', (event) => {
    startup();
})
