/**
 * RAZE AVANT-GARDE CYBER-FASHION MODELING AGENCY (PAGE 7) — INTERACTIVE FRONTEND LOGIC
 * Includes:
 * 1. Sequential Navigation Prev routing to fionure.html
 * 2. Elastic Lagging Custom Cursor themed to Neon-Pink (#d946ef)
 * 3. High-Performance Canvas Space Sparks Particle Engine
 * 4. Infinite Looping Typewriter/Write-Down Engine
 * 5. Premium Capsule Nav Highlighting & Form Submission Alerts
 * 6. Technical HUD Terminal Toast Alerts
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initNavbarNavigators();
  initCustomCursor();
  initSpaceSparks();
  initTypewriterLoop();
  initInteractionSystems();
});

/* ==========================================================================
   1. NAVBAR SCROLL EFFECT & ACTIVE SECTION HIGHLIGHTING
   ========================================================================== */
function initNavbarScroll() {
  const nav = document.getElementById('raze-nav');
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.capsule-link');

  if (!nav) return;

  let ticking = false;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    if (!ticking) {
      window.requestAnimationFrame(() => {
        let currentSectionId = '';
        sections.forEach(section => {
          const sectionTop = section.offsetTop - 150;
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
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial call
}

/* ==========================================================================
   2. NAVBAR NAVIGATION PAGE TRANSITION FLOW
   ========================================================================== */
function initNavbarNavigators() {
  const prevBtn = document.getElementById('nav-prev');
  const nextBtn = document.getElementById('nav-next');

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      // Route back to Page 6 (fionure.html)
      window.location.href = './fionure.html';
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      // Transition forward to Page 8 (tracle.html)
      window.location.href = './tracle.html';
    });
  }
}

/* ==========================================================================
   3. ELASTIC NEON-PINK CUSTOM CURSOR SYSTEM
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

  // Lagging frame update loop
  const updateRing = () => {
    if (isMoving) {
      const ease = 0.14; // Smooth mecha lag easing
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
        const maxStretch = 0.4;
        const stretch = 1 + Math.min(distance / 120, maxStretch);
        const squeeze = 1 - Math.min(distance / 240, 0.18);
        const angle = Math.atan2(dy, dx);
        ring.style.transform = `translate(-50%, -50%) rotate(${angle}rad) scale(${stretch}, ${squeeze})`;
      }
    }
    requestAnimationFrame(updateRing);
  };
  requestAnimationFrame(updateRing);

  // Targets triggering cursor expansion
  const hoverSelector = 'a, button, .capsule-link, .transparent-spec-card, input';

  document.addEventListener('mouseover', (e) => {
    const target = e.target.closest(hoverSelector);
    if (target) {
      dot.classList.add('hovered');
      ring.classList.add('hovered');
      ring.style.backgroundColor = 'rgba(217, 70, 239, 0.06)';
      ring.style.borderColor = '#d946ef';
      ring.style.boxShadow = '0 0 25px rgba(217, 70, 239, 0.5)';
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
    ring.style.transform = 'translate(-50%, -50%) scale(0.82)';
    ring.style.borderColor = '#d946ef';
  });

  document.addEventListener('mouseup', () => {
    ring.style.transform = 'translate(-50%, -50%) scale(1)';
    ring.style.borderColor = '';
  });
}

/* ==========================================================================
   4. SPACE SPARKS CANVASES (HIGH PERFORMANCE PARTICLE DRIFT)
   ========================================================================== */
function initSpaceSparks() {
  const canvas = document.getElementById('raze-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  const sparks = [];
  const sparkCount = Math.min(30, Math.floor((width * height) / 45000)); // Highly optimized, lightweight

  let targetMouseX = 0;
  let targetMouseY = 0;
  let easedMouseX = 0;
  let easedMouseY = 0;

  class Spark {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : height + 20;
      this.size = Math.random() * 1.5 + 0.4;
      this.speedY = -(Math.random() * 0.6 + 0.3); // Slow elegant drift upwards
      this.speedX = Math.random() * 0.3 - 0.15;
      this.baseAlpha = Math.random() * 0.4 + 0.2;
      this.alphaPhase = Math.random() * Math.PI * 2;
      this.alphaSpeed = Math.random() * 0.012 + 0.004;
      this.parallaxFactor = Math.random() * 0.03 + 0.01;
      
      const rand = Math.random();
      if (rand < 0.6) {
        this.colorPrefix = 'rgba(217, 70, 239, '; // Neon Pink
      } else if (rand < 0.85) {
        this.colorPrefix = 'rgba(139, 92, 246, '; // Violet Purple
      } else {
        this.colorPrefix = 'rgba(255, 255, 255, '; // Celestial White
      }
    }

    update() {
      this.y += this.speedY;
      this.x += this.speedX;

      this.alphaPhase += this.alphaSpeed;
      this.currentAlpha = this.baseAlpha + Math.sin(this.alphaPhase) * 0.12;
      this.currentAlpha = Math.max(0.05, Math.min(1, this.currentAlpha));

      if (this.y < -20 || this.x < -20 || this.x > width + 20) {
        this.reset(false);
      }
    }

    draw(px, py) {
      const finalX = this.x - px * this.parallaxFactor;
      const finalY = this.y - py * this.parallaxFactor;

      ctx.beginPath();
      ctx.arc(finalX, finalY, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `${this.colorPrefix}${this.currentAlpha})`;
      ctx.fill();

      // Ambient halo glow
      if (this.size > 1.1 && this.currentAlpha > 0.4) {
        ctx.beginPath();
        ctx.arc(finalX, finalY, this.size * 2.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(217, 70, 239, ${this.currentAlpha * 0.1})`;
        ctx.fill();
      }
    }
  }

  for (let i = 0; i < sparkCount; i++) {
    sparks.push(new Spark());
  }

  window.addEventListener('mousemove', (e) => {
    targetMouseX = e.clientX - width / 2;
    targetMouseY = e.clientY - height / 2;
  }, { passive: true });

  function animate() {
    ctx.clearRect(0, 0, width, height);

    easedMouseX += (targetMouseX - easedMouseX) * 0.05;
    easedMouseY += (targetMouseY - easedMouseY) * 0.05;

    sparks.forEach(spark => {
      spark.update();
      spark.draw(easedMouseX, easedMouseY);
    });

    requestAnimationFrame(animate);
  }
  animate();

  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;

      const newCount = Math.min(30, Math.floor((width * height) / 45000));
      while (sparks.length < newCount) {
        sparks.push(new Spark());
      }
      if (sparks.length > newCount) {
        sparks.splice(newCount);
      }
    }, 150);
  });
}

/* ==========================================================================
   5. LOOPING TYPEWRITER / WRITE-DOWN ENGINE
   ========================================================================== */
function initTypewriterLoop() {
  const targetEl = document.getElementById('typing-text');
  if (!targetEl) return;

  const phrases = [
    "here creativity meets the runway and imagination knows no bounds!",
    "redefine the boundaries of modeling by celebrating individual talent.",
    "forge raw creative potential into stellar digital fashion couture."
  ];

  let phraseIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let delay = 65; // Typing speed (ms)

  const tick = () => {
    const currentPhrase = phrases[phraseIdx];
    
    if (isDeleting) {
      // Remove characters
      targetEl.textContent = currentPhrase.substring(0, charIdx - 1);
      charIdx--;
      delay = 35; // Backspacing is faster
    } else {
      // Add characters
      targetEl.textContent = currentPhrase.substring(0, charIdx + 1);
      charIdx++;
      delay = 65; // Backspace/typing balance
    }

    // Checking boundaries
    if (!isDeleting && charIdx === currentPhrase.length) {
      // Completed writing phrase. Wait before backspacing.
      isDeleting = true;
      delay = 3200; // Let the reader review the statement
    } else if (isDeleting && charIdx === 0) {
      // Finished deleting. Cycle to next phrase.
      isDeleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      delay = 600; // Pause briefly before writing new word
    }

    setTimeout(tick, delay);
  };

  // Launch typewriter loop
  setTimeout(tick, 1000);
}

/* ==========================================================================
   6. PREMIUM COGNITIVE INTERACTIONS & HUD TOAST ENGINE
   ========================================================================== */
function initInteractionSystems() {
  const capsuleLinks = document.querySelectorAll('.capsule-link');
  const memberCapsule = document.querySelector('.nav-member-capsule');
  const signupForm = document.getElementById('runway-form');
  const signinBtn = document.querySelector('.btn-signin-capsule');
  const mailIcon = document.querySelector('.card-action-icon-wrapper');
  const socialIcons = document.querySelectorAll('.social-icon-link');

  // Active state capsule link highlight
  capsuleLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // Smooth scroll target
      const href = link.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        const el = document.querySelector(href);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
      
      capsuleLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      const text = link.textContent.trim().toUpperCase();
      showRazeToast(`RAZE ROUTING // DEPLOYED CHANNEL: ${text}`, 'rgba(3, 3, 4, 0.95)', '#d946ef');
    });
  });

  // Become a Member click handler
  if (memberCapsule) {
    memberCapsule.addEventListener('click', (e) => {
      e.preventDefault();
      const el = document.getElementById('signup-form');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
      showRazeToast('PORTAL ACCESS // RUNWAY SUBMISSION FORM DEPLOYED.', 'rgba(3, 3, 4, 0.95)', '#d946ef');
    });
  }

  // Sign In button clicks
  if (signinBtn) {
    signinBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const el = document.getElementById('signup-form');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
      showRazeToast('GATEWAY VALIDATION // PLEASE SUBMIT APPLICATION CONSOLE FIRST.', 'rgba(3, 3, 4, 0.95)', '#d946ef');
    });
  }

  // Envelope Mail Icon
  if (mailIcon) {
    mailIcon.addEventListener('click', () => {
      showRazeToast('COMMUNICATION CORE // DIRECT TELEMETRY CHANNEL NOMINAL.', 'rgba(3, 3, 4, 0.95)', '#d946ef');
    });
  }

  // Social Icons Toast Alerts
  socialIcons.forEach(icon => {
    icon.addEventListener('click', (e) => {
      e.preventDefault();
      const network = icon.getAttribute('aria-label').toUpperCase();
      showRazeToast(`DATA NODE MOUNTED // ${network} STREAM NOMINAL.`, 'rgba(3, 3, 4, 0.95)', '#d946ef');
    });
  });

  // Form submission logic
  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('user-name').value;
      
      showRazeToast(`APPLICATION SUBMITTED SUCCESSFUL! WELCOME TO THE COUTURE RUNWAY, ${name.toUpperCase()}!`, 'rgba(3, 3, 4, 0.95)', '#d946ef');
      signupForm.reset();
    });
  }
}

/* ==========================================================================
   TECHNICAL HUD TERMINAL TOAST ENGINE (Consistent Premium Custom Alerts)
   ========================================================================== */
function showRazeToast(message, bgColor, borderColor) {
  const existingToasts = document.querySelectorAll('.raze-terminal-toast');
  existingToasts.forEach(toast => {
    toast.style.transform = 'translateX(120%)';
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 400);
  });

  const toast = document.createElement('div');
  toast.className = 'raze-terminal-toast';
  toast.innerHTML = `
    <div class="toast-indicator"></div>
    <div class="toast-content-wrapper">
      <span class="toast-console-tag font-mono">[RAZE COUTURE CORE]</span>
      <span class="toast-message font-mono">${message}</span>
    </div>
    <button class="toast-close-btn font-mono" aria-label="Dismiss Alert">×</button>
  `;

  // Apply premium glassmorphic inline styles
  Object.assign(toast.style, {
    position: 'fixed',
    bottom: '40px',
    right: '40px',
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    background: bgColor || 'rgba(3, 3, 4, 0.95)',
    border: `1px solid ${borderColor || '#d946ef'}`,
    boxShadow: `0 10px 40px rgba(0, 0, 0, 0.7), 0 0 20px ${borderColor || 'rgba(217, 70, 239, 0.2)'}`,
    padding: '16px 22px',
    borderRadius: '4px',
    zIndex: '9999',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    transform: 'translateX(120%)',
    transition: 'all 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
    opacity: '0',
    maxWidth: '380px'
  });

  const indicator = toast.querySelector('.toast-indicator');
  const consoleTag = toast.querySelector('.toast-console-tag');
  const msgEl = toast.querySelector('.toast-message');
  const closeBtn = toast.querySelector('.toast-close-btn');

  Object.assign(indicator.style, {
    width: '3px',
    height: '24px',
    backgroundColor: borderColor || '#d946ef',
    borderRadius: '2px',
    boxShadow: `0 0 8px ${borderColor || '#d946ef'}`
  });

  Object.assign(consoleTag.style, {
    display: 'block',
    fontSize: '0.68rem',
    fontWeight: '800',
    color: borderColor || '#d946ef',
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

  const autoDismiss = setTimeout(dismissToast, 5000);
  closeBtn.addEventListener('click', () => clearTimeout(autoDismiss));
}
