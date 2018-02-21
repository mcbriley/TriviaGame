var intervalID;
var clockRunning = false;
var correct = 0;
var incorrect = 0;
var questions = ["What is the capital of NC?", "What is the state bird of NC?", "What is the state flower of NC?", "What is the state tree of NC?", "What is the best college team in NC?"]
var answers = ["Raleigh","Cardinal","Dogwood","Pine","NCSU"];
var answerChoices = [["Charlotte","Raleigh","Wilmington"],["Cardinal","Mallard","Mocking Bird"],["Dogwood","Sunflower","Tulip"],["Dogwood","Oak","Pine"],["Duke","NCSU","UNC"]];
var isFinished = false;

window.onload = function () {
    stopwatch.start();
    init();
    $("#submit").on("click", submit);
};

var stopwatch = {

    time: 120,

    reset: function () {

        stopwatch.time = 120;

        //reset the timer display
        $("#clock").text("02:00");
    },
    start: function () {

        // DONE: Use setInterval to start the count here and set the clock to running.
        if (!clockRunning) {
            intervalId = setInterval(stopwatch.count, 1000);
            clockRunning = true;
        }
    },
    stop: function () {

        // DONE: Use clearInterval to stop the count here and set the clock to not be running.
        clearInterval(intervalId);
        clockRunning = false;
    },
    count: function () {

        // DONE: increment time by 1, remember we cant use "this" here.
        stopwatch.time--;
        if (stopwatch.time === 0){
            $("#clock").html("Time's Up!");
            submit();
        }

        // DONE: Get the current time, pass that into the stopwatch.timeConverter function,
        //       and save the result in a variable.
        var converted = stopwatch.timeConverter(stopwatch.time);

        // DONE: Use the variable we just created to show the converted time in the "clock" div.
        $("#clock").text(converted);
    },
    timeConverter: function (t) {

        var minutes = Math.floor(t / 60);
        var seconds = t - (minutes * 60);

        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        if (minutes === 0) {
            minutes = "00";
        }
        else if (minutes < 10) {
            minutes = "0" + minutes;
        }

        return minutes + ":" + seconds;
    }
};

function init(){
    for (var i = 0; i<5; i++){
        var questionNumber = "#question" + i;
        $(questionNumber).text(questions[i]);
        for(var j = 0; j<3; j++){
            var btnNumber = "#opt" + i + j;
            $(btnNumber).text(answerChoices[i][j]);
        }
    }
}

function submit(){
    if(!isFinished){
        isFinished = true;
        stopwatch.stop();
        for (var i = 0; i<5; i++){
            for (var j = 0; j<3; j++){
                var q = i.toString();
                console.log(q, "i");
                var c = j.toString();
                console.log(c, "j");
                btn = q + c;
                selectedDiv = "div" + btn;
                var selector = "input[type='radio'][name='optradio"+i+"'][id='btn"+btn+"']:checked";
                console.log(selector, "selector");
                if ($(selector).length === 1) {
                    if(answerChoices[i][j] == answers[i]){
                        correct++;
                    } else {
                        incorrect++;
                    }  
                }
            }
        } 
        //overwrite screen with correct and incorrect answers
        //write restart function
        $("#results").html("Correct: " + correct);
        $("#results").append("<br>Incorrect: " + incorrect + "<br>");
        console.log(correct);
        console.log(incorrect);
    };
}
