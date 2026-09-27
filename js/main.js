/* Entry point. The order below is the order the old single-file script ran in,
   and it matters in two places:
     - setupRails() and initLightbox() bind to markup renderRails() creates.
     - initReveal() observes every .rv element, so the rails must exist first.
   Edit content in site-config.js; this file only wires things together. */

import { renderContent } from "./content.js";
import { renderRails, setupRails, initFilters, applyView } from "./gallery.js";
import { initShowreel, initLightbox } from "./lightbox.js";
import { initContact, initNav, initReveal } from "./ui.js";

renderContent();

renderRails();
setupRails();
initFilters();

initShowreel();
initLightbox();

initContact();
initNav();
initReveal();

applyView();
