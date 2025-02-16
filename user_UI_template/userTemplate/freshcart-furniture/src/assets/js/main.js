'use strict';

(function () {
	// Multi level menu dropdown
	const dropdownLinks = document.querySelectorAll('.dropdown-menu a.dropdown-toggle');
	dropdownLinks.forEach(function (dropdownLink) {
		dropdownLink.addEventListener('click', function (e) {
			if (!this.nextElementSibling.classList.contains('show')) {
				const parentDropdownMenu = this.closest('.dropdown-menu');
				const currentlyOpenSubMenus = parentDropdownMenu.querySelectorAll('.show');
				currentlyOpenSubMenus.forEach(function (openSubMenu) {
					openSubMenu.classList.remove('show');
				});
			}

			const subMenu = this.nextElementSibling;
			subMenu.classList.toggle('show');

			const parentDropdown = this.closest('li.nav-item.dropdown.show');
			if (parentDropdown) {
				parentDropdown.addEventListener('hidden.bs.dropdown', function (e) {
					const dropdownSubMenus = document.querySelectorAll('.dropdown-submenu .show');
					dropdownSubMenus.forEach(function (dropdownSubMenu) {
						dropdownSubMenu.classList.remove('show');
					});
				});
			}

			e.stopPropagation();
		});
	});
	// Default Tooltip
	var tooltipTriggerElements = document.querySelectorAll('[data-bs-toggle="tooltip"]');

	if (tooltipTriggerElements.length) {
		tooltipTriggerElements.forEach(function (element) {
			new bootstrap.Tooltip(element);
		});
	}

	// Default Popover
	var popoverTriggerElements = document.querySelectorAll('[data-bs-toggle="popover"]');

	if (popoverTriggerElements.length) {
		popoverTriggerElements.forEach(function (element) {
			new bootstrap.Popover(element);
		});
	}

	// rater

	var starRating1;
	var raterElements = document.querySelectorAll('.rater');

	raterElements.forEach(function (element, index) {
		starRating1 = raterJs({
			starSize: 20,
			element: element,
			rateCallback: function rateCallback(rating, done) {
				this.setRating(rating);
				done();
			},
		});
	});
	// Price Range Slider
	var priceRangeSlider = document.getElementById('priceRange');

	if (priceRangeSlider) {
		noUiSlider.create(priceRangeSlider, {
			connect: true,
			behaviour: 'tap',
			start: [49, 199],
			range: {
				min: [6],
				max: [300],
			},
			format: wNumb({
				decimals: 1,
				thousand: '.',
				prefix: '$',
			}),
		});

		var priceRangeValueElement = document.getElementById('priceRange-value');

		priceRangeSlider.noUiSlider.on('update', function (values) {
			priceRangeValueElement.innerHTML = `<span class="price-min border py-1 px-3">${values[0]}</span>  <span class="price-max border py-1 px-3">${values[1]}</span>`;
		});
	}

	// Collapse button

	var collapseContent = document.getElementById('collapseContent');

	if (collapseContent) {
		document.getElementById('toggleButton').addEventListener('click', function () {
			collapseContent.addEventListener('shown.bs.collapse', function () {
				// Once the collapse has finished expanding, hide the button
				document.getElementById('toggleButton').style.display = 'none';
			});
		});
	}
})();
