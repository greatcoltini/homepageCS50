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
function pullSummonerData() {
    var leagueData = fetch(url)
        .then(data=>{return data.json()})
        .then(res=>{
            for (let i = 0; i < 9; i++)
            {
                summoners[i].name = res[i].summonerName;
                summoners[i].rank = i + 1;
                summoners[i].lp = res[i].leaguePoints;
                var summonerData = fetch("https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/"+summoners[i].name+"?api_key="+apikey)
                    .then(summdata=>{return summdata.json()})
                    .then(result=>{
                        summoners[i].summonerID = result.id;
                    })
                    .catch(error=>alert(error))
            }
            alert(summoners[0].rank + " " + summoners[0].name);
            alert(summoners[0].summonerID);})
        .catch(error=>console.log(error))

}

window.addEventListener('load', (event) => {
    createListSummoners();
    pullSummonerData();
})
