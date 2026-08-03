document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Dynamic Itinerary Builder ---
    const addDayBtn = document.getElementById('addDayBtn');
    const itineraryContainer = document.getElementById('itineraryContainer');
    let dayCount = 1;

    if (addDayBtn && itineraryContainer) {
        addDayBtn.addEventListener('click', () => {
            dayCount++;
            const newDayCard = document.createElement('div');
            newDayCard.className = 'card p-3 mb-3 shadow-sm border-0';
            newDayCard.innerHTML = `
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <h5 class="fw-bold mb-0">Day ${dayCount}</h5>
                    <button type="button" class="btn btn-sm btn-outline-danger remove-day-btn">Remove</button>
                </div>
                <input type="text" class="form-control mb-2" placeholder="Activity Title (e.g. Museum Visit)">
                <textarea class="form-control" rows="2" placeholder="Activity Description"></textarea>
            `;

            newDayCard.querySelector('.remove-day-btn').addEventListener('click', () => {
                newDayCard.remove();
                updateActivitiesCount();
            });

            itineraryContainer.appendChild(newDayCard);
            updateActivitiesCount();
        });
    }

    // --- 2. Dynamic Cost Calculator ---
    const paxInput = document.getElementById('paxInput');
    const hotelInput = document.getElementById('hotelInput');
    const activitiesInput = document.getElementById('activitiesInput');
    const totalCostDisplay = document.getElementById('totalCostDisplay');

    const FLIGHT_PRICE = 45.50;
    const HOTEL_PRICE = 15.50;
    const ACTIVITY_PRICE = 19.00;

    function calculateTotalCost() {
        if (!totalCostDisplay) return;

        const pax = Math.max(1, parseInt(paxInput?.value) || 1);
        const nights = Math.max(1, parseInt(hotelInput?.value) || 1);
        const activities = Math.max(1, parseInt(activitiesInput?.value) || 1);

        const total = (pax * FLIGHT_PRICE) + (nights * HOTEL_PRICE) + (activities * ACTIVITY_PRICE);
        totalCostDisplay.textContent = total.toFixed(2);
    }

    function updateActivitiesCount() {
        if (activitiesInput) {
            const currentDays = itineraryContainer ? itineraryContainer.children.length : 1;
            activitiesInput.value = currentDays;
            calculateTotalCost();
        }
    }

    [paxInput, hotelInput, activitiesInput].forEach(input => {
        if (input) input.addEventListener('input', calculateTotalCost);
    });

    // --- 3. Form Validation ---
    const bookingForm = document.getElementById('bookingForm');
    const bookingSuccessAlert = document.getElementById('bookingSuccessAlert');
    const startDate = document.getElementById('startDate');
    const endDate = document.getElementById('endDate');

    if (bookingForm) {
        bookingForm.addEventListener('submit', (event) => {
            event.preventDefault();
            event.stopPropagation();

            let isValid = bookingForm.checkValidity();

            // Custom Date Validation (End Date > Start Date)
            if (startDate && endDate && startDate.value && endDate.value) {
                if (new Date(endDate.value) <= new Date(startDate.value)) {
                    endDate.setCustomValidity('End date must be strictly after start date.');
                    isValid = false;
                } else {
                    endDate.setCustomValidity('');
                }
            }

            bookingForm.classList.add('was-validated');

            if (isValid) {
                if (bookingSuccessAlert) {
                    bookingSuccessAlert.classList.remove('d-none');
                }
                bookingForm.reset();
                bookingForm.classList.remove('was-validated');
            }
        });
    }
});