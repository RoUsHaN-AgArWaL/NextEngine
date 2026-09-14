import { j as e } from "./query-C2lwwwNE.js";
import { r as s } from "./vendor-zmZrVfsR.js";
const t = "https://heartspace-vert.vercel.app/",
  n = s.memo(() => {
    const a = (r) => {
      (r.preventDefault(),
        typeof window < "u" && window.open(t, "_blank", "noopener,noreferrer"));
    };
    return e.jsx("a", {
      href: t,
      target: "_blank",
      rel: "noreferrer",
      "aria-label": "Discover Heartspace",
      onClick: a,
      className:
        "mx-4 block rounded-3xl bg-gradient-to-r from-purple-900/80 via-slate-900 to-sky-900/80 p-[1px] transition-shadow duration-300 hover:shadow-[0_0_18px_-4px_rgba(168,85,247,0.65)] lg:mx-0",
      children: e.jsxs("div", {
        className:
          "rounded-[calc(1.5rem-1px)] bg-[#0b0b0f]/95 px-6 py-8 shadow-inner shadow-black/40 backdrop-blur",
        children: [
          e.jsx("p", {
            className: "text-xs uppercase tracking-[0.5em] text-white/40",
            children: "Heartspace // Early community",
          }),
          e.jsx("h3", {
            className: "mt-4 text-3xl font-semibold text-white",
            children: "Feeling lonely?",
          }),
          e.jsx("p", {
            className: "mt-3 text-base leading-relaxed text-white/75",
            children:
              "Heartspace is a gentle corner for late-night check-ins, honest voice notes, and caring strangers who actually listen. We're shaping it with people who know how heavy silence can feel.",
          }),
          e.jsx("p", {
            className: "mt-3 text-sm text-white/50",
            children:
              "Join now to help choose the rituals, rooms, and prompts that will support the first wave of this listening community.",
          }),
          e.jsxs("div", {
            className:
              "mt-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-6 py-2 text-sm font-semibold text-white transition-colors duration-200 hover:border-white/30 hover:bg-white/20",
            children: [
              "Visit Heartspace",
              e.jsx("span", {
                "aria-hidden": !0,
                className: "text-lg",
                children: "→",
              }),
            ],
          }),
        ],
      }),
    });
  });
n.displayName = "HeartspaceMidBanner";
export { n as default };
