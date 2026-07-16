(() => {
  const year = document.getElementById("year");
  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  const motionQuery = window.matchMedia("(prefers-reduced-motion: no-preference)");
  if (motionQuery.matches) {
    document.documentElement.classList.add("has-motion");
  }

  const header = document.querySelector(".site-header");
  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const revealTargets = document.querySelectorAll(
    ".section__intro, .feature, .about__grid, .stack__list, .contact .section__lead, .contact__actions"
  );

  const showAll = () => {
    revealTargets.forEach((el) => el.classList.add("is-visible"));
  };

  if (!motionQuery.matches) {
    return;
  }

  revealTargets.forEach((el) => el.classList.add("reveal"));

  // Failsafe: never leave content permanently hidden
  window.setTimeout(showAll, 1800);

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -4% 0px" }
    );
    revealTargets.forEach((el) => observer.observe(el));
  } else {
    showAll();
  }
})();
