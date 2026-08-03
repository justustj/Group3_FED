document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Filter Logic Elements ---
    const searchInput = document.getElementById('searchInput');
    const regionSelect = document.getElementById('regionSelect');
    const budgetRange = document.getElementById('budgetRange');
    const budgetValue = document.getElementById('budgetValue');
    const tourCards = document.querySelectorAll('.tour-card');

    function filterTours() {
        const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
        const selectedRegion = regionSelect ? regionSelect.value.toLowerCase() : 'all';
        const maxBudget = budgetRange ? parseFloat(budgetRange.value) : Infinity;

        tourCards.forEach(card => {
            const cardRegion = (card.dataset.region || '').toLowerCase();
            const cardPrice = parseFloat(card.dataset.price) || 0;
            const cardTitle = (card.dataset.title || '').toLowerCase();
            const cardText = card.textContent.toLowerCase();

            const matchesSearch = query === '' || cardTitle.includes(query) || cardText.includes(query);
            const matchesRegion = selectedRegion === 'all' || cardRegion === selectedRegion;
            const matchesBudget = cardPrice <= maxBudget;

            if (matchesSearch && matchesRegion && matchesBudget) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    if (budgetRange && budgetValue) {
        budgetRange.addEventListener('input', (e) => {
            // Keep the '$' format when updating text
            budgetValue.textContent = `$${e.target.value}`;
            filterTours();
        });
    }

    if (searchInput) searchInput.addEventListener('input', filterTours);
    if (regionSelect) regionSelect.addEventListener('change', filterTours);

    // --- 2. Interactive "Book Now" Functionality ---
    const bookButtons = document.querySelectorAll('.book-now-btn, .tour-card button');
    const modalTourTitle = document.getElementById('modalTourTitle');
    const modalTourPrice = document.getElementById('modalTourPrice');
    const modalTotalPrice = document.getElementById('modalTotalPrice');
    const modalPaxInput = document.getElementById('modalPaxInput');
    const modalBookingForm = document.getElementById('modalBookingForm');
    const modalSuccessAlert = document.getElementById('modalSuccessAlert');

    let currentUnitPrice = 0;

    bookButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const tourCard = btn.closest('.tour-card');
            
            // Extract title and price from card dataset or fallback to HTML text
            const title = tourCard ? (tourCard.dataset.title || tourCard.querySelector('h5')?.textContent) : 'Package Tour';
            const price = tourCard ? (parseFloat(tourCard.dataset.price) || parseFloat(tourCard.querySelector('h4')?.textContent.replace(/[^0-9.]/g, ''))) : 0;

            currentUnitPrice = price || 0;

            if (modalTourTitle) modalTourTitle.textContent = title;
            if (modalTourPrice) modalTourPrice.textContent = `$${currentUnitPrice.toLocaleString()}`;
            if (modalPaxInput) modalPaxInput.value = 1;
            
            updateModalTotal();

            if (modalSuccessAlert) modalSuccessAlert.classList.add('d-none');
            if (modalBookingForm) modalBookingForm.reset();

            // Trigger Bootstrap Modal
            const bookingModalElement = document.getElementById('bookingModal');
            if (bookingModalElement && typeof bootstrap !== 'undefined') {
                const modalInstance = bootstrap.Modal.getOrCreateInstance(bookingModalElement);
                modalInstance.show();
            }
        });
    });

    function updateModalTotal() {
        if (!modalPaxInput || !modalTotalPrice) return;
        const pax = Math.max(1, parseInt(modalPaxInput.value) || 1);
        const total = pax * currentUnitPrice;
        modalTotalPrice.textContent = `$${total.toLocaleString()}`;
    }

    if (modalPaxInput) {
        modalPaxInput.addEventListener('input', updateModalTotal);
    }

    if (modalBookingForm) {
        modalBookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (modalSuccessAlert) {
                modalSuccessAlert.classList.remove('d-none');
            }
            // Auto close modal after 2 seconds on success
            setTimeout(() => {
                const bookingModalElement = document.getElementById('bookingModal');
                if (bookingModalElement && typeof bootstrap !== 'undefined') {
                    const modalInstance = bootstrap.Modal.getInstance(bookingModalElement);
                    if (modalInstance) modalInstance.hide();
                }
            }, 2000);
        });
    }
});