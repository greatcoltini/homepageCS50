
// define structure for match; also contains main player info
class match {
    constructor() {
        this.gameId = "";
        this.queueId = 0;
        this.playerId = "";
        this.champPlayed = "";
        this.victory = 0;
        this.lpGained = 0;
        this.side = "";
        this.kills = 0;
        this.deaths = 0;
        this.assists = 0;
        this.fetched = false;
        this.red_team = [];
        this.blue_team = [];
        this.items = [];
        this.summoner_spells = [];
        this.masteries = [];
        this.datetime = "";
    }

    get_humantime() {
        var convertDate = new Date(this.datetime);
        return convertDate.toLocaleString();
    }

    get_kda() {
        return this.kills + "/" + this.deaths + "/" + this.assists;
    }
}

// Function to pull summoner id from API
async function pullSummonerID(region, user){
    var summoner_id_url = "https://" + region + ".api.riotgames.com/lol/summoner/v4/summoners/by-name/" + user.name + "?api_key=" + api_key_imp.key;
    try {
       const data = await fetch(summoner_id_url);
       const result_summ_info = await data.json();
       user.summonerID = result_summ_info.id;
       user.puuid = result_summ_info.puuid;
   } catch (error) {
       console.log(error);
       alert("Failed to pull data... Showing Template");
       user.summonerID = summonerInfoTemplate.id;
       user.puuid = summonerInfoTemplate.puuid;
   }
}

// Function to pull individual player's stats
async function pullPlayerStats(region, user){
    var player_stats_url = "https://" + region + ".api.riotgames.com/lol/league/v4/entries/by-summoner/" + user.summonerID + "?api_key=" + api_key_imp.key;
    try {
        const data = await fetch(player_stats_url);
        const result_stats = await data.json();
        for (let i = 0; i < result_stats.length; i++) {
            if (result_stats[i].queueType == "RANKED_SOLO_5x5") {
                writeQueueData(result_stats[i], user);
            }
        }
    } catch (error) {
        console.log(error);
        for (let i_1 = 0; i_1 < specificSummonerTemplate.length; i_1++) {
            if (specificSummonerTemplate[i_1].queueType == "RANKED_SOLO_5x5") {
                writeQueueData(specificSummonerTemplate[i_1], user);
            }
        }
    }
}

// Function to pull matches from summoner from API
async function pullMatchHistory(user, matchListVar, countInit, countFinish){
    var match_pull_url = "https://" + morebasicregion + ".api.riotgames.com/lol/match/v5/matches/by-puuid" + user.puuid + "/ids?queue=" + queue + "&start=" + countInit + "&count=" + countFinish + "&api_key=" + api_key_imp.key;
    try {
        queue = document.getElementsByClassName("selected")[0].id;
        const data = await fetch(match_pull_url);
        const result_1 = await data.json();
        for (let i = 0; i < result_1.length; i++) {
            matchListVar[i] = new match();
            matchListVar[i].gameId = result_1[i];
        }
    } catch (error) {
        console.log(error);
        for (let i_1 = 0; i_1 < 3; i_1++) {
            matchListVar[i_1] = new match();
            matchListVar[i_1].gameId = matches_twenty[i_1];
        }
    }
}

// Function to pull match data from API for each match
async function pullIndividualMatch(match){
    var individual_match_pull = "https://" + morebasicregion + ".api.riotgames.com/lol/match/v5/matches/" + match.gameId + "?api_key=" +api_key_imp.key;
    return fetch(individual_match_pull)
        .then(data=>{return data.json()})
        .then(result=>{
              writeIndividualMatch(result, match);
        })
        .catch(error=>{
            console.log(error);
            writeIndividualMatch(MATCH_TEMPLATE_MAPPING[match.gameId], match);
        })
}

// pulls data from a queried match, adds it to a match variable
function writeIndividualMatch(queriedMatch, matchVar){
    // first find participant == player
    for (let i = 0; i < 10; i++){
        if (queriedMatch.info.participants[i].puuid == player.puuid){
            // define current summoner
            let cur_sum = queriedMatch.info.participants[i];
            matchVar.victory = cur_sum.win;

            matchVar.champPlayed = cur_sum.championName;

            if (cur_sum.teamId == 200){
                matchVar.side = "Red";
            }
            else {
                matchVar.side = "Blue";
            }
            matchVar.kills = cur_sum.kills;
            matchVar.assists = cur_sum.assists;
            matchVar.deaths = cur_sum.deaths;
            matchVar.datetime = queriedMatch.info.gameCreation;

            // generates list of items for the summoner and summs
            Object.keys(cur_sum).forEach(e => {
              if (e.startsWith('item') && !e.includes("Purchased") && ! cur_sum[e] == 0)
                {
                    // create new item to add
                    new_item = new item();
                    new_item.id = cur_sum[e];
                    new_item.name, new_item.price = itemNameAndPrice(new_item.id); 
                    matchVar.items.push(new_item);
                }
              if (summoner_strings.includes(e)){
                matchVar.summoner_spells.push(cur_sum[e]);
              }
            })
            // use match info to add to player champion list
            player_champion_update(cur_sum, player);
        }

        if (queriedMatch.info.participants[i].teamId == 200) {
            populate_team(queriedMatch.info.participants[i], matchVar.red_team);
        }
        else {
            populate_team(queriedMatch.info.participants[i], matchVar.blue_team);
        }
    }

    matchVar.queueId = queriedMatch.info.queueId;
    matchVar.fetched = true;
}

// takes in a match participant, a summoner object, and a team, and fills the team with the summoner
function populate_team(match_participant, team){
    cur_player = new match_player();

    // generates list of items for the summoner
    Object.keys(match_participant).forEach(e => {
        if (e.startsWith('item') && !e.includes("Purchased") && ! match_participant[e] == 0)
        {
            // create new item to add
            new_item = new item();
            new_item.id = match_participant[e];
            [new_item.name, new_item.price] = itemNameAndPrice(new_item.id); 
            cur_player.items.push(new_item);
        }
    })

    cur_player.position = match_participant.teamPosition;
    cur_player.champion = match_participant.championName;
    cur_player.name = match_participant.summonerName;
    cur_player.kda = match_participant.kills + "/" + match_participant.deaths + "/" + match_participant.assists;
    cur_player.teamOrder = TEAM_ORDER[match_participant.teamPosition];
    // set team order
    team.push(cur_player);
}



