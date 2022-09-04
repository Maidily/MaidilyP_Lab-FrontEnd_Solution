// declaring variables
var score = 0;
var count = 0;


// create questions here
var questions = [
    new Question("What is the original name of JavaScript?", ["LiveScript", "EScript","Mocha", "JavaScript"], "Mocha"),
    new Question("What are the types of Pop up boxes available in JavaScript?", ["Alert", "Prompt", "Confirm", "All of the above"], "All of the above"),
    new Question("Which method of an Array object adds and/or removes elements from an array?", ["Reverse", "Splice","Shift", "Slice"], "Splice"),
    new Question("Microsoft has developed a popular HTML editor called?", ["FrontPage", "Dreamweaver", "HomeSite", "Macromedia"], "FrontPage"),
    new Question("Inside which HTML element do we put the JavaScript?", ["script", "head", "meta", "style"], "script")
];


// question function
function Question(question, choices, answer) {
    this.question = question;
    this.choices = choices;
    this.answer = answer;
};


// other functions for processing action
function showQuestionProgress() {
    var progress = document.getElementById("progress");
    progress.innerHTML = "Question " + (count + 1) + " of " + questions.length;
};


function checkCorrectAnswer(index, choice) {
    var btnElement = document.getElementById("btn" + index);
    btnElement.onclick = function() {                
        if( choice === questions[count].answer) {
            score++;
        }
        count++;
                
        loadQuestions();
    };
};


function displayResult() {
    var result = document.getElementById("question");
    result.innerHTML = " You have scored " + score + " out of " + questions.length + 
                        ". <br/> Your Percentage: " + (score*100)/questions.length + "%";

    enableTryAgain();
};


function enableTryAgain() {
    // hiding choice buttons
    var buttons = document.querySelector(".buttons");
    buttons.style.display = "none";

    // hiding question progress
    var progress = document.getElementById("progress");
    progress.innerHTML = "";

    // enabling try again button
    var trydiv = document.createElement("div");
    trydiv.innerHTML = "<button id=\"trybtn\" style=\"background-color:#1D3C6A; color:white; font-size: 18px; width: 150px; cursor: pointer;\"> Try Again </button>";
    trydiv.style.display = "block";
    trydiv.onclick = function(event) {
        if (event.target.id === 'trybtn') {
            score = 0;
            count = 0;
            trydiv.style.display = "none";
            buttons.style.display = "block";

            loadQuestions();
        }
    }
    buttons.insertAdjacentElement('beforebegin',trydiv);
}


// main load function
function loadQuestions() {
    if( count === questions.length ) {
        displayResult();
    }
    else {
        // load question
        var question = document.getElementById("question");
        question.innerText = questions[count].question;

        // load choice options
        var options = questions[count].choices;
        
        for(var i = 0; i < options.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = options[i];

            // verify chosen option - correct
            checkCorrectAnswer(i, options[i]);
        }

        // load question process
        showQuestionProgress();
    }
};


// initial function call to load data
loadQuestions();