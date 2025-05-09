"use strict";
(() => {
  var l = "fs-attributes";
  var R = "cmsattribute";
  var u = "linkblockedit";
  var I = async (...o) => {
    var r;
    let s = [];
    for (let t of o) {
      let e = await ((r = window.fsAttributes[t]) == null ? void 0 : r.loading);
      s.push(e);
    }
    return s;
  };
  var A = () => {};
  function b(o, s, r, t) {
    return o
      ? (o.addEventListener(s, r, t), () => o.removeEventListener(s, r, t))
      : A;
  }
  function y(o, s, r) {
    var e;
    let t = window.fsAttributes[o];
    return (t.destroy = r || A), (e = t.resolve) == null || e.call(t, s), s;
  }
  var h = `${l}-support`,
    P =
      "https://cdn.jsdelivr.net/npm/@finsweet/attributes-support@1/support.js",
    S = async () => {
      let { fsAttributes: o, location: s } = window,
        { host: r, searchParams: t } = new URL(s.href);
      o.support || (o.support = {});
      let { support: e } = o;
      if (!r.includes("webflow.io") || !t.has(h)) return !1;
      if (e.import) return e.import;
      try {
        e.import = new Promise((n, i) => {
          let c = document.createElement("script");
          (c.src = P),
            (c.onload = () => n(!0)),
            (c.onerror = i),
            document.head.append(c);
        });
      } catch (n) {
        return !1;
      }
      return e.import;
    };
  var m = (o) => {
    let s = (t, e, n) => {
      let i = o[t],
        { key: c, values: E } = i,
        a;
      if (!e) return `[${c}]`;
      let d = E == null ? void 0 : E[e];
      typeof d == "string"
        ? (a = d)
        : (a = d(n && "instanceIndex" in n ? n.instanceIndex : void 0));
      let T = n && "caseInsensitive" in n && n.caseInsensitive ? "i" : "";
      if (!(n != null && n.operator)) return `[${c}="${a}"${T}]`;
      switch (n.operator) {
        case "prefixed":
          return `[${c}^="${a}"${T}]`;
        case "suffixed":
          return `[${c}$="${a}"${T}]`;
        case "contains":
          return `[${c}*="${a}"${T}]`;
      }
    };
    function r(t, e) {
      let n = s("element", t, e),
        i = (e == null ? void 0 : e.scope) || document;
      return e != null && e.all
        ? [...i.querySelectorAll(n)]
        : i.querySelector(n);
    }
    return [s, r];
  };
  var p = {
      preventLoad: { key: `${l}-preventload` },
      debugMode: { key: `${l}-debug` },
      src: { key: "src", values: { finsweet: "@finsweet/attributes" } },
      dev: { key: `${l}-dev` },
    },
    [f, st] = m(p);
  var U = (o) => {
    let { currentScript: s } = document,
      r = {};
    if (!s) return { attributes: r, preventsLoad: !1 };
    let e = {
      preventsLoad: typeof s.getAttribute(p.preventLoad.key) == "string",
      attributes: r,
    };
    for (let n in o) {
      let i = s.getAttribute(o[n]);
      e.attributes[n] = i;
    }
    return e;
  };
  var L = ({ scriptAttributes: o, attributeKey: s, version: r, init: t }) => {
      var c;
      O(), (c = window.fsAttributes)[s] || (c[s] = {});
      let { preventsLoad: e, attributes: n } = U(o),
        i = window.fsAttributes[s];
      (i.version = r),
        (i.init = t),
        e ||
          (window.Webflow || (window.Webflow = []),
          window.Webflow.push(() => t(n)));
    },
    O = () => {
      let o = N();
      if (window.fsAttributes && !Array.isArray(window.fsAttributes)) {
        w(window.fsAttributes, o);
        return;
      }
      let s = {
        cms: {},
        push(...r) {
          var t, e;
          for (let [n, i] of r)
            (e = (t = this[n]) == null ? void 0 : t.loading) == null ||
              e.then(i);
        },
        destroy() {
          var r, t;
          for (let e of o)
            (t = (r = window.fsAttributes[e]) == null ? void 0 : r.destroy) ==
              null || t.call(r);
        },
      };
      w(s, o),
        k(s),
        (window.fsAttributes = s),
        (window.FsAttributes = window.fsAttributes),
        S();
    },
    N = () => {
      let o = f("src", "finsweet", { operator: "contains" }),
        s = f("dev");
      return [...document.querySelectorAll(`script${o}, script${s}`)].reduce(
        (e, n) => {
          var c;
          let i =
            n.getAttribute(p.dev.key) ||
            ((c = n.src.match(/[\w-. ]+(?=(\.js)$)/)) == null ? void 0 : c[0]);
          return i && !e.includes(i) && e.push(i), e;
        },
        []
      );
    },
    w = (o, s) => {
      for (let r of s) {
        if (o[r]) continue;
        o[r] = {};
        let t = o[r];
        t.loading = new Promise((e) => {
          t.resolve = (n) => {
            e(n), delete t.resolve;
          };
        });
      }
    },
    k = (o) => {
      let s = Array.isArray(window.fsAttributes) ? window.fsAttributes : [];
      o.push(...s);
    };
  var B = "1.5.0";
  var v = "role",
    K = {
      slider: "slider",
      listbox: "listbox",
      option: "option",
      columnheader: "columnheader",
      link: "link",
    },
    _ = "tabindex",
    g = "aria-label";
  var C = `fs-${u}`,
    D = "parent",
    $ = "selector",
    Y = {
      element: { key: `${C}-element`, values: { parent: D } },
      selector: { key: `${C}-${$}` },
    },
    [x, dt] = m(Y);
  var V = async () => {
    await I(R);
    let o = document.querySelectorAll(x("element", "parent"));
    for (let r of o) {
      let t = r.querySelector("a");
      t &&
        t.href &&
        (r.setAttribute(v, K.link),
        r.setAttribute(_, "0"),
        t.setAttribute(_, "-1"),
        t.textContent && r.setAttribute(g, t.textContent));
    }
    let s = b(window, "click", (r) => {
      let { target: t } = r;
      if (!(t instanceof HTMLElement) || t instanceof HTMLAnchorElement) return;
      let e = t.closest(x("element", "parent"));
      if (!e) return;
      r.preventDefault();
      let n = e.querySelector("a");
      return n && n.click(), !1;
    });
    return y(u, o, () => s());
  };
  L({ init: V, version: B, attributeKey: u });
})();
