//Seleccionando elementos de la página (Variables)

const hangmanImage = document.querySelector(".hangman-box img");
const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const keyboardDiv = document.querySelector(".keyboard");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = gameModal.querySelector(".play-again");

let currentWord, correctLetters, wrongGuessCount;
const maxGuesses = 6; 

const resetGame = () => {
    //Reseteando todas las variables del juego y los elementos del UI
    correctLetters = [];
    wrongGuessCount= 0;
    hangmanImage.src= `images/hangman-${wrongGuessCount}.svg`;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
    gameModal.classList.remove("show"); 
}




//Seleccionar las palabras y pistas aleatorias de la Word-list

const getRandomWord = () => {
    const{ word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word; 
    console.log(word);
    document.querySelector(".hint-text b").innerText = hint;
    resetGame();
    
}

const gameOver = (isVictory) => {
    //Despues de 600ms de haberse terminado el juego muestra el modal con detalles relevantes 
    setTimeout(() => { 
        const modalText = isVictory ? `Encontraste la palabra:` : `La palabra correcta era :`;
        gameModal.querySelector("img").src = `images/${isVictory ? 'victory': 'lost'}.gif`;
        gameModal.querySelector("h4").innerText = `${isVictory ? 'Enhorabuena': 'Fin del juego'}.`;
        gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
        gameModal.classList.add("show");
    }, 300); 
}

const initGame= (button, clickedLetter) => {
    //revisa si la palabra tiene la letra seleccionada 
    if(currentWord.includes(clickedLetter)) {
        //Muestra todas las letras corectas dentro de la sección de palabras
        [...currentWord].forEach((letter, index) => {
            if(letter === clickedLetter) {
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        });
    } else { 
        //Si la letra selecionada no existe se actualiza el conteo de intentos y la imagen del ahorcado
        wrongGuessCount++;
        hangmanImage.src= `images/hangman-${wrongGuessCount}.svg`;
    }
    button.disabled = true;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`; 
    //Llama a la funcion gameOver si alguna de estas condiciones se cumplen 
    if(wrongGuessCount === maxGuesses) return gameOver(false); 
    if(correctLetters.length == currentWord.length) return gameOver(true)
}

//Creando un teclado con botones

for (let i =97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)));
}

getRandomWord();

playAgainBtn.addEventListener("click", getRandomWord);