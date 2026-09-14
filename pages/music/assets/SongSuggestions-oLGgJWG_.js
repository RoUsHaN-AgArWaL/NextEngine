import { u as h, j as s } from "./query-C2lwwwNE.js";
import { u as j, L as o, d as n, o as f, p } from "./index-B8Fjvhyv.js";
import { MoreOptions as x } from "./MoreOptions-DwGFbOIV.js";
import { m as w } from "./ui-D5ooVADr.js";
import "./vendor-zmZrVfsR.js";
function F() {
  const { setSongs: t, setCurrentSongId: i } = j(),
    c = (() => {
      const e = localStorage.getItem("songId");
      return e && e !== "null" ? e : null;
    })(),
    {
      data: r = [],
      isLoading: u,
      error: N,
    } = h({
      queryKey: ["songSuggestions", c],
      queryFn: async () => {
        if (!c) throw new Error("No song ID found");
        const e = await f(p, c, 8);
        if (!e || !e.success || !e.data)
          throw new Error("Failed to fetch suggestions");
        return e.data.slice(0, 8);
      },
      enabled: !!c,
      staleTime: 30 * 60 * 1e3,
      gcTime: 20 * 60 * 1e3,
      refetchOnWindowFocus: !1,
      retry: 2,
    }),
    d = 4;
  Math.ceil(r.length / d);
  const l = 0,
    m = l + d;
  return s.jsx("section", {
    className: "space-y-2 w-screen lg:w-full no-select",
    children:
      r.length > 0 &&
      s.jsxs(s.Fragment, {
        children: [
          s.jsx("h2", {
            className: "section-title",
            children: "Suggested for You",
          }),
          s.jsxs("div", {
            className: "md:px-4 overflow-y-auto scrollbar-hide flex px-1",
            children: [
              s.jsx("div", {
                children:
                  r == null
                    ? void 0
                    : r.slice(l, m).map((e) => {
                        var a;
                        return s.jsxs(
                          w.div,
                          {
                            className:
                              "flex items-center w-[calc(50vw)] md:w-[calc(45vw)] justify-between space-x-4 p-2 hover:text-black hover:bg-gray-700 rounded-lg cursor-pointer",
                            whileHover: { scale: 1.01 },
                            onClick: () => {
                              sessionStorage.getItem("roomId") ||
                                (t(r), i(e == null ? void 0 : e.id));
                            },
                            children: [
                              s.jsxs("div", {
                                className:
                                  "flex items-center w-[calc(100vw-5rem)]",
                                children: [
                                  s.jsx(o, {
                                    src:
                                      (a = e == null ? void 0 : e.image[2]) ==
                                      null
                                        ? void 0
                                        : a.url,
                                    alt: e == null ? void 0 : e.name,
                                    className:
                                      "w-12 mr-4 h-12 rounded-md object-cover",
                                  }),
                                  s.jsx(n, {
                                    song: e,
                                    dynamicClass: "w-[calc(20vw)]",
                                  }),
                                ],
                              }),
                              s.jsx(x, { song: e }),
                            ],
                          },
                          e == null ? void 0 : e.id,
                        );
                      }),
              }),
              s.jsx("div", {
                children:
                  r == null
                    ? void 0
                    : r.slice(l + 4, m + 4).map((e) => {
                        var a;
                        return s.jsxs(
                          w.div,
                          {
                            className:
                              "flex w-[calc(50vw)] md:w-[calc(45vw)] items-center justify-between space-x-4 p-2 hover:text-black hover:bg-gray-700 rounded-lg cursor-pointer",
                            whileHover: { scale: 1.01 },
                            onClick: () => {
                              sessionStorage.getItem("roomId") ||
                                (t(r), i(e == null ? void 0 : e.id));
                            },
                            children: [
                              s.jsxs("div", {
                                className:
                                  "flex items-center w-[calc(100vw-5rem)]",
                                children: [
                                  s.jsx(o, {
                                    src:
                                      (a = e == null ? void 0 : e.image[2]) ==
                                      null
                                        ? void 0
                                        : a.url,
                                    alt: e == null ? void 0 : e.name,
                                    className:
                                      "w-12 mr-4 h-12 rounded-md object-cover",
                                  }),
                                  s.jsx(n, {
                                    song: e,
                                    dynamicClass: "w-[calc(20vw)]",
                                  }),
                                ],
                              }),
                              s.jsx(x, { song: e }),
                            ],
                          },
                          e == null ? void 0 : e.id,
                        );
                      }),
              }),
            ],
          }),
          u &&
            s.jsxs("div", {
              className: "md:px-4 overflow-y-auto scrollbar-hide flex px-1",
              children: [
                s.jsx("div", {
                  children: Array(4)
                    .fill(0)
                    .map((e, a) =>
                      s.jsx(
                        "div",
                        {
                          className:
                            "flex items-center w-[calc(50vw)] justify-between space-x-4 p-2 animate-pulse",
                          children: s.jsxs("div", {
                            className: "flex items-center w-[calc(100vw-5rem)]",
                            children: [
                              s.jsx("div", {
                                className:
                                  "w-12 mr-4 h-12 rounded-md bg-secondary",
                              }),
                              s.jsxs("div", {
                                className: "w-[calc(30vw)]",
                                children: [
                                  s.jsx("div", {
                                    className:
                                      "h-4 bg-secondary rounded w-3/4 mb-1",
                                  }),
                                  s.jsx("div", {
                                    className: "h-3 bg-secondary rounded w-1/2",
                                  }),
                                ],
                              }),
                            ],
                          }),
                        },
                        a,
                      ),
                    ),
                }),
                s.jsx("div", {
                  children: Array(4)
                    .fill(0)
                    .map((e, a) =>
                      s.jsx(
                        "div",
                        {
                          className:
                            "flex w-[calc(50vw)] items-center justify-between space-x-4 p-2 animate-pulse",
                          children: s.jsxs("div", {
                            className: "flex items-center w-[calc(100vw-5rem)]",
                            children: [
                              s.jsx("div", {
                                className:
                                  "w-12 mr-4 h-12 rounded-md bg-secondary",
                              }),
                              s.jsxs("div", {
                                className: "w-[calc(30vw)]",
                                children: [
                                  s.jsx("div", {
                                    className:
                                      "h-4 bg-secondary rounded w-3/4 mb-1",
                                  }),
                                  s.jsx("div", {
                                    className: "h-3 bg-secondary rounded w-1/2",
                                  }),
                                ],
                              }),
                            ],
                          }),
                        },
                        a,
                      ),
                    ),
                }),
              ],
            }),
        ],
      }),
  });
}
export { F as default };
