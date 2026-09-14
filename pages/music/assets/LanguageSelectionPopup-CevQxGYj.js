import { j as t } from "./query-C2lwwwNE.js";
import { r as a } from "./vendor-zmZrVfsR.js";
import { v as h, H as b } from "./index-B8Fjvhyv.js";
import { A as w, m as n, b as y } from "./ui-D5ooVADr.js";
const x = "NexAudioX:languagePopupDismissed",
  j = () => {
    const { enabledLanguages: o, setEnabledLanguages: r, setLanguage: c } = h(),
      [l, u] = a.useState(!1),
      [i, d] = a.useState([]);
    a.useEffect(() => {
      if (!window.localStorage.getItem(x)) {
        const s = setTimeout(() => u(!0), 800);
        return () => clearTimeout(s);
      }
    }, []),
      a.useEffect(() => {
        l && d([...o]);
      }, [l, o]);
    const p = a.useMemo(
        () => Object.keys(b).map((e) => ({ value: e, label: b[e].label })),
        [],
      ),
      g = a.useCallback((e) => {
        d((s) =>
          s.includes(e)
            ? s.length <= 1
              ? s
              : s.filter((f) => f !== e)
            : [...s, e],
        );
      }, []),
      m = a.useCallback(() => {
        r(i), c(i[0]), window.localStorage.setItem(x, "true"), u(!1);
      }, [i, r, c]);
    return l
      ? t.jsx(w, {
          children:
            l &&
            t.jsx(n.div, {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              exit: { opacity: 0 },
              className:
                "fixed inset-0 z-[9999] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm px-4 pb-6 sm:pb-0",
              onClick: (e) => {
                e.target === e.currentTarget && i.length > 0 && m();
              },
              children: t.jsxs(n.div, {
                initial: { opacity: 0, y: 40 },
                animate: { opacity: 1, y: 0 },
                exit: { opacity: 0, y: 30 },
                transition: { type: "spring", damping: 28, stiffness: 320 },
                className:
                  "relative w-full max-w-sm rounded-2xl border border-slate-700/60 bg-[#0e0e0e] p-5 shadow-2xl",
                children: [
                  t.jsxs("div", {
                    className: "space-y-1 mb-5",
                    children: [
                      t.jsx("span", {
                        className:
                          "text-xs uppercase tracking-wide text-white/70",
                        children: "Home Screen Suggestions",
                      }),
                      t.jsx("p", {
                        className: "text-sm text-slate-400",
                        children:
                          "Select the languages you'd like to see. You can change this later in settings.",
                      }),
                    ],
                  }),
                  t.jsx("div", {
                    className: "flex flex-wrap gap-2 mb-6",
                    children: p.map((e) => {
                      const s = i.includes(e.value);
                      return t.jsxs(
                        n.button,
                        {
                          type: "button",
                          whileTap: { scale: 0.95 },
                          onClick: () => g(e.value),
                          className: `relative rounded-2xl border px-5 py-2.5 font-montserrat text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 ${
                            s
                              ? "bg-slate-200 text-black border-white"
                              : "border-slate-600 text-slate-300 hover:text-white"
                          }`,
                          children: [
                            e.label,
                            s &&
                              t.jsx(n.span, {
                                initial: { scale: 0 },
                                animate: { scale: 1 },
                                className:
                                  "absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 rounded-full bg-white border border-slate-300",
                                children: t.jsx(y, {
                                  className: "w-2.5 h-2.5 text-black",
                                  strokeWidth: 3,
                                }),
                              }),
                          ],
                        },
                        e.value,
                      );
                    }),
                  }),
                  t.jsx("button", {
                    type: "button",
                    disabled: i.length === 0,
                    onClick: m,
                    className:
                      "w-full rounded-2xl bg-slate-200 py-3 text-sm font-bold text-black font-montserrat transition hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed",
                    children: "Let's Go",
                  }),
                  t.jsx("p", {
                    className: "mt-3 text-center text-[11px] text-white/30",
                    children: "Profile → Settings to update later",
                  }),
                ],
              }),
            }),
        })
      : null;
  },
  E = a.memo(j);
export { E as default };
