import { j as r } from "./query-C2lwwwNE.js";
import { i as a } from "./index-B8Fjvhyv.js";
import { r as s } from "./vendor-zmZrVfsR.js";
import "./ui-D5ooVADr.js";
const l = ({ children: t }) => {
  const { ref: i, inView: e } = a({ triggerOnce: !0, threshold: 1 }),
    [o, n] = s.useState(!1);
  return (
    s.useEffect(() => {
      e && n(!0);
    }, [e]),
    r.jsx("div", {
      ref: i,
      children: o
        ? t()
        : r.jsx("div", { className: "h-28", children: "Loading..." }),
    })
  );
};
export { l as default };
