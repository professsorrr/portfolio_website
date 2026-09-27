/* ============================================================================
   CONFIG — this is the only file you need to edit
   ============================================================================
   Every video is one line in a game's "videos" array.

     YouTube :  { type:"yt",    id:"dQw4w9WgXcQ",       title:"Clip name", duration:"0:45" }
                (the id is the part after ?v= in the YouTube URL)

     Local   :  { type:"local", src:"videos/clip.mp4",  title:"Clip name", duration:"0:45" }
                (put the .mp4 inside the "videos" folder next to index.html.
                 optional: add  poster:"videos/clip.jpg"  for a custom thumbnail)

   Both kinds live in the SAME array, so they swipe together in one row.
   Delete the sample entries and paste your own. Empty games are hidden
   automatically until you add a video to them.
============================================================================ */

export const SITE = {
  name: "AKIB", // shown in the logo + footer
  role: "Gaming Video Editor",
  email: "akiburrahmanofficial@gmail.com",
  discord: "yourdiscord",
  location: "Dhaka, BD",

  // Background for the hero (the "Frames that hit different" section).
  // A video wins if both are set. Leave both "" to fall back to the gradient.
  heroVideo: "", // e.g. "videos/hero-loop.mp4"
  heroImage: "images/cover.jpeg",

  // Your photo for the About ("Behind the timeline") section. Leave "" to
  // show the empty placeholder box instead.
  portrait: "images/profile.png",

  // The big showreel. Either a YouTube id or a local file.
  showreel: { type: "yt", id: "", poster: "", title: "Showreel 2026" },

  about: {
    p1: "I've been cutting gaming content for years — horror co-op chaos, ranked highlights, souls-like boss runs and everything in between. My job is to take twelve hours of raw capture and hand you back ninety seconds people can't scroll past.",
    p2: "Every edit is built around pacing: beat-matched cuts, clean sound design, colour that matches the game's mood instead of fighting it. Fast turnaround, unlimited revisions inside scope, and project files handed over if you want them.",
    skills: [
      "Premiere Pro",
      "After Effects",
      "DaVinci Resolve",
      "Sound design",
      "Motion graphics",
      "Colour grading",
      "Thumbnail design",
      "Short-form",
    ],
  },

  stats: [
    { n: "400+", l: "Edits delivered" },
    { n: "15", l: "Games covered" },
    { n: "60M+", l: "Views generated" },
    { n: "24h", l: "Avg. reply time" },
  ],

  services: [
    {
      name: "Short-form",
      price: "From $25 / clip",
      featured: false,
      items: [
        "Up to 60 seconds",
        "Vertical 9:16 export",
        "Beat-synced cuts",
        "Captions + SFX",
        "2 revisions",
      ],
    },
    {
      name: "Montage",
      price: "From $80 / video",
      featured: true,
      items: [
        "2–6 minute runtime",
        "Full colour grade",
        "Custom transitions & overlays",
        "Sound design pass",
        "Free thumbnail",
        "Unlimited revisions in scope",
      ],
    },
    {
      name: "Full package",
      price: "Monthly retainer",
      featured: false,
      items: [
        "8 videos per month",
        "Long-form + shorts",
        "Thumbnails included",
        "Priority turnaround",
        "Project files handed over",
      ],
    },
  ],

  // Replace these with real quotes from real clients before publishing.
  testimonials: [
    {
      text: "[Placeholder — paste a real client quote here.] Turnaround was quicker than agreed and the pacing carried the whole video.",
      name: "[Client name]",
      role: "[Channel · subs]",
    },
    {
      text: "[Placeholder — paste a real client quote here.] Understood the horror vibe straight away, no hand-holding needed.",
      name: "[Client name]",
      role: "[Channel · subs]",
    },
    {
      text: "[Placeholder — paste a real client quote here.] My retention graph genuinely changed shape after switching editors.",
      name: "[Client name]",
      role: "[Channel · subs]",
    },
  ],

  socials: [
    {
      name: "YouTube",
      url: "#",
      icon: "M23 12s0-3.7-.5-5.5a2.9 2.9 0 0 0-2-2C18.7 4 12 4 12 4s-6.7 0-8.5.5a2.9 2.9 0 0 0-2 2C1 8.3 1 12 1 12s0 3.7.5 5.5a2.9 2.9 0 0 0 2 2C5.3 20 12 20 12 20s6.7 0 8.5-.5a2.9 2.9 0 0 0 2-2C23 15.7 23 12 23 12zM9.8 15.4V8.6l5.9 3.4z",
    },
    {
      name: "Instagram",
      url: "#",
      icon: "M12 2.2c3.2 0 3.6 0 4.9.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.9c-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.9.1s-3.6 0-4.9-.1c-3.2-.1-4.8-1.7-4.9-4.9C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-3.2 1.7-4.8 4.9-4.9C8.4 2.2 8.8 2.2 12 2.2zm0 3.2A6.6 6.6 0 1 0 18.6 12 6.6 6.6 0 0 0 12 5.4zm0 10.9A4.3 4.3 0 1 1 16.3 12 4.3 4.3 0 0 1 12 16.3zm6.9-11.1a1.5 1.5 0 1 0 1.5 1.5 1.5 1.5 0 0 0-1.5-1.5z",
    },
    {
      name: "TikTok",
      url: "#",
      icon: "M16.6 5.8a4.8 4.8 0 0 1-1.1-3.1h-3.1v12.4a2.8 2.8 0 1 1-2-2.7V9.2a5.9 5.9 0 1 0 5.1 5.9V9a7.9 7.9 0 0 0 4.6 1.5V7.4a4.7 4.7 0 0 1-3.5-1.6z",
    },
    {
      name: "Discord",
      url: "#",
      icon: "M20.3 4.9A19 19 0 0 0 15.6 3.5l-.2.4a14 14 0 0 1 4.1 2.1 16.6 16.6 0 0 0-14.9 0A14 14 0 0 1 8.7 3.9l-.3-.4A19 19 0 0 0 3.7 4.9 19.8 19.8 0 0 0 .2 18a19 19 0 0 0 5.8 2.9l.9-1.3a12.4 12.4 0 0 1-2-.9l.5-.4a13.6 13.6 0 0 0 11.6 0l.5.4a12.4 12.4 0 0 1-2 .9l.9 1.3a19 19 0 0 0 5.8-2.9 19.8 19.8 0 0 0-3.9-13.1zM8.3 15.3a1.9 1.9 0 0 1 0-3.8 1.9 1.9 0 0 1 0 3.8zm7.4 0a1.9 1.9 0 0 1 0-3.8 1.9 1.9 0 0 1 0 3.8z",
    },
  ],

  /* ---------------------- YOUR VIDEOS, BY GAME ---------------------- */
  categories: [
    {
      name: "Roblox",
      videos: [
        {
          type: "yt",
          id: "IWuGAz2Xal4",
          title: "I Tried Every Satisfying Game Until I Get Satisfied",
          duration: "",
        },
        {
          type: "yt",
          id: "8LcH2gtojd8",
          title: "i'm addicted...",
          duration: "",
        },
        {
          type: "yt",
          id: "prB5F-gWrbs",
          title: "i regret adding this player...",
          duration: "",
        },
        {
          type: "yt",
          id: "ATu61ghThso",
          title: "no way they play roblox...",
          duration: "",
        },
        {
          type: "yt",
          id: "Qscijj4CWgs",
          title: "i got arrested..",
          duration: "",
        },
        {
          type: "yt",
          id: "RjaBZ4CzKMc",
          title: "We're Not Friends Anymore...",
          duration: "",
        },
        {
          type: "yt",
          id: "5ESKHTvEyRw",
          title: "I Took Steal an Egg Too Far..",
          duration: "",
        },
        {
          type: "yt",
          id: "dPnibG35sOo",
          title: "This Roblox Game is NOT Racist...",
          duration: "",
        },
        {
          type: "yt",
          id: "GXbXHAMzKok",
          title: "I Became the #1 Player in Steal an Egg",
          duration: "",
        },
        {
          type: "yt",
          id: "jmEcdwvY-GA",
          title: "I Played the Most POPULAR Games From Every Year",
          duration: "",
        },
        {
          type: "yt",
          id: "oTQJAZNyiIE",
          title: "10 Million Subs..",
          duration: "",
        },
        {
          type: "yt",
          id: "0Lj3RJXxDvk",
          title: "I Got Too Greedy..",
          duration: "",
        },
        {
          type: "yt",
          id: "KiL2Z5AS1rY",
          title: "I Found a Needle in a Haystack",
          duration: "",
        },
        {
          type: "yt",
          id: "21OU52av-vw",
          title: "this is impossible",
          duration: "",
        },
        { type: "yt", id: "sIsa7wxfNQM", title: "i did it..", duration: "" },
        {
          type: "yt",
          id: "CCs3GBPIi2Q",
          title: "These Swarms are ENDLESS",
          duration: "",
        },
        {
          type: "yt",
          id: "rPWI2qO_I34",
          title: "I Accidentally Broke Steal an Egg...",
          duration: "",
        },
        {
          type: "yt",
          id: "5X2mWkSXJM8",
          title: "I Became an Admin in Steal an Egg",
          duration: "",
        },
      ],
    },
    {
      name: "Call of Duty",
      videos: [
        {
          type: "yt",
          id: "",
          title: "Warzone sniper montage",
          duration: "2:15",
        },
        {
          type: "local",
          src: "videos/cod-01.mp4",
          title: "Clutch 1v4",
          duration: "0:52",
        },
        {
          type: "yt",
          id: "",
          title: "Ranked highlights",
          duration: "1:48",
        },
      ],
    },
    {
      name: "Backrooms",
      videos: [
        {
          type: "local",
          src: "videos/backrooms-01.mp4",
          title: "Level 0 found footage",
          duration: "1:36",
        },
        {
          type: "yt",
          id: "",
          title: "Backrooms short film cut",
          duration: "4:12",
        },
      ],
    },
    {
      name: "Minecraft",
      videos: [
        {
          type: "yt",
          id: "",
          title: "Hardcore day 100 recap",
          duration: "5:30",
        },
        {
          type: "local",
          src: "videos/minecraft-01.mp4",
          title: "Build timelapse",
          duration: "1:10",
        },
        { type: "yt", id: "", title: "PvP montage", duration: "2:02" },
      ],
    },
    {
      name: "REPO",
      videos: [
        {
          type: "local",
          src: "videos/repo-01.mp4",
          title: "Co-op chaos cut",
          duration: "0:47",
        },
        {
          type: "yt",
          id: "",
          title: "REPO funny moments",
          duration: "3:22",
        },
      ],
    },
    {
      name: "Marvel Rivals",
      videos: [
        {
          type: "yt",
          id: "",
          title: "Hero highlight reel",
          duration: "1:55",
        },
        {
          type: "local",
          src: "videos/rivals-01.mp4",
          title: "Ranked push edit",
          duration: "0:41",
        },
      ],
    },
    {
      name: "Among Us",
      videos: [
        { type: "yt", id: "", title: "Impostor edit", duration: "2:28" },
        {
          type: "local",
          src: "videos/amongus-01.mp4",
          title: "Emergency meeting cut",
          duration: "0:35",
        },
      ],
    },
    {
      name: "The Outlast Trials",
      videos: [
        {
          type: "local",
          src: "videos/outlast-01.mp4",
          title: "Horror trailer edit",
          duration: "1:12",
        },
        { type: "yt", id: "", title: "Full trial run", duration: "6:40" },
      ],
    },
    {
      name: "Ready or Not",
      videos: [
        {
          type: "yt",
          id: "",
          title: "Tactical breach montage",
          duration: "2:44",
        },
        {
          type: "local",
          src: "videos/readyornot-01.mp4",
          title: "Clean sweep",
          duration: "0:58",
        },
      ],
    },
    {
      name: "Where Winds Meet",
      videos: [
        {
          type: "yt",
          id: "",
          title: "Cinematic exploration",
          duration: "3:16",
        },
        {
          type: "local",
          src: "videos/wwm-01.mp4",
          title: "Combat flow edit",
          duration: "1:04",
        },
      ],
    },
    {
      name: "Dark Souls",
      videos: [
        {
          type: "yt",
          id: "",
          title: "Boss run supercut",
          duration: "4:50",
        },
        {
          type: "local",
          src: "videos/darksouls-01.mp4",
          title: "No-hit attempt",
          duration: "1:29",
        },
      ],
    },
    {
      name: "Headliners",
      videos: [
        {
          type: "local",
          src: "videos/headliners-01.mp4",
          title: "Match highlights",
          duration: "0:49",
        },
      ],
    },
    {
      name: "RV",
      videos: [
        {
          type: "local",
          src: "videos/rv-01.mp4",
          title: "Road trip edit",
          duration: "1:18",
        },
      ],
    },
    {
      name: "Bite by Night",
      videos: [
        {
          type: "local",
          src: "videos/bitebynight-01.mp4",
          title: "Night hunt cut",
          duration: "1:07",
        },
      ],
    },
    {
      name: "Valorant",
      videos: [
        {
          type: "yt",
          id: "",
          title: "Ace compilation",
          duration: "2:33",
        },
        {
          type: "local",
          src: "videos/valorant-01.mp4",
          title: "Clutch of the week",
          duration: "0:44",
        },
        {
          type: "yt",
          id: "",
          title: "Radiant grind montage",
          duration: "3:58",
        },
      ],
    },
  ],
};
