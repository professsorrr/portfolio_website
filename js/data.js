/* Derives the flat, render-ready category list from the config. */

import { SITE } from "./site-config.js";
import { slug } from "./utils.js";

export const CATS = SITE.categories
  .map((c) => ({ ...c, id: slug(c.name), videos: c.videos || [] }))
  .filter((c) => c.videos.length);

CATS.forEach((c) =>
  c.videos.forEach((v, i) => {
    v._cat = c.name;
    v._catId = c.id;
    v._i = i;
  }),
);

export const totalVideos = CATS.reduce((n, c) => n + c.videos.length, 0);
