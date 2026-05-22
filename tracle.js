/* ==========================================================================
   TRACLE INTERACTION ENGINE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Navigation Sync
  const prevBtn = document.getElementById('nav-prev');
  const nextBtn = document.getElementById('nav-next');

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      document.body.style.opacity = '0';
      setTimeout(() => {
        window.location.href = './raze.html';
      }, 400);
    });
  }

  if (nextBtn) {
    nextBtn.classList.remove('disabled');
    nextBtn.removeAttribute('disabled');
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      document.body.style.opacity = '0';
      setTimeout(() => {
        window.location.href = './muli.html';
      }, 400);
    });
  }

  // 2. Custom Cursor Follower
  const cursorDot = document.getElementById('custom-cursor-dot');
  const cursorRing = document.getElementById('custom-cursor-ring');

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let cursorX = mouseX;
  let cursorY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Direct positioning for the core dot
    if (cursorDot) {
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    }
  });

  // Eased loop for the outer cursor ring
  function updateCursorRing() {
    const easing = 0.12;
    cursorX += (mouseX - cursorX) * easing;
    cursorY += (mouseY - cursorY) * easing;

    if (cursorRing) {
      cursorRing.style.left = `${cursorX}px`;
      cursorRing.style.top = `${cursorY}px`;
    }
    requestAnimationFrame(updateCursorRing);
  }
  updateCursorRing();

  // Highlight cursor on hoverable elements
  const hoverables = document.querySelectorAll('a, button, input, select, textarea, .asset-selector-pill, .device-pill, .task-item, .side-link');
  hoverables.forEach(el => {
    el.addEventListener('mouseenter', () => {
      document.body.classList.add('custom-cursor-hovering');
    });
    el.addEventListener('mouseleave', () => {
      document.body.classList.remove('custom-cursor-hovering');
    });
  });


  // 3. Matrix Decryption Scrambler Effect Engine
  const scrambleChars = '!@#$%^&*()_+{}|:"<>?-=[]\\;\',./ABCDEFGHJKLMNPQRSTUVWXYZ0123456789';

  function scrambleText(element, duration = 1200) {
    const originalText = element.getAttribute('data-text') || element.textContent.trim();
    element.setAttribute('data-text', originalText);
    
    let startTimestamp = null;
    
    function animate(timestamp) {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = timestamp - startTimestamp;
      const percentage = Math.min(progress / duration, 1);
      
      let currentResult = '';
      for (let i = 0; i < originalText.length; i++) {
        if (originalText[i] === ' ') {
          currentResult += ' ';
          continue;
        }
        
        // If resolved based on duration percentage
        const charProgress = i / originalText.length;
        if (percentage > charProgress) {
          currentResult += originalText[i];
        } else {
          // Scrambled random characters
          const randomIndex = Math.floor(Math.random() * scrambleChars.length);
          currentResult += scrambleChars[randomIndex];
        }
      }
      
      element.textContent = currentResult;
      
      if (percentage < 1) {
        requestAnimationFrame(animate);
      }
    }
    
    requestAnimationFrame(animate);
  }

  // Auto initialize on all scramble tags
  const scrambleElements = document.querySelectorAll('.scramble-decrypt');
  scrambleElements.forEach(el => {
    scrambleText(el, 1500);
    
    // Scramble again on mouse enter for a premium feedback feel
    el.addEventListener('mouseenter', () => {
      // Prevent rapid queue overlap
      if (!el.dataset.scrambling) {
        el.dataset.scrambling = 'true';
        scrambleText(el, 1000);
        setTimeout(() => {
          delete el.dataset.scrambling;
        }, 1100);
      }
    });
  });

  // Infinite looping text scrambler every 14 seconds to satisfy loop requirement
  setInterval(() => {
    scrambleElements.forEach(el => {
      if (!el.dataset.scrambling) {
        scrambleText(el, 1500);
      }
    });
  }, 14000);


  // 4. HTML5 Background Cosmic Sparks Canvas
  const bgCanvas = document.getElementById('tracle-canvas');
  if (bgCanvas) {
    const ctx = bgCanvas.getContext('2d');
    let particles = [];
    
    function resizeBg() {
      bgCanvas.width = window.innerWidth;
      bgCanvas.height = window.innerHeight;
    }
    resizeBg();
    window.addEventListener('resize', resizeBg);

    class Spark {
      constructor() {
        this.reset();
        // Distribute y initially
        this.y = Math.random() * bgCanvas.height;
      }

      reset() {
        this.x = Math.random() * bgCanvas.width;
        this.y = bgCanvas.height + Math.random() * 20;
        this.size = Math.random() * 1.5 + 0.5;
        this.speedY = -(Math.random() * 0.4 + 0.1);
        this.speedX = (Math.random() - 0.5) * 0.15;
        this.life = Math.random() * 100 + 100;
        this.maxLife = this.life;
        this.opacity = Math.random() * 0.5 + 0.1;
      }

      update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.life--;
        
        // Floating attraction to mouse coordinates
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 200) {
          const force = (200 - dist) / 2000;
          this.x += dx * force;
        }

        if (this.life <= 0 || this.y < -10) {
          this.reset();
        }
      }

      draw() {
        const ratio = this.life / this.maxLife;
        const currentOpacity = this.opacity * Math.sin(ratio * Math.PI);
        ctx.fillStyle = `rgba(139, 92, 246, ${currentOpacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Populate particles
    const particleCount = Math.min(Math.floor(window.innerWidth / 15), 80);
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Spark());
    }

    function animateBg() {
      ctx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animateBg);
    }
    animateBg();
  }


  // 5. Interactive Dashboard Canvas Waves Chart
  const chartCanvas = document.getElementById('dashboard-chart-canvas');
  const chartWrapper = document.querySelector('.chart-canvas-wrapper');
  const chartCursor = document.getElementById('chart-cursor-line');
  const chartTooltip = document.getElementById('chart-tooltip');

  if (chartCanvas && chartWrapper) {
    const ctx = chartCanvas.getContext('2d');
    
    // Retina Sharpness Adjuster
    function resizeChartCanvas() {
      const rect = chartWrapper.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      chartCanvas.width = rect.width * dpr;
      chartCanvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      
      chartCanvas.style.width = `${rect.width}px`;
      chartCanvas.style.height = `${rect.height}px`;
    }
    
    resizeChartCanvas();
    window.addEventListener('resize', resizeChartCanvas);

    // Wave config equations
    let animationProgress = 0;
    const wavePointsCount = 80;

    // Mathematical wave offsets
    function getWaveY(xPercent, animOffset = 0) {
      const height = chartCanvas.clientHeight || 180;
      const width = chartCanvas.clientWidth || 600;
      
      const baseHeight = height * 0.6;
      // Beautiful complex wave composition
      const w1 = Math.sin(xPercent * Math.PI * 1.5 - animOffset + 0.5) * (height * 0.12);
      const w2 = Math.cos(xPercent * Math.PI * 3.5 + animOffset * 0.5) * (height * 0.06);
      const w3 = Math.sin(xPercent * Math.PI * 5.0 - animOffset * 0.2) * (height * 0.02);
      
      return baseHeight + w1 + w2 + w3;
    }

    function getSecondaryWaveY(xPercent, animOffset = 0) {
      const height = chartCanvas.clientHeight || 180;
      
      const baseHeight = height * 0.65;
      const w1 = Math.sin(xPercent * Math.PI * 2.0 + animOffset) * (height * 0.15);
      const w2 = Math.cos(xPercent * Math.PI * 4.0 - animOffset * 0.7) * (height * 0.04);
      
      return baseHeight + w1 + w2;
    }

    // Chart Renderer Loop
    let timeOffset = 0;
    function renderChart() {
      if (!chartCanvas) return;
      
      const width = chartCanvas.clientWidth;
      const height = chartCanvas.clientHeight;
      ctx.clearRect(0, 0, width, height);

      timeOffset += 0.012;
      
      // Animate up from bottom on load
      if (animationProgress < 1) {
        animationProgress += 0.025;
      }

      // Draw dashed dashboard gridlines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.025)';
      ctx.setLineDash([4, 4]);
      ctx.lineWidth = 1;
      
      const horizontalGridRows = 4;
      for (let i = 1; i < horizontalGridRows; i++) {
        const gridY = (height / horizontalGridRows) * i;
        ctx.beginPath();
        ctx.moveTo(0, gridY);
        ctx.lineTo(width, gridY);
        ctx.stroke();
      }
      ctx.setLineDash([]); // Reset dash state

      // 1. Draw Secondary Violet Wave (Thinner, Dotted)
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.2)';
      ctx.setLineDash([2, 3]);
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      
      for (let i = 0; i <= wavePointsCount; i++) {
        const xPercent = i / wavePointsCount;
        const x = xPercent * width;
        const yRaw = getSecondaryWaveY(xPercent, timeOffset);
        const y = height - ((height - yRaw) * animationProgress);
        
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
      ctx.setLineDash([]); // Reset

      // 2. Draw Primary Glowing Purple Wave
      ctx.strokeStyle = 'rgba(139, 92, 246, 0.8)';
      ctx.lineWidth = 3.0;
      
      // Create Glow Shadow Effect on path
      ctx.shadowColor = 'rgba(139, 92, 246, 0.4)';
      ctx.shadowBlur = 12;
      ctx.beginPath();
      
      for (let i = 0; i <= wavePointsCount; i++) {
        const xPercent = i / wavePointsCount;
        const x = xPercent * width;
        const yRaw = getWaveY(xPercent, timeOffset);
        const y = height - ((height - yRaw) * animationProgress);
        
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
      ctx.shadowBlur = 0; // Disable shadow for fill

      // 3. Draw Beautiful Gradient fill underneath primary wave
      const fillGradient = ctx.createLinearGradient(0, 0, 0, height);
      fillGradient.addColorStop(0, 'rgba(139, 92, 246, 0.15)');
      fillGradient.addColorStop(0.5, 'rgba(139, 92, 246, 0.05)');
      fillGradient.addColorStop(1, 'rgba(139, 92, 246, 0.0)');
      
      ctx.fillStyle = fillGradient;
      ctx.beginPath();
      ctx.moveTo(0, height);
      
      for (let i = 0; i <= wavePointsCount; i++) {
        const xPercent = i / wavePointsCount;
        const x = xPercent * width;
        const yRaw = getWaveY(xPercent, timeOffset);
        const y = height - ((height - yRaw) * animationProgress);
        ctx.lineTo(x, y);
      }
      
      ctx.lineTo(width, height);
      ctx.closePath();
      ctx.fill();

      requestAnimationFrame(renderChart);
    }
    renderChart();

    // Mouse Move coordinates hover capture inside Chart
    chartWrapper.addEventListener('mousemove', (e) => {
      const rect = chartWrapper.getBoundingClientRect();
      const localX = e.clientX - rect.left;
      const xPercent = localX / rect.width;
      
      // Align cursor vertical line
      if (chartCursor) {
        chartCursor.style.opacity = '1';
        chartCursor.style.left = `${localX}px`;
      }

      // Track height of main wave at coordinates
      const waveY = getWaveY(xPercent, timeOffset);
      
      // Display and position tooltip coordinates bubble
      if (chartTooltip) {
        chartTooltip.style.opacity = '1';
        chartTooltip.style.left = `${localX + 15}px`;
        chartTooltip.style.top = `${waveY - 50}px`;

        // Mathematical dynamic value generation
        const valSeed = 28.5 + (1 - (waveY / rect.height)) * 40;
        const valFormatted = `$${valSeed.toFixed(1)}K`;
        
        const tooltipValEl = chartTooltip.querySelector('.tooltip-val');
        if (tooltipValEl) {
          tooltipValEl.textContent = valFormatted;
        }
      }
    });

    chartWrapper.addEventListener('mouseleave', () => {
      if (chartCursor) chartCursor.style.opacity = '0';
      if (chartTooltip) chartTooltip.style.opacity = '0';
    });
  }


  // 6. Interactive UI Widgets & Click triggers inside grids
  
  // Interactive Pill 1: Chart Period Switcher
  const assetPills = document.querySelectorAll('.asset-selector-pill');
  assetPills.forEach(pill => {
    pill.addEventListener('click', () => {
      assetPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      
      // Reset animation on click for aesthetic impact
      const chartWrapperEl = document.querySelector('.chart-canvas-wrapper');
      if (chartWrapperEl) {
        chartWrapperEl.style.filter = 'brightness(1.3)';
        setTimeout(() => {
          chartWrapperEl.style.filter = '';
        }, 150);
      }
    });
  });

  // Interactive Pill 2: Sidebar Staking active items
  const sidebarLinks = document.querySelectorAll('.sidebar-links-list .side-link');
  sidebarLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      sidebarLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });

  // Interactive Widget 3: Task Checklist Item toggler (Smart Insights grid card)
  const taskItems = document.querySelectorAll('.interactive-task-items .task-item');
  taskItems.forEach(item => {
    item.addEventListener('click', () => {
      const circle = item.querySelector('.task-circle');
      if (item.classList.contains('completed')) {
        // Toggle from completed back to normal active
        item.classList.remove('completed');
        item.classList.add('active');
        if (circle) {
          circle.className = 'task-circle active';
          circle.textContent = '';
        }
      } else {
        // Toggle to completed
        item.classList.remove('active');
        item.classList.add('completed');
        if (circle) {
          circle.className = 'task-circle checked';
          circle.textContent = '✓';
        }
      }
    });
  });

  // Interactive Widget 4: Device Viewport selector (Generate Prototypes grid card)
  const devicePills = document.querySelectorAll('.device-options .device-pill');
  devicePills.forEach(pill => {
    pill.addEventListener('click', () => {
      devicePills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
    });
  });


  // 7. Booking strategy call form submission logic
  const bookForm = document.getElementById('tracle-book-form');
  if (bookForm) {
    bookForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('book-name').value.trim();
      const email = document.getElementById('book-email').value.trim();
      const slot = document.getElementById('book-slot').value;

      if (!name || !email || !slot) return;

      // Extract raw date for representation
      const formattedDate = new Date(slot).toLocaleString();

      // Create a gorgeous glass toast alert popup
      const toast = document.createElement('div');
      toast.style.position = 'fixed';
      toast.style.bottom = '30px';
      toast.style.right = '30px';
      toast.style.background = 'rgba(10, 10, 15, 0.95)';
      toast.style.border = '1px solid var(--tracle-accent-purple)';
      toast.style.padding = '20px 24px';
      toast.style.borderRadius = '12px';
      toast.style.color = '#fff';
      toast.style.fontFamily = 'var(--font-mono)';
      toast.style.fontSize = '0.75rem';
      toast.style.zIndex = '99999';
      toast.style.boxShadow = '0 20px 40px rgba(0,0,0,0.5), 0 0 20px rgba(139,92,246,0.1)';
      toast.style.maxWidth = '360px';
      toast.style.transform = 'translateY(100px)';
      toast.style.opacity = '0';
      toast.style.transition = 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
      
      toast.innerHTML = `
        <div style="font-weight: bold; color: var(--tracle-accent-purple); text-transform: uppercase; margin-bottom: 6px; font-size: 0.8rem; letter-spacing: 0.05em;">✓ Strategy Call Booked</div>
        <p style="margin: 0 0 10px; color: var(--tracle-text-secondary); line-height: 1.5;">Thank you ${name}! Your AI Calibration strategy call is scheduled.</p>
        <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); padding: 8px; border-radius: 4px; color: #fff;">${formattedDate}</div>
      `;

      document.body.appendChild(toast);

      // Trigger transition
      setTimeout(() => {
        toast.style.transform = 'translateY(0)';
        toast.style.opacity = '1';
      }, 50);

      // Reset form
      bookForm.reset();

      // Dismiss toast
      setTimeout(() => {
        toast.style.transform = 'translateY(20px)';
        toast.style.opacity = '0';
        setTimeout(() => {
          toast.remove();
        }, 500);
      }, 6000);
    });
  }

});
