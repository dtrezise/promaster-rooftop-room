(() => {
  const header = document.querySelector('[data-header]');
  const menuButton = document.querySelector('[data-menu-button]');
  const nav = document.querySelector('[data-nav]');
  const conceptVisual = document.querySelector('[data-concept-visual]');
  const stateButtons = [...document.querySelectorAll('[data-state-button]')];
  const stageNumber = document.querySelector('[data-stage-number]');
  const stageCopy = document.querySelector('[data-stage-copy]');

  const stageText = {
    closed: '<strong>Travel mode</strong> — a full-roof cassette keeps the enclosure low, locked and weather-sealed.',
    open: '<strong>Camp mode</strong> — synchronized posts lift, segmented walls unfold, mechanical locks engage and inflatable gaskets seal.'
  };

  const updateHeader = () => {
    header?.classList.toggle('is-scrolled', window.scrollY > 24);
  };

  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  menuButton?.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    nav?.classList.toggle('is-open', !isOpen);
  });

  nav?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menuButton?.setAttribute('aria-expanded', 'false');
      nav.classList.remove('is-open');
    });
  });

  stateButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const state = button.dataset.stateButton;
      conceptVisual.dataset.state = state;

      stateButtons.forEach((candidate) => {
        const isSelected = candidate === button;
        candidate.classList.toggle('is-active', isSelected);
        candidate.setAttribute('aria-pressed', String(isSelected));
      });

      if (stageNumber) stageNumber.textContent = state === 'open' ? '02' : '01';
      if (stageCopy) stageCopy.innerHTML = stageText[state];
    });
  });

  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -4% 0px' });

    reveals.forEach((item) => observer.observe(item));
  } else {
    reveals.forEach((item) => item.classList.add('is-visible'));
  }
})();
