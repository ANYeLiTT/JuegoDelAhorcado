//Seleccionando elementos de la página (Variables)
const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const keyboardDiv = document.querySelector(".keyboard");
const hangmanImage = document.querySelector(".hangman-box img");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = gameModal.querySelector(".button");

//Inicializando variables del juego
let currentWord, correctLetters, wrongGuessCount;
const maxGuesses = 6;

const resetGame = () => {
    correctLetters = [];
    wrongGuessCount = 0;
    hangmanImage.src= "images/hangman-0.svg";
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    //creando espacios vacios de las letras 
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li`).join("");
    //activando los botones del teclado
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    //Escondiendo el juego
    gameModal.classList.remove("show");
}

resetGame();