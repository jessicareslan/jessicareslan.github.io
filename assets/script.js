// Enable tap-to-open dropdown on touch devices
document.querySelectorAll('nav .dropdown > a').forEach(link => {
  link.addEventListener('click', e => {
    if (window.matchMedia('(hover: none)').matches) {
      e.preventDefault();
      link.parentElement.classList.toggle('open');
    }
    document.body.addEventListener("pointermove", (e)=>{
  const { currentTarget: el, clientX: x, clientY: y } = e;
  const { top: t, left: l, width: w, height: h } = el.getBoundingClientRect();
  el.style.setProperty('--posX',  x-l-w/2);
  el.style.setProperty('--posY',  y-t-h/2);
})
  });
});
