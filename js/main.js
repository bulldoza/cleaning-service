// Nav scroll shadow
const nav = document.getElementById('mainNav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
}

// Mobile menu
const hamburgerBtn = document.getElementById('hamburgerBtn');
const mobileMenu = document.getElementById('mobileMenu');
let menuOpen = false;

function closeMobileMenu() {
  menuOpen = false;
  if (mobileMenu) mobileMenu.classList.remove('open');
  if (hamburgerBtn) hamburgerBtn.setAttribute('aria-expanded', 'false');
}

if (hamburgerBtn && mobileMenu) {
  hamburgerBtn.addEventListener('click', () => {
    menuOpen = !menuOpen;
    mobileMenu.classList.toggle('open', menuOpen);
    hamburgerBtn.setAttribute('aria-expanded', String(menuOpen));
  });

  document.addEventListener('click', (e) => {
    if (menuOpen && !mobileMenu.contains(e.target) && !hamburgerBtn.contains(e.target)) {
      closeMobileMenu();
    }
  });
}

// FAQ accordion
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => {
      i.classList.remove('open');
      i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
    });
    if (!isOpen) {
      item.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});

// Service card keyboard support (quote form)
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      card.click();
    }
  });
});

// Progress helpers used by form.js
window.updateProgress = function(step) {
  const labels = [
    'Step 1 of 3 — Service Type',
    'Step 2 of 3 — Home Size',
    'Step 3 of 3 — Your Info'
  ];
  const stepLabel = document.getElementById('stepLabel');
  if (stepLabel) stepLabel.textContent = labels[step - 1];
  for (let i = 1; i <= 3; i++) {
    const dot = document.getElementById('dot' + i);
    if (!dot) continue;
    dot.classList.remove('active', 'done');
    if (i < step) dot.classList.add('done');
    if (i === step) dot.classList.add('active');
  }
};

// Zip validation helper used by form.js
window.validateZip = function() {
  const zip = document.getElementById('zip');
  const err = document.getElementById('zipError');
  if (!zip) return true;
  const valid = /^\d{5}$/.test(zip.value.trim());
  zip.classList.toggle('error', !valid);
  if (err) err.classList.toggle('visible', !valid);
  return valid;
};

// Highlight active nav link based on current page
(function() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (href && href !== '#' && path.includes(href.replace('.html', ''))) {
      link.classList.add('active');
    }
  });
})();
