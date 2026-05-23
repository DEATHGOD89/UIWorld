/**
 * DIGITAL KENSEI NFT LANDING PAGE FRONTEND LOGIC
 * Includes:
 * 1. Navbar scroll effect
 * 2. Mobile menu modal toggle & smooth scroll navigation
 * 3. High performance canvas-based cherry blossom particle system
 * 4. Advanced cubic scroll-triggered count-up animation
 * 5. Interactive micro-interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initSectionNavigators();
  initUISelector();
  initMenu();
  initParticles();
  initLuxuryForm();
  initCustomCursor();
});

/* ==========================================================================
   1. NAVBAR SCROLL EFFECT
   ========================================================================== */
function initNavbar() {
  const navbar = document.getElementById('main-nav');
  if (!navbar) return;

  const handleScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Check immediately on load
}

/* ==========================================================================
   1B. NAVBAR SECTION NAVIGATORS (PREV / NEXT)
   ========================================================================== */
function initSectionNavigators() {
  const prevBtn = document.getElementById('nav-prev');
  const nextBtn = document.getElementById('nav-next');
  
  if (!prevBtn || !nextBtn) return;
  
  // On the first page (index.html), PREV is disabled because there is no previous page
  prevBtn.classList.add('disabled');
  prevBtn.setAttribute('style', 'opacity: 0.3; pointer-events: none;');
  
  // NEXT button navigates to the next page (verdant.html)
  nextBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = './verdant.html';
  });
}

/* ==========================================================================
   1C. UI SELECTOR DROPDOWN LOGIC
   ========================================================================== */
function initUISelector() {
  const uiSelector = document.getElementById('ui-selector');
  const uiSelectBtn = document.getElementById('ui-select-btn');
  
  if (!uiSelector || !uiSelectBtn) return;
  
  // Toggle dropdown on button click
  uiSelectBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    uiSelector.classList.toggle('open');
  });
  
  // Close dropdown on clicking anywhere outside
  document.addEventListener('click', (e) => {
    if (!uiSelector.contains(e.target)) {
      uiSelector.classList.remove('open');
    }
  });
  
  // Close dropdown on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      uiSelector.classList.remove('open');
    }
  });
}

/* ==========================================================================
   2. MOBILE MENU OVERLAY & NAVIGATION
   ========================================================================== */
function initMenu() {
  const menuBtn = document.getElementById('menu-btn');
  const menuOverlay = document.getElementById('menu-overlay');
  const menuLinks = document.querySelectorAll('.menu-item');
  const hamburger = document.querySelector('.hamburger');

  if (!menuBtn || !menuOverlay) return;

  const toggleMenu = () => {
    const isOpen = menuOverlay.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', isOpen);
    
    if (isOpen) {
      document.body.style.overflow = 'hidden'; // Stop background scroll
      if (hamburger) hamburger.style.transform = 'rotate(90deg)';
    } else {
      document.body.style.overflow = '';
      if (hamburger) hamburger.style.transform = '';
    }
  };

  menuBtn.addEventListener('click', toggleMenu);

  // Close menu and smooth scroll when links are clicked
  menuLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('data-target');
      const targetSection = document.getElementById(targetId);
      
      toggleMenu(); // Close overlay

      if (targetSection) {
        setTimeout(() => {
          targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }, 300); // Wait for menu exit animation
      }
    });
  });
}

/* ==========================================================================
   3. CHERRY BLOSSOM PARTICLE CANVAS SYSTEM
   ========================================================================== */
function initParticles() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particles = [];
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  // Handle Resize
  const handleResize = () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  };
  window.addEventListener('resize', handleResize, { passive: true });

  // Preload high-fidelity transparent leaf atlas
  const leafImg = new Image();
  leafImg.src = new URL('./assets/leaves_atlas.png', import.meta.url).href;
  let isLeafImgLoaded = false;
  leafImg.onload = () => {
    isLeafImgLoaded = true;
  };

  // Particle Class representing a stylized falling autumn Japanese leaf or sakura petal
  class Leaf {
    constructor() {
      this.reset();
      this.y = Math.random() * height; // Distribute vertically on init
    }

    reset() {
      this.x = Math.random() * width;
      this.y = -30; // Spawn offscreen
      
      // Slicing 4x4 grid (16 cells total) from the high-fidelity leaf atlas
      this.cellIndex = Math.floor(Math.random() * 16);
      
      // Slicing distribution: sakura pink leaves vs maple red leaves
      this.isSakura = this.cellIndex < 8; // First 2 rows (cells 0-7) are pink sakura leaves, last 2 rows are red maple
      
      if (this.isSakura) {
        // Sakura leaves (pink, elegant): smaller, delicate size (12px to 22px total diameter)
        this.size = Math.random() * 5 + 6;
        this.speedY = Math.random() * 1.0 + 0.8;
        this.speedX = Math.random() * 1.4 - 0.3;
        this.rotationSpeed = Math.random() * 2.4 - 1.2;
        this.color = '#F5B0C4'; // Realistic Cherry blossom pink
      } else {
        // Maple leaves (red/orange): small elegant size (16px to 28px total diameter)
        this.size = Math.random() * 6 + 8;
        this.speedY = Math.random() * 0.7 + 0.5;
        this.speedX = Math.random() * 0.9 - 0.2;
        this.rotationSpeed = Math.random() * 1.4 - 0.7;
        this.color = Math.random() < 0.65 ? '#E63946' : '#FB8B24';
      }
      
      this.rotation = Math.random() * 360;
      this.opacity = Math.random() * 0.45 + 0.35;
      this.state = 'falling';
      this.absoluteY = 0;
    }

    update() {
      if (this.state === 'falling') {
        this.y += this.speedY;
        // Natural flutter effect using sine wave oscillation
        this.x += this.speedX + Math.sin(this.y / 25 + this.rotationSpeed) * 0.5;
        this.rotation += this.rotationSpeed;

        // Check if it hits the bottom of the current viewport (floor)
        const floor = height - this.size - 4 - (Math.random() * 6);
        if (this.y >= floor) {
          this.y = floor;
          this.state = 'settled';
          this.settleTime = Date.now();
          this.settleDuration = Math.random() * 5000 + 4000; // Stay settled on the ground for 4-9 seconds
          this.fadeSpeed = 0.003 + Math.random() * 0.003; // Random decay rate
          
          // Capture absolute page Y coordinate so it scrolls naturally
          this.absoluteY = this.y + window.scrollY;
          
          // Tilt horizontally like a fallen leaf on the ground
          this.rotation = (Math.random() * 140) - 70;
          this.speedX = 0;
          this.speedY = 0;
          this.rotationSpeed = 0;
        }

        // Reset when falling out of bounds
        if (this.y > height + 20 || this.x < -30 || this.x > width + 30) {
          this.reset();
        }
      } else if (this.state === 'settled') {
        // Keep viewport Y in sync with scroll position so it stays on the ground
        this.y = this.absoluteY - window.scrollY;
        
        const age = Date.now() - this.settleTime;
        if (age > this.settleDuration) {
          // Dissolve phase
          this.opacity -= this.fadeSpeed;
          if (this.opacity <= 0) {
            this.reset();
          }
        }
        
        // Reset early if scrolled far off-screen to keep the particle pool active
        if (this.y < -50 || this.y > height + 50) {
          this.reset();
        }
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate((this.rotation * Math.PI) / 180);
      ctx.globalAlpha = this.opacity;
      
      if (isLeafImgLoaded) {
        // Slicing 4x4 grid cells from the 4096x4096px atlas
        const cols = 4;
        const col = this.cellIndex % cols;
        const row = Math.floor(this.cellIndex / cols);
        const cellSize = 4096 / 4; // 1024px per cell (amazing clarity)
        const sx = col * cellSize;
        const sy = row * cellSize;
        
        // Draw the cropped leaf asset from atlas
        ctx.drawImage(
          leafImg, 
          sx, sy, cellSize, cellSize, 
          -this.size, -this.size, 
          this.size * 2, this.size * 2
        );
      } else {
        // Elegant procedural fallback vector leaf
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(0, -this.size * 1.5);
        ctx.quadraticCurveTo(-this.size * 0.75, 0, 0, this.size * 1.5);
        ctx.quadraticCurveTo(this.size * 0.75, 0, 0, -this.size * 1.5);
        ctx.closePath();
        ctx.fill();
        
        // Leaf stem
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(0, this.size * 1.5);
        ctx.lineTo(0, this.size * 1.9);
        ctx.stroke();

        // Leaf detailed light veins
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.28)';
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(0, -this.size * 1.5);
        ctx.lineTo(0, this.size * 1.5);
        
        for (let k = -1; k <= 1; k += 0.6) {
          if (k === 0) continue;
          const veinY = this.size * k * 0.68;
          ctx.moveTo(0, veinY);
          ctx.quadraticCurveTo(-this.size * 0.25, veinY - this.size * 0.15, -this.size * 0.45, veinY - this.size * 0.3);
          ctx.moveTo(0, veinY);
          ctx.quadraticCurveTo(this.size * 0.25, veinY - this.size * 0.15, this.size * 0.45, veinY - this.size * 0.3);
        }
        ctx.stroke();
      }
      
      // Dynamic color/theme matched shadow glow to accent edges slightly
      ctx.shadowColor = this.isSakura ? '#E63946' : '#FB8B24';
      ctx.shadowBlur = 6;
      
      ctx.restore();
    }
  }

  // Create particles (leaves)
  const particleCount = Math.min(45, Math.floor(width / 35)); // High performance balanced pool size
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Leaf());
  }

  // Loop
  const animate = () => {
    ctx.clearRect(0, 0, width, height);
    
    // Ambient particles fade inside the white background 'About' section for maximum visual elegance
    const aboutSection = document.getElementById('about');
    
    let isOverWhiteBg = false;
    if (aboutSection) {
      const rect = aboutSection.getBoundingClientRect();
      if (rect.top <= height * 0.5 && rect.bottom >= height * 0.2) {
        isOverWhiteBg = true;
      }
    }

    particles.forEach(p => {
      p.update();
      if (isOverWhiteBg) {
        p.opacity = Math.max(0.06, p.opacity - 0.02); // Elegant fade-out in white section
      } else {
        p.opacity = Math.min(p.opacity + 0.01, 0.75);
      }
      p.draw();
    });

    requestAnimationFrame(animate);
  };

  animate();
}

/* ==========================================================================
   4. DARK LUXURY CONTACT FORM INTERACTION
   ========================================================================== */
function initLuxuryForm() {
  // Interest pills (multiple selection)
  const interestPills = document.querySelectorAll('.interest-pills .pill-btn');
  interestPills.forEach(pill => {
    pill.addEventListener('click', (e) => {
      e.preventDefault();
      pill.classList.toggle('active');
      
      // Enforce at least one active pill
      const activePills = document.querySelectorAll('.interest-pills .pill-btn.active');
      if (activePills.length === 0) {
        pill.classList.add('active');
      }
    });
  });

  // Budget/Tier pills (single selection)
  const tierPills = document.querySelectorAll('.tier-pills .pill-btn');
  tierPills.forEach(pill => {
    pill.addEventListener('click', (e) => {
      e.preventDefault();
      tierPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
    });
  });

  // Form submission overlay
  const form = document.getElementById('dojo-join-form');
  const successOverlay = document.getElementById('form-success-overlay');
  
  if (form && successOverlay) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = document.getElementById('dojo-submit-btn');
      if (submitBtn) {
        submitBtn.style.pointerEvents = 'none';
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>INITIATING...</span>';
        
        setTimeout(() => {
          successOverlay.classList.add('show');
          form.reset();
          submitBtn.style.pointerEvents = '';
          submitBtn.innerHTML = originalText;
        }, 1200);
      }
    });
  }
}

/* ==========================================================================
   5. CUSTOM LUXURY THEME CURSOR LOGIC
   ========================================================================== */
function initCustomCursor() {
  const dot = document.getElementById('custom-cursor-dot');
  const ring = document.getElementById('custom-cursor-ring');
  
  if (!dot || !ring) return;

  // Track target mouse coordinates
  let mouseX = 0;
  let mouseY = 0;
  
  // Track actual ring coordinates for lagging math
  let ringX = 0;
  let ringY = 0;
  
  // Track whether the pointer is active (on screen)
  let isMoving = false;
  let isFirstMove = true;

  // Mouse Move Event Listener
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Dot tracking (zero-latency, instant response)
    dot.style.left = `${mouseX}px`;
    dot.style.top = `${mouseY}px`;
    
    // On the very first mouse move, instantly snap ring to mouse to avoid initial fly-in
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

  // Hide cursor when leaving window bounds
  document.addEventListener('mouseleave', () => {
    dot.style.opacity = '0';
    ring.style.opacity = '0';
    isMoving = false;
  });

  document.addEventListener('mouseenter', () => {
    dot.style.opacity = '1';
    ring.style.opacity = '1';
  });

  // Linear Interpolation loop for the lagging ring
  const updateRing = () => {
    if (isMoving) {
      // Calculate delay ease
      const ease = 0.15;
      
      // Interpolate position
      ringX += (mouseX - ringX) * ease;
      ringY += (mouseY - ringY) * ease;
      
      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;
      
      // Calculate velocity for elastic stretch
      const dx = mouseX - ringX;
      const dy = mouseY - ringY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (ring.classList.contains('hovered')) {
        // In hover state, keep it circular and bloomed (no stretch)
        ring.style.transform = 'translate(-50%, -50%) scale(1)';
      } else {
        // Elastic stretch: scale horizontally along movement vector, squeeze vertically
        const maxStretch = 0.45;
        const stretch = 1 + Math.min(distance / 100, maxStretch);
        const squeeze = 1 - Math.min(distance / 200, 0.2);
        
        // Calculate movement angle
        const angle = Math.atan2(dy, dx);
        
        ring.style.transform = `translate(-50%, -50%) rotate(${angle}rad) scale(${stretch}, ${squeeze})`;
      }
    }
    
    requestAnimationFrame(updateRing);
  };
  
  // Start animation loop
  requestAnimationFrame(updateRing);

  // Hover states using event delegation for maximal performance and reliability
  const hoverSelector = 'a, button, input, select, textarea, .pill-btn, .exclusivity-card, .logo-link, .btn-luxury-pill, .feature-card, .social-link, .btn-dojo-submit, .inline-illustration-wrapper';

  document.addEventListener('mouseover', (e) => {
    const target = e.target.closest(hoverSelector);
    if (target) {
      dot.classList.add('hovered');
      ring.classList.add('hovered');
    }
  });

  document.addEventListener('mouseout', (e) => {
    const target = e.target.closest(hoverSelector);
    if (target) {
      dot.classList.remove('hovered');
      ring.classList.remove('hovered');
    }
  });

  // Handle active click states
  document.addEventListener('mousedown', () => {
    ring.style.transform = 'translate(-50%, -50%) scale(0.85)';
    ring.style.borderColor = 'rgba(230, 57, 70, 0.8)';
  });

  document.addEventListener('mouseup', () => {
    ring.style.transform = 'translate(-50%, -50%) scale(1)';
    ring.style.borderColor = '';
  });
}
