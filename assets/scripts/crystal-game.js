$(document).ready(function () {

  // console logs will only be displayed when debug is set to true
  const debug = false;

  let wins = 0;
  let losses = 0;
  let currPoints = 0;
  let required = 0;
  let howManyCrystals = 4;
  let $requiredCrystals = $('#requiredCrystals');
  let $winCounter = $('#winCounter');
  let $lossCounter = $('#lossCounter');
  let $currentCrystals = $('#currentCrystals');

  function log(message) {
    if (debug) {
      console.log(message);
    };
  };

  // Randomly picks a number from 19-120 inclusive, this is the number the user needs to reach
  function requiredCrystals() {
    required = Math.floor(Math.random() * (120 - 19 + 1) + 19);
    log(`Points needed: ${required}`);
    $requiredCrystals.text(required);
    return required;
  };

  // Generates the value of the four crystals randomly
  function crystalValueSetter() {
    let crystals = [];
    crystals.length = howManyCrystals;

    for (let i = 0; i < howManyCrystals; i++) {
      randomNum = Math.floor(Math.random() * (12 - 1 + 1) + 1);
      crystals[i] = randomNum;
      $("#crystal-" + (i + 1)).attr("crystal-value", randomNum);
    };

    log(`Set values: ${crystals}`);
  };

  // resets the game 
  function reset() {
    log("*********************");
    required = 0;
    currPoints = 0;
    requiredCrystals();
    crystalValueSetter();
    log(`Wins: ${wins} Losses: ${losses}`);
    $winCounter.text(wins);
    $lossCounter.text(losses);
    $currentCrystals.text("-");
    log("*********************");
  };

  // Adds the value from the crystal to the player's current score.
  $('[id^="crystal-"]').on("click", function () {
    let crystalVal = parseInt($(this).attr("crystal-value"));
    currPoints += crystalVal;
    log(`Current points: ${currPoints}`);
    $currentCrystals.text(currPoints);

    if (currPoints === required) {
      wins++;
      log("WINNER");
      reset();
    } else if (currPoints > required) {
      losses++
      log("LOSS");
      reset();
    };
  });

  reset();
});