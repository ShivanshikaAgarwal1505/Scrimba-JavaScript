var cards = document.querySelectorAll(".card");

[...cards].forEach((card) => {
  card.addEventListener("click", function () {
    card.classList.toggle("is-flipped");
  });
});

let playerHand = [];
let dealerHand = [];
let isGameStarted = false;

function startGame() {
  playerHand = [];
  dealerHand = [];
  isGameStarted = true;

  dealCard(playerHand);
  dealCard(dealerHand);
  dealCard(playerHand);
  dealCard(dealerHand);

  updateUI();
}

function dealCard(hand) {
  //push card value in reapective stack
  const cards = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
    "A",
  ];
  const randomIndex = Math.floor(Math.random() * cards.length);
  const card = cards[randomIndex];
  hand.push(card);
}

function updateUI() {
  if (isGameStarted) {
    //updates buttons
    document.getElementById("deal-btn").disabled = true;
    document.getElementById("hit-btn").disabled = false;
    document.getElementById("stand-btn").disabled = false;
  }

  displayHand(playerHand, "player-cards", "player-score");
  displayHand(dealerHand, "dealer-cards", "dealer-score");

  const playerScore = calculateHandValue(playerHand);
  const dealerScore = calculateHandValue(dealerHand);

  document.getElementById("player-score").textContent = `Score: ${playerScore}`;
  document.getElementById("dealer-score").textContent = `Score: ${dealerScore}`;

  if (playerScore > 21) {
    endGame("You busted. Dealer wins!");
  }
}

function displayHand(hand, containerId, scoreId) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  for (let card of hand) {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.textContent = card;
    container.appendChild(cardElement);
  }

  const score = calculateHandValue(hand);
  document.getElementById(scoreId).textContent = `Score: ${score}`;
}

function calculateHandValue(hand) {
  let sum = 0;
  let hasAce = false;

  for (let card of hand) {
    if (card === "A") {
      hasAce = true;
      sum += 11;
    } else if (card === "K" || card === "Q" || card === "J") {
      sum += 10;
    } else {
      sum += parseInt(card);
    }
  }

  if (hasAce && sum > 21) {
    sum -= 10;
  }

  return sum;
}

function hit() {
  if (!isGameStarted) return;

  dealCard(playerHand);
  updateUI();
}

function stand() {
  if (!isGameStarted) return;

  while (calculateHandValue(dealerHand) < 17) {
    dealCard(dealerHand);
  }

  updateUI();
  endGame();
}

function endGame(message) {
  isGameStarted = false;

  document.getElementById("deal-btn").disabled = false;
  document.getElementById("hit-btn").disabled = true;
  document.getElementById("stand-btn").disabled = true;

  if (message) {
    document.getElementById("result").textContent = message;
  }
}