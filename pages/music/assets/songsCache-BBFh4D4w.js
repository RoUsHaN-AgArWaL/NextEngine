import { j as B } from "./query-C2lwwwNE.js";
import { r as P } from "./vendor-zmZrVfsR.js";
import { m as gt, n as _t } from "./index-B8Fjvhyv.js";
import { Q as fn, Z as dn } from "./ui-D5ooVADr.js";
function pn(t) {
  return Object.prototype.toString.call(t) === "[object Object]";
}
function $t(t) {
  return pn(t) || Array.isArray(t);
}
function mn() {
  return !!(
    typeof window < "u" &&
    window.document &&
    window.document.createElement
  );
}
function Nt(t, n) {
  const e = Object.keys(t),
    r = Object.keys(n);
  if (e.length !== r.length) return !1;
  const c = JSON.stringify(Object.keys(t.breakpoints || {})),
    s = JSON.stringify(Object.keys(n.breakpoints || {}));
  return c !== s
    ? !1
    : e.every((o) => {
        const a = t[o],
          u = n[o];
        return typeof a == "function"
          ? `${a}` == `${u}`
          : !$t(a) || !$t(u)
          ? a === u
          : Nt(a, u);
      });
}
function qt(t) {
  return t
    .concat()
    .sort((n, e) => (n.name > e.name ? 1 : -1))
    .map((n) => n.options);
}
function gn(t, n) {
  if (t.length !== n.length) return !1;
  const e = qt(t),
    r = qt(n);
  return e.every((c, s) => {
    const o = r[s];
    return Nt(c, o);
  });
}
function Pt(t) {
  return typeof t == "number";
}
function Dt(t) {
  return typeof t == "string";
}
function xt(t) {
  return typeof t == "boolean";
}
function Qt(t) {
  return Object.prototype.toString.call(t) === "[object Object]";
}
function T(t) {
  return Math.abs(t);
}
function Tt(t) {
  return Math.sign(t);
}
function ft(t, n) {
  return T(t - n);
}
function hn(t, n) {
  if (t === 0 || n === 0 || T(t) <= T(n)) return 0;
  const e = ft(T(t), T(n));
  return T(e / t);
}
function dt(t) {
  return pt(t).map(Number);
}
function R(t) {
  return t[ht(t)];
}
function ht(t) {
  return Math.max(0, t.length - 1);
}
function Ot(t, n) {
  return n === ht(t);
}
function Ut(t, n = 0) {
  return Array.from(Array(t), (e, r) => n + r);
}
function pt(t) {
  return Object.keys(t);
}
function Jt(t, n) {
  return [t, n].reduce(
    (e, r) => (
      pt(r).forEach((c) => {
        const s = e[c],
          o = r[c],
          a = Qt(s) && Qt(o);
        e[c] = a ? Jt(s, o) : o;
      }),
      e
    ),
    {},
  );
}
function At(t, n) {
  return typeof n.MouseEvent < "u" && t instanceof n.MouseEvent;
}
function Sn(t, n) {
  const e = { start: r, center: c, end: s };
  function r() {
    return 0;
  }
  function c(u) {
    return s(u) / 2;
  }
  function s(u) {
    return n - u;
  }
  function o(u, i) {
    return Dt(t) ? e[t](u) : t(n, u, i);
  }
  return { measure: o };
}
function mt() {
  let t = [];
  function n(c, s, o, a = { passive: !0 }) {
    let u;
    if ("addEventListener" in c)
      c.addEventListener(s, o, a), (u = () => c.removeEventListener(s, o, a));
    else {
      const i = c;
      i.addListener(o), (u = () => i.removeListener(o));
    }
    return t.push(u), r;
  }
  function e() {
    t = t.filter((c) => c());
  }
  const r = { add: n, clear: e };
  return r;
}
function yn(t, n, e, r) {
  const c = mt(),
    s = 1e3 / 60;
  let o = null,
    a = 0,
    u = 0;
  function i() {
    c.add(t, "visibilitychange", () => {
      t.hidden && l();
    });
  }
  function S() {
    x(), c.clear();
  }
  function d(h) {
    if (!u) return;
    o || (o = h);
    const f = h - o;
    for (o = h, a += f; a >= s; ) e(s), (a -= s);
    const m = a / s;
    r(m), u && n.requestAnimationFrame(d);
  }
  function g() {
    u || (u = n.requestAnimationFrame(d));
  }
  function x() {
    n.cancelAnimationFrame(u), (o = null), (a = 0), (u = 0);
  }
  function l() {
    (o = null), (a = 0);
  }
  return {
    init: i,
    destroy: S,
    start: g,
    stop: x,
    update: () => e(s),
    render: r,
  };
}
function xn(t, n) {
  const e = n === "rtl",
    r = t === "y",
    c = r ? "y" : "x",
    s = r ? "x" : "y",
    o = !r && e ? -1 : 1,
    a = S(),
    u = d();
  function i(l) {
    const { height: p, width: h } = l;
    return r ? p : h;
  }
  function S() {
    return r ? "top" : e ? "right" : "left";
  }
  function d() {
    return r ? "bottom" : e ? "left" : "right";
  }
  function g(l) {
    return l * o;
  }
  return {
    scroll: c,
    cross: s,
    startEdge: a,
    endEdge: u,
    measureSize: i,
    direction: g,
  };
}
function ot(t = 0, n = 0) {
  const e = T(t - n);
  function r(i) {
    return i < t;
  }
  function c(i) {
    return i > n;
  }
  function s(i) {
    return r(i) || c(i);
  }
  function o(i) {
    return s(i) ? (r(i) ? t : n) : i;
  }
  function a(i) {
    return e ? i - e * Math.ceil((i - n) / e) : i;
  }
  return {
    length: e,
    max: n,
    min: t,
    constrain: o,
    reachedAny: s,
    reachedMax: c,
    reachedMin: r,
    removeOffset: a,
  };
}
function Yt(t, n, e) {
  const { constrain: r } = ot(0, t),
    c = t + 1;
  let s = o(n);
  function o(g) {
    return e ? T((c + g) % c) : r(g);
  }
  function a() {
    return s;
  }
  function u(g) {
    return (s = o(g)), d;
  }
  function i(g) {
    return S().set(a() + g);
  }
  function S() {
    return Yt(t, a(), e);
  }
  const d = { get: a, set: u, add: i, clone: S };
  return d;
}
function bn(t, n, e, r, c, s, o, a, u, i, S, d, g, x, l, p, h, f, m) {
  const { cross: b, direction: w } = t,
    A = ["INPUT", "SELECT", "TEXTAREA"],
    I = { passive: !1 },
    C = mt(),
    E = mt(),
    L = ot(50, 225).constrain(x.measure(20)),
    O = { mouse: 300, touch: 400 },
    v = { mouse: 500, touch: 600 },
    j = l ? 43 : 25;
  let H = !1,
    G = 0,
    K = 0,
    nt = !1,
    X = !1,
    Q = !1,
    U = !1;
  function it(y) {
    if (!m) return;
    function D(F) {
      (xt(m) || m(y, F)) && ut(F);
    }
    const M = n;
    C.add(M, "dragstart", (F) => F.preventDefault(), I)
      .add(M, "touchmove", () => {}, I)
      .add(M, "touchend", () => {})
      .add(M, "touchstart", D)
      .add(M, "mousedown", D)
      .add(M, "touchcancel", k)
      .add(M, "contextmenu", k)
      .add(M, "click", J, !0);
  }
  function $() {
    C.clear(), E.clear();
  }
  function rt() {
    const y = U ? e : n;
    E.add(y, "touchmove", z, I)
      .add(y, "touchend", k)
      .add(y, "mousemove", z, I)
      .add(y, "mouseup", k);
  }
  function st(y) {
    const D = y.nodeName || "";
    return A.includes(D);
  }
  function _() {
    return (l ? v : O)[U ? "mouse" : "touch"];
  }
  function ct(y, D) {
    const M = d.add(Tt(y) * -1),
      F = S.byDistance(y, !l).distance;
    return l || T(y) < L
      ? F
      : h && D
      ? F * 0.5
      : S.byIndex(M.get(), 0).distance;
  }
  function ut(y) {
    const D = At(y, r);
    (U = D),
      (Q = l && D && !y.buttons && H),
      (H = ft(c.get(), o.get()) >= 2),
      !(D && y.button !== 0) &&
        (st(y.target) ||
          ((nt = !0),
          s.pointerDown(y),
          i.useFriction(0).useDuration(0),
          c.set(o),
          rt(),
          (G = s.readPoint(y)),
          (K = s.readPoint(y, b)),
          g.emit("pointerDown")));
  }
  function z(y) {
    if (!At(y, r) && y.touches.length >= 2) return k(y);
    const M = s.readPoint(y),
      F = s.readPoint(y, b),
      q = ft(M, G),
      Y = ft(F, K);
    if (!X && !U && (!y.cancelable || ((X = q > Y), !X))) return k(y);
    const Z = s.pointerMove(y);
    q > p && (Q = !0),
      i.useFriction(0.3).useDuration(0.75),
      a.start(),
      c.add(w(Z)),
      y.preventDefault();
  }
  function k(y) {
    const M = S.byDistance(0, !1).index !== d.get(),
      F = s.pointerUp(y) * _(),
      q = ct(w(F), M),
      Y = hn(F, q),
      Z = j - 10 * Y,
      W = f + Y / 50;
    (X = !1),
      (nt = !1),
      E.clear(),
      i.useDuration(Z).useFriction(W),
      u.distance(q, !l),
      (U = !1),
      g.emit("pointerUp");
  }
  function J(y) {
    Q && (y.stopPropagation(), y.preventDefault(), (Q = !1));
  }
  function V() {
    return nt;
  }
  return { init: it, destroy: $, pointerDown: V };
}
function Cn(t, n) {
  let r, c;
  function s(d) {
    return d.timeStamp;
  }
  function o(d, g) {
    const l = `client${(g || t.scroll) === "x" ? "X" : "Y"}`;
    return (At(d, n) ? d : d.touches[0])[l];
  }
  function a(d) {
    return (r = d), (c = d), o(d);
  }
  function u(d) {
    const g = o(d) - o(c),
      x = s(d) - s(r) > 170;
    return (c = d), x && (r = d), g;
  }
  function i(d) {
    if (!r || !c) return 0;
    const g = o(c) - o(r),
      x = s(d) - s(r),
      l = s(d) - s(c) > 170,
      p = g / x;
    return x && !l && T(p) > 0.1 ? p : 0;
  }
  return { pointerDown: a, pointerMove: u, pointerUp: i, readPoint: o };
}
function En() {
  function t(e) {
    const { offsetTop: r, offsetLeft: c, offsetWidth: s, offsetHeight: o } = e;
    return {
      top: r,
      right: c + s,
      bottom: r + o,
      left: c,
      width: s,
      height: o,
    };
  }
  return { measure: t };
}
function Ln(t) {
  function n(r) {
    return t * (r / 100);
  }
  return { measure: n };
}
function vn(t, n, e, r, c, s, o) {
  const a = [t].concat(r);
  let u,
    i,
    S = [],
    d = !1;
  function g(h) {
    return c.measureSize(o.measure(h));
  }
  function x(h) {
    if (!s) return;
    (i = g(t)), (S = r.map(g));
    function f(m) {
      for (const b of m) {
        if (d) return;
        const w = b.target === t,
          A = r.indexOf(b.target),
          I = w ? i : S[A],
          C = g(w ? t : r[A]);
        if (T(C - I) >= 0.5) {
          h.reInit(), n.emit("resize");
          break;
        }
      }
    }
    (u = new ResizeObserver((m) => {
      (xt(s) || s(h, m)) && f(m);
    })),
      e.requestAnimationFrame(() => {
        a.forEach((m) => u.observe(m));
      });
  }
  function l() {
    (d = !0), u && u.disconnect();
  }
  return { init: x, destroy: l };
}
function wn(t, n, e, r, c, s) {
  let o = 0,
    a = 0,
    u = c,
    i = s,
    S = t.get(),
    d = 0;
  function g(I) {
    const C = I / 1e3,
      E = u * C,
      L = r.get() - t.get(),
      O = !u;
    let v = 0;
    return (
      O
        ? ((o = 0), e.set(r), t.set(r), (v = L))
        : (e.set(t),
          (o += L / E),
          (o *= i),
          (S += o),
          t.add(o * C),
          (v = S - d)),
      (a = Tt(v)),
      (d = S),
      A
    );
  }
  function x() {
    const I = r.get() - n.get();
    return T(I) < 0.001;
  }
  function l() {
    return u;
  }
  function p() {
    return a;
  }
  function h() {
    return o;
  }
  function f() {
    return b(c);
  }
  function m() {
    return w(s);
  }
  function b(I) {
    return (u = I), A;
  }
  function w(I) {
    return (i = I), A;
  }
  const A = {
    direction: p,
    duration: l,
    velocity: h,
    seek: g,
    settled: x,
    useBaseFriction: m,
    useBaseDuration: f,
    useFriction: w,
    useDuration: b,
  };
  return A;
}
function In(t, n, e, r, c) {
  const s = c.measure(10),
    o = c.measure(50),
    a = ot(0.1, 0.99);
  let u = !1;
  function i() {
    return !(u || !t.reachedAny(e.get()) || !t.reachedAny(n.get()));
  }
  function S(x) {
    if (!i()) return;
    const l = t.reachedMin(n.get()) ? "min" : "max",
      p = T(t[l] - n.get()),
      h = e.get() - n.get(),
      f = a.constrain(p / o);
    e.subtract(h * f),
      !x &&
        T(h) < s &&
        (e.set(t.constrain(e.get())), r.useDuration(25).useBaseFriction());
  }
  function d(x) {
    u = !x;
  }
  return { shouldConstrain: i, constrain: S, toggleActive: d };
}
function Dn(t, n, e, r, c) {
  const s = ot(-n + t, 0),
    o = d(),
    a = S(),
    u = g();
  function i(l, p) {
    return ft(l, p) < 1;
  }
  function S() {
    const l = o[0],
      p = R(o),
      h = o.lastIndexOf(l),
      f = o.indexOf(p) + 1;
    return ot(h, f);
  }
  function d() {
    return e
      .map((l, p) => {
        const { min: h, max: f } = s,
          m = s.constrain(l),
          b = !p,
          w = Ot(e, p);
        return b ? f : w || i(h, m) ? h : i(f, m) ? f : m;
      })
      .map((l) => parseFloat(l.toFixed(3)));
  }
  function g() {
    if (n <= t + c) return [s.max];
    if (r === "keepSnaps") return o;
    const { min: l, max: p } = a;
    return o.slice(l, p);
  }
  return { snapsContained: u, scrollContainLimit: a };
}
function An(t, n, e) {
  const r = n[0],
    c = e ? r - t : R(n);
  return { limit: ot(c, r) };
}
function Nn(t, n, e, r) {
  const s = n.min + 0.1,
    o = n.max + 0.1,
    { reachedMin: a, reachedMax: u } = ot(s, o);
  function i(g) {
    return g === 1 ? u(e.get()) : g === -1 ? a(e.get()) : !1;
  }
  function S(g) {
    if (!i(g)) return;
    const x = t * (g * -1);
    r.forEach((l) => l.add(x));
  }
  return { loop: S };
}
function Pn(t) {
  const { max: n, length: e } = t;
  function r(s) {
    const o = s - n;
    return e ? o / -e : 0;
  }
  return { get: r };
}
function Tn(t, n, e, r, c) {
  const { startEdge: s, endEdge: o } = t,
    { groupSlides: a } = c,
    u = d().map(n.measure),
    i = g(),
    S = x();
  function d() {
    return a(r)
      .map((p) => R(p)[o] - p[0][s])
      .map(T);
  }
  function g() {
    return r.map((p) => e[s] - p[s]).map((p) => -T(p));
  }
  function x() {
    return a(i)
      .map((p) => p[0])
      .map((p, h) => p + u[h]);
  }
  return { snaps: i, snapsAligned: S };
}
function On(t, n, e, r, c, s) {
  const { groupSlides: o } = c,
    { min: a, max: u } = r,
    i = S();
  function S() {
    const g = o(s),
      x = !t || n === "keepSnaps";
    return e.length === 1
      ? [s]
      : x
      ? g
      : g.slice(a, u).map((l, p, h) => {
          const f = !p,
            m = Ot(h, p);
          if (f) {
            const b = R(h[0]) + 1;
            return Ut(b);
          }
          if (m) {
            const b = ht(s) - R(h)[0] + 1;
            return Ut(b, R(h)[0]);
          }
          return l;
        });
  }
  return { slideRegistry: i };
}
function Mn(t, n, e, r, c) {
  const { reachedAny: s, removeOffset: o, constrain: a } = r;
  function u(l) {
    return l.concat().sort((p, h) => T(p) - T(h))[0];
  }
  function i(l) {
    const p = t ? o(l) : a(l),
      h = n
        .map((m, b) => ({ diff: S(m - p, 0), index: b }))
        .sort((m, b) => T(m.diff) - T(b.diff)),
      { index: f } = h[0];
    return { index: f, distance: p };
  }
  function S(l, p) {
    const h = [l, l + e, l - e];
    if (!t) return l;
    if (!p) return u(h);
    const f = h.filter((m) => Tt(m) === p);
    return f.length ? u(f) : R(h) - e;
  }
  function d(l, p) {
    const h = n[l] - c.get(),
      f = S(h, p);
    return { index: l, distance: f };
  }
  function g(l, p) {
    const h = c.get() + l,
      { index: f, distance: m } = i(h),
      b = !t && s(h);
    if (!p || b) return { index: f, distance: l };
    const w = n[f] - m,
      A = l + S(w, 0);
    return { index: f, distance: A };
  }
  return { byDistance: g, byIndex: d, shortcut: S };
}
function kn(t, n, e, r, c, s, o) {
  function a(d) {
    const g = d.distance,
      x = d.index !== n.get();
    s.add(g),
      g && (r.duration() ? t.start() : (t.update(), t.render(1), t.update())),
      x && (e.set(n.get()), n.set(d.index), o.emit("select"));
  }
  function u(d, g) {
    const x = c.byDistance(d, g);
    a(x);
  }
  function i(d, g) {
    const x = n.clone().set(d),
      l = c.byIndex(x.get(), g);
    a(l);
  }
  return { distance: u, index: i };
}
function Fn(t, n, e, r, c, s, o, a) {
  const u = { passive: !0, capture: !0 };
  let i = 0;
  function S(x) {
    if (!a) return;
    function l(p) {
      if (new Date().getTime() - i > 10) return;
      o.emit("slideFocusStart"), (t.scrollLeft = 0);
      const m = e.findIndex((b) => b.includes(p));
      Pt(m) && (c.useDuration(0), r.index(m, 0), o.emit("slideFocus"));
    }
    s.add(document, "keydown", d, !1),
      n.forEach((p, h) => {
        s.add(
          p,
          "focus",
          (f) => {
            (xt(a) || a(x, f)) && l(h);
          },
          u,
        );
      });
  }
  function d(x) {
    x.code === "Tab" && (i = new Date().getTime());
  }
  return { init: S };
}
function lt(t) {
  let n = t;
  function e() {
    return n;
  }
  function r(u) {
    n = o(u);
  }
  function c(u) {
    n += o(u);
  }
  function s(u) {
    n -= o(u);
  }
  function o(u) {
    return Pt(u) ? u : u.get();
  }
  return { get: e, set: r, add: c, subtract: s };
}
function Xt(t, n) {
  const e = t.scroll === "x" ? s : o,
    r = n.style;
  let c = !1;
  function s(d) {
    return `translate3d(${d}px,0px,0px)`;
  }
  function o(d) {
    return `translate3d(0px,${d}px,0px)`;
  }
  function a(d) {
    c || (r.transform = e(t.direction(d)));
  }
  function u(d) {
    c = !d;
  }
  function i() {
    c ||
      ((r.transform = ""),
      n.getAttribute("style") || n.removeAttribute("style"));
  }
  return { clear: i, to: a, toggleActive: u };
}
function jn(t, n, e, r, c, s, o, a, u) {
  const S = dt(c),
    d = dt(c).reverse(),
    g = f().concat(m());
  function x(C, E) {
    return C.reduce((L, O) => L - c[O], E);
  }
  function l(C, E) {
    return C.reduce((L, O) => (x(L, E) > 0 ? L.concat([O]) : L), []);
  }
  function p(C) {
    return s.map((E, L) => ({
      start: E - r[L] + 0.5 + C,
      end: E + n - 0.5 + C,
    }));
  }
  function h(C, E, L) {
    const O = p(E);
    return C.map((v) => {
      const j = L ? 0 : -e,
        H = L ? e : 0,
        G = L ? "end" : "start",
        K = O[v][G];
      return {
        index: v,
        loopPoint: K,
        slideLocation: lt(-1),
        translate: Xt(t, u[v]),
        target: () => (a.get() > K ? j : H),
      };
    });
  }
  function f() {
    const C = o[0],
      E = l(d, C);
    return h(E, e, !1);
  }
  function m() {
    const C = n - o[0] - 1,
      E = l(S, C);
    return h(E, -e, !0);
  }
  function b() {
    return g.every(({ index: C }) => {
      const E = S.filter((L) => L !== C);
      return x(E, n) <= 0.1;
    });
  }
  function w() {
    g.forEach((C) => {
      const { target: E, translate: L, slideLocation: O } = C,
        v = E();
      v !== O.get() && (L.to(v), O.set(v));
    });
  }
  function A() {
    g.forEach((C) => C.translate.clear());
  }
  return { canLoop: b, clear: A, loop: w, loopPoints: g };
}
function zn(t, n, e) {
  let r,
    c = !1;
  function s(u) {
    if (!e) return;
    function i(S) {
      for (const d of S)
        if (d.type === "childList") {
          u.reInit(), n.emit("slidesChanged");
          break;
        }
    }
    (r = new MutationObserver((S) => {
      c || ((xt(e) || e(u, S)) && i(S));
    })),
      r.observe(t, { childList: !0 });
  }
  function o() {
    r && r.disconnect(), (c = !0);
  }
  return { init: s, destroy: o };
}
function Vn(t, n, e, r) {
  const c = {};
  let s = null,
    o = null,
    a,
    u = !1;
  function i() {
    (a = new IntersectionObserver(
      (l) => {
        u ||
          (l.forEach((p) => {
            const h = n.indexOf(p.target);
            c[h] = p;
          }),
          (s = null),
          (o = null),
          e.emit("slidesInView"));
      },
      { root: t.parentElement, threshold: r },
    )),
      n.forEach((l) => a.observe(l));
  }
  function S() {
    a && a.disconnect(), (u = !0);
  }
  function d(l) {
    return pt(c).reduce((p, h) => {
      const f = parseInt(h),
        { isIntersecting: m } = c[f];
      return ((l && m) || (!l && !m)) && p.push(f), p;
    }, []);
  }
  function g(l = !0) {
    if (l && s) return s;
    if (!l && o) return o;
    const p = d(l);
    return l && (s = p), l || (o = p), p;
  }
  return { init: i, destroy: S, get: g };
}
function Bn(t, n, e, r, c, s) {
  const { measureSize: o, startEdge: a, endEdge: u } = t,
    i = e[0] && c,
    S = l(),
    d = p(),
    g = e.map(o),
    x = h();
  function l() {
    if (!i) return 0;
    const m = e[0];
    return T(n[a] - m[a]);
  }
  function p() {
    if (!i) return 0;
    const m = s.getComputedStyle(R(r));
    return parseFloat(m.getPropertyValue(`margin-${u}`));
  }
  function h() {
    return e
      .map((m, b, w) => {
        const A = !b,
          I = Ot(w, b);
        return A ? g[b] + S : I ? g[b] + d : w[b + 1][a] - m[a];
      })
      .map(T);
  }
  return { slideSizes: g, slideSizesWithGaps: x, startGap: S, endGap: d };
}
function Rn(t, n, e, r, c, s, o, a, u) {
  const { startEdge: i, endEdge: S, direction: d } = t,
    g = Pt(e);
  function x(f, m) {
    return dt(f)
      .filter((b) => b % m === 0)
      .map((b) => f.slice(b, b + m));
  }
  function l(f) {
    return f.length
      ? dt(f)
          .reduce((m, b, w) => {
            const A = R(m) || 0,
              I = A === 0,
              C = b === ht(f),
              E = c[i] - s[A][i],
              L = c[i] - s[b][S],
              O = !r && I ? d(o) : 0,
              v = !r && C ? d(a) : 0,
              j = T(L - v - (E + O));
            return w && j > n + u && m.push(b), C && m.push(f.length), m;
          }, [])
          .map((m, b, w) => {
            const A = Math.max(w[b - 1] || 0);
            return f.slice(A, m);
          })
      : [];
  }
  function p(f) {
    return g ? x(f, e) : l(f);
  }
  return { groupSlides: p };
}
function Hn(t, n, e, r, c, s, o) {
  const {
      align: a,
      axis: u,
      direction: i,
      startIndex: S,
      loop: d,
      duration: g,
      dragFree: x,
      dragThreshold: l,
      inViewThreshold: p,
      slidesToScroll: h,
      skipSnaps: f,
      containScroll: m,
      watchResize: b,
      watchSlides: w,
      watchDrag: A,
      watchFocus: I,
    } = s,
    C = 2,
    E = En(),
    L = E.measure(n),
    O = e.map(E.measure),
    v = xn(u, i),
    j = v.measureSize(L),
    H = Ln(j),
    G = Sn(a, j),
    K = !d && !!m,
    nt = d || !!m,
    {
      slideSizes: X,
      slideSizesWithGaps: Q,
      startGap: U,
      endGap: it,
    } = Bn(v, L, O, e, nt, c),
    $ = Rn(v, j, h, d, L, O, U, it, C),
    { snaps: rt, snapsAligned: st } = Tn(v, G, L, O, $),
    _ = -R(rt) + R(Q),
    { snapsContained: ct, scrollContainLimit: ut } = Dn(j, _, st, m, C),
    z = K ? ct : st,
    { limit: k } = An(_, z, d),
    J = Yt(ht(z), S, d),
    V = J.clone(),
    N = dt(e),
    y = (
      {
        dragHandler: tt,
        scrollBody: vt,
        scrollBounds: wt,
        options: { loop: St },
      },
      It,
    ) => {
      St || wt.constrain(tt.pointerDown()), vt.seek(It);
    },
    D = (
      {
        scrollBody: tt,
        translate: vt,
        location: wt,
        offsetLocation: St,
        scrollLooper: It,
        slideLooper: rn,
        dragHandler: sn,
        animation: cn,
        eventHandler: Bt,
        scrollBounds: un,
        options: { loop: Rt },
      },
      Ht,
    ) => {
      const Gt = tt.settled(),
        an = !un.shouldConstrain(),
        Kt = Rt ? Gt : Gt && an;
      Kt && !sn.pointerDown() && (cn.stop(), Bt.emit("settle")),
        Kt || Bt.emit("scroll");
      const ln = wt.get() * Ht + Z.get() * (1 - Ht);
      St.set(ln), Rt && (It.loop(tt.direction()), rn.loop()), vt.to(St.get());
    },
    M = yn(
      r,
      c,
      (tt) => y(Lt, tt),
      (tt) => D(Lt, tt),
    ),
    F = 0.68,
    q = z[J.get()],
    Y = lt(q),
    Z = lt(q),
    W = lt(q),
    et = lt(q),
    at = wn(Y, W, Z, et, g, F),
    Ct = Mn(d, z, _, k, et),
    Et = kn(M, J, V, at, Ct, et, o),
    jt = Pn(k),
    zt = mt(),
    en = Vn(n, e, o, p),
    { slideRegistry: Vt } = On(K, m, z, ut, $, N),
    on = Fn(t, e, Vt, Et, at, zt, o, I),
    Lt = {
      ownerDocument: r,
      ownerWindow: c,
      eventHandler: o,
      containerRect: L,
      slideRects: O,
      animation: M,
      axis: v,
      dragHandler: bn(
        v,
        t,
        r,
        c,
        et,
        Cn(v, c),
        Y,
        M,
        Et,
        at,
        Ct,
        J,
        o,
        H,
        x,
        l,
        f,
        F,
        A,
      ),
      eventStore: zt,
      percentOfView: H,
      index: J,
      indexPrevious: V,
      limit: k,
      location: Y,
      offsetLocation: W,
      previousLocation: Z,
      options: s,
      resizeHandler: vn(n, o, c, e, v, b, E),
      scrollBody: at,
      scrollBounds: In(k, W, et, at, H),
      scrollLooper: Nn(_, k, W, [Y, W, Z, et]),
      scrollProgress: jt,
      scrollSnapList: z.map(jt.get),
      scrollSnaps: z,
      scrollTarget: Ct,
      scrollTo: Et,
      slideLooper: jn(v, j, _, X, Q, rt, z, W, e),
      slideFocus: on,
      slidesHandler: zn(n, o, w),
      slidesInView: en,
      slideIndexes: N,
      slideRegistry: Vt,
      slidesToScroll: $,
      target: et,
      translate: Xt(v, n),
    };
  return Lt;
}
function Gn() {
  let t = {},
    n;
  function e(i) {
    n = i;
  }
  function r(i) {
    return t[i] || [];
  }
  function c(i) {
    return r(i).forEach((S) => S(n, i)), u;
  }
  function s(i, S) {
    return (t[i] = r(i).concat([S])), u;
  }
  function o(i, S) {
    return (t[i] = r(i).filter((d) => d !== S)), u;
  }
  function a() {
    t = {};
  }
  const u = { init: e, emit: c, off: o, on: s, clear: a };
  return u;
}
const Kn = {
  align: "center",
  axis: "x",
  container: null,
  slides: null,
  containScroll: "trimSnaps",
  direction: "ltr",
  slidesToScroll: 1,
  inViewThreshold: 0,
  breakpoints: {},
  dragFree: !1,
  dragThreshold: 10,
  loop: !1,
  skipSnaps: !1,
  duration: 25,
  startIndex: 0,
  active: !0,
  watchDrag: !0,
  watchResize: !0,
  watchSlides: !0,
  watchFocus: !0,
};
function $n(t) {
  function n(s, o) {
    return Jt(s, o || {});
  }
  function e(s) {
    const o = s.breakpoints || {},
      a = pt(o)
        .filter((u) => t.matchMedia(u).matches)
        .map((u) => o[u])
        .reduce((u, i) => n(u, i), {});
    return n(s, a);
  }
  function r(s) {
    return s
      .map((o) => pt(o.breakpoints || {}))
      .reduce((o, a) => o.concat(a), [])
      .map(t.matchMedia);
  }
  return { mergeOptions: n, optionsAtMedia: e, optionsMediaQueries: r };
}
function qn(t) {
  let n = [];
  function e(s, o) {
    return (
      (n = o.filter(({ options: a }) => t.optionsAtMedia(a).active !== !1)),
      n.forEach((a) => a.init(s, t)),
      o.reduce((a, u) => Object.assign(a, { [u.name]: u }), {})
    );
  }
  function r() {
    n = n.filter((s) => s.destroy());
  }
  return { init: e, destroy: r };
}
function yt(t, n, e) {
  const r = t.ownerDocument,
    c = r.defaultView,
    s = $n(c),
    o = qn(s),
    a = mt(),
    u = Gn(),
    { mergeOptions: i, optionsAtMedia: S, optionsMediaQueries: d } = s,
    { on: g, off: x, emit: l } = u,
    p = v;
  let h = !1,
    f,
    m = i(Kn, yt.globalOptions),
    b = i(m),
    w = [],
    A,
    I,
    C;
  function E() {
    const { container: N, slides: y } = b;
    I = (Dt(N) ? t.querySelector(N) : N) || t.children[0];
    const M = Dt(y) ? I.querySelectorAll(y) : y;
    C = [].slice.call(M || I.children);
  }
  function L(N) {
    const y = Hn(t, I, C, r, c, N, u);
    if (N.loop && !y.slideLooper.canLoop()) {
      const D = Object.assign({}, N, { loop: !1 });
      return L(D);
    }
    return y;
  }
  function O(N, y) {
    h ||
      ((m = i(m, N)),
      (b = S(m)),
      (w = y || w),
      E(),
      (f = L(b)),
      d([m, ...w.map(({ options: D }) => D)]).forEach((D) =>
        a.add(D, "change", v),
      ),
      b.active &&
        (f.translate.to(f.location.get()),
        f.animation.init(),
        f.slidesInView.init(),
        f.slideFocus.init(V),
        f.eventHandler.init(V),
        f.resizeHandler.init(V),
        f.slidesHandler.init(V),
        f.options.loop && f.slideLooper.loop(),
        I.offsetParent && C.length && f.dragHandler.init(V),
        (A = o.init(V, w))));
  }
  function v(N, y) {
    const D = $();
    j(), O(i({ startIndex: D }, N), y), u.emit("reInit");
  }
  function j() {
    f.dragHandler.destroy(),
      f.eventStore.clear(),
      f.translate.clear(),
      f.slideLooper.clear(),
      f.resizeHandler.destroy(),
      f.slidesHandler.destroy(),
      f.slidesInView.destroy(),
      f.animation.destroy(),
      o.destroy(),
      a.clear();
  }
  function H() {
    h || ((h = !0), a.clear(), j(), u.emit("destroy"), u.clear());
  }
  function G(N, y, D) {
    !b.active ||
      h ||
      (f.scrollBody.useBaseFriction().useDuration(y === !0 ? 0 : b.duration),
      f.scrollTo.index(N, D || 0));
  }
  function K(N) {
    const y = f.index.add(1).get();
    G(y, N, -1);
  }
  function nt(N) {
    const y = f.index.add(-1).get();
    G(y, N, 1);
  }
  function X() {
    return f.index.add(1).get() !== $();
  }
  function Q() {
    return f.index.add(-1).get() !== $();
  }
  function U() {
    return f.scrollSnapList;
  }
  function it() {
    return f.scrollProgress.get(f.location.get());
  }
  function $() {
    return f.index.get();
  }
  function rt() {
    return f.indexPrevious.get();
  }
  function st() {
    return f.slidesInView.get();
  }
  function _() {
    return f.slidesInView.get(!1);
  }
  function ct() {
    return A;
  }
  function ut() {
    return f;
  }
  function z() {
    return t;
  }
  function k() {
    return I;
  }
  function J() {
    return C;
  }
  const V = {
    canScrollNext: X,
    canScrollPrev: Q,
    containerNode: k,
    internalEngine: ut,
    destroy: H,
    off: x,
    on: g,
    emit: l,
    plugins: ct,
    previousScrollSnap: rt,
    reInit: p,
    rootNode: z,
    scrollNext: K,
    scrollPrev: nt,
    scrollProgress: it,
    scrollSnapList: U,
    scrollTo: G,
    selectedScrollSnap: $,
    slideNodes: J,
    slidesInView: st,
    slidesNotInView: _,
  };
  return O(n, e), setTimeout(() => u.emit("init"), 0), V;
}
yt.globalOptions = void 0;
function Mt(t = {}, n = []) {
  const e = P.useRef(t),
    r = P.useRef(n),
    [c, s] = P.useState(),
    [o, a] = P.useState(),
    u = P.useCallback(() => {
      c && c.reInit(e.current, r.current);
    }, [c]);
  return (
    P.useEffect(() => {
      Nt(e.current, t) || ((e.current = t), u());
    }, [t, u]),
    P.useEffect(() => {
      gn(r.current, n) || ((r.current = n), u());
    }, [n, u]),
    P.useEffect(() => {
      if (mn() && o) {
        yt.globalOptions = Mt.globalOptions;
        const i = yt(o, e.current, r.current);
        return s(i), () => i.destroy();
      } else s(void 0);
    }, [o, s]),
    [a, c]
  );
}
Mt.globalOptions = void 0;
const Zt = P.createContext(null);
function bt() {
  const t = P.useContext(Zt);
  if (!t) throw new Error("useCarousel must be used within a <Carousel />");
  return t;
}
const Qn = P.forwardRef(
  (
    {
      orientation: t = "horizontal",
      opts: n,
      setApi: e,
      plugins: r,
      className: c,
      children: s,
      ...o
    },
    a,
  ) => {
    const [u, i] = Mt({ ...n, axis: t === "horizontal" ? "x" : "y" }, r),
      [S, d] = P.useState(!1),
      [g, x] = P.useState(!1),
      l = P.useCallback((m) => {
        m && (d(m.canScrollPrev()), x(m.canScrollNext()));
      }, []),
      p = P.useCallback(() => {
        i == null || i.scrollPrev();
      }, [i]),
      h = P.useCallback(() => {
        i == null || i.scrollNext();
      }, [i]),
      f = P.useCallback(
        (m) => {
          m.key === "ArrowLeft"
            ? (m.preventDefault(), p())
            : m.key === "ArrowRight" && (m.preventDefault(), h());
        },
        [p, h],
      );
    return (
      P.useEffect(() => {
        !i || !e || e(i);
      }, [i, e]),
      P.useEffect(() => {
        if (i)
          return (
            l(i),
            i.on("reInit", l),
            i.on("select", l),
            () => {
              i == null || i.off("select", l);
            }
          );
      }, [i, l]),
      B.jsx(Zt.Provider, {
        value: {
          carouselRef: u,
          api: i,
          opts: n,
          orientation:
            t ||
            ((n == null ? void 0 : n.axis) === "y" ? "vertical" : "horizontal"),
          scrollPrev: p,
          scrollNext: h,
          canScrollPrev: S,
          canScrollNext: g,
        },
        children: B.jsx("div", {
          ref: a,
          onKeyDownCapture: f,
          className: gt("relative", c),
          role: "region",
          "aria-roledescription": "carousel",
          ...o,
          children: s,
        }),
      })
    );
  },
);
Qn.displayName = "Carousel";
const Un = P.forwardRef(({ className: t, ...n }, e) => {
  const { carouselRef: r, orientation: c } = bt();
  return B.jsx("div", {
    ref: r,
    className: "overflow-hidden",
    children: B.jsx("div", {
      ref: e,
      className: gt("flex", c === "horizontal" ? "-ml-4" : "-mt-4 flex-col", t),
      ...n,
    }),
  });
});
Un.displayName = "CarouselContent";
const _n = P.forwardRef(({ className: t, ...n }, e) => {
  const { orientation: r } = bt();
  return B.jsx("div", {
    ref: e,
    role: "group",
    "aria-roledescription": "slide",
    className: gt(
      "min-w-0 shrink-0 grow-0 basis-full",
      r === "horizontal" ? "pl-4" : "pt-4",
      t,
    ),
    ...n,
  });
});
_n.displayName = "CarouselItem";
const Jn = P.forwardRef(
  ({ className: t, variant: n = "outline", size: e = "icon", ...r }, c) => {
    const { orientation: s, scrollPrev: o, canScrollPrev: a } = bt();
    return B.jsxs(_t, {
      ref: c,
      variant: n,
      size: e,
      className: gt(
        "absolute  h-8 w-8 rounded-full",
        s === "horizontal"
          ? "-left-12 top-1/2 -translate-y-1/2"
          : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        t,
      ),
      disabled: !a,
      onClick: o,
      ...r,
      children: [
        B.jsx(fn, { className: "h-4 w-4" }),
        B.jsx("span", { className: "sr-only", children: "Previous slide" }),
      ],
    });
  },
);
Jn.displayName = "CarouselPrevious";
const Yn = P.forwardRef(
  ({ className: t, variant: n = "outline", size: e = "icon", ...r }, c) => {
    const { orientation: s, scrollNext: o, canScrollNext: a } = bt();
    return B.jsxs(_t, {
      ref: c,
      variant: n,
      size: e,
      className: gt(
        "absolute h-8 w-8 rounded-full",
        s === "horizontal"
          ? "-right-12 top-1/2 -translate-y-1/2"
          : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        t,
      ),
      disabled: !a,
      onClick: o,
      ...r,
      children: [
        B.jsx(dn, { className: "h-4 w-4" }),
        B.jsx("span", { className: "sr-only", children: "Next slide" }),
      ],
    });
  },
);
Yn.displayName = "CarouselNext";
const kt = "speedListCache",
  Ft = "quickPlaysCache",
  Xn = 5 * 24 * 60 * 60 * 1e3,
  Wt = (t, n) => {
    try {
      const e = Date.now(),
        r = { data: n, timestamp: e, expiresAt: e + Xn };
      localStorage.setItem(t, JSON.stringify(r));
    } catch (e) {
      console.warn(`Failed to cache data for ${t}:`, e);
    }
  },
  tn = (t) => {
    try {
      const n = localStorage.getItem(t);
      if (!n) return null;
      const e = JSON.parse(n);
      return Date.now() > e.expiresAt
        ? (localStorage.removeItem(t), null)
        : e.data;
    } catch (n) {
      return (
        console.warn(`Failed to get cache for ${t}:`, n),
        localStorage.removeItem(t),
        null
      );
    }
  },
  nn = (t) => {
    try {
      const n = localStorage.getItem(t);
      if (!n) return !1;
      const e = JSON.parse(n);
      return Date.now() <= e.expiresAt;
    } catch {
      return !1;
    }
  },
  ee = () => tn(kt),
  oe = (t) => {
    Wt(kt, t);
  },
  re = () => nn(kt),
  se = () => tn(Ft),
  ie = (t) => {
    Wt(Ft, t);
  },
  ce = () => nn(Ft);
export {
  Qn as C,
  Un as a,
  _n as b,
  re as c,
  ee as d,
  oe as e,
  se as g,
  ce as i,
  ie as s,
};
