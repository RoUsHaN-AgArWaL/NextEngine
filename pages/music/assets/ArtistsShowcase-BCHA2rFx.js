import { j as l } from "./query-C2lwwwNE.js";
import { r as t } from "./vendor-zmZrVfsR.js";
import { g, e as b, l as v, L as j } from "./index-B8Fjvhyv.js";
import { Q as N, Z as S, m as L } from "./ui-D5ooVADr.js";
const y = [
    { col: "col-span-2 ", row: "row-span-2 " },
    { col: "col-span-1", row: "row-span-1" },
    { col: "col-span-1", row: "row-span-1" },
    { col: "col-span-1", row: "row-span-1" },
    { col: "col-span-1", row: "row-span-1" },
    { col: "col-span-2", row: "row-span-2" },
    { col: "col-span-2", row: "row-span-2" },
    { col: "col-span-1", row: "row-span-1" },
    { col: "col-span-1", row: "row-span-1" },
    { col: "col-span-1", row: "row-span-1" },
    { col: "col-span-1", row: "row-span-1" },
    { col: "col-span-2", row: "row-span-2" },
    { col: "col-span-2", row: "row-span-2" },
    { col: "col-span-1", row: "row-span-1" },
    { col: "col-span-1", row: "row-span-1" },
    { col: "col-span-1", row: "row-span-1" },
  ],
  k =
    "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=60",
  A = t.memo(({ artists: r, title: h = "Artists", className: u }) => {
    const m = g(),
      { setCategory: n } = b(),
      c = t.useRef(null),
      [p, f] = t.useState(!1),
      [d, x] = t.useState(!1),
      i = t.useMemo(() => {
        if (!(r != null && r.length)) return [];
        const o = 15;
        if (r.length >= o) return r.slice(0, o);
        const e = o - r.length,
          s = [...r];
        for (let a = 0; a < e; a += 1) s.push(r[a % r.length]);
        return s.slice(0, o);
      }, [r]);
    t.useEffect(() => {
      const o = c.current;
      if (!o) return;
      const e = () => {
        (f(o.scrollLeft > 8),
          x(o.scrollWidth - o.clientWidth - o.scrollLeft > 8));
      };
      return (
        e(),
        o.addEventListener("scroll", e, { passive: !0 }),
        window.addEventListener("resize", e),
        () => {
          (o.removeEventListener("scroll", e),
            window.removeEventListener("resize", e));
        }
      );
    }, [i]);
    const w = (o) => {
      const e = c.current;
      if (!e) return;
      const s = e.clientWidth * 0.8;
      e.scrollBy({ left: o === "left" ? -s : s, behavior: "smooth" });
    };
    return i.length === 0
      ? null
      : l.jsx("section", {
          className: v(
            "relative  w-screen lg:w-full   overflow-hidden bg-gradient-to-b  py-14 md:py-20",
            u,
          ),
          children: l.jsxs("div", {
            className: "relative z-0 flex flex-col items-center text-center",
            children: [
              l.jsxs("div", {
                className: "flex items-center gap-4",
                children: [
                  l.jsx("h2", {
                    className:
                      "text-3xl md:text-4xl font-extrabold tracking-[0.45em] text-white uppercase mb-10 font-montserrat",
                    children: h,
                  }),
                  l.jsxs("div", {
                    className: "hidden lg:flex gap-2 text-white/60 mb-10",
                    children: [
                      l.jsx("button", {
                        type: "button",
                        "aria-label": "Scroll artists left",
                        onClick: () => w("left"),
                        disabled: !p,
                        className: `rounded-full border border-white/20 p-2 transition-colors ${p ? "hover:bg-white/10 text-slate-200" : "cursor-not-allowed text-slate-500/60"}`,
                        children: l.jsx(N, { className: "h-4 w-4" }),
                      }),
                      l.jsx("button", {
                        type: "button",
                        "aria-label": "Scroll artists right",
                        onClick: () => w("right"),
                        disabled: !d,
                        className: `rounded-full border border-white/20 p-2 transition-colors ${d ? "hover:bg-white/10 text-slate-200" : "cursor-not-allowed text-slate-500/60"}`,
                        children: l.jsx(S, { className: "h-4 w-4" }),
                      }),
                    ],
                  }),
                ],
              }),
              l.jsx("div", {
                ref: c,
                className:
                  "overflow-x-auto w-screen overflow-y-hidden scrollbar-hide scroll-smooth",
                children: l.jsx("div", {
                  className:
                    "grid grid-rows-2   grid-flow-col lg:auto-cols-[200px] 2xl:auto-cols-[200px] 4xl:auto-cols-[300px] auto-cols-[minmax(100px,1fr)]   sm:px-12",
                  children: i.map((o, e) => {
                    const s = y[e] ?? { col: "col-span-1", row: "row-span-1" },
                      a = o.name ?? "";
                    return l.jsxs(
                      L.div,
                      {
                        whileTap: { scale: 0.97 },
                        onClick: () => {
                          (n == null || n("artists"),
                            o.id && m(`/artist/${o.id}`));
                        },
                        className: `relative ${s.col} ${s.row} cursor-pointer aspect-square w-full max-w-full overflow-hidden  rounded-full border border-white/10 bg-gradient-to-b from-white/10 via-white/5 to-white/5  shadow-[0_20px_45px_rgba(8,8,12,0.55)] backdrop-blur-lg transition-all duration-200 group-hover:shadow-[0_26px_56px_rgba(8,8,12,0.65)] group-hover:bg-transparent`,
                        children: [
                          l.jsx(j, {
                            src: o.image || k,
                            alt: a || "Artist",
                            className:
                              "h-full w-full overflow-hidden  object-cover",
                          }),
                          l.jsx("div", {
                            className:
                              "inset-0 opacity-0 hover:opacity-100 bg-black/10 w-full h-full  absolute",
                          }),
                        ],
                      },
                      `${o.id}-${e}`,
                    );
                  }),
                }),
              }),
            ],
          }),
        });
  });
A.displayName = "ArtistsShowcase";
export { A as default };
