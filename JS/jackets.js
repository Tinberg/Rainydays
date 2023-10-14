const consumerKey = 'ck_a96d201db17035745ea287069f9006a92115664c';
const consumerSecret = 'cs_7fc92745029f752ad01744b393db1ecb2af0bae1';
const credentials = btoa(consumerKey + ':' + consumerSecret);



const jacketContainer = document.querySelector(".product-section");
const sortBySelect = document.querySelector(".sort-by");

const firstGroupContainer = document.querySelector(".first-group");
const secondGroupContainer = document.querySelector(".second-group");

//Loading that is used in fetchJackets function
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
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': 'Basic ' + credentials
      }
    });
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
function formatPrice(priceInCents) {
  return (parseFloat(priceInCents) / 100).toFixed(2);
}

function renderJackets(jackets, targetContainer) {
  targetContainer.innerHTML = "";
  let productsHTML = "";

  for (const jacket of jackets) {
      const discountLabel = jacket.on_sale
          ? `<div class="discount-label">On Sale</div>`
          : "";
      
      const formattedRegularPrice = formatPrice(jacket.prices.regular_price);
      const formattedSalePrice = jacket.prices.sale_price ? formatPrice(jacket.prices.sale_price) : formattedRegularPrice;

      const originalPrice = jacket.on_sale
          ? `<div class="original-price">$ ${formattedRegularPrice}</div>`
          : "";

      productsHTML += `
          <div class="product1-container">
              <div class="product1">
                  <div>
                      <a href="/html/product.html?id=${jacket.id}">
                          <img class="item1" src="${jacket.images[0].src}" alt="${jacket.name}"/>
                          <div class="text-container"><p class="product1-text">${jacket.name}<br> $ ${formattedSalePrice} ${originalPrice} ${discountLabel} </p></div>
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
      fetchedJackets.sort((a, b) => a.prices.regular_price - b.prices.regular_price);
      break;
    case "Sort by: Price high to low":
      fetchedJackets.sort((a, b) => b.prices.regular_price - a.prices.regular_price);
      break;
    case "Sort by: On sale first":
      fetchedJackets.sort((a, b) => (b.on_sale === true) - (a.on_sale === true));
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
let slides = document.querySelectorAll(".slide");
let dots = document.querySelectorAll(".dot");
let currentSlide = 0;
let slideInterval;

//Seasonal slider interval
function startSlideInterval() {
  slideInterval = setInterval(changeSlide, 4500);
}
//Seasonal Slider
function changeSlide(newSlideIndex = (currentSlide + 1) % slides.length) {
  slides[currentSlide].style.opacity = "0";
  dots[currentSlide].classList.remove("active");

  currentSlide = newSlideIndex;
  const offset = -1 * currentSlide * 100;
  document.querySelector(".slides").style.transform = `translateX(${offset}%)`;

  slides[currentSlide].style.opacity = "1";
  dots[currentSlide].classList.add("active");
}

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    clearInterval(slideInterval);
    changeSlide(index);
    startSlideInterval();
  });
});

startSlideInterval();

//this makes the slider target figcaption and p when hover img or p.
const slidesHover = document.querySelectorAll('.slide');
slidesHover.forEach(slide => {
    const img = slide.querySelector('img');
    const paragraph = slide.querySelector('p');

    
    img.addEventListener('mouseenter', () => {
        slide.classList.add('hover-effect');
    });

    img.addEventListener('mouseleave', () => {
        slide.classList.remove('hover-effect');
    });

    
    paragraph.addEventListener('mouseenter', () => {
        slide.classList.add('hover-effect');
    });

    paragraph.addEventListener('mouseleave', () => {
        slide.classList.remove('hover-effect');
    });
});

fetchJackets();





















// const corsAnywhereUrl = "https://cors-anywhere.herokuapp.com/";
// const originalUrl = "https://rainydays.cmsbackendsolutions.com/wp-json/wc/store/products/";
// const url = corsAnywhereUrl + originalUrl;

// const consumerKey = 'ck_a96d201db17035745ea287069f9006a92115664c';
// const consumerSecret = 'cs_7fc92745029f752ad01744b393db1ecb2af0bae1';
// const credentials = btoa(consumerKey + ':' + consumerSecret);

// const jacketContainer = document.querySelector(".product-section");
// const sortBySelect = document.querySelector(".sort-by");

// const firstGroupContainer = document.querySelector(".first-group");
// const secondGroupContainer = document.querySelector(".second-group");

// //Loading that is used in fetchJackets function
// const loadingContainer = document.querySelector(".loading-animation");

// function showLoading() {
//   loadingContainer.style.display = "block";
// }

// function hideLoading() {
//   loadingContainer.style.display = "none";
// }

// //this function determinate which page and how many jackets it will display
// function determinePage() {
//   const path = window.location.pathname;

//   if (path === "/" || path.includes("index.html")) {
//     return "page1";
//   } else {
//     return null;
//   }
// }

// // stores api data
// let fetchedJackets = [];

// //eventlistner for jacket.html
// if (sortBySelect) {
//   sortBySelect.addEventListener("change", handleSort);
// }

// // this function fetch the jackets from the api
// async function fetchJackets() {
//   showLoading();
//   try {
//     // await new Promise(resolve => setTimeout(resolve, 2000));
//     const response = await fetch(url, {
//       method: 'GET',
//       headers: {
//         'Authorization': 'Basic ' + credentials
//       }
//     });
//     fetchedJackets = await response.json();
//     originalOrder = [...fetchedJackets];

//     const currentPage = determinePage();
//     if (currentPage === "page1") {
//       renderJackets(fetchedJackets.slice(0, 3), firstGroupContainer);
//       renderJackets(fetchedJackets.slice(3, 6), secondGroupContainer);
//     } else {
//       renderJackets(fetchedJackets, jacketContainer);
//     }
//     hideLoading();
//   } catch (error) {
//     displayError();
//     console.error("Error fetching jackets:", error);
//   }
// }

// // this function render the jackets
// function renderJackets(jackets, targetContainer) {
//   targetContainer.innerHTML = "";
//   let productsHTML = "";

//   for (const jacket of jackets) {
//     const discountLabel = jacket.onSale
//       ? `<div class="discount-label">On Sale</div>`
//       : "";
//     const originalPrice = jacket.onSale
//       ? `<div class="original-price">$ ${jacket.price}</div>`
//       : "";

//     productsHTML += `
//             <div class="product1-container">
//                 <div class="product1">
//                     <div>
//                         <a href="/html/product.html?id=${jacket.id}">
//                             <img class="item1" src="${jacket.image}" alt="${
//       jacket.title
//     }"/>
//                             <div class="text-container"><p class="product1-text">${
//                               jacket.title
//                             }<br> $ ${
//       jacket.discountedPrice || jacket.price
//     } ${originalPrice} ${discountLabel} </p></div>
//                         </a>
//                     </div>
//                 </div>
//             </div>
//         `;
//   }

//   const jacketsElement = document.createElement("div");
//   jacketsElement.classList.add("background-product");
//   jacketsElement.innerHTML = productsHTML;
//   targetContainer.appendChild(jacketsElement);
// }

// // This function displays error of the api fail to fetch
// function displayError() {
//   const errorMessage = document.createElement("p");
//   errorMessage.textContent = "An error occurred while fetching data.";
//   errorMessage.classList.add("error-message");

//   jacketContainer.innerHTML = "";
//   jacketContainer.appendChild(errorMessage);
// }

// // This functon sorts and renders the jackets based on what u select for jackets.HTML
// async function handleSort() {
//   if (!fetchedJackets.length) {
//     await fetchJackets();
//   }

//   switch (sortBySelect.value) {
//     case "Sort by: Price low to high":
//       fetchedJackets.sort((a, b) => a.price - b.price);
//       break;
//     case "Sort by: Price high to low":
//       fetchedJackets.sort((a, b) => b.price - a.price);
//       break;
//     case "Sort by: On sale first":
//       fetchedJackets.sort((a, b) => (b.onSale === true) - (a.onSale === true));
//       break;
//     case "Sort by:":
//       fetchedJackets = [...originalOrder];
//       break;
//     default:
//       break;
//   }

//   renderJackets(fetchedJackets, jacketContainer);
// }

// //FOR INDEX.HTML
// let slides = document.querySelectorAll(".slide");
// let dots = document.querySelectorAll(".dot");
// let currentSlide = 0;
// let slideInterval;

// //Seasonal slider interval
// function startSlideInterval() {
//   slideInterval = setInterval(changeSlide, 4500);
// }
// //Seasonal Slider
// function changeSlide(newSlideIndex = (currentSlide + 1) % slides.length) {
//   slides[currentSlide].style.opacity = "0";
//   dots[currentSlide].classList.remove("active");

//   currentSlide = newSlideIndex;
//   const offset = -1 * currentSlide * 100;
//   document.querySelector(".slides").style.transform = `translateX(${offset}%)`;

//   slides[currentSlide].style.opacity = "1";
//   dots[currentSlide].classList.add("active");
// }

// dots.forEach((dot, index) => {
//   dot.addEventListener("click", () => {
//     clearInterval(slideInterval);
//     changeSlide(index);
//     startSlideInterval();
//   });
// });

// startSlideInterval();

// //this makes the slider target figcaption and p when hover img or p.
// const slidesHover = document.querySelectorAll('.slide');
// slidesHover.forEach(slide => {
//     const img = slide.querySelector('img');
//     const paragraph = slide.querySelector('p');

    
//     img.addEventListener('mouseenter', () => {
//         slide.classList.add('hover-effect');
//     });

//     img.addEventListener('mouseleave', () => {
//         slide.classList.remove('hover-effect');
//     });

    
//     paragraph.addEventListener('mouseenter', () => {
//         slide.classList.add('hover-effect');
//     });

//     paragraph.addEventListener('mouseleave', () => {
//         slide.classList.remove('hover-effect');
//     });
// });

// fetchJackets();











// const url = "https://api.noroff.dev/api/v1/rainy-days";
// const jacketContainer = document.querySelector(".product-section");
// const sortBySelect = document.querySelector(".sort-by");

// const firstGroupContainer = document.querySelector(".first-group");
// const secondGroupContainer = document.querySelector(".second-group");

// //Loading that is used in fetchJackets function
// const loadingContainer = document.querySelector(".loading-animation");

// function showLoading() {
//   loadingContainer.style.display = "block";
// }

// function hideLoading() {
//   loadingContainer.style.display = "none";
// }

// //this function determinate which page and how many jackets it will display
// function determinePage() {
//   const path = window.location.pathname;

//   if (path === "/" || path.includes("index.html")) {
//     return "page1";
//   } else {
//     return null;
//   }
// }

// // stores api data
// let fetchedJackets = [];

// //eventlistner for jacket.html
// if (sortBySelect) {
//   sortBySelect.addEventListener("change", handleSort);
// }

// // this function fetch the jackets from the api
// async function fetchJackets() {
//   showLoading();
//   try {
//     // await new Promise(resolve => setTimeout(resolve, 2000));
//     const response = await fetch(url);
//     fetchedJackets = await response.json();
//     originalOrder = [...fetchedJackets];

//     const currentPage = determinePage();
//     if (currentPage === "page1") {
//       renderJackets(fetchedJackets.slice(0, 3), firstGroupContainer);
//       renderJackets(fetchedJackets.slice(3, 6), secondGroupContainer);
//     } else {
//       renderJackets(fetchedJackets, jacketContainer);
//     }
//     hideLoading();
//   } catch (error) {
//     displayError();
//     console.error("Error fetching jackets:", error);
//   }
// }

// // this function render the jackets
// function renderJackets(jackets, targetContainer) {
//   targetContainer.innerHTML = "";
//   let productsHTML = "";

//   for (const jacket of jackets) {
//     const discountLabel = jacket.onSale
//       ? `<div class="discount-label">On Sale</div>`
//       : "";
//     const originalPrice = jacket.onSale
//       ? `<div class="original-price">$ ${jacket.price}</div>`
//       : "";

//     productsHTML += `
//             <div class="product1-container">
//                 <div class="product1">
//                     <div>
//                         <a href="/html/product.html?id=${jacket.id}">
//                             <img class="item1" src="${jacket.image}" alt="${
//       jacket.title
//     }"/>
//                             <div class="text-container"><p class="product1-text">${
//                               jacket.title
//                             }<br> $ ${
//       jacket.discountedPrice || jacket.price
//     } ${originalPrice} ${discountLabel} </p></div>
//                         </a>
//                     </div>
//                 </div>
//             </div>
//         `;
//   }

//   const jacketsElement = document.createElement("div");
//   jacketsElement.classList.add("background-product");
//   jacketsElement.innerHTML = productsHTML;
//   targetContainer.appendChild(jacketsElement);
// }

// // This function displays error of the api fail to fetch
// function displayError() {
//   const errorMessage = document.createElement("p");
//   errorMessage.textContent = "An error occurred while fetching data.";
//   errorMessage.classList.add("error-message");

//   jacketContainer.innerHTML = "";
//   jacketContainer.appendChild(errorMessage);
// }

// // This functon sorts and renders the jackets based on what u select for jackets.HTML
// async function handleSort() {
//   if (!fetchedJackets.length) {
//     await fetchJackets();
//   }

//   switch (sortBySelect.value) {
//     case "Sort by: Price low to high":
//       fetchedJackets.sort((a, b) => a.price - b.price);
//       break;
//     case "Sort by: Price high to low":
//       fetchedJackets.sort((a, b) => b.price - a.price);
//       break;
//     case "Sort by: On sale first":
//       fetchedJackets.sort((a, b) => (b.onSale === true) - (a.onSale === true));
//       break;
//     case "Sort by:":
//       fetchedJackets = [...originalOrder];
//       break;
//     default:
//       break;
//   }

//   renderJackets(fetchedJackets, jacketContainer);
// }

// //FOR INDEX.HTML
// let slides = document.querySelectorAll(".slide");
// let dots = document.querySelectorAll(".dot");
// let currentSlide = 0;
// let slideInterval;

// //Seasonal slider interval
// function startSlideInterval() {
//   slideInterval = setInterval(changeSlide, 4500);
// }
// //Seasonal Slider
// function changeSlide(newSlideIndex = (currentSlide + 1) % slides.length) {
//   slides[currentSlide].style.opacity = "0";
//   dots[currentSlide].classList.remove("active");

//   currentSlide = newSlideIndex;
//   const offset = -1 * currentSlide * 100;
//   document.querySelector(".slides").style.transform = `translateX(${offset}%)`;

//   slides[currentSlide].style.opacity = "1";
//   dots[currentSlide].classList.add("active");
// }

// dots.forEach((dot, index) => {
//   dot.addEventListener("click", () => {
//     clearInterval(slideInterval);
//     changeSlide(index);
//     startSlideInterval();
//   });
// });

// startSlideInterval();

// //this makes the slider target figcaption and p when hover img or p.
// const slidesHover = document.querySelectorAll('.slide');
// slidesHover.forEach(slide => {
//     const img = slide.querySelector('img');
//     const paragraph = slide.querySelector('p');

    
//     img.addEventListener('mouseenter', () => {
//         slide.classList.add('hover-effect');
//     });

//     img.addEventListener('mouseleave', () => {
//         slide.classList.remove('hover-effect');
//     });

    
//     paragraph.addEventListener('mouseenter', () => {
//         slide.classList.add('hover-effect');
//     });

//     paragraph.addEventListener('mouseleave', () => {
//         slide.classList.remove('hover-effect');
//     });
// });

// fetchJackets();


