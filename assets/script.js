const glow = document.querySelector(".glow");

window.addEventListener("pointermove", (event) => {
  if (!glow) return;

  glow.animate(
    {
      left: `${event.clientX}px`,
      top: `${event.clientY}px`
    },
    {
      duration: 450,
      fill: "forwards"
    }
  );
});

const openNewsletter = document.getElementById("openNewsletter");
const closeNewsletter = document.getElementById("closeNewsletter");
const newsletterModal = document.getElementById("newsletterModal");
const newsletterForm = document.getElementById("newsletterForm");

function openModal() {
  newsletterModal.classList.add("is-open");
  newsletterModal.setAttribute("aria-hidden", "false");
}

function closeModal() {
  newsletterModal.classList.remove("is-open");
  newsletterModal.setAttribute("aria-hidden", "true");
}

if (openNewsletter && closeNewsletter && newsletterModal && newsletterForm) {
  openNewsletter.addEventListener("click", openModal);
  closeNewsletter.addEventListener("click", closeModal);

  newsletterModal.addEventListener("click", (event) => {
    if (event.target === newsletterModal) closeModal();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeModal();
  });

  newsletterForm.addEventListener("submit", (event) => {
    event.preventDefault();
    alert("💌 Thanks for subscribing!");
    closeModal();
    newsletterForm.reset();
  });
}
