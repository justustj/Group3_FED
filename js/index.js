document.addEventListener("DOMContentLoaded", () => {

  // 1. Pill Buttons (Tabs) Logic with ARIA updates
  const filterTabs = document.querySelectorAll('#filter-tabs .pill-btn');
  
  filterTabs.forEach(btn => {
    btn.addEventListener('click', () => {
      // Reset all buttons
      filterTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-pressed', 'false');
      });
      // Activate clicked button
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
    });
  });

  // 2. Large Interactive Lists Logic (Discover / Plan) with ARIA updates
  const interactiveLists = document.querySelectorAll('.interactive-list');
  
  interactiveLists.forEach(list => {
    const listItems = list.querySelectorAll('li');
    
    listItems.forEach(item => {
      item.addEventListener('click', () => {
        // Reset siblings
        listItems.forEach(li => {
          li.classList.remove('active');
          li.setAttribute('aria-selected', 'false');
        });
        // Activate clicked item
        item.classList.add('active');
        item.setAttribute('aria-selected', 'true');
      });
    });
  });

  // 3. Horizontal Scroll Logic for Destinations
  const scrollContainer = document.getElementById('destinations-scroll');
  const scrollLeftBtn = document.getElementById('scroll-left');
  const scrollRightBtn = document.getElementById('scroll-right');
  
  if (scrollContainer && scrollLeftBtn && scrollRightBtn) {
    const scrollAmount = 274; // Matches roughly one card width + gap

    scrollLeftBtn.addEventListener('click', () => {
      scrollContainer.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
      });
    });

    scrollRightBtn.addEventListener('click', () => {
      scrollContainer.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    });
  }

});