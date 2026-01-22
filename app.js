const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const trans = document.createElement("div");
trans.className = "portalTransition";
document.body.appendChild(trans);

const reveals = document.querySelectorAll(".reveal");
if (!reduce) {
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    }
  }, { threshold: 0.12 });
  reveals.forEach(el => io.observe(el));
} else {
  reveals.forEach(el => el.classList.add("in"));
}

function portalNav(url){
  if (reduce) { window.location.href = url; return; }
  trans.classList.add("on");
  setTimeout(() => { window.location.href = url; }, 220);
}

document.addEventListener("click", (e) => {
  const a = e.target.closest("a[data-portal]");
  if (!a) return;
  const href = a.getAttribute("href");
  if (!href || href.startsWith("#")) return;
  e.preventDefault();
  portalNav(href);
});
