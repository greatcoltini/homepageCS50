const url ="https://na1.api.riotgames.com/lol/league-exp/v4/entries/RANKED_SOLO_5x5/CHALLENGER/I?page=1&api_key=RGAPI-3248f57f-c8c6-49f7-b2a4-62639a99cd63"


const chalrows = document.getElementById('chalrows');

// grabs summoner and rank from challenger list
function pullSummoner(rank, header, lp_display) {
    var leagueData = fetch(url)
        .then(data=>{return data.json()})
        .then(res=>{
        header.innerHTML = res[rank].summonerName;
        lp_display.innerHTML = res[rank].leaguePoints;
        console.log(res)})
        .catch(error=>console.log(error))
}

// generate challenger lists
function generateSummonerCSS(counter) {

    let div_col_outer = document.createElement("div")
    div_col_outer.classList.add("col-md-6")

    let div_row = document.createElement("div");
    div_row.classList.add("row", "g-0", "border", "rounded",
                        "overflow-hidden", "flex-md-row", "mb-4", "shadow-sm",
                         "h-md-250", "position-relative");

    let div_col_inner = document.createElement("div");
    div_col_inner.classList.add("col", "p-4", "d-flex", "flex-column", "position-static");

    let strong_text = document.createElement("strong");
    strong_text.classList.add("d-inline-block", "mb-2", "text-primary");
    strong_text.innerHTML = "RANK " + (counter + 1);

    let q_hr = document.createElement('hr');

    let chal_name = document.createElement("div");
    chal_name.classList.add("col", "p-4", "d-flex", "flex-column", "position-static");

    let chal_points = document.createElement("div");
    chal_points.classList.add("col-auto", "d-none", "d-lg-block");

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
    div_col_inner.append(q_hr);
    div_col_inner.append(chal_display_row);
    chal_display_row.append(chal_name, chal_points);
    div_col_inner.append(q_h4);

}



window.addEventListener('load', (event) => {
    for (let i = 0; i < 10; i ++){
        generateSummonerCSS(i);
    }

});

