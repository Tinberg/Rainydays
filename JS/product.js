//update local storage  with the api details
function addToCart(jacket) {
  const selectedSize = document.querySelector('input[name="size"]:checked') ? document.querySelector('input[name="size"]:checked').value : null;

  let cartItem = {
    id: jacket.id,
    name: jacket.name,
    price: parseInt(jacket.prices.sale_price, 10),
    image: jacket.images[0].src,
    quantity: 1,
    size: selectedSize 
  };

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let existingItem = cart.find((item) => item.id === jacket.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
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

const corsAnywhereUrl2 = "https://noroffcors.onrender.com/";
const originalUrlBase2 = "https://rainydays.cmsbackendsolutions.com/wp-json/wc/store/products/";

//fetching single product (url2) and making HTML
async function fetchProductDetails(id) {
  const url2 = corsAnywhereUrl2 + originalUrlBase2 + id;
  try {
    const response = await fetch(url2);
    const jacket = await response.json();
    
    let sizes =
      jacket.attributes &&
      jacket.attributes.find((attr) => attr.name === "Size")
        ? jacket.attributes
            .find((attr) => attr.name === "Size")
            .terms.map((term) => term.name)
        : [];

    const discountLabel = jacket.on_sale
      ? `<span class="discount-label">On Sale</span>`
      : "";

    const originalPrice = jacket.on_sale
      ? `<div class="original-price">$ ${
          jacket.prices.regular_price / 100
        } USD</div>`
      : "";

    jacketContainer.innerHTML = `
        <section class="product-container">
            <div class="background-container">
                <div class="row">
                    <div class="col">
                        <div class="product-container1">
                        <img
                        class="product-img"
                        src="${jacket.images[0].src}" 
                        alt="${jacket.name}"/>
                            <div class="description-background">
                            <p><h2>Product description</h2></p>
                            <div class="product-description">${
                              jacket.description
                            }</div>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="product-container2">
                            <h1>${jacket.name}</h1> 
                            <p class="jacket-price">$ ${
                              jacket.prices.sale_price / 100
                            } USD ${originalPrice} ${discountLabel} </p> 
                            <img
                                class="mini-img"
                                src="${jacket.images[0].src}}" 
                                alt="${jacket.name}" 
                            />
                            <hr />
                            <form class="radio" action="/html/checkout1.html">
                                <div class="radio-container">
                                    <fieldset class="line1">
                                        <legend>Select size</legend>
                                        ${sizes
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
    document.title = jacket.name;
  } catch (error) {
    const errorMessage = document.createElement("p");
    errorMessage.textContent =
      "We apologize, but we couldn't retrieve product details at the moment. Please check your internet connection and try again later";
    errorMessage.classList.add("error-message");

    jacketContainer.innerHTML = "";
    jacketContainer.appendChild(errorMessage);
  }
}

fetchProductDetails(productId);

