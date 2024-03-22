const words = ["javascript", "html", "css", "python", "java", "php"]; // Lista de palabras
const maxAttempts = 6; // Número máximo de oportunidades

let selectedWord = ""; // Palabra para seleccionar
let guessedWord = []; // Palabra con elecciones correctas
let attempts = 0; // Número de oportunidades
let guessedLetters = []; // Array donde tener las letras elegidas

// Seleccionar una palabra aleatoria de la lista
function selectRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

// Iniciar el juego
function initialize() {
    selectedWord = selectRandomWord();
    guessedWord = Array(selectedWord.length).fill('_');
    attempts = 0;
    guessedLetters = [];
    updateDisplay();
}

// Actualizar la palabra
function updateDisplay() {
    const wordDisplay = document.getElementById("word-display");
    wordDisplay.textContent = guessedWord.join(" ");

    const lettersContainer = document.getElementById("letters");
    lettersContainer.innerHTML = "";
    for (let i = 0; i < 26; i++) {
        const letter = String.fromCharCode(65 + i);
        const letterButton = document.createElement("button");
        letterButton.classList.add("letter");
        letterButton.textContent = letter;
        letterButton.addEventListener("click", () => checkLetter(letter.toLowerCase()));
        lettersContainer.appendChild(letterButton);
    }

    const messageDisplay = document.getElementById("message");
    messageDisplay.textContent = "";
}

// Comprobar si la letra elegida está dentro de la palabra
function checkLetter(letter) {
    if (guessedLetters.includes(letter)) {
        return; // Si la letra ya se eligió antes, no hace nada
    }
    guessedLetters.push(letter);
    let found = false;
    for (let i = 0; i < selectedWord.length; i++) {
        if (selectedWord[i] === letter) {
            guessedWord[i] = letter;
            found = true;
        }
    }
    if (!found) {
        attempts++;
        drawHangman();
    }
    updateDisplay();
    checkWinOrLose();
}

// Dibujar la figura del ahorcado en base a los aciertos o errores
function drawHangman() {
    const svg = document.getElementById("hangman-svg");
    const parts = ["head", "body", "left-arm", "right-arm", "left-leg", "right-leg"];
    for (let i = 0; i < attempts; i++) {
        const part = parts[i];
        switch (part) {
            case "head":
                drawCircle(svg, 150, 80, 15);
                break;
            case "body":
                drawLine(svg, 150, 95, 150, 160);
                break;
            case "left-arm":
                drawLine(svg, 150, 110, 120, 130);
                break;
            case "right-arm":
                drawLine(svg, 150, 110, 180, 130);
                break;
            case "left-leg":
                drawLine(svg, 150, 160, 130, 200);
                break;
            case "right-leg":
                drawLine(svg, 150, 160, 170, 200);
                break;
            default:
                break;
        }
    }
}

// Dibujar una línea en el elemento SVG
function drawLine(svg, x1, y1, x2, y2) {
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", x1);
    line.setAttribute("y1", y1);
    line.setAttribute("x2", x2);
    line.setAttribute("y2", y2);
    line.setAttribute("stroke", "black");
    line.setAttribute("stroke-width", "4");
    svg.appendChild(line);
}

// Dibujar un círculo en el elemento SVG
function drawCircle(svg, cx, cy, r) {
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", cx);
    circle.setAttribute("cy", cy);
    circle.setAttribute("r", r);
    circle.setAttribute("stroke", "black");
    circle.setAttribute("stroke-width", "4");
    circle.setAttribute("fill", "none");
    svg.appendChild(circle);
}

// Comprobar si se ha ganado el juego o se ha perdido
function checkWinOrLose() {
    if (attempts >= maxAttempts)
        const messageDisplay = document.getElementById("message");
        messageDisplay.textContent = "¡Has perdido! La palabra era: " + selectedWord;
        setTimeout(initialize, 2000);
}
