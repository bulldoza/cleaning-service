let selectedService = '';

// Service card selection
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', () => {
    document.querySelectorAll('.card').forEach(c => {
      c.classList.remove('selected');
      c.setAttribute('aria-pressed', 'false');
    });
    card.classList.add('selected');
    card.setAttribute('aria-pressed', 'true');
    selectedService = card.dataset.service;
  });
});

// Step navigation
function nextStep(step) {
  if (step === 2 && !validateStep1()) return;
  if (step === 3 && !validateStep2()) return;

  document.querySelectorAll('.form-step').forEach(s => s.classList.remove('active'));
  document.getElementById('step' + step).classList.add('active');

  if (typeof window.updateProgress === 'function') {
    window.updateProgress(step);
  }
}

// Validation
function validateStep1() {
  const zipValid = typeof window.validateZip === 'function'
    ? window.validateZip()
    : /^\d{5}$/.test(document.getElementById('zip').value.trim());

  if (!zipValid) return false;

  if (!selectedService) {
    showFormError('step1', 'Please select a service type.');
    return false;
  }

  clearFormError('step1');
  return true;
}

function validateStep2() {
  const bedrooms = document.getElementById('bedrooms').value;
  const bathrooms = document.getElementById('bathrooms').value;

  if (!bedrooms || !bathrooms) {
    showFormError('step2', 'Please select both bedrooms and bathrooms.');
    return false;
  }

  clearFormError('step2');
  return true;
}

function validateStep3() {
  const name  = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();

  if (!name) { focusWithError('name', 'Please enter your full name.'); return false; }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { focusWithError('email', 'Please enter a valid email address.'); return false; }
  if (!phone || !/^\+?[\d\s\-().]{7,}$/.test(phone)) { focusWithError('phone', 'Please enter a valid phone number.'); return false; }

  return true;
}

// Form submission
function submitForm() {
  if (!validateStep3()) return;

  const data = {
    zip:       document.getElementById('zip').value.trim(),
    service:   selectedService,
    bedrooms:  document.getElementById('bedrooms').value,
    bathrooms: document.getElementById('bathrooms').value,
    name:      document.getElementById('name').value.trim(),
    email:     document.getElementById('email').value.trim(),
    phone:     document.getElementById('phone').value.trim(),
  };

  console.log('Lead Captured:', data);
  showSuccessState(data.name);
}

// Success state
function showSuccessState(name) {
  const container = document.querySelector('.form-container');
  const firstName = name.split(' ')[0];

  container.innerHTML = `
    <div style="text-align:center; padding: 1rem 0;">
      <div style="
        width: 64px; height: 64px;
        background: linear-gradient(135deg, #0095A1, #007b85);
        border-radius: 50%;
        display: flex; align-items: center; justify-content: center;
        margin: 0 auto 1.5rem;
        box-shadow: 0 8px 24px rgba(0,149,161,0.32);
      ">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5">
          <circle cx="12" cy="12" r="10"/>
          <path d="M8 12l2.5 2.5L16 9"/>
        </svg>
      </div>
      <h2 style="font-family:'Playfair Display',serif; font-size:1.4rem; color:#0B2D4B; margin-bottom:0.5rem;">
        You're all set, ${firstName}!
      </h2>
      <p style="font-size:0.9rem; color:#35526d; line-height:1.7; margin-bottom:1.75rem;">
        We've received your quote request and will reach out within <strong>2 hours</strong> to confirm your booking.
      </p>
      <button type="button" onclick="resetForm()" style="
        background: none;
        border: 2px solid #ebebeb;
        border-radius: 8px;
        padding: 0.65rem 1.25rem;
        font-family: 'Inter', sans-serif;
        font-size: 0.85rem;
        font-weight: 500;
        color: #35526d;
        cursor: pointer;
        transition: border-color 0.2s, color 0.2s;
      " onmouseover="this.style.borderColor='#0095A1';this.style.color='#0095A1';"
         onmouseout="this.style.borderColor='#ebebeb';this.style.color='#35526d';">
        Submit another quote
      </button>
    </div>
  `;
}

// Form reset
function resetForm() {
  selectedService = '';

  ['zip', 'bedrooms', 'bathrooms', 'name', 'email', 'phone'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });

  document.querySelectorAll('.card').forEach(c => {
    c.classList.remove('selected');
    c.setAttribute('aria-pressed', 'false');
  });

  document.querySelectorAll('.form-step').forEach(s => s.classList.remove('active'));
  const step1 = document.getElementById('step1');
  if (step1) step1.classList.add('active');

  if (typeof window.updateProgress === 'function') {
    window.updateProgress(1);
  }
}

// Error helpers
function showFormError(stepId, message) {
  const step = document.getElementById(stepId);
  if (!step) return;
  let el = step.querySelector('.form-step-error');

  if (!el) {
    el = document.createElement('p');
    el.className = 'form-step-error error-msg visible';
    el.setAttribute('role', 'alert');
    step.querySelector('.form-btn').before(el);
  }

  el.textContent = message;
  el.classList.add('visible');
}

function clearFormError(stepId) {
  const el = document.getElementById(stepId)?.querySelector('.form-step-error');
  if (el) el.remove();
}

function focusWithError(fieldId, message) {
  const field = document.getElementById(fieldId);
  if (!field) return;
  field.classList.add('error');
  field.focus();

  let errEl = field.nextElementSibling;
  if (!errEl || !errEl.classList.contains('error-msg')) {
    errEl = document.createElement('p');
    errEl.className = 'error-msg';
    errEl.setAttribute('role', 'alert');
    field.after(errEl);
  }

  errEl.textContent = message;
  errEl.classList.add('visible');

  field.addEventListener('input', () => {
    field.classList.remove('error');
    errEl.classList.remove('visible');
  }, { once: true });
}
