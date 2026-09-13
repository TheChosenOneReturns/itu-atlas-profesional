import { animate, hover, stagger } from "motion";

const prefersReducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
const clock = document.querySelector("#local-clock");

function updateLocalClock() {
  const now = new Date();
  clock.textContent = [now.getHours(), now.getMinutes(), now.getSeconds()].map(value => String(value).padStart(2, "0")).join(":");
  clock.dateTime = now.toISOString();
}

updateLocalClock();
setInterval(updateLocalClock, 1000);

if (!prefersReducedMotion.matches) {
  animate(".gateway-header", { opacity: [0, 1], y: [-14, 0] }, { duration: 0.65, ease: "easeOut" });
  animate(".protocol-row, .welcome-strap, .hero h1, .manifesto, .hero-actions, .hero-metrics", {
    opacity: [0, 1], y: [20, 0]
  }, { duration: 0.68, delay: stagger(0.1, { startDelay: 0.12 }), ease: "easeOut" });
  animate(".hud-console", { opacity: [0, 1], x: [34, 0], scale: [0.97, 1] }, { duration: 0.8, delay: 0.36, ease: "easeOut" });
  animate(".feature-card", { opacity: [0, 1], y: [24, 0] }, { duration: 0.6, delay: stagger(0.1, { startDelay: 0.65 }), ease: "easeOut" });
  animate(".radar-point", { opacity: [0.3, 1], scale: [0.6, 1] }, { duration: 0.55, delay: stagger(0.16, { startDelay: 0.8 }), ease: "easeOut" });

  hover(".hero-actions a, .feature-card, .console-links a", element => {
    animate(element, { scale: 1.015 }, { type: "spring", stiffness: 440, damping: 32 });
    return () => animate(element, { scale: 1 }, { type: "spring", stiffness: 440, damping: 32 });
  });
}
