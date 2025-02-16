// Drift js

document.addEventListener("DOMContentLoaded", function () {
   const zoomedImages = document.querySelectorAll(".drift");

   zoomedImages.forEach((img) => {
      const options = JSON.parse(img.getAttribute("data-zoom-options"));

      new Drift(img, {
         paneContainer: document.querySelector(options.paneSelector), // Pane for the zoom effect
         inlinePane: options.inlinePane,
         hoverDelay: options.hoverDelay,
         touchDisable: options.touchDisable,
         containInline: true, // Keeps zoom inside container
      });
   });
});
