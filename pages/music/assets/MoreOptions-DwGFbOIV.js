import { j as e } from "./query-C2lwwwNE.js";
import {
  w as o,
  g as i,
  u as d,
  D as u,
  x as l,
  y as c,
  z as r,
  I as p,
  C as x,
  J as h,
} from "./index-B8Fjvhyv.js";
import { a1 as g } from "./ui-D5ooVADr.js";
import "./vendor-zmZrVfsR.js";
function N({ song: t }) {
  (o(), o(), i());
  const { addSong: n, setCurrentSongId: m, setSongs: w } = d();
  function a() {
    (n(t), h("Song added to queue"));
  }
  return e.jsxs(u, {
    children: [
      e.jsx(l, {
        asChild: !0,
        children: e.jsx("button", {
          className: "",
          children: e.jsx(g, {
            className: "w-5 h-5 text-white hover:text-gray-400 ",
          }),
        }),
      }),
      e.jsxs(c, {
        className: "w-56 p-2 bg-[#080808]",
        align: "end",
        children: [
          e.jsx(r, {
            className:
              "hover:bg-neutral-800 hover:text-white text-white  rounded cursor-pointer ",
            onClick: (s) => {
              (s.stopPropagation(), a());
            },
            children: e.jsx("div", {
              className: "text-center w-full",
              children: "Add to queue",
            }),
          }),
          e.jsx(r, {
            className: "hover:bg-neutral-800 hover:text-white text-white",
            onClick: (s) => {
              s.stopPropagation();
            },
            children: e.jsx(p, { songId: t.id, insideMoreOptions: !0 }),
          }),
          e.jsx(x, { songId: t.id, insideMoreOptions: !0 }),
        ],
      }),
    ],
  });
}
export { N as MoreOptions };
