// Initialization of global variables
const questionArr = ["Which champion is primarily a top laner?", "Which champion is primarily a mid laner?", "Which champion is primarily a bot laner?", "Which champion is primarily a support?"];
// options is as follows: correct, option 2, option 3
const options = [["Tryndamere", "Zed", "Jhin", "Sona"], ["Akali", "Ashe", "Kayn", "Kayn"], ["Sejuani", "Alistar", "Braum", "Poppy"]];
const buttonsArr = ["button1", "button2", "button3"];
var points = 0;
var prevQuestionArr = [];
var allQuestions = [0, 1, 2, 3];
const startUp = true;

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


// Picks which question number we are on.
var questionNumber = getRndInteger(0, 3);
prevQuestionArr.push(questionNumber);


// Logic for the refresh button
function refreshButtons() {
    var ansREPLY = document.getElementById("ansMC");
    var finished = false;
    questionNumber = getRndInteger(0, 3);

    while (prevQuestionArr.includes(questionNumber) == true) {
        questionNumber = getRndInteger(0, 3);

        if (prevQuestionArr.length == allQuestions.length && prevQuestionArr.every((v, i)=>allQuestions.includes(v)))
        {
            finished = true;
            break;
        }
    }

    if (!finished) {
        resetButton();
        document.getElementById("question1").innerText = questionArr[questionNumber];
        prevQuestionArr.push(questionNumber);
        ansREPLY.hidden = true;
    }
    else {
        disable_buttons();
        document.getElementById("refresh").innerHTML = "Questionnaire exhausted. Score: " + points + "/4";
    }
}

// Function for resetting button options
function resetButton() {
    var counter = shuffle([0, 1, 2]);
    for (const button of buttonsArr){
        var currButt = document.getElementById(button);
        currButt.style.background = "white";
        currButt.disabled = false;
        currButt.innerHTML = options[counter.shift()][questionNumber];
    }
}

function disable_buttons() {
    for (const button of buttonsArr) {
        document.getElementById(button).disabled = true;
    }
    document.getElementById("refresh").disabled = true;
}

// Logic for MC buttons
function buttonLogic(target) {
    var ansREPLY = document.getElementById("ansMC");

    if (options[0].includes(target.innerHTML)) {
        points += 1;
        target.style.background = "green";
        ansREPLY.innerText = "Correct!";
    }
    else {
        target.style.background = "red";
        ansREPLY.innerText = "Incorrect!";
    }

    for (const button of buttonsArr) {
        document.getElementById(button).disabled = true;
    }

    document.getElementById("refresh").hidden = false;
    ansREPLY.hidden = false;
}

// initialization of MC questions
if (startUp == true) {
    document.getElementById(buttonsArr[0]).innerHTML = options[0][questionNumber];
    document.getElementById(buttonsArr[1]).innerHTML = options[1][questionNumber];
    document.getElementById(buttonsArr[2]).innerHTML = options[2][questionNumber];
    document.getElementById("question1").innerHTML = questionArr[questionNumber];
    startUp = false;
}


