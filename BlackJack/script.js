var cards = document.querySelectorAll(".card");

[...cards].forEach((card) => {
  card.addEventListener("click", function () {
    card.classList.toggle("is-flipped");
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const playerHand = document.getElementById("player-hand");
  const dealerHand = document.getElementById("dealer-hand");
  const playerCards = document.getElementById("player-cards");
  const dealerCards = document.getElementById("dealer-cards");
  const playerScoreElement = document.getElementById("player-score");
  const dealerScoreElement = document.getElementById("dealer-score");
  const dealBtn = document.getElementById("deal-btn");
  const hitBtn = document.getElementById("hit-btn");
  const standBtn = document.getElementById("stand-btn");
  const resultElement = document.getElementById("result");

  let playerHandValue = 0;
  let dealerHandValue = 0;
  let playerHandArray = [];
  let dealerHandArray = [];
  let isGameOver = false;

  function dealCard(hand, handValue, handArray) {
    const cardValue = Math.floor(Math.random() * 13) + 1; // 1 to 13 representing Ace to King
    const card = cardValue > 10 ? 10 : cardValue;
    handValue += card;
    handArray.push(card);
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.textContent = card;
    hand.appendChild(cardElement);
    return handValue;
  }

  function dealInitialCards() {
    playerHandValue = dealCard(playerCards, playerHandValue, playerHandArray);
    dealerHandValue = dealCard(dealerCards, dealerHandValue, dealerHandArray);
    playerHandValue = dealCard(playerCards, playerHandValue, playerHandArray);
    dealerHandValue = dealCard(dealerCards, dealerHandValue, dealerHandArray);
    updateScores();
  }

  function updateScores() {
    playerScoreElement.textContent = `Score: ${playerHandValue}`;
    dealerScoreElement.textContent = `Score: ${dealerHandValue}`;
  }

  function checkBlackjack() {
    if (playerHandValue === 21) {
      endGame("Player wins with Blackjack!");
    } else if (dealerHandValue === 21) {
      endGame("Dealer wins with Blackjack!");
    }
  }

  function checkBust() {
    if (playerHandValue > 21) {
      endGame("Player busts! Dealer wins.");
    } else if (dealerHandValue > 21) {
      endGame("Dealer busts! Player wins.");
    }
  }

  function endGame(message) {
    isGameOver = true;
    resultElement.textContent = message;
    dealBtn.disabled = false;
    hitBtn.disabled = true;
    standBtn.disabled = true;
  }

  function determineWinner() {
    if (!isGameOver) {
      if (playerHandValue > dealerHandValue) {
        endGame("Player wins!");
      } else if (dealerHandValue > playerHandValue) {
        endGame("Dealer wins!");
      } else {
        endGame("It's a tie!");
      }
    }
  }

  function resetGame() {
    playerHandValue = 0;
    dealerHandValue = 0;
    playerHandArray = [];
    dealerHandArray = [];
    isGameOver = false;
    resultElement.textContent = "";
    playerCards.innerHTML = "";
    dealerCards.innerHTML = "";
    dealBtn.disabled = true;
    hitBtn.disabled = false;
    standBtn.disabled = false;
  }

  dealBtn.addEventListener("click", function () {
    resetGame();
    dealInitialCards();
    checkBlackjack();
  });

  hitBtn.addEventListener("click", function () {
    if (!isGameOver) {
      playerHandValue = dealCard(playerCards, playerHandValue, playerHandArray);
      updateScores();
      checkBust();
    }
  });

  standBtn.addEventListener("click", function () {
    if (!isGameOver) {
      while (dealerHandValue < 17) {
        dealerHandValue = dealCard(
          dealerCards,
          dealerHandValue,
          dealerHandArray
        );
      }
      updateScores();
      determineWinner();
    }
  });
});
