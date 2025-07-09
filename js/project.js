document.addEventListener("DOMContentLoaded", () => {
  // ================= Theme Toggle ================= //
  const themeSwitch = document.getElementById("theme-switch");
  const body = document.body;

  // Apply previously selected theme
  if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-mode");
    if (themeSwitch) themeSwitch.checked = true;
  }

  // Toggle theme and save preference
  if (themeSwitch) {
    themeSwitch.addEventListener("change", () => {
      body.classList.toggle("dark-mode");
      localStorage.setItem("theme", body.classList.contains("dark-mode") ? "dark" : "light");
    });
  }

  // ================= Navbar Toggle Close ================= //
  const toggle = document.getElementById("nav-toggle");
  const label = document.querySelector(".nav-toggle-label");
  const navLinks = document.querySelector(".nav-links");

  // Close menu on outside click
  document.addEventListener("mousedown", function (event) {
    const clickedInside = label.contains(event.target) || navLinks.contains(event.target);
    if (!clickedInside && toggle && toggle.checked) {
      toggle.checked = false;
    }
  });

  // Close menu on nav link click
  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
      if (toggle) toggle.checked = false;
    });
  });

  // ================= Project Navigation ================= //
  const projects = document.querySelectorAll('.project-section');
  let currentProject = 0;
  let isTransitioning = false;

  function showProject(index) {
    if (isTransitioning || index === currentProject) return;
    isTransitioning = true;

    projects[currentProject].classList.remove('active');
    projects[index].classList.add('active');
    currentProject = index;

    setTimeout(() => {
      isTransitioning = false;
    }, 300);
  }

  function goNext() {
    const nextIndex = (currentProject + 1) % projects.length;
    showProject(nextIndex);
  }

  function goPrev() {
    const prevIndex = (currentProject - 1 + projects.length) % projects.length;
    showProject(prevIndex);
  }

  // Chevron click events
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  if (prevBtn) prevBtn.addEventListener('click', goPrev);
  if (nextBtn) nextBtn.addEventListener('click', goNext);

  // Keyboard arrow support
  window.addEventListener('keydown', (e) => {
    if (e.key === "ArrowRight") goNext();
    if (e.key === "ArrowLeft") goPrev();
  });

  // ================= Adjust marquee speeds ================= //
  const marquees = document.querySelectorAll('.marquee-content');

  marquees.forEach(marquee => {
    const contentWidth = marquee.scrollWidth;
    const speed = 80; // pixels per second (adjust this value as needed)

    const duration = contentWidth / speed; // duration in seconds
    marquee.style.animationDuration = `${duration}s`;
  });
});
