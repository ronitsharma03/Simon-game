let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];

let started = false;
let level = 0;

$(document).keypress(function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextsequence();
        started = true;
    }
});

$('.btn').click(function () {
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(() => {
                nextsequence();
            }, 1000);
        }
    }
    else
    {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 300);

        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
    
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}
let nextsequence = () => {
  userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    let randomNum = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColors[randomNum];
    gamePattern.push(randomChosenColour);


    let starttarget = document.getElementById('' + randomChosenColour);
    $(starttarget).fadeOut(100);
    $(starttarget).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $('.' + currentColor).addClass("pressed");
    setTimeout(() => {
        $('.' + currentColor).removeClass("pressed");
    }, 100);
}

document.getElementsByClassName("tutorial").onclick = function(){
    window.location.href = 'https://www.wikihow.com/Play-Simon-Says';
}