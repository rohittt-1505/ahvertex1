/* ============================================================
   AH VERTEX SOLUTION — Main JavaScript
============================================================ */

// ===== PRELOADER =====
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('preloader').classList.add('hidden');
  }, 1200);
});

// ===== AOS INIT =====
AOS.init({
  duration: 900,
  once: true,
  offset: 60
});

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Active nav link
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-link');
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) {
      current = sec.getAttribute('id');
    }
  });
  links.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });

  // Back to top
  const btt = document.getElementById('backToTop');
  if (window.scrollY > 400) {
    btt.classList.add('visible');
  } else {
    btt.classList.remove('visible');
  }
});

// ===== MOBILE MENU =====
function toggleMenu() {
  const nav = document.getElementById('navLinks');
  nav.classList.toggle('open');
}

// Close menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('navLinks').classList.remove('open');
  });
});

// Close on outside click
document.addEventListener('click', (e) => {
  const nav = document.getElementById('navLinks');
  const toggle = document.getElementById('menuToggle');
  if (!nav.contains(e.target) && !toggle.contains(e.target)) {
    nav.classList.remove('open');
  }
});

// ===== PARTICLES =====
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  const count = window.innerWidth < 768 ? 15 : 30;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    p.style.left = Math.random() * 100 + '%';
    p.style.animationDuration = (8 + Math.random() * 12) + 's';
    p.style.animationDelay = (Math.random() * 10) + 's';
    p.style.width = p.style.height = (1 + Math.random() * 3) + 'px';
    if (Math.random() > 0.5) {
      p.style.background = '#06b6d4';
    }
    container.appendChild(p);
  }
}
createParticles();

// ===== BACK TO TOP =====
function scrollTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===== SEND EMAIL =====
function sendEmail(e) {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject') ? document.getElementById('subject').value.trim() : 'Website Inquiry';
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !message) {
    showToast('Please fill all required fields.', 'error');
    return;
  }

  const mailSubject = encodeURIComponent('Website Inquiry from ' + name + (subject ? ' — ' + subject : ''));
  const mailBody = encodeURIComponent(
    'Name: ' + name + '\n' +
    'Email: ' + email + '\n\n' +
    'Message:\n' + message
  );

  window.location.href = `mailto:ajinkya.aglave@ahvertexsolution.com?subject=${mailSubject}&body=${mailBody}`;
  showToast('Opening email client...', 'success');
  e.target.reset();
}

// ===== TOAST NOTIFICATION =====
function showToast(msg, type = 'success') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.style.cssText = `
    position: fixed;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%) translateY(20px);
    background: ${type === 'success' ? 'linear-gradient(135deg,#6366f1,#06b6d4)' : '#ef4444'};
    color: white;
    padding: 14px 28px;
    border-radius: 50px;
    font-size: 14px;
    font-weight: 600;
    font-family: Poppins, sans-serif;
    z-index: 9999;
    opacity: 0;
    transition: all 0.4s ease;
    box-shadow: 0 8px 24px rgba(0,0,0,0.3);
    white-space: nowrap;
  `;
  toast.textContent = msg;
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';
  });

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(20px)';
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}

// ===== SMOOTH ANCHOR SCROLL (with navbar offset) =====
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ===== COUNTER ANIMATION =====
function animateCounters() {
  const stats = document.querySelectorAll('.stat-num');
  stats.forEach(stat => {
    const target = parseInt(stat.textContent.replace(/\D/g, ''));
    const suffix = stat.textContent.replace(/[0-9]/g, '');
    let count = 0;
    const step = target / 60;
    const timer = setInterval(() => {
      count += step;
      if (count >= target) {
        count = target;
        clearInterval(timer);
      }
      stat.textContent = Math.floor(count) + suffix;
    }, 20);
  });
}

// Run counter when hero is visible
const heroObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounters();
      heroObserver.disconnect();
    }
  });
}, { threshold: 0.5 });

const heroSection = document.querySelector('.hero');
if (heroSection) heroObserver.observe(heroSection);
