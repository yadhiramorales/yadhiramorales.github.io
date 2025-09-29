// Event Listener
document.querySelector("#shipMethod").addEventListener("change", displayShipping);
document.querySelector("#promoBtn").addEventListener("click", handlePromo);

let subtotal = 0;
let shipping = 0;
let taxes = 0;
//array requirement
let promoCodes = ["lucky", "halfoff"];
let promoApplied = false;
let shipImgMap = {
    standard: "img/snail.jpeg",
    express: "img/truck.png",
    priority: "img/plane.jpg"
}

displaySubtotal();

function displaySubtotal() {
    let items = document.querySelectorAll(".item");

    subtotal = 0;

    // first control structure
    for (let i of items) {
        let price = Number(i.querySelector(".itemPrice").dataset.price);
        let qty = Number(i.querySelector(".itemQty").value);
        subtotal += price * qty;
    }
    document.querySelector("#subtotal").textContent = `$${subtotal.toFixed(2)}`;
    updateTotal();
}

function displayShipping(event) {
    shipping = Number(event.target.value);
    // console.log(shipping);
    //update shipping total in order summary
    document.querySelector("#shipping-cost").textContent = `$${shipping.toFixed(2)}`;
    updateTotal();
}

function updateTotal() {
    taxes = 0.0725 * (subtotal + shipping); //state sales tax in CA is 7.25%
    document.querySelector("#taxes").textContent = `$${taxes.toFixed(2)}`

   let total = subtotal + shipping + taxes;
    document.querySelector("#total").textContent = `$${total.toFixed(2)}`;
}

function handlePromo() {
    //only valid promo codes will be: LUCKY and HALFOFF
    let promoGuess = document.querySelector("#promoCode").value.toLowerCase();
    // console.log(promoGuess);

    //second control structure
    if (promoCodes.includes(promoGuess) && !promoApplied) {
        //update subtotal to half off and recall updatetotal
        subtotal = subtotal/2;
        document.querySelector("#subtotal").textContent = `$${subtotal.toFixed(2)}`;
        updateTotal();
        promoApplied = true;

        document.querySelector("#promoFeedback").textContent = "";
    } else if (promoCodes.includes(promoGuess) && promoApplied) {
        document.querySelector("#promoFeedback").textContent = "Promo code already applied.";
        document.querySelector("#promoFeedback").style.color = "purple";
    } else {
        document.querySelector("#promoFeedback").textContent = "Invalid promo code.";
        document.querySelector("#promoFeedback").style.color = "red";
    }
}

//event listener for change in each shipping method radio buttons
//images displayed dynamically using JS
document.querySelectorAll('input[name="shipping"]').forEach(radio => {
  radio.addEventListener("change", (e) => {
    //clear any existing images
    document.querySelectorAll('[id^="shipImg"]').forEach(span => span.innerHTML = "");

    const id = e.target.id; //"standard", "express", "priority"
    console.log(id);
    const targetSpanEl = document.querySelector(`#shipImg${id.charAt(0).toUpperCase() + id.slice(1)}`);
    if (targetSpanEl) {
      targetSpanEl.innerHTML = `<img src="${shipImgMap[id]}" alt="" width="50" height="50">`;
    }
  });
});