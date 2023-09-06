$( document ).ready(function() {
  $(".aside-label").click(function() {
    $(".aside").toggleClass("aside--slide-x");
    $(".aside-label").toggleClass("aside-labe__icon--slide-x");
  });  
});

document.addEventListener("DOMContentLoaded", function () {
  // Array to store cart items
  const cartItems = [];
  const baseUrl = "./assets/";

  // Get all "Add to Cart" buttons
  const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");

  // Get the cart container and subtotal elements
  const cartContainer = document.getElementById("cart");
  const cartSubtotal = document.querySelector(".aside__cart__subtotal span");

  // Function to add a product to the cart
  function addToCart(productName, productPrice, productImageSrc) {
      const item = {
          name: productName,
          price: productPrice,
          imageSrc: productImageSrc // Save the image source in the cart item
      };
      cartItems.push(item);
  }

  // Function to remove a product from the cart
  function removeFromCart(productName) {
      const index = cartItems.findIndex(item => item.name === productName);
      if (index !== -1) {
          cartItems.splice(index, 1);
      }
  }
// Add a delegated event listener for the "remove product" button
document.addEventListener("click", function(event) {
    if (event.target.classList.contains("remove-product-btn")) {
      // Handle the remove product action here (e.g., removing the product from the cart)
      handleRemoveProduct(event.target);
  
      // Don't close the cart popup
      event.stopPropagation();
    }
  });
  // Function to calculate and update the cart subtotal
  function updateCartSubtotal() {
      let subtotal = 0;
      cartItems.forEach((item) => {
          subtotal += item.price;
      });
      cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
  }

  // Function to update the cart display
  function updateCartDisplay() {
      const cartContainer = document.getElementById("cart");

      if (cartItems.length === 0) {
          cartContainer.style.visibility = "hidden"; // Hide the cart if it's empty
      } else {
          cartContainer.style.visibility = "visible"; // Show the cart if there are items
          cartContainer.innerHTML = ""; // Clear previous cart items

          cartItems.forEach((item) => {
              const cartItem = document.createElement("div");
              cartItem.classList.add("card", "cart__card");
              cartItem.innerHTML = `
                  <div class="row">
                      <div class="col-3 pr-0">
                          <img src="${item.imageSrc}" class="img-fluid w-100 cart__product__img">
                      </div>
                      <div class="col-9">
                          <!-- Rest of your cart item HTML -->
                          <p class="card__text__title">${item.name}</p>
                          <div class="price__normal">$${item.price.toFixed(2)}</div>
                          <button class="btn btn-outline-danger cart__product__delete">Remove</button>
                      </div>
                  </div>
              `;

              // Add click event listener to "Remove" button
              const removeButton = cartItem.querySelector(".cart__product__delete");
              removeButton.addEventListener("click", function () {
                  removeFromCart(item.name);
                  updateCartDisplay();
                  updateCartSubtotal();
              });

              cartContainer.appendChild(cartItem);
          });
      }

      updateCartSubtotal();
  }

  // Add click event listeners to "Add to Cart" buttons
  addToCartButtons.forEach((button) => {
      button.addEventListener("click", function () {
          const productName = button.getAttribute("data-product-name");
          const productPrice = parseFloat(button.getAttribute("data-product-price"));
          const productImageSrc = button.getAttribute("data-product-image");

          addToCart(productName, productPrice, productImageSrc);
          updateCartDisplay();
          updateCartSubtotal();
      });
  });
});

var $banner = $(".scroll-banner");
var $list = $banner.find("ul.client-list");
var $clonedList = $list.clone();
var $listWidth = $list.find("li").length * 212;

$list.add($clonedList).css({
	"width" : $listWidth + "px"
});

$clonedList.addClass("cloned").appendTo($banner);

// TimelineMax

var $infinite = new TimelineMax({repeat: -1, paused: false});
var $time = 15;

$infinite.fromTo($list, $time, {left:0}, {left: -$listWidth, ease: Linear.easeNone}, 0);
$infinite.fromTo($clonedList, $time, {left:$listWidth}, {left:0, ease: Linear.easeNone}, 0);
$infinite.set($list, {left: $listWidth});
$infinite.to($clonedList, $time, {left: -$listWidth, ease: Linear.easeNone}, $time);
$infinite.to($list, $time, {left: 0, ease: Linear.easeNone}, $time);

// Pause/Play

$banner.on("mouseenter", function(){
	$infinite.pause();
}).on("mouseleave", function(){
	$infinite.play();
});
