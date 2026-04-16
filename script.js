// Binary rain animation
const canvas = document.getElementById('binaryCanvas');
if (canvas) {
  const ctx = canvas.getContext('2d');

  const letters = '01';
  const fontSize = 14;
  let columns = 0;
  let drops = [];

  const resizeBinaryCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    columns = Math.floor(canvas.width / fontSize);
    drops = Array.from({ length: columns }).fill(1);
  };

  resizeBinaryCanvas();
  window.addEventListener('resize', resizeBinaryCanvas);

  function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#00aaff';
    ctx.font = fontSize + 'px monospace';

    drops.forEach((y, index) => {
      const text = letters[Math.floor(Math.random() * letters.length)];
      ctx.fillText(text, index * fontSize, y * fontSize);

      if (y * fontSize > canvas.height && Math.random() > 0.975) {
        drops[index] = 0;
      }

      drops[index]++;
    });
  }

  setInterval(draw, 33);
}

// Mobile navbar toggle
const menuIcon = document.getElementById('menu-icon');
const navbar = document.getElementById('navbar');

if (menuIcon && navbar) {
  const closeMenu = () => {
    navbar.classList.remove('open');
    menuIcon.classList.remove('open');
    menuIcon.setAttribute('aria-expanded', 'false');
  };

  menuIcon.addEventListener('click', () => {
    const isOpen = navbar.classList.toggle('open');
    menuIcon.classList.toggle('open', isOpen);
    menuIcon.setAttribute('aria-expanded', String(isOpen));
  });

  navbar.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && !menuIcon.contains(e.target)) {
      closeMenu();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 1024) {
      closeMenu();
    }
  });
}

// Reveal pricing cards on scroll
const cards = document.querySelectorAll('.card');

if (cards.length) {
  const revealCards = () => {
    cards.forEach((card) => {
      const top = card.getBoundingClientRect().top;
      if (top < window.innerHeight - 100) {
        card.classList.add('is-visible');
      }
    });
  };

  window.addEventListener('scroll', revealCards);
  revealCards();
}

// Pricing side nav toggle
const menuToggle = document.getElementById('menu-toggle');
const sideNav = document.getElementById('side-nav');
const closeBtn = document.getElementById('close-btn');

if (menuToggle && sideNav && closeBtn) {
  menuToggle.addEventListener('click', () => {
    sideNav.classList.add('active');
  });

  closeBtn.addEventListener('click', () => {
    sideNav.classList.remove('active');
  });

  document.addEventListener('click', (e) => {
    if (!sideNav.contains(e.target) && !menuToggle.contains(e.target)) {
      sideNav.classList.remove('active');
    }
  });

  sideNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      sideNav.classList.remove('active');
    });
  });
}

// Calendly booking flow
const calendlyBaseUrl = 'https://calendly.com/jeremiahpolk07/30min';
const consultThankYouParam = 'consultation';
const consultThankYouValue = 'booked';

const buildConsultReturnUrl = () => {
  const url = new URL(window.location.href);
  url.searchParams.set(consultThankYouParam, consultThankYouValue);
  return url.toString();
};

const showConsultConfirmationIfNeeded = () => {
  const params = new URLSearchParams(window.location.search);
  if (params.get(consultThankYouParam) !== consultThankYouValue) {
    return;
  }

  const confirmation = document.getElementById('consultConfirmation');
  if (!confirmation) {
    return;
  }

  confirmation.hidden = false;
  confirmation.classList.add('is-visible');

  window.setTimeout(() => {
    confirmation.classList.remove('is-visible');
    confirmation.hidden = true;
  }, 5000);

  const cleanUrl = new URL(window.location.href);
  cleanUrl.searchParams.delete(consultThankYouParam);
  window.history.replaceState({}, '', cleanUrl.toString());
};

const initConsultBookingLinks = () => {
  const consultLinks = document.querySelectorAll('.book-consult-link');
  if (!consultLinks.length) {
    showConsultConfirmationIfNeeded();
    return;
  }

  showConsultConfirmationIfNeeded();

  let calendlyScheduledHandled = false;

  window.addEventListener('message', (event) => {
    if (!event.origin.includes('calendly.com')) {
      return;
    }

    const isScheduled = event.data && event.data.event === 'calendly.event_scheduled';
    if (!isScheduled || calendlyScheduledHandled) {
      return;
    }

    calendlyScheduledHandled = true;
    window.location.href = buildConsultReturnUrl();
  });

  consultLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();

      if (window.Calendly && typeof window.Calendly.initPopupWidget === 'function') {
        window.Calendly.initPopupWidget({ url: calendlyBaseUrl });
        return;
      }

      window.location.href = calendlyBaseUrl;
    });
  });
};

initConsultBookingLinks();

// Contact section binary background
const contactBinaryCanvas = document.getElementById('contactBinaryCanvas');

if (contactBinaryCanvas) {
  const contactSection = contactBinaryCanvas.closest('.contact');
  const contactCtx = contactBinaryCanvas.getContext('2d');
  const contactLetters = '01';
  const contactFontSize = 16;
  const contactColors = ['rgba(255,255,255,0.32)', 'rgba(223,244,255,0.26)', 'rgba(155,216,255,0.22)', 'rgba(79,172,254,0.2)'];
  let contactColumns = 0;
  let contactDrops = [];

  const resizeContactBinaryCanvas = () => {
    if (!contactSection) {
      return;
    }

    contactBinaryCanvas.width = contactSection.clientWidth;
    contactBinaryCanvas.height = contactSection.clientHeight;
    contactColumns = Math.floor(contactBinaryCanvas.width / contactFontSize);
    contactDrops = Array.from({ length: contactColumns }).fill(1);
  };

  resizeContactBinaryCanvas();
  window.addEventListener('resize', resizeContactBinaryCanvas);

  const drawContactBinary = () => {
    if (!contactSection) {
      return;
    }

    contactCtx.fillStyle = 'rgba(2, 6, 23, 0.18)';
    contactCtx.fillRect(0, 0, contactBinaryCanvas.width, contactBinaryCanvas.height);
    contactCtx.font = contactFontSize + 'px monospace';

    contactDrops.forEach((y, index) => {
      const text = contactLetters[Math.floor(Math.random() * contactLetters.length)];
      contactCtx.fillStyle = contactColors[Math.floor(Math.random() * contactColors.length)];
      contactCtx.fillText(text, index * contactFontSize, y * contactFontSize);

      if (y * contactFontSize > contactBinaryCanvas.height && Math.random() > 0.975) {
        contactDrops[index] = 0;
      }

      contactDrops[index]++;
    });
  };

  setInterval(drawContactBinary, 40);
}

