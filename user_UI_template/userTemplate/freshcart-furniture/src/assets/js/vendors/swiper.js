function initializeSwiperCarousels() {
	const swiperContainers = document.querySelectorAll('.swiper-container');

	swiperContainers.forEach((swiperContainer) => {
		const speed = swiperContainer.getAttribute('data-speed') || 400;
		const spaceBetween = swiperContainer.getAttribute('data-space-between') || 20;
		const paginationEnabled = swiperContainer.getAttribute('data-pagination') === 'true';
		const navigationEnabled = swiperContainer.getAttribute('data-navigation') === 'true';
		const autoplayEnabled = swiperContainer.getAttribute('data-autoplay') === 'true';
		const autoplayDelay = swiperContainer.getAttribute('data-autoplay-delay') || 3000;
		const paginationType = swiperContainer.getAttribute('data-pagination-type') || 'bullets';
		const centerSlides = swiperContainer.getAttribute('data-center-slides') === 'true';
		const effect = swiperContainer.getAttribute('data-effect') || 'slide';
		const thumbsEnabled = swiperContainer.getAttribute('data-thumbs') === 'true';

		let breakpoints = {};
		const breakpointsData = swiperContainer.getAttribute('data-breakpoints');
		if (breakpointsData) {
			try {
				breakpoints = JSON.parse(breakpointsData);
			} catch (error) {
				console.error('Error parsing breakpoints data:', error);
			}
		}

		const swiperOptions = {
			speed: parseInt(speed),
			spaceBetween: parseInt(spaceBetween),
			breakpoints: breakpoints,
			slidesPerView: 'auto',
			effect: effect,
		};

		if (effect === 'fade') {
			swiperOptions.fadeEffect = { crossFade: true };
		}

		if (centerSlides) {
			swiperOptions.slidesPerView = 'auto';
			swiperOptions.centeredSlides = true;
		}

		if (paginationEnabled) {
			const paginationEl = swiperContainer.querySelector('.swiper-pagination');
			if (paginationEl) {
				swiperOptions.pagination = {
					el: paginationEl,
					type: paginationType,
					dynamicBullets: false,
					clickable: true,
				};
			}
		}

		if (navigationEnabled) {
			swiperOptions.navigation = {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			};
		}

		if (autoplayEnabled) {
			swiperOptions.autoplay = { delay: parseInt(autoplayDelay) };
		}

		// Initialize thumbs gallery if enabled
		let thumbsSwiper;
		if (thumbsEnabled) {
			const thumbsContainer = swiperContainer.nextElementSibling; // Assuming thumbs is the next sibling
			if (thumbsContainer && thumbsContainer.classList.contains('swiper-thumbs')) {
				thumbsSwiper = new Swiper(thumbsContainer, {
					spaceBetween: 10,
					slidesPerView: 4,
					freeMode: true,
					watchSlidesProgress: true,
				});

				swiperOptions.thumbs = { swiper: thumbsSwiper };
			}
		}

		new Swiper(swiperContainer, swiperOptions);
	});
}

initializeSwiperCarousels();

// for modal
// Declare modalElement at the top
var modalElement = document.getElementById('quickViewModal'); // Replace with your modal ID

// If modalElement is found, add the event listener
if (modalElement) {
	modalElement.addEventListener('shown.bs.modal', function () {
		initializeSwiperCarousels();
	});
}
