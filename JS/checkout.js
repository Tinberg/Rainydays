document.addEventListener("DOMContentLoaded", () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const productContainer = document.querySelector("#cart-items");
  const paymentButton = document.querySelector("#continue-to-payment");
  const cartMessage = document.querySelector("#cart-message");
  let overallTotal = 0;

  cart.forEach((item) => {
    let productDiv = document.createElement("div");
    let itemTotal = item.price * item.quantity;

    productDiv.innerHTML = `
          <div class="jacket-container">
              <img class="jacket" src="${item.image}" alt="${item.name}" />
              <p class="item-name">${item.name}</p>
              <p>$ ${(item.price / 100).toFixed(2)} USD</p>
              <div class="quantity-container">
              <button type="button" class="decrease-qty" data-id="${
                item.id
              }">-</button>
              <p><span class="item-quantity">${item.quantity}</span></p>
              <button type="button" class="increase-qty" data-id="${
                item.id
              }">+</button>
              </div>
          </div>
      `;

    overallTotal += itemTotal;
    productContainer.appendChild(productDiv);
  });

  //paymentbutton and text

  paymentButton.addEventListener("click", function () {
    if (cart.length === 0) {
      paymentButton.disabled = true;
      cartMessage.classList.remove("hidden");
    } else {
      paymentButton.disabled = false;
      cartMessage.classList.add("hidden");

      if (document.body.getAttribute(`data-page`) === `checkout-page`) {
        localStorage.clear();
      }
    }
  });

  if (cart.length === 0) {
    paymentButton.classList.add("opacity-reduced");
  } else {
    paymentButton.classList.remove("opacity-reduced");
  }

  //increase and decrease quantity. total price.
  const totalContainer = document.createElement("div");
  totalContainer.classList.add("total-price");
  totalContainer.innerHTML = `
  <h2>Total Price: $ ${(overallTotal / 100).toFixed(2)} USD</h2
  `;
  productContainer.appendChild(totalContainer);

  const increaseQtyButtons = document.querySelectorAll(".increase-qty");
  increaseQtyButtons.forEach((button) => {
    button.addEventListener("click", function () {
      updateQuantity(this.getAttribute("data-id"), 1);
    });
  });

  const decreaseQtyButtons = document.querySelectorAll(".decrease-qty");
  decreaseQtyButtons.forEach((button) => {
    button.addEventListener("click", function () {
      updateQuantity(this.getAttribute("data-id"), -1);
    });
  });
});
//this function gets the item from the local storage and adds qunatity if there is a item with the same id. splice removes item if the item got 0 in value. also convert value to a number
function updateQuantity(id, change) {
  id = parseInt(id);
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const item = cart.find((product) => product.id === id);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      const itemIndex = cart.indexOf(item);
      cart.splice(itemIndex, 1);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload();
  }
}
