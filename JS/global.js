const corsAnywhereUrl = "https://noroffcors.onrender.com/";
const originalUrl = "https://rainydays.cmsbackendsolutions.com/wp-json/wc/store/products?per_page=20";
const url = corsAnywhereUrl + originalUrl;

//cart item count 
document.addEventListener("DOMContentLoaded", () => {
  const cartItemCount = document.querySelectorAll(".cart-item-count");

  const savedCart = localStorage.getItem("cart");
  if (savedCart) {
    const cart = JSON.parse(savedCart);

    const totalCount = cart.reduce(
      (acc, currItem) => acc + currItem.quantity,
      0
    );
    

    cartItemCount.forEach((element) => {
      element.textContent = totalCount;
    });
  }
});


//searchbar

const inputSearch = document.querySelector(".input-search");
const dropdown = document.querySelector(".search-dropdown");

// this function makes a delay that we can use to the function under. 
function debounce(func, delay) {
  let debounceTimer;
  return function(...args) {
    const context = this;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(context, args), delay);
  };
}

// This function use the debounce above, checking if there is text in the input, fetch api and filter the search to find the jacket.
const debouncedSearch = debounce(async function(e) {
    const query = e.target.value.toLowerCase();
    
    if(query.length === 0) {
        dropdown.style.display = 'none';
        return;
    }

    const allJackets = await fetchJacketsForSearch();
    //filter search variable
    const matchedJackets = allJackets.filter(jacket => 
      jacket.name.toLowerCase().includes(query) ||
      jacket.tags.some(tag => tag.name.toLowerCase().includes(query))
  );

    displayJacketsInDropdown(matchedJackets);
}, 300);

inputSearch.addEventListener("input", debouncedSearch);

document.addEventListener('click', function(event) {
  if (!dropdown.contains(event.target) && event.target !== inputSearch) {
      dropdown.style.display = 'none';
  }
});


// this function fetch the api and return it to json data.
async function fetchJacketsForSearch() {
    try {
        const apiResponse = await fetch(url);
        const allJackets = await apiResponse.json();
        return allJackets;
    } catch(error) {
      dropdown.innerHTML = "<div>Sorry, we couldn't retrieve jacket data at the moment. Please try again later</div>";
      dropdown.style.display = 'block';
      dropdown.style.background = "white";
      dropdown.style.textAlign = "center";
    }
}

// this function displays the jackets that are searched for, or els show a "no jackets" text
function displayJacketsInDropdown(jackets) {
    if(jackets.length === 0) {
        dropdown.innerHTML = "<div>No jackets found.</div>";
        dropdown.style.display = 'block';
        dropdown.style.background = "white";
        dropdown.style.textAlign = "center";
        return;
    }
    
    let jacketsHTML = '';
    jackets.forEach(jacket => {
        jacketsHTML += `<div class="search-container">
        <a href="/html/product.html?id=${jacket.id}" class="search-dropdown-item">
            <div class="content-wrapper">
                <span class="text">${jacket.name}</span>
                <img src="${jacket.images[0].src}" alt="${jacket.name}" class="image">
            </div>
        </a>
    </div>`;
    });
    
    dropdown.innerHTML = jacketsHTML;
    dropdown.style.display = 'block';
}






