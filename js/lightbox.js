/* The video overlay: opening a card or the showreel, arrow/swipe/Esc
   navigation, and the file:// warning for YouTube embeds. */

import { SITE } from "./site-config.js";
import { CATS } from "./data.js";
import { $, esc } from "./utils.js";

const lb = $("#lb"),
  lbStage = $("#lbStage"),
  lbTitle = $("#lbTitle"),
  lbMeta = $("#lbMeta");
let lbList = [],
  lbIndex = -1;

function stageHTML(v) {
  if (v.type === "yt" && v.id) {
    return (
      '<iframe src="https://www.youtube-nocookie.com/embed/' +
      esc(v.id) +
      '?autoplay=1&rel=0&modestbranding=1" allow="accelerometer;autoplay;encrypted-media;picture-in-picture" allowfullscreen></iframe>'
    );
  }
  if (v.type === "local" && v.src) {
    return (
      '<video controls autoplay playsinline preload="metadata" src="' +
      esc(v.src) +
      '"' +
      (v.poster ? ' poster="' + esc(v.poster) + '"' : "") +
      "></video>"
    );
  }
  return (
    '<div style="display:grid;place-items:center;height:100%;color:var(--muted);text-align:center;padding:30px;font-size:14px">' +
    'No source yet.<br><span style="color:var(--muted-2);font-size:12.5px">Add a YouTube <code>id</code> or a file path in the config.</span></div>'
  );
}

/* YouTube's player refuses to load when the page is opened straight off the
   hard drive (a file:// address). Show the reason instead of a blank box. */
const OFFLINE_FILE = location.protocol === "file:";

function setLBInfo(v) {
  lbTitle.textContent = v.title || "";
  const bits = [v._cat, v.duration].filter(Boolean).map(esc).join(" · ");
  const link =
    v.type === "yt" && v.id
      ? '<a class="lb-yt" href="https://www.youtube.com/watch?v=' +
        esc(v.id) +
        '" target="_blank" rel="noopener">Watch on YouTube ↗</a>'
      : "";
  lbMeta.innerHTML = bits + link;

  const warn = $("#lbWarn");
  if (OFFLINE_FILE && v.type === "yt" && v.id) {
    warn.innerHTML =
      "<b>Player blank?</b> YouTube blocks its embed when a page is opened " +
      "directly from your hard drive. Upload the folder (Netlify Drop, GitHub Pages) or run a " +
      "local server, and it plays normally. Your own .mp4 files play fine either way.";
    warn.style.display = "";
  } else {
    warn.style.display = "none";
  }
}

export function openLB(v, list, index) {
  lbList = list || [];
  lbIndex = typeof index === "number" ? index : -1;
  lbStage.innerHTML = stageHTML(v);
  setLBInfo(v);
  const many = lbList.length > 1;
  $("#lbPrev").style.display = many ? "" : "none";
  $("#lbNext").style.display = many ? "" : "none";
  lb.classList.add("open");
  requestAnimationFrame(() => lb.classList.add("show"));
  document.body.style.overflow = "hidden";
}
function closeLB() {
  lb.classList.remove("show");
  setTimeout(() => {
    lb.classList.remove("open");
    lbStage.innerHTML = "";
  }, 260);
  document.body.style.overflow = "";
}
function stepLB(d) {
  if (lbIndex < 0 || !lbList.length) return;
  lbIndex = (lbIndex + d + lbList.length) % lbList.length;
  const v = lbList[lbIndex];
  lbStage.innerHTML = stageHTML(v);
  setLBInfo(v);
}

export function initLightbox() {
  $("#rails").addEventListener("click", (e) => {
    const card = e.target.closest(".card");
    if (!card) return;
    const cat = CATS.find((c) => c.id === card.dataset.cat);
    if (!cat) return;
    openLB(cat.videos[+card.dataset.i], cat.videos, +card.dataset.i);
  });
  $("#rails").addEventListener("keydown", (e) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    const card = e.target.closest(".card");
    if (!card) return;
    e.preventDefault();
    card.click();
  });

  $("#lbClose").addEventListener("click", closeLB);
  $("#lbPrev").addEventListener("click", () => stepLB(-1));
  $("#lbNext").addEventListener("click", () => stepLB(1));
  lb.addEventListener("click", (e) => {
    if (e.target === lb || e.target.classList.contains("lb-inner"))
      closeLB();
  });
  document.addEventListener("keydown", (e) => {
    if (!lb.classList.contains("open")) return;
    if (e.key === "Escape") closeLB();
    if (e.key === "ArrowLeft") stepLB(-1);
    if (e.key === "ArrowRight") stepLB(1);
  });
  /* swipe the lightbox on touch */
  let tsX = 0;
  lbStage.addEventListener(
    "touchstart",
    (e) => {
      tsX = e.changedTouches[0].clientX;
    },
    { passive: true },
  );
  lbStage.addEventListener(
    "touchend",
    (e) => {
      const d = e.changedTouches[0].clientX - tsX;
      if (Math.abs(d) > 70) stepLB(d < 0 ? 1 : -1);
    },
    { passive: true },
  );
}

/* ---------- showreel card ---------- */
export function initShowreel() {
  const reelCard = $("#reelCard");
  const reel = SITE.showreel;
  if (
    reel &&
    ((reel.type === "yt" && reel.id) || (reel.type === "local" && reel.src))
  ) {
    const media =
      reel.type === "yt"
        ? '<img src="' +
          esc(
            reel.poster ||
              "https://i.ytimg.com/vi/" + reel.id + "/maxresdefault.jpg",
          ) +
          '" alt="Showreel" onerror="this.style.display=\'none\'">'
        : reel.poster
          ? '<img src="' + esc(reel.poster) + '" alt="Showreel">'
          : '<video preload="metadata" muted playsinline src="' +
            esc(reel.src) +
            '#t=2"></video>';
    reelCard.insertAdjacentHTML("afterbegin", media);
  }
  reelCard.addEventListener("click", () => {
    if (reel.type === "yt" && !reel.id) return;
    if (reel.type === "local" && !reel.src) return;
    openLB(
      { ...reel, _cat: "Showreel", title: reel.title || "Showreel" },
      null,
    );
  });
}
