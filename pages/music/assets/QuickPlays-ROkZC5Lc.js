import { a as I, u as C, j as s } from "./query-C2lwwwNE.js";
import { r as P } from "./vendor-zmZrVfsR.js";
import { u as Q, c as A, L as F, h as q } from "./index-B8Fjvhyv.js";
import {
  i as E,
  g as O,
  s as _,
  C as L,
  a as T,
  b as R,
} from "./songsCache-BBFh4D4w.js";
import { Z as U, m as y, l as z } from "./ui-D5ooVADr.js";
function V() {
  const { setSongs: p, setCurrentSongId: j } = Q();
  P.useState([]), I();
  const c = 5,
    S = 15,
    i = (() => {
      try {
        const t =
          sessionStorage.getItem("songSuggestions") ||
          localStorage.getItem("songSuggestions");
        if (!t) return [];
        let r = JSON.parse(t) || [];
        Array.isArray(r) || (r = []);
        const e = r.slice(-S);
        try {
          const a = JSON.stringify(e);
          localStorage.setItem("songSuggestions", a),
            sessionStorage.setItem("songSuggestions", a);
        } catch {}
        return [...e].reverse();
      } catch {
        return [];
      }
    })(),
    {
      data: l = [],
      isLoading: n,
      error: w,
    } = C({
      queryKey: ["quickPlaySongs", i],
      queryFn: async () => {
        if (E()) {
          const e = O();
          if (e && e.length > 0) return e;
        }
        if (!i || i.length === 0)
          throw new Error("No song IDs found in localStorage");
        const t = await A(i);
        if (!t || t.length === 0)
          throw new Error("Failed to fetch quick play songs");
        const r = t.slice(0, 15);
        return _(r), r;
      },
      enabled: i.length > 0,
      staleTime: 5 * 60 * 60 * 1e3,
      gcTime: 6 * 60 * 60 * 1e3,
      refetchOnWindowFocus: !1,
      retry: 2,
    }),
    N = (() => {
      const t = [];
      for (let r = 0; r < l.length; r += c) t.push(l.slice(r, r + c));
      return t;
    })(),
    b = (t, r) => {
      if (sessionStorage.getItem("roomId")) return;
      const a = [t, ...l.slice(0, r), ...l.slice(r + 1)];
      p(a), j(t.id);
    };
  return w || i.length === 0
    ? null
    : s.jsx(s.Fragment, {
        children:
          (l.length > 0 || n) &&
          s.jsxs("section", {
            className: "space-y-4 px-4",
            children: [
              s.jsxs("div", {
                className: "flex items-center justify-between",
                children: [
                  s.jsx("div", {
                    className: "flex items-center space-x-2",
                    children: s.jsx("h2", {
                      className: "section-title",
                      children: "Quick Picks",
                    }),
                  }),
                  s.jsxs("span", {
                    className: "text-slate-400 flex  text-sm ",
                    children: [
                      "Swipe Right ",
                      s.jsx(U, { className: "inline-block ml-1" }),
                    ],
                  }),
                ],
              }),
              n &&
                s.jsx("div", {
                  className: "rounded-lg",
                  children: Array(5)
                    .fill(0)
                    .map((t, r) =>
                      s.jsxs(
                        y.div,
                        {
                          className:
                            "flex items-center p-3 border-b border-gray-800/30 last:border-b-0 animate-pulse",
                          initial: { opacity: 0, x: -20 },
                          animate: { opacity: 1, x: 0 },
                          transition: { delay: r * 0.1 },
                          children: [
                            s.jsx("div", {
                              className:
                                "relative w-12 h-12 rounded-md overflow-hidden flex-shrink-0 mr-4",
                              children: s.jsx("div", {
                                className:
                                  "w-full h-full bg-gray-700 rounded-md",
                              }),
                            }),
                            s.jsxs("div", {
                              className: "flex-1 min-w-0",
                              children: [
                                s.jsx("div", {
                                  className:
                                    "h-4 bg-gray-700 rounded w-3/4 mb-2",
                                }),
                                s.jsx("div", {
                                  className: "h-3 bg-gray-700 rounded w-1/2",
                                }),
                              ],
                            }),
                          ],
                        },
                        r,
                      ),
                    ),
                }),
              !n &&
                s.jsx("div", {
                  className: "relative",
                  children: s.jsx(L, {
                    opts: { align: "start", loop: !0 },
                    className: "w-full",
                    children: s.jsx(T, {
                      children: N.map((t, r) =>
                        s.jsx(
                          R,
                          {
                            children: s.jsx("div", {
                              className: "rounded-lg",
                              children: t.map((e, a) => {
                                var o, d, m, u, h, x, g, f;
                                const v = r * c + a;
                                return s.jsxs(
                                  y.div,
                                  {
                                    className:
                                      "flex items-center p-3 hover:bg-gray-800/50 cursor-pointer transition-colors border-b border-gray-800/30 last:border-b-0 group",
                                    whileHover: {
                                      backgroundColor: "rgba(55, 65, 81, 0.5)",
                                    },
                                    onClick: () => b(e, v),
                                    initial: { opacity: 0, x: -20 },
                                    animate: { opacity: 1, x: 0 },
                                    transition: { delay: a * 0.1 },
                                    children: [
                                      s.jsxs("div", {
                                        className:
                                          "relative w-12 h-12 rounded-md overflow-hidden flex-shrink-0 mr-4",
                                        children: [
                                          s.jsx(F, {
                                            src:
                                              ((d =
                                                (o =
                                                  e == null
                                                    ? void 0
                                                    : e.image) == null
                                                  ? void 0
                                                  : o[2]) == null
                                                ? void 0
                                                : d.url) ||
                                              ((u =
                                                (m =
                                                  e == null
                                                    ? void 0
                                                    : e.image) == null
                                                  ? void 0
                                                  : m[1]) == null
                                                ? void 0
                                                : u.url) ||
                                              ((x =
                                                (h =
                                                  e == null
                                                    ? void 0
                                                    : e.image) == null
                                                  ? void 0
                                                  : h[0]) == null
                                                ? void 0
                                                : x.url),
                                            alt: e == null ? void 0 : e.name,
                                            className:
                                              "object-cover w-full h-full",
                                          }),
                                          s.jsx("div", {
                                            className:
                                              "absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center",
                                            children: s.jsx(z, {
                                              className: "w-6 h-6 text-white",
                                            }),
                                          }),
                                        ],
                                      }),
                                      s.jsxs("div", {
                                        className: "flex-1 min-w-0",
                                        children: [
                                          s.jsx("p", {
                                            className:
                                              "text-[11px] uppercase tracking-[0.24em] text-white/60 truncate ",
                                            children:
                                              ((f =
                                                (g =
                                                  e == null
                                                    ? void 0
                                                    : e.artists) == null
                                                  ? void 0
                                                  : g.primary) == null
                                                ? void 0
                                                : f
                                                    .map((k) => k.name)
                                                    .join(", ")) ||
                                              "Unknown Artist",
                                          }),
                                          s.jsx("h3", {
                                            className:
                                              "text-xl font-bold truncate  leading-tight text-white/55",
                                            children: q.decode(
                                              (e == null ? void 0 : e.name) ||
                                                "Unknown Song",
                                            ),
                                          }),
                                        ],
                                      }),
                                    ],
                                  },
                                  e == null ? void 0 : e.id,
                                );
                              }),
                            }),
                          },
                          r,
                        ),
                      ),
                    }),
                  }),
                }),
            ],
          }),
      });
}
export { V as default };
