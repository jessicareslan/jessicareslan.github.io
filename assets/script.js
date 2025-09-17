// Enable tap-to-open dropdown on touch devices
document.querySelectorAll('nav .dropdown > a').forEach(link => {
  link.addEventListener('click', e => {
    if (window.matchMedia('(hover: none)').matches) {
      e.preventDefault();
      link.parentElement.classList.toggle('open');
    }
  });
});
