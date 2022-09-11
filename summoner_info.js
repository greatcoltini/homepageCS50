const apikey = "RGAPI-f80c3039-2df8-466f-b847-ebab69ee76f8";

const url ="https://na1.api.riotgames.com/lol/league-exp/v4/entries/RANKED_SOLO_5x5/CHALLENGER/I?page=1&api_key="+apikey;


const chalrows = document.getElementById('chalrows');

const summonerNames = [];

var summoners = {};

// grabs summoner and rank from challenger list
function pullSummoner(rank, header, lp_display) {
    var leagueData = fetch(url)
        .then(data=>{return data.json()})
        .then(res=>{
        summonerNames.push(res[rank].summonerName);
        header.innerHTML = res[rank].summonerName;
        lp_display.innerHTML = res[rank].leaguePoints;})
        .catch(error=>console.log(error))
}

// pull summoner id from api, then pull top 5 champion ids and place them into our summoners obj
function getSummonerTopChamps(summoner){
    var summonerID;
    var summonerData = fetch("https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/"+summoner+"?api_key="+apikey)
        .then(summoner=>{return summoner.json()})
        .then(result=>{
            summonerID = result.id;
            var champData = fetch("https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/"+summonerID+"/top?count=5&api_key="+apikey)
                .then(champData=>{return champData.json()})
                .then(champion_info=>{
                    summoners[summoner] = champion_info[0].championId;
                })
                .catch(error=>console.log(error))
            })
        .catch(error=>console.log(error))
}

// generate challenger lists
function generateSummonerCSS(counter) {

    let div_col_outer = document.createElement("div")
    div_col_outer.classList.add("col-md-6")

    let div_row = document.createElement("div");
    div_row.classList.add("row", "g-0", "border", "rounded",
                        "overflow-hidden", "flex-md-row", "mb-4", "shadow-sm",
                         "h-md-300", "position-relative");

    let div_col_inner = document.createElement("div");
    div_col_inner.classList.add("col", "p-4", "d-flex", "flex-column", "position-static");

    let strong_text = document.createElement("strong");
    strong_text.classList.add("d-inline-block", "mb-2", "text-primary");
    strong_text.innerHTML = "RANK " + (counter + 1);

    let q_hr = document.createElement('hr');
    let z_hr = document.createElement('hr');

    let name_header = document.createElement("div");
    name_header.classList.add("col", "p-4", "d-flex", "flex-column", "position-static");
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

    // runs function to pull data from api
    pullSummoner(counter, chal_name, chal_points);

    let q_h4 = document.createElement("h4");

    chalrows.append(div_col_outer);
    div_col_outer.append(div_row);
    div_col_outer.classList.add("container");
    div_row.append(div_col_inner);
    div_col_inner.append(strong_text);
    div_col_inner.append(chal_headers_row);
    chal_headers_row.append(name_header);
    chal_headers_row.append(points_header);
    div_col_inner.append(q_hr);
    div_col_inner.append(chal_display_row);
    chal_display_row.append(chal_name, chal_points);
    div_col_inner.append(z_hr);
    div_col_inner.append(q_h4);

}



window.addEventListener('load', (event) => {
    for (let i = 0; i < 10; i ++){
        generateSummonerCSS(i);
    }
    for (let j = 0; j < 10; j ++)
    {
        getSummonerTopChamps(summonerNames[j]);
    }

})

