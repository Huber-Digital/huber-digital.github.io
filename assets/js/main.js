(() => {
  const root = document.documentElement;
  const toggle = document.getElementById("themeToggle");
  const label = toggle ? toggle.querySelector(".theme-toggle-label") : null;

  const setTheme = (theme) => {
    root.setAttribute("data-bs-theme", theme);
    root.setAttribute("data-theme", theme);
    if (toggle) {
      const isDark = theme === "dark";
      toggle.setAttribute("aria-pressed", String(isDark));
      if (label) {
        label.textContent = isDark ? "Light" : "Dark";
      }
    }
  };

  const stored = localStorage.getItem("theme");
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initialTheme = stored || (prefersDark ? "dark" : "light");
  setTheme(initialTheme);

  if (toggle) {
    toggle.addEventListener("click", () => {
      const current = root.getAttribute("data-bs-theme");
      const next = current === "dark" ? "light" : "dark";
      localStorage.setItem("theme", next);
      setTheme(next);
    });
  }

  const animatedItems = document.querySelectorAll("[data-animate]");
  animatedItems.forEach((item) => item.classList.add("animate-in"));

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    animatedItems.forEach((item) => observer.observe(item));
  } else {
    animatedItems.forEach((item) => item.classList.add("is-visible"));
  }

  const year = document.getElementById("year");
  if (year) {
    year.textContent = new Date().getFullYear();
  }
})();
