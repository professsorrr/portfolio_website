# AKIB — Gaming Video Portfolio

A plain HTML/CSS/JS website — no build step, no npm, no framework.

```
portfolio/
├── index.html           ← page structure only
├── css/
│   ├── base.css         ← colours, fonts, resets
│   ├── layout.css       ← nav, hero, marquee, stats
│   ├── gallery.css      ← showreel, filter chips, rails, cards
│   ├── sections.css     ← about, services, testimonials, contact, footer
│   ├── lightbox.css     ← the video overlay
│   └── responsive.css   ← media queries (loaded last)
├── js/
│   ├── site-config.js   ← ★ ALL YOUR CONTENT LIVES HERE ★
│   ├── main.js          ← starts everything in order
│   ├── utils.js         ← tiny shared helpers
│   ├── data.js          ← builds the category list from the config
│   ├── content.js       ← fills the one-off sections
│   ├── gallery.js       ← cards, rails, game chips
│   ├── lightbox.js      ← the video player overlay + showreel
│   └── ui.js            ← nav, burger menu, scroll reveal, contact form
├── videos/              ← drop your .mp4 files here
└── images/              ← optional: portrait.jpg, custom thumbnails
```

**You only ever need to edit `js/site-config.js`.** Everything else is machinery.

> **Run it through a local server, not by double-clicking.** The JavaScript is split into
> ES modules and browsers block those over `file://`. Use **start-local-server.bat**
> (Windows) / **start-local-server.command** (Mac) and open `http://localhost:8000`.
> Once the folder is hosted online, it just works.

## 1. Add a YouTube video

Find the video ID — it's the part after `?v=` in the URL:

```
https://www.youtube.com/watch?v=dQw4w9WgXcQ
                                ^^^^^^^^^^^
```

Then in `js/site-config.js`, inside the game you want:

```js
{ type:"yt", id:"dQw4w9WgXcQ", title:"Warzone sniper montage", duration:"2:15" }
```

## 2. Add a local video file

Copy the file into the `videos` folder, then:

```js
{ type:"local", src:"videos/my-edit.mp4", title:"Clutch 1v4", duration:"0:52" }
```

The thumbnail is pulled automatically from a frame at 1.5 seconds. Want a specific
thumbnail instead? Save a JPG next to it and add `poster:"videos/my-edit.jpg"`.

**Keep files small.** A 4K 500 MB file will take forever to load. Export web copies at
1080p, H.264, ~5–8 Mbps. If you have more than a handful of local videos, upload them to
YouTube (unlisted works fine) and use `type:"yt"` instead — it's faster for visitors and
free to host.

## 3. Both kinds swipe together

YouTube and local entries live in the **same** `videos: [ ... ]` array for each game, so
they sit side by side in one row and swipe together. Order in the array = order on screen.

Swiping works with: finger swipe on phone, click-and-drag with a mouse, the ← → arrow
buttons, and Shift + scroll wheel.

## 4. Games

Each block in `categories` is one game row:

```js
{ name:"Valorant", videos:[ ... ] },
```

Add, remove or reorder them freely. A game with an empty `videos` array is hidden
automatically, and the chips + counts update themselves.

**One game shows at a time**, and the page opens on whichever game is **first** in the
`categories` list. Want it to open on a different game? Move that game's block to the top
of the list — nothing else to change.

## 5. Your details

At the top of `js/site-config.js`: `name`, `email`, `discord`, `location`, the showreel,
about text, stats, service prices and social links. Change the four `url:"#"` values in
`socials` to your real channel links.

**Before you publish:** replace the `testimonials` placeholders with real quotes from real
clients, or delete that section — fake reviews will get you called out.

## 6. Put it online (free)

- **Netlify Drop** — go to app.netlify.com/drop and drag this whole folder in. Live in ~10 seconds.
- **GitHub Pages** — push the folder to a repo, then Settings → Pages → deploy from main branch.
- **Vercel** — `vercel` in this folder, or drag-and-drop in their dashboard.

All three give you a free URL, and you can point your own domain at it later.

## Troubleshooting

**The page is blank / unstyled when I double-click index.html.**
Expected. Browsers refuse to load ES modules over `file:///C:/...`, so none of the
JavaScript runs. Fixes:

- Double-click **start-local-server.bat** (Windows) or **start-local-server.command** (Mac),
  then open `http://localhost:8000`. Requires Python installed.
- Or just upload the folder — drag it onto app.netlify.com/drop. Free, ~10 seconds, and
  everything works properly from then on.

**YouTube videos won't play (black or blank player).**
Same root cause — YouTube also refuses to load its embed from a `file://` page. Serving the
folder fixes it. There's a "Watch on YouTube" link in the player as a backstop.

**A thumbnail stays grey.** The YouTube ID has a typo or a stray space, or the local file
path doesn't match the actual filename (`Clip.MP4` and `clip.mp4` are different once hosted).

**The page went blank after an edit.** A missing comma, quote or bracket in
`js/site-config.js`. Press Ctrl+Z until it works again, or open the browser console
(F12) — it names the file and line number.

## Notes

- The site needs to be served over `http://` (local server or a host), not opened as a file.
  YouTube embeds additionally need an internet connection.
- Fonts (Bebas Neue + Inter) load from Google Fonts. Offline, the site falls back to system
  fonts and still looks fine.
- Fully responsive, works in dark environments by design, and respects reduced-motion settings.
