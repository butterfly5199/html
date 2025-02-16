// Color changes

document.addEventListener("DOMContentLoaded", function () {
   // Initialize GLightbox if elements with the '.glight' class are present
   if (document.querySelector(".glight")) {
      const lightbox = GLightbox({
         selector: ".glight",
         touchNavigation: true,
         loop: true,
      });
   }

   // Color image mapping for the first functionality
   const colorImageMap = {
      Gray: "./assets/images/product/product-single-gray.jpg",
      Green: "./assets/images/product/product-single-green.jpg",
      Blue: "./assets/images/product/product-single-blue.jpg",
      Red: "./assets/images/product/product-single-red.jpg",
   };

   // Function to handle image and main color label updates
   function initializeProductColorChange() {
      // Check if elements related to the main color change functionality are present
      const colorLabels = document.querySelectorAll("[data-label] label");
      const colorLabelProduct = document.querySelector("#colorProductOption");
      const mainImage = document.querySelector(".imgLoop");
      const mainImageLink = document.getElementById("mainImageLink");

      if (colorLabels.length > 0 && colorLabelProduct && mainImage && mainImageLink) {
         colorLabels.forEach((label) => {
            label.addEventListener("click", function () {
               const newColor = this.getAttribute("data-label");
               const newSrc = colorImageMap[newColor]; // Get new image source from the map

               // Update the main image src and the href of the main image link
               mainImage.src = newSrc;
               mainImageLink.href = newSrc;

               // Update the main color label display
               colorLabelProduct.textContent = newColor;
            });
         });
      }
   }

   // Function to handle separate color option updates
   function initializeColorOption() {
      // Check if elements related to the separate color option functionality are present
      const colorLabels = document.querySelectorAll("[data-label] label");
      const colorLabelOption = document.querySelector("#colorOption");

      if (colorLabels.length > 0 && colorLabelOption) {
         colorLabels.forEach((label) => {
            label.addEventListener("click", function () {
               const newColor = this.getAttribute("data-label");

               // Update the separate color label display
               colorLabelOption.textContent = newColor;
            });
         });
      }
   }

   // Call the functions only if their respective elements exist
   initializeProductColorChange();
   initializeColorOption();
});
