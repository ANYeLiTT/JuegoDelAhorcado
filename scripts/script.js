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


//Función que elige una palabra aleatoria y actualiza el estado del juego
const getRandomWord = () =>{
    const{ word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word;
    document.querySelector(".hint-text-b").innerText = hint;
    resetGame();
}

//Función para determinar si el juego se ha ganado o se ha perdido

const gameOver = (isVictory) => {
    //Muestra el modo del Game Over, si se ha perdido o se ha ganado
    const modalText = isVictory ? `¡Encontraste la palabra!:` : `La palabra correcta era:`;
    gameModal.querySelector("img").src = `images/${isVictory ? 'victory' : 'lost'}.gif`;
    gameModal.querySelector("h4").innerText = isVictory ? '¡Felicidades!' : 'Game Over';
    gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
    gameModal.classList.add("show");
}

//Creando una botonera en pantalla
for (let i =97; i <= 122; i++){
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", (e) => initGame(e.target, String.fromCharCode(i)));
}

//
const initGame = (button, clickedLetter) => {
    //
    if(currentWord.includes(clickedLetter)) {
        //
        [...currentWord].forEach((letter, index) =>{
            if(letter === clickedLetter) {
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("adivinada");
            }
        });
    } else {
        //
        wrongGuessCount++;
        hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
    }
    //desactivar el botón pulsado para que el jugador no pueda seleccionarlo otra vez
    button.disabled = true;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

    if(wrongGuessCount === maxGuesses) return gameOver(false);
    if(correctLetters.length === currentWord.length) return gameOver(true);

}

//Empezando el juego con una letra aleatoria
getRandomWord();

playAgainBtn.addEventListener("clicked", getRandomWord);