'use strict';
// SELECTING ELEMENTS
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const cuurent1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

//STARTING CONDITION
const init = function () {
  scores = [0, 0];
  // players total score will save in 0th and 1th position
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  cuurent1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

const swithPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
  //toggle method use to remove or add classes if it is already exist
};

//ROLLLING DICE FUNCTIONALITY
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1.Generating random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //3.Check for 1 ,
    if (dice !== 1) {
      //Add dice to current score
      currentScore += dice;
      // currentScore = currentScore + dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch to the next player
      swithPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //1. Add cuurent score to the active player
    // score nth index value of 0 & 1 is 0 only
    scores[activePlayer] += currentScore;
    console.log(scores[activePlayer]);
    // scores[0] = scores[0] + currentScore;
    // scores[1] = scores[1] + currentScore;
    // for both value is 0 = 0 + currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2. check if player's score is >=100
    if (scores[activePlayer] >= 100) {
      //finish the game
      playing = false;
      //because of now playing value turns to false and the above code is no more to run
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //switch the player
      swithPlayer();
    }
  }
});

//RESETTING THE GAME
btnNew.addEventListener('click', init);
