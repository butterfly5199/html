// Add to cart

const quickBuyCountElem = document.getElementById("quickBuyCount");
const cartItemsContainer = document.getElementById("cartItems");
const totalAmountElem = document.getElementById("totalAmount");
const totalAmountContainer = document.getElementById("totalAmountContainer");
const emptyCartMessage = document.getElementById("emptyCartMessage");

// Set initial variables
let quickBuyCount = 0;
let totalAmount = 0;

// Function to update the quick buy count in the navbar
function updateQuickBuyCount() {
   quickBuyCountElem.textContent = quickBuyCount;
}

// Function to update the total amount in the cart summary
function updateTotalAmount() {
   totalAmountElem.textContent = `$${totalAmount.toFixed(2)}`;
}

// Function to calculate total price based on item quantities
function calculateTotalAmount() {
   totalAmount = 0;
   document.querySelectorAll(".cart-item").forEach((item) => {
      const quantity = parseInt(item.querySelector(".quantity-input").value);
      const price = parseFloat(item.getAttribute("data-product-price"));
      totalAmount += quantity * price;
   });
   updateTotalAmount();
   checkCartEmpty(); // Check if the cart is empty after updating the total
}

// Function to remove item from cart
function removeCartItem(cartItem) {
   const quantity = parseInt(cartItem.querySelector(".quantity-input").value);

   // Decrease quick buy count and remove item from DOM
   quickBuyCount -= quantity;
   cartItem.remove();

   // Recalculate the total amount
   calculateTotalAmount();
   updateQuickBuyCount();
}

// Function to check if the cart is empty and show/hide the empty message and total amount
function checkCartEmpty() {
   if (cartItemsContainer.children.length === 0) {
      emptyCartMessage.style.display = "block"; // Show the empty cart message
      totalAmountContainer.style.display = "none"; // Hide the total amount
   } else {
      emptyCartMessage.style.display = "none"; // Hide the empty cart message
      totalAmountContainer.style.display = "flex"; // Show the total amount
   }
}

// Function to check if a product is already in the cart
function findCartItem(productName) {
   return Array.from(cartItemsContainer.children).find((item) => item.querySelector("h6").textContent === productName);
}

// Get all "Quick Add" buttons in the product cards
const quickAddButtons = document.querySelectorAll(".quick-add-btn");

// Add a click event listener to each "Quick Add" button
quickAddButtons.forEach((button) => {
   button.addEventListener("click", function (e) {
      e.preventDefault();

      // Get product details from data attributes
      const productName = button.getAttribute("data-product-name");
      const productPrice = parseFloat(button.getAttribute("data-product-price"));
      const productImg = button.getAttribute("data-product-img");

      // Check if the product is already in the cart
      const existingCartItem = findCartItem(productName);

      if (existingCartItem) {
         // If the item exists, increase its quantity
         const quantityInput = existingCartItem.querySelector(".quantity-input");
         quantityInput.value = parseInt(quantityInput.value) + 1;

         // Update quick buy count and total amount
         quickBuyCount++;
         calculateTotalAmount();
         updateQuickBuyCount();
      } else {
         // Increment quick buy count and update navbar
         quickBuyCount++;
         updateQuickBuyCount();

         // Add the product thumbnail, name, and quantity controls to the offcanvas (cart summary)
         const cartItemHTML = `
              <div class="d-flex mb-3 align-items-start cart-item gap-4 border-bottom pb-3" data-product-price="${productPrice}">
                <img src="${productImg}" alt="${productName}" class="img-fluid  col-2 border" />
                <div class="me-auto">
                  <h6 class="mb-1">${productName}</h6>
                  <div>$${productPrice.toFixed(2)}</div>
                 <div class="d-inline-flex align-items-center mt-2 border p-2">
									<button class="btn btn-icon btn-xs btn-focus-none quantity-btn minus fs-5">-</button>
									<input type="number" class="form-control quantity-input text-center mx-1 p-0 border-0" value="1" min="1" style="width: 40px">
									<button class="btn btn-icon btn-xs btn-focus-none quantity-btn plus fs-5">+</button>
								</div>
                </div>
                <button class="btn btn-danger btn-sm remove-item-btn">
                  Remove
                </button>
              </div>
            `;
         cartItemsContainer.insertAdjacentHTML("beforeend", cartItemHTML);

         // Update total amount
         calculateTotalAmount();

         // Automatically open the Bootstrap Offcanvas
         const cartOffcanvas = new bootstrap.Offcanvas(document.getElementById("cartOffcanvas"));
         cartOffcanvas.show();

         // Add event listeners to the newly added cart item
         const newItem = cartItemsContainer.lastElementChild;

         // Handle quantity increment and decrement
         newItem.querySelector(".plus").addEventListener("click", function () {
            const quantityInput = newItem.querySelector(".quantity-input");
            quantityInput.value = parseInt(quantityInput.value) + 1;
            quickBuyCount++;
            calculateTotalAmount();
            updateQuickBuyCount();
         });

         newItem.querySelector(".minus").addEventListener("click", function () {
            const quantityInput = newItem.querySelector(".quantity-input");
            if (parseInt(quantityInput.value) > 1) {
               quantityInput.value = parseInt(quantityInput.value) - 1;
               quickBuyCount--;
               calculateTotalAmount();
               updateQuickBuyCount();
            }
         });

         // Handle item removal
         newItem.querySelector(".remove-item-btn").addEventListener("click", function () {
            removeCartItem(newItem);
         });
      }

      // Hide "Cart is empty" message and show total amount when an item is added
      checkCartEmpty();
      // Show the toast notification
      const toast = new bootstrap.Toast(document.getElementById("itemAddedToast"));
      toast.show();
   });
});

// Initial check for empty cart on page load
checkCartEmpty();
