// Function to update the checkbox count for a specific dropdown
function updateCheckboxCount(dropdownMenu) {
	// Find checkboxes only within the specified dropdown
	const checkboxes = dropdownMenu.querySelectorAll('.form-check-input');

	// Count the number of checked checkboxes
	const checkedCount = Array.from(checkboxes).filter((checkbox) => checkbox.checked).length;

	// Get the related button using the data attribute
	const dropdownType = dropdownMenu.getAttribute('data-dropdown');
	const dropdownButton = document.querySelector(`.dropdownButton[data-dropdown="${dropdownType}"]`);

	// Update the dropdown button text
	dropdownButton.textContent = `${dropdownType.charAt(0).toUpperCase() + dropdownType.slice(1)} (${checkedCount})`;
}

// Attach event listeners to each checkbox inside all dropdowns
document.querySelectorAll('.dropdownSelect').forEach((dropdownMenu) => {
	// Find all checkboxes inside this dropdown
	const checkboxes = dropdownMenu.querySelectorAll('.form-check-input');

	checkboxes.forEach((checkbox) => {
		checkbox.addEventListener('change', () => updateCheckboxCount(dropdownMenu));
	});
});
