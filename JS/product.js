const jacketContainer = document.querySelector(".product-container");

const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

async function fetchProductDetails(id) {
    try {
        const response = await fetch(`https://api.noroff.dev/api/v1/rainy-days/${id}`);
        const jacket = await response.json();
        console.log(jacket);

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
                          
                        </div>
                    </div>
                    <div class="col">
                        <div class="product-container2">
                            <h1>${jacket.title}</h1> 
                            <p class="jacket-price">$ ${jacket.price} USD</p> 
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
                                        ${jacket.sizes.map(size => `
                                            <input type="radio" id="${size}" value="${size}" name="size" />
                                            <label for="${size}">${size}</label>
                                        `).join("")} 
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
    }

    catch (error) {
        console.error("an error occurred:", error);

        const errorMessage = document.createElement("p");
        errorMessage.textContent = "An error occurred while fetching data.";
        errorMessage.classList.add("error-message");

        jacketContainer.innerHTML = ""; 
        jacketContainer.appendChild(errorMessage)
    }
}

fetchProductDetails(productId);