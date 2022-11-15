
// define structure for item in player
class item {
    constructor(){
        this.id = 0;
        this.name = "";
        this.cost = "";
    }

    get_name(){
        return this.name;
    }

    get_id(){
        return this.id;
    }

    set_cost(price){
        this.cost = "(" + toString(price) + ")";
    }
}

// import items.json, generates array of items id and name
async function readItemsJson() {
    return fetch("https://ddragon.leagueoflegends.com/cdn/12.17.1/data/en_US/item.json")
        .then(data=>{return data.json()})
        .then(res=>{
            var itemdata = res.data;
            for (let itemid in itemdata){
                // champions[0] is name, champions[0][b] is id
                itemsArray.push([itemid, itemdata[itemid].name, itemdata[itemid].gold.total]);
            }
        })
        .catch(error=>{console.log(error)})
}

// returns the corresponding item name for the item
function itemNameAndPrice(item_id){
    // pparse through item array, return name if id corresponds to given id
    for (let j = 0; j < itemsArray.length; j ++){
        if (itemsArray[j][0] == item_id){
            return [itemsArray[j][1], itemsArray[j][2]];
        }
    }
}