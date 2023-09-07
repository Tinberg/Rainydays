//update local storage  with the api details
function addToCart(jacket) {
  let cartItem = {
    id: jacket.id,
    name: jacket.title,
    price: jacket.discountedPrice ? jacket.discountedPrice : jacket.price,
    image: jacket.image,
    quantity: 1,
  };

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let existingItem = cart.find((item) => item.id === jacket.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    let cartItem = {
      id: jacket.id,
      name: jacket.title,
      price: jacket.discountedPrice ? jacket.discountedPrice : jacket.price,
      image: jacket.image,
      quantity: 1, 
    };
    cart.push(cartItem);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
}

const jacketContainer = document.querySelector(".product-container");

jacketContainer.innerHTML = `<div class="loading-animation">
<div class="loader"></div>
</div>`;

const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

//fetching api and making HTML
async function fetchProductDetails(id) {
  try {
    // await new Promise(resolve => setTimeout(resolve, 2000));//only to see how the animation is(remove this)

    const response = await fetch(
      `https://api.noroff.dev/api/v1/rainy-days/${id}`
    );
    const jacket = await response.json();

    const discountLabel = jacket.onSale
      ? `<span class="discount-label">On Sale</span>`
      : "";

    const originalPrice = jacket.onSale
      ? `<div class="original-price">$ ${jacket.price} USD</div>`
      : "";

    jacketContainer.innerHTML = `
        <section class="product-container">
            <div class="background-container">
                <div class="row">
                    <div class="col">
                        <div class="product-container1">
                            <img
                                class="product-img"
                                src="${jacket.image}" 
                                alt="${jacket.title}" 
                            />
                            <div class="description-background">
                            <p><h1>Product description</h1></p>
                            <div class="product-description">${
                              jacket.description
                            }</div>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="product-container2">
                            <h1>${jacket.title}</h1> 
                            <p class="jacket-price">$ ${
                              jacket.discountedPrice || jacket.price
                            } USD ${originalPrice} ${discountLabel} </p> 
                            <img
                                class="mini-img"
                                src="${jacket.image}" 
                                alt="${jacket.title}" 
                            />
                            <hr />
                            <form class="radio" action="/html/checkout1.html">
                                <div class="radio-container">
                                    <fieldset class="line1">
                                        <legend>Select size</legend>
                                        ${jacket.sizes
                                          .map(
                                            (size) => `
                                            <input type="radio" id="${size}" value="${size}" name="size" />
                                            <label for="${size}">${size}</label>
                                        `
                                          )
                                          .join("")} 
                                    </fieldset>
                                    <div class="line2">
                                        <button id="submit-button" type="submit">
                                            Add to cart
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            </section>
        `;
    document
      .getElementById("submit-button")
      .addEventListener("click", () => addToCart(jacket));
      document.title = jacket.title; 
  } catch (error) {
    const errorMessage = document.createElement("p");
    errorMessage.textContent = "An error occurred while fetching data.";
    errorMessage.classList.add("error-message");

    jacketContainer.innerHTML = "";
    jacketContainer.appendChild(errorMessage);
  }
}

fetchProductDetails(productId);
