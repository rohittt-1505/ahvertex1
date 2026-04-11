/* ================================================================
   AH VERTEX SOLUTION — Main JS
================================================================ */

/* ---- PRELOADER ---- */
(function () {
  const fill = document.getElementById('preFill');
  const label = document.getElementById('preLabel');
  let pct = 0;
  const iv = setInterval(() => {
    pct += Math.random() * 18;
    if (pct >= 100) { pct = 100; clearInterval(iv); }
    fill.style.width = pct + '%';
    label.textContent = Math.floor(pct) + '%';
    if (pct === 100) {
      setTimeout(() => document.getElementById('preloader').classList.add('gone'), 300);
    }
  }, 80);
})();

/* ---- STAR CANVAS ---- */
(function () {
  const canvas = document.getElementById('starCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, stars = [];

  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
    buildStars();
  }

  function buildStars() {
    stars = [];
    const count = Math.floor((W * H) / 5000);
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.2 + 0.2,
        a: Math.random(),
        speed: Math.random() * 0.004 + 0.002,
        gold: Math.random() < 0.15
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    stars.forEach(s => {
      s.a += s.speed;
      const opacity = (Math.sin(s.a) + 1) / 2 * 0.7 + 0.1;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = s.gold
        ? `rgba(201,168,76,${opacity})`
        : `rgba(232,230,224,${opacity * 0.6})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }

  resize();
  window.addEventListener('resize', resize);
  draw();
})();

/* ---- CUSTOM CURSOR ---- */
(function () {
  const c = document.getElementById('cursor');
  const cf = document.getElementById('cursorFollower');
  if (!c || !cf) return;
  let mx = 0, my = 0, fx = 0, fy = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    c.style.left = mx + 'px'; c.style.top = my + 'px';
  });

  (function loop() {
    fx += (mx - fx) * 0.12;
    fy += (my - fy) * 0.12;
    cf.style.left = fx + 'px'; cf.style.top = fy + 'px';
    requestAnimationFrame(loop);
  })();

  document.querySelectorAll('a,button,.svc-card,.testi-card,.pillar,.ind-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      c.style.transform = 'translate(-50%,-50%) scale(1.8)';
      cf.style.width = '50px'; cf.style.height = '50px';
      cf.style.borderColor = 'rgba(201,168,76,0.7)';
    });
    el.addEventListener('mouseleave', () => {
      c.style.transform = 'translate(-50%,-50%) scale(1)';
      cf.style.width = '34px'; cf.style.height = '34px';
      cf.style.borderColor = 'rgba(201,168,76,0.45)';
    });
  });
})();

/* ---- NAVBAR ---- */
const navbar = document.getElementById('navbar');
const navLinks2 = document.querySelectorAll('.nl');

function setActiveLink() {
  const sections = document.querySelectorAll('section[id]');
  let cur = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 130) cur = s.id;
  });
  navLinks2.forEach(l => {
    l.classList.toggle('active', l.getAttribute('href') === '#' + cur);
  });
}

window.addEventListener('scroll', () => {
  navbar.classList.toggle('solid', window.scrollY > 40);
  document.getElementById('btt').classList.toggle('show', window.scrollY > 500);
  setActiveLink();
});

/* ---- HAMBURGER ---- */
function closeMenu() {
  document.getElementById('navLinks').classList.remove('open');
  document.getElementById('navOverlay').classList.remove('open');
  document.getElementById('hambIcon').className = 'fas fa-bars';
}

function toggleMenu() {
  const nl = document.getElementById('navLinks');
  const ov = document.getElementById('navOverlay');
  const ic = document.getElementById('hambIcon');
  const isOpen = nl.classList.contains('open');
  if (isOpen) {
    closeMenu();
  } else {
    nl.classList.add('open');
    ov.classList.add('open');
    ic.className = 'fas fa-times';
  }
}

document.querySelectorAll('.nl').forEach(l => {
  l.addEventListener('click', () => closeMenu());
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeMenu();
});

/* ---- SCROLL REVEAL ---- */
(function () {
  const els = document.querySelectorAll('.reveal-up,.reveal-left,.reveal-right');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const delay = parseInt(e.target.style.getPropertyValue('--d')) || 0;
        setTimeout(() => e.target.classList.add('visible'), delay);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach(el => io.observe(el));
})();

/* ---- COUNTER ANIMATION ---- */
(function () {
  const nums = document.querySelectorAll('.metric-num[data-target]');
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = +el.dataset.target;
      const plus = el.nextElementSibling;
      let n = 0;
      const step = target / 55;
      const t = setInterval(() => {
        n += step;
        if (n >= target) { n = target; clearInterval(t); }
        el.textContent = Math.floor(n);
      }, 25);
      io.unobserve(el);
    });
  }, { threshold: 0.5 });
  nums.forEach(n => io.observe(n));
})();

/* ---- SMOOTH SCROLL ---- */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      window.scrollTo({ top: target.offsetTop - 78, behavior: 'smooth' });
    }
  });
});

/* ---- BACK TO TOP ---- */
function scrollTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ---- SEND EMAIL ---- */
function sendEmail(e) {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value.trim() || 'Website Inquiry';
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !message) { showToast('Please fill all required fields.', false); return; }

  const sub = encodeURIComponent('Inquiry from ' + name + ' — ' + subject);
  const body = encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\nMessage:\n' + message);
  window.location.href = `mailto:ajinkya.aglave@ahvertexsolution.com?subject=${sub}&body=${body}`;
  showToast('Opening mail client…', true);
  e.target.reset();
}

/* ---- TOAST ---- */
function showToast(msg, ok) {
  const t = document.createElement('div');
  t.textContent = msg;
  Object.assign(t.style, {
    position: 'fixed', bottom: '30px', left: '50%',
    transform: 'translateX(-50%) translateY(16px)',
    background: ok ? 'linear-gradient(135deg,#a07830,#e8c76a)' : '#c0392b',
    color: ok ? '#0d0f14' : '#fff',
    padding: '13px 28px', borderRadius: '50px',
    fontSize: '14px', fontWeight: '600',
    fontFamily: "'DM Sans',sans-serif",
    zIndex: '99999', opacity: '0',
    transition: 'all 0.4s ease',
    boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
    whiteSpace: 'nowrap'
  });
  document.body.appendChild(t);
  requestAnimationFrame(() => { t.style.opacity = '1'; t.style.transform = 'translateX(-50%) translateY(0)'; });
  setTimeout(() => {
    t.style.opacity = '0'; t.style.transform = 'translateX(-50%) translateY(16px)';
    setTimeout(() => t.remove(), 400);
  }, 3200);
}
