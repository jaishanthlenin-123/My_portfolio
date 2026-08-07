// ==========================================================================
// Nav background intensifies on scroll
// ==========================================================================
const navEl = document.querySelector('nav');
window.addEventListener('scroll', () => {
  navEl.style.background = window.scrollY > 20
    ? 'rgba(0,0,0,0.8)'
    : 'rgba(0,0,0,0.7)';
});

// ==========================================================================
// Scroll reveal (fade-up on intersect)
// ==========================================================================
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

function observeReveal(el) {
  io.observe(el);
}
document.querySelectorAll('.reveal').forEach(observeReveal);

// ==========================================================================
// Smooth anchor scroll offset for fixed nav
// ==========================================================================
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (target) {
      e.preventDefault();
      window.scrollTo({ top: target.offsetTop - 64, behavior: 'smooth' });
    }
  });
});

// ==========================================================================
// Shared modal controller — focus trap, ESC, click-outside, scroll lock
// Reused by both the ProtoSem modal and the Weekly Update modal.
// ==========================================================================
function createModalController(overlayEl) {
  const dialog = overlayEl.querySelector('.modal-dialog');
  const closeBtn = overlayEl.querySelector('.modal-close');
  let lastFocused = null;
  let onKeydown = null;

  function getFocusable() {
    return Array.from(
      dialog.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
    ).filter(el => !el.disabled && el.offsetParent !== null);
  }

  function trapFocus(e) {
    if (e.key === 'Escape') {
      close();
      return;
    }
    if (e.key === 'Tab') {
      const focusable = getFocusable();
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  function open(triggerEl) {
    lastFocused = triggerEl || document.activeElement;
    overlayEl.classList.add('is-open');
    overlayEl.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    dialog.focus();
    onKeydown = trapFocus;
    document.addEventListener('keydown', onKeydown);
  }

  function close() {
    overlayEl.classList.remove('is-open');
    overlayEl.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    if (onKeydown) document.removeEventListener('keydown', onKeydown);
    if (lastFocused) lastFocused.focus();
  }

  closeBtn.addEventListener('click', close);
  overlayEl.addEventListener('click', (e) => {
    if (e.target === overlayEl) close();
  });

  return { open, close, dialog };
}

// ==========================================================================
// ProtoSem project data — single source of truth for the project modal
// ==========================================================================
const protoProjects = {
  ductbot: {
    title: "DuctBot",
    duration: "6 Weeks",
    overview: "Autonomous robot designed to clean commercial kitchen exhaust ducts without manual entry.",
    problem: "Manual duct cleaning is dangerous, slow, and requires shutting down kitchens.",
    solution: "The robot moves through ducts using an adaptive chassis, rotating brushes, high-pressure water jets, and degreasing chemicals while providing live camera feedback.",
    features: ["Autonomous movement", "Adaptive chassis", "High-pressure cleaning", "Rotating scrubber", "Waterproof camera", "Live inspection", "Grease removal"],
    tech: ["Robotics", "Embedded Systems", "CAD", "Product Design"],
    challenges: "Designing a chassis that could adapt to variable duct widths and corners while staying watertight around the camera and electronics was the biggest engineering hurdle, alongside balancing brush pressure against duct material wear.",
    outcome: "A working prototype capable of navigating standard commercial duct sections, removing grease buildup, and streaming live footage for inspection — cutting manual cleaning downtime significantly."
  },
  ductoid: {
    title: "Ductoid",
    duration: "5 Weeks",
    overview: "AI-powered inspection system that continuously monitors commercial kitchen ducts.",
    problem: "Grease accumulation is difficult to detect until maintenance becomes urgent.",
    solution: "Uses AI and computer vision to inspect ducts, detect grease buildup, and notify maintenance teams before blockages become critical.",
    features: ["AI inspection", "Computer Vision", "IoT Sensors", "Live Monitoring", "Grease Detection", "Predictive Maintenance"],
    tech: ["AI", "Computer Vision", "IoT", "Sensors"],
    challenges: "Training a vision model to reliably distinguish early-stage grease buildup from normal duct surface variation in low-light, narrow spaces, while keeping the sensor package small enough to fit inline.",
    outcome: "A functioning monitoring pipeline that flags grease accumulation trends over time and issues maintenance alerts before ducts reach a critical fire-risk threshold."
  },
  drone: {
    title: "Fire Resistant Rescue Drone",
    duration: "7 Weeks",
    overview: "Drone built using fire-resistant materials for locating trapped people inside burning buildings.",
    problem: "First responders often can't safely enter burning structures early enough to locate trapped occupants, costing critical time in rescue operations.",
    solution: "A fire-resistant drone frame equipped with thermal imaging and AI-based detection flies ahead of responders to scan rooms, identify body heat signatures, and relay a live map of likely survivor locations.",
    features: ["Fire-resistant frame", "Thermal imaging", "AI person detection", "Live video relay", "Heat-resistant wiring", "Manual override control"],
    tech: ["Drones", "AI", "Thermal Imaging", "Embedded Systems"],
    challenges: "Sourcing lightweight materials that could tolerate sustained high heat without adding excess weight, and keeping onboard electronics cool enough to function reliably during flight through hot, smoke-filled rooms.",
    outcome: "A flight-tested prototype able to survive short exposure to high-heat environments while successfully identifying heat signatures and relaying location data back to a ground unit."
  }
};

(function initProtoModal() {
  const overlay = document.getElementById('proto-modal');
  if (!overlay) return;
  const controller = createModalController(overlay);

  const titleEl = document.getElementById('modal-title');
  const durationEl = document.getElementById('modal-duration');
  const overviewEl = document.getElementById('modal-overview');
  const problemEl = document.getElementById('modal-problem');
  const solutionEl = document.getElementById('modal-solution');
  const featuresEl = document.getElementById('modal-features');
  const techEl = document.getElementById('modal-tech');
  const challengesEl = document.getElementById('modal-challenges');
  const outcomeEl = document.getElementById('modal-outcome');

  function render(key) {
    const data = protoProjects[key];
    if (!data) return;
    titleEl.textContent = data.title;
    durationEl.textContent = data.duration;
    overviewEl.textContent = data.overview;
    problemEl.textContent = data.problem;
    solutionEl.textContent = data.solution;
    challengesEl.textContent = data.challenges;
    outcomeEl.textContent = data.outcome;
    featuresEl.innerHTML = data.features.map(f => `<li>${f}</li>`).join('');
    techEl.innerHTML = data.tech.map(t => `<span class="chip">${t}</span>`).join('');
  }

  document.querySelectorAll('.btn-view-details').forEach(btn => {
    btn.addEventListener('click', () => {
      render(btn.getAttribute('data-project'));
      controller.open(btn);
    });
  });
})();

// ==========================================================================
// Weekly Updates — single data array, rendered dynamically via .map(),
// with a reusable detail modal and Previous/Next navigation.
// ==========================================================================
const weeklyUpdates = [
    {
    week: 0,
    dates: "Jul 20 – Jul 24",
    status: "completed",
    title: "ProtoSem Orientation & Team Building",

    summaryShort: "Participated in team-building activities, won the Marshmallow Tower Challenge, completed the 16 Personalities assessment, and presented a Zen Pencils comic.",

    summary: "Started the ProtoSem journey by participating in orientation and team-building activities. Worked with a team in the Marshmallow Tower Challenge, where we built the tallest tower using sticks and a marshmallow and won the activity. Completed the 16 Personalities assessment, identifying my personality type as ESFJ-T (Consul), and gained insights into my personal strengths and teamwork style. Also participated in a Zen Pencils comic activity, where I analyzed a comic, related its message to real-life experiences, and presented my interpretation to the group.",

    goals: [
        "Build teamwork and collaboration skills",
        "Develop problem-solving and creative thinking",
        "Understand personal strengths through personality assessment",
        "Improve communication and presentation skills"
    ],

    completed: [
        "Participated in the Marshmallow Tower Challenge",
        "Won the Marshmallow Tower Challenge with my team",
        "Completed the 16 Personalities assessment (ESFJ-T - Consul)",
        "Analyzed and presented a Zen Pencils comic by relating its message to real-life experiences"
    ],

    challenges: "Collaborating effectively within the team, designing a stable tower under time constraints, balancing height with structural stability during the Marshmallow Tower Challenge, and confidently presenting the message and real-life relevance of the assigned Zen Pencils comic.",

    skills: [
        "Teamwork",
        "Communication",
        "Problem Solving",
        "Critical Thinking",
        "Creativity",
        "Presentation",
        "Storytelling",
        "Collaboration"
    ],

    tech: [
        "16 Personalities Assessment",
        "Zen Pencils Comics",
        "Team Building"
    ],

    achievements: [
        "Won the Marshmallow Tower Challenge with my team",
        "Identified my personality type as ESFJ-T (Consul)",
        "Successfully presented and explained a Zen Pencils comic",
        "Strengthened teamwork, communication, and presentation skills"
    ],

    images: [
        "images/week0/a.png",
        "images/week0/b.png",
        "images/week0/c.png",
        "images/week0/d.png"
    ]
},
  {
    week: 1,
    dates: "Jul 27 – Jul 31",
    status: "completed",
    title: "Tech Talk & 5S Implementation",

    summaryShort: "Delivered a Tech Talk on Brain-Computer Interfaces, participated in the 5S activity, and worked in the Battery Team inspecting adapters.",

    summary: "During the second week of ProtoSem, I delivered a Tech Talk on Brain-Computer Interfaces (BCI), discussing its applications, benefits, challenges, and future potential. I also actively participated in the 5S workplace organization activity as a member of the Battery Team, where I was responsible for checking and organizing battery adapters to ensure they were properly identified, functional, and stored.",

    goals: [
        "Improve public speaking and presentation skills",
        "Explore emerging technologies",
        "Apply 5S principles in a practical environment",
        "Develop teamwork and workplace organization skills"
    ],

    completed: [
        "Delivered a Tech Talk on Brain-Computer Interfaces (BCI)",
        "Explained BCI applications, benefits, challenges, and future scope",
        "Participated in the 5S implementation activity",
        "Worked in the Battery Team",
        "Inspected and organized battery adapters"
    ],

    challenges: "Presenting technical concepts confidently to the audience, managing presentation time effectively, and ensuring all battery adapters were correctly checked and organized during the 5S activity.",

    skills: [
        "Public Speaking",
        "Presentation",
        "Research",
        "Communication",
        "Teamwork",
        "Workplace Organization",
        "Attention to Detail"
    ],

    tech: [
        "Brain-Computer Interfaces",
        "5S Methodology",
        "Battery Management",
        "Presentation Skills"
    ],

    achievements: [
        "Successfully delivered a technical presentation on Brain-Computer Interfaces",
        "Contributed to the Battery Team during the 5S activity",
        "Improved confidence in public speaking and technical communication",
        "Applied 5S principles to organize and inspect workplace equipment"
    ],

    images: [
        "images/week1/a.png",
        "images/week1/b.png",
        "images/week1/c.png",
        "images/week1/d.png"
    ]
},
  {
    week: 2,
    dates: "Aug 3 – Aug 7",
    status: "completed",
    title: "Python, App Development & Design Thinking",

    summaryShort: "Attended sessions on Frugal Innovation and Applied Design Thinking, solved coding problems, learned Python basics, and developed applications using MIT App Inventor and Scratch.",

    summary: "During Week 2 of ProtoSem, I attended an interactive session on Frugal Innovation, where I learned how to develop cost-effective and impactful solutions using limited resources. I also participated in an Applied Design Thinking session that introduced a structured approach to understanding user needs and solving real-world problems. As part of the technical training, I covered Python programming fundamentals and solved five 'Think Like a Coder' programming challenges to strengthen my logical thinking. Additionally, I explored visual programming by developing applications using MIT App Inventor and creating interactive projects in Scratch.",

    goals: [
        "Learn the fundamentals of Python programming",
        "Develop logical thinking through coding challenges",
        "Understand the principles of Frugal Innovation",
        "Apply Design Thinking to solve real-world problems",
        "Build applications using visual programming tools"
    ],

    completed: [
        "Attended the Frugal Innovation session",
        "Participated in the Applied Design Thinking session",
        "Covered Python programming basics",
        "Solved five 'Think Like a Coder' programming problems",
        "Developed applications using MIT App Inventor",
        "Created interactive projects using Scratch"
    ],

    challenges: "Applying programming logic to solve coding problems, understanding new Python concepts, and designing functional applications using block-based programming tools.",

    skills: [
        "Python Programming",
        "Problem Solving",
        "Logical Thinking",
        "App Development",
        "Design Thinking",
        "Creativity",
        "Innovation"
    ],

    tech: [
        "Python",
        "MIT App Inventor",
        "Scratch",
        "Applied Design Thinking",
        "Frugal Innovation"
    ],

    achievements: [
        "Successfully completed five coding challenges",
        "Built applications using MIT App Inventor",
        "Developed interactive Scratch projects",
        "Strengthened Python programming fundamentals",
        "Learned practical approaches to innovation and design thinking"
    ],

    images: [
        "images/week2/a.png",
        "images/week2/b.jpeg",
        "images/week2/c.png",
        "images/week2/d.png"
    ]
},
  {
    week: 3,
    dates: "Aug 10 – Aug 14",
    status: "upcoming",
    title: "Prototype & Presentation",
    summaryShort: "Prepared ProtoSem presentation and finalized prototype design.",
    summary: "Completed prototype concept and prepared the ProtoSem presentation.",
    goals: ["Final documentation", "Presentation", "Design review"],
    completed: ["Finalized slides", "Prototype improvements", "Documentation"],
    challenges: "Time management.",
    skills: ["Presentation", "Project Management"],
    tech: ["Documentation", "Presentation"],
    achievements: ["Presentation deck finalized", "Prototype design locked in"],
    image:"images/week3.jpg"
  },
  {
    week: 4,
    dates: "Aug 17 – Aug 21",
    status: "upcoming",
    title: "Prototype & Presentation",
    summaryShort: "Prepared ProtoSem presentation and finalized prototype design.",
    summary: "Completed prototype concept and prepared the ProtoSem presentation.",
    goals: ["Final documentation", "Presentation", "Design review"],
    completed: ["Finalized slides", "Prototype improvements", "Documentation"],
    challenges: "Time management.",
    skills: ["Presentation", "Project Management"],
    tech: ["Documentation", "Presentation"],
    achievements: ["Presentation deck finalized", "Prototype design locked in"],
    image:"images/week3.jpg"
  }
];

(function initWeeklyUpdates() {
  const list = document.getElementById('timeline-list');
  const overlay = document.getElementById('week-modal');
  if (!list || !overlay) return;

  const statusLabel = { completed: "Completed", current: "In Progress", upcoming: "Upcoming" };
  const statusClass = { completed: "status-done", current: "status-progress",upcoming: "status-upcoming" };

  // ---- Render timeline dynamically from the weeklyUpdates array ----
  list.innerHTML = weeklyUpdates.map((w, i) => `
    <div class="timeline-item reveal" data-status="${w.status}" data-index="${i}" role="listitem" tabindex="0" aria-label="Week ${w.week}: ${w.title}, ${statusLabel[w.status]}">
      <div class="timeline-dot"></div>
      <div class="timeline-content">
        <div class="timeline-meta">
          <span class="week-tag">Week ${w.week}</span>
          <span class="status-badge ${statusClass[w.status]}">${statusLabel[w.status]}</span>
        </div>
        <h4>${w.title}</h4>
        <p>${w.summaryShort}</p>
      </div>
    </div>
  `).join('');

  // Newly injected .reveal items need to be observed for scroll-fade-in
  list.querySelectorAll('.reveal').forEach(observeReveal);

  // ---- Modal wiring ----
  const controller = createModalController(overlay);
  const numberEl = document.getElementById('week-modal-number');
  const statusEl = document.getElementById('week-modal-status');
  const datesEl = document.getElementById('week-modal-dates');
  const titleEl = document.getElementById('week-modal-title');
  const summaryEl = document.getElementById('week-modal-summary');
  const goalsEl = document.getElementById('week-modal-goals');
  const completedEl = document.getElementById('week-modal-completed');
  const challengesEl = document.getElementById('week-modal-challenges');
  const skillsEl = document.getElementById('week-modal-skills');
  const techEl = document.getElementById('week-modal-tech');
  const achievementsEl = document.getElementById('week-modal-achievements');
  const prevBtn = document.getElementById('week-prev-btn');
  const nextBtn = document.getElementById('week-next-btn');

  let selectedWeek = 0; // index into weeklyUpdates

  function renderWeek(index) {
    const w = weeklyUpdates[index];
    if (!w) return;

    numberEl.textContent = `Week ${w.week}`;
    statusEl.textContent = statusLabel[w.status];
    statusEl.className = `status-badge ${statusClass[w.status]}`;
    datesEl.textContent = w.dates;
    titleEl.textContent = w.title;
    summaryEl.textContent = w.summary;
    challengesEl.textContent = w.challenges;

    goalsEl.innerHTML = w.goals.map(g => `<li>${g}</li>`).join('');
    completedEl.innerHTML = w.completed.map(c => `<li>${c}</li>`).join('');
    skillsEl.innerHTML = w.skills.map(s => `<li>${s}</li>`).join('');
    achievementsEl.innerHTML = w.achievements.map(a => `<li>${a}</li>`).join('');
    techEl.innerHTML = w.tech.map(t => `<span class="chip">${t}</span>`).join('');

    // Display the image for the selected week
    const imagesEl = document.getElementById("week-modal-images");

if (imagesEl) {
    if (w.images && w.images.length > 0) {
        imagesEl.innerHTML = w.images.map(img => `
            <img src="${img}" alt="${w.title}">
        `).join("");
    } else {
        imagesEl.innerHTML = "<p>No images available.</p>";
    }
}

    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === weeklyUpdates.length - 1;
}

  function openWeek(index, triggerEl) {
    selectedWeek = index;
    renderWeek(selectedWeek);
    controller.open(triggerEl);
  }

  list.querySelectorAll('.timeline-item').forEach(item => {
    const idx = Number(item.getAttribute('data-index'));
    item.addEventListener('click', () => openWeek(idx, item));
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openWeek(idx, item);
      }
    });
  });

  prevBtn.addEventListener('click', () => {
    if (selectedWeek > 0) {
      selectedWeek -= 1;
      renderWeek(selectedWeek);
      controller.dialog.focus();
    }
  });

  nextBtn.addEventListener('click', () => {
    if (selectedWeek < weeklyUpdates.length - 1) {
      selectedWeek += 1;
      renderWeek(selectedWeek);
      controller.dialog.focus();
    }
  });

  // ---- Scroll-driven progress line fill ----
  function updateProgressLine() {
    const rect = list.getBoundingClientRect();
    const viewportH = window.innerHeight;
    const total = rect.height;
    if (total <= 0) return;

    // Fraction of the timeline that has scrolled past the viewport's middle
    const scrolled = (viewportH * 0.5) - rect.top;
    let pct = (scrolled / total) * 100;
    pct = Math.max(0, Math.min(100, pct));
    list.style.setProperty('--fill', pct + '%');
  }
  window.addEventListener('scroll', updateProgressLine, { passive: true });
  window.addEventListener('resize', updateProgressLine);
  updateProgressLine();
})();

// ==========================================================================
// EmailJS — contact form
// ==========================================================================

// Replace YOUR_PUBLIC_KEY with your EmailJS public key
// (EmailJS dashboard → Account → General → Public Key)
emailjs.init("E9Yqa7Mg4iP67r-sh");

(function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const statusEl = form.querySelector('.submit-status');
  const submitBtn = form.querySelector('.btn-transmit');
  const btnLabel = submitBtn.querySelector('.btn-label');

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function setStatus(message, type) {
    statusEl.textContent = message;
    statusEl.classList.remove('is-success', 'is-error');
    if (type) statusEl.classList.add(type);
    statusEl.classList.add('is-visible');
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const messageInput = document.getElementById('contact-message');

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    if (!name || !email || !message) {
      setStatus('Please fill in all fields.', 'is-error');
      return;
    }
    if (!isValidEmail(email)) {
      setStatus('Please enter a valid email address.', 'is-error');
      return;
    }

    submitBtn.disabled = true;
    btnLabel.textContent = 'Sending...';

    // Replace YOUR_SERVICE_ID and YOUR_TEMPLATE_ID with your EmailJS service and template IDs
    emailjs.sendForm('service_5ccwdw1', 'template_6zeaumx', form)
      .then(function () {
        setStatus('Message sent successfully.', 'is-success');
        form.reset();
      })
      .catch(function () {
        setStatus('Failed to send. Please try again.', 'is-error');
      })
      .finally(function () {
        submitBtn.disabled = false;
        btnLabel.textContent = 'Transmit Requirements';
      });
  });
})();