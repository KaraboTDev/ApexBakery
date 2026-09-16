// Store all hero slides so the carousel can switch between products.
const slides = [...document.querySelectorAll('.hero-slide')];
// Store the indicator buttons shown below the hero section.
const dots = [...document.querySelectorAll('.dot')];
// Store the previous and next arrow buttons.
const arrows = [...document.querySelectorAll('.hero-arrow')];
// Track which slide is currently visible.
let activeIndex = 0;
// Keep a reference to the automatic rotation timer.
let rotation;

// Display a selected slide and update its matching indicator.
function showSlide(index) {
    // Wrap the index so moving past the first or last slide continues cyclically.
    activeIndex = (index + slides.length) % slides.length;
    // Show only the active slide by adding or removing its CSS class.
    slides.forEach((slide, slideIndex) => slide.classList.toggle('is-active', slideIndex === activeIndex));
    // Update every indicator button to match the active slide.
    dots.forEach((dot, dotIndex) => {
        // Check whether this indicator belongs to the active slide.
        const isActive = dotIndex === activeIndex;
        // Style the active indicator and remove the style from the others.
        dot.classList.toggle('is-active', isActive);
        // Tell screen readers which indicator represents the current slide.
        dot.toggleAttribute('aria-current', isActive);
    });
}

// Move to the next product automatically every six seconds.
function startRotation() {
    rotation = window.setInterval(() => showSlide(activeIndex + 1), 6000);
}

// Restart automatic rotation after the user manually changes the slide.
function resetRotation() {
    // Stop the existing timer so several timers do not run at once.
    window.clearInterval(rotation);
    // Start a fresh six-second timer.
    startRotation();
}

// Give each arrow button a click action.
arrows.forEach((arrow) => arrow.addEventListener('click', () => {
    // Move forward for the next arrow or backward for the previous arrow.
    showSlide(activeIndex + (arrow.dataset.direction === 'next' ? 1 : -1));
    // Restart the automatic timer after the manual change.
    resetRotation();
}));

// Give each indicator button a click action.
dots.forEach((dot, dotIndex) => dot.addEventListener('click', () => {
    // Display the slide represented by the clicked indicator.
    showSlide(dotIndex);
    // Restart the automatic timer after the manual change.
    resetRotation();
}));

// Start the carousel only when hero slides exist on the current page.
if (slides.length) startRotation();

// Show ingredient details for products on the products page.
const detailButtons = [...document.querySelectorAll('.card-detail[data-product]')];
const detailDialog = document.querySelector('.detail-dialog');
const detailTitle = document.querySelector('#detail-title');
const detailIngredients = document.querySelector('.detail-ingredients');
const dialogClose = document.querySelector('.dialog-close');

function closeDetails() {
    if (detailDialog?.open) detailDialog.close();
}

detailButtons.forEach((button) => button.addEventListener('click', () => {
    detailTitle.textContent = button.dataset.product;
    detailIngredients.textContent = `Ingredients: ${button.dataset.ingredients}.`;
    detailDialog.showModal();
}));

dialogClose?.addEventListener('click', closeDetails);
detailDialog?.addEventListener('click', (event) => {
    if (event.target === detailDialog) closeDetails();
});
