const container = document.getElementById("game-container");

const cardValues = [
    "🍌",
    "🍌",
    "🍉",
    "🍉",
    "🍇",
    "🍇",
    "🍓",
    "🍓",
    "🫐",
    "🫐",
    "🍈",
    "🍈",
    "🍒",
    "🍒",
    "🍑",
    "🍑",
];

function shuffle(array) {
    for (let i = array.length - 1; i > 0 ;i--){
        const j = Math.floor(Math.random() * (i + 1));
        [array [i], array[j]] = [array [j], array [i]];
    }
    return array;
}

console.log(cardValues)

shuffle(cardValues);

cardValues.forEach ((value) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.value = value;
    card.innerHTML = '<span class="hidden">' + value + "</span>";
    container.appendChild(card);
}
)

let firstCard = null;
let secondCard = null;
let lockBoard = false;

function flipCard(event){
    if (lockBoard) return;
    const clickedCard = event.target;
    if (clickedCard === firstCard) return;
    clickedCard.classList.add("flipped");
    clickedCard.querySelector("span").classList.remove("hidden");

    if (!firstCard){
        firstCard = clickedCard;
    } else {
        secondCard = clickedCard;
        checkForMath();
    }
}

function checkForMath() {
    const isMatch = firstCard.dataset.value === secondCard.dataset.value;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove("flipped");
        firstCard.querySelector("span").classList.add("hidden");
        secondCard.classList.remove("flipped");
        secondCard.querySelector("span").classList.add("hidden")
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null , null , false];
}
    
const array = document.querySelectorAll(".card");

document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("click", flipCard);
}
)



