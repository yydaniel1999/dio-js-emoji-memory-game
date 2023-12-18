const states = {
  view: {
    cards: document.querySelector(".card-list"),
    reset: document.querySelector(".reset"),
  },
  values: {
    cards: [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8],
    openCards: [],
  },
};

const playSound = (file) => {
  const sound = new Audio(`./assets/sound/${file}.m4a`);
  sound.volume = 0.2;
  sound.play();
};

const cardOpen = (e) => {
  const openCards = states.values.openCards;
  if (openCards.length < 2 && !e.currentTarget.classList.contains("card-open")) {
    playSound("card-open");
    e.currentTarget.classList.add("card-open");
    openCards.push(e.currentTarget);
  }

  if (openCards.length === 2) {
    if (openCards[0].getAttribute("card-id") === openCards[1].getAttribute("card-id")) {
      setTimeout(() => {
        playSound("success");
      }, 500);
    } else {
      setTimeout(() => {
        playSound("miss");
        openCards[0].classList.remove("card-open");
        openCards[1].classList.remove("card-open");
      }, 500);
    }
    states.values.openCards = [];
  }

  if (document.querySelectorAll(".card-open").length === states.values.cards.length) {
    setTimeout(() => {
      playSound("gameover");
    }, 800);
    setTimeout(() => {
      alert("Game Over!");
    }, 1000);
  }
};

const addCardsListener = () => {
  states.view.cards.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("pointerdown", cardOpen);
  });
};

const createCardElement = (cardId) => {
  const cardElement = document.createElement("li");
  cardElement.className = "card";
  cardElement.setAttribute("card-id", cardId);
  cardElement.style.backgroundImage = `url(./assets/img/${cardId}.png)`;
  states.view.cards.appendChild(cardElement);
};

const shuffleCards = () => {
  states.values.cards.sort(() => Math.random() - 0.5);
  states.values.cards.forEach(createCardElement);
  addCardsListener();
};

const gameReset = () => {
  states.view.cards.innerHTML = "";
  states.values.openCards = [];
  shuffleCards();
};

const addResetListener = () => {
  states.view.reset.addEventListener("pointerup", gameReset);
};

const init = () => {
  shuffleCards();
  addResetListener();
};

init();
