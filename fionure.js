/**
 * PAH FIONURE CYBERNETIC MECHA HUB — INTERACTIVE CYBERNETIC HUD LOGIC
 * Includes:
 * 1. Navbar Scroll & Active Section Highlight
 * 2. Navigation Button Transition Triggers (Prev routes to portfolio.html)
 * 3. Elastic Lagging Custom Cursor themed to Mecha Red (#ff3344)
 * 4. High-Performance Canvas Cyber Embers System (Parallax Floating Particle Engine)
 * 5. Organic Zero-G Breathing & Magnetic 3D Coordinate Mouse-Tilt
 * 6. Interactive Node Selectors, CTA, Telemetry Log Stream & Toast alerts
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initNavbarNavigators();
  initCustomCursor();
  initCyberSparks();
  initMechaCenterFloat();
  initInteractionSystems();
});

/* ==========================================================================
   1. NAVBAR SCROLL EFFECT & ACTIVE SECTION HIGHLIGHTING
   ========================================================================== */
function initNavbarScroll() {
  const nav = document.getElementById('fionure-nav');
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-mid-link');

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
        // Highlight active navbar links on scroll
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
  handleScroll(); // Initial invocation
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
      // Redirect back to Page 5 (portfolio.html)
      window.location.href = './portfolio.html';
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      // Transition forward to Page 7 (raze.html)
      window.location.href = './raze.html';
    });
  }
}

/* ==========================================================================
   3. ELASTIC MECHA RED CUSTOM CURSOR SYSTEM
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
  const hoverSelector = 'a, button, .node-selector-item, .mecha-spec-card, .btn-mecha-pill';

  document.addEventListener('mouseover', (e) => {
    const target = e.target.closest(hoverSelector);
    if (target) {
      dot.classList.add('hovered');
      ring.classList.add('hovered');
      ring.style.backgroundColor = 'rgba(255, 51, 68, 0.08)';
      ring.style.borderColor = '#ff3344';
      ring.style.boxShadow = '0 0 25px rgba(255, 51, 68, 0.5)';
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
    ring.style.borderColor = '#ff3344';
  });

  document.addEventListener('mouseup', () => {
    ring.style.transform = 'translate(-50%, -50%) scale(1)';
    ring.style.borderColor = '';
  });
}

/* ==========================================================================
   4. CYBER SPARKS DRIFTING UPWARDS (PARALLAX PARTICLE ENGINE)
   ========================================================================== */
function initCyberSparks() {
  const canvas = document.getElementById('fionure-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  const sparks = [];
  const sparkCount = Math.min(40, Math.floor((width * height) / 32000)); // Optimized count for lightweight rendering

  // Mouse offset tracking for visual parallax shift
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
      this.size = Math.random() * 1.6 + 0.4;
      this.speedY = -(Math.random() * 0.8 + 0.4); // Floating upwards
      this.speedX = Math.random() * 0.4 - 0.2;     // Subtle horizontal drift
      this.baseAlpha = Math.random() * 0.5 + 0.3;
      this.alphaPhase = Math.random() * Math.PI * 2;
      this.alphaSpeed = Math.random() * 0.015 + 0.005;
      this.parallaxFactor = Math.random() * 0.04 + 0.01; // Depth layers
      
      // Cyber colors: pure mecha-white, vibrant hazard red, deep spark amber
      const rand = Math.random();
      if (rand < 0.65) {
        this.colorPrefix = 'rgba(255, 51, 68, '; // Glowing Red
      } else if (rand < 0.85) {
        this.colorPrefix = 'rgba(255, 255, 255, '; // Clean White
      } else {
        this.colorPrefix = 'rgba(255, 160, 0, '; // Energy Amber
      }
    }

    update() {
      this.y += this.speedY;
      this.x += this.speedX;

      // Pulse alpha smoothly
      this.alphaPhase += this.alphaSpeed;
      this.currentAlpha = this.baseAlpha + Math.sin(this.alphaPhase) * 0.15;
      this.currentAlpha = Math.max(0.1, Math.min(1, this.currentAlpha));

      // Reset when spark rises past screen bounds
      if (this.y < -20 || this.x < -20 || this.x > width + 20) {
        this.reset(false);
      }
    }

    draw(px, py) {
      // Calculate parallax translation
      const finalX = this.x - px * this.parallaxFactor;
      const finalY = this.y - py * this.parallaxFactor;

      ctx.beginPath();
      ctx.arc(finalX, finalY, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `${this.colorPrefix}${this.currentAlpha})`;
      ctx.fill();

      // Subtle glow for larger particles
      if (this.size > 1.2 && this.currentAlpha > 0.5) {
        ctx.beginPath();
        ctx.arc(finalX, finalY, this.size * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 51, 68, ${this.currentAlpha * 0.15})`;
        ctx.fill();
      }
    }
  }

  // Populate sparks
  for (let i = 0; i < sparkCount; i++) {
    sparks.push(new Spark());
  }

  // Mouse coords relative to screen center
  window.addEventListener('mousemove', (e) => {
    targetMouseX = e.clientX - width / 2;
    targetMouseY = e.clientY - height / 2;
  }, { passive: true });

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Ease the parallax offsets for zero latency feeling
    easedMouseX += (targetMouseX - easedMouseX) * 0.05;
    easedMouseY += (targetMouseY - easedMouseY) * 0.05;

    sparks.forEach(spark => {
      spark.update();
      spark.draw(easedMouseX, easedMouseY);
    });

    requestAnimationFrame(animate);
  }
  animate();

  // Handle window resizing
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;

      const newCount = Math.min(40, Math.floor((width * height) / 32000));
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
   5. ZERO-G BREATHING SWAY & MAGNETIC 3D MOUSE-TILT
   ========================================================================== */
function initMechaCenterFloat() {
  const mechaImage = document.querySelector('.fionure-hero-img');
  const backText = document.querySelector('.outlined-backdrop-text');

  if (!mechaImage) return;

  // Keep the mecha centerpiece 100% still and stable on all systems.
  mechaImage.style.transform = 'translate3d(0, 0, 0)';

  // Static overlay positioning for backing FIONURE title contours
  if (backText) {
    backText.style.transform = 'translate(-50%, -50%)';
  }
}

/* ==========================================================================
   6. PREMIUM COGNITIVE INTERACTIONS & HUD TOAST ENGINE
   ========================================================================== */
function initInteractionSystems() {
  const midLinks = document.querySelectorAll('.nav-mid-link');
  const logo = document.getElementById('fionure-logo');
  const calibrateBtn = document.querySelector('.btn-calibrate');
  const nodeItems = document.querySelectorAll('.node-selector-item');
  const arrows = document.querySelectorAll('.btn-mecha-arrow');
  const specCards = document.querySelectorAll('.mecha-spec-card');
  const hamburger = document.querySelector('.hamburger-btn-grid');
  const logsList = document.querySelector('.telemetry-logs-list');

  // 1. Navigation links active tab
  midLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      midLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      const text = link.textContent.toUpperCase();
      showHudToast(`SYS GATEWAY // ACCESS GRANTED: ${text} CHANNEL MOUNTED`, 'rgba(6, 6, 8, 0.95)', '#ff3344');
    });
  });

  // 2. Logo link clicked alert
  if (logo) {
    logo.addEventListener('click', (e) => {
      e.preventDefault();
      showHudToast('PAH OVERWATCH // DIAGNOSTIC SYSTEM SECURE. ALL COMPONENT LINKS NOMINAL.', 'rgba(6, 6, 8, 0.95)', '#ff3344');
    });
  }

  // 3. Initiate Calibration CTA handler
  if (calibrateBtn) {
    calibrateBtn.addEventListener('click', () => {
      showHudToast('PROTOCOL 6 INITIALIZING... EXECUTING CRITICAL NEURAL CALIBRATION.', 'rgba(6, 6, 8, 0.95)', '#ff3344');
      
      // Inject dummy logs into telemetry feed to make the site feel alive
      if (logsList) {
        setTimeout(() => injectLogEntry('Executing zero-g core micro-alignment.'), 800);
        setTimeout(() => injectLogEntry('Analyzing quantum crystalline lattice structures...'), 1600);
        setTimeout(() => injectLogEntry('Calibration success. Sync latency = 1.05 ms.'), 2400);
      }
    });
  }

  // 4. Node Selector Channels click tracking
  nodeItems.forEach(item => {
    item.addEventListener('click', () => {
      nodeItems.forEach(n => n.classList.remove('active'));
      item.classList.add('active');
      const channelName = item.getAttribute('data-channel').toUpperCase();
      showHudToast(`CORE DATA STREAM // DEPLOYED CHANNEL: ${channelName} INDEXED`, 'rgba(6, 6, 8, 0.95)', '#ff3344');
      injectLogEntry(`Channel stream switched to: ${channelName}`);
    });
  });

  // 5. Left/Right Chevron Arrow Indicators click handlers
  let chevronIndex = 6;
  arrows.forEach((arrow, idx) => {
    arrow.addEventListener('click', () => {
      if (idx === 0) {
        chevronIndex--;
        showHudToast(`PREV CORE MODULE DETECTED // ANOMALY SWEEP: SECTOR-${chevronIndex}`, 'rgba(6, 6, 8, 0.95)', '#ff3344');
      } else {
        chevronIndex++;
        showHudToast(`NEXT CORE MODULE DETECTED // SYSTEM SWEEP: SECTOR-${chevronIndex}`, 'rgba(6, 6, 8, 0.95)', '#ff3344');
      }
    });
  });

  // 6. Subsystem Specs click tracking
  specCards.forEach(card => {
    card.addEventListener('click', () => {
      const code = card.querySelector('.card-hud-code').textContent;
      showHudToast(`SYSTEM ACCESS // SUBSECTION ONLINE: ${code}`, 'rgba(6, 6, 8, 0.95)', '#ff3344');
    });
  });

  // 7. Hamburger menu grid alert
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      showHudToast('PAH HUD TERMINAL // ROUTING DIRECTORY INDEX CHANNELS OUT', 'rgba(6, 6, 8, 0.95)', '#ff3344');
    });
  }

  // Helper: Live Telemetry log injection
  function injectLogEntry(text) {
    if (!logsList) return;
    const now = new Date();
    const timeString = now.toTimeString().split(' ')[0];
    
    const entry = document.createElement('div');
    entry.className = 'log-entry';
    entry.innerHTML = `
      <span class="log-time">${timeString}</span>
      <span class="log-txt">${text}</span>
    `;
    logsList.appendChild(entry);
    logsList.scrollTop = logsList.scrollHeight; // Auto-scroll to bottom
  }
}

/* ==========================================================================
   TECHNICAL HUD TERMINAL TOAST ENGINE (Consistent Premium Custom Alerts)
   ========================================================================== */
function showHudToast(message, bgColor, borderColor) {
  // Clear any existing toasts to prevent dashboard clutter
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
      <span class="toast-console-tag font-mono">[PAH CORE SYSTEM]</span>
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
    background: bgColor || 'rgba(6, 6, 8, 0.95)',
    border: `1px solid ${borderColor || '#ff3344'}`,
    boxShadow: `0 10px 40px rgba(0, 0, 0, 0.7), 0 0 20px ${borderColor || 'rgba(255, 51, 68, 0.2)'}`,
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

  // Styling sub-components
  const indicator = toast.querySelector('.toast-indicator');
  const consoleTag = toast.querySelector('.toast-console-tag');
  const msgEl = toast.querySelector('.toast-message');
  const closeBtn = toast.querySelector('.toast-close-btn');

  Object.assign(indicator.style, {
    width: '3px',
    height: '24px',
    backgroundColor: borderColor || '#ff3344',
    borderRadius: '2px',
    boxShadow: `0 0 8px ${borderColor || '#ff3344'}`
  });

  Object.assign(consoleTag.style, {
    display: 'block',
    fontSize: '0.68rem',
    fontWeight: '800',
    color: borderColor || '#ff3344',
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

  // Animate slide-in
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

  // Auto-dismiss in 5s
  const autoDismiss = setTimeout(dismissToast, 5000);
  closeBtn.addEventListener('click', () => clearTimeout(autoDismiss));
}
