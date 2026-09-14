import { j as t } from "./query-C2lwwwNE.js";
import {
  e as H,
  g as K,
  i as $,
  a as q,
  j as A,
  L as F,
  h as T,
  f as v,
} from "./index-B8Fjvhyv.js";
import { r as n } from "./vendor-zmZrVfsR.js";
import { k as U, m as _, l as B, n as G, a as M } from "./ui-D5ooVADr.js";
const Q = () =>
  t.jsxs("div", {
    className: "relative flex flex-col items-center cursor-pointer",
    children: [
      t.jsx("div", {
        className:
          "aspect-square rounded-lg overflow-hidden size-36 md:size-60 mx-2 bg-gray-700 animate-pulse",
      }),
      t.jsx("h3", {
        className:
          "mt-2 w-[9rem] md:w-[15rem] h-4 bg-gray-700 animate-pulse rounded-md",
      }),
      t.jsx("p", {
        className: "mt-1 w-20 h-3 bg-gray-700 animate-pulse rounded-md",
      }),
    ],
  });
function ee({
  title: m,
  searchTerm: N,
  localStorageKey: b,
  localStorageExpiryKey: S,
  playlistClass: y = "w-[12rem] md:w-[15rem]",
  imageLinks: c = [],
  limit: d,
  onShowMore: g,
  isMobile: I,
  language: C = "english",
}) {
  const { setUrl: E, setCategory: L } = H(),
    [h, f] = n.useState(!1),
    [r, i] = n.useState([]),
    P = K(),
    { ref: k, inView: u } = $({
      threshold: 1,
      rootMargin: "0px",
      triggerOnce: !0,
    }),
    {
      containerRef: z,
      scrollLeft: O,
      scrollRight: R,
      canScrollLeft: D,
      canScrollRight: J,
      refresh: x,
    } = q(1.8),
    w = N,
    o = b,
    l = S,
    V = async () => {
      try {
        f(!0);
        let e,
          s = 0;
        if (
          (localStorage.getItem(o) &&
            ((e = JSON.parse(localStorage.getItem(o))),
            (s = parseInt(localStorage.getItem(l)))),
          !e || e.length < 1)
        ) {
          const a = await v(w, "playlists", d);
          if (!a.success) {
            i([]);
            return;
          }
          ((e = a.data),
            localStorage.setItem(o, JSON.stringify(e)),
            localStorage.setItem(
              l,
              (Date.now() + 2 * 7 * 24 * 60 * 60 * 1e3).toString(),
            ));
        } else if (e && s < Date.now()) {
          const a = await v(w, "playlists", d);
          if (!a.success) return;
          ((e = a.data),
            localStorage.setItem(o, JSON.stringify(e)),
            localStorage.setItem(
              l,
              (Date.now() + 7 * 24 * 60 * 60 * 1e3).toString(),
            ));
        }
        i((e || []).slice(0, 7));
      } catch (e) {
        console.log(e);
      } finally {
        f(!1);
      }
    };
  (n.useEffect(() => {
    (i([]), V());
  }, [C]),
    n.useEffect(() => {
      if (u) {
        const e = JSON.parse(localStorage.getItem(o) || "[]");
        i((s) => [...s, ...e.slice(s.length, s.length + 7)]);
      }
    }, [u]),
    n.useEffect(() => {
      x();
    }, [r.length, h, x]));
  const j = (e) => {
      e != null &&
        e.id &&
        (L("playlists"), e.url && E(e.url), P(`/playlist/${e.id}`));
    },
    p = (() => {
      try {
        return JSON.parse(localStorage.getItem(o) || "[]") ?? [];
      } catch {
        return r;
      }
    })();
  return (
    r &&
    t.jsxs("section", {
      className: "space-y-2 z-0",
      children: [
        t.jsxs("div", {
          className: "flex items-center justify-between",
          children: [
            t.jsx("h2", { className: "section-title", children: m }),
            t.jsxs("div", {
              className: "flex items-center gap-3 pr-4 text-slate-200",
              children: [
                g &&
                  I &&
                  p.length > 0 &&
                  t.jsx("button", {
                    type: "button",
                    className:
                      "text-sm font-medium text-white/70 hover:text-white",
                    onClick: () => {
                      const e = A(p, j).map((s, a) => ({
                        ...s,
                        image:
                          s.image || (c == null ? void 0 : c[a]) || s.image,
                      }));
                      g(m, e);
                    },
                    children: "Show more",
                  }),
                t.jsx(U, {}),
              ],
            }),
          ],
        }),
        t.jsxs("div", {
          className: "relative group",
          children: [
            t.jsx("div", {
              ref: z,
              className: "overflow-x-auto scrollbar-hide ",
              children: t.jsxs("div", {
                className: "grid grid-flow-col auto-cols-max gap-1 w-max px-4",
                children: [
                  r == null
                    ? void 0
                    : r.map((e, s) =>
                        t.jsxs(
                          _.div,
                          {
                            className: `relative group cursor-pointer ${y}  p-1 mb-14 max-w-[15rem]`,
                            initial: { opacity: 0 },
                            whileInView: { opacity: 1 },
                            whileHover: { scale: 1.02 },
                            transition: { duration: 0.3 },
                            onClick: () => j(e),
                            children: [
                              t.jsxs("div", {
                                className:
                                  "relative aspect-[8/10] rounded-sm overflow-hidden",
                                children: [
                                  t.jsx(F, {
                                    src: c[s],
                                    alt: e == null ? void 0 : e.name,
                                    className:
                                      "object-cover w-full h-full rounded-xl",
                                  }),
                                  t.jsx("div", {
                                    className:
                                      "absolute inset-0  bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center",
                                    children: t.jsx(B, {
                                      className:
                                        "w-12 h-12 text-primary-foreground",
                                    }),
                                  }),
                                  t.jsx("div", {
                                    className:
                                      "absolute inset-0 bg-gradient-t from-black via-black/80 to-transparent w-full h-full z-50",
                                  }),
                                ],
                              }),
                              t.jsxs("div", {
                                className: " w-[12rem] md:w-[15rem] ",
                                children: [
                                  t.jsxs("p", {
                                    className:
                                      "mt-2  text-[11px] uppercase tracking-[0.24em] text-white/65 truncate",
                                    children: [
                                      e == null ? void 0 : e.language,
                                      " â€¢ ",
                                      e == null ? void 0 : e.songCount,
                                      " songs",
                                    ],
                                  }),
                                  t.jsx("h3", {
                                    className:
                                      "text-xl font-bold truncate  leading-tight   text-white/70",
                                    children: T.decode(
                                      (e == null ? void 0 : e.name) ||
                                        "NexAudioX",
                                    ),
                                  }),
                                ],
                              }),
                              t.jsx("div", {
                                ref: k,
                                className: "min-w-[1px]",
                              }),
                            ],
                          },
                          e == null ? void 0 : e.id,
                        ),
                      ),
                  h && [...Array(6)].map((e, s) => t.jsx(Q, {}, s)),
                ],
              }),
            }),
            D &&
              t.jsx("button", {
                type: "button",
                "aria-label": "Scroll playlist",
                onClick: O,
                className:
                  "hidden absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black/80 to-transparent lg:flex items-center justify-end pr-3 transition-opacity duration-200 opacity-0 group-hover:opacity-100",
                children: t.jsx(G, { className: "h-14 w-14 text-white" }),
              }),
            J &&
              t.jsx("button", {
                type: "button",
                "aria-label": "Scroll playlist",
                onClick: R,
                className:
                  "hidden absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black/80 to-transparent lg:flex items-center justify-end pr-3 transition-opacity duration-200 opacity-0 group-hover:opacity-100",
                children: t.jsx(M, { className: "h-14 w-14 text-white" }),
              }),
          ],
        }),
      ],
    })
  );
}
export { ee as default };
