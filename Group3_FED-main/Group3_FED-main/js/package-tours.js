document.addEventListener('DOMContentLoaded', () => {
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
            budgetValue.textContent = e.target.value;
            filterTours();
        });
    }

    if (searchInput) searchInput.addEventListener('input', filterTours);
    if (regionSelect) regionSelect.addEventListener('change', filterTours);
});