/**
 * VERDANT LANDING PAGE INTERACTIVEFRONTEND LOGIC
 * Includes:
 * 1. Navbar Page-to-Page Navigator
 * 2. Crazy Elastic Lagging Custom Cursor (reused for consistent premium theme)
 * 3. Card 1 Interactive Diagram micro-interactions
 * 4. Micro-interactions & hovering
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbarNavigators();
  initCustomCursor();
  initInteractiveDiagram();
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
      // Navigate back to the first page (index.html)
      window.location.href = './index.html';
    });
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      // Navigate forward to the third page (division.html)
      window.location.href = './division.html';
    });
  }
}

/* ==========================================================================
   2. CUSTOM ELASTIC THEME CURSOR LOGIC (Matching main.html layout perfectly)
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
  const hoverSelector = 'a, button, .node-item, .glass-card-item, .logo-link, .partner-logo-item';

  // Apply custom green-themed classes when hovered
  document.addEventListener('mouseover', (e) => {
    const target = e.target.closest(hoverSelector);
    if (target) {
      dot.classList.add('hovered');
      ring.classList.add('hovered');
      // Apply green accent styling on the cursor ring
      ring.style.backgroundColor = 'rgba(181, 246, 61, 0.08)';
      ring.style.borderColor = '#b5f63d';
      ring.style.boxShadow = '0 0 25px rgba(181, 246, 61, 0.4)';
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
    ring.style.borderColor = '#b5f63d';
  });

  document.addEventListener('mouseup', () => {
    ring.style.transform = 'translate(-50%, -50%) scale(1)';
    ring.style.borderColor = '';
  });
}

/* ==========================================================================
   3. CARD 1 INTERACTIVE DIAGRAM MICRO-INTERACTIONS
   ========================================================================== */
function initInteractiveDiagram() {
  const srcNodes = document.querySelectorAll('.src-node');
  const destBadge = document.querySelector('.leaf-glow-badge');
  const paths = document.querySelectorAll('.path-anim');

  srcNodes.forEach((node, index) => {
    node.addEventListener('mouseenter', () => {
      // Highlight the corresponding SVG line path
      if (paths[index]) {
        paths[index].setAttribute('stroke', '#b5f63d');
        paths[index].setAttribute('stroke-width', '2.5');
        paths[index].style.animationDuration = '3s'; // Fast animation
      }
      
      // Pulse the central leaf destination node
      if (destBadge) {
        destBadge.style.transform = 'translateY(-6px) scale(1.15)';
        destBadge.style.boxShadow = '0 0 35px rgba(181, 246, 61, 0.65)';
        destBadge.style.backgroundColor = 'rgba(181, 246, 61, 0.2)';
      }
    });

    node.addEventListener('mouseleave', () => {
      // Reset SVG line path
      if (paths[index]) {
        paths[index].setAttribute('stroke', 'rgba(181, 246, 61, 0.35)');
        paths[index].setAttribute('stroke-width', '1.5');
        paths[index].style.animationDuration = '12s'; // Reset speed
      }
      
      // Reset destination node
      if (destBadge) {
        destBadge.style.transform = '';
        destBadge.style.boxShadow = '';
        destBadge.style.backgroundColor = '';
      }
    });
  });
}
