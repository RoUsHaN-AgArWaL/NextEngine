if (!self.define) {
  let s,
    e = {};
  const l = (l, i) => (
    (l = new URL(l + ".js", i).href),
    e[l] ||
      new Promise((e) => {
        if ("document" in self) {
          const s = document.createElement("script");
          (s.src = l), (s.onload = e), document.head.appendChild(s);
        } else (s = l), importScripts(l), e();
      }).then(() => {
        let s = e[l];
        if (!s) throw new Error(`Module ${l} didn’t register its module`);
        return s;
      })
  );
  self.define = (i, n) => {
    const r =
      s ||
      ("document" in self ? document.currentScript.src : "") ||
      location.href;
    if (e[r]) return;
    let o = {};
    const u = (s) => l(s, r),
      t = { module: { uri: r }, exports: o, require: u };
    e[r] = Promise.all(i.map((s) => t[s] || u(s))).then((s) => (n(...s), o));
  };
}
define(["./workbox-4302cd73"], function (s) {
  "use strict";
  self.addEventListener("message", (s) => {
    s.data && "SKIP_WAITING" === s.data.type && self.skipWaiting();
  }),
    s.precacheAndRoute(
      [
        { url: "assets/ArtistsShowcase-BCHA2rFx.js", revision: null },
        { url: "assets/browser-CLRIYqV3.js", revision: null },
        { url: "assets/EnglishSongs-DWtZx7lP.js", revision: null },
        { url: "assets/HeartspaceMidBanner-kjrftHPU.js", revision: null },
        { url: "assets/Hero-DgdONEmi.js", revision: null },
        { url: "assets/HomeContentAd-B-aLo4CJ.js", revision: null },
        { url: "assets/index-B8Fjvhyv.js", revision: null },
        { url: "assets/index-DD2wW41L.css", revision: null },
        { url: "assets/KpopSongs-DbgwI_4m.js", revision: null },
        { url: "assets/LanguageSelectionPopup-CevQxGYj.js", revision: null },
        { url: "assets/LanguageSwitcher-0jHa-04W.js", revision: null },
        { url: "assets/LazyLoadOnVisible-Bd-yx0lF.js", revision: null },
        { url: "assets/logo-CYhIHMRe.jpeg", revision: null },
        { url: "assets/MoreOptions-DwGFbOIV.js", revision: null },
        { url: "assets/PlaylistComponent-LGcw_7_g.js", revision: null },
        { url: "assets/PlaylistHighlights-hx7j9OiQ.js", revision: null },
        { url: "assets/query-C2lwwwNE.js", revision: null },
        { url: "assets/QuickPlays-ROkZC5Lc.js", revision: null },
        { url: "assets/RandomPics-CU1P-1uF.js", revision: null },
        { url: "assets/SearchModal-BCokcH0t.js", revision: null },
        { url: "assets/songsCache-BBFh4D4w.js", revision: null },
        { url: "assets/SongSuggestions-oLGgJWG_.js", revision: null },
        { url: "assets/SpeedList-BE8-h7Zg.js", revision: null },
        { url: "assets/ui-D5ooVADr.js", revision: null },
        { url: "assets/UpdateMessage-w9TzRNh-.js", revision: null },
        { url: "assets/vendor-zmZrVfsR.js", revision: null },
        { url: "assets/VideoPreviewSongs-Cs4Q-VD5.js", revision: null },
        { url: "assets/workbox-window.prod.es5-B9K5rw8f.js", revision: null },
        { url: "group.png", revision: "37ac91c77de3b78891331f4bd2233c0f" },
        { url: "hindigroup.png", revision: "578e08a50888b95323b266b30883059e" },
        { url: "index.html", revision: "50032bc1ac19f12135b8e443a2c0a0cf" },
        { url: "logo.png", revision: "7e3040ecd2955de3651ad7bf287feb72" },
        {
          url: "preloader2.webm",
          revision: "29e6065242d365c77cbbcb60dcac660e",
        },
        {
          url: "telugugroup.png",
          revision: "c6e4be985457a9a2a26506b7b0d1b56b",
        },
        { url: "logo.png", revision: "7e3040ecd2955de3651ad7bf287feb72" },
        {
          url: "manifest.webmanifest",
          revision: "b6f7ef2904920993478830d07e8643ed",
        },
      ],
      {},
    ),
    s.cleanupOutdatedCaches(),
    s.registerRoute(
      new s.NavigationRoute(s.createHandlerBoundToURL("index.html")),
    ),
    s.registerRoute(
      /\.webm$/,
      new s.CacheFirst({
        cacheName: "video-cache",
        plugins: [
          new s.ExpirationPlugin({ maxEntries: 10, maxAgeSeconds: 2592e3 }),
        ],
      }),
      "GET",
    );
});
