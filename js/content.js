/* Fills the one-off sections straight from the config: logo, title, footer,
   hero clip, marquee, stats, about, services, testimonials, contact links,
   socials and the game dropdown. Call once, before the rails are built. */

import { SITE } from "./site-config.js";
import { CATS } from "./data.js";
import { $, esc } from "./utils.js";

export function renderContent() {
  $("#logoText").textContent = SITE.name;
  document.title = SITE.name + " — " + SITE.role + " Portfolio";
  $("#footNote").textContent =
    "© " +
    new Date().getFullYear() +
    " " +
    SITE.name +
    " · " +
    SITE.role +
    " · " +
    SITE.location;


  /* Hero background: a looping clip if one is set, otherwise a still image.
     fetchpriority high because this is the first thing a visitor sees. */
  if (SITE.heroVideo) {
    $("#heroVideoSlot").innerHTML =
      '<video autoplay muted loop playsinline src="' +
      esc(SITE.heroVideo) +
      '"></video>';
  } else if (SITE.heroImage) {
    $("#heroVideoSlot").innerHTML =
      '<img src="' + esc(SITE.heroImage) + '" alt="" fetchpriority="high">';
  }

  /* marquee */
  const mq = CATS.map((c) => c.name);
  $("#marquee").innerHTML = [...mq, ...mq]
    .map((n) => "<span>" + esc(n) + "</span>")
    .join("");

  /* stats */
  $("#stats").innerHTML = SITE.stats
    .map(
      (s) =>
        '<div class="stat"><b>' +
        esc(s.n) +
        "</b><small>" +
        esc(s.l) +
        "</small></div>",
    )
    .join("");

  /* about */
  $("#aboutP1").textContent = SITE.about.p1;
  $("#aboutP2").textContent = SITE.about.p2;
  $("#skills").innerHTML = SITE.about.skills
    .map((s) => "<span>" + esc(s) + "</span>")
    .join("");

  /* services */
  $("#services-grid").innerHTML = SITE.services
    .map(
      (s) =>
        '<div class="svc rv' +
        (s.featured ? " featured" : "") +
        '">' +
        "<h3>" +
        esc(s.name) +
        "</h3>" +
        '<div class="price">' +
        esc(s.price) +
        "</div>" +
        "<ul>" +
        s.items.map((i) => "<li>" + esc(i) + "</li>").join("") +
        "</ul>" +
        '<a href="#contact" class="btn btn-' +
        (s.featured ? "primary" : "ghost") +
        '">Book this</a>' +
        "</div>",
    )
    .join("");

  /* testimonials */
  $("#quotes").innerHTML = SITE.testimonials
    .map(
      (t) =>
        '<div class="quote rv"><div class="stars">★★★★★</div><p>' +
        esc(t.text) +
        "</p>" +
        '<footer><div class="avatar">' +
        esc(
          (t.name || "?")
            .replace(/[^A-Za-z]/g, "")
            .slice(0, 2)
            .toUpperCase() || "★",
        ) +
        "</div>" +
        "<div><b>" +
        esc(t.name) +
        "</b><small>" +
        esc(t.role) +
        "</small></div></footer></div>",
    )
    .join("");

  /* contact links + socials */
  $("#contactLinks").innerHTML =
    '<a href="mailto:' +
    esc(SITE.email) +
    '"><span class="k">Email</span>' +
    esc(SITE.email) +
    "</a>" +
    '<a href="#" onclick="return false"><span class="k">Discord</span>' +
    esc(SITE.discord) +
    "</a>" +
    '<a href="#" onclick="return false"><span class="k">Based in</span>' +
    esc(SITE.location) +
    "</a>";

  $("#socials").innerHTML = SITE.socials
    .map(
      (s) =>
        '<a href="' +
        esc(s.url) +
        '" aria-label="' +
        esc(s.name) +
        '" target="_blank" rel="noopener">' +
        '<svg viewBox="0 0 24 24"><path d="' +
        s.icon +
        '"/></svg></a>',
    )
    .join("");

  $("#cgame").innerHTML =
    '<option value="">Choose a game…</option>' +
    CATS.map((c) => "<option>" + esc(c.name) + "</option>").join("") +
    "<option>Other</option>";

}
