// Glight Gallery

const lightbox = GLightbox({
	touchNavigation: true,
	loop: true,
	autoplayVideos: true,
});

document.addEventListener('DOMContentLoaded', function () {
	const lightbox = GLightbox({
		selector: '.glight',
		touchNavigation: true,
		loop: true,
	});

	// Your logic to handle color selection and updating the main image
	const colorImageMap = {
		Gray: './assets/images/product-single-gray.png',
		Green: './assets/images/product-single-green.png',
		Blue: './assets/images/product-single-blue.png',
		Red: './assets/images/product-single-red.png',
	};

	// Other logic for color selection and updating the image...
});
