/**
 * Game Chooser
 */

var answer;
var guesses = 0;

/**
 * Set a random number between 0 and seed
 * @param int seed Maximum range number to use in generating a random number
 * @return int void
 */
function randomNumber(seed) {
  seed = seed || 10;
  return Math.floor(Math.random() * seed + 1);
}

function checkGuess(guess) {
  var hint = '';
  var parsedGuess = parseInt(guess, 10); // make sure the guess is a number

  guesses++;

  if(parsedGuess == answer) {
    hint = 'You Win!';
  } else if (parsedGuess < answer) {
    hint = 'Higher...';
  } else {
    hint = 'Lower...';
  }

  return hint;

}

function resetCount() {
  answer = randomNumber();
  guesses = 0;
}

$(document).ready(function() {
  answer = randomNumber(10);
  // console.log("Answer: " + answer);

  $("form a").click(function() {
    var guess = $("input:first").val();
    var hint = checkGuess(guess);

    if(answer == guess) {
      $('#game').before('<div class="alert-message block-message success"><h1>You Win!</h1><br/><input type="reset" value="New Game" class="btn reset"/></div>');
    }

    $('span.help-inline').html(hint);
    $('input#guesses').val(guesses);

  });

  $(".reset").click(function() {
    resetCount();
    $('.alert-message').hide();
    $('.help-inline').html('');
  });

});


