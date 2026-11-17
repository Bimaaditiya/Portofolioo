function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  if (!menu || !icon) return;

  const isOpen = menu.classList.toggle("open");
  icon.classList.toggle("open");
  icon.setAttribute("aria-expanded", isOpen ? "true" : "false");
}

// Close menu when clicking outside
document.addEventListener("click", function (event) {
  const hamburgerMenu = document.querySelector(".hamburger-menu");
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");

  if (hamburgerMenu && !hamburgerMenu.contains(event.target)) {
    if (menu && menu.classList.contains("open")) {
      menu.classList.remove("open");
      if (icon) {
        icon.classList.remove("open");
        icon.setAttribute("aria-expanded", "false");
      }
    }
  }
});

// Close menu on Escape key press
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    if (menu && menu.classList.contains("open")) {
      menu.classList.remove("open");
      if (icon) {
        icon.classList.remove("open");
        icon.setAttribute("aria-expanded", "false");
      }
    }
  }
});

// Set dynamic copyright year and experience tab active state
document.addEventListener("DOMContentLoaded", function () {
  const yearElement = document.getElementById("current-year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  const tabs = document.querySelectorAll(".exp-tab-btn");
  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      tabs.forEach(function (t) {
        t.classList.remove("active");
      });
      this.classList.add("active");
    });
  });
});
