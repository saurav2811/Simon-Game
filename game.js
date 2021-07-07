var gamePattern=[];

var buttonColors=["red", "blue", "green", "yellow"];

var userClickedPattern = [];

var started=false;

var level=1;

$(document).keydown(function(event){
  if(!started){
    nextSequence();
    started=!started;
  }
});


$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});


function nextSequence(){
  userClickedPattern=[];
  $("h1").text("Level "+level);
  level++;
  randomNumber=Math.floor(Math.random()*4);
  randomChosenColor=buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

function playSound(name){
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColor){
  var activeColor=$("."+currentColor);
  activeColor.addClass("pressed");
  setTimeout(function(){
    activeColor.removeClass("pressed");
  },100);
}


function checkAnswer(currentLevel){
  if(gamePattern[currentLevel]!==userClickedPattern[currentLevel]){
    var gameOver=$("body");
    gameOver.addClass("game-over");
    setTimeout(function(){
      gameOver.removeClass("game-over");
    },100);
    var wrong=new Audio("sounds/wrong.mp3");
    wrong.play();
    $("h1").text("Game over, Press any key to Restart");
    startOver();
  }
  else {
    if(userClickedPattern.length===gamePattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }
}

function startOver(){
  gamePattern=[];
  level=1;
  started=false;
}
