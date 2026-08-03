document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Main Country Slider Navigation ---
    const columns = document.querySelector('.columns');
    const countries = document.querySelectorAll('.country');
    const countryNext = document.querySelector('.country-next');
    const countryPrev = document.querySelector('.country-prev');
    let countryIndex = 0;

    function updateCountrySlide() {
        columns.style.transform = `translateX(-${countryIndex * (100 / countries.length)}%)`;
    }

    if (countryNext && countryPrev) {
        countryNext.addEventListener('click', () => {
            countryIndex = (countryIndex + 1) % countries.length;
            updateCountrySlide();
        });

        countryPrev.addEventListener('click', () => {
            countryIndex = (countryIndex - 1 + countries.length) % countries.length;
            updateCountrySlide();
        });
    }

    // --- 2. Inner Image Sliders (Per Country) ---
    const countryCards = document.querySelectorAll('.country');

    countryCards.forEach((card) => {
        const slides = card.querySelectorAll('.slide');
        const prevBtn = card.querySelector('.slide-prev');
        const nextBtn = card.querySelector('.slide-next');
        let currentSlide = 0;

        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.toggle('d-none', i !== index);
            });
        }

        if (nextBtn && prevBtn) {
            nextBtn.addEventListener('click', () => {
                currentSlide = (currentSlide + 1) % slides.length;
                showSlide(currentSlide);
            });

            prevBtn.addEventListener('click', () => {
                currentSlide = (currentSlide - 1 + slides.length) % slides.length;
                showSlide(currentSlide);
            });
        }
    });

    // --- 3. View Details Toggle ---
    const viewBtns = document.querySelectorAll('.view-btn');

    viewBtns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            const details = e.target.nextElementSibling;
            if (details) {
                details.classList.toggle('show');
                btn.textContent = details.classList.contains('show') ? 'Hide Details' : 'View Details';
            }
        });
    });
});