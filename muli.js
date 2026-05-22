/* ==========================================================================
   MULI INTERACTION & TYPEWRITER ENGINE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================================================
  // 1. Navigation Control (Page-to-Page Routing)
  // ==========================================================================
  const prevBtn = document.getElementById('nav-prev');
  const nextBtn = document.getElementById('nav-next');

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      document.body.style.opacity = '0';
      setTimeout(() => {
        window.location.href = './tracle.html';
      }, 400);
    });
  }

  // Next routes to Nuorbit (Page 10)
  if (nextBtn) {
    nextBtn.classList.remove('disabled');
    nextBtn.removeAttribute('disabled');
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      document.body.style.opacity = '0';
      setTimeout(() => {
        window.location.href = './nuorbit.html';
      }, 400);
    });
  }


  // ==========================================================================
  // 2. Custom Amber Cursor Follower
  // ==========================================================================
  const cursorDot = document.getElementById('custom-cursor-dot');
  const cursorRing = document.getElementById('custom-cursor-ring');

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let cursorX = mouseX;
  let cursorY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (cursorDot) {
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    }
  });

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

  // Add cursor hovering effects to premium selectors
  const hoverables = document.querySelectorAll(
    'a, button, input, select, textarea, .metric-glass-capsule, .emoji-btn-item, .client-logo-item, .btn-dash-action'
  );
  hoverables.forEach(el => {
    el.addEventListener('mouseenter', () => {
      document.body.classList.add('custom-cursor-hovering');
    });
    el.addEventListener('mouseleave', () => {
      document.body.classList.remove('custom-cursor-hovering');
    });
  });


  // ==========================================================================
  // 3. Looping Typewriter Write-Down Engine (No Layout Shifts)
  // ==========================================================================
  
  // Custom High-Performance Typewriter Class
  class LoopingTypewriter {
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
        // Deleting characters
        this.element.textContent = currentPhrase.substring(0, this.charIndex - 1);
        this.charIndex--;
      } else {
        // Writing characters
        this.element.textContent = currentPhrase.substring(0, this.charIndex + 1);
        this.charIndex++;
      }

      let timeout = this.isDeleting ? this.deleteSpeed : this.typeSpeed;

      // Handle complete state transitions
      if (!this.isDeleting && this.charIndex === currentPhrase.length) {
        // Fully typed: Pause before backspacing
        timeout = this.delayBetween;
        this.isDeleting = true;
      } else if (this.isDeleting && this.charIndex === 0) {
        // Fully deleted: Shift to next phrase and pause shortly
        this.isDeleting = false;
        this.phraseIndex = (this.phraseIndex + 1) % this.phrases.length;
        timeout = 500;
      }

      setTimeout(() => this.run(), timeout);
    }
  }

  // Subtitle phrases initialization
  const heroPhrases = [
    "Imagine ABA scheduling for all patients happening automatically.",
    "Simplify scheduling, data collection, and clinical progress.",
    "Autonomous calibration tailored for therapist matching queues."
  ];
  new LoopingTypewriter("hero-typing-subtitle", heroPhrases, 45, 20, 3000);

  // Testimonial quote phrases initialization
  const testimonialPhrases = [
    "Muli is incredibly user-friendly! Live session data tracking is a game changer.",
    "Deploying automated clinic queues boosted clinician productivity by 40%.",
    "Smart scheduling engines handle thousands of therapist match variables in seconds."
  ];
  new LoopingTypewriter("testimonial-typing-quote", testimonialPhrases, 35, 15, 4000);


  // ==========================================================================
  // 4. Cosmic Sparks Background Canvas
  // ==========================================================================
  const bgCanvas = document.getElementById('muli-canvas');
  if (bgCanvas) {
    const ctx = bgCanvas.getContext('2d');
    let particles = [];
    
    function resizeBg() {
      bgCanvas.width = window.innerWidth;
      bgCanvas.height = window.innerHeight;
    }
    resizeBg();
    window.addEventListener('resize', resizeBg);

    // Particle Object containing Orange, Purple, and White particles
    class CosmicSpark {
      constructor() {
        this.reset();
        this.y = Math.random() * bgCanvas.height; // Distribute vertically on load
      }

      reset() {
        this.x = Math.random() * bgCanvas.width;
        this.y = bgCanvas.height + Math.random() * 20;
        this.size = Math.random() * 1.6 + 0.4;
        this.speedY = -(Math.random() * 0.4 + 0.15); // Upward float speed
        this.speedX = (Math.random() - 0.5) * 0.2;
        this.life = Math.random() * 120 + 80;
        this.maxLife = this.life;
        this.opacity = Math.random() * 0.4 + 0.1;
        
        // Curated Palette: 45% Orange, 45% Purple, 10% pure cosmic white
        const rand = Math.random();
        if (rand < 0.45) {
          this.color = `rgba(249, 115, 22, ${this.opacity})`; // Orange
        } else if (rand < 0.90) {
          this.color = `rgba(139, 92, 246, ${this.opacity})`; // Purple
        } else {
          this.color = `rgba(255, 255, 255, ${this.opacity * 1.5})`; // White star
        }
      }

      update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.life--;

        // High-fidelity hover attraction to mouse
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180) {
          const attractionStrength = (180 - dist) / 1800;
          this.x += dx * attractionStrength;
          this.y += dy * attractionStrength * 0.5; // subtle vertical pull
        }

        if (this.life <= 0 || this.y < -10) {
          this.reset();
        }
      }

      draw() {
        const ratio = this.life / this.maxLife;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        // Fade out gracefully towards death
        ctx.globalAlpha = ratio;
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1.0; // reset global alpha
      }
    }

    // Populate cosmic particle system
    const particleCount = Math.min(65, Math.floor(window.innerWidth / 20));
    for (let i = 0; i < particleCount; i++) {
      particles.push(new CosmicSpark());
    }

    function renderSystem() {
      ctx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
      
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      
      requestAnimationFrame(renderSystem);
    }
    renderSystem();
  }


  // ==========================================================================
  // 5. Interactive Cockpit UI & Panel Toggles (Static & Stationary)
  // ==========================================================================
  
  // Card 1 Left Toggle: Zayn Sharp notes completion toggle
  const openNotesBtn = document.getElementById('btn-notes-toggle');
  const notesItemCard = document.querySelector('.notes-item-card');
  const notesStatusEl = document.querySelector('.notes-status');
  
  if (openNotesBtn && notesStatusEl) {
    let notesExpanded = false;
    openNotesBtn.addEventListener('click', () => {
      notesExpanded = !notesExpanded;
      if (notesExpanded) {
        notesStatusEl.textContent = "Writing telemetry graphs in client files...";
        notesStatusEl.style.color = "var(--muli-orange)";
        openNotesBtn.textContent = "Close";
        openNotesBtn.style.borderColor = "var(--muli-orange)";
        
        // Add a beautiful hover ring flash
        if (notesItemCard) {
          notesItemCard.style.boxShadow = "0 0 10px rgba(249, 115, 22, 0.1)";
        }
      } else {
        notesStatusEl.textContent = "Creating notes...";
        notesStatusEl.style.color = "var(--muli-text-secondary)";
        openNotesBtn.textContent = "Open";
        openNotesBtn.style.borderColor = "rgba(255, 255, 255, 0.08)";
        
        if (notesItemCard) {
          notesItemCard.style.boxShadow = "none";
        }
      }
    });
  }

  // Card 1 Left Action: Prepare / Start session triggers
  const startSessionBtn = document.querySelector('.btn-start-session');
  const prepareSessionBtn = document.querySelector('.btn-prepare');
  
  if (startSessionBtn) {
    let sessionRunning = false;
    let durationSeconds = 6312; // 01:45:12 formatted start
    let sessionTimerInterval = null;
    
    const rightTimerBadge = document.querySelector('.session-timer-badge');

    startSessionBtn.addEventListener('click', () => {
      sessionRunning = !sessionRunning;
      if (sessionRunning) {
        startSessionBtn.textContent = "Stop Session";
        startSessionBtn.classList.remove('active-glow');
        startSessionBtn.style.background = "linear-gradient(135deg, #ef4444, #b91c1c)"; // Alarm red stop session
        
        const loggingStatus = document.querySelector('.logging-value');
        if (loggingStatus) {
          loggingStatus.textContent = "Active calibration running...";
          loggingStatus.style.color = "#22c55e";
        }

        // Increment timer in right sidebar card synchronously!
        if (rightTimerBadge) {
          sessionTimerInterval = setInterval(() => {
            durationSeconds++;
            const hrs = Math.floor(durationSeconds / 3600).toString().padStart(2, '0');
            const mins = Math.floor((durationSeconds % 3600) / 60).toString().padStart(2, '0');
            const secs = (durationSeconds % 60).toString().padStart(2, '0');
            rightTimerBadge.textContent = `${hrs}:${mins}:${secs}`;
          }, 1000);
        }

        createMiniAlert("Calibration Started", "Telemetry sync initiated for patient Wilson Rhiel Madsen.");

      } else {
        startSessionBtn.textContent = "Start session";
        startSessionBtn.classList.add('active-glow');
        startSessionBtn.style.background = "var(--muli-orange)";
        
        const loggingStatus = document.querySelector('.logging-value');
        if (loggingStatus) {
          loggingStatus.textContent = "Creating reports...";
          loggingStatus.style.color = "var(--muli-text-secondary)";
        }

        if (sessionTimerInterval) {
          clearInterval(sessionTimerInterval);
        }

        createMiniAlert("Calibration Saved", "Session details logged successfully to cloud server.");
      }
    });
  }

  if (prepareSessionBtn) {
    prepareSessionBtn.addEventListener('click', () => {
      createMiniAlert("Preparation Complete", "Autogenerated treatment layout compiled for therapy slot.");
      prepareSessionBtn.textContent = "Ready ✓";
      prepareSessionBtn.style.color = "var(--muli-orange)";
      prepareSessionBtn.style.borderColor = "var(--muli-orange)";
    });
  }

  // Card 2 Right: Emoji rating interactive items
  const emojiRatingBtns = document.querySelectorAll('.emoji-ratings-grid .emoji-btn-item');
  if (emojiRatingBtns.length > 0) {
    emojiRatingBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        emojiRatingBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const emoji = btn.querySelector('.emoji-face').textContent;
        const textIndicator = document.querySelector('.btn-engage-emoji');
        if (textIndicator) {
          textIndicator.textContent = emoji;
        }

        createMiniAlert("Engagement Scored", `Behavior evaluated as '${emoji}' rating for play items.`);
      });
    });
  }

  // Card 2 Right: Prompt trigger action
  const promptBtn = document.getElementById('btn-engage-action');
  if (promptBtn) {
    let promptCounts = 4;
    promptBtn.addEventListener('click', () => {
      promptCounts++;
      const verbalPromptLabel = document.querySelector('.logging-value');
      if (verbalPromptLabel) {
        verbalPromptLabel.textContent = `${promptCounts} consecutive correct`;
      }
      createMiniAlert("Prompt Count Logged", "Incremented clinical prompt acquisition value.");
    });
  }

  // Care management horizontal capsules click selection
  const featureCapsules = document.querySelectorAll('.metric-glass-capsule');
  featureCapsules.forEach(capsule => {
    capsule.addEventListener('click', () => {
      featureCapsules.forEach(c => c.classList.remove('active'));
      capsule.classList.add('active');
      
      const categoryName = capsule.querySelector('.capsule-text').textContent;
      createMiniAlert("Telemetry Filter Scoped", `Switched practice workspace to ${categoryName}.`);
    });
  });


  // ==========================================================================
  // 6. Booking strategy form submission & Glass Alert system
  // ==========================================================================
  const bookingForm = document.getElementById('muli-book-form');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const fullName = document.getElementById('muli-name').value.trim();
      const email = document.getElementById('muli-email').value.trim();
      const staffSize = document.getElementById('muli-size').value;

      if (!fullName || !email) return;

      // Gorgeous Glass Toast Alert Popup Creation
      const toastAlert = document.createElement('div');
      toastAlert.style.position = 'fixed';
      toastAlert.style.bottom = '30px';
      toastAlert.style.right = '30px';
      toastAlert.style.background = 'rgba(5, 2, 12, 0.95)';
      toastAlert.style.backdropFilter = 'blur(30px)';
      toastAlert.style.border = '1px solid var(--muli-orange)';
      toastAlert.style.padding = '20px 24px';
      toastAlert.style.borderRadius = '16px';
      toastAlert.style.color = '#fff';
      toastAlert.style.fontFamily = 'var(--font-mono)';
      toastAlert.style.fontSize = '0.75rem';
      toastAlert.style.zIndex = '999999';
      toastAlert.style.boxShadow = '0 25px 50px rgba(0,0,0,0.6), 0 0 25px rgba(249, 115, 22, 0.15)';
      toastAlert.style.maxWidth = '380px';
      toastAlert.style.transform = 'translateY(100px)';
      toastAlert.style.opacity = '0';
      toastAlert.style.transition = 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
      
      toastAlert.innerHTML = `
        <div style="font-weight: bold; color: var(--muli-orange); text-transform: uppercase; margin-bottom: 6px; font-size: 0.8rem; letter-spacing: 0.05em; display:flex; align-items:center; gap:8px;">
          <span style="display:inline-block; width:6px; height:6px; background-color: var(--muli-orange); border-radius:50%; box-shadow: 0 0 8px var(--muli-orange);"></span>
          ✓ Calibration Scheduled
        </div>
        <p style="margin: 0 0 10px; color: var(--muli-text-secondary); line-height: 1.5;">Thanks, ${fullName}! Your clinic profile calibration has been successfully scheduled.</p>
        <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); padding: 8px 12px; border-radius: 6px; color: #fff; font-size: 0.7rem; display: flex; justify-content: space-between;">
          <span>STAFF SIZE: ${staffSize}</span>
          <span style="color: var(--muli-purple);">${email}</span>
        </div>
      `;

      document.body.appendChild(toastAlert);

      // Trigger transition enter
      setTimeout(() => {
        toastAlert.style.transform = 'translateY(0)';
        toastAlert.style.opacity = '1';
      }, 50);

      bookingForm.reset();

      // Dismiss after 6 seconds
      setTimeout(() => {
        toastAlert.style.transform = 'translateY(20px)';
        toastAlert.style.opacity = '0';
        setTimeout(() => {
          toastAlert.remove();
        }, 500);
      }, 6000);
    });
  }

  // Mini Toast Notification System for micro actions
  function createMiniAlert(title, message) {
    const existingMiniAlerts = document.querySelectorAll('.muli-mini-alert');
    existingMiniAlerts.forEach(alert => {
      // Clear older ones to avoid stacking overflow
      alert.style.transform = 'translateY(-20px)';
      alert.style.opacity = '0';
      setTimeout(() => alert.remove(), 300);
    });

    const alertBox = document.createElement('div');
    alertBox.className = 'muli-mini-alert';
    alertBox.style.position = 'fixed';
    alertBox.style.top = '100px';
    alertBox.style.right = '30px';
    alertBox.style.background = 'rgba(5, 2, 12, 0.9)';
    alertBox.style.backdropFilter = 'blur(20px)';
    alertBox.style.border = '1px solid rgba(255, 255, 255, 0.08)';
    alertBox.style.borderLeft = '3px solid var(--muli-purple)';
    alertBox.style.padding = '12px 18px';
    alertBox.style.borderRadius = '8px';
    alertBox.style.color = '#fff';
    alertBox.style.fontFamily = 'var(--font-mono)';
    alertBox.style.fontSize = '0.7rem';
    alertBox.style.zIndex = '99999';
    alertBox.style.boxShadow = '0 15px 30px rgba(0,0,0,0.5)';
    alertBox.style.transform = 'translateY(-30px)';
    alertBox.style.opacity = '0';
    alertBox.style.transition = 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
    
    alertBox.innerHTML = `
      <div style="font-weight: bold; color: var(--muli-purple); text-transform: uppercase; margin-bottom: 2px;">✦ ${title}</div>
      <p style="margin: 0; color: var(--muli-text-secondary);">${message}</p>
    `;

    document.body.appendChild(alertBox);

    setTimeout(() => {
      alertBox.style.transform = 'translateY(0)';
      alertBox.style.opacity = '1';
    }, 50);

    setTimeout(() => {
      alertBox.style.transform = 'translateY(-20px)';
      alertBox.style.opacity = '0';
      setTimeout(() => alertBox.remove(), 400);
    }, 4500);
  }

  // ==========================================================================
  // 7. Interactive Showcase Outcomes Grid Wiring (Card A, Card D, Card E)
  // ==========================================================================
  
  // Card D: Realtime Voice Log & Gauges active synchronizer
  const btnVoiceLog = document.getElementById('btn-voice-log');
  const audioHud = document.querySelector('.audio-logging-hud');
  
  const dialGainNeedle = document.getElementById('dial-gain-needle');
  const dialGainReadout = document.getElementById('dial-gain-readout');
  const dialSyncNeedle = document.getElementById('dial-sync-needle');
  const dialSyncReadout = document.getElementById('dial-sync-readout');
  
  let voiceActive = false;
  let voiceInterval = null;
  
  if (btnVoiceLog && audioHud) {
    btnVoiceLog.addEventListener('click', () => {
      voiceActive = !voiceActive;
      
      if (voiceActive) {
        btnVoiceLog.classList.add('running');
        audioHud.classList.add('wave-running');
        createMiniAlert("Voice Stream Calibrated", "Live audio transcription channel calibrated.");
        
        // Start dynamic gauges simulation
        voiceInterval = setInterval(() => {
          // Fluctuate Gain: rotation 20deg to 55deg, value 82% to 87%
          const randomGainVal = Math.floor(Math.random() * 6) + 82; // 82 - 87
          const gainRotation = (randomGainVal - 82) * 6 + 20; // degree
          
          if (dialGainNeedle) dialGainNeedle.style.transform = `rotate(${gainRotation}deg)`;
          if (dialGainReadout) dialGainReadout.textContent = `${randomGainVal}%`;
          
          // Fluctuate Sync: rotation 100deg to 135deg, value 98% to 100%
          const randomSyncVal = Math.floor(Math.random() * 3) + 98; // 98 - 100
          const syncRotation = (randomSyncVal - 98) * 15 + 100; // degree
          
          if (dialSyncNeedle) dialSyncNeedle.style.transform = `rotate(${syncRotation}deg)`;
          if (dialSyncReadout) dialSyncReadout.textContent = `${randomSyncVal}%`;
        }, 300);
        
      } else {
        btnVoiceLog.classList.remove('running');
        audioHud.classList.remove('wave-running');
        createMiniAlert("Voice Stream Paused", "Clinical audio log sync paused.");
        
        if (voiceInterval) {
          clearInterval(voiceInterval);
        }
        
        // Reset dials to default calibrated states
        if (dialGainNeedle) dialGainNeedle.style.transform = 'rotate(35deg)';
        if (dialGainReadout) dialGainReadout.textContent = '84%';
        
        if (dialSyncNeedle) dialSyncNeedle.style.transform = 'rotate(115deg)';
        if (dialSyncReadout) dialSyncReadout.textContent = '99%';
      }
    });
  }
  
  // Card A: Tuesday Outcomes bar chart scale pulse
  const btnAddPlan = document.getElementById('btn-add-therapy-plan');
  if (btnAddPlan) {
    btnAddPlan.addEventListener('click', () => {
      const tuesdayBar = document.querySelector('.bar-fill.bar-2.glow-purple');
      if (tuesdayBar) {
        tuesdayBar.style.transform = 'scaleY(1.15) translateY(-4px)';
        tuesdayBar.style.filter = 'brightness(1.3) contrast(1.2)';
        
        setTimeout(() => {
          tuesdayBar.style.transform = 'none';
          tuesdayBar.style.filter = 'none';
        }, 600);
      }
      createMiniAlert("Therapy Plan Autogenerated", "Compiled 12 new clinical pathways for Zayn Sharp.");
    });
  }
  
  // Card E: Calibrate Flow Telemetry Slider transition
  const btnActivityLogs = document.getElementById('btn-activity-logs');
  const calibFill = document.getElementById('calib-fill');
  const calibStatus = document.getElementById('calib-status');
  
  if (btnActivityLogs) {
    btnActivityLogs.addEventListener('click', () => {
      if (calibFill && calibStatus) {
        calibFill.style.width = '95%';
        calibStatus.textContent = '✓ Live Calibration Success';
        calibStatus.style.color = '#22c55e';
        calibStatus.style.textShadow = '0 0 8px rgba(34, 197, 150, 0.3)';
        
        createMiniAlert("Activity Registry Calibrated", "Fetched clinical task trails from secure database.");
      }
    });
  }

});
