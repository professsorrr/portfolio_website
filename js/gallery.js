/* The "Work" section: video cards, the swipeable rails, and the game chips
   that pick which single rail is on screen. */

import { CATS } from "./data.js";
import { $, $$, esc } from "./utils.js";

/* ---------- thumbnails ---------- */
function thumbHTML(v) {
  if (v.type === "yt" && v.id) {
    return (
      '<img loading="lazy" src="https://i.ytimg.com/vi/' +
      esc(v.id) +
      '/hqdefault.jpg" alt="' +
      esc(v.title) +
      '" onerror="this.style.display=\'none\'">'
    );
  }
  if (v.type === "local" && v.src) {
    if (v.poster)
      return (
        '<img loading="lazy" src="' +
        esc(v.poster) +
        '" alt="' +
        esc(v.title) +
        '" onerror="this.style.display=\'none\'">'
      );
    return (
      '<video preload="metadata" muted playsinline src="' +
      esc(v.src) +
      '#t=1.5"></video>'
    );
  }
  return "";
}

function cardHTML(v) {
  const isYT = v.type === "yt";
  return (
    '<article class="card" data-cat="' +
    esc(v._catId) +
    '" data-i="' +
    v._i +
    '" tabindex="0">' +
    '<div class="card-thumb">' +
    '<div class="ph"><div><b>' +
    esc(v._cat) +
    "</b><small>" +
    (isYT ? "Add YouTube ID" : "Add file to /videos") +
    "</small></div></div>" +
    thumbHTML(v) +
    '<div class="card-shade"><div class="mini-play"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></div></div>' +
    '<span class="badge ' +
    (isYT ? "yt" : "local") +
    '">' +
    (isYT ? "YouTube" : "MP4") +
    "</span>" +
    (v.duration
      ? '<span class="dur">' + esc(v.duration) + "</span>"
      : "") +
    "</div>" +
    '<div class="card-meta"><h4>' +
    esc(v.title) +
    "</h4><p>" +
    esc(v._cat) +
    "</p></div>" +
    "</article>"
  );
}

/* ---------- build filters + rails ---------- */
export function renderRails() {
  /* One chip per game, no "All". The first game in site-config.js is the
     one that shows when the page loads — reorder that list to change it. */
  $("#filters").innerHTML = CATS.map(
    (c, i) =>
      '<button class="chip' +
      (i === 0 ? " active" : "") +
      '" data-f="' +
      c.id +
      '">' +
      esc(c.name) +
      ' <span class="n">' +
      c.videos.length +
      "</span></button>",
  ).join("");

  $("#rails").innerHTML = CATS.map(
    (c) =>
      '<section class="rail-block rv" id="cat-' +
      c.id +
      '" data-cat="' +
      c.id +
      '">' +
      '<div class="rail-head">' +
      '<div class="rail-title"><h3>' +
      esc(c.name) +
      '</h3><span class="count">' +
      c.videos.length +
      " edit" +
      (c.videos.length > 1 ? "s" : "") +
      "</span></div>" +
      '<div class="rail-nav">' +
      '<button data-dir="-1" aria-label="Scroll left"><svg viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg></button>' +
      '<button data-dir="1" aria-label="Scroll right"><svg viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg></button>' +
      "</div>" +
      "</div>" +
      '<div class="rail-viewport"><div class="rail">' +
      c.videos.map(cardHTML).join("") +
      "</div></div>" +
      "</section>",
  ).join("");
}

/* ---------- swipe / drag rails ---------- */
function setupRail(block) {
  const rail = $(".rail", block);
  const vp = $(".rail-viewport", block);
  const [prev, next] = $$(".rail-nav button", block);

  const step = () => {
    const card = $(".card", rail);
    return card ? card.getBoundingClientRect().width + 16 : 320;
  };
  const update = () => {
    const max = rail.scrollWidth - rail.clientWidth - 2;
    if (prev) prev.disabled = rail.scrollLeft <= 2;
    if (next) next.disabled = rail.scrollLeft >= max;
    vp.classList.toggle("has-more", rail.scrollLeft < max);
  };

  $$(".rail-nav button", block).forEach((b) =>
    b.addEventListener("click", () => {
      const n = Math.max(1, Math.floor(rail.clientWidth / step()));
      rail.scrollBy({
        left: +b.dataset.dir * step() * n,
        behavior: "smooth",
      });
    }),
  );

  rail.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  setTimeout(update, 60);

  /* pointer drag (mouse + pen). Touch uses native momentum scrolling. */
  let down = false,
    startX = 0,
    startScroll = 0,
    moved = 0;
  rail.addEventListener("pointerdown", (e) => {
    if (e.pointerType === "touch") return;
    down = true;
    moved = 0;
    startX = e.clientX;
    startScroll = rail.scrollLeft;
    rail.classList.add("dragging");
    rail.setPointerCapture(e.pointerId);
  });
  rail.addEventListener("pointermove", (e) => {
    if (!down) return;
    const d = e.clientX - startX;
    moved = Math.abs(d);
    rail.scrollLeft = startScroll - d;
  });
  const endDrag = (e) => {
    if (!down) return;
    down = false;
    rail.classList.remove("dragging");
    try {
      rail.releasePointerCapture(e.pointerId);
    } catch (_) {}
    if (moved > 6) {
      const kill = (ev) => ev.stopPropagation();
      rail.addEventListener("click", kill, { capture: true, once: true });
    }
  };
  rail.addEventListener("pointerup", endDrag);
  rail.addEventListener("pointercancel", endDrag);
  rail.addEventListener("pointerleave", endDrag);

  /* trackpad horizontal + shift-wheel */
  rail.addEventListener(
    "wheel",
    (e) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      if (!e.shiftKey) return;
      e.preventDefault();
      rail.scrollLeft += e.deltaY;
    },
    { passive: false },
  );
}

export function setupRails() {
  $$(".rail-block").forEach(setupRail);
}

/* ---------- filters ---------- */
/* Exactly one game is visible at a time. Starts on the first game in
   site-config.js, then follows whichever chip was clicked last. */
let activeFilter = CATS.length ? CATS[0].id : "";

export function applyView() {
  $$(".rail-block").forEach((block) => {
    block.style.display = block.dataset.cat === activeFilter ? "" : "none";
  });
}

export function initFilters() {
  $$("#filters .chip").forEach((chip) =>
    chip.addEventListener("click", () => {
      $$("#filters .chip").forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      activeFilter = chip.dataset.f;
      applyView();
    }),
  );
}
