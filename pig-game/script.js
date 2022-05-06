'use strict';

//                  initialization
const player0El = {
  player: document.querySelector('.player--0'),
  score: document.getElementById('score--0'),
  current: document.getElementById('current--0'),
  localScore: 0,
};
const player1El = {
  player: document.querySelector('.player--1'),
  score: document.getElementById('score--1'),
  current: document.getElementById('current--1'),
  localScore: 0,
};
const diceEl = document.querySelector('.dice');
const rollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const newBtn = document.querySelector('.btn--new');

let currentScore = 0;
let activePlayer = player0El;
let hasWinner = false;

const init = function () {
  currentScore = 0;
  activePlayer = player0El;
  hasWinner = false;
  diceEl.classList.add('hidden');
  player0El.localScore = 0;
  player1El.localScore = 0;
  player0El.score.textContent = player0El.localScore;
  player1El.score.textContent = player1El.localScore;
  player0El.player.classList.remove('player--winner');
  player1El.player.classList.remove('player--winner');
  player1El.player.classList.remove('player--active');
  player0El.player.classList.add('player--active');
};

init();

//                  functions
function switchActivePlayer() {
  if (activePlayer == player0El) {
    activePlayer.player.classList.remove('player--active');
    activePlayer = player1El;
    activePlayer.player.classList.add('player--active');
  } else {
    activePlayer.player.classList.remove('player--active');
    activePlayer = player0El;
    activePlayer.player.classList.add('player--active');
  }
}
function checkWinner() {
  if (player0El.localScore >= 100) {
    hasWinner = true;
    player0El.player.classList.add('player--active', 'player--winner');
  } else if (player1El.localScore >= 100) {
    hasWinner = true;
    player1El.player.classList.add('player--active', 'player--winner');
  } else {
    switchActivePlayer();
  }
}
//                  Button clicks

// dice roll
rollBtn.addEventListener('click', function () {
  if (!hasWinner) {
    const roll = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove('hidden');
    diceEl.src = `pig-game/dice-${roll}.png`;

    if (roll !== 1) {
      currentScore += roll;
      activePlayer.current.textContent = currentScore;
    } else {
      currentScore = 0;
      activePlayer.current.textContent = currentScore;
      switchActivePlayer();
    }
  }
});

// hold
holdBtn.addEventListener('click', function () {
  if (!hasWinner) {
    activePlayer.current.textContent = 0;
    activePlayer.localScore += currentScore;
    currentScore = 0;
    activePlayer.current.textContent = currentScore;
    console.log(activePlayer.localScore);
    activePlayer.score.textContent = activePlayer.localScore;
    checkWinner();
  }
});

// new game
newBtn.addEventListener('click', init);
