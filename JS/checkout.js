document.addEventListener("DOMContentLoaded", () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const productContainer = document.querySelector("#cart-items");
  let overallTotal = 0;

  cart.forEach((item) => {
    let productDiv = document.createElement("div");
    let itemTotal = item.price * item.quantity;

    productDiv.innerHTML = `
          <div class="jacket-container">
              <img class="jacket" src="${item.image}" alt="${item.title}" />
              <p>${item.name}</p>
              <p>$ ${item.price} USD</p>
              <p>Quantity: <span class="item-quantity">${item.quantity}</span></p>
              <button type="button" class="increase-qty" data-id="${item.id}">+</button>
              <button type="button" class="decrease-qty" data-id="${item.id}">-</button>
          </div>
      `;

    overallTotal += itemTotal;
    productContainer.appendChild(productDiv);
  });

  const totalContainer = document.createElement("div");
  totalContainer.innerHTML = `
      <h2>Total Price: $ ${overallTotal.toFixed(2)} USD</h2>
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

function updateQuantity(id, change) {
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
