document.addEventListener("DOMContentLoaded", function () {
  // Typing animation
  const texts = ["Web Developer", "UI/UX Designer", "QA Engineer"];
  let count = 0;
  let index = 0;
  let currentText = '';
  let isDeleting = false;

  function type() {
    const element = document.querySelector(".typed-text");
    if (!element) return;

    const fullText = texts[count];

    if (isDeleting) {
      currentText = fullText.substring(0, index--);
    } else {
      currentText = fullText.substring(0, index++);
    }

    element.textContent = currentText;

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && currentText === fullText) {
      typeSpeed = 1000;
      isDeleting = true;
    } else if (isDeleting && currentText === '') {
      isDeleting = false;
      count = (count + 1) % texts.length;
      typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
  }

  type();

  // Scroll animations
  const animatedElements = document.querySelectorAll('.animate-on-scroll');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      } else {
        entry.target.classList.remove('visible');
      }
    });
  }, {
    threshold: 0.1
  });

  animatedElements.forEach(el => observer.observe(el));

  // Navbar toggle close on outside click
  const toggle = document.getElementById("nav-toggle");
  const label = document.querySelector(".nav-toggle-label");
  const navLinks = document.querySelector(".nav-links");

  document.addEventListener("mousedown", function (event) {
    const clickedInside = label.contains(event.target) || navLinks.contains(event.target);
    if (!clickedInside && toggle.checked) {
      toggle.checked = false;
    }
  });

  // Close menu when nav link is clicked
  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
      toggle.checked = false;
    });
  });

  // Custom theme switch toggle logic
  const themeSwitch = document.getElementById("theme-switch");
  const body = document.body;

  // Apply previously selected theme
  if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-mode");
    if (themeSwitch) themeSwitch.checked = true;
  }

  if (themeSwitch) {
    themeSwitch.addEventListener("change", () => {
      body.classList.toggle("dark-mode");
      localStorage.setItem("theme", body.classList.contains("dark-mode") ? "dark" : "light");
    });
  }

  // ✅ Mail button logic inside DOMContentLoaded
  const mailBtn = document.getElementById("mailMe");
  if (mailBtn) {
    mailBtn.addEventListener("click", function (e) {
      e.preventDefault();
      const email = "vinayagamoorthyshanjeyan@gmail.com";
      const subject = encodeURIComponent("Hello from your website!");
      const body = encodeURIComponent("Hi Shanjeyan,\n\nI wanted to get in touch with you regarding...");
      const mailtoLink = `mailto:${email}?subject=${subject}&body=${body}`;
      window.location.href = mailtoLink;
    });
  }
});
