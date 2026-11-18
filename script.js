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

  // Projects Horizontal Carousel / Slider
  const slider = document.getElementById("projectsSlider");
  const prevBtn = document.getElementById("projectPrevBtn");
  const nextBtn = document.getElementById("projectNextBtn");
  const dotsContainer = document.getElementById("carouselDots");

  if (slider) {
    const cards = slider.querySelectorAll(".project-card");

    // Generate pagination dots
    if (dotsContainer && cards.length > 0) {
      dotsContainer.innerHTML = "";
      cards.forEach((_, idx) => {
        const dot = document.createElement("button");
        dot.className = `carousel-dot ${idx === 0 ? "active" : ""}`;
        dot.setAttribute("aria-label", `Menuju projek ke-${idx + 1}`);
        dot.addEventListener("click", () => {
          cards[idx].scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
        });
        dotsContainer.appendChild(dot);
      });
    }

    // Update active dot and arrow button disabled state on scroll
    const updateCarouselState = () => {
      const scrollLeft = slider.scrollLeft;
      const maxScroll = slider.scrollWidth - slider.clientWidth;

      if (prevBtn) {
        prevBtn.classList.toggle("btn-disabled", scrollLeft <= 5);
      }
      if (nextBtn) {
        nextBtn.classList.toggle("btn-disabled", scrollLeft >= maxScroll - 5);
      }

      if (dotsContainer) {
        const dots = dotsContainer.querySelectorAll(".carousel-dot");
        let activeIndex = 0;
        let minDiff = Infinity;

        cards.forEach((card, idx) => {
          const cardOffset = card.offsetLeft - slider.offsetLeft;
          const diff = Math.abs(cardOffset - scrollLeft);
          if (diff < minDiff) {
            minDiff = diff;
            activeIndex = idx;
          }
        });

        dots.forEach((dot, idx) => {
          dot.classList.toggle("active", idx === activeIndex);
        });
      }
    };

    slider.addEventListener("scroll", updateCarouselState, { passive: true });
    updateCarouselState();

    // Arrow button click handlers
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        const cardWidth = cards[0] ? cards[0].offsetWidth + 28 : 380;
        slider.scrollBy({ left: cardWidth, behavior: "smooth" });
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        const cardWidth = cards[0] ? cards[0].offsetWidth + 28 : 380;
        slider.scrollBy({ left: -cardWidth, behavior: "smooth" });
      });
    }

    // Smooth drag-to-scroll for desktop mouse
    let isDown = false;
    let startX = 0;
    let scrollLeftPos = 0;

    slider.addEventListener("mousedown", (e) => {
      if (e.target.closest("a") || e.target.closest("button")) return;
      isDown = true;
      startX = e.pageX - slider.offsetLeft;
      scrollLeftPos = slider.scrollLeft;
    });

    slider.addEventListener("mouseleave", () => {
      isDown = false;
    });

    slider.addEventListener("mouseup", () => {
      isDown = false;
    });

    slider.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 1.5;
      slider.scrollLeft = scrollLeftPos - walk;
    });
  }
});
