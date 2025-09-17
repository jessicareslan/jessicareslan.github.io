// Write CSS vars relative to the viewport center
(() => {
  let px = 0, py = 0, ticking = false;
  const root = document.documentElement;
  function apply() {
    root.style.setProperty('--posX', px.toFixed(1));
    root.style.setProperty('--posY', py.toFixed(1));
    ticking = false;
  }
  function onMove(e){
    const x = e.clientX - window.innerWidth/2;
    const y = e.clientY - window.innerHeight/2;
    px = x; py = y;
    if (!ticking){ requestAnimationFrame(apply); ticking = true; }
  }
  window.addEventListener('pointermove', onMove, { passive:true });
  window.addEventListener('resize', () => { /* nothing needed; vars stay relative */ });
})();
// ===== 1) Tap-to-open dropdown on touch devices =====
(function () {
  const isTouch = window.matchMedia('(hover: none)').matches;
  const dropdownLinks = document.querySelectorAll('nav .dropdown > a');

  dropdownLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      if (!isTouch) return; // desktop uses :hover in CSS
      e.preventDefault();

      // close other open dropdowns
      document.querySelectorAll('nav .dropdown.open').forEach(d => {
        if (d !== link.parentElement) d.classList.remove('open');
      });

      // toggle this one
      link.parentElement.classList.toggle('open');
    });
  });

  // close on outside tap/click
  document.addEventListener('click', (e) => {
    if (!isTouch) return;
    const anyOpen = document.querySelector('nav .dropdown.open');
    if (!anyOpen) return;
    if (!anyOpen.contains(e.target)) anyOpen.classList.remove('open');
  });

  // close on Esc
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('nav .dropdown.open')
        .forEach(d => d.classList.remove('open'));
    }
  });
})();

// ===== 2) Pointer tracking for CSS vars (for parallax/glow/whatever) =====
// Choose where to write the vars:
// - element-scoped (recommended): the hero banner gets its own --posX/--posY
// - root-scoped: write to :root so any component can read them
(function () {
  const target = document.querySelector('.hero-banner') || document.documentElement;

  let rect = target.getBoundingClientRect();
  let px = 0, py = 0;
  let ticking = false;

  function onPointerMove(ev) {
    // relative to the target's center:
    const x = ev.clientX - rect.left - rect.width / 2;
    const y = ev.clientY - rect.top  - rect.height / 2;
    px = x;
    py = y;

    if (!ticking) {
      window.requestAnimationFrame(applyVars);
      ticking = true;
    }
  }

  function applyVars() {
    // write CSS variables; read them in CSS as var(--posX) / var(--posY)
    target.style.setProperty('--posX', px.toFixed(1));
    target.style.setProperty('--posY', py.toFixed(1));
    ticking = false;
  }

  function onResize() {
    rect = target.getBoundingClientRect();
  }

  window.addEventListener('pointermove', onPointerMove, { passive: true });
  window.addEventListener('resize', onResize);
  window.addEventListener('orientationchange', onResize);
})();
