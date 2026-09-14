import { j as s } from "./query-C2lwwwNE.js";
import { r } from "./vendor-zmZrVfsR.js";
import { v as o, H as u } from "./index-B8Fjvhyv.js";
import "./ui-D5ooVADr.js";
const m = () => {
    const { language: a, setLanguage: n, enabledLanguages: l } = o(),
      i = r.useMemo(
        () =>
          Object.entries(u)
            .filter(([e]) => l.includes(e))
            .map(([e, t]) => ({ value: e, label: t.label, accent: t.accent })),
        [l],
      ),
      c = r.useCallback(
        (e) => {
          e !== a && n(e);
        },
        [a, n],
      );
    return s.jsxs("div", {
      className: "space-y-2 px-4",
      children: [
        s.jsx("span", {
          className: "text-xs uppercase tracking-wide text-white/70",
          children: "Home Screen Suggesstions",
        }),
        s.jsx("div", {
          className: "flex items-center overflow-x-auto scrollbar-hide",
          children: i.map((e) => {
            const t = e.value === a;
            return s.jsx(
              "button",
              {
                type: "button",
                onClick: () => c(e.value),
                className: `mx-1 rounded-2xl border px-4 py-2 font-montserrat text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 ${
                  t
                    ? "bg-slate-200 text-black border-white"
                    : "border-slate-600 text-slate-300 hover:text-white"
                }`,
                children: e.label,
              },
              e.value,
            );
          }),
        }),
      ],
    });
  },
  p = r.memo(m);
export { p as default };
