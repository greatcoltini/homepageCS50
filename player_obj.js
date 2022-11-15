// define structure for a summoner object
class summoner {
    constructor() {
        // summoner information
        this.name = "";
        this.puuid = "";
        this.summonerID = "";
        this.rank = 0;
        this.top5 = [];

        // ranked related info
        this.tier = "";
        this.rank = "";
        this.leaguePoints = 0;
        this.totalWins = 0;
        this.totalLosses = 0;

        // list of champion objects
        this.championsPlayed = [];
    }

    get_winrate(){
        return parseInt((this.totalWins / (this.totalWins + this.totalLosses)) * 100);
    }
}

// define structure for player in the match
class match_player {
    constructor() {
        this.position = "";
        this.champion = "";
        this.name = "";
        this.kda = "";
        this.items = [];
        this.teamOrder = 0;
    }
}

// function to take in a specific match, and update player champion list based on it
function player_champion_update(current_game, player){
    var j = player.championsPlayed.findIndex(e => e.name === current_game.championName);
    if (j > -1) {
      /* championsPlayed contains the element we're looking for, at index "j" */
        player.championsPlayed[j].games++;
        if (current_game.win){
            player.championsPlayed[j].wins++;
        }
        else {
            player.championsPlayed[j].losses++;
        }
    }
    else {
        let current_champ = new championPI();
        current_champ.name = current_game.championName;
        current_champ.games++;
        if (current_game.win){
            current_champ.wins++;
        }
        else {
            current_champ.losses++;
        }
        player.championsPlayed.push(current_champ);
    }
}