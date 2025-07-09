document.addEventListener("DOMContentLoaded", function () {
  // === Navbar toggle ===
  const toggle = document.getElementById("nav-toggle");
  const label = document.querySelector(".nav-toggle-label");
  const navLinks = document.querySelector(".nav-links");

  document.addEventListener("mousedown", function (event) {
    const clickedInside = label.contains(event.target) || navLinks.contains(event.target);
    if (!clickedInside && toggle.checked) {
      toggle.checked = false;
    }
  });

  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
      toggle.checked = false;
    });
  });

  // === Theme Toggle ===
  const themeToggle = document.getElementById('theme-switch');
  const body = document.body;

  // Apply stored theme
  if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.checked = true;
  }

  // Theme switch change event
  themeToggle.addEventListener('change', () => {
    body.classList.toggle('dark-mode');
    localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
  });
});
