document.addEventListener("DOMContentLoaded", () => {
    const cartItemCount = document.querySelectorAll(".cart-item-count");
    
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
        const cart = JSON.parse(savedCart);

        const totalCount = cart.reduce((acc, currItem) => acc + currItem.quantity, 0);

        cartItemCount.forEach(element => {
            element.textContent = totalCount;
        });
    }
});

//here i used reduce to iterate over each item in the car like oliver showed us on the live session. 





//first try

// document.addEventListener("DOMContentLoaded", () => {
//     const cartItemCount = document.querySelector(".cart-item-count");
    
//     // Load cart data from localStorage
//     const savedCart = localStorage.getItem("cart");
//     if (savedCart) {
//         const cart = JSON.parse(savedCart);

//         // Simply set the text content to the length of the cart array
//         cartItemCount.textContent = cart.length;
//     }
// });
