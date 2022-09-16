//const apikey = "RGAPI-a6fe8dac-088b-4944-a3fb-4dcf28e0c3bd";
//
//var region="na1";
//
var url ="https://"+region+".api.riotgames.com/lol/league-exp/v4/entries/RANKED_SOLO_5x5/CHALLENGER/I?page=1&api_key="+apikey;
//
//// define an array of champion name, id
//var champions = [];
//
//// define structure for a summoner object
//function summoner()
//{
//    this.name = "";
//    this.summonerID = "";
//    this.rank = 0;
//    this.top5 = [];
//    this.lp = 0;
//}
//
var player = new summoner();
//
//// grabs summoner and rank from challenger list
//async function pullSummonerData() {
//    return fetch(url)
//        .then(data=>{return data.json()})
//        .then(res=>{
//            player.name = res.summonerName;
//            player.rank = i + 1;
//            player.lp = res.leaguePoints;
//            }})
//        .catch(error=>console.log(error))
//}
//
//// Function to pull summoner id from API
//async function pullSummonerID(summoner){
//    return fetch("https://"+region+".api.riotgames.com/lol/summoner/v4/summoners/by-name/"+summoner.name+"?api_key="+apikey)
//        .then(summdata=>{return summdata.json()})
//        .then(result=>{
//            summoner.summonerID = result.id;
//        })
//        .catch(error=>console.log(error))
//}
//
//// takes in a summoner object, and adds their top 5 most played champions
//async function pullTopChamps(summoner){
//    return fetch("https://"+region+".api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/"+summoner.summonerID+"/top?count=5&api_key="+apikey)
//        .then(data=>{return data.json()})
//        .then(res=>{
//            for (let i = 0; i < 5; i++){
//                summoner.top5[i] = res[i].championId;
//            }
//        })
//        .catch(error=>console.log(error))
//}
//
//// import champions.json
//async function readChampionsJson() {
//    return fetch("http://ddragon.leagueoflegends.com/cdn/12.17.1/data/en_US/champion.json")
//        .then(data=>{return data.json()})
//        .then(cres=>{
//            var champdata = cres.data;
//            for (let i = 0; i < 161; i++){
//                champions.push([champdata[Object.keys(champdata)[i]].id, champdata[Object.keys(champdata)[i]].key]);
//            }
//
//            // parse through top 5, replace id with name
//            for (let i = 0; i < summoners.length; i++){
//                for (let j = 0; j < 5; j ++){
//                    for (let k = 0; k < champions.length; k++)
//                    {
//                        if (player.top5[j] == champions[k][1]){
//                            player.top5[j] = champions[k][0];
//                        }
//                    }
//                }
//            }
//        })
//        .catch(error=>console.log(error))
//}

//// populate section with data from summoner object
//function populateSection(id, title, lp_display, top5){
//    title.innerHTML = summoners[id].name;
//    lp_display.innerHTML = summoners[id].lp;
//}

// search for summoner
function searchSummoner() {
    summoner_input = document.getElementById("summoner_name");
    player.name = summoner_input.value;
    alert(player.name);
}

//// function to clean window and start new -- region switch
//function removeAllChildNodes(parent) {
//    alert(parent.id);
//    saved_node = parent.firstElementChild;
//    alert(saved_node.id);
//    while (parent.firstChild) {
//        parent.removeChild(parent.firstChild);
//    }
//    parent.appendChild(saved_node);
//    summoners = [];
//    champions = [];
//    startup();
//}

//
//async function startup() {
//    url ="https://"+region+".api.riotgames.com/lol/league-exp/v4/entries/RANKED_SOLO_5x5/CHALLENGER/I?page=1&api_key="+apikey;
//    await pullSummonerData();
//    await pullSummonerID(summoners[i]);
//    await pullTopChamps(summoners[i]);
//    // at this point we have list of champion ids;
//    // sort through the champions.json and return each
//    await readChampionsJson();
//    generateSummonerCSS(i);
//}
//


///// DROP DOWN BUTTONS JAVASCRIPT
///* When the user clicks on the button,
//toggle between hiding and showing the dropdown content */
//function switchRegions() {
//  document.getElementById("dropdown").classList.toggle("show");
//}
//
//function changeRegion(target) {
//    region = target.id;
//    removeAllChildNodes(document.getElementById("matchhistory"));
//}
//
//window.addEventListener('load', (event) => {
//    startup();
//})
//
