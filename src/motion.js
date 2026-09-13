import { animate, hover, stagger } from "motion";

const reduced = matchMedia("(prefers-reduced-motion: reduce)");
const $ = (selector) => document.querySelector(selector);
let hoverCleanup = () => {};
let latestGraph = 0;

function animateIntro() {
  const overlay = $("#intro-overlay");
  if (!overlay || overlay.hidden || reduced.matches) return;
  const copy = overlay.querySelector(".intro-copy");
  animate(copy, { opacity: [0, 1], y: [24, 0], scale: [0.96, 1] }, { duration: 0.75, ease: "easeOut" });
  animate(copy.querySelectorAll(".eyebrow, h2, p, button"), { opacity: [0, 1], y: [15, 0] }, { delay: stagger(0.1, { startDelay: 0.17 }), duration: 0.5, ease: "easeOut" });
}

function animateGraph() {
  const id = ++latestGraph;
  hoverCleanup();
  hoverCleanup = () => {};
  if (reduced.matches) return;
  requestAnimationFrame(() => {
    if (id !== latestGraph) return;
    const graph = $("#graph");
    const nodes = [...graph.querySelectorAll(".graph-node")];
    const paths = [...graph.querySelectorAll("#edges path")];
    if (nodes.length) animate(nodes, { opacity: [0, 1] }, { duration: 0.52, delay: stagger(0.035, { startDelay: 0.08 }), ease: "easeOut" });
    if (paths.length) animate(paths, { opacity: [0, 0.92] }, { duration: 0.7, delay: stagger(0.045), ease: "easeOut" });
    hoverCleanup = hover(".graph-node", (node) => {
      const shell = node.querySelector(".node-shell");
      const icon = node.querySelector(".node-icon");
      if (shell) animate(shell, { scale: 1.035 }, { type: "spring", stiffness: 400, damping: 28 });
      if (icon) animate(icon, { rotate: [0, -8, 7, 0] }, { duration: 0.48 });
      return () => { if (shell) animate(shell, { scale: 1 }, { type: "spring", stiffness: 400, damping: 28 }); };
    });
  });
}

function animateDetail() {
  if (reduced.matches) return;
  const panel = $("#details");
  if (!panel?.classList.contains("open")) return;
  animate(panel, { opacity: [0, 1], x: [22, 0] }, { duration: 0.36, ease: "easeOut" });
  const sections = panel.querySelectorAll(".detail-top, .detail-section");
  animate(sections, { opacity: [0, 1], y: [12, 0] }, { duration: 0.38, delay: stagger(0.045), ease: "easeOut" });
  const bar = panel.querySelector(".score-rail span");
  if (bar) animate(bar, { scaleX: [0, 1] }, { duration: 0.95, ease: "easeOut" });
}

function animateCatalogue() {
  if (reduced.matches) return;
  const cards = [...document.querySelectorAll("#catalogue-grid .role-card")].slice(0, 24);
  if (cards.length) animate(cards, { opacity: [0, 1], y: [15, 0] }, { duration: 0.38, delay: stagger(0.025), ease: "easeOut" });
}

document.addEventListener("atlas:ready", () => { animateIntro(); animateGraph(); });
document.addEventListener("atlas:graph", animateGraph);
document.addEventListener("atlas:detail", animateDetail);
document.addEventListener("atlas:catalogue", animateCatalogue);
const graphRoot = $("#nodes");
const detailRoot = $("#detail-content");
const catalogueRoot = $("#catalogue-grid");
if (graphRoot) new MutationObserver(animateGraph).observe(graphRoot, { childList: true });
if (detailRoot) new MutationObserver(animateDetail).observe(detailRoot, { childList: true });
if (catalogueRoot) new MutationObserver(animateCatalogue).observe(catalogueRoot, { childList: true });
document.addEventListener("atlas:intro-dismiss", () => {
  if (reduced.matches) return;
  const overlay = $("#intro-overlay");
  if (overlay) animate(overlay, { opacity: [1, 0] }, { duration: 0.5, ease: "easeInOut" });
});
if (document.readyState === "complete" || document.readyState === "interactive") {
  animateIntro();
  animateGraph();
}
