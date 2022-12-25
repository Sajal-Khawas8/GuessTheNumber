let clickSound = new Audio("./click.mp3");
let correctSound = new Audio("./correct.mp3");
let wrongSound = new Audio("./wrong.mp3");
let easy = document.getElementById("easy");
let medium = document.getElementById("medium");
let hard = document.getElementById("hard");
let mainArea = document.getElementById("main");
let gameArea = document.getElementById("game");
let newGame = document.getElementById("newGame");
let userGuess = document.getElementById("userGuess");
let computerGuess;
let guesses = [];
let attemptsLeft;

function generateRandomNumber() {
    computerGuess = Math.floor(Math.random() * 100);
    if (computerGuess <= 1 || computerGuess >= 100) {
        generateRandomNumber();
    }
}

function startGame() {
    clickSound.play();
    mainArea.style.display = "none";
    gameArea.style.display = "block";
    generateRandomNumber();
}

function updateValues() {
    document.getElementById("userGuess").value = "";
    attemptsLeft--;
    document.getElementById("attempts").innerHTML = attemptsLeft;
}

newGame.addEventListener("click", () => {
    clickSound.play();
    setTimeout(() => {
        window.location.reload();
    }, 260);
})

userGuess.addEventListener("change", () => {
    userNumber = document.getElementById("userGuess").value;
    guesses = [...guesses, userNumber];
    document.getElementById("guesses").innerHTML = guesses;
    //if attempts > 1, then show whether guess is low or high
    if (attemptsLeft > 1) {
        if (userNumber > computerGuess) {
            wrongSound.play();
            document.getElementById("low-high").innerHTML = "Your guess is High 😓";
            updateValues();
        }
        else if (userNumber < computerGuess) {
            wrongSound.play();
            document.getElementById("low-high").innerHTML = "Your guess is Low 😓";
            updateValues();
        }
        else {
            correctSound.play();
            document.getElementById("low-high").innerHTML = "Your guess is Correct!! You Won 🥳";
            newGame.style.display = "inline";
            document.getElementById("userGuess").setAttribute("disabled", true);
            updateValues();
        }
    }
    //if 1 attempt left and user guess wrong number then show correct number
    else if (attemptsLeft === 1) {
        if (userNumber > computerGuess) {
            wrongSound.play();
            document.getElementById("low-high").innerHTML = `Your guess is High!! You Loose 😵‍💫<br>Correct Number was ${computerGuess}`;
            newGame.style.display = "inline";
            document.getElementById("userGuess").setAttribute("disabled", true);
            updateValues();
        }
        else if (userNumber < computerGuess) {
            wrongSound.play();
            document.getElementById("low-high").innerHTML = `Your guess is Low!! You Loose 😵‍💫<br>Correct Number was ${computerGuess}`;
            newGame.style.display = "inline";
            document.getElementById("userGuess").setAttribute("disabled", true);
            updateValues();
        }
        else {
            correctSound.play();
            document.getElementById("low-high").innerHTML = "Your guess is Correct!! You Won 🥳";
            newGame.style.display = "inline";
            document.getElementById("userGuess").setAttribute("disabled", true);
            updateValues();
        }
    }
})

easy.addEventListener("click", () => {
    startGame();
    attemptsLeft = 10;
    document.getElementById("question").innerHTML = "Guess the number between 1 and 100";
    document.getElementById("attempts").innerHTML = attemptsLeft;
})
medium.addEventListener("click", () => {
    startGame();
    attemptsLeft = 5;
    document.getElementById("question").innerHTML = "Guess the number between 1 and 100";
    document.getElementById("attempts").innerHTML = attemptsLeft;
})
hard.addEventListener("click", () => {
    startGame();
    attemptsLeft = 7;
    computerGuess *= Math.ceil(Math.random() * 10);//-->Min no produced is 1, if we use floor then min no produced would be 0 and resultant would be 0
    document.getElementById("question").innerHTML = "Guess the number between 1 and 1000";
    document.getElementById("attempts").innerHTML = attemptsLeft;
})
