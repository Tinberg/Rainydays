const url = "https://api.noroff.dev/api/v1/rainy-days";

const jacketContainer = document.querySelector(".product-section");

async function fetchJackets() {
    try {
        const response = await fetch(url);
        const jackets = await response.json();
        console.log(jackets)

        let productsHTML = '';

        for (const jacket of jackets) {
            productsHTML += `
            
                <div class="product1-container">
                    <div class="product1">
                        <div>
                            <a href="/html/product.html?id=${jacket.id}">
                                <img
                                    class="item1"
                                    src="${jacket.image}"
                                    alt="${jacket.title}"
                                />
                                <p class="product1-text">${jacket.title}&nbsp; $ ${jacket.price.toFixed(2)} USD</p>
                            </a>
                        </div>
                    </div>
                </div>
                
            `;
        }

        jacketContainer.innerHTML = `
            <div class="background-product">
                ${productsHTML}
            </div>
        `;
    } catch (error) {
        console.error("An error occurred:", error);

        const errorMessage = document.createElement("p");
        errorMessage.textContent = "An error occurred while fetching data.";
        errorMessage.classList.add("error-message");

        jacketContainer.innerHTML = ""; 
        jacketContainer.appendChild(errorMessage)
    }
}

fetchJackets();
