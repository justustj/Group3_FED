document.addEventListener('DOMContentLoaded', () => {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const foodItems = document.querySelectorAll('.food-card-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active class across filter buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      // Filter card visibility
      foodItems.forEach(item => {
        if (filter === 'all' || item.getAttribute('data-country') === filter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
});