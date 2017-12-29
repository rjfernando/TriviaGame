//create an object array that includes all questions

var questions = [{
    
    question: "What year did Beverly Hills Cop get released?",
    answerList: ["1982", "1989", "1984", "1986"],
    rightAnswer: 2 },
{
    question: "How many Friday The 13th movies are there?",
    answerList: ["11", "9", "10", "8"],
    rightAnswer: 0 },
{
    question: "What year did the original A Nightmare On Elm Street come out?",
    answerList: ["1982", "1980", "1984", "1986"],
    rightAnswer: 2 },
{
    question: "Who is the main characters in Little Shop of Horrors?",
    answerList: ["Ellen Greene", "Vincent Gardenia", "Steve Martin", "All of the above"],
    rightAnswer: 3 },
{
    question: "In The Breakfast Club, how many Saturday detentions did John Bender get?",
    answerList: ["8", "6", "7", "4"],
    rightAnswer: 0 },
{
    question: "What was the exact speed the car in Back to the Future had to go to travel through time?",
    answerList: ["86 MPH", "88 MPH", "101 MPH", "187 MPH"],
    rightAnswer: 1 },
{
    question: "What 1980's sitcom was Tony Danza in?",
    answerList: ["Who's the Boss", "Family Ties", "Different Strokes", "Full House"],
    rightAnswer: 0 },
{
    question: "Who directed Karate Kid?",
    answerList: ["John G. Avildsen", "Steven Speilberg", "John Carpenter", "Steve Martin"],
    rightAnswer: 0 },
{
    question: "Which movie was not made in the 80's?",
    answerList: ["The Breakfast Club", "Revenge Of the Nerds", "Farris Buillers Day Off", "Star Wars Episode 4: A New Hope"],
    rightAnswer: 3 },
{
    question: "Who voices Gizmo in Gremlins?",
    answerList: ["Howie Mandel", "No one, its computer made", "Christopher Lloyd", "Robin Williams"],
    rightAnswer: 0 
}];

// console.log(questions);

//delcare the variables for the gameplay

var currentQuestion;
var correctAnswers;
var incorrectAnswers;

var alertMessages = {
	correct: "You got it!",
	incorrect: "No, that's not it.",
	endTime: "Time's Up!",
    finished: "Alright! Let's see how well you did."
}
// console.log(alertMessages);

//functions for Game Play

$("#startButton").on("click", function(){
    $(this).hide();
    newGame();
});

$("#reset").on("click", function(){
    $(this).hide();
    newGame();
});

function newGame(){
	$("#correctAnswers").empty();
	$("#incorrectAnswers").empty();
    $("#unanswered").empty();
    $("alertMessage").empty();
    $("endMessage").empty();
    currentQuestion = 0;
    correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
    newQuestion();
    // decrement();

    
}

function newQuestion(){
	$("#alertMessage").empty();
    $("#rightAnswer").empty();
    $("endMessage").empty();
    answered = true;
    number = 15;
   
    if (number < 0) {
        $("#alertMessage").html(alertMessages.endTime);
    }

    $("#question").html("<h2>" + questions[currentQuestion].question + "</h2>");
    
    for (var i = 0; i < 4; i++) {
		var selections = $("<div>");
		selections.text(questions[currentQuestion].answerList[i]);
		selections.attr({"data-index":i}); 
		selections.addClass("thisSelections");
        $("#answerList").append(selections);
    
    }
    
    run();

    $(".thisSelections").on("click",function(){
        userSelect = $(this).data("index"); 
        resultPage();

    });
    
}
 
//timer functions for each question

var number = 15;
var intervalId;

function run() {
    intervalId = setInterval(decrement, 1000);
}

function stop() {

    clearInterval(intervalId);
}

function decrement() {

    number--;
    $("#remainingTime").html("<h3> Time Remaining: " + number + "</h3>");``

    if (number === 0) {

        stop();
    }
   
}

// result page with correct and incorrect answer information and message

var unanswered;
var answered;
var userSelect;


function resultPage(){
	$("#currentQuestion").empty();
	$(".thisSelections").empty(); 
    $("#question").empty();
    $("answerList").empty();
    stop();

	var rightAnswerText = questions[currentQuestion].answerList[questions[currentQuestion].rightAnswer];
	var rightAnswerIndex = questions[currentQuestion].rightAnswer;
 
	if  ((userSelect === rightAnswerIndex) && (answered === true)){
		correctAnswer++;
		$("#alertMessage").html(alertMessages.correct);
    } 
    
    else if ((userSelect !== rightAnswerIndex) && (answered === true)){
		    incorrectAnswer++;
		    $("#alertMessage").html(alertMessages.incorrect);
		    $("#rightAnswer").html("The correct answer was: " + rightAnswerText);
    } 
    
    else {
		    unanswered++;
		    $("#alertMessage").html(alertMessages.endTime);
		    $("#rightAnswer").html("The correct answer was: " + rightAnswerText);
            answered = true;
            newQuestion();
	}
	
	if(currentQuestion === (questions.length-1)){
		setTimeout(scoreboard, 4000)
    } 
    else {
		currentQuestion++;
		setTimeout(newQuestion, 4000);
	}	
}
// results page with start over function.

function scoreboard(){
	$("#remainingTime").empty();
	$("#alertMessage").empty();
	$("#rightAnswer").empty();

	$("#endMessage").html(alertMessages.finished);
	$("#correctAnswers").html("Correct Answers: " + correctAnswer);
	$("#incorrectAnswers").html("Incorrect Answers: " + incorrectAnswer);
	$("#unanswered").html("Unanswered: " + unanswered);
	// $("#startOver").addClass("reset");
	// $("#startOver").show();
    $("#reset").html("Start Over?");
    $("#reset").css("border: 2px solid blue");
}

// 
//image function not created
// when time hits zero the unanswered message does not inform the user and does not add into the results page 
