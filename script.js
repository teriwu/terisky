const hamburger        = document.getElementById("hamburger");
const sidebar          = document.getElementById("sidebar");
const overlay          = document.getElementById("overlay");
const projectsToggle   = document.getElementById("projects-toggle");
const projectsDropdown = document.getElementById("projects-dropdown");

// ── Hamburger: open/close sidebar ──
function toggleMenu() {
  const isOpen = sidebar.classList.toggle("open");
  hamburger.classList.toggle("open", isOpen);
  overlay.classList.toggle("visible", isOpen);
}

function closeMenu() {
  sidebar.classList.remove("open");
  hamburger.classList.remove("open");
  overlay.classList.remove("visible");
}

hamburger.addEventListener("click", toggleMenu);
overlay.addEventListener("click", closeMenu);

// ── Projects dropdown: toggle open/close ──
function closeDropdown() {
  projectsToggle.classList.remove("open");
  projectsDropdown.classList.remove("open");
}

projectsToggle.addEventListener("click", () => {
  const isOpen = projectsDropdown.classList.toggle("open");
  projectsToggle.classList.toggle("open", isOpen);
});

// ── Nav links: smooth scroll + close sidebar on mobile ──
document.querySelectorAll(".nav-link").forEach(link => {
  // Skip the dropdown toggle button — it has its own handler
  if (link.id === "projects-toggle") return;

  link.addEventListener("click", e => {
    const href = link.getAttribute("href");
    if (href && href.startsWith("#") && href.length > 1) {
      e.preventDefault();
      closeDropdown();
      closeMenu();
      setTimeout(() => {
        document.querySelector(href).scrollIntoView({ behavior: "smooth" });
      }, 300);
    } else {
      closeDropdown();
      closeMenu();
    }
  });
});

// ── Contact form ──
document.getElementById("contact-form").addEventListener("submit", function(e) {
  e.preventDefault();
  const name = document.getElementById("name").value;
  document.getElementById("form-message").textContent =
    `Thanks, ${name}! Your message has been received. ✅`;
  this.reset();
});
