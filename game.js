var buttonColors = ["red", "green", "blue", "yellow"];

var gamePattern = [];
var userPattern =  [];

var started = false;
var level = 0;


$(document).keypress(function(){
    if(!started){
        $("#level-title").text("level " + level);
        nextSequence();  
        started = true;   
    }    
});


function nextSequence(){
    userPattern = [];
    level++;

    $("#level-title").text("level " + level);

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColors[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
    animatePress(randomChosenColour);
}


$(".btn").on("click", function(){    

    var userChosenColour = $(this).attr("id");
    userPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userPattern.length - 1);
});


function checkAnswer(currentLevel){

    if(gamePattern[currentLevel] === userPattern[currentLevel]){
        if(userPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 750);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
  
        setTimeout(function () {
          $("body").removeClass("game-over");
        }, 200);
  
        startOver();
      }
}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");

    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    }, 150);
}

function playSound(name) {
   var audio = new Audio("sounds/" + name + ".mp3");
   audio.play();
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
  }