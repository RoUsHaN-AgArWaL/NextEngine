import { j as e } from "./query-C2lwwwNE.js";
import { v as p, g as m, e as x } from "./index-B8Fjvhyv.js";
import { _ as a, $ as f, m as n } from "./ui-D5ooVADr.js";
import "./vendor-zmZrVfsR.js";
function y({ motionValue: i }) {
  const { language: r } = p(),
    o = m(),
    { setCategory: c, setUrl: g } = x(),
    d = a(i, (s) => Math.max(0, s)),
    u = a(d, [0, 0.05, 1], [1, 0, 0]),
    h = f(a(i, [0, 0.4, 1], [1, 0, 0]), {
      mass: 0.9,
      stiffness: 500,
      damping: 60,
    }),
    l = [
      {
        language: "english",
        title: "English Hits",
        description: "Kick back to the best new and recent Cover",
        image: "/group.png",
        playlistId: "/playlist/48189087",
        url: "https://www.jiosaavn.com/featured/english-viral-hits/pm49jiq,CNs_",
      },
      {
        language: "telugu",
        title: "Telugu Hits",
        description: "Relax with the best new and recent Cover",
        image: "/telugugroup.png",
        playlistId: "playlist/696317722",
        url: "https://www.jiosaavn.com/featured/house-party-telugu/YWsQ67Dp7qDc1EngHtQQ2g__",
      },
      {
        language: "hindi",
        title: "Hindi Hits",
        description: "The biggest Hindi hits all in one playlist",
        image: "/hindigroup.png",
        playlistId: "playlist/903166403",
        url: "https://www.jiosaavn.com/featured/best-of-romance-hindi/SBKnUgjNeMIwkg5tVhI3fw__",
      },
    ],
    t = l.find((s) => s.language === r) || l[0];
  return e.jsx(n.div, {
    style: { opacity: u, scale: h },
    className:
      "hidden lg:block lg:fixed w-full mt-[10vh] h-[70vh] rounded-2xl z-[39]  bg-black",
    children: e.jsxs("div", {
      className: "relative flex  h-full w-full",
      children: [
        e.jsx("div", {
          className: " h-full flex items-center justify-center ",
          children: e.jsxs("div", {
            className: "max-w-xl z-10 ml-5",
            children: [
              e.jsx("p", {
                className:
                  "text-white/80  text-[11px] 2xl:text-sm  uppercase tracking-wider  mb-3",
                children: "Trending Playlist",
              }),
              e.jsx("h1", {
                className:
                  "text-white text-5xl lg:text-7xl font-extrabold mb-4 leading-tight",
                children: t.title,
              }),
              e.jsx("p", {
                className:
                  "text-white/80  text-[11px] 2xl:text-sm  uppercase tracking-wider mb-3",
                children: t.description,
              }),
              e.jsxs("button", {
                className:
                  "flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-bold text-base hover:scale-105 transition-transform shadow-2xl",
                onClick: () => {
                  (c("playlists"), g(t.url), o(t.playlistId));
                },
                children: [
                  e.jsx("svg", {
                    width: "20",
                    height: "20",
                    viewBox: "0 0 24 24",
                    fill: "currentColor",
                    children: e.jsx("path", { d: "M8 5v14l11-7z" }),
                  }),
                  "EXPLORE PLAYLIST",
                ],
              }),
            ],
          }),
        }),
        e.jsx("div", {
          className: "absolute bottom-36 right-0 w-[60%]  items-center h-full ",
          children: e.jsx(n.img, {
            initial: { opacity: 0, x: -50 },
            animate: { opacity: 1, scale: 1, x: 40 },
            transition: { duration: 0.7, ease: "easeInOut", delay: 0.3 },
            src: t.image,
            alt: t.title,
            className:
              "w-full h-full object-cover object-center [mask-image:linear-gradient(to_top,transparent,black_20%)]",
          }),
        }),
      ],
    }),
  });
}
export { y as default };
