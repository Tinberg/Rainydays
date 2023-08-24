
document.addEventListener("DOMContentLoaded", () => {
    const cartItemCount = document.querySelector(".cart-item-count");
    
    // Load cart data from localStorage
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
        const cart = JSON.parse(savedCart);
        let totalItems = 0;

        cart.forEach(item => {
            totalItems += item.quantity;
        });

        cartItemCount.textContent = totalItems;
    }
    
});