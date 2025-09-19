 // Run after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  /* =========== 1) Touch dropdowns =========== */
  const isTouch = window.matchMedia('(hover: none)').matches;
  const dropdowns = document.querySelectorAll('nav .dropdown');

  dropdowns.forEach(dd => {
    const trigger = dd.querySelector(':scope > a');
    if (!trigger) return;

    // a11y
    trigger.setAttribute('aria-haspopup', 'true');
    trigger.setAttribute('aria-expanded', 'false');

    const toggle = (open) => {
      dd.classList.toggle('open', open);
      trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
    };

    trigger.addEventListener('click', (e) => {
      if (!isTouch) return; // desktop uses CSS :hover
      e.preventDefault();
      // close others
      document.querySelectorAll('nav .dropdown.open').forEach(other => {
        if (other !== dd) {
          other.classList.remove('open');
          const t = other.querySelector(':scope > a');
          if (t) t.setAttribute('aria-expanded', 'false');
        }
      });
      toggle(!dd.classList.contains('open'));
    });
  });

  // Close open dropdown on outside click (touch only) and on Escape
  document.addEventListener('click', (e) => {
    if (!isTouch) return;
    const open = document.querySelector('nav .dropdown.open');
    if (open && !open.contains(e.target)) {
      open.classList.remove('open');
      const t = open.querySelector(':scope > a');
      if (t) t.setAttribute('aria-expanded', 'false');
    }
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('nav .dropdown.open').forEach(d => {
        d.classList.remove('open');
        const t = d.querySelector(':scope > a');
        if (t) t.setAttribute('aria-expanded', 'false');
      });
    }
  });

  /* =========== 2) Newsletter modal =========== */
  const openBtn  = document.getElementById('openNewsletter');
  const modal    = document.getElementById('newsletterModal');
  const closeBtn = document.getElementById('closeNewsletter');
  const form     = document.getElementById('newsletterForm');

  if (openBtn && modal && closeBtn) {
    const input = modal.querySelector('input[type="email"]');

    const openModal = () => {
      modal.classList.add('is-open');           // use CSS to show
      document.body.classList.add('body-lock'); // optional scroll lock
      // focus email field shortly after open
      setTimeout(() => { if (input) input.focus(); }, 50);
    };
    const closeModal = () => {
      modal.classList.remove('is-open');
      document.body.classList.remove('body-lock');
      openBtn.focus({ preventScroll: true });
    };

    openBtn.addEventListener('click', openModal);
    closeBtn.addEventListener('click', closeModal);

    // click on backdrop closes
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    // Escape closes
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
    });

    // Basic submit demo; replace with real integration when ready
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('💌 Thanks for subscribing!');
        closeModal();
      });
    }
  }
});
