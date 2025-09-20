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

// Newsletter popup logic
const openBtn = document.getElementById("openNewsletter");
const modal = document.getElementById("newsletterModal");
const closeBtn = document.getElementById("closeNewsletter");
const form = document.getElementById("newsletterForm");

// Open modal
openBtn.addEventListener("click", () => {
  modal.style.display = "flex";
});

// Close modal
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});
window.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});

// Handle form
form.addEventListener("submit", (e) => {
  e.preventDefault();
  alert("💌 Thanks for subscribing!");
  modal.style.display = "none";
});

