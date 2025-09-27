// Event Listener
document.querySelector("#zip").addEventListener("change", displayCity);
document.querySelector("#pw").addEventListener("click", suggestedPassword);

displayStates()

async function displayCity() {
    let zipCode = document.querySelector("#zip").value;
    alert(zipCode);
    // let url = "https://csumb.space/api/cityInfoAPI.php?zip="+zipCode;
    let url = `https://csumb.space/api/cityInfoAPI.php?zip=${zipCode}`;
    try {
        let response = await fetch(url);
        try {
            let data = await response.json();
            console.log(data);

            let city = document.querySelector("#city");
            city.textContent = data.city;

            let latitude = document.querySelector("#lat");
            latitude.textContent = data.latitude;

            document.querySelector("#long").textContent = data.longitude;


        } catch(error) {
            console.log("JSON Parsing error " + error);
        }
    } catch(error) {
        console.log("Network Error: " + error);
    }
}

async function displayStates() {
    let url = `https://csumb.space/api/allStatesAPI.php`;
    try {
        let response = await fetch(url);
        try {
            let data = await response.json();
            // console.log(data);
            //create option elements
            
            for (let i of data) {
                let optionElement = document.createElement("option");
                optionElement.textContent = i.state;
                optionElement.value = i.usps;
                document.querySelector("#stateOptions").append(optionElement);
            }
            

        } catch(error) {
            console.log("JSON Parsing error " + error);
        }
    } catch(error) {
        console.log("Network Error: " + error);
    }
}