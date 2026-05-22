/* ==========================================================================
   ARCANE GAMING ENGINE & INTERACTIVE PARTICLE PHYSICS (PAGE 11)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================================================
  // 1. Navigation Flow Control
  // ==========================================================================
  const prevBtn = document.getElementById('nav-prev');
  const nextBtn = document.getElementById('nav-next');

  // Fade in body cleanly on load
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 50);

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      document.body.style.opacity = '0';
      setTimeout(() => {
        window.location.href = './nuorbit.html';
      }, 400);
    });
  }

  // Next is locked on this final page
  if (nextBtn) {
    nextBtn.classList.add('disabled');
    nextBtn.setAttribute('disabled', 'true');
  }


  // ==========================================================================
  // 2. Custom Neon Green Cursor Follower
  // ==========================================================================
  const cursorDot = document.getElementById('custom-cursor-dot');
  const cursorRing = document.getElementById('custom-cursor-ring');

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (cursorDot) {
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    }
  });

  function animateCursorRing() {
    const ease = 0.16; // Elastic follow physics
    ringX += (mouseX - ringX) * ease;
    ringY += (mouseY - ringY) * ease;

    if (cursorRing) {
      cursorRing.style.left = `${ringX}px`;
      cursorRing.style.top = `${ringY}px`;
    }
    requestAnimationFrame(animateCursorRing);
  }
  animateCursorRing();

  // Attach hover styles to premium links & active components
  const hoverables = document.querySelectorAll(
    'a, button, .social-link, .btn-nav, .btn-contact-capsule, .btn-discover'
  );

  hoverables.forEach(el => {
    el.addEventListener('mouseenter', () => {
      document.body.classList.add('arcane-cursor-hovering');
    });
    el.addEventListener('mouseleave', () => {
      document.body.classList.remove('arcane-cursor-hovering');
    });
  });


  // ==========================================================================
  // 3. Ambient Dark Green Spark/Smoke Background Canvas
  // ==========================================================================
  const canvas = document.getElementById('arcane-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    const maxParticles = 90;
    
    // Curated high-impact green ember palette
    const colors = [
      '#84dc00', // Neon Lime
      '#6bb300', // Mid Olive Green
      '#adff2f', // Bright Yellow Green
      '#ffffff', // Core White Spark
      '#204000'  // Dark shadow green
    ];

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class EmberParticle {
      constructor(x, y, isBurst = false) {
        this.x = x !== undefined ? x : Math.random() * canvas.width;
        this.y = y !== undefined ? y : (canvas.height + Math.random() * 40);
        
        if (isBurst) {
          // Radiating particle vectors for explosion clicks
          const angle = Math.random() * Math.PI * 2;
          const speed = 2 + Math.random() * 5;
          this.vx = Math.cos(angle) * speed;
          this.vy = Math.sin(angle) * speed;
        } else {
          // Slow vertical drift simulating embers rising
          this.vx = (Math.random() - 0.5) * 0.7;
          this.vy = -0.3 - Math.random() * 1.0;
        }
        
        this.baseSize = 0.5 + Math.random() * 1.8;
        this.size = this.baseSize;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        
        this.alpha = 0.15 + Math.random() * 0.75;
        this.decay = 0.003 + Math.random() * 0.007;
      }

      update() {
        // Cursor magnet gravitational pull
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 160) {
          const force = (160 - dist) / 160;
          this.vx += (dx / dist) * force * 0.14;
          this.vy += (dy / dist) * force * 0.14;
        }

        // Apply friction drag
        this.vx *= 0.97;
        this.vy *= 0.97;

        // Upward thermal force
        this.vy -= 0.015;

        this.x += this.vx;
        this.y += this.vy;
        
        // Decay alpha over time
        this.alpha -= this.decay;
        
        // Twinkling organic pulse
        this.size = this.baseSize * (0.85 + Math.sin(Date.now() * 0.006) * 0.15);
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = Math.max(0, this.alpha);
        
        if (this.color !== '#ffffff') {
          ctx.shadowBlur = 6;
          ctx.shadowColor = this.color;
        }
        
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    // Spawn background particles
    for (let i = 0; i < 35; i++) {
      particles.push(new EmberParticle(Math.random() * canvas.width, Math.random() * canvas.height));
    }

    function createClickBurst(x, y, count = 25) {
      for (let i = 0; i < count; i++) {
        particles.push(new EmberParticle(x, y, true));
      }
    }

    function renderEmbers() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        p.draw();
        
        // Remove dead/offscreen particles
        if (p.alpha <= 0 || p.x < 0 || p.x > canvas.width || p.y < -50 || p.y > canvas.height + 100) {
          particles.splice(i, 1);
        }
      }

      // Spontaneous background spawn
      if (particles.length < maxParticles && Math.random() < 0.12) {
        particles.push(new EmberParticle());
      }

      requestAnimationFrame(renderEmbers);
    }
    renderEmbers();

    // Trigger spark explosions on Discover Button Click
    const discoverBtn = document.getElementById('btn-discover');
    if (discoverBtn) {
      discoverBtn.addEventListener('click', () => {
        createClickBurst(mouseX, mouseY, 40);
        
        // Dynamic graphic glow shake effect
        const graffiti = document.querySelector('.graffiti-svg');
        if (graffiti) {
          graffiti.style.transform = 'scale(1.05)';
          graffiti.style.filter = 'drop-shadow(0 0 25px rgba(132, 220, 0, 0.8))';
          setTimeout(() => {
            graffiti.style.transform = '';
            graffiti.style.filter = '';
          }, 300);
        }
      });
    }

    // Trigger splash explosions on clicking Jinx character portrait
    const characterContainer = document.querySelector('.character-container');
    if (characterContainer) {
      characterContainer.style.pointerEvents = 'auto'; // Enable mouse clicks on character boundary
      characterContainer.addEventListener('click', () => {
        createClickBurst(mouseX, mouseY, 30);
      });
    }
  }

});
