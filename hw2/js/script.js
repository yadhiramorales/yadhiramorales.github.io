// Event Listener
document.querySelector(".shipping-option").addEventListener("change", displayShip);

function displayShip() {
    let method = document.querySelector(".ship-price").value;

    document.querySelector("#shipping-cost").textContent = method;

}