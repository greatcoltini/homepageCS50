class championPI {
    // initialization of a new champion object
    constructor() {
        this.name = "";
        this.games = 0;
        this.wins = 0;
        this.losses = 0;
    }

    get_games() {
        return this.games;
    }

    get_wins() {
        return this.wins;
    }

    get_losses() {
        return this.losses;
    }

    get_winrate() {
        return parseInt((this.wins / (this.wins + this.losses)) * 100) + "%";
    }

    set_winrate(wins) {
        this.wins = wins;
    }

    set_losses(losses) {
        this.losses = losses;
    }

    set_games(games) {
        this.games = games;
    }

    set_name(name) {
        this.name = name;
    }
}
