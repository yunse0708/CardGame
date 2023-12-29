document.getElementById('startButton').addEventListener('click', startGame);
document.getElementById('resetButton').addEventListener('click', resetGame);

let cards = document.querySelectorAll('.memory-card');
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function startGame() {
  document.getElementById('startButton').style.display = 'none';
  document.getElementById('gamePage').classList.remove('hidden');
}

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;
  
  this.classList.add('flip');
  
  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }
  
  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  
  if (isMatch) {
    disableCards();
    checkWinCondition();
  } else {
    unflipCards();
  }
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function checkWinCondition() {
  const flippedCards = document.querySelectorAll('.flip');
  if (flippedCards.length === cards.length) {
    showResetButton();
  }
}

function resetGame() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
    card.classList.remove('flip');
    card.addEventListener('click', flipCard);
  });

  resetBoard();
  hideResetButton();
  showStartButton();
  hideGamePage();
}

function showResetButton() {
  document.getElementById('resetButton').classList.remove('hidden');
}

function hideResetButton() {
  document.getElementById('resetButton').classList.add('hidden');
}

function hideGamePage() {
  document.getElementById('gamePage').classList.add('hidden');
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));
