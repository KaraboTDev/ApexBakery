// Store all hero slides so the carousel can switch between products.
const slides = [...document.querySelectorAll('.hero-slide')];
// Store the indicator buttons shown below the hero section.
const dots = [...document.querySelectorAll('.dot')];
// Store the previous and next arrow buttons.
const arrows = [...document.querySelectorAll('.hero-arrow')];
const menuToggle = document.querySelector('.menu-toggle');
const primaryNavigation = document.querySelector('#primary-navigation');
// Track which slide is currently visible.
let activeIndex = 0;
// Keep a reference to the automatic rotation timer.
let rotation;

function closeMobileMenu() {
    if (!menuToggle || !primaryNavigation) return;
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation menu');
    primaryNavigation.classList.remove('is-open');
}

menuToggle?.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Open navigation menu' : 'Close navigation menu');
    primaryNavigation?.classList.toggle('is-open', !isOpen);
});

primaryNavigation?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMobileMenu));
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMobileMenu();
});

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

// Expand gallery images in a native, keyboard-accessible lightbox.
const lightboxButtons = [...document.querySelectorAll('.lightbox-trigger[data-image]')];
const lightboxDialog = document.querySelector('.lightbox-dialog');
const lightboxImage = document.querySelector('.lightbox-image');
const lightboxClose = document.querySelector('.lightbox-close');

function closeLightbox() {
    if (lightboxDialog?.open) lightboxDialog.close();
}

lightboxButtons.forEach((button) => button.addEventListener('click', () => {
    if (!lightboxDialog || !lightboxImage) return;
    lightboxImage.src = button.dataset.image;
    lightboxImage.alt = button.dataset.alt || '';
    lightboxDialog.showModal();
}));

lightboxClose?.addEventListener('click', closeLightbox);
lightboxDialog?.addEventListener('click', (event) => {
    if (event.target === lightboxDialog) closeLightbox();
});

// Filter and sort the products without requiring a server or external library.
const productGallery = document.querySelector('.product-gallery');
const productCards = productGallery ? [...productGallery.querySelectorAll('figure[data-category]')] : [];
const defaultProductOrder = [...productCards];
const productSearch = document.querySelector('#product-search');
const productCategory = document.querySelector('#product-category');
const productSort = document.querySelector('#product-sort');
const productResults = document.querySelector('#product-results');

function updateProducts() {
    if (!productGallery || !productResults) return;
    const query = productSearch?.value.trim().toLowerCase() || '';
    const category = productCategory?.value || 'all';
    const sort = productSort?.value || 'default';
    const visibleCards = productCards.filter((card) => {
        const matchesQuery = card.dataset.name.toLowerCase().includes(query);
        const matchesCategory = category === 'all' || card.dataset.category === category;
        return matchesQuery && matchesCategory;
    });

    productCards.forEach((card) => {
        card.hidden = !visibleCards.includes(card);
    });

    if (sort === 'default') {
        defaultProductOrder.forEach((card) => productGallery.append(card));
    } else {
        visibleCards.sort((first, second) => {
            const comparison = first.dataset.name.localeCompare(second.dataset.name);
            return sort === 'name-desc' ? -comparison : comparison;
        });
        visibleCards.forEach((card) => productGallery.append(card));
    }

    productResults.textContent = visibleCards.length
        ? `${visibleCards.length} product${visibleCards.length === 1 ? '' : 's'} shown.`
        : 'No products match your search. Try another name or category.';
}

[productSearch, productCategory, productSort].forEach((control) => {
    control?.addEventListener('input', updateProducts);
    control?.addEventListener('change', updateProducts);
});

updateProducts();

// Validate static-site forms and prepare a truthful email handoff.
const mailForms = [...document.querySelectorAll('[data-mail-form]')];

mailForms.forEach((form) => form.addEventListener('submit', (event) => {
    event.preventDefault();
    const feedback = form.querySelector('[data-form-feedback]');
    const name = form.elements.name;
    const message = form.elements.message;
    form.classList.add('form-validation-active');
    name.setCustomValidity(name.value.trim().length < 2 ? 'Please enter your full name.' : '');
    message.setCustomValidity(message.value.trim().length < 10 ? 'Please provide at least 10 characters.' : '');

    if (!form.checkValidity()) {
        form.reportValidity();
        feedback.textContent = 'Please correct the highlighted fields before continuing.';
        return;
    }

    const values = Object.fromEntries(new FormData(form).entries());
    const subject = form.dataset.formType === 'enquiry'
        ? `Bakery enquiry: ${values.enquiryType}`
        : `Bakery contact: ${values.category}`;
    const body = Object.entries(values)
        .map(([label, value]) => `${label}: ${value}`)
        .join('\n');
    const mailto = `mailto:${form.dataset.recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    feedback.textContent = 'Your email application should open with the message prepared. The website has not sent or stored it.';
    window.location.href = mailto;
}));
