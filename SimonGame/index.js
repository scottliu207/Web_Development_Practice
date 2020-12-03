var buttonColors = ['red', 'blue', 'green', 'yellow'];   //default colors.
var ranPattern = [];  // random colors.
var userClickPattern = [];  //user chosen colors.
var startLevel = 1;  //game level, start with 1.
var btnCount = 0;  // increase 1 when button get clicked.



// add keyboard listener only on the first time, it will start the game.
$(document).one('keydown', function() {
  nextSequence();
  btnFlash(ranPattern[ranPattern.length - 1]);
  $('.btn').on('click', userChosenBtn);

// after game started, keep tracking user status.
  $('.btn').on('click', function() {
    userChosenBtn;

    // set time delay for userClickPattern to update.
    setTimeout(function() {

      if (checkPattern(btnCount) === 'right') {

// tracking user status, if user was followed the pattern and clicked the last button,
// it will reset btnCount and jump to next level.
        if (ranPattern.length === userClickPattern.length) {

          nextSequence();
          btnCount = 0;
// time delay for button flash.
          setTimeout(function() {
            btnFlash(ranPattern[ranPattern.length - 1]);
          }, 500);
        }

// if user miss any one in the pattern, game is over.
// call gameover function and add listener to reload the page.
      } else if (checkPattern(btnCount) === 'wrong') {

        gameOver();
        $(document).on('keydown', function() {
          location.reload();
        });
      }
    }, 100);
// button count increase 1 every time user clicks button.
    btnCount++;

  });


})




// every time this function get called, it will generate a random color to ranPattern list,
// set title to the current game level, and reset userClickPattern list.
function nextSequence() {
  let ranNumber = Math.floor(Math.random() * 4);
  ranPattern.push(buttonColors[ranNumber]);
  $('h1').text('Level ' + startLevel)
  startLevel++;
  userClickPattern = [];
}


function btnFlash(color) {
  $('#' + color).fadeOut(100).fadeIn(100);
}


// when this function get called, the specific button will play sound and show clicked effect.
function userChosenBtn() {
  let audio = new Audio('sounds/' + this.id + '.mp3');

  userClickPattern.push(this.id);
  audio.volume=0.2;
  audio.play();
  $('#' + this.id).addClass('pressed');

  setTimeout(function() {
    $('.btn').removeClass('pressed');
  }, 100);
}

// after the current level is passing in, it will check ranPattern is equal to userClickPattern or not.
function checkPattern(currentLevel) {

  if (ranPattern[currentLevel - 1] === userClickPattern[currentLevel - 1]) {
    return 'right';
  } else {
    return 'wrong';
  }

}

// when this function get called, it will play sound,
// change the title to game over status, aslo hide all the buttons.
function gameOver() {
  let audio = new Audio('sounds/wrong.mp3')

  $('body').addClass('game-over');
  $('#level-title').text('Game Over! Enter anykey to restart.')
  $('.btn').hide();
  audio.volume=0.2;
  audio.play();

  setTimeout(function() {
    $('body').removeClass('game-over');
  }, 200);
}
