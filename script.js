const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('[data-nav-links]');
const year = document.querySelector('#year');

if (year) {
  year.textContent = new Date().getFullYear();
}

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', 'Open navigation');
    });
  });
}

const revealTargets = document.querySelectorAll('.content-card, .project-card, .cheatsheet-row, .timeline article, .metrics-grid article');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });

  revealTargets.forEach((target) => {
    target.style.opacity = '0';
    target.style.transform = 'translateY(18px)';
    target.style.transition = 'opacity 500ms ease, transform 500ms ease';
    observer.observe(target);
  });
}

const style = document.createElement('style');
style.textContent = `.is-visible { opacity: 1 !important; transform: translateY(0) !important; }`;
document.head.appendChild(style);
