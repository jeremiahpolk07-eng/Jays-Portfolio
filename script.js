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

// Onboarding agreement PDF generation
const onboardingForm = document.getElementById('onboardingForm');

if (onboardingForm) {
  const packageField = document.getElementById('packageField');
  const submitConfirmation = document.getElementById('submitConfirmation');
  const formSection = document.querySelector('.form-section');
  const onboardingStatus = document.getElementById('onboardingStatus');
  const packageParam = new URLSearchParams(window.location.search).get('package');

  if (packageParam && packageField) {
    packageField.value = packageParam;
  }

  onboardingForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!window.jspdf || !window.jspdf.jsPDF) {
      if (onboardingStatus) {
        onboardingStatus.textContent = 'Unable to generate the agreement right now. Please try again.';
        onboardingStatus.style.color = '#f87171';
      }
      return;
    }

    if (onboardingStatus) {
      onboardingStatus.textContent = 'Sending your application...';
      onboardingStatus.style.color = '#dce6fb';
    }

    const { jsPDF } = window.jspdf;
    const name = document.getElementById('name')?.value ?? '';
    const email = document.getElementById('email')?.value ?? '';
    const phone = document.getElementById('phone')?.value ?? '';
    const selectedPackage = packageField?.value || 'Not selected';
    const project = onboardingForm.querySelector('[name="project"]')?.value ?? '';
    const features = document.getElementById('features')?.value ?? '';
    const timeline = document.getElementById('timeline')?.value ?? '';
    const inspiration = document.getElementById('inspiration')?.value ?? '';
    const selectedAddons = Array.from(onboardingForm.querySelectorAll('input[name="addons"]:checked')).map((input) => input.value);
    const uploadedFiles = Array.from(document.getElementById('project-files')?.files ?? []).map((file) => file.name);
    const signature = document.getElementById('signature')?.value ?? '';
    const date = new Date().toLocaleString();
    const dateField = document.getElementById('dateField');
    const termsText = [
      'Project Scope: All work is based on the scope discussed during onboarding, proposal review, and follow-up communication. Any features or deliverables added after approval may require a revised timeline and updated pricing.',
      'Payments: Projects may require a deposit before work begins. Final files, deployment, transfers, or launch support may be withheld until the outstanding balance is paid in full.',
      'Revisions: Reasonable revisions are included within the agreed service package. Major redesigns, new pages, or new functionality requested after approval may be billed separately.',
      'Client Responsibilities: The client agrees to provide accurate content, brand assets, and required access in a timely manner, review deliverables promptly, and confirm submitted materials do not infringe on third-party rights.',
      'Ownership and Usage: After final payment, the client owns the approved final deliverables unless otherwise stated. SZN STACKZ may display completed work in a portfolio unless a separate confidentiality agreement is in place.',
      'Limitation: SZN STACKZ is not responsible for losses caused by third-party services, hosting outages, domain issues, client-provided content, or changes made by others after project delivery.'
    ];

    if (dateField) {
      dateField.value = date;
    }

    const doc = new jsPDF();
    const pageHeight = doc.internal.pageSize.getHeight();
    const pageWidth = doc.internal.pageSize.getWidth();
    const left = 20;
    const right = 20;
    const maxWidth = pageWidth - left - right;
    let y = 20;

    const ensureSpace = (heightNeeded) => {
      if (y + heightNeeded > pageHeight - 20) {
        doc.addPage();
        y = 20;
      }
    };

    const addWrappedBlock = (text, fontSize = 11) => {
      doc.setFontSize(fontSize);
      const lines = doc.splitTextToSize(text, maxWidth);
      ensureSpace(lines.length * 6 + 2);
      doc.text(lines, left, y);
      y += lines.length * 6 + 4;
    };

    const addLabelValue = (label, value) => {
      addWrappedBlock(`${label}: ${value || 'N/A'}`);
    };

    const addSectionHeading = (title) => {
      ensureSpace(12);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(13);
      doc.text(title, left, y);
      y += 8;
      doc.setFont('helvetica', 'normal');
    };

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text('SZN STACKZ CLIENT AGREEMENT', left, y);
    y += 12;
    doc.setFont('helvetica', 'normal');

    addSectionHeading('Client Information');
    addLabelValue('Name', name);
    addLabelValue('Email', email);
    addLabelValue('Phone', phone);
    addLabelValue('Selected Package', selectedPackage);

    addSectionHeading('Project Details');
    addLabelValue('Website Goals', project);
    addLabelValue('Key Features Needed', features);
    addLabelValue('Timeline', timeline);
    addLabelValue('Inspiration', inspiration);
    addLabelValue('Selected Add-ons', selectedAddons.length ? selectedAddons.join(', ') : 'None selected');
    addLabelValue('Uploaded Files', uploadedFiles.length ? uploadedFiles.join(', ') : 'No files uploaded');

    addSectionHeading('Terms & Conditions');
    termsText.forEach((term) => addWrappedBlock(term));

    addSectionHeading('Acceptance');
    addWrappedBlock('By signing below, the client confirms that the onboarding information above is accurate and agrees to the SZN STACKZ Terms & Conditions and Privacy Policy.');
    addLabelValue('Digital Signature', signature);
    addLabelValue('Agreement Date', date);

    const pdfBlob = doc.output('blob');
    const contractText = [
      'SZN STACKZ CLIENT AGREEMENT',
      '',
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Selected Package: ${selectedPackage}`,
      '',
      'Project Details',
      `Website Goals: ${project || 'N/A'}`,
      `Key Features Needed: ${features || 'N/A'}`,
      `Timeline: ${timeline || 'N/A'}`,
      `Inspiration: ${inspiration || 'N/A'}`,
      `Selected Add-ons: ${selectedAddons.length ? selectedAddons.join(', ') : 'None selected'}`,
      `Uploaded Files: ${uploadedFiles.length ? uploadedFiles.join(', ') : 'No files uploaded'}`,
      '',
      'Terms & Conditions',
      ...termsText,
      '',
      'Acceptance',
      'By signing below, the client confirms that the onboarding information above is accurate and agrees to the SZN STACKZ Terms & Conditions and Privacy Policy.',
      `Digital Signature: ${signature}`,
      `Agreement Date: ${date}`
    ].join('\n');

    const buildSubmissionData = ({ includePdf }) => {
      const formData = new FormData();

      formData.append('_subject', 'New SZN STACKZ onboarding application');
      formData.append('name', name);
      formData.append('email', email);
      formData.append('_replyto', email);
      formData.append('phone', phone);
      formData.append('package', selectedPackage);
      formData.append('project', project);
      formData.append('features', features || 'N/A');
      formData.append('timeline', timeline || 'N/A');
      formData.append('inspiration', inspiration || 'N/A');
      formData.append('addons', selectedAddons.length ? selectedAddons.join(', ') : 'None selected');
      formData.append('uploaded_file_names', uploadedFiles.length ? uploadedFiles.join(', ') : 'No files uploaded');
      formData.append('signature', signature);
      formData.append('date', date);
      formData.append('contract_text', contractText);
      formData.append('recipient_email', 'jeremiahpolk07@gmail.com');

      if (includePdf) {
        formData.append('generated_contract', pdfBlob, 'SZN_STACKZ_Agreement.pdf');
      }

      return formData;
    };

    const action = onboardingForm.getAttribute('action');
    if (action) {
      try {
        let response = await fetch(action, {
          method: onboardingForm.method || 'POST',
          body: buildSubmissionData({ includePdf: true }),
          headers: { Accept: 'application/json' }
        });

        if (!response.ok) {
          response = await fetch(action, {
            method: onboardingForm.method || 'POST',
            body: buildSubmissionData({ includePdf: false }),
            headers: { Accept: 'application/json' }
          });
        }

        if (!response.ok) {
          throw new Error(`Submission failed with status ${response.status}`);
        }
      } catch (error) {
        console.error('Onboarding form submission failed:', error);
        if (onboardingStatus) {
          onboardingStatus.textContent = 'Something went wrong while sending your application. Please try again.';
          onboardingStatus.style.color = '#f87171';
        }
        return;
      }
    }

    if (onboardingStatus) {
      onboardingStatus.textContent = '';
    }

    if (formSection) {
      formSection.hidden = true;
    }

    if (submitConfirmation) {
      submitConfirmation.hidden = false;
      submitConfirmation.classList.add('is-visible');
    }

    window.setTimeout(() => {
      window.location.href = 'index.html';
    }, 2500);
  });
}