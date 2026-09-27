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
      "</div>" +
      /* the arrows live inside the viewport so they can sit on top of the
         first and last video, centred on the thumbnail */
      '<div class="rail-viewport"><div class="rail">' +
      c.videos.map(cardHTML).join("") +
      "</div>" +
      '<div class="rail-nav">' +
      '<button class="rail-arrow prev" data-dir="-1" aria-label="Scroll left"><svg viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg></button>' +
      '<button class="rail-arrow next" data-dir="1" aria-label="Scroll right"><svg viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg></button>' +
      "</div>" +
      "</div>" +
      "</section>",
  ).join("");
}

/* ---------- horizontal scrolling ----------
   Shared by the video rails and the game chip row: arrow buttons that grey
   out at each end, click-drag with a mouse, shift-wheel, and a fade on the
   right while there is more to see. Touch uses the browser's own momentum
   scrolling, so it needs nothing here.
     track    — the element that actually scrolls
     viewport — wrapper that gets .has-more for the edge fade
     buttons  — arrows carrying data-dir="-1" / data-dir="1"
     stepFn   — how far one arrow press should move, in pixels */
function attachScroller(track, viewport, buttons, stepFn) {
  const update = () => {
    const max = track.scrollWidth - track.clientWidth - 2;
    buttons.forEach((b) => {
      b.disabled = +b.dataset.dir < 0 ? track.scrollLeft <= 2 : track.scrollLeft >= max;
    });
    if (viewport) viewport.classList.toggle("has-more", track.scrollLeft < max);
  };

  buttons.forEach((b) =>
    b.addEventListener("click", () => {
      const n = Math.max(1, Math.floor(track.clientWidth / stepFn()));
      track.scrollBy({
        left: +b.dataset.dir * stepFn() * n,
        behavior: "smooth",
      });
    }),
  );

  track.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  setTimeout(update, 60);

  /* Pointer drag (mouse + pen). Touch uses native momentum scrolling.

     The capture is deliberately NOT taken on pointerdown. Capturing there
     retargets the click that follows to this container, so the click never
     reaches the chip or card underneath and a plain click does nothing. We
     only capture once the pointer has actually travelled far enough to be a
     drag rather than a click. */
  const DRAG_THRESHOLD = 6;
  let down = false,
    dragging = false,
    startX = 0,
    startScroll = 0,
    pointerId = null;

  track.addEventListener("pointerdown", (e) => {
    if (e.pointerType === "touch") return;
    down = true;
    dragging = false;
    startX = e.clientX;
    startScroll = track.scrollLeft;
    pointerId = e.pointerId;
  });

  track.addEventListener("pointermove", (e) => {
    if (!down) return;
    const d = e.clientX - startX;
    if (!dragging) {
      if (Math.abs(d) <= DRAG_THRESHOLD) return;
      dragging = true;
      track.classList.add("dragging");
      try {
        track.setPointerCapture(pointerId);
      } catch (_) {}
    }
    track.scrollLeft = startScroll - d;
  });

  const endDrag = () => {
    if (!down) return;
    down = false;
    if (dragging) {
      track.classList.remove("dragging");
      try {
        track.releasePointerCapture(pointerId);
      } catch (_) {}
      /* a drag should not also count as a click on whatever sat under it */
      const kill = (ev) => ev.stopPropagation();
      track.addEventListener("click", kill, { capture: true, once: true });
      setTimeout(() => track.removeEventListener("click", kill, true), 0);
    }
    dragging = false;
  };
  track.addEventListener("pointerup", endDrag);
  track.addEventListener("pointercancel", endDrag);
  track.addEventListener("pointerleave", endDrag);

  /* stop the browser's native image/text drag from hijacking a slow drag */
  track.addEventListener("dragstart", (e) => e.preventDefault());

  /* trackpad horizontal + shift-wheel */
  track.addEventListener(
    "wheel",
    (e) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      if (!e.shiftKey) return;
      e.preventDefault();
      track.scrollLeft += e.deltaY;
    },
    { passive: false },
  );

  return update;
}

/* Re-run after a rail is shown or the window changes size: a hidden rail
   measures as zero, so its arrows can only be placed once it is on screen. */
const railLayouts = [];

export function setupRails() {
  railLayouts.length = 0;
  $$(".rail-block").forEach((block) => {
    const rail = $(".rail", block);
    const viewport = $(".rail-viewport", block);
    const refresh = attachScroller(rail, viewport, $$(".rail-arrow", block), () => {
      const card = $(".card", rail);
      return card ? card.getBoundingClientRect().width + 16 : 320;
    });

    /* Put the arrows level with the middle of the thumbnail rather than the
       middle of the whole card, which would sit them over the title text. */
    const placeArrows = () => {
      const thumb = $(".card-thumb", rail);
      if (!thumb) return;
      const t = thumb.getBoundingClientRect();
      if (!t.height) return; /* rail is hidden right now — measured later */
      const v = viewport.getBoundingClientRect();
      viewport.style.setProperty(
        "--arrow-y",
        t.top - v.top + t.height / 2 + "px",
      );
    };

    placeArrows();
    window.addEventListener("resize", placeArrows);
    railLayouts.push(() => {
      placeArrows();
      refresh();
    });
  });
}

/* The game chips scroll the same way. One arrow press moves roughly one
   screenful of chips. */
export function setupChipScroller() {
  const track = $("#filters");
  attachScroller(
    track,
    $(".filters-viewport"),
    $$(".filters-nav button"),
    () => Math.max(160, track.clientWidth * 0.7),
  );
}

/* ---------- filters ---------- */
/* Exactly one game is visible at a time. Starts on the first game in
   site-config.js, then follows whichever chip was clicked last. */
let activeFilter = CATS.length ? CATS[0].id : "";

export function applyView() {
  $$(".rail-block").forEach((block) => {
    block.style.display = block.dataset.cat === activeFilter ? "" : "none";
  });
  /* the rail that just appeared could not be measured while it was hidden */
  railLayouts.forEach((refresh) => refresh());
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
