$.getJSON("products.json", function (data) {
  // Render the product listing
  $.each(data, function (i, product) {
    $("#product-listing").append(`
      <div class="col-md-6 col-lg-4">
        <div class="card">
          <img class="card-img-top" src="${product.image}" alt="${product.name}">
          <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">${product.price}</p>
            <div class="d-flex justify-content-center">
              <button class="btn btn-success add-to-cart" data-product-name="${product.name}" data-product-price="${product.price}">Add to Cart</button>
            </div>
          </div>
        </div>
      </div>`);
  });
  // Call the renderCart() function here to retrieve the cart data from LocalStorage and rebuild the cart items
  renderCart();
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', addToCart);
  });
});

// Get the "add to cart" buttons, cart section, and total cost span
const cart = document.querySelector('.cart');
const cartItems = cart.querySelector('.cart-items');
const total = cart.querySelector('.total-cost');
const viewCartButton = document.querySelector('.view-cart');


// Add click event listeners to all "add to cart" buttons


// Add click event listener to the "View Cart" button
viewCartButton.addEventListener('click', viewCart);

// "Add to Cart" button click event function
function addToCart(event) {
  // Get the product name and price from the button's data attributes
  const productName = $(event.target).data('product-name');
  const productPrice = parseFloat($(event.target).data('product-price').replace("$", ""));
  
  // Create a new list item for the product
  const newItem = document.createElement('li');
  newItem.innerHTML = `${productName} - $${productPrice.toFixed(2)}`;
  
  // Add the new item to the cart
  cartItems.appendChild(newItem);

  // Add the item's price to the total
  let currentTotal = parseFloat(total.innerHTML.substring(1));
  currentTotal += productPrice;
  total.innerHTML = `$${currentTotal.toFixed(2)}`;
  
  // Add to Local Storage
  const cartData = JSON.parse(localStorage.getItem('cartData')) || {};
  if (!cartData[productName]) {
    cartData[productName] = {
      qty: 1,
      price: productPrice.toString()
    };
  }
  else {
    cartData[productName].qty += 1;
  }
  localStorage.setItem('cartData', JSON.stringify(cartData));
  renderCart()
}

function renderCart() {
  // Retrieve cart data from LocalStorage
  const cartData = JSON.parse(localStorage.getItem('cartData'));
  if (cartData) {
    // Clear the cart
    while (cartItems.firstChild) {
      cartItems.removeChild(cartItems.firstChild);
    }
    // Rebuild the cart items
    let currentTotal = 0;
    for (const productName in cartData) {
      const product = cartData[productName];
      // Create a new list item for the product
      const newItem = document.createElement('li');
      newItem.innerHTML = `${productName} x ${product.qty} - $${(product.price * product.qty).toFixed(2)}
                            <div class="quantity">
                              <input type="number" min="1" max="50" value="${product.qty}" class="form-control quantity-input" data-product-name="${productName}">
                            </div>`;
      // Add the new item to the cart
      cartItems.appendChild(newItem);

      // Add the item's price to the total
      currentTotal += product.price * product.qty;


    }
    total.innerHTML = `$${currentTotal.toFixed(2)}`;
  }
  // Get the quantity input fields
  const quantityInputs = cartItems.querySelectorAll('.quantity-input');

  // Add change event listeners to all input fields
  quantityInputs.forEach(input => {
  input.addEventListener('change', updateQuantity);

});
}
// "View Cart" button click event function
function viewCart() {
  renderCart()
  // Show the cart section
  cart.classList.toggle('visible');
}


// Update Quantity event function
function updateQuantity(event) {
  // Get the product name and new quantity from the input field
  const productName = event.target.dataset.productName;
  const newQuantity = event.target.value;
  

  // Update the cart data in Local Storage
  const cartData = JSON.parse(localStorage.getItem('cartData'));
  cartData[productName].qty = newQuantity;
  localStorage.setItem('cartData', JSON.stringify(cartData));

  // Rebuild the cart items
  renderCart();
}

// "View Cart" button
document.querySelector('.view-cart').addEventListener('click', function () {
  document.querySelector('.cart').classList.add('visible');
  document.querySelector('.body-container').classList.add('blurred');
  
});

// Close icon
document.querySelector('.close-cart').addEventListener('click', function () {
  document.querySelector('.cart').classList.remove('visible');
  document.querySelector('.body-container').classList.remove('blurred');
});

// Close if click out of cart
// document.addEventListener('click', function (event) {
//   if (event.target.closest('.cart') == null && document.querySelector('.cart').classList.contains('visible')) {
//     document.querySelector('.cart').classList.remove('visible');
//     document.querySelector('.body-container').classList.remove('blurred');
//   }
// });


document.addEventListener('click', function (event) {
  if (!event.target.classList.contains('cart')
      && !event.target.classList.contains('view-cart') 
      && !event.target.classList.contains('quantity-input')
      && !event.target.classList.contains('cart-footer')
      && !event.target.classList.contains('cart-header')
      && (event.target.closest('.cart') == null)) {
    document.querySelector('.cart').classList.remove('visible');
    document.querySelector('.body-container').classList.remove('blurred');
  }
});

$(document).on("click", ".add-to-cart", function () {
  document.querySelector('#popup-notification').classList.add('visible');
  setTimeout(function () {
    document.querySelector('#popup-notification').classList.remove('visible');
  }, 3000);
});

$(document).on("click", ".close-popup", function () {
  document.querySelector('#popup-notification').classList.remove('visible');
});




//TODO: Remove Item: You can add a "remove" button next to each item in the cart, which will allow the user to remove an item from the cart if they change their mind.

//TODO: Update Quantity: You can add an input field next to each item in the cart to allow the user to update the quantity of that item in the cart.

//TODO: Clear Cart: You can add a "Clear Cart" button to the cart section that will allow the user to easily remove all items from the cart.

//TODO: Persistence: You can use the LocalStorage object to persist the cart data even when the user closes the browser or navigates to a different page. This way, when the user returns to the website, their cart will still contain the items they previously added.

//TODO: LocalStorage : You can add functionality to retrieve the cart data from LocalStorage when the page is loaded, and show the cart items and total cost in the cart section accordingly.