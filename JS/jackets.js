const url = "https://api.noroff.dev/api/v1/rainy-days";
const jacketContainer = document.querySelector(".product-section");
const sortBySelect = document.querySelector(".sort-by");

const firstGroupContainer = document.querySelector(".first-group");
const secondGroupContainer = document.querySelector(".second-group");

//API loading
const loadingContainer = document.querySelector(".loading-animation");

function showLoading() {
  loadingContainer.style.display = "block";
}

function hideLoading() {
  loadingContainer.style.display = "none";
}

//this function determinate which page and how many jackets it will display
function determinePage() {
  const path = window.location.pathname;
  
  if (path === "/" || path.includes("index.html")) {
      return "page1";
  } else {
      return null;
  }
}

// stores api data
let fetchedJackets = [];

//eventlistner for jacket.html
if (sortBySelect) {
  sortBySelect.addEventListener("change", handleSort);
}

// this function fetch the jackets from the api
async function fetchJackets() {
  showLoading();
  try {
    // await new Promise(resolve => setTimeout(resolve, 2000));
    const response = await fetch(url);
    fetchedJackets = await response.json();
    originalOrder = [...fetchedJackets];

    const currentPage = determinePage();
    if (currentPage === "page1") {
      renderJackets(fetchedJackets.slice(0, 3), firstGroupContainer);
      renderJackets(fetchedJackets.slice(3, 6), secondGroupContainer);
    } else {
      renderJackets(fetchedJackets, jacketContainer);
    }
    hideLoading();
  } catch (error) {
    displayError();
    console.error("Error fetching jackets:", error);
  }
}

// this function render the jackets
function renderJackets(jackets, targetContainer) {
  targetContainer.innerHTML = "";
  let productsHTML = "";

  for (const jacket of jackets) {
    const discountLabel = jacket.onSale
      ? `<div class="discount-label">On Sale</div>`
      : "";
    const originalPrice = jacket.onSale
      ? `<div class="original-price">$ ${jacket.price} USD</div>`
      : "";

    productsHTML += `
            <div class="product1-container">
                <div class="product1">
                    <div>
                        <a href="/html/product.html?id=${jacket.id}">
                            <img class="item1" src="${jacket.image}" alt="${
      jacket.title
    }"/>
                            <p class="product1-text">${jacket.title}&nbsp; $ ${
      jacket.discountedPrice || jacket.price
    } USD ${originalPrice} ${discountLabel} </p>
                        </a>
                    </div>
                </div>
            </div>
        `;
  }

  const jacketsElement = document.createElement("div");
  jacketsElement.classList.add("background-product");
  jacketsElement.innerHTML = productsHTML;
  targetContainer.appendChild(jacketsElement);
}

// This function displays error of the api fail to fetch
function displayError() {
  const errorMessage = document.createElement("p");
  errorMessage.textContent = "An error occurred while fetching data.";
  errorMessage.classList.add("error-message");

  jacketContainer.innerHTML = "";
  jacketContainer.appendChild(errorMessage);
}


// This functon sorts and renders the jackets based on what u select for jackets.HTML
async function handleSort() {
  if (!fetchedJackets.length) {
    await fetchJackets();
  }

  switch (sortBySelect.value) {
    case "Sort by: Price low to high":
      fetchedJackets.sort((a, b) => a.price - b.price);
      break;
    case "Sort by: Price high to low":
      fetchedJackets.sort((a, b) => b.price - a.price);
      break;
    case "Sort by: On sale first":
      fetchedJackets.sort((a, b) => (b.onSale === true) - (a.onSale === true));
      break;
    case "Sort by:":
      fetchedJackets = [...originalOrder];
      break;
    default:
      break;
  }

  renderJackets(fetchedJackets, jacketContainer);
}

//FOR INDEX.HTML

fetchJackets();

//tilbake1

// const url = "https://api.noroff.dev/api/v1/rainy-days";
// const jacketContainer = document.querySelector(".product-section");
// const sortBySelect = document.querySelector(".sort-by");

// //API loading
// function showLoading() {
//     jacketContainer.innerHTML = `<div class="loading-animation">
//                                     <div class="loader"></div>
//                                  </div>`;
// }
// //this function determinate which page and how many jackets it will display
// function determinePage() {
//     if (window.location.pathname.includes('index.html')) {
//         return 'page1';
//     } else {
//         return null;
//     }
// }

// // stores api data
// let fetchedJackets = [];

// //eventlistner for jacket.html
// if(sortBySelect){
// sortBySelect.addEventListener("change", handleSort);
// }

// // this function fetch the jackets from the api
// async function fetchJackets() {
//     showLoading();
//     try {
//         // await new Promise(resolve => setTimeout(resolve, 2000));
//         const response = await fetch(url);
//         fetchedJackets = await response.json();
//         originalOrder = [...fetchedJackets];

//         const currentPage = determinePage();
//         if (currentPage === 'page1') {
//             renderJackets(fetchedJackets.slice(0, 3));
//             // Insert your content here - either using JS or directly in your HTML
//             renderJackets(fetchedJackets.slice(3, 6));
//         } else {
//             renderJackets(fetchedJackets);
//         }
//     } catch (error) {
//         displayError();
//         console.error("Error fetching jackets:", error);
//     }
// }

// // this function render the jackets
// function renderJackets(jackets) {
//     let productsHTML = "";

//     for (const jacket of jackets) {
//         const discountLabel = jacket.onSale ? `<div class="discount-label">On Sale</div>` : "";
//         const originalPrice = jacket.onSale ? `<div class="original-price">$ ${jacket.price} USD</div>` : "";

//         productsHTML += `
//             <div class="product1-container">
//                 <div class="product1">
//                     <div>
//                         <a href="/html/product.html?id=${jacket.id}">
//                             <img class="item1" src="${jacket.image}" alt="${jacket.title}"/>
//                             <p class="product1-text">${jacket.title}&nbsp; $ ${jacket.discountedPrice || jacket.price} USD ${originalPrice} ${discountLabel} </p>
//                         </a>
//                     </div>
//                 </div>
//             </div>
//         `;
//     }

//     jacketContainer.innerHTML = `
//         <div class="background-product">
//             ${productsHTML}
//         </div>
//     `;
// }

// // This function displays error of the api fail to fetch
// function displayError() {
//     const errorMessage = document.createElement("p");
//     errorMessage.textContent = "An error occurred while fetching data.";
//     errorMessage.classList.add("error-message");

//     jacketContainer.innerHTML = "";
//     jacketContainer.appendChild(errorMessage);
// }

// // This functon sorts and renders the jackets based on what u select
// async function handleSort() {
//     if (!fetchedJackets.length) {
//         await fetchJackets();
//     }

//     switch (sortBySelect.value) {
//         case "Sort by: Price low to high":
//             fetchedJackets.sort((a, b) => a.price - b.price);
//             break;
//         case "Sort by: Price high to low":
//             fetchedJackets.sort((a, b) => b.price - a.price);
//             break;
//         case "Sort by: On sale first":
//             fetchedJackets.sort((a, b) => (b.onSale === true) - (a.onSale === true));
//             break;
//         case "Sort by:":
//             fetchedJackets = [...originalOrder];
//             break;
//         default:
//             break;
//     }

//     renderJackets(fetchedJackets);
// }

// fetchJackets();

//original
// const url = "https://api.noroff.dev/api/v1/rainy-days";
// const jacketContainer = document.querySelector(".product-section");
// const sortBySelect = document.querySelector(".sort-by");

// // stores api data
// let fetchedJackets = [];

// //eventlistner for jacket.html
// if(sortBySelect){
// sortBySelect.addEventListener("change", handleSort);
// }

// // this function fetch the jackets from the api
// async function fetchJackets() {
//     try {
//         const response = await fetch(url);
//         fetchedJackets = await response.json();
//         originalOrder = [...fetchedJackets];
//         renderJackets(fetchedJackets);
//     } catch (error) {
//         displayError();
//     }
// }

// // this function render the jackets
// function renderJackets(jackets) {
//     let productsHTML = "";

//     for (const jacket of jackets) {
//         const discountLabel = jacket.onSale ? `<div class="discount-label">On Sale</div>` : "";
//         const originalPrice = jacket.onSale ? `<div class="original-price">$ ${jacket.price} USD</div>` : "";

//         productsHTML += `
//             <div class="product1-container">
//                 <div class="product1">
//                     <div>
//                         <a href="/html/product.html?id=${jacket.id}">
//                             <img class="item1" src="${jacket.image}" alt="${jacket.title}"/>
//                             <p class="product1-text">${jacket.title}&nbsp; $ ${jacket.discountedPrice || jacket.price} USD ${originalPrice} ${discountLabel} </p>
//                         </a>
//                     </div>
//                 </div>
//             </div>
//         `;
//     }

//     jacketContainer.innerHTML = `
//         <div class="background-product">
//             ${productsHTML}
//         </div>
//     `;
// }

// // This function displays error of the api fail to fetch
// function displayError() {
//     const errorMessage = document.createElement("p");
//     errorMessage.textContent = "An error occurred while fetching data.";
//     errorMessage.classList.add("error-message");

//     jacketContainer.innerHTML = "";
//     jacketContainer.appendChild(errorMessage);
// }

// // This functon sorts and renders the jackets based on what u select
// async function handleSort() {
//     if (!fetchedJackets.length) {
//         await fetchJackets();
//     }

//     switch (sortBySelect.value) {
//         case "Sort by: Price low to high":
//             fetchedJackets.sort((a, b) => a.price - b.price);
//             break;
//         case "Sort by: Price high to low":
//             fetchedJackets.sort((a, b) => b.price - a.price);
//             break;
//         case "Sort by: On sale first":
//             fetchedJackets.sort((a, b) => (b.onSale === true) - (a.onSale === true));
//             break;
//         case "Sort by:":
//             fetchedJackets = [...originalOrder];
//             break;
//         default:
//             break;
//     }

//     renderJackets(fetchedJackets);
// }

// fetchJackets();

//-----------------for of loop----------------//

// const url = "https://api.noroff.dev/api/v1/rainy-days";

// const jacketContainer = document.querySelector(".product-section");

// jacketContainer.innerHTML = `<div class="loading-animation">
// <div class="loader"></div>
// </div>`;

// // //fetching api and making HTML
// async function fetchJackets() {
//   try {

//     const response = await fetch(url);
//     const jackets = await response.json();

//     let productsHTML = "";

//     for (const jacket of jackets) {
//       const discountLabel = jacket.onSale ? `<div class="discount-label">On Sale</div>`
//         : "";

//       const originalPrice = jacket.onSale ? `<div class="original-price">$ ${jacket.price} USD</div>`
//         : "";

//       productsHTML += `

//                 <div class="product1-container">
//                     <div class="product1">
//                         <div>
//                             <a href="/html/product.html?id=${jacket.id}">
//                                 <img class="item1" src="${jacket.image}" alt="${jacket.title}"/>
//                                 <p class="product1-text">${jacket.title}&nbsp; $ ${jacket.discountedPrice || jacket.price} USD ${originalPrice} ${discountLabel} </p>
//                             </a>
//                         </div>
//                     </div>
//                 </div>

//             `;
//     }

//     jacketContainer.innerHTML = `
//             <div class="background-product">
//                 ${productsHTML}
//             </div>
//         `;
//   } catch (error) {
//     const errorMessage = document.createElement("p");
//     errorMessage.textContent = "An error occurred while fetching data.";
//     errorMessage.classList.add("error-message");

//     jacketContainer.innerHTML = "";
//     jacketContainer.appendChild(errorMessage);
//   }
// }

// fetchJackets();

//-------------------i loop version---------------------//

// const url = "https://api.noroff.dev/api/v1/rainy-days";
// const jacketContainer = document.querySelector(".product-section");

// jacketContainer.innerHTML = `<div class="loading-animation">
// <div class="loader"></div>
// </div>`;

// //fetching api and making HTML
// async function fetchJackets() {
//     try {
//         // await new Promise(resolve => setTimeout(resolve, 2000)); //only to see how the animation is (remove this)

//         const response = await fetch(url);
//         const jackets = await response.json();

//         let productsHTML = '';

//         for (let i = 0; i < jackets.length; i++) {
//             const jacket = jackets[i];

//             const discountLabel = jacket.onSale
//                 ? `<div class="discount-label">On Sale</div>`
//                 : '';

//             const originalPrice = jacket.onSale
//                 ? `<div class="original-price">$ ${jacket.price} USD</div>`
//                 : '';

//             productsHTML += `
//                 <div class="product1-container">
//                     <div class="product1">
//                         <div>
//                             <a href="/html/product.html?id=${jacket.id}">
//                                 <img
//                                     class="item1"
//                                     src="${jacket.image}"
//                                     alt="${jacket.title}"
//                                 />
//                                 <p class="product1-text">${jacket.title}&nbsp; $ ${jacket.discountedPrice || jacket.price} USD ${originalPrice} ${discountLabel} </p>
//                             </a>

//                         </div>
//                     </div>
//                 </div>

//             `;
//         }

//         jacketContainer.innerHTML = `
//             <div class="background-product">
//                 ${productsHTML}
//             </div>
//         `;
//     } catch (error) {
//         const errorMessage = document.createElement("p");
//         errorMessage.textContent = "An error occurred while fetching data.";
//         errorMessage.classList.add("error-message");

//         jacketContainer.innerHTML = "";
//         jacketContainer.appendChild(errorMessage);
//     }
// }

// fetchJackets();
