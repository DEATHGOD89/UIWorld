/**
 * AETHER CYBER DESIGN AGENCY — INTERACTIVE FRONTEND LOGIC
 * Includes:
 * 1. Navbar Scroll Effect & Active Section Highlighting
 * 2. Elastic Lagging Custom Cursor (Tailored to AETHER Cyber Orange)
 * 3. High-Performance Cyber Constellation Grid (Interactive Mesh Canvas)
 * 4. Premium Email Newsletter Capture with Sleek Terminal Toast Feedback
 * 5. Dynamic Partner Badges HUD Overlay Notifications
 * 6. Book a Call Terminal Scheduler Overlay & Modal Action
 * 7. Mobile Navigation Drawer Toggle Handler
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initNavbarNavigators();
  initCustomCursor();
  initCyberConstellation();
  initInteractiveWidgets();
  initPartnerBadges();
  initMobileMenu();
});

/* ==========================================================================
   1. NAVBAR SCROLL EFFECT & ACTIVE SECTION HIGHLIGHTING
   ========================================================================== */
function initNavbarScroll() {
  const nav = document.getElementById('agency-nav');
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-mid-link');

  if (!nav) return;

  // Toggle scrolled navbar size
  const handleScroll = () => {
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    // Dynamic active links highlight on scroll
    let currentSectionId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    if (currentSectionId) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('active');
        }
      });
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Execute instantly to ensure initial alignment
}

/* ==========================================================================
   1B. NAVBAR PAGE-TO-PAGE NAVIGATORS
   ========================================================================== */
function initNavbarNavigators() {
  const prevBtn = document.getElementById('nav-prev');
  const nextBtn = document.getElementById('nav-next');

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      // Navigate back to the third page (division.html)
      window.location.href = './division.html';
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = './portfolio.html';
    });
  }
}

/* ==========================================================================
   2. CUSTOM ELASTIC ORANGE THEME CURSOR LOGIC
   ========================================================================== */
function initCustomCursor() {
  const dot = document.getElementById('custom-cursor-dot');
  const ring = document.getElementById('custom-cursor-ring');

  if (!dot || !ring) return;

  let mouseX = 0;
  let mouseY = 0;
  let ringX = 0;
  let ringY = 0;
  let isMoving = false;
  let isFirstMove = true;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    dot.style.left = `${mouseX}px`;
    dot.style.top = `${mouseY}px`;

    if (isFirstMove) {
      ringX = mouseX;
      ringY = mouseY;
      isFirstMove = false;
    }

    if (!isMoving) {
      isMoving = true;
      dot.style.opacity = '1';
      ring.style.opacity = '1';
    }
  }, { passive: true });

  document.addEventListener('mouseleave', () => {
    dot.style.opacity = '0';
    ring.style.opacity = '0';
    isMoving = false;
  });

  document.addEventListener('mouseenter', () => {
    dot.style.opacity = '1';
    ring.style.opacity = '1';
  });

  const updateRing = () => {
    if (isMoving) {
      const ease = 0.15;
      ringX += (mouseX - ringX) * ease;
      ringY += (mouseY - ringY) * ease;

      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;

      const dx = mouseX - ringX;
      const dy = mouseY - ringY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (ring.classList.contains('hovered')) {
        ring.style.transform = 'translate(-50%, -50%) scale(1)';
      } else {
        const maxStretch = 0.45;
        const stretch = 1 + Math.min(distance / 100, maxStretch);
        const squeeze = 1 - Math.min(distance / 200, 0.2);
        const angle = Math.atan2(dy, dx);
        ring.style.transform = `translate(-50%, -50%) rotate(${angle}rad) scale(${stretch}, ${squeeze})`;
      }
    }
    requestAnimationFrame(updateRing);
  };
  requestAnimationFrame(updateRing);

  // Targets that trigger cursor blooms
  const hoverSelector = 'a, button, .badge-circle-item, .mini-avatar-glow, .email-hud-input, .partner-item, input[type="email"]';

  document.addEventListener('mouseover', (e) => {
    const target = e.target.closest(hoverSelector);
    if (target) {
      dot.classList.add('hovered');
      ring.classList.add('hovered');
      ring.style.backgroundColor = 'rgba(255, 124, 0, 0.08)';
      ring.style.borderColor = '#ff7c00';
      ring.style.boxShadow = '0 0 25px rgba(255, 124, 0, 0.5)';
    }
  });

  document.addEventListener('mouseout', (e) => {
    const target = e.target.closest(hoverSelector);
    if (target) {
      dot.classList.remove('hovered');
      ring.classList.remove('hovered');
      ring.style.backgroundColor = '';
      ring.style.borderColor = '';
      ring.style.boxShadow = '';
    }
  });

  document.addEventListener('mousedown', () => {
    ring.style.transform = 'translate(-50%, -50%) scale(0.8)';
    ring.style.borderColor = '#ff7c00';
  });

  document.addEventListener('mouseup', () => {
    ring.style.transform = 'translate(-50%, -50%) scale(1)';
    ring.style.borderColor = '';
  });
}

/* ==========================================================================
   3. HIGH-PERFORMANCE CYBER CONSTELLATION GRID CANVAS
   ========================================================================== */
function initCyberConstellation() {
  const canvas = document.getElementById('agency-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  const particles = [];
  const maxParticles = Math.min(60, Math.floor((width * height) / 22000)); // Cap by viewport size
  const maxConnectDistance = 130;
  
  // Track mouse coordinates for interactive magnetic pulls
  let mouse = { x: null, y: null, active: false };

  class Particle {
    constructor() {
      this.reset();
      this.x = Math.random() * width;
      this.y = Math.random() * height;
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() * 0.4 - 0.2); // Slow drift speed
      this.vy = (Math.random() * 0.4 - 0.2);
      this.radius = Math.random() * 1.8 + 0.8;
      this.alpha = Math.random() * 0.4 + 0.25;
      
      // Pulse properties
      this.pulseSpeed = Math.random() * 0.02 + 0.005;
      this.pulsePhase = Math.random() * Math.PI;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      // Wrap around bounds
      if (this.x < -10) this.x = width + 10;
      if (this.x > width + 10) this.x = -10;
      if (this.y < -10) this.y = height + 10;
      if (this.y > height + 10) this.y = -10;

      // Subtle pulse size
      this.pulsePhase += this.pulseSpeed;
      this.currentRadius = this.radius + Math.sin(this.pulsePhase) * 0.4;

      // Mouse interactive repeller / attractor logic
      if (mouse.active && mouse.x !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 180) {
          const force = (180 - dist) / 180; // normalized force
          
          // Gently attract toward mouse
          this.x += (dx / dist) * force * 0.5;
          this.y += (dy / dist) * force * 0.5;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.currentRadius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 124, 0, ${this.alpha})`;
      ctx.fill();
    }
  }

  // Populate particles
  for (let i = 0; i < maxParticles; i++) {
    particles.push(new Particle());
  }

  // Draw lines connecting particles
  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      const p1 = particles[i];
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxConnectDistance) {
          // Opacity fades out linearly based on distance
          const alpha = (1 - dist / maxConnectDistance) * 0.18;
          ctx.strokeStyle = `rgba(255, 124, 0, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }

      // Optional mouse integration: draw connection from mouse to node
      if (mouse.active && mouse.x !== null) {
        const mdx = p1.x - mouse.x;
        const mdy = p1.y - mouse.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);

        if (mdist < 160) {
          const malpha = (1 - mdist / 160) * 0.22;
          ctx.strokeStyle = `rgba(255, 124, 0, ${malpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
      p.update();
      p.draw();
    });

    drawConnections();
    requestAnimationFrame(animate);
  }

  // Bind mouse track listeners
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.active = true;
  }, { passive: true });

  window.addEventListener('mouseleave', () => {
    mouse.active = false;
  });

  animate();

  // Throttled window resize handler
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      
      // Readjust particle counts
      const newMax = Math.min(60, Math.floor((width * height) / 22000));
      while (particles.length < newMax) {
        particles.push(new Particle());
      }
      if (particles.length > newMax) {
        particles.splice(newMax);
      }
    }, 150);
  });
}

/* ==========================================================================
   4. EMAIL CAPTURE & SCHEDULE A CALL WIDGET INTERACTIONS
   ========================================================================== */
function initInteractiveWidgets() {
  const emailInput = document.querySelector('.email-hud-input');
  const emailSubmit = document.querySelector('.btn-email-submit');

  if (emailInput && emailSubmit) {
    const handleSubscribe = () => {
      const email = emailInput.value.trim();
      if (!email) {
        showHudToast('ERROR: INVALID EMAIL', 'rgba(255, 30, 30, 0.95)', '#ff1e1e');
        return;
      }
      
      if (!validateEmail(email)) {
        showHudToast('ERROR: UNVERIFIED ADDRESS FORMAT', 'rgba(255, 30, 30, 0.95)', '#ff1e1e');
        return;
      }

      // Successful capture animation
      emailSubmit.style.transform = 'scale(0.85)';
      setTimeout(() => {
        emailSubmit.style.transform = 'scale(1)';
        emailInput.value = '';
        showHudToast('HUD: REGISTERED SUCCESSFULLY // STREAM OPENED', 'rgba(12, 12, 16, 0.95)', '#ff7c00');
      }, 200);
    };

    emailSubmit.addEventListener('click', handleSubscribe);
    emailInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleSubscribe();
    });
  }

  // Widget 1 Book a Call Click logic
  const bookCallBtn = document.querySelector('.btn-book-call');
  if (bookCallBtn) {
    bookCallBtn.addEventListener('click', (e) => {
      e.preventDefault();
      showScheduleModal();
    });
  }
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

/* ==========================================================================
   5. PREMIUM TERMINAL HUD TOAST NOTIFICATION ENGINE
   ========================================================================== */
function showHudToast(message, bgColor, borderColor) {
  // Remove existing toasts to prevent overlaps
  const existingToasts = document.querySelectorAll('.hud-terminal-toast');
  existingToasts.forEach(toast => {
    toast.style.transform = 'translateX(120%)';
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 400);
  });

  const toast = document.createElement('div');
  toast.className = 'hud-terminal-toast';
  toast.innerHTML = `
    <div class="toast-indicator"></div>
    <div class="toast-content-wrapper">
      <span class="toast-console-tag font-mono">[SYS ALERT]</span>
      <span class="toast-message font-mono">${message}</span>
    </div>
    <button class="toast-close-btn font-mono" aria-label="Dismiss Alert">×</button>
  `;

  // Inline styling for precise visual layout
  Object.assign(toast.style, {
    position: 'fixed',
    bottom: '40px',
    right: '40px',
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    background: bgColor || 'rgba(12, 12, 16, 0.95)',
    border: `1px solid ${borderColor || '#ff7c00'}`,
    boxShadow: `0 10px 40px rgba(0, 0, 0, 0.6), 0 0 20px ${borderColor || 'rgba(255, 124, 0, 0.2)'}`,
    padding: '16px 22px',
    borderRadius: '6px',
    zIndex: '9999',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    transform: 'translateX(120%)',
    transition: 'all 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
    opacity: '0',
    maxWidth: '380px'
  });

  // Inner elements selectors & formatting
  const indicator = toast.querySelector('.toast-indicator');
  const consoleTag = toast.querySelector('.toast-console-tag');
  const msgEl = toast.querySelector('.toast-message');
  const closeBtn = toast.querySelector('.toast-close-btn');

  Object.assign(indicator.style, {
    width: '3px',
    height: '24px',
    backgroundColor: borderColor || '#ff7c00',
    borderRadius: '2px',
    boxShadow: `0 0 8px ${borderColor || '#ff7c00'}`
  });

  Object.assign(consoleTag.style, {
    display: 'block',
    fontSize: '0.68rem',
    fontWeight: '800',
    color: borderColor || '#ff7c00',
    letterSpacing: '0.15em',
    marginBottom: '2px'
  });

  Object.assign(msgEl.style, {
    fontSize: '0.82rem',
    fontWeight: '500',
    color: '#ffffff',
    letterSpacing: '0.04em',
    lineHeight: '1.3'
  });

  Object.assign(closeBtn.style, {
    background: 'none',
    border: 'none',
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: '1.2rem',
    cursor: 'pointer',
    padding: '0 0 0 10px',
    marginLeft: 'auto',
    transition: 'color 0.2s ease'
  });

  closeBtn.addEventListener('mouseenter', () => {
    closeBtn.style.color = '#ffffff';
  });
  closeBtn.addEventListener('mouseleave', () => {
    closeBtn.style.color = 'rgba(255, 255, 255, 0.4)';
  });

  document.body.appendChild(toast);

  // Force paint and trigger slide-in entry
  setTimeout(() => {
    toast.style.transform = 'translateX(0)';
    toast.style.opacity = '1';
  }, 50);

  const dismissToast = () => {
    toast.style.transform = 'translateX(120%)';
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 450);
  };

  closeBtn.addEventListener('click', dismissToast);

  // Auto dismiss after 5.5 seconds
  const autoDismiss = setTimeout(dismissToast, 5500);

  // Clear timeout if clicked manually
  closeBtn.addEventListener('click', () => clearTimeout(autoDismiss));
}

/* ==========================================================================
   6. DYNAMIC PARTNER BADGES HUD NOTIFICATIONS
   ========================================================================== */
function initPartnerBadges() {
  const badges = document.querySelectorAll('.badge-circle-item');
  
  const partnerMetadata = [
    { name: 'GITHUB', desc: 'Secure Open-Source Infrastructure Integration' },
    { name: 'FIGMA', desc: 'Vector Graphic & High Fidelity Design Standards' },
    { name: 'ARCHIN', desc: 'Kinetic 3D Mesh Engine & Architectural Space Scaling' },
    { name: 'MATTHEW', desc: 'Curator of Sound FX & Digital Film Composition' },
    { name: 'ZUMAR CONS', desc: 'Industrial Grade Virtual Media Production Platform' }
  ];

  badges.forEach((badge, index) => {
    badge.addEventListener('click', () => {
      const data = partnerMetadata[index] || { name: 'PARTNER BRAND', desc: 'Active Network Synchronization Established' };
      
      // Visual feedback ripple trigger
      badge.style.transform = 'scale(0.9)';
      setTimeout(() => {
        badge.style.transform = '';
        showHudToast(`PARTNER CONNECTED // ${data.name} — ${data.desc}`, 'rgba(12, 12, 16, 0.95)', '#ff7c00');
      }, 150);
    });
  });
}

/* ==========================================================================
   7. SCHEDULE A CALL TERMINAL MODAL POPUP
   ========================================================================== */
function showScheduleModal() {
  // Prevent duplicate modals
  if (document.getElementById('hud-scheduler-modal')) return;

  const modal = document.createElement('div');
  modal.id = 'hud-scheduler-modal';
  modal.innerHTML = `
    <div class="scheduler-modal-backdrop"></div>
    <div class="scheduler-content-box">
      
      <!-- Modal Header -->
      <div class="scheduler-header">
        <div class="scheduler-title-wrap">
          <svg class="scheduler-pulse-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="#ff7c00" stroke-width="1.8" />
            <circle cx="12" cy="12" r="4" fill="#ff7c00" class="mini-pulse" />
          </svg>
          <span class="scheduler-tag font-mono">[AETHER SCHEDULER]</span>
        </div>
        <button class="scheduler-close font-mono" aria-label="Close modal">×</button>
      </div>

      <!-- Modal Body -->
      <div class="scheduler-body">
        <h3 class="scheduler-headline font-oswald">INITIALIZE DIRECT CONSULTATION</h3>
        <p class="scheduler-desc">Select a visual project focus and synchronize a calendar stream with our Design Directors.</p>
        
        <!-- Form Elements -->
        <div class="scheduler-form">
          <div class="form-row">
            <label class="form-hud-label font-mono">/ FOCUS</label>
            <select class="form-hud-select font-mono">
              <option value="brand">BRANDING & ART DIRECTION</option>
              <option value="motion">MOTION & EXPERIMENTAL DESIGN</option>
              <option value="full">FULL PRODUCT SYSTEM</option>
            </select>
          </div>

          <div class="form-row">
            <label class="form-hud-label font-mono">/ SECURE ID</label>
            <input type="text" placeholder="Your Name or Studio" class="form-hud-input font-mono">
          </div>

          <button class="btn-scheduler-submit font-oswald">
            <span>INIT SYNCHRONIZATION</span>
          </button>
        </div>

      </div>

    </div>
  `;

  // Inline CSS for the glassmorphic terminal schedule modal
  Object.assign(modal.style, {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    zIndex: '10000',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: '0',
    transition: 'opacity 0.4s ease'
  });

  document.body.appendChild(modal);

  const backdrop = modal.querySelector('.scheduler-modal-backdrop');
  const box = modal.querySelector('.scheduler-content-box');
  const closeBtn = modal.querySelector('.scheduler-close');
  const submitBtn = modal.querySelector('.btn-scheduler-submit');
  const selectEl = modal.querySelector('.form-hud-select');
  const inputEl = modal.querySelector('.form-hud-input');

  Object.assign(backdrop.style, {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    background: 'rgba(5, 5, 7, 0.75)',
    backdropFilter: 'blur(15px)',
    WebkitBackdropFilter: 'blur(15px)',
    transition: 'all 0.4s ease'
  });

  Object.assign(box.style, {
    position: 'relative',
    background: 'rgba(12, 12, 16, 0.85)',
    border: '1px solid rgba(255, 124, 0, 0.15)',
    borderRadius: '8px',
    boxShadow: '0 25px 55px rgba(0, 0, 0, 0.6), 0 0 35px rgba(255, 124, 0, 0.08)',
    padding: '30px',
    width: '90%',
    maxWidth: '460px',
    zIndex: '2',
    transform: 'scale(0.92) translateY(20px)',
    transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s ease',
    overflow: 'hidden'
  });

  // Modal header layout
  const header = modal.querySelector('.scheduler-header');
  Object.assign(header.style, {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
    paddingBottom: '14px',
    marginBottom: '20px'
  });

  const titleWrap = modal.querySelector('.scheduler-title-wrap');
  Object.assign(titleWrap.style, {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  });

  const tag = modal.querySelector('.scheduler-tag');
  Object.assign(tag.style, {
    fontSize: '0.72rem',
    fontWeight: '800',
    color: '#ff7c00',
    letterSpacing: '0.12em'
  });

  Object.assign(closeBtn.style, {
    background: 'none',
    border: 'none',
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: '1.5rem',
    lineHeight: '1',
    cursor: 'pointer',
    transition: 'color 0.2s ease',
    padding: '0'
  });

  closeBtn.addEventListener('mouseenter', () => closeBtn.style.color = '#ff7c00');
  closeBtn.addEventListener('mouseleave', () => closeBtn.style.color = 'rgba(255, 255, 255, 0.4)');

  // Modal body layout
  const headline = modal.querySelector('.scheduler-headline');
  Object.assign(headline.style, {
    fontSize: '1.45rem',
    fontWeight: '700',
    letterSpacing: '0.08em',
    color: '#ffffff',
    marginBottom: '8px'
  });

  const desc = modal.querySelector('.scheduler-desc');
  Object.assign(desc.style, {
    fontSize: '0.85rem',
    lineHeight: '1.5',
    color: '#92969e',
    marginBottom: '24px'
  });

  // Form row styling
  const rows = modal.querySelectorAll('.form-row');
  rows.forEach(row => {
    Object.assign(row.style, {
      display: 'flex',
      flexDirection: 'column',
      gap: '6px',
      marginBottom: '16px'
    });
  });

  const labels = modal.querySelectorAll('.form-hud-label');
  labels.forEach(label => {
    Object.assign(label.style, {
      fontSize: '0.68rem',
      fontWeight: '800',
      color: 'rgba(255, 124, 0, 0.8)',
      letterSpacing: '0.12em'
    });
  });

  Object.assign(selectEl.style, {
    background: '#050507',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '4px',
    color: '#ffffff',
    padding: '10px 14px',
    fontSize: '0.82rem',
    fontFamily: 'inherit',
    outline: 'none',
    transition: 'border-color 0.3s ease',
    cursor: 'pointer'
  });
  selectEl.addEventListener('focus', () => selectEl.style.borderColor = '#ff7c00');
  selectEl.addEventListener('blur', () => selectEl.style.borderColor = 'rgba(255, 255, 255, 0.08)');

  Object.assign(inputEl.style, {
    background: '#050507',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '4px',
    color: '#ffffff',
    padding: '10px 14px',
    fontSize: '0.82rem',
    fontFamily: 'inherit',
    outline: 'none',
    transition: 'border-color 0.3s ease'
  });
  inputEl.addEventListener('focus', () => inputEl.style.borderColor = '#ff7c00');
  inputEl.addEventListener('blur', () => inputEl.style.borderColor = 'rgba(255, 255, 255, 0.08)');

  // Submit button styling
  Object.assign(submitBtn.style, {
    background: '#ff7c00',
    color: '#000',
    border: 'none',
    borderRadius: '4px',
    padding: '12px 0',
    width: '100%',
    fontSize: '0.88rem',
    fontWeight: '700',
    letterSpacing: '0.08em',
    cursor: 'pointer',
    marginTop: '10px',
    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
    boxShadow: '0 4px 15px rgba(255, 124, 0, 0.25)'
  });

  submitBtn.addEventListener('mouseenter', () => {
    submitBtn.style.background = '#ffffff';
    submitBtn.style.boxShadow = '0 6px 20px rgba(255, 255, 255, 0.3)';
    box.style.borderColor = '#ff7c00';
  });

  submitBtn.addEventListener('mouseleave', () => {
    submitBtn.style.background = '#ff7c00';
    submitBtn.style.boxShadow = '0 4px 15px rgba(255, 124, 0, 0.25)';
    box.style.borderColor = 'rgba(255, 124, 0, 0.15)';
  });

  // Force paint, then trigger transition
  setTimeout(() => {
    modal.style.opacity = '1';
    box.style.transform = 'scale(1) translateY(0)';
  }, 30);

  const dismissModal = () => {
    modal.style.opacity = '0';
    box.style.transform = 'scale(0.92) translateY(20px)';
    setTimeout(() => modal.remove(), 400);
  };

  // Close bindings
  closeBtn.addEventListener('click', dismissModal);
  backdrop.addEventListener('click', dismissModal);

  // Submit binding
  submitBtn.addEventListener('click', () => {
    const id = inputEl.value.trim();
    if (!id) {
      inputEl.style.borderColor = '#ff1e1e';
      showHudToast('ERROR: ID INPUT MANDATORY', 'rgba(255, 30, 30, 0.95)', '#ff1e1e');
      return;
    }

    submitBtn.style.transform = 'scale(0.96)';
    setTimeout(() => {
      dismissModal();
      showHudToast(`SYS: CALENDAR SYNC SECURED // TARGET: ${id.toUpperCase()}`, 'rgba(12, 12, 16, 0.95)', '#ff7c00');
    }, 250);
  });
}

/* ==========================================================================
   8. MOBILE NAVIGATION DRAWER TOGGLE HANDLER
   ========================================================================== */
function initMobileMenu() {
  const menuBtn = document.querySelector('.hamburger-btn-grid');
  const navMid = document.querySelector('.nav-links-mid');

  if (!menuBtn || !navMid) return;

  let isMenuOpen = false;

  // Append a mobile drawer stylesheet overlay dynamically
  const style = document.createElement('style');
  style.textContent = `
    @media (max-width: 992px) {
      .nav-links-mid {
        position: fixed;
        top: 0;
        right: -100%;
        width: 320px;
        height: 100vh;
        background: rgba(12, 12, 16, 0.98);
        border-left: 1px solid rgba(255, 124, 0, 0.15);
        backdrop-filter: blur(30px);
        -webkit-backdrop-filter: blur(30px);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 36px;
        z-index: 95;
        transition: right 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        box-shadow: -15px 0 45px rgba(0, 0, 0, 0.8);
      }
      .nav-links-mid.open {
        right: 0;
      }
      .nav-links-mid .nav-mid-link {
        font-size: 1.15rem;
        letter-spacing: 0.15em;
      }
      /* Hamburger animations */
      .hamburger-btn-grid.active .grid-dots span:nth-child(1) { transform: translate(3px, 3px); }
      .hamburger-btn-grid.active .grid-dots span:nth-child(3) { transform: translate(-3px, 3px); }
      .hamburger-btn-grid.active .grid-dots span:nth-child(7) { transform: translate(3px, -3px); }
      .hamburger-btn-grid.active .grid-dots span:nth-child(9) { transform: translate(-3px, -3px); }
      .hamburger-btn-grid.active .grid-dots span:nth-child(5) { transform: scale(1.4); background-color: #ff7c00; }
    }
  `;
  document.head.appendChild(style);

  const toggleMenu = () => {
    isMenuOpen = !isMenuOpen;
    menuBtn.classList.toggle('active', isMenuOpen);
    navMid.classList.toggle('open', isMenuOpen);
    
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      // Click backdrop to close mobile menu
      const backdrop = document.createElement('div');
      backdrop.className = 'mobile-nav-backdrop';
      Object.assign(backdrop.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        background: 'rgba(5, 5, 7, 0.4)',
        backdropFilter: 'blur(5px)',
        zIndex: '90'
      });
      document.body.appendChild(backdrop);
      backdrop.addEventListener('click', toggleMenu);
    } else {
      document.body.style.overflow = '';
      const backdrop = document.querySelector('.mobile-nav-backdrop');
      if (backdrop) backdrop.remove();
    }
  };

  menuBtn.addEventListener('click', toggleMenu);

  // Close menu when links are clicked
  const links = navMid.querySelectorAll('.nav-mid-link');
  links.forEach(link => {
    link.addEventListener('click', () => {
      if (isMenuOpen) toggleMenu();
    });
  });
}
