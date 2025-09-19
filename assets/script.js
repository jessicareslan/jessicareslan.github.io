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


