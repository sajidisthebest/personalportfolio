const menu = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0;
      entry.target.style.transitionDelay = `${delay}ms`;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const yearEl = document.querySelector('#year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

menu?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menu.setAttribute('aria-expanded', String(open));
  menu.textContent = open ? 'Close' : 'Menu';
});

document.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open');
  menu?.setAttribute('aria-expanded', 'false');
  if (menu) menu.textContent = 'Menu';
}));

// Automatic fallback handler for showcase thumbnails
// Allows user to drop in .jpg, .png, .webp, or .jpeg, or place them in showcase-thumbnails or assets/showcase-thumbnails
document.querySelectorAll('.thumbnail-marquee-wall img').forEach(img => {
  const base = img.dataset.base;
  if (!base) return;

  const candidatePaths = [
    `assets/showcase-thumbnails/${base}.jpg`,
    `assets/showcase-thumbnails/${base}.png`,
    `assets/showcase-thumbnails/${base}.webp`,
    `assets/showcase-thumbnails/${base}.jpeg`,
    `showcase-thumbnails/${base}.jpg`,
    `showcase-thumbnails/${base}.png`,
    `showcase-thumbnails/${base}.webp`,
    `showcase-thumbnails/${base}.jpeg`
  ];

  let candidateIndex = candidatePaths.findIndex(p => img.src.includes(p));
  if (candidateIndex === -1) candidateIndex = 0;

  img.addEventListener('error', function tryNextCandidate() {
    candidateIndex++;
    if (candidateIndex < candidatePaths.length) {
      img.src = candidatePaths[candidateIndex];
    } else {
      img.removeEventListener('error', tryNextCandidate);
    }
  });
});

// Prevent context menu specifically on images and image-based portfolio thumbnails
document.addEventListener("contextmenu", function (event) {
  if (event.target.closest("img, .marquee-card, .floating-card, .spotlight-portrait-container, .logo-stage, .about-mark")) {
    event.preventDefault();
  }
});

// Prevent dragging images
document.addEventListener("dragstart", function (event) {
  if (event.target.closest("img")) {
    event.preventDefault();
  }
});

// Ensure clicking non-navigational images/thumbnails does not open image files or trigger actions
document.addEventListener("click", function (event) {
  const target = event.target;
  const link = target.closest("a");

  if (link) {
    const href = link.getAttribute("href") || "";
    // Block any links whose href points directly to raw image files
    if (/\.(jpe?g|png|webp|gif|svg|avif|bmp|ico)(\?.*)?$/i.test(href)) {
      event.preventDefault();
      event.stopPropagation();
    }
  } else if (target.closest("img")) {
    // Clicking a standalone thumbnail/image does nothing
    event.preventDefault();
  }
});

// Ensure draggable="false" on all images across the document
document.querySelectorAll("img").forEach(function (img) {
  img.setAttribute("draggable", "false");
});

