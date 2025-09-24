// Event Listener
document.querySelector("button").addEventListener("click", gradeQuiz);

// Global variables
var score = 0;
// var attempts = 0;
var attempts = localStorage.getItem("total_attempts");

displayQ4Choices();


//Functions
function displayQ4Choices() {
    let q4ChoicesArray = ["Los Angeles", "Sacramento", "San Diego", "San Francisco"];
    q4ChoicesArray = _.shuffle(q4ChoicesArray);
    for (let i=0; i < q4ChoicesArray.length; i++) {
        document.querySelector("#q4Choices").innerHTML += ` <input type="radio" name="q4" id= "${q4ChoicesArray[i]}"
            value="${q4ChoicesArray[i]}"> <label for="${q4ChoicesArray[i]}"> ${q4ChoicesArray[i]}</label>`;
    }
}

function isFormValid() {
    let isValid = true;
    if (document.querySelector("#q1").value == "") {
        isValid = false;
        document.querySelector("#validationFdbk").innerHTML = "Question 1 was not answered";
    }
    return isValid;
}

function rightAnswer(index) {
    document.querySelector(`#q${index}Feedback`).innerHTML = "Correct!";
    document.querySelector(`#q${index}Feedback`).className = "bg-success text-white";
    document.querySelector(`#markImg${index}`).innerHTML = "<img src='img/checkmark.png' alt='Checkmark'>";
    score += 20;
}

function wrongAnswer(index) {
    document.querySelector(`#q${index}Feedback`).innerHTML = "Incorrect!";
    document.querySelector(`#q${index}Feedback`).className = "bg-warning text-white";
    document.querySelector(`#markImg${index}`).innerHTML = "<img src='img/xmark.png' alt='xmark'>";
}

function gradeQuiz() {
    console.log("Grading quiz...");
    document.querySelector("#validationFdbk").innerHTML = ""; //resets validation feedback
    if (!isFormValid()) {
        return;
    }

    //variables
    score = 0;
    let q1Response = document.querySelector("#q1").value.toLowerCase();
    let q2Response = document.querySelector("#q2").value;
    //q3 response not needed since its multiple answer, we just see which options have and have not been checked
    let q4Response = document.querySelector("input[name=q4]:checked").value;
    let q5Response = document.querySelector("#q5").value;

    //Grading question 1
    if (q1Response == "yosemite") {
        rightAnswer(1);
    } else {
        wrongAnswer(1);
    }

    //Grading question 2
    if (q2Response == "pa") {
        rightAnswer(2);
    } else {
        wrongAnswer(2);
    }

    //Grading question 3
    if (document.querySelector("#Golden").checked && document.querySelector("#Bay").checked &&
        document.querySelector("#Bixby").checked && !document.querySelector("#Shasta").checked) {
        rightAnswer(3);
    }
    else {
        wrongAnswer(3);
    }

    //Grading question 4
    if (q4Response == "Los Angeles"){
        rightAnswer(4);
    } else {
        wrongAnswer(4);
    }

    //Grading question 5
    if (q5Response == "840") {
        rightAnswer(5);
    } else {
        wrongAnswer(5);
    }

    //display score
    document.querySelector("#totalScore").innerHTML = `Total Score: ${score}`;
    if (score < 80) {
        document.querySelector("#totalScore").className = "text-danger";
    } else { 
        document.querySelector("#totalScore").className = "text-success";
        document.querySelector("#totalScore").innerHTML += "<br>Congrats! You passed the test."
    }

    document.querySelector("#totalAttempts").innerHTML = `Total Attempts: ${++attempts}`;
    localStorage.setItem("total_attempts", attempts);
}
