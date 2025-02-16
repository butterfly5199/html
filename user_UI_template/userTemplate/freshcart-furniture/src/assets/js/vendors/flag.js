// Flag js

function changeCurrency(country, currency, flagSrc) {
   document.getElementById("current-currency").innerText = `${currency} ${currency === "USD" ? "$" : currency === "EUR" ? "€" : "£"}`;
   document.getElementById("current-flag").src = flagSrc;
}

document.getElementById("currencyDropdown").addEventListener("click", function () {
   const dropdown = this;
   const arrowIcon = document.getElementById("arrowIcon");

   dropdown.addEventListener("shown.bs.dropdown", function () {
      arrowIcon.classList.remove("bi-chevron-down");
      arrowIcon.classList.add("bi-chevron-up");
   });

   dropdown.addEventListener("hidden.bs.dropdown", function () {
      arrowIcon.classList.remove("bi-chevron-up");
      arrowIcon.classList.add("bi-chevron-down");
   });
});
