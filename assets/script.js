// 1) Tap-to-open dropdown on touch devices
(() => {
  const isTouch = window.matchMedia('(hover: none)').matches;
  const links = document.querySelectorAll('nav .dropdown > a');

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      if (!isTouch) return; // desktop uses :hover
      e.preventDefault();
      document.querySelectorAll('nav .dropdown.open').forEach(d => {
        if (d !== link.parentElement) d.classList.remove('open');
      });
      link.parentElement.classList.toggle('open');
    });
  });

  document.addEventListener('click', (e) => {
    if (!isTouch) return;
    const open = document.querySelector('nav .dropdown.open');
    if (open && !open.contains(e.target)) open.classList.remove('open');
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape')
      document.querySelectorAll('nav .dropdown.open').forEach(d => d.classList.remove('open'));
  });
})();

// 2) Interactive background — write --posX/--posY on :root
(() => {
  const root = document.documentElement;
  let px = 0, py = 0, ticking = false;

  function apply() {
    root.style.setProperty('--posX', px.toFixed(1));
    root.style.setProperty('--posY', py.toFixed(1));
    ticking = false;
  }

  function onPointerMove(e) {
    // relative to viewport center
    px = e.clientX - window.innerWidth / 2;
    py = e.clientY - window.innerHeight / 2;
    if (!ticking) { requestAnimationFrame(apply); ticking = true; }
  }

  window.addEventListener('pointermove', onPointerMove, { passive: true });
})();
