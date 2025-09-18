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
// throttle to ~30fps + snap to 8px grid
(() => {
  const root = document.documentElement;
  let px=0, py=0, ticking=false, last=0;

  function apply(){ 
    root.style.setProperty('--posX', px);
    root.style.setProperty('--posY', py);
    ticking=false;
  }

  window.addEventListener('pointermove', (e) => {
    const now = performance.now();
    if (now - last < 33) return; // ~30fps
    last = now;

    // snap to 8px steps to avoid constant tiny repaints
    px = Math.round((e.clientX - innerWidth/2) / 8) * 8;
    py = Math.round((e.clientY - innerHeight/2) / 8) * 8;

    if (!ticking){ requestAnimationFrame(apply); ticking=true; }
  }, { passive:true });
})();

// assets/script.js
(() => {
  const root = document.documentElement;
  let px=0, py=0, ticking=false, last=0;

  function apply(){
    root.style.setProperty('--posX', px);
    root.style.setProperty('--posY', py);
    ticking=false;
  }

  window.addEventListener('pointermove', (e) => {
    const now = performance.now();
    if (now - last < 33) return; // ~30fps instead of 120fps
    last = now;

    // small quantization reduces constant tiny repaints
    px = Math.round((e.clientX - innerWidth/2) / 8) * 8;
    py = Math.round((e.clientY - innerHeight/2) / 8) * 8;

    if (!ticking){ requestAnimationFrame(apply); ticking = true; }
  }, { passive:true });
})();
