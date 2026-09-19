# AKIB — Gaming Video Portfolio

A one-file website. Open `index.html` in a browser and it works — no build step, no npm, no server needed.

```
portfolio/
├── index.html      ← the whole site (edit the CONFIG block near the bottom)
├── videos/         ← drop your .mp4 files here
└── images/         ← optional: portrait.jpg, custom thumbnails
```

## 1. Add a YouTube video

Find the video ID — it's the part after `?v=` in the URL:

```
https://www.youtube.com/watch?v=dQw4w9WgXcQ
                                ^^^^^^^^^^^
```

Then in `index.html`, inside the game you want:

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
automatically, and the filter chips + counts update themselves.

## 5. Your details

At the top of the CONFIG block: `name`, `email`, `discord`, `location`, the showreel,
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

**YouTube videos won't play (black or blank player).**
YouTube refuses to load its embed when the page is opened straight from your hard drive
(the address bar says `file:///C:/...`). Two fixes:

- Double-click **start-local-server.bat** (Windows) or **start-local-server.command** (Mac),
  then open `http://localhost:8000`. Requires Python installed.
- Or just upload the folder — drag it onto app.netlify.com/drop. Free, ~10 seconds, and
  everything works properly from then on.

Your own `.mp4` files play fine either way. There's also a "Watch on YouTube" link in the
player as a backstop.

**A thumbnail stays grey.** The YouTube ID has a typo or a stray space, or the local file
path doesn't match the actual filename (`Clip.MP4` and `clip.mp4` are different once hosted).

**The page went blank after an edit.** A missing comma, quote or bracket. Press Ctrl+Z until
it works again.

## Notes

- Local .mp4 playback works when you open `index.html` directly from your computer *and*
  when hosted. YouTube embeds need an internet connection either way.
- Fonts (Bebas Neue + Inter) load from Google Fonts. Offline, the site falls back to system
  fonts and still looks fine.
- Fully responsive, works in dark environments by design, and respects reduced-motion settings.
