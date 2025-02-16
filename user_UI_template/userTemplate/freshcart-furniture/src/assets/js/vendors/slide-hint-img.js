// Hint Slide

document.querySelectorAll(".slide").forEach(function (slider) {
   let hintTimeout;

   slider.addEventListener("click", function () {
      const hintId = slider.getAttribute("data-hint-id"); // Get corresponding hint ID
      const hint = document.getElementById(hintId);

      if (hint) {
         hint.classList.add("show");

         // Clear any previous timer to avoid conflicts
         if (hintTimeout) {
            clearTimeout(hintTimeout);
         }

         // Hide the hint after 3 seconds
         hintTimeout = setTimeout(function () {
            hint.classList.remove("show");
         }, 3000);
      }
   });
});
