/* Chrome that is not the gallery: the sticky nav, the burger menu,
   the scroll-reveal observer and the mailto contact form. */

import { SITE } from "./site-config.js";
import { $, $$ } from "./utils.js";

/* ---------- contact form ---------- */
export function initContact() {
  $("#contactForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const subject =
      "Edit request from " +
      $("#cname").value +
      ($("#cgame").value ? " — " + $("#cgame").value : "");
    const body =
      "Name: " +
      $("#cname").value +
      "\n" +
      "Contact: " +
      $("#cmail").value +
      "\n" +
      "Game: " +
      ($("#cgame").value || "—") +
      "\n\n" +
      $("#cmsg").value;
    window.location.href =
      "mailto:" +
      SITE.email +
      "?subject=" +
      encodeURIComponent(subject) +
      "&body=" +
      encodeURIComponent(body);
  });
}

/* ---------- nav + burger ---------- */
export function initNav() {
  const nav = $("#nav");
  addEventListener(
    "scroll",
    () => nav.classList.toggle("solid", scrollY > 40),
    { passive: true },
  );

  const burger = $("#burger"),
    mm = $("#mobileMenu");
  burger.addEventListener("click", () => {
    burger.classList.toggle("open");
    mm.classList.toggle("open");
  });
  $$("#mobileMenu a").forEach((a) =>
    a.addEventListener("click", () => {
      burger.classList.remove("open");
      mm.classList.remove("open");
    }),
  );
}

/* ---------- scroll reveal ----------
   Runs last: it observes every .rv element, including the rails that
   gallery.js injects, so those have to exist first. */
export function initReveal() {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add("in");
          io.unobserve(en.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px" },
  );
  $$(".rv").forEach((el, i) => {
    el.style.transitionDelay = Math.min(i % 6, 5) * 60 + "ms";
    io.observe(el);
  });
}
