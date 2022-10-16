var region="na1";

const regions = {"na1": "NORTH AMERICA", "euw1":"EUROPE WEST", "kr": "KOREA"};

var url ="https://"+region+".api.riotgames.com/lol/league-exp/v4/entries/RANKED_SOLO_5x5/CHALLENGER/I?page=1&api_key="+api_key_imp.key;

// define an array of champion name, id
var champions = [];

// populating var
var populating = true;

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
    for (var i = 0; i < 10; i++){
        summoners[i] = new summoner();
    }
}

// define function to pull top 10 ranked challenger players via api, allocate them to list of summoners
// grabs summoner and rank from challenger list
async function pullSummonerData() {
    return fetch(url)
        .then(data=>{return data.json()})
        .then(res=>{
            for (let i = 0; i < 10; i++)
            {
                summoners[i].name = res[i].summonerName;
                summoners[i].rank = i + 1;
                summoners[i].lp = res[i].leaguePoints;
            }})
        .catch(error=>console.log(error))
}

// Function to pull summoner id from API
async function pullSummonerID(summoner){
    return fetch("https://"+region+".api.riotgames.com/lol/summoner/v4/summoners/by-name/"+summoner.name+"?api_key="+api_key_imp.key)
        .then(summdata=>{return summdata.json()})
        .then(result=>{
            summoner.summonerID = result.id;
        })
        .catch(error=>console.log(error))
}

// takes in a summoner object, and adds their top 5 most played champions
async function pullTopChamps(summoner){
    return fetch("https://"+region+".api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/"+summoner.summonerID+"/top?count=5&api_key="+api_key_imp.key)
        .then(data=>{return data.json()})
        .then(res=>{
            for (let i = 0; i < 5; i++){
                summoner.top5[i] = res[i].championId;
            }
        })
        .catch(error=>console.log(error))
}

// import champions.json
async function readChampionsJson() {
    return fetch("http://ddragon.leagueoflegends.com/cdn/12.17.1/data/en_US/champion.json")
        .then(data=>{return data.json()})
        .then(cres=>{
            var champdata = cres.data;
            for (let i = 0; i < 161; i++){
                champions.push([champdata[Object.keys(champdata)[i]].id, champdata[Object.keys(champdata)[i]].key]);
            }

            // parse through top 5, replace id with name
            for (let i = 0; i < summoners.length; i++){
                for (let j = 0; j < 5; j ++){
                    for (let k = 0; k < champions.length; k++)
                    {
                        if (summoners[i].top5[j] == champions[k][1]){
                            summoners[i].top5[j] = champions[k][0];
                        }
                    }
                }
            }
        })
        .catch(error=>console.log(error))
}

// populate section with data from summoner object
function populateSection(id, title, lp_display, top5){
    title.innerHTML = summoners[id].name;
    lp_display.innerHTML = summoners[id].lp;
}

// generate challenger lists
function generateSummonerCSS(counter) {

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
    strong_text.innerHTML = "RANK " + (counter + 1);

    let q_hr = document.createElement('hr');
    let z_hr = document.createElement('hr');

    let name_header = document.createElement("div");
    name_header.classList.add("col", "p-4", "d-flex", "flex-column", "position-static", "justify-content-center");
    name_header.innerHTML = "SUMMONER NAME";

    let points_header = document.createElement("div");
    points_header.classList.add("col", "p-4", "d-flex", "flex-column", "position-static");
    points_header.innerHTML = "LEAGUE POINTS";

    let chal_headers_row = document.createElement("container-fluid");
    chal_headers_row.classList.add("row");

    let chal_name = document.createElement("div");
    chal_name.classList.add("col", "p-4", "d-flex", "flex-column", "position-static");

    let chal_points = document.createElement("div");
    chal_points.classList.add("col", "p-4", "d-flex", "flex-column", "position-static");

    let chal_display_row = document.createElement("container-fluid");
    chal_display_row.classList.add("row");

    let chal_top5 = document.createElement("div");

    for (i = 0; i < 5; i++){
        var img = document.createElement("img");
        img.src = "http://ddragon.leagueoflegends.com/cdn/12.17.1/img/champion/"+summoners[counter].top5[i]+".png";
        chal_top5.appendChild(img);
    }

    // runs function to pull data from api
    populateSection(counter, chal_name, chal_points);


    // header for champions played
    let champs_header = document.createElement("strong");
    champs_header.classList.add("d-inline-block", "mb-2", "text-primary");
    champs_header.innerHTML = "TOP 5 CHAMPIONS";

    chalrows.append(div_col_outer);
    div_col_outer.append(div_row);
    div_col_outer.classList.add("container");
    div_row.append(div_col_inner);
    div_col_inner.append(strong_text);
    div_col_inner.append(chal_headers_row);
    chal_headers_row.append(name_header);
    chal_headers_row.append(points_header);
    div_col_inner.append(q_hr);
    div_col_inner.append(chal_display_row, champs_header, chal_top5);
    chal_display_row.append(chal_name, chal_points);
    div_col_inner.append(z_hr);

}

// function to clean window and start new -- region switch
function removeAllChildNodes(parent) {
    saved_node = parent.firstElementChild;
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
    parent.appendChild(saved_node);
}


async function startup() {
    url ="https://"+region+".api.riotgames.com/lol/league-exp/v4/entries/RANKED_SOLO_5x5/CHALLENGER/I?page=1&api_key="+api_key_imp.key;
    createListSummoners();
    await pullSummonerData();
    document.getElementById("titletext").innerHTML = "TOP 10 LEAGUE OF LEGENDS PLAYERS - " + regions[region];
    for (let i = 0; i < summoners.length; i++){
        await pullSummonerID(summoners[i]);
        await pullTopChamps(summoners[i]);
        // at this point we have list of champion ids;
        // sort through the champions.json and return each
        await readChampionsJson();
        generateSummonerCSS(i);
    }
}



/// DROP DOWN BUTTONS JAVASCRIPT
/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function switchRegions() {
  document.getElementById("dropdown").classList.toggle("show");
}

async function changeRegion(target) {
    region = target.id;
    await removeAllChildNodes(document.getElementById("chalrows"));
    summoners = [];
    champions = [];
    startup();
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

window.addEventListener('load', (event) => {
    startup();
})

