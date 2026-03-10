const body = document.body;
const focusableSelector = 'a[href], button:not([disabled]), input:not([disabled]), summary, [tabindex]:not([tabindex="-1"])';

function trapFocus(container, event) {
  const nodes = Array.from(container.querySelectorAll(focusableSelector));
  if (!nodes.length) return;
  const first = nodes[0];
  const last = nodes[nodes.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

function setupLanguageMenus() {
  document.querySelectorAll('.lang-wrap').forEach((wrap) => {
    const btn = wrap.querySelector('.lang-current');
    if (!btn) return;
    btn.addEventListener('click', () => {
      wrap.classList.toggle('open');
      btn.setAttribute('aria-expanded', wrap.classList.contains('open') ? 'true' : 'false');
    });
    document.addEventListener('click', (e) => {
      if (!wrap.contains(e.target)) {
        wrap.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      }
    });
  });
}

function setupDrawer() {
  const drawer = document.getElementById('mobileDrawer');
  const openBtn = document.getElementById('mobileToggle');
  const closeBtn = document.getElementById('drawerClose');
  const backdrop = drawer?.querySelector('.drawer-backdrop');
  if (!drawer || !openBtn || !closeBtn || !backdrop) return;

  const open = () => {
    drawer.classList.add('open');
    body.classList.add('no-scroll');
    closeBtn.focus();
  };
  const close = () => {
    drawer.classList.remove('open');
    body.classList.remove('no-scroll');
    openBtn.focus();
  };

  openBtn.addEventListener('click', open);
  closeBtn.addEventListener('click', close);
  backdrop.addEventListener('click', close);

  drawer.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') close();
    if (event.key === 'Tab') trapFocus(drawer, event);
  });

  drawer.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', close);
  });
}

function setupFaq() {
  const items = Array.from(document.querySelectorAll('.faq-item'));
  items.forEach((item) => {
    item.addEventListener('toggle', () => {
      if (!item.open) return;
      items.forEach((other) => {
        if (other !== item) other.open = false;
      });
    });
  });
}

function setupModal() {
  const modal = document.getElementById('privacyModal');
  const triggers = document.querySelectorAll('[data-open-privacy]');
  const closeX = document.getElementById('privacyCloseX');
  const closeBtn = document.getElementById('privacyCloseBtn');
  if (!modal || !triggers.length || !closeX || !closeBtn) return;

  const open = () => {
    modal.classList.add('open');
    body.classList.add('no-scroll');
    closeX.focus();
  };
  const close = () => {
    modal.classList.remove('open');
    body.classList.remove('no-scroll');
  };

  triggers.forEach((t) => t.addEventListener('click', (e) => {
    e.preventDefault();
    open();
  }));

  closeX.addEventListener('click', close);
  closeBtn.addEventListener('click', close);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) close();
  });
  modal.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') close();
    if (event.key === 'Tab') trapFocus(modal, event);
  });
}

function setupReveal() {
  const nodes = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('show');
    });
  }, { threshold: 0.16 });
  nodes.forEach((n) => io.observe(n));
}

setupLanguageMenus();
setupDrawer();
setupFaq();
setupModal();
setupReveal();
