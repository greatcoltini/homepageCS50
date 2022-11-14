// dict for team order numeration
const TEAM_ORDER = {
    "TOP": 0,
    "JUNGLE": 1,
    "MIDDLE": 2,
    "BOTTOM": 3,
    "UTILITY": 4
}

//template variables
const MATCH_TEMPLATE_MAPPING = {
    "NA1_4474515321" : match1,
    "NA1_4474481942" : match2,
    "NA1_4473694628" : match3
}

// summoner spell mapping (for ease)
const SUMMONER_SPELL_MAPPING = {
    4 : "SummonerFlash",
    21 : "SummonerBarrier",
    1 : "SummonerBoost", // cleanse
    14 : "SummonerDot", // ignite
    3 : "SummonerExhaust",
    6 : "SummonerHaste",
    7 : "SummonerHeal",
    54 : "Summoner_UltBookPlaceholder",
    12 : "SummonerTeleport",
    32 : "SummonerSnowball",
    39 : "SummonerSnowURFSnowball_Mark",
    11 : "SummonerSmite",
    31 : "SummonerPoroThrow",
    30 : "SummonerPoroRecall",
    13 : "SummonerMana"
}

// ward id numbers
const WARDS = [3340, 3330, 3363, 3364];

// summoner spell strings
const SUMMONER_SPELL_STRINGS = ["summoner1Id", "summoner2Id"];

// match type constants
const MATCH_TYPE = {
    420 : "RANKED SOLO QUEUE",
    440 : "RANKED FLEX QUEUE",
    700 : "CLASH"
}

// region constants
const region= "na1";
const morebasicregion = "americas";

