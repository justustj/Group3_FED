document.addEventListener('DOMContentLoaded', () => {
  // Attach event listener to all "View Details" buttons
  const viewButtons = document.querySelectorAll('.view-btn');

  viewButtons.forEach(button => {
    button.addEventListener('click', () => {
      const details = button.nextElementSibling;
      if (details && details.classList.contains('details')) {
        details.classList.toggle('show');
      }
    });
  });
});