/**
 * THE DIVISION — INTERACTIVEFRONTEND LOGIC
 * Includes:
 * 1. Navbar Page-to-Page Navigation (Prev page: verdant.html)
 * 2. Elastic Lagging Custom Cursor (reused with custom Division orange theme)
 * 3. Atmospheric Ash, Smoke, and Fire Ember Particle Loop (HTML5 Canvas)
 * 4. Interactive HUD Feature Tabs (with content & photo shifting)
 * 5. Vertical Expansion Selectors Sidebar switching
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbarNavigators();
  initCustomCursor();
  initEmberParticles();
  initHudTabs();
  initExpansionSelector();
});

/* ==========================================================================
   1. NAVBAR PAGE-TO-PAGE NAVIGATOR
   ========================================================================== */
function initNavbarNavigators() {
  const prevBtn = document.getElementById('nav-prev');
  const nextBtn = document.getElementById('nav-next');
  
  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      // Navigate back to the second page (verdant.html)
      window.location.href = './verdant.html';
    });
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      // Navigate forward to the fourth page (agency.html)
      window.location.href = './agency.html';
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
  const hoverSelector = 'a, button, .selector-item, .btn-tab-gritty, .social-outlet-item, .carousel-control-btn, .mini-play-btn, .card-arrow-link';

  // Apply custom division orange themed classes when hovered
  document.addEventListener('mouseover', (e) => {
    const target = e.target.closest(hoverSelector);
    if (target) {
      dot.classList.add('hovered');
      ring.classList.add('hovered');
      // Apply orange accent styling on the cursor ring
      ring.style.backgroundColor = 'rgba(240, 130, 0, 0.08)';
      ring.style.borderColor = '#f08200';
      ring.style.boxShadow = '0 0 25px rgba(240, 130, 0, 0.5)';
    }
  });

  document.addEventListener('mouseout', (e) => {
    const target = e.target.closest(hoverSelector);
    if (target) {
      dot.classList.remove('hovered');
      ring.classList.remove('hovered');
      // Reset defaults
      ring.style.backgroundColor = '';
      ring.style.borderColor = '';
      ring.style.boxShadow = '';
    }
  });

  // Handle active click states
  document.addEventListener('mousedown', () => {
    ring.style.transform = 'translate(-50%, -50%) scale(0.85)';
    ring.style.borderColor = '#f08200';
  });

  document.addEventListener('mouseup', () => {
    ring.style.transform = 'translate(-50%, -50%) scale(1)';
    ring.style.borderColor = '';
  });
}

/* ==========================================================================
   3. ATMOSPHERIC ASH & FIRE EMBER PARTICLES LOOP
   ========================================================================== */
function initEmberParticles() {
  const canvas = document.getElementById('ember-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let animationFrameId;
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  const particles = [];
  const maxParticles = 65; // High density but optimized

  class Ember {
    constructor() {
      this.reset(true);
    }

    reset(init = false) {
      // Position particles at the bottom or randomly throughout canvas at init
      this.x = Math.random() * width;
      this.y = init ? Math.random() * height : height + 20;
      
      // Drifting speeds (mainly float upwards and slightly left due to NYC wind)
      this.vx = (Math.random() * 1.2 - 0.9) - 0.3; 
      this.vy = -(Math.random() * 1.5 + 0.6); // float upward
      
      // Dynamic sizes (embers can be fine ash or larger embers)
      this.size = Math.random() * 3.5 + 0.8;
      
      // Random alpha levels
      this.alpha = Math.random() * 0.5 + 0.2;
      this.decay = Math.random() * 0.003 + 0.001; // Fade speed
      
      // Glowing colors tailored to tactical fire and ash: bright orange, gold, dim red
      const colors = [
        'rgba(240, 130, 0, ', // Division Orange
        'rgba(255, 90, 0, ',  // Fire Red-Orange
        'rgba(240, 190, 0, ', // Gold Spark
        'rgba(180, 70, 20, '  // Dark Burnt Ash
      ];
      this.baseColor = colors[Math.floor(Math.random() * colors.length)];
      
      // Sine wave properties for horizontal waving/swaying
      this.waveOffset = Math.random() * Math.PI * 2;
      this.waveSpeed = Math.random() * 0.02 + 0.005;
      this.waveAmplitude = Math.random() * 1.2 + 0.3;
    }

    update() {
      // Apply positions
      this.y += this.vy;
      
      // Apply waving effect to x
      this.waveOffset += this.waveSpeed;
      this.x += this.vx + Math.sin(this.waveOffset) * this.waveAmplitude;

      // Fade out as it climbs
      this.alpha -= this.decay;

      // Reset when particle goes off-screen or fades out completely
      if (this.y < -20 || this.x < -20 || this.x > width + 20 || this.alpha <= 0) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.beginPath();
      
      // Create radial glow for premium aesthetic
      const gradient = ctx.createRadialGradient(
        this.x, this.y, 0,
        this.x, this.y, this.size * 2
      );
      gradient.addColorStop(0, `${this.baseColor}${this.alpha})`);
      gradient.addColorStop(0.3, `${this.baseColor}${this.alpha * 0.7})`);
      gradient.addColorStop(1, `${this.baseColor}0)`);
      
      ctx.fillStyle = gradient;
      ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  // Initialize embers array
  for (let i = 0; i < maxParticles; i++) {
    particles.push(new Ember());
  }

  // Animation Loop
  function render() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }

    animationFrameId = requestAnimationFrame(render);
  }

  render();

  // Resize listener with performance throttling
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }, 150);
  });
}

/* ==========================================================================
   4. INTERACTIVE HUD KEY FEATURES TABS
   ========================================================================== */
function initHudTabs() {
  const tabs = document.querySelectorAll('.btn-tab-gritty');
  const explanation = document.querySelector('.tab-explanation-text');
  const carouselImg = document.querySelector('.pve-taxi-image');
  const carouselTag = document.querySelector('.carousel-tag-overlay');

  if (!tabs || !explanation || !carouselImg) return;

  // Themed Content Database to change when tabs switch
  const tabData = {
    darkzone: {
      text: "Resistance is the second update released for Year 2 of Tom Clancy's The Division and is the biggest free update to date. Resistance area includes a completely new zone of the map.",
      image: "./assets/division_taxi.png",
      tag: "PVE MISSION"
    },
    jungle: {
      text: "The urban jungle of post-epidemic Manhattan holds deadly secrets. Explore the silent, snow-covered streets, scavenge for critical tactical supplies, and confront rogue street factions.",
      image: "./assets/division_hero.png",
      tag: "URBAN EXPLORATION"
    },
    breathing: {
      text: "A dynamically shifting ecosystem that responds to your actions. Experience changing blizzards, dense tactical fog, and day-night cycles that dramatically impact combat visibility and enemy behavior.",
      image: "./assets/division_taxi.png",
      tag: "BREATHING NYC"
    }
  };

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active from all tabs
      tabs.forEach(t => t.classList.remove('active'));
      
      // Add active to current
      tab.classList.add('active');

      const targetDataKey = tab.getAttribute('data-tab');
      const data = tabData[targetDataKey];

      if (data) {
        // Quick Fade-out and slide transition for premium feel
        explanation.style.opacity = '0';
        explanation.style.transform = 'translateY(5px)';
        carouselImg.style.opacity = '0.3';
        carouselImg.style.transform = 'scale(0.98)';

        setTimeout(() => {
          // Change content
          explanation.textContent = data.text;
          carouselImg.src = data.image;
          if (carouselTag) {
            carouselTag.textContent = data.tag;
          }

          // Fade back in
          explanation.style.opacity = '1';
          explanation.style.transform = 'translateY(0)';
          carouselImg.style.opacity = '1';
          carouselImg.style.transform = 'scale(1.02)';
        }, 300);
      }
    });
  });

  // Wire carousel control buttons to cycle tabs
  const leftCtrl = document.querySelector('.carousel-control-btn.left-control');
  const rightCtrl = document.querySelector('.carousel-control-btn.right-control');

  if (leftCtrl && rightCtrl) {
    const tabKeys = ['darkzone', 'jungle', 'breathing'];
    
    const rotateTab = (direction) => {
      const activeTab = document.querySelector('.btn-tab-gritty.active');
      if (!activeTab) return;

      const currentKey = activeTab.getAttribute('data-tab');
      let currentIndex = tabKeys.indexOf(currentKey);

      if (direction === 'next') {
        currentIndex = (currentIndex + 1) % tabKeys.length;
      } else {
        currentIndex = (currentIndex - 1 + tabKeys.length) % tabKeys.length;
      }

      const nextTabButton = document.querySelector(`.btn-tab-gritty[data-tab="${tabKeys[currentIndex]}"]`);
      if (nextTabButton) nextTabButton.click();
    };

    leftCtrl.addEventListener('click', () => rotateTab('prev'));
    rightCtrl.addEventListener('click', () => rotateTab('next'));
  }
}

/* ==========================================================================
   5. VERTICAL EXPANSION SELECTORS SIDEBAR
   ========================================================================== */
function initExpansionSelector() {
  const items = document.querySelectorAll('.selector-item');
  const upArrow = document.querySelector('.arrow-up-gritty');
  const downArrow = document.querySelector('.arrow-down-gritty');
  const soldierImg = document.querySelector('.soldier-img-bg');

  if (!items.length) return;

  const updateActiveIndex = (newIndex) => {
    items.forEach(i => i.classList.remove('active'));
    items[newIndex].classList.add('active');

    // Subtly alter backgrounds for premium variety when expansion changes
    if (soldierImg) {
      soldierImg.style.opacity = '0.4';
      setTimeout(() => {
        if (newIndex === 0) {
          soldierImg.style.backgroundPosition = 'center center';
          soldierImg.style.filter = 'contrast(1.2) brightness(0.55) hue-rotate(15deg)';
        } else if (newIndex === 1) {
          soldierImg.style.backgroundPosition = 'left 20% center';
          soldierImg.style.filter = 'contrast(1) brightness(0.65) hue-rotate(-15deg)';
        } else {
          soldierImg.style.backgroundPosition = 'right center';
          soldierImg.style.filter = 'contrast(1.1) brightness(0.65)';
        }
        soldierImg.style.opacity = '1';
      }, 250);
    }
  };

  items.forEach((item, index) => {
    item.addEventListener('click', () => {
      updateActiveIndex(index);
    });
  });

  if (upArrow && downArrow) {
    const rotateSelector = (direction) => {
      let activeIndex = -1;
      items.forEach((item, idx) => {
        if (item.classList.contains('active')) activeIndex = idx;
      });

      if (activeIndex === -1) return;

      if (direction === 'up') {
        activeIndex = (activeIndex - 1 + items.length) % items.length;
      } else {
        activeIndex = (activeIndex + 1) % items.length;
      }

      updateActiveIndex(activeIndex);
    };

    upArrow.addEventListener('click', () => rotateSelector('up'));
    downArrow.addEventListener('click', () => rotateSelector('down'));
  }
}
