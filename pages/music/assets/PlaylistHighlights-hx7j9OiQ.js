import { j as t } from "./query-C2lwwwNE.js";
import { r as i } from "./vendor-zmZrVfsR.js";
import { k as E, u as F, b as M, L as W, h as Y } from "./index-B8Fjvhyv.js";
import { MoreOptions as _ } from "./MoreOptions-DwGFbOIV.js";
import {
  u as D,
  _ as S,
  $ as O,
  a0 as T,
  m as p,
  l as V,
  n as q,
  a as G,
} from "./ui-D5ooVADr.js";
const k = i.memo(
  ({ playlistId: n, name: o, limit: d, onShowMore: c, isMobile: x }) => {
    const {
        songs: l,
        allSongs: r,
        loading: P,
        info: a,
      } = E(n, { name: o, limit: d }),
      { setSongs: I, setCurrentSongId: H } = F(),
      m = i.useRef(null),
      [f, y] = i.useState(0),
      h =
        o ??
        (a == null ? void 0 : a.displayName) ??
        (a == null ? void 0 : a.title) ??
        "Featured Playlist",
      g = (e) => {
        !(e != null && e.id) ||
          sessionStorage.getItem("roomId") ||
          (H(e.id), I(r.length ? r : l));
      },
      R = () => {
        const e = m.current;
        e &&
          (e.scrollBy({ left: e.clientWidth * 2, behavior: "smooth" }),
          y((s) => s + 1));
      },
      L = () => {
        const e = m.current;
        e &&
          (e.scrollBy({ left: -e.clientWidth * 2, behavior: "smooth" }),
          y((s) => s - 1));
      },
      u = i.useRef(null),
      { scrollYProgress: j } = D({
        target: u,
        offset: ["start end", "end start"],
      }),
      $ = S(j, [0, 0.6, 0.9, 0.91, 0.95, 0.98, 1], [7, 0, 0, 0, 0.4, 1, 2]),
      z = O(S(j, [0, 0.5, 1], [-15, 0, 15]), { mass: 0.1 }),
      A = T(`blur(${$}px)`);
    return P && l.length === 0
      ? t.jsxs(p.section, {
          className: "space-y-2 w-screen lg:w-full",
          ref: u,
          children: [
            t.jsx("div", {
              className: "flex items-center justify-between",
              children: t.jsx("h2", {
                className: "section-title",
                children: h,
              }),
            }),
            t.jsx("div", {
              className: "overflow-x-auto scrollbar-hide",
              children: t.jsx("div", {
                className:
                  "grid grid-flow-col gap-0 lg:gap-1 auto-cols-max w-screen lg:w-full px-2",
                children: Array.from({ length: 6 }).map((e, s) =>
                  t.jsxs(
                    "div",
                    {
                      className:
                        "size-[12rem] md:size-60 p-1 mb-14 animate-pulse",
                      children: [
                        t.jsx("div", {
                          className:
                            "relative aspect-[8/10] rounded-lg bg-secondary",
                        }),
                        t.jsx("div", {
                          className: "mt-2 h-4 bg-secondary rounded w-3/4",
                        }),
                        t.jsx("div", {
                          className: "mt-1 h-3 bg-secondary rounded w-1/2",
                        }),
                      ],
                    },
                    `playlist-loading-${s}`,
                  ),
                ),
              }),
            }),
          ],
        })
      : l.length
      ? t.jsxs(p.section, {
          className: "space-y-2  lg:w-full no-select",
          ref: u,
          style: { filter: A, y: z },
          children: [
            t.jsxs("div", {
              className: "flex items-center justify-between",
              children: [
                t.jsx("h2", { className: "section-title", children: h }),
                c &&
                  (r.length || l.length) > 0 &&
                  t.jsx("button", {
                    type: "button",
                    className:
                      "text-sm font-medium text-slate-200 hover:text-white pr-4",
                    onClick: () => c(h, M(r.length ? r : l, g)),
                    children: "Show more",
                  }),
              ],
            }),
            t.jsxs("div", {
              className: "relative group",
              children: [
                t.jsx("div", {
                  ref: m,
                  className:
                    "overflow-x-auto overflow-y-hidden scrollbar-hide grid grid-flow-col gap-0 lg:gap-1 auto-cols-max   px-2",
                  children: l.map((e) => {
                    var s, b, v, w, N, C;
                    return t.jsxs(
                      p.div,
                      {
                        className:
                          "relative group cursor-pointer  p-[2px]   md:max-w-[12rem]",
                        whileHover: { scale: 1.02 },
                        onClick: () => g(e),
                        children: [
                          t.jsxs("div", {
                            className:
                              "relative aspect-[8/10]  rounded-lg overflow-hidden",
                            children: [
                              t.jsx(W, {
                                src:
                                  ((b =
                                    (s = e == null ? void 0 : e.image) == null
                                      ? void 0
                                      : s[2]) == null
                                    ? void 0
                                    : b.url) ??
                                  ((w =
                                    (v = e == null ? void 0 : e.image) == null
                                      ? void 0
                                      : v[0]) == null
                                    ? void 0
                                    : w.url),
                                alt: e == null ? void 0 : e.name,
                                className: "object-cover w-full h-full",
                              }),
                              t.jsx("div", {
                                className:
                                  "absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center p-2",
                                children: t.jsx(V, {
                                  className:
                                    "w-12 h-12 text-primary-foreground",
                                }),
                              }),
                            ],
                          }),
                          t.jsxs("div", {
                            className: "flex  justify-between items-center",
                            children: [
                              t.jsxs("div", {
                                className: "w-[7rem] md:w-[10rem]",
                                children: [
                                  t.jsx("p", {
                                    className:
                                      "mt-2 w-full text-[11px] lg:text-xs uppercase tracking-[0.24em] text-white/65 truncate",
                                    children:
                                      (C =
                                        (N = e == null ? void 0 : e.artists) ==
                                        null
                                          ? void 0
                                          : N.primary) == null
                                        ? void 0
                                        : C.map((B) => B.name).join(", "),
                                  }),
                                  t.jsx("h3", {
                                    className:
                                      " text-base  lg:text-lg font-bold truncate  leading-tight   text-white/70",
                                    children: Y.decode(
                                      (e == null ? void 0 : e.name) ||
                                        "NexAudioX",
                                    ),
                                  }),
                                ],
                              }),
                              t.jsx(_, { song: e }),
                            ],
                          }),
                        ],
                      },
                      e.id,
                    );
                  }),
                }),
                f > 0 &&
                  t.jsx("button", {
                    type: "button",
                    "aria-label": "Scroll playlist",
                    onClick: L,
                    className:
                      "hidden absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black/80 to-transparent lg:flex items-center justify-end pr-3 transition-opacity duration-200 opacity-0 group-hover:opacity-100",
                    children: t.jsx(q, { className: "h-14 w-14 text-white" }),
                  }),
                f <= 0 &&
                  t.jsx("button", {
                    type: "button",
                    "aria-label": "Scroll playlist",
                    onClick: R,
                    className:
                      "hidden absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black/80 to-transparent lg:flex items-center justify-end pr-3 transition-opacity duration-200 opacity-0 group-hover:opacity-100",
                    children: t.jsx(G, { className: "h-14 w-14 text-white" }),
                  }),
              ],
            }),
          ],
        })
      : null;
  },
);
k.displayName = "PlaylistHighlightsContent";
const J = ({ playlistId: n, name: o, limit: d, onShowMore: c, isMobile: x }) =>
    t.jsx(k, { playlistId: n, name: o, limit: d, onShowMore: c, isMobile: x }),
  ee = i.memo(J);
export { ee as default };
