document.addEventListener("DOMContentLoaded", () => {
  const hamburger        = document.getElementById("hamburger");
  const sidebar          = document.getElementById("sidebar");
  const overlay          = document.getElementById("overlay");
  const projectsToggle   = document.getElementById("projects-toggle");
  const projectsDropdown = document.getElementById("projects-dropdown");
  const lightbox      = document.getElementById("lightbox");
  const lightboxImg   = document.getElementById("lightbox-img");
  const lightboxClose = document.getElementById("lightbox-close");

  // ── Hamburger: open/close sidebar ──
  function toggleMenu() {
    const isOpen = sidebar.classList.toggle("open");
    hamburger.classList.toggle("open", isOpen);
    overlay.classList.toggle("visible", isOpen);

    // Reset and replay animation on each open
    if (isOpen) {
      document.querySelectorAll(".sidebar ul li").forEach(li => {
        li.style.animation = "none";
        li.offsetHeight; // force reflow
        li.style.animation = "";
      });
    }
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

  if (projectsToggle) {
    projectsToggle.addEventListener("click", () => {
      const isOpen = projectsDropdown.classList.toggle("open");
      projectsToggle.classList.toggle("open", isOpen);
    });
  }

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
  // document.getElementById("contact-form").addEventListener("submit", function(e) {
  //   e.preventDefault();
  //   const name = document.getElementById("name").value;
  //   document.getElementById("form-message").textContent =
  //     `Thanks, ${name}! Your message has been received. ✅`;
  //   this.reset();
  // });
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function(e) {
      e.preventDefault();
      const name = document.getElementById("name").value;
      document.getElementById("form-message").textContent =
        `Thanks, ${name}! Your message has been received. ✅`;
      this.reset();
    });
  }


  // Open box when an image is clicked
  document.querySelectorAll(".lightbox-trigger").forEach(img => {
    img.addEventListener("click", () => {
      lightboxImg.src = img.getAttribute("data-src");
      lightboxImg.alt = img.alt;
      lightbox.classList.add("open");
      document.getElementById("lightbox-caption").textContent = img.alt;
      document.body.style.overflow = "hidden"; // prevent background scrolling
    });
  });

  // Close on X button
  lightboxClose.addEventListener("click", closeLightbox);

  // Close on clicking outside the image
  lightbox.addEventListener("click", e => {
    if (e.target === lightbox) closeLightbox();
  });

  // Close on pressing Escape key
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeLightbox();
  });

  function closeLightbox() {
    lightbox.classList.remove("open");
    lightboxImg.src = "";
    document.getElementById("lightbox-caption").textContent = "";
    document.body.style.overflow = ""; // restore scrolling
  }
});