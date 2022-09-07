// Initialization of global variables
const questionArr = ["Which champion is primarily a top laner?", "Which champion is primarily a jungler?",
                    "Which champion is primarily a mid laner?", "Which champion is primarily a bot laner?",
                    "Which champion is primarily a support?"];

const roles = {
    "top": ["Tryndamere", "Akali", "Aatrox"],
    "jungle": ["Kayn", "Nunu & Willump", "Elise"],
    "mid": ["Ryze", "Zed", "Azir"],
    "adc": ["Jhin", "Draven", "Miss Fortune"],
    "support": ["Sona", "Blitzcrank", "Thresh"]
};

// Create function to generate a template for a MC button selection

const targetNode = document.getElementById('mc_container');

function generate_mc() {
    for (let i = 0; i < roles[top].length; i++){
         multipleChoiceTemplate(i);
    };
};

function multipleChoiceTemplate(counter) {

    let q1_con = document.createElement("container");
    let q1_sec = document.createElement("section");
    let q1_header = document.createElement("h2");
    let q1_hr = document.createElement('hr');
    q1_header.innerHTML = "QUESTION " + (counter + 1);
    let q1_h3 = document.createElement("h3");
    q1_h3.innerHTML = questionArr[counter];
    let q1_h4 = document.createElement("h4");

    targetNode.append(q1_con);
    q1_con.append(q1_sec);
    q1_con.classList.add("container");
    q1_sec.append(q1_header);
    q1_sec.classList.add("section");
    q1_header.classList.add("h2");
    q1_sec.append(q1_hr);
    q1_sec.append(q1_h3);

    Object.keys(roles).forEach((tName) =>
    {
        let opt_1 = document.createElement("button");
        opt_1.classList.add("button");
        opt_1.innerHTML = roles[tName][counter];
        opt_1.setAttribute('name', roles[tName][counter]);
        q1_sec.append(opt_1);
    });
}



// Function returns a random integer between min and max inclusive
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function shuffles array; for randomizing question boxes
function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

window.addEventListener('load', (event) => {
  alert(roles.top);
  multipleChoiceTemplate(0);
  multipleChoiceTemplate(1);
  multipleChoiceTemplate(2);
});


