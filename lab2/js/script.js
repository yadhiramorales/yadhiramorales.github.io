//Event Listeners
document.querySelector("#guessBtn").addEventListener("click", checkGuess);

document.querySelector("#resetBtn").addEventListener("click", initializeGame); //adds event listener to reset button, so we cna call initializeGame() function to keep total # of wins and losses

//Global variables
let randomNumber;
let attempts = 0;
let totalWins = 0;
let totalLosses = 0;

initializeGame();

function initializeGame() {
    randomNumber = Math.floor(Math.random() * 99) + 1;
    console.log("randomNumber: " + randomNumber);
    attempts = 0;

    //hiding the Reset button
    document.querySelector("#resetBtn").style.display = "none";

    //showing the Guess button
    document.querySelector("#guessBtn").style.display = "inline";

    // //adding focus to text box
    // document.querySelector("#playerGuess").focus(); 


    let playerGuess = document.querySelector("#playerGuess");
    playerGuess.focus(); //adding focus to text box
    playerGuess.value = ""; //clearing the textbox

    let feedback = document.querySelector("#feedback");
    feedback.textContent = ""; //clearing the feedback

    //clearing previous guesses
    document.querySelector("#guesses").textContent = "";

    document.querySelector("#attemptsLeft").textContent = 7; // reset attempts left
}

function checkGuess() {
    let feedback = document.querySelector("#feedback");
    feedback.textContent = "";

    let guess = document.querySelector("#playerGuess").value;
    console.log("Player guess: " + guess);
    if (guess < 1 || guess > 99) {
        feedback.textContent = "Enter a number between 1 and 99";
        feedback.style.color = "red";
        return;
    }

    attempts++;
    console.log("Attempts:" + attempts);
    let attemptsLeft = 7 - attempts;
    document.querySelector("#attemptsLeft").textContent = attemptsLeft;

    feedback.style.color = "purple";
    if (guess == randomNumber) {
        feedback.textContent = "You guessed it! You Won!";
        feedback.style.color = "darkgreen";
        totalWins++;
        updateScoreboard();
        gameOver();
    } else {
        document.querySelector("#guesses").textContent += guess + " ";
        if (attempts == 7) {
            feedback.textContent = "Sorry, you lost! The random number was: " + randomNumber;
            feedback.style.color = "red";
            totalLosses++;
            updateScoreboard();
            gameOver();
        } else if (guess > randomNumber) {
            feedback.textContent = "Guess was high";
        } else {
            feedback.textContent = "Guess was low";
        }
    }
}

function gameOver() {
    let guessBtn = document.querySelector("#guessBtn");
    let resetBtn = document.querySelector("#resetBtn");
    guessBtn.style.display = "none"; //hides guess button
    resetBtn.style.display = "inline";//displays reset button

}

function updateScoreboard() {
    document.getElementById("wins").textContent = totalWins;
    document.getElementById("losses").textContent = totalLosses;
}