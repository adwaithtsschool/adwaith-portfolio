// Mobile navigation
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
});
navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  navLinks.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));

// Reveal sections as they enter the viewport
const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => item.classList.add('visible'));
}

// Small rotating word animation in the hero
const words = ['code', 'ideas', 'experiences', 'possibilities'];
const rotatingWord = document.getElementById('rotatingWord');
let wordIndex = 0;
setInterval(() => {
  wordIndex = (wordIndex + 1) % words.length;
  rotatingWord.style.opacity = '0';
  setTimeout(() => {
    rotatingWord.textContent = words[wordIndex];
    rotatingWord.style.opacity = '1';
  }, 180);
}, 2300);
rotatingWord.style.transition = 'opacity .18s ease';

// Contact form: prepares an email in the visitor's default mail app.
// A real server-side form service is needed for direct website submissions.
document.getElementById('contactForm').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  const name = form.elements.name.value.trim();
  const email = form.elements.email.value.trim();
  const message = form.elements.message.value.trim();
  const subject = encodeURIComponent(`Portfolio message from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
  document.getElementById('formNote').textContent = 'Opening your email app…';
  window.location.href = `mailto:adwaithtsschool@gmail.com?subject=${subject}&body=${body}`;
});
