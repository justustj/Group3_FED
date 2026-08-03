document.addEventListener('DOMContentLoaded', () => {
    const bookingSlider = document.getElementById('bookingSlider');
    const sliderBookingCount = document.getElementById('sliderBookingCount');
    const monthlyEarningsDisplay = document.getElementById('monthlyEarningsDisplay');

    const COMMISSION_PER_BOOKING = 8.00; // $8.00 commission rate per booking

    function updateEarnings() {
        if (!bookingSlider || !monthlyEarningsDisplay || !sliderBookingCount) return;

        const bookings = parseInt(bookingSlider.value) || 0;
        const potentialEarnings = bookings * COMMISSION_PER_BOOKING;

        sliderBookingCount.textContent = bookings;
        monthlyEarningsDisplay.textContent = potentialEarnings.toFixed(2);
    }

    if (bookingSlider) {
        bookingSlider.addEventListener('input', updateEarnings);
        // Initial run on page load
        updateEarnings();
    }
});