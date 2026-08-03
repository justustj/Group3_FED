document.addEventListener("DOMContentLoaded", () => {
  
  const form = document.getElementById('registrationForm');
  const passwordInput = document.getElementById('password');
  
  // Password requirement DOM elements
  const reqLength = document.getElementById('req-length');
  const reqNumber = document.getElementById('req-number');

  // Filtering DOM elements
  const filterInput = document.getElementById('filterDestinations');
  const destList = document.getElementById('destinationList').getElementsByTagName('li');

  // --- 1. DYNAMIC FILTERING (Destinations) ---
  filterInput.addEventListener('keyup', function() {
    const filterValue = this.value.toLowerCase();
    
    for (let i = 0; i < destList.length; i++) {
      const label = destList[i].querySelector('label').innerText.toLowerCase();
      if (label.indexOf(filterValue) > -1) {
        destList[i].style.display = ""; // Show
      } else {
        destList[i].style.display = "none"; // Hide
      }
    }
  });

  // --- 2. LIVE PASSWORD VALIDATION (Tick and Cross DOM manipulation) ---
  passwordInput.addEventListener('input', function() {
    const val = this.value;

    // Check Length (>= 12)
    if (val.length >= 12) {
      setValid(reqLength);
    } else {
      setInvalid(reqLength);
    }

    // Check Number (Regex match for digits)
    if (/\d/.test(val)) {
      setValid(reqNumber);
    } else {
      setInvalid(reqNumber);
    }
  });

  // Helper to change UI to green tick
  function setValid(element) {
    element.classList.remove('text-danger');
    element.classList.add('text-success');
    const icon = element.querySelector('.icon-state');
    icon.classList.remove('bi-x-circle-fill');
    icon.classList.add('bi-check-circle-fill');
  }

  // Helper to change UI to red cross
  function setInvalid(element) {
    element.classList.remove('text-success');
    element.classList.add('text-danger');
    const icon = element.querySelector('.icon-state');
    icon.classList.remove('bi-check-circle-fill');
    icon.classList.add('bi-x-circle-fill');
  }

  // --- 3. FORM VALIDATION & SUBMISSION ---
  form.addEventListener('submit', function(event) {
    event.preventDefault(); // Stop standard submission
    
    let isFormValid = true;

    // First Name Check
    const firstName = document.getElementById('firstName');
    if (firstName.value.trim() === '') {
      firstName.classList.add('is-invalid');
      isFormValid = false;
    } else {
      firstName.classList.remove('is-invalid');
      firstName.classList.add('is-valid');
    }

    // Last Name Check
    const lastName = document.getElementById('lastName');
    if (lastName.value.trim() === '') {
      lastName.classList.add('is-invalid');
      isFormValid = false;
    } else {
      lastName.classList.remove('is-invalid');
      lastName.classList.add('is-valid');
    }

    // Email Check (Basic Regex)
    const email = document.getElementById('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
      email.classList.add('is-invalid');
      isFormValid = false;
    } else {
      email.classList.remove('is-invalid');
      email.classList.add('is-valid');
    }

    // Password Validation on submit
    const pValue = passwordInput.value;
    if (pValue.trim() === '' || pValue.length < 12 || !/\d/.test(pValue)) {
      passwordInput.classList.add('is-invalid');
      isFormValid = false;
    } else {
      passwordInput.classList.remove('is-invalid');
      passwordInput.classList.add('is-valid');
    }

    // Terms Check
    const terms = document.getElementById('termsCheck');
    if (!terms.checked) {
      terms.classList.add('is-invalid');
      isFormValid = false;
    } else {
      terms.classList.remove('is-invalid');
      terms.classList.add('is-valid');
    }

    // Remove is-invalid on typing so the user gets immediate feedback after an error
    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
      input.addEventListener('input', () => {
        input.classList.remove('is-invalid');
      });
    });

    // --- 4. SUCCESS: SHOW OVERLAY AND REDIRECT ---
    if (isFormValid) {
      const overlay = document.getElementById('welcome-overlay');
      const welcomeText = document.getElementById('welcome-text');
      
      // Inject user's first name dynamically
      welcomeText.innerText = `Welcome, ${firstName.value.trim()}!`;
      
      // Show overlay
      overlay.classList.add('show');
      overlay.setAttribute('aria-hidden', 'false');

      // Simulate the redirect back to the previous page
      setTimeout(() => {
        // In a real application, you would save data and redirect:
        // window.history.back(); 
        
        // For testing locally without breaking your preview window, 
        // we will just fade the overlay back out after 3 seconds:
        overlay.classList.remove('show');
        overlay.setAttribute('aria-hidden', 'true');
        form.reset(); 
        
        // Reset validation classes
        inputs.forEach(i => i.classList.remove('is-valid'));
        setInvalid(reqLength);
        setInvalid(reqNumber);
      }, 3000); 
    }
  });

});