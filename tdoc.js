// Initialization of global variables
const questionArr = ["Which champion is primarily a top laner?", "Which champion is primarily a jungler?",
                    "Which champion is primarily a mid laner?", "Which champion is primarily a bot laner?",
                    "Which champion is primarily a support?"];

const roles = {
    "top": ["Tryndamere", "Akali", "Aatrox"],
    "jungle": ["Kayn", "Nunu and Willump", "Elise"],
    "mid": ["Ryze", "Zed", "Azir"],
    "bot": ["Jhin", "Draven", "Miss Fortune"],
    "support": ["Sona", "Blitzcrank", "Thresh"]
};

const regex_array = ["top", "jungle", "mid", "bot", "support"];

const buttonsArr = [];

// Create function to generate a template for a MC button selection

const targetNode = document.getElementById('mc_container');

var score = 0;

function generate_mc() {
    for (let i = 0; i < roles.top.length; i++){
         multipleChoiceTemplate(i);
    };
};

// generate multiple choice section
function multipleChoiceTemplate(counter) {

    let container_buttons = [];
    let question_pick = getRndInteger(0, 4);

    let q_con = document.createElement("container");
    let q_sec = document.createElement("section");
    let q_header = document.createElement("h2");
    let q_hr = document.createElement('hr');
    q_header.innerHTML = "QUESTION " + (counter + 1);
    let q_h3 = document.createElement("h3");
    q_h3.innerHTML = questionArr[question_pick];
    q_h3.classList.add("q" + counter);
    let q_h4 = document.createElement("h4");

    targetNode.append(q_con);
    q_con.append(q_sec);
    q_con.classList.add("container");
    q_sec.append(q_header);
    q_sec.classList.add("section");
    q_header.classList.add("h2");
    q_sec.append(q_hr);
    q_sec.append(q_h3);
    q_sec.append(q_h4);

    Object.keys(roles).forEach((tName) =>
    {
        let opt = document.createElement("button");
        opt.classList.add("button");
        opt.classList.add("btngrp" + counter);
        opt.innerHTML = roles[tName][counter];
        opt.setAttribute('name', roles[tName][counter]);
        opt.onclick = function() {buttonLogic(opt, counter)};
        container_buttons.push(opt);
    })

    shuffle(container_buttons);

    for (const button of container_buttons){
        q_sec.append(button);
    }
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

// Logic for MC buttons
function buttonLogic(target, id) {

    var qTitle = document.getElementsByClassName("q" + id);
    var buttons = document.getElementsByClassName("btngrp" + id);

    target.style.background = "red";

    for (const regex of regex_array) {
        const reg = new RegExp(regex);
        if (reg.test(qTitle[0].innerHTML) == true) {
            if (roles[regex].includes(target.innerHTML)){
                target.disabled = true;
                target.style.background = "green";
                score = score + 1;
            }
        }
    };

    for (let i = 0; i <= buttons.length; i++){
        buttons[i].disabled = true;
    };

};

window.addEventListener('load', (event) => {
  generate_mc();
});


