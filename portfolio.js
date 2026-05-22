/**
 * TOMATO ZERO-G SPACE PORTFOLIO — INTERACTIVE FRONTEND LOGIC
 * Includes:
 * 1. Navbar Scroll Effect & Active Section Highlighting
 * 2. Navigation Button Transition Triggers
 * 3. Elastic Lagging Custom Cursor (Themed to Space Orange #ff7c00)
 * 4. Deep-Space Twinkling Starfield Canvas (Interactive Parallax Coordinate Engine)
 * 5. Weightless Zero-G Astronaut Easing & Magnetic 3D Tilting Loops
 * 6. Interactive Categories, Arrows, and Hamburger HUD Toast Alerts
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initNavbarNavigators();
  initCustomCursor();
  initSpaceStarfield();
  initAstronautFloat();
  initInteractionAlerts();
});

/* ==========================================================================
   1. NAVBAR SCROLL EFFECT & ACTIVE SECTION HIGHLIGHTING
   ========================================================================== */
function initNavbarScroll() {
  const nav = document.getElementById('portfolio-nav');
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-mid-link');

  if (!nav) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    // Highlight active navbar links on scroll
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
  handleScroll(); // Call immediately to initialize
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
      // Redirect back to Page 4 (agency.html)
      window.location.href = './agency.html';
    });
  }

  if (nextBtn) {
    nextBtn.classList.remove('disabled');
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = './fionure.html';
    });
  }
}

/* ==========================================================================
   3. ELASTIC SPACE ORANGE CURSOR SYSTEM
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

  // Smooth elastic frame loop
  const updateRing = () => {
    if (isMoving) {
      const ease = 0.15; // Smooth lagging ratio
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
  const hoverSelector = 'a, button, .project-category-item, .tool-glass-card, .btn-space-arrow';

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
   4. DEEP-SPACE TWINKLING STARFIELD (3D PARALLAX COORDINATE CANVAS)
   ========================================================================== */
function initSpaceStarfield() {
  const canvas = document.getElementById('portfolio-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  const stars = [];
  const starCount = Math.min(120, Math.floor((width * height) / 12000));
  
  // Track mouse for starfield parallax offsets
  let targetMouseX = 0;
  let targetMouseY = 0;
  let easedMouseX = 0;
  let easedMouseY = 0;

  class Star {
    constructor() {
      this.reset();
      this.x = Math.random() * width;
      this.y = Math.random() * height;
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 1.5 + 0.5; // Star size
      this.baseAlpha = Math.random() * 0.4 + 0.35; // Alpha range
      this.twinklePhase = Math.random() * Math.PI * 2;
      this.twinkleSpeed = Math.random() * 0.015 + 0.005;
      
      // Deeper stars shift slower, closer shift faster (3D depth simulation)
      this.parallaxFactor = Math.random() * 0.035 + 0.008; 
      
      // Star hue (warm orange, cyber blue, pure white starbursts)
      const colors = [
        'rgba(255, 255, 255, ',
        'rgba(255, 124, 0, ',
        'rgba(120, 200, 255, '
      ];
      this.colorPrefix = colors[Math.random() < 0.75 ? 0 : (Math.random() < 0.6 ? 1 : 2)];
    }

    update() {
      // Periodic twinkle animation
      this.twinklePhase += this.twinkleSpeed;
      this.currentAlpha = this.baseAlpha + Math.sin(this.twinklePhase) * 0.25;
      this.currentAlpha = Math.max(0.1, Math.min(1, this.currentAlpha));
    }

    draw(px, py) {
      // Calculate shifts in coordinates based on mouse parallax coordinates
      const finalX = this.x - px * this.parallaxFactor;
      const finalY = this.y - py * this.parallaxFactor;

      // Wrap coordinate boundaries
      let screenX = (finalX + width) % width;
      let screenY = (finalY + height) % height;

      ctx.beginPath();
      ctx.arc(screenX, screenY, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `${this.colorPrefix}${this.currentAlpha})`;
      ctx.fill();

      // Add a slight radial glow to closer, larger stars
      if (this.size > 1.4 && this.currentAlpha > 0.6) {
        ctx.beginPath();
        ctx.arc(screenX, screenY, this.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 124, 0, ${this.currentAlpha * 0.12})`;
        ctx.fill();
      }
    }
  }

  // Populate star entities
  for (let i = 0; i < starCount; i++) {
    stars.push(new Star());
  }

  // Track coordinates
  window.addEventListener('mousemove', (e) => {
    targetMouseX = e.clientX - width / 2;
    targetMouseY = e.clientY - height / 2;
  }, { passive: true });

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Eased mouse offsets for ultra-smooth parallax
    easedMouseX += (targetMouseX - easedMouseX) * 0.04;
    easedMouseY += (targetMouseY - easedMouseY) * 0.04;

    stars.forEach(star => {
      star.update();
      star.draw(easedMouseX, easedMouseY);
    });

    requestAnimationFrame(animate);
  }
  animate();

  // Throttled window resize handler
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      
      const newCount = Math.min(120, Math.floor((width * height) / 12000));
      while (stars.length < newCount) {
        stars.push(new Star());
      }
      if (stars.length > newCount) {
        stars.splice(newCount);
      }
    }, 150);
  });
}

/* ==========================================================================
   5. ZERO-G ASTRONAUT SWAYING & MAGNETIC 3D CURSOR INTERACTION
   ========================================================================== */
function initAstronautFloat() {
  const astronaut = document.querySelector('.astronaut-hero-img');
  const backdropNum = document.querySelector('.outlined-backdrop-num');

  if (!astronaut) return;

  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;
  
  // Backdrop parallax variables
  let backdropEasedX = 0;
  let backdropEasedY = 0;

  window.addEventListener('mousemove', (e) => {
    // Normalized offset relative to the center of the screen
    mouseX = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
    mouseY = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
    
    // Magnetic sway target offsets
    targetX = mouseX * 25; // Pull astronaut horizontally
    targetY = mouseY * 25; // Pull astronaut vertically
  }, { passive: true });

  const renderLoop = (time) => {
    // Easing the magnetic mouse pull
    currentX += (targetX - currentX) * 0.05;
    currentY += (targetY - currentY) * 0.05;

    // Zero-gravity double-sine math sway (smooth organic floating translations)
    const floatY = Math.sin(time * 0.0012) * 16;
    const floatX = Math.cos(time * 0.0009) * 10;
    
    // Zero-gravity organic tilt/rotation
    const baseRotation = Math.sin(time * 0.0006) * 1.4; // between -1.4 and 1.4 degrees
    
    // 3D Rotations based on mouse vectors
    const tiltX = -currentY * 0.4;
    const tiltY = currentX * 0.4;
    
    // Apply final transform
    astronaut.style.transform = `
      translate3d(${floatX + currentX}px, ${floatY + currentY}px, 0)
      rotate(${baseRotation}deg)
      rotateX(${tiltX}deg)
      rotateY(${tiltY}deg)
    `;

    // Apply parallax offset to the hollow 2025 backdrops
    if (backdropNum) {
      backdropEasedX += (-targetX * 0.6 - backdropEasedX) * 0.03;
      backdropEasedY += (-targetY * 0.6 - backdropEasedY) * 0.03;
      
      backdropNum.style.transform = `
        translate(calc(-50% + ${backdropEasedX}px), calc(-50% + ${backdropEasedY}px))
      `;
    }

    requestAnimationFrame(renderLoop);
  };
  requestAnimationFrame(renderLoop);
}

/* ==========================================================================
   6. PREMIUM CONSOLE HUD ALERTS & CLICK HANDLERS
   ========================================================================== */
function initInteractionAlerts() {
  const arrows = document.querySelectorAll('.btn-space-arrow');
  const categories = document.querySelectorAll('.project-category-item');
  const logo = document.getElementById('portfolio-logo');
  const tools = document.querySelectorAll('.tool-glass-card');
  const hamburger = document.querySelector('.hamburger-btn-grid');

  // Arrow selectors alerts
  let projectIdx = 2025;
  arrows.forEach((arrow, index) => {
    arrow.addEventListener('click', () => {
      if (index === 0) {
        projectIdx--;
        showHudToast(`TOMATO CONSOLE // RETROGRADE SELECTION: ID.${projectIdx}`, 'rgba(6, 6, 8, 0.95)', '#ff7c00');
      } else {
        projectIdx++;
        showHudToast(`TOMATO CONSOLE // PROGRESSIVE SELECTION: ID.${projectIdx}`, 'rgba(6, 6, 8, 0.95)', '#ff7c00');
      }
    });
  });

  // Project Category alerts
  categories.forEach(cat => {
    cat.addEventListener('click', () => {
      const catName = cat.querySelector('.project-cat-name').textContent.toUpperCase();
      showHudToast(`SYS ARCHIVE // MOUNTING STREAM: ${catName} MODULE`, 'rgba(6, 6, 8, 0.95)', '#ff7c00');
    });
  });

  // Tech stack card alerts
  tools.forEach(tool => {
    tool.addEventListener('click', () => {
      const toolName = tool.querySelector('.tool-hud-index').textContent.toUpperCase();
      showHudToast(`SYS DEPLOYED // SELECTED TOOL STACK: ${toolName}`, 'rgba(6, 6, 8, 0.95)', '#ff7c00');
    });
  });

  // Logo alert
  if (logo) {
    logo.addEventListener('click', (e) => {
      e.preventDefault();
      showHudToast('TOMATO COGNITIVE // RE-ESTABLISHING Space Core Connection...', 'rgba(6, 6, 8, 0.95)', '#ff7c00');
    });
  }

  // Hamburger alert
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      showHudToast('SYS CONTEXT // MENU CHANNELS ROUTED: DIRECTORY ACTIVE', 'rgba(6, 6, 8, 0.95)', '#ff7c00');
    });
  }
}

/* ==========================================================================
   HUD TERMINAL ALERT ENGINE (Consistent Premium Custom Alert)
   ========================================================================== */
function showHudToast(message, bgColor, borderColor) {
  // Clear any existing toasts first to prevent piling
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
      <span class="toast-console-tag font-mono">[CONSOLE OUT]</span>
      <span class="toast-message font-mono">${message}</span>
    </div>
    <button class="toast-close-btn font-mono" aria-label="Dismiss Alert">×</button>
  `;

  // Apply premium glassmorphic inline styling
  Object.assign(toast.style, {
    position: 'fixed',
    bottom: '40px',
    right: '40px',
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    background: bgColor || 'rgba(6, 6, 8, 0.95)',
    border: `1px solid ${borderColor || '#ff7c00'}`,
    boxShadow: `0 10px 40px rgba(0, 0, 0, 0.7), 0 0 20px ${borderColor || 'rgba(255, 124, 0, 0.2)'}`,
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

  // Styling sub-components
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

  // Trigger animation entry
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

  // Auto dismiss after 5 seconds
  const autoDismiss = setTimeout(dismissToast, 5000);
  closeBtn.addEventListener('click', () => clearTimeout(autoDismiss));
}
