// Initialization of global variables
const questionArr = ["Which champion is primarily a top laner?", "Which champion is primarily a mid laner?", "Which champion is primarily an ADC?"];
// options is as follows: correct, option 2, option 3
const options = [["Tryndamere", "Zed", "Jhin"], ["Akali", "Ashe", "Kayn"], ["Sejuani", "Alistar", "Braum"]];
const buttonsArr = ["button1", "button2", "button3"];
var points = 0;
var prevQuestionArr = [];
const startUp = true;

// Function returns a random integer between min and max inclusive
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Picks which question number we are on.
var questionNumber = getRndInteger(0, 2);
prevQuestionArr.push(questionNumber);


// Logic for the refresh button
function refreshButtons() {
    var ansREPLY = document.getElementById("ansMC");
    var finished = false;
    questionNumber = getRndInteger(0, 2);

    while (prevQuestionArr.includes(questionNumber) == true) {
        questionNumber = getRndInteger(0, 2);

        if (prevQuestionArr.includes(0) && prevQuestionArr.includes(1) && prevQuestionArr.includes(2)) {
            finished = true;
            break;
        }
    }

    if (!finished) {
        resetButton("button1", button1Text);
        resetButton("button2", button2Text);
        resetButton("button3", button3Text);
        document.getElementById("question1").innerText = questionArr[questionNumber];
        prevQuestionArr.push(questionNumber);
        ansREPLY.hidden = true;
    }
    else {
        document.getElementById("refresh").disabled = true;
        document.getElementById("refresh").innerHTML = "Questionnaire exhausted. Score: " + points + "/3";
    }
}

// Function for resetting button options
function resetButton(buttonId, buttonArray) {
    var counter = 0;
    for (const button of buttonsArr){
        button.style.background = "white";
        button.disabled = false;
        button.innerHTML = options[counter][questionNumber]
        counter += 1;
    }
    document.getElementById(buttonId).style.background = "white";
    document.getElementById(buttonId).disabled = false;
    document.getElementById(buttonId).innerHTML = buttonArray[questionNumber];
}

// Logic for MC buttons
function buttonLogic() {
    var el = target;
    var ansREPLY = document.getElementById("ansMC");

    if (el.innerText in options[0]) {
        points += 1;
        el.style.background = "green";
        ansREPLY.innerText = "Correct!";
    }
    else {
        el.style.background = "red";
        ansREPLY.innerText = "Incorrect!";
    }

    
    for (const button of buttonsArr) {
        button.disabled = true;
    }

    document.getElementById("refresh").hidden = false;
    ansREPLY.hidden = false;
}

// initialization of MC questions
if (startUp == true) {
    alert(document.getElementById(buttonsArr[0]).innerHTML);
    document.getElementById(buttonsArr[0]).innerHTML = options[0][questionNumber];
    document.getElementById(buttonsArr[1]).innerHTML = options[1][questionNumber];
    document.getElementById(buttonsArr[2]).innerHTML = options[2][questionNumber];
    document.getElementById("question1").innerHTML = questionArr[questionNumber];
    startUp = false;
}


