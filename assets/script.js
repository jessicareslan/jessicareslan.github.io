// Dropdown for touch
(() => {
  const isTouch = window.matchMedia('(hover: none)').matches;
  const links = document.querySelectorAll('nav .dropdown > a');

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      if (!isTouch) return;
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

// Newsletter modal
const openBtn = document.getElementById("openNewsletter");
const modal = document.getElementById("newsletterModal");
const closeBtn = document.getElementById("closeNewsletter");
const form = document.getElementById("newsletterForm");

openBtn.addEventListener("click", () => {
  modal.style.display = "flex";
});
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});
window.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});
form.addEventListener("submit", (e) => {
  e.preventDefault();
  alert("💌 Thanks for subscribing!");
  modal.style.display = "none";
});
