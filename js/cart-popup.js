
// cart-popup.js
document.addEventListener("DOMContentLoaded", function() {
// Select the cart popup and the cart button
const cartPopup = document.getElementById("cart-popup");
const cartButton = document.querySelector(".fa-shopping-cart");

// Function to show the cart popup
function showCartPopup() {
  cartPopup.classList.add("show");
  document.addEventListener("click", closeCartPopup);
}

// Function to close the cart popup
function closeCartPopup(e) {
  if (!cartPopup.contains(e.target) && e.target !== cartButton) {
    cartPopup.classList.remove("show");
    document.removeEventListener("click", closeCartPopup);
  }
}

// Event listener to show the cart popup when the cart icon is clicked
cartButton.addEventListener("click", showCartPopup);
})

const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
addToCartButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const productName = button.getAttribute("data-product-name");
    const productPrice = button.getAttribute("data-product-price");
    const productImage = button.getAttribute("data-product-image");

    // Add the item to the cart popup
    addItemToCart(productName, productPrice, productImage);
  });
});
