/* ============================================================
  AYUSH KUSHWAHA — PORTFOLIO SCRIPTS
  Combined & enhanced from both portfolios
  ============================================================ */

/* ── FILM STRIP HOLES ── */
function buildFilmStrip() {
  const strip = document.getElementById('filmstrip');
  if (!strip) return;
  for (let i = 0; i < 28; i++) {
   const hole = document.createElement('div');
   hole.className = 'film-hole';
   strip.appendChild(hole);
  }
}

/* ── SPOTLIGHT EFFECT (mouse-tracking radial gradient) ── */
function initSpotlight() {
  const spotlight = document.getElementById('spotlight');
  if (!spotlight) return;

  window.addEventListener('pointermove', e => {
   const x = (e.clientX / window.innerWidth)  * 100;
   const y = (e.clientY / window.innerHeight) * 100;
   spotlight.style.setProperty('--sx', x + '%');
   spotlight.style.setProperty('--sy', y + '%');
  });
}

/* ── SCROLL REVEAL (Intersection Observer) ── */
function initReveal() {
  const observer = new IntersectionObserver(entries => {
   entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
   });
  }, {
   threshold: 0.14,
   rootMargin: '0px 0px -40px 0px'
  });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* ── STAGGER CHILDREN ── */
function staggerItems(selector, delay) {
  document.querySelectorAll(selector).forEach((el, i) => {
   el.style.transitionDelay = (i * delay) + 's';
  });
}

/* ── ACTIVE NAV HIGHLIGHTING ── */
function initActiveNav() {
  const navLinks   = document.querySelectorAll('.site-nav a');
  const sections   = [...document.querySelectorAll('main section[id]')];

  function activate() {
   let activeId = '';
   sections.forEach(sec => {
    const rect = sec.getBoundingClientRect();
    if (rect.top <= 160 && rect.bottom >= 160) {
      activeId = sec.id;
    }
   });
   navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + activeId);
   });
  }

  activate();
  window.addEventListener('scroll', activate, { passive: true });
}

/* ── MOBILE MENU TOGGLE ── */
function initMobileMenu() {
  const toggle = document.getElementById('menuToggle');
  const nav    = document.getElementById('siteNav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
   const isOpen = nav.classList.toggle('open');
   toggle.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach(link => {
   link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
   });
  });
}

/* ── FOOTER YEAR ── */
function setYear() {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
}

/* ── HEADER SCROLL SHADOW ── */
function initHeaderScroll() {
  const header = document.getElementById('siteHeader');
  if (!header) return;

  window.addEventListener('scroll', () => {
   if (window.scrollY > 60) {
    header.style.boxShadow = '0 8px 48px rgba(0,0,0,0.55)';
   } else {
    header.style.boxShadow = '0 8px 40px rgba(0,0,0,0.4)';
   }
  }, { passive: true });
}

/* ── INIT ── */
document.addEventListener('DOMContentLoaded', () => {
  buildFilmStrip();
  initSpotlight();
  initReveal();
  initActiveNav();
  initMobileMenu();
  setYear();
  initHeaderScroll();

  // Stagger animations for grouped elements
  staggerItems('.exp-item.reveal',  0.1);
  staggerItems('.project-card.reveal', 0.12);
  staggerItems('.award-card.reveal',   0.1);
  staggerItems('.stat-card.reveal',    0.08);
  staggerItems('.skill-group.reveal',  0.09);
  staggerItems('.edu-item.reveal',     0.12);
});
