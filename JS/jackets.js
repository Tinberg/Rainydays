const url = "https://api.noroff.dev/api/v1/rainy-days";

const jacketContainer = document.querySelector(".product-section");

jacketContainer.innerHTML = `<div class="loading-animation">
<div class="loader"></div>
</div>`;

async function fetchJackets() {
    try {
        await new Promise(resolve => setTimeout(resolve, 2000));//only to see how the animation is(remove this)
        const response = await fetch(url);
        const jackets = await response.json();
       

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
        

        const errorMessage = document.createElement("p");
        errorMessage.textContent = "An error occurred while fetching data.";
        errorMessage.classList.add("error-message");

        jacketContainer.innerHTML = ""; 
        jacketContainer.appendChild(errorMessage)
    }
}

fetchJackets();
