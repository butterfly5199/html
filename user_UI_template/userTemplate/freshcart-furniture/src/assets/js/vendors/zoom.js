// Function to handle the zoom effect
function addZoomEffect() {
	const zoomContainer = document.querySelector('.zoom-container');
	const image = zoomContainer.querySelector('img');

	zoomContainer.addEventListener('mousemove', function (e) {
		const zoomLevel = 1.3; // Zoom level (e.g., 2x zoom)
		const { left, top, width, height } = zoomContainer.getBoundingClientRect();

		const x = ((e.pageX - left) / width) * 100;
		const y = ((e.pageY - top) / height) * 100;

		image.style.transformOrigin = `${x}% ${y}%`; // Move zoom origin to the mouse position
		image.style.transform = `scale(${zoomLevel})`; // Apply zoom
	});

	zoomContainer.addEventListener('mouseleave', function () {
		image.style.transform = 'scale(1)'; // Reset zoom when mouse leaves
	});
}

// Call the function to enable zoom effect
addZoomEffect();
