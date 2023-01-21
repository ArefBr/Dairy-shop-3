$(document).ready(function() {
    $('.add-to-cart').click(function() {
        let productName = $(this).closest('.card').find('.card-title').text();
        let productPrice = $(this).closest('.card').find('.card-text').text();
        let product = { name: productName, price: productPrice };
    
        // Check if cart already exists in LocalStorage
        if (localStorage.getItem("cart") === null) {
          // If not, create a new cart and add the first item
          let cart = [];
          cart.push(product);
          localStorage.setItem("cart", JSON.stringify(cart));
        } else {
          // If yes, retrieve the cart and add the new item
          let cart = JSON.parse(localStorage.getItem("cart"));
          cart.push(product);
          localStorage.setItem("cart", JSON.stringify(cart));
        }
        alert('Product added to cart!');
      });
    });
    
  