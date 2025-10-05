//Event Listeners
document.querySelector("#zip").addEventListener("change", displayCity);
document.querySelector("#stateDropMenu").addEventListener("change", displayCountyList);
document.querySelector("#usernameBox").addEventListener("input", availUsername);
document.querySelector("#pw").addEventListener("click", suggestedPw);

// when clicking "Sign up!"
document.querySelector("#submitBtn").addEventListener("click", validateUsernameLen);
document.querySelector("#submitBtn").addEventListener("click", validatePassLen);
document.querySelector("#submitBtn").addEventListener("click", validatePassRetype);

displayStateList(); //displaying every time page is refreshed. no event listener needed.

async function displayCity() {
    let zipCode = document.querySelector("#zip").value;
    let url =  `https://csumb.space/api/cityInfoAPI.php?zip=${zipCode}`

    try {
        let response = await fetch(url);
        let data = await response.json();
        if (data == false) {
            document.querySelector("#city").textContent = "";
            document.querySelector("#lat").textContent = "";
            document.querySelector("#long").textContent = "";

            let feedback = document.querySelector("#zipFeedback");
            feedback.textContent = "Zip code not found";
            feedback.style.color = "red";
            return;
        }
        document.querySelector("#zipFeedback").textContent = "";
        document.querySelector("#city").textContent = data.city;
        document.querySelector("#lat").textContent = data.latitude;
        document.querySelector("#long").textContent = data.longitude;
    } catch (error) {
        console.log("Network Error: " + error);
    }
}

async function displayStateList() {
    let url = "https://csumb.space/api/allStatesAPI.php";
    try {
        let response = await fetch(url)
        let data = await response.json();
        
        let stateEl = document.querySelector("#stateDropMenu");
        stateEl.innerHTML = '<option>Select a state...</option>';

        for(let i of data) {
            let optionEl = document.createElement("option");
            optionEl.textContent = i.state;
            optionEl.value = i.usps;

            stateEl.append(optionEl);
        }
    } catch (error) {
        console.log("Network Error: " + error);
    }
}

async function displayCountyList() {
    let state = document.querySelector("#stateDropMenu").value;
    console.log(state);
    if (state == "Select a state..." ) { //no selection has been made
        return;
    }    

    let url = `https://csumb.space/api/countyListAPI.php?state=${state}`;

    try {
        let response = await fetch(url);
        let data = await response.json();
        console.log(data);

        let countySelect = document.querySelector("#countyDropMenu");
        countySelect.innerHTML = '<option value="">Select a county...</option>';

        for (let i of data) {
            let optionEl = document.createElement("option");
            optionEl.textContent = i.county;
            countySelect.append(optionEl);
        }
    } catch (error) {
        console.log("Network ERROR " + error);
    }   
}

async function availUsername() {
  let choice = document.querySelector("#usernameBox").value;
  let feedback = document.querySelector("#userMessage");
  
  let url = `https://csumb.space/api/usernamesAPI.php?username=${choice}`;
  try {
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
    if (data.available) {
      feedback.textContent = "Username Available";
      feedback.style.color = "green";
    } else {
      feedback.textContent = "Username Not Available";
      feedback.style.color = "red";
    }
  } catch (error) {
    console.log("Network ERROR " + error);
  }
}

async function suggestedPw() {
    let url = "https://csumb.space/api/suggestedPassword.php?length=8";
    try {
        let response = await fetch(url);
        let data = await response.json();
        console.log(data);

        document.querySelector("#pwFeedback").style.color = "black";
        document.querySelector("#pwFeedback").textContent = data.password;
    } catch (error) {
        console.log("Network error: " + error);
    }
}

function validateUsernameLen() {
    let username = document.querySelector("#usernameBox").value.trim();
    let feedback = document.querySelector("#userMessage");
    // console.log(username.length)
    if (username.length < 3) {
        feedback.textContent = "Username must be at least 3 characters long.";
        feedback.style.color = "red";
        // return;
    } else {
        feedback.textContent = "";
    }
}

function validatePassLen() {
    let pw = document.querySelector("#pw").value;
    let feedback = document.querySelector("#pwFeedback");

    if (pw.length < 6) {
        feedback.textContent = "Password must be at least 6 characters long.";
        feedback.style.color = "red";
        // return;
    } else {
        feedback.textContent = "";
    }
}

function validatePassRetype() {
    let pw = document.querySelector("#pw").value;
    let pwRetype = document.querySelector("#pwRetype").value;

    if (pw !== pwRetype) {
        document.querySelector("#retypeFeedback").textContent = "Passwords do not match."
        document.querySelector("#retypeFeedback").style.color = "red";
    } else {
        document.querySelector("#retypeFeedback").textContent = "";
    }
}