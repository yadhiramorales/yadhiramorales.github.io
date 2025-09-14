//Event Listener

//global variables
let randomNumer = Math.floor(Math.random() * 99) + 1;

document.querySelector("#guessBtn").addEventListener("click", guess);

function guess() {
    let userGuess = document.querySelector("#guessBox").value;
    // alert(userGuess); 
    //document.querySelector("#userGuesses").textContent += userGuess + ", ";

    document.querySelector("#userGuesses").textContent += ` ${userGuess} `

   
}

