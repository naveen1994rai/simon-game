//Global vars
var availableColors         = ['green', 'red', 'yellow', 'blue'];
var generatedColorPattern   = [];
var userColorPattern        = [];
var level                   = 1;


//Event Handler when user clicks on buttons.
$('.btn').on('click', function(){
    var color = this.id;
    userColorPattern.push(color);

    playSound(color);
    $('#' + color).addClass('pressed');
    setTimeout(function () {
        $('#' + color).removeClass('pressed');
      }, 200);
    checkAnswer(userColorPattern.length - 1);
    
})


//Checking for the correct pattern entered by the user against the computer's generated pattern.
function checkAnswer(currentLevel){
    if(userColorPattern[currentLevel] === generatedColorPattern[currentLevel]){
        if(userColorPattern.length === generatedColorPattern.length){
            level++;
            nextSequence();
        }
    }else{
        playSound('wrong');
        gameOver();
    }
}


//Event handler to receive keydowns to start the game.
$(document).keydown(function(){
    $('h1').text('Game Starts in 3 Seconds !!');
    $('h1').css('font-size', '2rem');
    setTimeout(function () {
        $('h1').text("Let's Play !!");
        $('h1').css('font-size', '60px');
        nextSequence();
      }, 3000);
})


//To generate the next color (pattern) and perform animation.
function nextSequence(){
    userColorPattern = [];
    $('h1').text('Level ' + level);
    var generatedPattern = generatePattern();
    flashButton(generatedPattern);
}


//To generate the next color (pattern) by the computer.
function generatePattern(){
    var randomNumber        = Math.floor(0 + (Math.random()*4)) ;
    var generatedPattern    = availableColors[randomNumber];

    generatedColorPattern.push(generatedPattern);

    return generatedPattern;
}


//Performs button animation.
function flashButton(pattern){
    $("." + pattern).fadeOut(300).fadeIn(300).fadeOut(300).fadeIn(300);
}


//Plays the corresponding color sound.
function playSound(color){
    var audio = new Audio("sounds/" + color + ".mp3");
    audio.play();
}


//Performs the clean-up.
function gameOver(){
    clearRegisters();

    $('h1').text('Woops !! Game Over');
    $('body').addClass('game-over');
    setTimeout(function() {
        $('body').removeClass('game-over');
        restart();
    }, 1000);
}


function clearRegisters(){
    userColorPattern        = [];
    generatedColorPattern   = [];
    level                   = 1;
}


function restart(){
    $('h1').text('Press Any Key to Start');
}