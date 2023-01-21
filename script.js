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
    
    //TODO: Remove Item: You can add a "remove" button next to each item in the cart, which will allow the user to remove an item from the cart if they change their mind.

    //TODO: Update Quantity: You can add an input field next to each item in the cart to allow the user to update the quantity of that item in the cart.
    
    //TODO: Clear Cart: You can add a "Clear Cart" button to the cart section that will allow the user to easily remove all items from the cart.
    
    //TODO: Persistence: You can use the LocalStorage object to persist the cart data even when the user closes the browser or navigates to a different page. This way, when the user returns to the website, their cart will still contain the items they previously added.
    
    //TODO: LocalStorage : You can add functionality to retrieve the cart data from LocalStorage when the page is loaded, and show the cart items and total cost in the cart section accordingly.