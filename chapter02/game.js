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
function random_number(seed) {
  seed = seed || 10;
  return Math.floor(Math.random() * seed + 1);
}

function check_guess(guess) {
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

function reset_count() {
  answer = random_number();
  guesses = 0;
}

$(document).ready(function() {
  answer = random_number(10);
  // console.log("Answer: " + answer);

  $("form a").click(function() {
    var guess = $("input:first").val();
    var hint = check_guess(guess);

    if(answer == guess) {
      $('#game').before('<div class="alert-message block-message success"><h1>You Win!</h1><br/><a href="#" class="btn">New Game</a></div>');
    }

    $('span.help-inline').html(hint);
    $('input#guesses').val(guesses);

  });

  $("#reset").click(function() {
    reset_count();
    $('.alert-message').hide();
    // $("form").reset();
  });

});


