// ------------------- global variables ------------------- //
// created html element variable, score, sounds
var gameHTML;
var theTimer;
var counter = 10;
var questionCounter = 0;
var correctTally = 0;
var incorrectTally = 0;
var timeOutTally = 0;
var clickSound = new Audio("./assets/images/refreshedSound.mp3");

// questions, answers, images arrays
var questionArray = ["Question 1?", "Question 2?", "Question 3?", "Question 4?", "Question 5?", "Question 6?", "Question 7?", "Question 8?"];
var answerArray = [["Q1A1", "Q1A2", "Q1A3", "Q1A4"], ["Q2A1", "Q2A2", "Q2A3", "Q2A4"], ["Q3A1", "Q3A2", "Q3A3", "Q3A4"], ["Q4A1", "Q4A2", "Q4A3", "Q4A4"], ["Q5A1", "Q5A2", "Q5A3", "Q5A4"], ["Q6A1", "Q6A2", "Q6A3", "Q6A4"], ["Q7A1", "Q7A2", "Q7A3", "Q7A4"], ["Q8A1", "Q8A2", "Q8A3", "Q8A4"]];
var correctAnswers = ["Q1A1", "Q2A2", "Q3A3", "Q4A3", "Q5A4", "Q6A1", "Q7A2", "Q8A4"];
var imageArray = ["<img class='center-SVG' src='.//assets/images/Q1'>", "<img class='center-SVG' src='.//assets/images/Q2'>", "<img class='center-block img-right' src='img/taiwan.png'>", "<img class='center-block img-right' src='img/japan.png'>", "<img class='center-block img-right' src='img/china.png'>", "<img class='center-block img-right' src='img/turkey.png'>", "<img class='center-block img-right' src='img/colombia.png'>", "<img class='center-block img-right' src='img/india.png'>"];

// ------------------- jQuery functions and onclick listeners and events ------------------- //
$(document).ready(function () {
    // function that creates the begin button and beginning screen

    function beginButton() {
        beginButton = "<img class='begin-button' src='.//assets/images/beginText.svg'>"
        // "<a class='btn btn-lg btn-block begin-button text-left animated zoomInLeft' href='#' role='button'>click me to begin</a>"
        $(".main-area").html(beginButton);
    }
    beginButton();

    // trigger functions by clicking the start button, and generate the HTML i.e. trivia questions
    $("body").on("click", ".begin-button", function (event) {
        event.preventDefault();  // added line to test issue on GitHub Viewer
        clickSound.play();
        generateTrivia();
        timerWrapper();
    });

    // trigger functions by clicking an answer
    $("body").on("click", ".answer", function (event) {
        clickSound.play();
        selectedAnswer = $(this).text();
        if (selectedAnswer === correctAnswers[questionCounter]) {
            // if correct
            clearInterval(theTimer);
            generateWin();
        }
        else {
            // if incorrect
            clearInterval(theTimer);
            generateLoss();
        }
    });

    // trigger functions by clicking reset button
    $("body").on("click", ".reset-button", function (event) {
        clickSound.play();
        resetGame();
    });

});

// ------------------- javascript functions ------------------- //

// create variable named gameHTML with html element holding trivia question, and then display it on HTML
function generateTrivia() {
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='first-answer answer animated bounceInRight'>" + answerArray[questionCounter][0] + "</p><p class='answer animated bounceInRight'>" + answerArray[questionCounter][1] + "</p><p class='answer animated bounceInRight'>" + answerArray[questionCounter][2] + "</p><p class='answer animated bounceInRight'>" + answerArray[questionCounter][3] + "</p>";
    $(".main-area").html(gameHTML);
    $("#logo").html("");
}

// create variable with timer function, and then display it on HTML
function timerWrapper() {
    theTimer = setInterval(thirtySeconds, 1000);
    function thirtySeconds() {
        if (counter === 0) {
            clearInterval(theTimer);
            timeOutLoss();
        }
        if (counter > 0) {
            counter--;
        }
        $(".timer").html(counter);
    }
}

// replace gameHTML with new HTML element cointaining win image. hold screen for 3 seconds
function generateWin() {
    correctTally++;
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
    $(".main-area").html(gameHTML);
    setTimeout(wait, 2000);  //  3 second wait
}

// replace gameHTML with new HTML element containing loss image. hold screen for 3 seconds
function generateLoss() {
    incorrectTally++;
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='img/x.png'>";
    $(".main-area").html(gameHTML);
    setTimeout(wait, 2000); //  3 second wait
}

// replace gameHTML with new HTML element containing time-out image. hold the screen for 3 seconds
function timeOutLoss() {
    timeOutTally++;
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-SVG' height='300' width='300' src='.//assets/images/Stopwatch.svg'>";
    $(".main-area").html(gameHTML);
    setTimeout(wait, 2000);  //  3 second wait
}

// in between questions, update counters and run functions if there are questions left. if not, run the final screen function
function wait() {
    if (questionCounter < 7) {
        questionCounter++;
        generateTrivia();
        counter = 10;
        timerWrapper();
    }
    else {
        finalScreen();
    }
}

// replace gameHTML with new HTML element containing all-done text and reset button
function finalScreen() {
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Nice work! Here's how you did:" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + timeOutTally + "</p>" + "<a class='btn btn-lg btn-block reset-button text-left animated zoomInLeft' href='#' role='button'>Reset The Quiz!</a>";
    $(".main-area").html(gameHTML);
}

// reset the counters and start over game
function resetGame() {
    questionCounter = 0;
    correctTally = 0;
    incorrectTally = 0;
    timeOutTally = 0;
    counter = 10;
    generateTrivia();
    timerWrapper();
}
