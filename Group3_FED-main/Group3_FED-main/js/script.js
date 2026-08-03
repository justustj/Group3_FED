document.addEventListener("DOMContentLoaded", () => {
      const navItems = document.querySelectorAll('.nav-item-custom');
      const indicator = document.getElementById('nav-indicator');
      const container = document.querySelector('.nav-links-container');
      const megaMenu = document.getElementById('mega-menu');
      const menuCategories = document.querySelectorAll('.menu-category');
      const navbar = document.querySelector('.navbar');

      let closeTimeout;

      // 1. Sliding Indicator & Menu Hover-to-Open Logic
      navItems.forEach(item => {
        item.addEventListener('mouseenter', (e) => {
          clearTimeout(closeTimeout); 

          const itemRect = e.target.getBoundingClientRect();
          const containerRect = container.getBoundingClientRect();
          const leftPosition = itemRect.left - containerRect.left;
          
          indicator.style.width = `${itemRect.width}px`;
          indicator.style.left = `${leftPosition}px`;
          indicator.style.opacity = '1';

          const targetMenuId = e.target.getAttribute('data-menu');
          
          if (targetMenuId) {
            megaMenu.classList.add('show'); 
            
            menuCategories.forEach(menu => {
              menu.classList.add('d-none');
              menu.classList.remove('d-block');
            });
            
            const activeMenu = document.getElementById(targetMenuId);
            if (activeMenu) {
              activeMenu.classList.remove('d-none');
              activeMenu.classList.add('d-block');
            }
          } else {
            megaMenu.classList.remove('show');
          }
        });
      });

      // 2. Hover-out to Close Logic
      const closeMenu = () => {
        closeTimeout = setTimeout(() => {
          megaMenu.classList.remove('show');
          indicator.style.opacity = '0'; 
        }, 100); 
      };

      if (navbar) {
        navbar.addEventListener('mouseleave', closeMenu);
      }
      
      if (megaMenu) {
        megaMenu.addEventListener('mouseenter', () => {
          clearTimeout(closeTimeout);
        });
        megaMenu.addEventListener('mouseleave', closeMenu);
        
        // 3. Click-to-Close Logic (ADDED HERE)
        megaMenu.addEventListener('click', (e) => {
          if (!e.target.closest('.mega-link')) {
            megaMenu.classList.remove('show');
            indicator.style.opacity = '0';
          }
        });
      }
    });