/* ==========================================================================
   NUORBIT CYBER-TEAL SCI-FI ENGINE & INTERACTIVITY
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================================================
  // 1. Navigation Flow Control
  // ==========================================================================
  const prevBtn = document.getElementById('nav-prev');
  const nextBtn = document.getElementById('nav-next');

  // Fade in body cleanly
  document.body.style.opacity = '1';

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      document.body.style.opacity = '0';
      setTimeout(() => {
        window.location.href = './muli.html';
      }, 400);
    });
  }

  // Next navigation button goes to Page 11 (Arcane)
  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      document.body.style.opacity = '0';
      setTimeout(() => {
        window.location.href = './arcane.html';
      }, 400);
    });
  }


  // ==========================================================================
  // 2. Custom Neon Cyan Cursor Follower
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
    const ease = 0.15; // Smooth interpolation physics
    ringX += (mouseX - ringX) * ease;
    ringY += (mouseY - ringY) * ease;

    if (cursorRing) {
      cursorRing.style.left = `${ringX}px`;
      cursorRing.style.top = `${ringY}px`;
    }
    requestAnimationFrame(animateCursorRing);
  }
  animateCursorRing();

  // Add cursor hovering effects to premium interactive elements
  const hoverables = document.querySelectorAll(
    'a, button, .capsule-link, .btn-nav, .btn-join-capsule, .btn-nuo-pill, .hud-play-btn, .social-link'
  );

  hoverables.forEach(el => {
    el.addEventListener('mouseenter', () => {
      document.body.classList.add('nuo-cursor-hovering');
    });
    el.addEventListener('mouseleave', () => {
      document.body.classList.remove('nuo-cursor-hovering');
    });
  });


  // ==========================================================================
  // 3. Cosmic Sparks Background Canvas (Cyan/Teal/White sparks)
  // ==========================================================================
  const canvas = document.getElementById('nuo-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    const maxParticles = 120;
    
    // Curated cosmic-teal palette
    const colors = [
      '#00f2ff', // Neon Cyan
      '#00d2df', // Medium Cyan
      '#008fa3', // Dark Cinematic Teal
      '#ffffff', // Star White
      '#e6faff'  // Subtle Tinted White
    ];

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class SparkParticle {
      constructor(x, y, isBurst = false) {
        this.x = x !== undefined ? x : Math.random() * canvas.width;
        this.y = y !== undefined ? y : (canvas.height + Math.random() * 50);
        
        if (isBurst) {
          // Radiating particle vectors for button explosions
          const angle = Math.random() * Math.PI * 2;
          const speed = 1.5 + Math.random() * 4.5;
          this.vx = Math.cos(angle) * speed;
          this.vy = Math.sin(angle) * speed;
        } else {
          // Slow upward celestial drifting
          this.vx = (Math.random() - 0.5) * 0.8;
          this.vy = -0.4 - Math.random() * 1.2;
        }
        
        this.baseSize = 0.5 + Math.random() * 1.5;
        this.size = this.baseSize;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        
        this.alpha = 0.1 + Math.random() * 0.8;
        this.decay = 0.003 + Math.random() * 0.008;
      }

      update() {
        // Magnetic attraction system towards custom cursor dot
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 180) {
          const force = (180 - dist) / 180;
          this.vx += (dx / dist) * force * 0.12;
          this.vy += (dy / dist) * force * 0.12;
        }

        // Apply visual damping friction
        this.vx *= 0.96;
        this.vy *= 0.96;

        // Apply a gentle upward force
        this.vy -= 0.02;

        this.x += this.vx;
        this.y += this.vy;
        
        // Decay alpha over time
        this.alpha -= this.decay;
        
        // Glowing star twinkle sizing
        this.size = this.baseSize * (0.8 + Math.sin(Date.now() * 0.005) * 0.2);
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = Math.max(0, this.alpha);
        
        if (this.color !== '#ffffff') {
          ctx.shadowBlur = 8;
          ctx.shadowColor = this.color;
        }
        
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    // Populate initial background particles
    for (let i = 0; i < 40; i++) {
      particles.push(new SparkParticle(Math.random() * canvas.width, Math.random() * canvas.height));
    }

    function createBurst(x, y, count = 30) {
      for (let i = 0; i < count; i++) {
        particles.push(new SparkParticle(x, y, true));
      }
    }

    function renderSparks() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        p.draw();
        
        // Clean up out of boundary or fully transparent particles
        if (p.alpha <= 0 || p.x < 0 || p.x > canvas.width || p.y < -50 || p.y > canvas.height + 100) {
          particles.splice(i, 1);
        }
      }

      // Spontaneous background generator
      if (particles.length < maxParticles && Math.random() < 0.15) {
        particles.push(new SparkParticle());
      }

      requestAnimationFrame(renderSparks);
    }
    renderSparks();

    // Let's Orbit Button Click Sparks Explosion Trigger
    const orbitBtn = document.getElementById('btn-lets-orbit');
    if (orbitBtn) {
      orbitBtn.addEventListener('click', () => {
        createBurst(mouseX, mouseY, 45);
        
        // Flashes the portal ring with deep neon cyan aura intensity
        const portal = document.querySelector('.portal-ring');
        if (portal) {
          portal.style.transform = 'scale(1.08)';
          portal.style.boxShadow = '0 0 65px rgba(0, 242, 255, 0.95), inset 0 0 45px rgba(0, 242, 255, 0.75)';
          setTimeout(() => {
            portal.style.transform = '';
            portal.style.boxShadow = '';
          }, 300);
        }
      });
    }

    // Centered portal ring click sparks burst interaction
    const portalScene = document.querySelector('.portal-scene-wrapper');
    if (portalScene) {
      portalScene.addEventListener('click', () => {
        const rect = portalScene.getBoundingClientRect();
        const px = rect.left + rect.width / 2;
        const py = rect.top + rect.height / 2;
        createBurst(px, py, 25);
      });
    }
  }


  // ==========================================================================
  // 4. High-Performance Looping Typewriter (No Layout Shifts)
  // ==========================================================================
  class HighPerformanceTypewriter {
    constructor(elementId, phrases, typeSpeed = 50, deleteSpeed = 25, delayBetween = 2500) {
      this.element = document.getElementById(elementId);
      this.phrases = phrases;
      this.typeSpeed = typeSpeed;
      this.deleteSpeed = deleteSpeed;
      this.delayBetween = delayBetween;
      this.phraseIndex = 0;
      this.charIndex = 0;
      this.isDeleting = false;
      
      if (this.element) {
        this.run();
      }
    }

    run() {
      const currentPhrase = this.phrases[this.phraseIndex];

      if (this.isDeleting) {
        this.element.textContent = currentPhrase.substring(0, this.charIndex - 1);
        this.charIndex--;
      } else {
        this.element.textContent = currentPhrase.substring(0, this.charIndex + 1);
        this.charIndex++;
      }

      let timeout = this.isDeleting ? this.deleteSpeed : this.typeSpeed;

      if (!this.isDeleting && this.charIndex === currentPhrase.length) {
        timeout = this.delayBetween;
        this.isDeleting = true;
      } else if (this.isDeleting && this.charIndex === 0) {
        this.isDeleting = false;
        this.phraseIndex = (this.phraseIndex + 1) % this.phrases.length;
        timeout = 500;
      }

      setTimeout(() => this.run(), timeout);
    }
  }

  const taglines = [
    "Explore the digital stardust portal.",
    "Assemble your decentralized NFT gallery.",
    "Discover rare generative dimensions."
  ];
  new HighPerformanceTypewriter("nuo-typing-subtitle", taglines, 50, 25, 2500);


  // ==========================================================================
  // 5. Video Modal Controller & Live Stream Ticker Loading
  // ==========================================================================
  const playVideoBtn = document.getElementById('btn-play-video');
  const videoModal = document.getElementById('video-modal');
  const closeVideoBtn = document.getElementById('btn-close-video');

  if (playVideoBtn && videoModal) {
    playVideoBtn.addEventListener('click', () => {
      videoModal.classList.add('active');
      simulateTelemetryCalibration();
    });

    closeVideoBtn.addEventListener('click', () => {
      videoModal.classList.remove('active');
    });

    // Close modal upon backplate backdrop clicking
    videoModal.addEventListener('click', (e) => {
      if (e.target === videoModal) {
        videoModal.classList.remove('active');
      }
    });
  }

  // Interactive sci-fi connection telemetry progress bar
  function simulateTelemetryCalibration() {
    const descElement = document.querySelector('.video-modal-desc');
    if (!descElement) return;

    descElement.textContent = "Calibrating decentralised streaming networks. Telemetry secured successfully.";
    
    let progress = 0;
    const interval = setInterval(() => {
      if (!videoModal.classList.contains('active')) {
        clearInterval(interval);
        return;
      }
      
      progress += Math.floor(Math.random() * 15) + 6;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        descElement.innerHTML = `<span style="color:#00f2ff">★ HIGH-FIDELITY LIVE LINK ESTABLISHED</span><br>Cyberstream fully synced at 240FPS. Render sequence operational.`;
      } else {
        descElement.textContent = `SYNCING CYBERSTREAM CORRIDORS: ${progress}%... SECURITIES VERIFIED`;
      }
    }, 150);
  }


  // ==========================================================================
  // 6. Join Us Interaction Custom Micro Toast
  // ==========================================================================
  const joinBtn = document.getElementById('btn-join-us');
  if (joinBtn) {
    joinBtn.addEventListener('click', (e) => {
      e.preventDefault();
      
      joinBtn.style.transform = 'scale(0.95)';
      setTimeout(() => {
        joinBtn.style.transform = '';
      }, 100);

      createCyberToast("ACCESS NODE GRANTED // Welcome to the NUORBIT space corps.");
    });
  }

  function createCyberToast(message) {
    let existingToast = document.querySelector('.cyber-toast');
    if (existingToast) {
      existingToast.remove();
    }

    const toast = document.createElement('div');
    toast.className = 'cyber-toast font-mono';
    toast.style.position = 'fixed';
    toast.style.bottom = '100px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%) translateY(20px)';
    toast.style.background = 'rgba(1, 10, 14, 0.9)';
    toast.style.border = '1px solid var(--nuo-cyan)';
    toast.style.color = '#fff';
    toast.style.padding = '12px 24px';
    toast.style.borderRadius = '50px';
    toast.style.fontSize = '0.75rem';
    toast.style.letterSpacing = '0.05em';
    toast.style.zIndex = '99999';
    toast.style.boxShadow = '0 10px 30px rgba(0, 242, 255, 0.2)';
    toast.style.backdropFilter = 'blur(10px)';
    toast.style.opacity = '0';
    toast.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
    toast.textContent = message;

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateX(-50%) translateY(0)';
    }, 50);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(-20px)';
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, 3500);
  }
});
