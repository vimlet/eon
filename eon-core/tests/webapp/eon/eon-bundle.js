var eon = eon || {};

eon.debug = eon.debug || {};
eon.debug.polyfill = eon.debug.polyfill || false;

eon.polyfills = eon.polyfills || {};

eon.polyfills.customElements = true;
eon.polyfills.template = true;
eon.polyfills.CSSScope = true;
eon.polyfills.assign = true;
eon.polyfills.promises = true;
eon.polyfills.localeString = true;
eon.polyfills.classList = true;
eon.polyfills.pep = true;

// ############################################################################################
// POLYFILL DETECTION
// ############################################################################################

eon.polyfills.needCustomElementsPolyfill = function () {
  var __customElements = window.hasOwnProperty("customElements");
  if (eon.debug.polyfill) {
    console.log("Polyfill custom-elements", !__customElements);
  }
  return !__customElements;
};

eon.polyfills.needTemplatePolyfill = function () {
  var __template = "content" in document.createElement("template") === true;
  if (eon.debug.polyfill) {
    console.log("Polyfill template", !__template);
  }
  return !__template;
};

eon.polyfills.needCSSScopePolyfill = function () {
  var needPolyfill = false;
  try {
    doc.querySelector(":scope body");
  } catch (err) {
    needPolyfill = true;
  }
  if (eon.debug.polyfill) {
    console.log("Polyfill CSS Scope", needPolyfill);
  }
  return needPolyfill;
};

eon.polyfills.needObjectAssignPolyfill = function () {
  var needPolyfill = !Object.assign;
  if (eon.debug.polyfill) {
    console.log("Polyfill Object Assign", needPolyfill);
  }
  return needPolyfill;
};

eon.polyfills.needLocaleStringPolyfill = function () {
  return (new Date(1994, 1, 9).toLocaleString("en", { weekday: "short" }) != "Wed");
}

eon.polyfills.needPromisesPolyfill = function () {
  if(typeof Promise !== "undefined" && Promise.toString().indexOf("[native code]") !== -1){
    return false;
  }
  return true;
}
eon.polyfills.needClassListAddPolyfill = function () {
  var div = document.createElement("div");
  div.classList.add("class1", "class2");

  return div.classList.contains("class2") ? false : true;
}

// ############################################################################################
// POLYFILL IMPORTS
// ############################################################################################

if (eon.polyfills.needCustomElementsPolyfill()) {
    (function() {
  "use strict";
  var g = new function() {}();
  var aa = new Set(
    "annotation-xml color-profile font-face font-face-src font-face-uri font-face-format font-face-name missing-glyph".split(
      " "
    )
  );
  function k(b) {
    var a = aa.has(b);
    b = /^[a-z][.0-9_a-z]*-[\-.0-9_a-z]*$/.test(b);
    return !a && b;
  }
  function l(b) {
    var a = b.isConnected;
    if (void 0 !== a) return a;
    for (; b && !(b.__CE_isImportDocument || b instanceof Document); )
      b =
        b.parentNode ||
        (window.ShadowRoot && b instanceof ShadowRoot ? b.host : void 0);
    return !(!b || !(b.__CE_isImportDocument || b instanceof Document));
  }
  function m(b, a) {
    for (; a && a !== b && !a.nextSibling; ) a = a.parentNode;
    return a && a !== b ? a.nextSibling : null;
  }
  function n(b, a, e) {
    e = e ? e : new Set();
    for (var c = b; c; ) {
      if (c.nodeType === Node.ELEMENT_NODE) {
        var d = c;
        a(d);
        var h = d.localName;
        if ("link" === h && "import" === d.getAttribute("rel")) {
          c = d.import;
          if (c instanceof Node && !e.has(c))
            for (e.add(c), c = c.firstChild; c; c = c.nextSibling) n(c, a, e);
          c = m(b, d);
          continue;
        } else if ("template" === h) {
          c = m(b, d);
          continue;
        }
        if ((d = d.__CE_shadowRoot))
          for (d = d.firstChild; d; d = d.nextSibling) n(d, a, e);
      }
      c = c.firstChild ? c.firstChild : m(b, c);
    }
  }
  function q(b, a, e) {
    b[a] = e;
  }
  function r() {
    this.a = new Map();
    this.m = new Map();
    this.f = [];
    this.b = !1;
  }
  function ba(b, a, e) {
    b.a.set(a, e);
    b.m.set(e.constructor, e);
  }
  function t(b, a) {
    b.b = !0;
    b.f.push(a);
  }
  function v(b, a) {
    b.b &&
      n(a, function(a) {
        return w(b, a);
      });
  }
  function w(b, a) {
    if (b.b && !a.__CE_patched) {
      a.__CE_patched = !0;
      for (var e = 0; e < b.f.length; e++) b.f[e](a);
    }
  }
  function x(b, a) {
    var e = [];
    n(a, function(b) {
      return e.push(b);
    });
    for (a = 0; a < e.length; a++) {
      var c = e[a];
      1 === c.__CE_state ? b.connectedCallback(c) : y(b, c);
    }
  }
  function z(b, a) {
    var e = [];
    n(a, function(b) {
      return e.push(b);
    });
    for (a = 0; a < e.length; a++) {
      var c = e[a];
      1 === c.__CE_state && b.disconnectedCallback(c);
    }
  }
  function A(b, a, e) {
    e = e ? e : new Set();
    var c = [];
    n(
      a,
      function(d) {
        if ("link" === d.localName && "import" === d.getAttribute("rel")) {
          var a = d.import;
          a instanceof Node && "complete" === a.readyState
            ? ((a.__CE_isImportDocument = !0), (a.__CE_hasRegistry = !0))
            : d.addEventListener("load", function() {
                var a = d.import;
                a.__CE_documentLoadHandled ||
                  ((a.__CE_documentLoadHandled = !0),
                  (a.__CE_isImportDocument = !0),
                  (a.__CE_hasRegistry = !0),
                  e.delete(a),
                  A(b, a, e));
              });
        } else c.push(d);
      },
      e
    );
    if (b.b) for (a = 0; a < c.length; a++) w(b, c[a]);
    for (a = 0; a < c.length; a++) y(b, c[a]);
  }
  function y(b, a) {
    if (void 0 === a.__CE_state) {
      var e = b.a.get(a.localName);
      if (e) {
        e.constructionStack.push(a);
        var c = e.constructor;
        try {
          try {
            if (new c() !== a)
              throw Error(
                "The custom element constructor did not produce the element being upgraded."
              );
          } finally {
            e.constructionStack.pop();
          }
        } catch (f) {
          throw ((a.__CE_state = 2), f);
        }
        a.__CE_state = 1;
        a.__CE_definition = e;
        if (e.attributeChangedCallback)
          for (e = e.observedAttributes, c = 0; c < e.length; c++) {
            var d = e[c],
              h = a.getAttribute(d);
            null !== h && b.attributeChangedCallback(a, d, null, h, null);
          }
        l(a) && b.connectedCallback(a);
      }
    }
  }
  r.prototype.connectedCallback = function(b) {
    var a = b.__CE_definition;
    a.connectedCallback && a.connectedCallback.call(b);
  };
  r.prototype.disconnectedCallback = function(b) {
    var a = b.__CE_definition;
    a.disconnectedCallback && a.disconnectedCallback.call(b);
  };
  r.prototype.attributeChangedCallback = function(b, a, e, c, d) {
    var h = b.__CE_definition;
    h.attributeChangedCallback &&
      -1 < h.observedAttributes.indexOf(a) &&
      h.attributeChangedCallback.call(b, a, e, c, d);
  };
  function B(b, a) {
    this.c = b;
    this.a = a;
    this.b = void 0;
    A(this.c, this.a);
    "loading" === this.a.readyState &&
      ((this.b = new MutationObserver(this.f.bind(this))),
      this.b.observe(this.a, { childList: !0, subtree: !0 }));
  }
  function C(b) {
    b.b && b.b.disconnect();
  }
  B.prototype.f = function(b) {
    var a = this.a.readyState;
    ("interactive" !== a && "complete" !== a) || C(this);
    for (a = 0; a < b.length; a++)
      for (var e = b[a].addedNodes, c = 0; c < e.length; c++) A(this.c, e[c]);
  };
  function ca() {
    var b = this;
    this.b = this.a = void 0;
    this.f = new Promise(function(a) {
      b.b = a;
      b.a && a(b.a);
    });
  }
  function D(b) {
    if (b.a) throw Error("Already resolved.");
    b.a = void 0;
    b.b && b.b(void 0);
  }
  function E(b) {
    this.i = !1;
    this.c = b;
    this.l = new Map();
    this.j = function(b) {
      return b();
    };
    this.g = !1;
    this.h = [];
    this.s = new B(b, document);
  }
  E.prototype.define = function(b, a) {
    var e = this;
    if (!(a instanceof Function))
      throw new TypeError("Custom element constructors must be functions.");
    if (!k(b))
      throw new SyntaxError("The element name '" + b + "' is not valid.");
    if (this.c.a.get(b))
      throw Error(
        "A custom element with name '" + b + "' has already been defined."
      );
    if (this.i) throw Error("A custom element is already being defined.");
    this.i = !0;
    var c, d, h, f, u;
    try {
      var p = function(b) {
          var a = P[b];
          if (void 0 !== a && !(a instanceof Function))
            throw Error("The '" + b + "' callback must be a function.");
          return a;
        },
        P = a.prototype;
      if (!(P instanceof Object))
        throw new TypeError(
          "The custom element constructor's prototype is not an object."
        );
      c = p("connectedCallback");
      d = p("disconnectedCallback");
      h = p("adoptedCallback");
      f = p("attributeChangedCallback");
      u = a.observedAttributes || [];
    } catch (ua) {
      return;
    } finally {
      this.i = !1;
    }
    ba(this.c, b, {
      localName: b,
      constructor: a,
      connectedCallback: c,
      disconnectedCallback: d,
      adoptedCallback: h,
      attributeChangedCallback: f,
      observedAttributes: u,
      constructionStack: []
    });
    this.h.push(b);
    this.g ||
      ((this.g = !0),
      this.j(function() {
        if (!1 !== e.g)
          for (e.g = !1, A(e.c, document); 0 < e.h.length; ) {
            var b = e.h.shift();
            (b = e.l.get(b)) && D(b);
          }
      }));
  };
  E.prototype.get = function(b) {
    if ((b = this.c.a.get(b))) return b.constructor;
  };
  E.prototype.whenDefined = function(b) {
    if (!k(b))
      return Promise.reject(
        new SyntaxError("'" + b + "' is not a valid custom element name.")
      );
    var a = this.l.get(b);
    if (a) return a.f;
    a = new ca();
    this.l.set(b, a);
    this.c.a.get(b) && -1 === this.h.indexOf(b) && D(a);
    return a.f;
  };
  E.prototype.u = function(b) {
    C(this.s);
    var a = this.j;
    this.j = function(e) {
      return b(function() {
        return a(e);
      });
    };
  };
  window.CustomElementRegistry = E;
  E.prototype.define = E.prototype.define;
  E.prototype.get = E.prototype.get;
  E.prototype.whenDefined = E.prototype.whenDefined;
  E.prototype.polyfillWrapFlushCallback = E.prototype.u;
  var F = window.Document.prototype.createElement,
    da = window.Document.prototype.createElementNS,
    ea = window.Document.prototype.importNode,
    fa = window.Document.prototype.prepend,
    ga = window.Document.prototype.append,
    G = window.Node.prototype.cloneNode,
    H = window.Node.prototype.appendChild,
    I = window.Node.prototype.insertBefore,
    J = window.Node.prototype.removeChild,
    K = window.Node.prototype.replaceChild,
    L = Object.getOwnPropertyDescriptor(window.Node.prototype, "textContent"),
    M = window.Element.prototype.attachShadow,
    N = Object.getOwnPropertyDescriptor(window.Element.prototype, "innerHTML"),
    O = window.Element.prototype.getAttribute,
    Q = window.Element.prototype.setAttribute,
    R = window.Element.prototype.removeAttribute,
    S = window.Element.prototype.getAttributeNS,
    T = window.Element.prototype.setAttributeNS,
    U = window.Element.prototype.removeAttributeNS,
    V = window.Element.prototype.insertAdjacentElement,
    ha = window.Element.prototype.prepend,
    ia = window.Element.prototype.append,
    ja = window.Element.prototype.before,
    ka = window.Element.prototype.after,
    la = window.Element.prototype.replaceWith,
    ma = window.Element.prototype.remove,
    na = window.HTMLElement,
    W = Object.getOwnPropertyDescriptor(
      window.HTMLElement.prototype,
      "innerHTML"
    ),
    X = window.HTMLElement.prototype.insertAdjacentElement;
  function oa() {
    var b = Y;
    window.HTMLElement = (function() {
      function a() {
        var a = this.constructor,
          c = b.m.get(a);
        if (!c)
          throw Error(
            "The custom element being constructed was not registered with `customElements`."
          );
        var d = c.constructionStack;
        if (!d.length)
          return (
            (d = F.call(document, c.localName)),
            Object.setPrototypeOf(d, a.prototype),
            (d.__CE_state = 1),
            (d.__CE_definition = c),
            w(b, d),
            d
          );
        var c = d.length - 1,
          h = d[c];
        if (h === g)
          throw Error(
            "The HTMLElement constructor was either called reentrantly for this constructor or called multiple times."
          );
        d[c] = g;
        Object.setPrototypeOf(h, a.prototype);
        w(b, h);
        return h;
      }
      a.prototype = na.prototype;
      return a;
    })();
  }
  function pa(b, a, e) {
    a.prepend = function(a) {
      for (var d = [], c = 0; c < arguments.length; ++c)
        d[c - 0] = arguments[c];
      c = d.filter(function(b) {
        return b instanceof Node && l(b);
      });
      e.o.apply(this, d);
      for (var f = 0; f < c.length; f++) z(b, c[f]);
      if (l(this))
        for (c = 0; c < d.length; c++)
          (f = d[c]), f instanceof Element && x(b, f);
    };
    a.append = function(a) {
      for (var d = [], c = 0; c < arguments.length; ++c)
        d[c - 0] = arguments[c];
      c = d.filter(function(b) {
        return b instanceof Node && l(b);
      });
      e.append.apply(this, d);
      for (var f = 0; f < c.length; f++) z(b, c[f]);
      if (l(this))
        for (c = 0; c < d.length; c++)
          (f = d[c]), f instanceof Element && x(b, f);
    };
  }
  function qa() {
    var b = Y;
    q(Document.prototype, "createElement", function(a) {
      if (this.__CE_hasRegistry) {
        var e = b.a.get(a);
        if (e) return new e.constructor();
      }
      a = F.call(this, a);
      w(b, a);
      return a;
    });
    q(Document.prototype, "importNode", function(a, e) {
      a = ea.call(this, a, e);
      this.__CE_hasRegistry ? A(b, a) : v(b, a);
      return a;
    });
    q(Document.prototype, "createElementNS", function(a, e) {
      if (
        this.__CE_hasRegistry &&
        (null === a || "http://www.w3.org/1999/xhtml" === a)
      ) {
        var c = b.a.get(e);
        if (c) return new c.constructor();
      }
      a = da.call(this, a, e);
      w(b, a);
      return a;
    });
    pa(b, Document.prototype, { o: fa, append: ga });
  }
  function ra() {
    var b = Y;
    function a(a, c) {
      Object.defineProperty(a, "textContent", {
        enumerable: c.enumerable,
        configurable: !0,
        get: c.get,
        set: function(a) {
          if (this.nodeType === Node.TEXT_NODE) c.set.call(this, a);
          else {
            var d = void 0;
            if (this.firstChild) {
              var e = this.childNodes,
                u = e.length;
              if (0 < u && l(this))
                for (var d = Array(u), p = 0; p < u; p++) d[p] = e[p];
            }
            c.set.call(this, a);
            if (d) for (a = 0; a < d.length; a++) z(b, d[a]);
          }
        }
      });
    }
    q(Node.prototype, "insertBefore", function(a, c) {
      if (a instanceof DocumentFragment) {
        var d = Array.prototype.slice.apply(a.childNodes);
        a = I.call(this, a, c);
        if (l(this)) for (c = 0; c < d.length; c++) x(b, d[c]);
        return a;
      }
      d = l(a);
      c = I.call(this, a, c);
      d && z(b, a);
      l(this) && x(b, a);
      return c;
    });
    q(Node.prototype, "appendChild", function(a) {
      if (a instanceof DocumentFragment) {
        var c = Array.prototype.slice.apply(a.childNodes);
        a = H.call(this, a);
        if (l(this)) for (var d = 0; d < c.length; d++) x(b, c[d]);
        return a;
      }
      c = l(a);
      d = H.call(this, a);
      c && z(b, a);
      l(this) && x(b, a);
      return d;
    });
    q(Node.prototype, "cloneNode", function(a) {
      a = G.call(this, a);
      this.ownerDocument.__CE_hasRegistry ? A(b, a) : v(b, a);
      return a;
    });
    q(Node.prototype, "removeChild", function(a) {
      var c = l(a),
        d = J.call(this, a);
      c && z(b, a);
      return d;
    });
    q(Node.prototype, "replaceChild", function(a, c) {
      if (a instanceof DocumentFragment) {
        var d = Array.prototype.slice.apply(a.childNodes);
        a = K.call(this, a, c);
        if (l(this)) for (z(b, c), c = 0; c < d.length; c++) x(b, d[c]);
        return a;
      }
      var d = l(a),
        e = K.call(this, a, c),
        f = l(this);
      f && z(b, c);
      d && z(b, a);
      f && x(b, a);
      return e;
    });
    L && L.get
      ? a(Node.prototype, L)
      : t(b, function(b) {
          a(b, {
            enumerable: !0,
            configurable: !0,
            get: function() {
              for (var a = [], b = 0; b < this.childNodes.length; b++)
                a.push(this.childNodes[b].textContent);
              return a.join("");
            },
            set: function(a) {
              for (; this.firstChild; ) J.call(this, this.firstChild);
              H.call(this, document.createTextNode(a));
            }
          });
        });
  }
  function sa(b) {
    var a = Element.prototype;
    a.before = function(a) {
      for (var c = [], d = 0; d < arguments.length; ++d)
        c[d - 0] = arguments[d];
      d = c.filter(function(a) {
        return a instanceof Node && l(a);
      });
      ja.apply(this, c);
      for (var e = 0; e < d.length; e++) z(b, d[e]);
      if (l(this))
        for (d = 0; d < c.length; d++)
          (e = c[d]), e instanceof Element && x(b, e);
    };
    a.after = function(a) {
      for (var c = [], d = 0; d < arguments.length; ++d)
        c[d - 0] = arguments[d];
      d = c.filter(function(a) {
        return a instanceof Node && l(a);
      });
      ka.apply(this, c);
      for (var e = 0; e < d.length; e++) z(b, d[e]);
      if (l(this))
        for (d = 0; d < c.length; d++)
          (e = c[d]), e instanceof Element && x(b, e);
    };
    a.replaceWith = function(a) {
      for (var c = [], d = 0; d < arguments.length; ++d)
        c[d - 0] = arguments[d];
      var d = c.filter(function(a) {
          return a instanceof Node && l(a);
        }),
        e = l(this);
      la.apply(this, c);
      for (var f = 0; f < d.length; f++) z(b, d[f]);
      if (e)
        for (z(b, this), d = 0; d < c.length; d++)
          (e = c[d]), e instanceof Element && x(b, e);
    };
    a.remove = function() {
      var a = l(this);
      ma.call(this);
      a && z(b, this);
    };
  }
  function ta() {
    var b = Y;
    function a(a, c) {
      Object.defineProperty(a, "innerHTML", {
        enumerable: c.enumerable,
        configurable: !0,
        get: c.get,
        set: function(a) {
          var d = this,
            e = void 0;
          l(this) &&
            ((e = []),
            n(this, function(a) {
              a !== d && e.push(a);
            }));
          c.set.call(this, a);
          if (e)
            for (var f = 0; f < e.length; f++) {
              var h = e[f];
              1 === h.__CE_state && b.disconnectedCallback(h);
            }
          this.ownerDocument.__CE_hasRegistry ? A(b, this) : v(b, this);
          return a;
        }
      });
    }
    function e(a, c) {
      q(a, "insertAdjacentElement", function(a, d) {
        var e = l(d);
        a = c.call(this, a, d);
        e && z(b, d);
        l(a) && x(b, d);
        return a;
      });
    }
    M
      ? q(Element.prototype, "attachShadow", function(a) {
          return (this.__CE_shadowRoot = a = M.call(this, a));
        })
      : console.warn(
          "Custom Elements: `Element#attachShadow` was not patched."
        );
    if (N && N.get) a(Element.prototype, N);
    else if (W && W.get) a(HTMLElement.prototype, W);
    else {
      var c = F.call(document, "div");
      t(b, function(b) {
        a(b, {
          enumerable: !0,
          configurable: !0,
          get: function() {
            return G.call(this, !0).innerHTML;
          },
          set: function(a) {
            var b = "template" === this.localName ? this.content : this;
            for (c.innerHTML = a; 0 < b.childNodes.length; )
              J.call(b, b.childNodes[0]);
            for (; 0 < c.childNodes.length; ) H.call(b, c.childNodes[0]);
          }
        });
      });
    }
    q(Element.prototype, "setAttribute", function(a, c) {
      if (1 !== this.__CE_state) return Q.call(this, a, c);
      var d = O.call(this, a);
      Q.call(this, a, c);
      c = O.call(this, a);
      b.attributeChangedCallback(this, a, d, c, null);
    });
    q(Element.prototype, "setAttributeNS", function(a, c, e) {
      if (1 !== this.__CE_state) return T.call(this, a, c, e);
      var d = S.call(this, a, c);
      T.call(this, a, c, e);
      e = S.call(this, a, c);
      b.attributeChangedCallback(this, c, d, e, a);
    });
    q(Element.prototype, "removeAttribute", function(a) {
      if (1 !== this.__CE_state) return R.call(this, a);
      var c = O.call(this, a);
      R.call(this, a);
      null !== c && b.attributeChangedCallback(this, a, c, null, null);
    });
    q(Element.prototype, "removeAttributeNS", function(a, c) {
      if (1 !== this.__CE_state) return U.call(this, a, c);
      var d = S.call(this, a, c);
      U.call(this, a, c);
      var e = S.call(this, a, c);
      d !== e && b.attributeChangedCallback(this, c, d, e, a);
    });
    X
      ? e(HTMLElement.prototype, X)
      : V
        ? e(Element.prototype, V)
        : console.warn(
            "Custom Elements: `Element#insertAdjacentElement` was not patched."
          );
    pa(b, Element.prototype, { o: ha, append: ia });
    sa(b);
  } /*

 Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 Code distributed by Google as part of the polymer project is also
 subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
  var Z = window.customElements;
  if (
    !Z ||
    Z.forcePolyfill ||
    "function" != typeof Z.define ||
    "function" != typeof Z.get
  ) {
    var Y = new r();
    oa();
    qa();
    ra();
    ta();
    document.__CE_hasRegistry = !0;
    var customElements = new E(Y);
    Object.defineProperty(window, "customElements", {
      configurable: !0,
      enumerable: !0,
      value: customElements
    });
  }
}.call(self));


}

if (eon.polyfills.needTemplatePolyfill()) {
    /**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

// minimal template polyfill
(function() {
  var needsTemplate = typeof HTMLTemplateElement === "undefined";

  // NOTE: Patch document.importNode to work around IE11 bug that
  // casues children of a document fragment imported while
  // there is a mutation observer to not have a parentNode (!?!)
  // It's important that this is the first patch to `importNode` so that
  // dom produced for later patches is correct.
  if (/Trident/.test(navigator.userAgent)) {
    (function() {
      var Native_importNode = Document.prototype.importNode;
      Document.prototype.importNode = function() {
        var n = Native_importNode.apply(this, arguments);
        // Copy all children to a new document fragment since
        // this one may be broken
        if (n.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
          var f = this.createDocumentFragment();
          f.appendChild(n);
          return f;
        } else {
          return n;
        }
      };
    })();
  }

  // NOTE: we rely on this cloneNode not causing element upgrade.
  // This means this polyfill must load before the CE polyfill and
  // this would need to be re-worked if a browser supports native CE
  // but not <template>.
  var Native_cloneNode = Node.prototype.cloneNode;
  var Native_createElement = Document.prototype.createElement;
  var Native_importNode = Document.prototype.importNode;

  // returns true if nested templates cannot be cloned (they cannot be on
  // some impl's like Safari 8 and Edge)
  // OR if cloning a document fragment does not result in a document fragment
  var needsCloning = (function() {
    if (!needsTemplate) {
      var t = document.createElement("template");
      var t2 = document.createElement("template");
      t2.content.appendChild(document.createElement("div"));
      t.content.appendChild(t2);
      var clone = t.cloneNode(true);
      return (
        clone.content.childNodes.length === 0 ||
        clone.content.firstChild.content.childNodes.length === 0 ||
        !(
          document.createDocumentFragment().cloneNode() instanceof
          DocumentFragment
        )
      );
    }
  })();

  var TEMPLATE_TAG = "template";
  var PolyfilledHTMLTemplateElement = function() {};

  if (needsTemplate) {
    var contentDoc = document.implementation.createHTMLDocument("template");
    var canDecorate = true;

    var templateStyle = document.createElement("style");
    templateStyle.textContent = TEMPLATE_TAG + "{display:none;}";

    var head = document.head;
    head.insertBefore(templateStyle, head.firstElementChild);

    /**
      Provides a minimal shim for the <template> element.
    */
    PolyfilledHTMLTemplateElement.prototype = Object.create(
      HTMLElement.prototype
    );

    // if elements do not have `innerHTML` on instances, then
    // templates can be patched by swizzling their prototypes.
    var canProtoPatch = !document
      .createElement("div")
      .hasOwnProperty("innerHTML");

    /**
      The `decorate` method moves element children to the template's `content`.
      NOTE: there is no support for dynamically adding elements to templates.
    */
    PolyfilledHTMLTemplateElement.decorate = function(template) {
      // if the template is decorated, return fast
      if (template.content) {
        return;
      }
      template.content = contentDoc.createDocumentFragment();
      var child;
      while ((child = template.firstChild)) {
        template.content.appendChild(child);
      }
      // NOTE: prefer prototype patching for performance and
      // because on some browsers (IE11), re-defining `innerHTML`
      // can result in intermittent errors.
      if (canProtoPatch) {
        template.__proto__ = PolyfilledHTMLTemplateElement.prototype;
      } else {
        template.cloneNode = function(deep) {
          return PolyfilledHTMLTemplateElement._cloneNode(this, deep);
        };
        // add innerHTML to template, if possible
        // Note: this throws on Safari 7
        if (canDecorate) {
          try {
            defineInnerHTML(template);
          } catch (err) {
            canDecorate = false;
          }
        }
      }
      // bootstrap recursively
      PolyfilledHTMLTemplateElement.bootstrap(template.content);
    };

    function defineInnerHTML(obj) {
      Object.defineProperty(obj, "innerHTML", {
        get: function() {
          var o = "";
          for (var e = this.content.firstChild; e; e = e.nextSibling) {
            o += e.outerHTML || escapeData(e.data);
          }
          return o;
        },
        set: function(text) {
          contentDoc.body.innerHTML = text;
          PolyfilledHTMLTemplateElement.bootstrap(contentDoc);
          while (this.content.firstChild) {
            this.content.removeChild(this.content.firstChild);
          }
          while (contentDoc.body.firstChild) {
            this.content.appendChild(contentDoc.body.firstChild);
          }
        },
        configurable: true
      });
    }

    defineInnerHTML(PolyfilledHTMLTemplateElement.prototype);

    /**
      The `bootstrap` method is called automatically and "fixes" all
      <template> elements in the document referenced by the `doc` argument.
    */
    PolyfilledHTMLTemplateElement.bootstrap = function(doc) {
      var templates = doc.querySelectorAll(TEMPLATE_TAG);
      for (
        var i = 0, l = templates.length, t;
        i < l && (t = templates[i]);
        i++
      ) {
        PolyfilledHTMLTemplateElement.decorate(t);
      }
    };

    // auto-bootstrapping for main document
    document.addEventListener("DOMContentLoaded", function() {
      PolyfilledHTMLTemplateElement.bootstrap(document);
    });

    // Patch document.createElement to ensure newly created templates have content
    Document.prototype.createElement = function() {
      "use strict";
      var el = Native_createElement.apply(this, arguments);
      if (el.localName === "template") {
        PolyfilledHTMLTemplateElement.decorate(el);
      }
      return el;
    };

    var escapeDataRegExp = /[&\u00A0<>]/g;

    function escapeReplace(c) {
      switch (c) {
        case "&":
          return "&amp;";
        case "<":
          return "&lt;";
        case ">":
          return "&gt;";
        case "\u00A0":
          return "&nbsp;";
      }
    }

    function escapeData(s) {
      return s.replace(escapeDataRegExp, escapeReplace);
    }
  }

  // make cloning/importing work!
  if (needsTemplate || needsCloning) {
    PolyfilledHTMLTemplateElement._cloneNode = function(template, deep) {
      var clone = Native_cloneNode.call(template, false);
      // NOTE: decorate doesn't auto-fix children because they are already
      // decorated so they need special clone fixup.
      if (this.decorate) {
        this.decorate(clone);
      }
      if (deep) {
        // NOTE: use native clone node to make sure CE's wrapped
        // cloneNode does not cause elements to upgrade.
        clone.content.appendChild(
          Native_cloneNode.call(template.content, true)
        );
        // now ensure nested templates are cloned correctly.
        this.fixClonedDom(clone.content, template.content);
      }
      return clone;
    };

    PolyfilledHTMLTemplateElement.prototype.cloneNode = function(deep) {
      return PolyfilledHTMLTemplateElement._cloneNode(this, deep);
    };

    // Given a source and cloned subtree, find <template>'s in the cloned
    // subtree and replace them with cloned <template>'s from source.
    // We must do this because only the source templates have proper .content.
    PolyfilledHTMLTemplateElement.fixClonedDom = function(clone, source) {
      // do nothing if cloned node is not an element
      if (!source.querySelectorAll) return;
      // these two lists should be coincident
      var s$ = source.querySelectorAll(TEMPLATE_TAG);
      var t$ = clone.querySelectorAll(TEMPLATE_TAG);
      for (var i = 0, l = t$.length, t, s; i < l; i++) {
        s = s$[i];
        t = t$[i];
        if (this.decorate) {
          this.decorate(s);
        }
        t.parentNode.replaceChild(s.cloneNode(true), t);
      }
    };

    // override all cloning to fix the cloned subtree to contain properly
    // cloned templates.
    Node.prototype.cloneNode = function(deep) {
      var dom;
      // workaround for Edge bug cloning documentFragments
      // https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/8619646/
      if (this instanceof DocumentFragment) {
        if (!deep) {
          return this.ownerDocument.createDocumentFragment();
        } else {
          dom = this.ownerDocument.importNode(this, true);
        }
      } else {
        dom = Native_cloneNode.call(this, deep);
      }
      // template.content is cloned iff `deep`.
      if (deep) {
        PolyfilledHTMLTemplateElement.fixClonedDom(dom, this);
      }
      return dom;
    };

    // NOTE: we are cloning instead of importing <template>'s.
    // However, the ownerDocument of the cloned template will be correct!
    // This is because the native import node creates the right document owned
    // subtree and `fixClonedDom` inserts cloned templates into this subtree,
    // thus updating the owner doc.
    Document.prototype.importNode = function(element, deep) {
      if (element.localName === TEMPLATE_TAG) {
        return PolyfilledHTMLTemplateElement._cloneNode(element, deep);
      } else {
        var dom = Native_importNode.call(this, element, deep);
        if (deep) {
          PolyfilledHTMLTemplateElement.fixClonedDom(dom, element);
        }
        return dom;
      }
    };

    if (needsCloning) {
      window.HTMLTemplateElement.prototype.cloneNode = function(deep) {
        return PolyfilledHTMLTemplateElement._cloneNode(this, deep);
      };
    }
  }

  if (needsTemplate) {
    window.HTMLTemplateElement = PolyfilledHTMLTemplateElement;
  }
})();

}

if (eon.polyfills.needCSSScopePolyfill()) {
    (function(doc, proto) {
  try {
    // check if browser supports :scope natively
    doc.querySelector(":scope body");
  } catch (err) {
    // polyfill native methods if it doesn't
    ["querySelector", "querySelectorAll"].forEach(function(method) {
      var nativ = proto[method];
      proto[method] = function(selectors) {
        if (/(^|,)\s*:scope/.test(selectors)) {
          // only if selectors contains :scope
          var id = this.id; // remember current element id
          this.id = "ID_" + Date.now(); // assign new unique id
          selectors = selectors.replace(/((^|,)\s*):scope/g, "$1#" + this.id); // replace :scope with #ID
          var result = doc[method](selectors);
          this.id = id; // restore previous id
          return result;
        } else {
          return nativ.call(this, selectors); // use native code for other selectors
        }
      };
    });
  }
})(window.document, Element.prototype);

}

if (eon.polyfills.needObjectAssignPolyfill()) {
    if (!Object.assign) {
  Object.defineProperty(Object, "assign", {
    enumerable: false,
    configurable: true,
    writable: true,
    value: function(target) {
      "use strict";
      if (target === undefined || target === null) {
        throw new TypeError("Cannot convert first argument to object");
      }

      var to = Object(target);
      for (var i = 1; i < arguments.length; i++) {
        var nextSource = arguments[i];
        if (nextSource === undefined || nextSource === null) {
          continue;
        }
        nextSource = Object(nextSource);

        var keysArray = Object.keys(nextSource);
        for (
          var nextIndex = 0, len = keysArray.length;
          nextIndex < len;
          nextIndex++
        ) {
          var nextKey = keysArray[nextIndex];
          var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
          if (desc !== undefined && desc.enumerable) {
            to[nextKey] = nextSource[nextKey];
          }
        }
      }
      return to;
    }
  });
}

}

if (eon.polyfills.needPromisesPolyfill()) {
    !function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.ES6Promise=e()}(this,function(){"use strict";function t(t){var e=typeof t;return null!==t&&("object"===e||"function"===e)}function e(t){return"function"==typeof t}function n(t){B=t}function r(t){G=t}function o(){return function(){return process.nextTick(a)}}function i(){return"undefined"!=typeof z?function(){z(a)}:c()}function s(){var t=0,e=new J(a),n=document.createTextNode("");return e.observe(n,{characterData:!0}),function(){n.data=t=++t%2}}function u(){var t=new MessageChannel;return t.port1.onmessage=a,function(){return t.port2.postMessage(0)}}function c(){var t=setTimeout;return function(){return t(a,1)}}function a(){for(var t=0;t<W;t+=2){var e=V[t],n=V[t+1];e(n),V[t]=void 0,V[t+1]=void 0}W=0}function f(){try{var t=Function("return this")().require("vertx");return z=t.runOnLoop||t.runOnContext,i()}catch(e){return c()}}function l(t,e){var n=this,r=new this.constructor(p);void 0===r[Z]&&O(r);var o=n._state;if(o){var i=arguments[o-1];G(function(){return P(o,r,i,n._result)})}else E(n,r,t,e);return r}function h(t){var e=this;if(t&&"object"==typeof t&&t.constructor===e)return t;var n=new e(p);return g(n,t),n}function p(){}function v(){return new TypeError("You cannot resolve a promise with itself")}function d(){return new TypeError("A promises callback cannot return that same promise.")}function _(t){try{return t.then}catch(e){return nt.error=e,nt}}function y(t,e,n,r){try{t.call(e,n,r)}catch(o){return o}}function m(t,e,n){G(function(t){var r=!1,o=y(n,e,function(n){r||(r=!0,e!==n?g(t,n):S(t,n))},function(e){r||(r=!0,j(t,e))},"Settle: "+(t._label||" unknown promise"));!r&&o&&(r=!0,j(t,o))},t)}function b(t,e){e._state===tt?S(t,e._result):e._state===et?j(t,e._result):E(e,void 0,function(e){return g(t,e)},function(e){return j(t,e)})}function w(t,n,r){n.constructor===t.constructor&&r===l&&n.constructor.resolve===h?b(t,n):r===nt?(j(t,nt.error),nt.error=null):void 0===r?S(t,n):e(r)?m(t,n,r):S(t,n)}function g(e,n){e===n?j(e,v()):t(n)?w(e,n,_(n)):S(e,n)}function A(t){t._onerror&&t._onerror(t._result),T(t)}function S(t,e){t._state===$&&(t._result=e,t._state=tt,0!==t._subscribers.length&&G(T,t))}function j(t,e){t._state===$&&(t._state=et,t._result=e,G(A,t))}function E(t,e,n,r){var o=t._subscribers,i=o.length;t._onerror=null,o[i]=e,o[i+tt]=n,o[i+et]=r,0===i&&t._state&&G(T,t)}function T(t){var e=t._subscribers,n=t._state;if(0!==e.length){for(var r=void 0,o=void 0,i=t._result,s=0;s<e.length;s+=3)r=e[s],o=e[s+n],r?P(n,r,o,i):o(i);t._subscribers.length=0}}function M(t,e){try{return t(e)}catch(n){return nt.error=n,nt}}function P(t,n,r,o){var i=e(r),s=void 0,u=void 0,c=void 0,a=void 0;if(i){if(s=M(r,o),s===nt?(a=!0,u=s.error,s.error=null):c=!0,n===s)return void j(n,d())}else s=o,c=!0;n._state!==$||(i&&c?g(n,s):a?j(n,u):t===tt?S(n,s):t===et&&j(n,s))}function x(t,e){try{e(function(e){g(t,e)},function(e){j(t,e)})}catch(n){j(t,n)}}function C(){return rt++}function O(t){t[Z]=rt++,t._state=void 0,t._result=void 0,t._subscribers=[]}function k(){return new Error("Array Methods must be provided an Array")}function F(t){return new ot(this,t).promise}function Y(t){var e=this;return new e(U(t)?function(n,r){for(var o=t.length,i=0;i<o;i++)e.resolve(t[i]).then(n,r)}:function(t,e){return e(new TypeError("You must pass an array to race."))})}function q(t){var e=this,n=new e(p);return j(n,t),n}function D(){throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")}function K(){throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")}function L(){var t=void 0;if("undefined"!=typeof global)t=global;else if("undefined"!=typeof self)t=self;else try{t=Function("return this")()}catch(e){throw new Error("polyfill failed because global object is unavailable in this environment")}var n=t.Promise;if(n){var r=null;try{r=Object.prototype.toString.call(n.resolve())}catch(e){}if("[object Promise]"===r&&!n.cast)return}t.Promise=it}var N=void 0;N=Array.isArray?Array.isArray:function(t){return"[object Array]"===Object.prototype.toString.call(t)};var U=N,W=0,z=void 0,B=void 0,G=function(t,e){V[W]=t,V[W+1]=e,W+=2,2===W&&(B?B(a):X())},H="undefined"!=typeof window?window:void 0,I=H||{},J=I.MutationObserver||I.WebKitMutationObserver,Q="undefined"==typeof self&&"undefined"!=typeof process&&"[object process]"==={}.toString.call(process),R="undefined"!=typeof Uint8ClampedArray&&"undefined"!=typeof importScripts&&"undefined"!=typeof MessageChannel,V=new Array(1e3),X=void 0;X=Q?o():J?s():R?u():void 0===H&&"function"==typeof require?f():c();var Z=Math.random().toString(36).substring(2),$=void 0,tt=1,et=2,nt={error:null},rt=0,ot=function(){function t(t,e){this._instanceConstructor=t,this.promise=new t(p),this.promise[Z]||O(this.promise),U(e)?(this.length=e.length,this._remaining=e.length,this._result=new Array(this.length),0===this.length?S(this.promise,this._result):(this.length=this.length||0,this._enumerate(e),0===this._remaining&&S(this.promise,this._result))):j(this.promise,k())}return t.prototype._enumerate=function(t){for(var e=0;this._state===$&&e<t.length;e++)this._eachEntry(t[e],e)},t.prototype._eachEntry=function(t,e){var n=this._instanceConstructor,r=n.resolve;if(r===h){var o=_(t);if(o===l&&t._state!==$)this._settledAt(t._state,e,t._result);else if("function"!=typeof o)this._remaining--,this._result[e]=t;else if(n===it){var i=new n(p);w(i,t,o),this._willSettleAt(i,e)}else this._willSettleAt(new n(function(e){return e(t)}),e)}else this._willSettleAt(r(t),e)},t.prototype._settledAt=function(t,e,n){var r=this.promise;r._state===$&&(this._remaining--,t===et?j(r,n):this._result[e]=n),0===this._remaining&&S(r,this._result)},t.prototype._willSettleAt=function(t,e){var n=this;E(t,void 0,function(t){return n._settledAt(tt,e,t)},function(t){return n._settledAt(et,e,t)})},t}(),it=function(){function t(e){this[Z]=C(),this._result=this._state=void 0,this._subscribers=[],p!==e&&("function"!=typeof e&&D(),this instanceof t?x(this,e):K())}return t.prototype["catch"]=function(t){return this.then(null,t)},t.prototype["finally"]=function(t){var n=this,r=n.constructor;return e(t)?n.then(function(e){return r.resolve(t()).then(function(){return e})},function(e){return r.resolve(t()).then(function(){throw e})}):n.then(t,t)},t}();return it.prototype.then=l,it.all=F,it.race=Y,it.resolve=h,it.reject=q,it._setScheduler=n,it._setAsap=r,it._asap=G,it.polyfill=L,it.Promise=it,it.polyfill(),it});
}

if (eon.polyfills.needLocaleStringPolyfill()) {
    (function (proxied) {
    Date.prototype.toLocaleString = function (locale, options) {

      if (options.month && Object.keys(options).length == 1) {
        return eon.time.defaultLocale.months[options.month][this.getMonth()];
      } else if (options.weekday && Object.keys(options).length == 1) {
        return eon.time.defaultLocale.weekdays[options.weekday][this.getDay()];
      }

      return proxied.apply(this, arguments);
    };
  })(Date.prototype.toLocaleString);
}

if (eon.polyfills.needClassListAddPolyfill()) {
    (function (proxied) {

    DOMTokenList.prototype.add = function () {
      
      if(arguments.length > 1) {
        
        for (var i = 0; i < arguments.length; i++) {
          proxied.apply(this, [arguments[i]]);
        }
        
      } else {
        return proxied.apply(this, arguments);
      }

    };
  })(DOMTokenList.prototype.add);
  
  (function (proxied) {

    DOMTokenList.prototype.remove = function () {

      if (arguments.length > 1) {

        for (var i = 0; i < arguments.length; i++) {
          proxied.apply(this, [arguments[i]]);
        }

      } else {
        return proxied.apply(this, arguments);
      }

    };
  })(DOMTokenList.prototype.remove);
}

/*!
 * PEP v0.4.3 | https://github.com/jquery/PEP
 * Copyright jQuery Foundation and other contributors | http://jquery.org/license
 */

(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined"
    ? (module.exports = factory())
    : typeof define === "function" && define.amd
      ? define(factory)
      : (global.PointerEventsPolyfill = factory());
})(this, function() {
  "use strict";

  /**
   * This is the constructor for new PointerEvents.
   *
   * New Pointer Events must be given a type, and an optional dictionary of
   * initialization properties.
   *
   * Due to certain platform requirements, events returned from the constructor
   * identify as MouseEvents.
   *
   * @constructor
   * @param {String} inType The type of the event to create.
   * @param {Object} [inDict] An optional dictionary of initial event properties.
   * @return {Event} A new PointerEvent of type `inType`, initialized with properties from `inDict`.
   */
  var MOUSE_PROPS = [
    "bubbles",
    "cancelable",
    "view",
    "detail",
    "screenX",
    "screenY",
    "clientX",
    "clientY",
    "ctrlKey",
    "altKey",
    "shiftKey",
    "metaKey",
    "button",
    "relatedTarget",
    "pageX",
    "pageY"
  ];

  var MOUSE_DEFAULTS = [
    false,
    false,
    null,
    null,
    0,
    0,
    0,
    0,
    false,
    false,
    false,
    false,
    0,
    null,
    0,
    0
  ];

  function PointerEvent(inType, inDict) {
    inDict = inDict || Object.create(null);

    var e = document.createEvent("Event");
    e.initEvent(inType, inDict.bubbles || false, inDict.cancelable || false);

    // define inherited MouseEvent properties
    // skip bubbles and cancelable since they're set above in initEvent()
    for (var i = 2, p; i < MOUSE_PROPS.length; i++) {
      p = MOUSE_PROPS[i];
      e[p] = inDict[p] || MOUSE_DEFAULTS[i];
    }
    e.buttons = inDict.buttons || 0;

    // Spec requires that pointers without pressure specified use 0.5 for down
    // state and 0 for up state.
    var pressure = 0;

    if (inDict.pressure && e.buttons) {
      pressure = inDict.pressure;
    } else {
      pressure = e.buttons ? 0.5 : 0;
    }

    // add x/y properties aliased to clientX/Y
    e.x = e.clientX;
    e.y = e.clientY;

    // define the properties of the PointerEvent interface
    e.pointerId = inDict.pointerId || 0;
    e.width = inDict.width || 0;
    e.height = inDict.height || 0;
    e.pressure = pressure;
    e.tiltX = inDict.tiltX || 0;
    e.tiltY = inDict.tiltY || 0;
    e.twist = inDict.twist || 0;
    e.tangentialPressure = inDict.tangentialPressure || 0;
    e.pointerType = inDict.pointerType || "";
    e.hwTimestamp = inDict.hwTimestamp || 0;
    e.isPrimary = inDict.isPrimary || false;
    return e;
  }

  /**
   * This module implements a map of pointer states
   */
  var USE_MAP = window.Map && window.Map.prototype.forEach;
  var PointerMap = USE_MAP ? Map : SparseArrayMap;

  function SparseArrayMap() {
    this.array = [];
    this.size = 0;
  }

  SparseArrayMap.prototype = {
    set: function(k, v) {
      if (v === undefined) {
        return this.delete(k);
      }
      if (!this.has(k)) {
        this.size++;
      }
      this.array[k] = v;
    },
    has: function(k) {
      return this.array[k] !== undefined;
    },
    delete: function(k) {
      if (this.has(k)) {
        delete this.array[k];
        this.size--;
      }
    },
    get: function(k) {
      return this.array[k];
    },
    clear: function() {
      this.array.length = 0;
      this.size = 0;
    },

    // return value, key, map
    forEach: function(callback, thisArg) {
      return this.array.forEach(function(v, k) {
        callback.call(thisArg, v, k, this);
      }, this);
    }
  };

  var CLONE_PROPS = [
    // MouseEvent
    "bubbles",
    "cancelable",
    "view",
    "detail",
    "screenX",
    "screenY",
    "clientX",
    "clientY",
    "ctrlKey",
    "altKey",
    "shiftKey",
    "metaKey",
    "button",
    "relatedTarget",

    // DOM Level 3
    "buttons",

    // PointerEvent
    "pointerId",
    "width",
    "height",
    "pressure",
    "tiltX",
    "tiltY",
    "pointerType",
    "hwTimestamp",
    "isPrimary",

    // event instance
    "type",
    "target",
    "currentTarget",
    "which",
    "pageX",
    "pageY",
    "timeStamp"
  ];

  var CLONE_DEFAULTS = [
    // MouseEvent
    false,
    false,
    null,
    null,
    0,
    0,
    0,
    0,
    false,
    false,
    false,
    false,
    0,
    null,

    // DOM Level 3
    0,

    // PointerEvent
    0,
    0,
    0,
    0,
    0,
    0,
    "",
    0,
    false,

    // event instance
    "",
    null,
    null,
    0,
    0,
    0,
    0
  ];

  var BOUNDARY_EVENTS = {
    pointerover: 1,
    pointerout: 1,
    pointerenter: 1,
    pointerleave: 1
  };

  var HAS_SVG_INSTANCE = typeof SVGElementInstance !== "undefined";

  /**
   * This module is for normalizing events. Mouse and Touch events will be
   * collected here, and fire PointerEvents that have the same semantics, no
   * matter the source.
   * Events fired:
   *   - pointerdown: a pointing is added
   *   - pointerup: a pointer is removed
   *   - pointermove: a pointer is moved
   *   - pointerover: a pointer crosses into an element
   *   - pointerout: a pointer leaves an element
   *   - pointercancel: a pointer will no longer generate events
   */
  var dispatcher = {
    pointermap: new PointerMap(),
    eventMap: Object.create(null),
    captureInfo: Object.create(null),

    // Scope objects for native events.
    // This exists for ease of testing.
    eventSources: Object.create(null),
    eventSourceList: [],
    /**
     * Add a new event source that will generate pointer events.
     *
     * `inSource` must contain an array of event names named `events`, and
     * functions with the names specified in the `events` array.
     * @param {string} name A name for the event source
     * @param {Object} source A new source of platform events.
     */
    registerSource: function(name, source) {
      var s = source;
      var newEvents = s.events;
      if (newEvents) {
        newEvents.forEach(function(e) {
          if (s[e]) {
            this.eventMap[e] = s[e].bind(s);
          }
        }, this);
        this.eventSources[name] = s;
        this.eventSourceList.push(s);
      }
    },
    register: function(element) {
      var l = this.eventSourceList.length;
      for (var i = 0, es; i < l && (es = this.eventSourceList[i]); i++) {
        // call eventsource register
        es.register.call(es, element);
      }
    },
    unregister: function(element) {
      var l = this.eventSourceList.length;
      for (var i = 0, es; i < l && (es = this.eventSourceList[i]); i++) {
        // call eventsource register
        es.unregister.call(es, element);
      }
    },
    contains: /*scope.external.contains || */ function(container, contained) {
      try {
        return container.contains(contained);
      } catch (ex) {
        // most likely: https://bugzilla.mozilla.org/show_bug.cgi?id=208427
        return false;
      }
    },

    // EVENTS
    down: function(inEvent) {
      inEvent.bubbles = true;
      this.fireEvent("pointerdown", inEvent);
    },
    move: function(inEvent) {
      inEvent.bubbles = true;
      this.fireEvent("pointermove", inEvent);
    },
    up: function(inEvent) {
      inEvent.bubbles = true;
      this.fireEvent("pointerup", inEvent);
    },
    enter: function(inEvent) {
      inEvent.bubbles = false;
      this.fireEvent("pointerenter", inEvent);
    },
    leave: function(inEvent) {
      inEvent.bubbles = false;
      this.fireEvent("pointerleave", inEvent);
    },
    over: function(inEvent) {
      inEvent.bubbles = true;
      this.fireEvent("pointerover", inEvent);
    },
    out: function(inEvent) {
      inEvent.bubbles = true;
      this.fireEvent("pointerout", inEvent);
    },
    cancel: function(inEvent) {
      inEvent.bubbles = true;
      this.fireEvent("pointercancel", inEvent);
    },
    leaveOut: function(event) {
      this.out(event);
      this.propagate(event, this.leave, false);
    },
    enterOver: function(event) {
      this.over(event);
      this.propagate(event, this.enter, true);
    },

    // LISTENER LOGIC
    eventHandler: function(inEvent) {
      // This is used to prevent multiple dispatch of pointerevents from
      // platform events. This can happen when two elements in different scopes
      // are set up to create pointer events, which is relevant to Shadow DOM.
      if (inEvent._handledByPE) {
        return;
      }
      var type = inEvent.type;
      var fn = this.eventMap && this.eventMap[type];
      if (fn) {
        fn(inEvent);
      }
      inEvent._handledByPE = true;
    },

    // set up event listeners
    listen: function(target, events) {
      events.forEach(function(e) {
        this.addEvent(target, e);
      }, this);
    },

    // remove event listeners
    unlisten: function(target, events) {
      events.forEach(function(e) {
        this.removeEvent(target, e);
      }, this);
    },
    addEvent: /*scope.external.addEvent || */ function(target, eventName) {
      target.addEventListener(eventName, this.boundHandler);
    },
    removeEvent: /*scope.external.removeEvent || */ function(
      target,
      eventName
    ) {
      target.removeEventListener(eventName, this.boundHandler);
    },

    // EVENT CREATION AND TRACKING
    /**
     * Creates a new Event of type `inType`, based on the information in
     * `inEvent`.
     *
     * @param {string} inType A string representing the type of event to create
     * @param {Event} inEvent A platform event with a target
     * @return {Event} A PointerEvent of type `inType`
     */
    makeEvent: function(inType, inEvent) {
      // relatedTarget must be null if pointer is captured
      if (this.captureInfo[inEvent.pointerId]) {
        inEvent.relatedTarget = null;
      }
      var e = new PointerEvent(inType, inEvent);
      if (inEvent.preventDefault) {
        e.preventDefault = inEvent.preventDefault;
      }
      e._target = e._target || inEvent.target;
      return e;
    },

    // make and dispatch an event in one call
    fireEvent: function(inType, inEvent) {
      var e = this.makeEvent(inType, inEvent);
      return this.dispatchEvent(e);
    },
    /**
     * Returns a snapshot of inEvent, with writable properties.
     *
     * @param {Event} inEvent An event that contains properties to copy.
     * @return {Object} An object containing shallow copies of `inEvent`'s
     *    properties.
     */
    cloneEvent: function(inEvent) {
      var eventCopy = Object.create(null);
      var p;
      for (var i = 0; i < CLONE_PROPS.length; i++) {
        p = CLONE_PROPS[i];
        eventCopy[p] = inEvent[p] || CLONE_DEFAULTS[i];

        // Work around SVGInstanceElement shadow tree
        // Return the <use> element that is represented by the instance for Safari, Chrome, IE.
        // This is the behavior implemented by Firefox.
        if (HAS_SVG_INSTANCE && (p === "target" || p === "relatedTarget")) {
          if (eventCopy[p] instanceof SVGElementInstance) {
            eventCopy[p] = eventCopy[p].correspondingUseElement;
          }
        }
      }

      // keep the semantics of preventDefault
      if (inEvent.preventDefault) {
        eventCopy.preventDefault = function() {
          inEvent.preventDefault();
        };
      }
      return eventCopy;
    },
    getTarget: function(inEvent) {
      var capture = this.captureInfo[inEvent.pointerId];
      if (!capture) {
        return inEvent._target;
      }
      if (inEvent._target === capture || !(inEvent.type in BOUNDARY_EVENTS)) {
        return capture;
      }
    },
    propagate: function(event, fn, propagateDown) {
      var target = event.target;
      var targets = [];

      // Order of conditions due to document.contains() missing in IE.
      while (target !== document && !target.contains(event.relatedTarget)) {
        targets.push(target);
        target = target.parentNode;

        // Touch: Do not propagate if node is detached.
        if (!target) {
          return;
        }
      }
      if (propagateDown) {
        targets.reverse();
      }
      targets.forEach(function(target) {
        event.target = target;
        fn.call(this, event);
      }, this);
    },
    setCapture: function(inPointerId, inTarget, skipDispatch) {
      if (this.captureInfo[inPointerId]) {
        this.releaseCapture(inPointerId, skipDispatch);
      }

      this.captureInfo[inPointerId] = inTarget;
      this.implicitRelease = this.releaseCapture.bind(
        this,
        inPointerId,
        skipDispatch
      );
      document.addEventListener("pointerup", this.implicitRelease);
      document.addEventListener("pointercancel", this.implicitRelease);

      var e = new PointerEvent("gotpointercapture");
      e.pointerId = inPointerId;
      e._target = inTarget;

      if (!skipDispatch) {
        this.asyncDispatchEvent(e);
      }
    },
    releaseCapture: function(inPointerId, skipDispatch) {
      var t = this.captureInfo[inPointerId];
      if (!t) {
        return;
      }

      this.captureInfo[inPointerId] = undefined;
      document.removeEventListener("pointerup", this.implicitRelease);
      document.removeEventListener("pointercancel", this.implicitRelease);

      var e = new PointerEvent("lostpointercapture");
      e.pointerId = inPointerId;
      e._target = t;

      if (!skipDispatch) {
        this.asyncDispatchEvent(e);
      }
    },
    /**
     * Dispatches the event to its target.
     *
     * @param {Event} inEvent The event to be dispatched.
     * @return {Boolean} True if an event handler returns true, false otherwise.
     */
    dispatchEvent: /*scope.external.dispatchEvent || */ function(inEvent) {
      var t = this.getTarget(inEvent);
      if (t) {
        return t.dispatchEvent(inEvent);
      }
    },
    asyncDispatchEvent: function(inEvent) {
      requestAnimationFrame(this.dispatchEvent.bind(this, inEvent));
    }
  };
  dispatcher.boundHandler = dispatcher.eventHandler.bind(dispatcher);

  var targeting = {
    shadow: function(inEl) {
      if (inEl) {
        return inEl.shadowRoot || inEl.webkitShadowRoot;
      }
    },
    canTarget: function(shadow) {
      return shadow && Boolean(shadow.elementFromPoint);
    },
    targetingShadow: function(inEl) {
      var s = this.shadow(inEl);
      if (this.canTarget(s)) {
        return s;
      }
    },
    olderShadow: function(shadow) {
      var os = shadow.olderShadowRoot;
      if (!os) {
        var se = shadow.querySelector("shadow");
        if (se) {
          os = se.olderShadowRoot;
        }
      }
      return os;
    },
    allShadows: function(element) {
      var shadows = [];
      var s = this.shadow(element);
      while (s) {
        shadows.push(s);
        s = this.olderShadow(s);
      }
      return shadows;
    },
    searchRoot: function(inRoot, x, y) {
      if (inRoot) {
        var t = inRoot.elementFromPoint(x, y);
        var st, sr;

        // is element a shadow host?
        sr = this.targetingShadow(t);
        while (sr) {
          // find the the element inside the shadow root
          st = sr.elementFromPoint(x, y);
          if (!st) {
            // check for older shadows
            sr = this.olderShadow(sr);
          } else {
            // shadowed element may contain a shadow root
            var ssr = this.targetingShadow(st);
            return this.searchRoot(ssr, x, y) || st;
          }
        }

        // light dom element is the target
        return t;
      }
    },
    owner: function(element) {
      var s = element;

      // walk up until you hit the shadow root or document
      while (s.parentNode) {
        s = s.parentNode;
      }

      // the owner element is expected to be a Document or ShadowRoot
      if (
        s.nodeType !== Node.DOCUMENT_NODE &&
        s.nodeType !== Node.DOCUMENT_FRAGMENT_NODE
      ) {
        s = document;
      }
      return s;
    },
    findTarget: function(inEvent) {
      var x = inEvent.clientX;
      var y = inEvent.clientY;

      // if the listener is in the shadow root, it is much faster to start there
      var s = this.owner(inEvent.target);

      // if x, y is not in this root, fall back to document search
      if (!s.elementFromPoint(x, y)) {
        s = document;
      }
      return this.searchRoot(s, x, y);
    }
  };

  var forEach = Array.prototype.forEach.call.bind(Array.prototype.forEach);
  var map = Array.prototype.map.call.bind(Array.prototype.map);
  var toArray = Array.prototype.slice.call.bind(Array.prototype.slice);
  var filter = Array.prototype.filter.call.bind(Array.prototype.filter);
  var MO = window.MutationObserver || window.WebKitMutationObserver;
  var SELECTOR = "[touch-action]";
  var OBSERVER_INIT = {
    subtree: true,
    childList: true,
    attributes: true,
    attributeOldValue: true,
    attributeFilter: ["touch-action"]
  };

  function Installer(add, remove, changed, binder) {
    this.addCallback = add.bind(binder);
    this.removeCallback = remove.bind(binder);
    this.changedCallback = changed.bind(binder);
    if (MO) {
      this.observer = new MO(this.mutationWatcher.bind(this));
    }
  }

  Installer.prototype = {
    watchSubtree: function(target) {
      // Only watch scopes that can target find, as these are top-level.
      // Otherwise we can see duplicate additions and removals that add noise.
      //
      // TODO(dfreedman): For some instances with ShadowDOMPolyfill, we can see
      // a removal without an insertion when a node is redistributed among
      // shadows. Since it all ends up correct in the document, watching only
      // the document will yield the correct mutations to watch.
      if (this.observer && targeting.canTarget(target)) {
        this.observer.observe(target, OBSERVER_INIT);
      }
    },
    enableOnSubtree: function(target) {
      this.watchSubtree(target);
      if (target === document && document.readyState !== "complete") {
        this.installOnLoad();
      } else {
        this.installNewSubtree(target);
      }
    },
    installNewSubtree: function(target) {
      forEach(this.findElements(target), this.addElement, this);
    },
    findElements: function(target) {
      if (target.querySelectorAll) {
        return target.querySelectorAll(SELECTOR);
      }
      return [];
    },
    removeElement: function(el) {
      this.removeCallback(el);
    },
    addElement: function(el) {
      this.addCallback(el);
    },
    elementChanged: function(el, oldValue) {
      this.changedCallback(el, oldValue);
    },
    concatLists: function(accum, list) {
      return accum.concat(toArray(list));
    },

    // register all touch-action = none nodes on document load
    installOnLoad: function() {
      document.addEventListener(
        "readystatechange",
        function() {
          if (document.readyState === "complete") {
            this.installNewSubtree(document);
          }
        }.bind(this)
      );
    },
    isElement: function(n) {
      return n.nodeType === Node.ELEMENT_NODE;
    },
    flattenMutationTree: function(inNodes) {
      // find children with touch-action
      var tree = map(inNodes, this.findElements, this);

      // make sure the added nodes are accounted for
      tree.push(filter(inNodes, this.isElement));

      // flatten the list
      return tree.reduce(this.concatLists, []);
    },
    mutationWatcher: function(mutations) {
      mutations.forEach(this.mutationHandler, this);
    },
    mutationHandler: function(m) {
      if (m.type === "childList") {
        var added = this.flattenMutationTree(m.addedNodes);
        added.forEach(this.addElement, this);
        var removed = this.flattenMutationTree(m.removedNodes);
        removed.forEach(this.removeElement, this);
      } else if (m.type === "attributes") {
        this.elementChanged(m.target, m.oldValue);
      }
    }
  };

  function shadowSelector(v) {
    return "body /shadow-deep/ " + selector(v);
  }
  function selector(v) {
    return '[touch-action="' + v + '"]';
  }
  function rule(v) {
    return "{ -ms-touch-action: " + v + "; touch-action: " + v + "; }";
  }
  var attrib2css = [
    "none",
    "auto",
    "pan-x",
    "pan-y",
    {
      rule: "pan-x pan-y",
      selectors: ["pan-x pan-y", "pan-y pan-x"]
    }
  ];
  var styles = "";

  // only install stylesheet if the browser has touch action support
  var hasNativePE = window.PointerEvent || window.MSPointerEvent;

  // only add shadow selectors if shadowdom is supported
  var hasShadowRoot =
    !window.ShadowDOMPolyfill && document.head.createShadowRoot;

  function applyAttributeStyles() {
    if (hasNativePE) {
      attrib2css.forEach(function(r) {
        if (String(r) === r) {
          styles += selector(r) + rule(r) + "\n";
          if (hasShadowRoot) {
            styles += shadowSelector(r) + rule(r) + "\n";
          }
        } else {
          styles += r.selectors.map(selector) + rule(r.rule) + "\n";
          if (hasShadowRoot) {
            styles += r.selectors.map(shadowSelector) + rule(r.rule) + "\n";
          }
        }
      });

      var el = document.createElement("style");
      el.textContent = styles;
      document.head.appendChild(el);
    }
  }

  var pointermap = dispatcher.pointermap;

  // radius around touchend that swallows mouse events
  var DEDUP_DIST = 25;

  // left, middle, right, back, forward
  var BUTTON_TO_BUTTONS = [1, 4, 2, 8, 16];

  var HAS_BUTTONS = false;
  try {
    HAS_BUTTONS = new MouseEvent("test", { buttons: 1 }).buttons === 1;
  } catch (e) {}

  // handler block for native mouse events
  var mouseEvents = {
    POINTER_ID: 1,
    POINTER_TYPE: "mouse",
    events: ["mousedown", "mousemove", "mouseup", "mouseover", "mouseout"],
    register: function(target) {
      dispatcher.listen(target, this.events);
    },
    unregister: function(target) {
      dispatcher.unlisten(target, this.events);
    },
    lastTouches: [],

    // collide with the global mouse listener
    isEventSimulatedFromTouch: function(inEvent) {
      var lts = this.lastTouches;
      var x = inEvent.clientX;
      var y = inEvent.clientY;
      for (var i = 0, l = lts.length, t; i < l && (t = lts[i]); i++) {
        // simulated mouse events will be swallowed near a primary touchend
        var dx = Math.abs(x - t.x);
        var dy = Math.abs(y - t.y);
        if (dx <= DEDUP_DIST && dy <= DEDUP_DIST) {
          return true;
        }
      }
    },
    prepareEvent: function(inEvent) {
      var e = dispatcher.cloneEvent(inEvent);

      // forward mouse preventDefault
      var pd = e.preventDefault;
      e.preventDefault = function() {
        inEvent.preventDefault();
        pd();
      };
      e.pointerId = this.POINTER_ID;
      e.isPrimary = true;
      e.pointerType = this.POINTER_TYPE;
      return e;
    },
    prepareButtonsForMove: function(e, inEvent) {
      var p = pointermap.get(this.POINTER_ID);

      // Update buttons state after possible out-of-document mouseup.
      if (inEvent.which === 0 || !p) {
        e.buttons = 0;
      } else {
        e.buttons = p.buttons;
      }
      inEvent.buttons = e.buttons;
    },
    mousedown: function(inEvent) {
      if (!this.isEventSimulatedFromTouch(inEvent)) {
        var p = pointermap.get(this.POINTER_ID);
        var e = this.prepareEvent(inEvent);
        if (!HAS_BUTTONS) {
          e.buttons = BUTTON_TO_BUTTONS[e.button];
          if (p) {
            e.buttons |= p.buttons;
          }
          inEvent.buttons = e.buttons;
        }
        pointermap.set(this.POINTER_ID, inEvent);
        if (!p || p.buttons === 0) {
          dispatcher.down(e);
        } else {
          dispatcher.move(e);
        }
      }
    },
    mousemove: function(inEvent) {
      if (!this.isEventSimulatedFromTouch(inEvent)) {
        var e = this.prepareEvent(inEvent);
        if (!HAS_BUTTONS) {
          this.prepareButtonsForMove(e, inEvent);
        }
        e.button = -1;
        pointermap.set(this.POINTER_ID, inEvent);
        dispatcher.move(e);
      }
    },
    mouseup: function(inEvent) {
      if (!this.isEventSimulatedFromTouch(inEvent)) {
        var p = pointermap.get(this.POINTER_ID);
        var e = this.prepareEvent(inEvent);
        if (!HAS_BUTTONS) {
          var up = BUTTON_TO_BUTTONS[e.button];

          // Produces wrong state of buttons in Browsers without `buttons` support
          // when a mouse button that was pressed outside the document is released
          // inside and other buttons are still pressed down.
          e.buttons = p ? p.buttons & ~up : 0;
          inEvent.buttons = e.buttons;
        }
        pointermap.set(this.POINTER_ID, inEvent);

        // Support: Firefox <=44 only
        // FF Ubuntu includes the lifted button in the `buttons` property on
        // mouseup.
        // https://bugzilla.mozilla.org/show_bug.cgi?id=1223366
        e.buttons &= ~BUTTON_TO_BUTTONS[e.button];
        if (e.buttons === 0) {
          dispatcher.up(e);
        } else {
          dispatcher.move(e);
        }
      }
    },
    mouseover: function(inEvent) {
      if (!this.isEventSimulatedFromTouch(inEvent)) {
        var e = this.prepareEvent(inEvent);
        if (!HAS_BUTTONS) {
          this.prepareButtonsForMove(e, inEvent);
        }
        e.button = -1;
        pointermap.set(this.POINTER_ID, inEvent);
        dispatcher.enterOver(e);
      }
    },
    mouseout: function(inEvent) {
      if (!this.isEventSimulatedFromTouch(inEvent)) {
        var e = this.prepareEvent(inEvent);
        if (!HAS_BUTTONS) {
          this.prepareButtonsForMove(e, inEvent);
        }
        e.button = -1;
        dispatcher.leaveOut(e);
      }
    },
    cancel: function(inEvent) {
      var e = this.prepareEvent(inEvent);
      dispatcher.cancel(e);
      this.deactivateMouse();
    },
    deactivateMouse: function() {
      pointermap.delete(this.POINTER_ID);
    }
  };

  var captureInfo = dispatcher.captureInfo;
  var findTarget = targeting.findTarget.bind(targeting);
  var allShadows = targeting.allShadows.bind(targeting);
  var pointermap$1 = dispatcher.pointermap;

  // This should be long enough to ignore compat mouse events made by touch
  var DEDUP_TIMEOUT = 2500;
  var CLICK_COUNT_TIMEOUT = 200;
  var ATTRIB = "touch-action";
  var INSTALLER;

  // handler block for native touch events
  var touchEvents = {
    events: ["touchstart", "touchmove", "touchend", "touchcancel"],
    register: function(target) {
      INSTALLER.enableOnSubtree(target);
    },
    unregister: function() {
      // TODO(dfreedman): is it worth it to disconnect the MO?
    },
    elementAdded: function(el) {
      var a = el.getAttribute(ATTRIB);
      var st = this.touchActionToScrollType(a);
      if (st) {
        el._scrollType = st;
        dispatcher.listen(el, this.events);

        // set touch-action on shadows as well
        allShadows(el).forEach(function(s) {
          s._scrollType = st;
          dispatcher.listen(s, this.events);
        }, this);
      }
    },
    elementRemoved: function(el) {
      el._scrollType = undefined;
      dispatcher.unlisten(el, this.events);

      // remove touch-action from shadow
      allShadows(el).forEach(function(s) {
        s._scrollType = undefined;
        dispatcher.unlisten(s, this.events);
      }, this);
    },
    elementChanged: function(el, oldValue) {
      var a = el.getAttribute(ATTRIB);
      var st = this.touchActionToScrollType(a);
      var oldSt = this.touchActionToScrollType(oldValue);

      // simply update scrollType if listeners are already established
      if (st && oldSt) {
        el._scrollType = st;
        allShadows(el).forEach(function(s) {
          s._scrollType = st;
        }, this);
      } else if (oldSt) {
        this.elementRemoved(el);
      } else if (st) {
        this.elementAdded(el);
      }
    },
    scrollTypes: {
      EMITTER: "none",
      XSCROLLER: "pan-x",
      YSCROLLER: "pan-y",
      SCROLLER: /^(?:pan-x pan-y)|(?:pan-y pan-x)|auto$/
    },
    touchActionToScrollType: function(touchAction) {
      var t = touchAction;
      var st = this.scrollTypes;
      if (t === "none") {
        return "none";
      } else if (t === st.XSCROLLER) {
        return "X";
      } else if (t === st.YSCROLLER) {
        return "Y";
      } else if (st.SCROLLER.exec(t)) {
        return "XY";
      }
    },
    POINTER_TYPE: "touch",
    firstTouch: null,
    isPrimaryTouch: function(inTouch) {
      return this.firstTouch === inTouch.identifier;
    },
    setPrimaryTouch: function(inTouch) {
      // set primary touch if there no pointers, or the only pointer is the mouse
      if (
        pointermap$1.size === 0 ||
        (pointermap$1.size === 1 && pointermap$1.has(1))
      ) {
        this.firstTouch = inTouch.identifier;
        this.firstXY = { X: inTouch.clientX, Y: inTouch.clientY };
        this.scrolling = false;
        this.cancelResetClickCount();
      }
    },
    removePrimaryPointer: function(inPointer) {
      if (inPointer.isPrimary) {
        this.firstTouch = null;
        this.firstXY = null;
        this.resetClickCount();
      }
    },
    clickCount: 0,
    resetId: null,
    resetClickCount: function() {
      var fn = function() {
        this.clickCount = 0;
        this.resetId = null;
      }.bind(this);
      this.resetId = setTimeout(fn, CLICK_COUNT_TIMEOUT);
    },
    cancelResetClickCount: function() {
      if (this.resetId) {
        clearTimeout(this.resetId);
      }
    },
    typeToButtons: function(type) {
      var ret = 0;
      if (type === "touchstart" || type === "touchmove") {
        ret = 1;
      }
      return ret;
    },
    touchToPointer: function(inTouch) {
      var cte = this.currentTouchEvent;
      var e = dispatcher.cloneEvent(inTouch);

      // We reserve pointerId 1 for Mouse.
      // Touch identifiers can start at 0.
      // Add 2 to the touch identifier for compatibility.
      var id = (e.pointerId = inTouch.identifier + 2);
      e.target = captureInfo[id] || findTarget(e);
      e.bubbles = true;
      e.cancelable = true;
      e.detail = this.clickCount;
      e.button = 0;
      e.buttons = this.typeToButtons(cte.type);
      e.width = (inTouch.radiusX || inTouch.webkitRadiusX || 0) * 2;
      e.height = (inTouch.radiusY || inTouch.webkitRadiusY || 0) * 2;
      e.pressure = inTouch.force || inTouch.webkitForce || 0.5;
      e.isPrimary = this.isPrimaryTouch(inTouch);
      e.pointerType = this.POINTER_TYPE;

      // forward modifier keys
      e.altKey = cte.altKey;
      e.ctrlKey = cte.ctrlKey;
      e.metaKey = cte.metaKey;
      e.shiftKey = cte.shiftKey;

      // forward touch preventDefaults
      var self = this;
      e.preventDefault = function() {
        self.scrolling = false;
        self.firstXY = null;
        cte.preventDefault();
      };
      return e;
    },
    processTouches: function(inEvent, inFunction) {
      var tl = inEvent.changedTouches;
      this.currentTouchEvent = inEvent;
      for (var i = 0, t; i < tl.length; i++) {
        t = tl[i];
        inFunction.call(this, this.touchToPointer(t));
      }
    },

    // For single axis scrollers, determines whether the element should emit
    // pointer events or behave as a scroller
    shouldScroll: function(inEvent) {
      if (this.firstXY) {
        var ret;
        var scrollAxis = inEvent.currentTarget._scrollType;
        if (scrollAxis === "none") {
          // this element is a touch-action: none, should never scroll
          ret = false;
        } else if (scrollAxis === "XY") {
          // this element should always scroll
          ret = true;
        } else {
          var t = inEvent.changedTouches[0];

          // check the intended scroll axis, and other axis
          var a = scrollAxis;
          var oa = scrollAxis === "Y" ? "X" : "Y";
          var da = Math.abs(t["client" + a] - this.firstXY[a]);
          var doa = Math.abs(t["client" + oa] - this.firstXY[oa]);

          // if delta in the scroll axis > delta other axis, scroll instead of
          // making events
          ret = da >= doa;
        }
        this.firstXY = null;
        return ret;
      }
    },
    findTouch: function(inTL, inId) {
      for (var i = 0, l = inTL.length, t; i < l && (t = inTL[i]); i++) {
        if (t.identifier === inId) {
          return true;
        }
      }
    },

    // In some instances, a touchstart can happen without a touchend. This
    // leaves the pointermap in a broken state.
    // Therefore, on every touchstart, we remove the touches that did not fire a
    // touchend event.
    // To keep state globally consistent, we fire a
    // pointercancel for this "abandoned" touch
    vacuumTouches: function(inEvent) {
      var tl = inEvent.touches;

      // pointermap.size should be < tl.length here, as the touchstart has not
      // been processed yet.
      if (pointermap$1.size >= tl.length) {
        var d = [];
        pointermap$1.forEach(function(value, key) {
          // Never remove pointerId == 1, which is mouse.
          // Touch identifiers are 2 smaller than their pointerId, which is the
          // index in pointermap.
          if (key !== 1 && !this.findTouch(tl, key - 2)) {
            var p = value.out;
            d.push(p);
          }
        }, this);
        d.forEach(this.cancelOut, this);
      }
    },
    touchstart: function(inEvent) {
      this.vacuumTouches(inEvent);
      this.setPrimaryTouch(inEvent.changedTouches[0]);
      this.dedupSynthMouse(inEvent);
      if (!this.scrolling) {
        this.clickCount++;
        this.processTouches(inEvent, this.overDown);
      }
    },
    overDown: function(inPointer) {
      pointermap$1.set(inPointer.pointerId, {
        target: inPointer.target,
        out: inPointer,
        outTarget: inPointer.target
      });
      dispatcher.enterOver(inPointer);
      dispatcher.down(inPointer);
    },
    touchmove: function(inEvent) {
      if (!this.scrolling) {
        if (this.shouldScroll(inEvent)) {
          this.scrolling = true;
          this.touchcancel(inEvent);
        } else {
          inEvent.preventDefault();
          this.processTouches(inEvent, this.moveOverOut);
        }
      }
    },
    moveOverOut: function(inPointer) {
      var event = inPointer;
      var pointer = pointermap$1.get(event.pointerId);

      // a finger drifted off the screen, ignore it
      if (!pointer) {
        return;
      }
      var outEvent = pointer.out;
      var outTarget = pointer.outTarget;
      dispatcher.move(event);
      if (outEvent && outTarget !== event.target) {
        outEvent.relatedTarget = event.target;
        event.relatedTarget = outTarget;

        // recover from retargeting by shadow
        outEvent.target = outTarget;
        if (event.target) {
          dispatcher.leaveOut(outEvent);
          dispatcher.enterOver(event);
        } else {
          // clean up case when finger leaves the screen
          event.target = outTarget;
          event.relatedTarget = null;
          this.cancelOut(event);
        }
      }
      pointer.out = event;
      pointer.outTarget = event.target;
    },
    touchend: function(inEvent) {
      this.dedupSynthMouse(inEvent);
      this.processTouches(inEvent, this.upOut);
    },
    upOut: function(inPointer) {
      if (!this.scrolling) {
        dispatcher.up(inPointer);
        dispatcher.leaveOut(inPointer);
      }
      this.cleanUpPointer(inPointer);
    },
    touchcancel: function(inEvent) {
      this.processTouches(inEvent, this.cancelOut);
    },
    cancelOut: function(inPointer) {
      dispatcher.cancel(inPointer);
      dispatcher.leaveOut(inPointer);
      this.cleanUpPointer(inPointer);
    },
    cleanUpPointer: function(inPointer) {
      pointermap$1.delete(inPointer.pointerId);
      this.removePrimaryPointer(inPointer);
    },

    // prevent synth mouse events from creating pointer events
    dedupSynthMouse: function(inEvent) {
      var lts = mouseEvents.lastTouches;
      var t = inEvent.changedTouches[0];

      // only the primary finger will synth mouse events
      if (this.isPrimaryTouch(t)) {
        // remember x/y of last touch
        var lt = { x: t.clientX, y: t.clientY };
        lts.push(lt);
        var fn = function(lts, lt) {
          var i = lts.indexOf(lt);
          if (i > -1) {
            lts.splice(i, 1);
          }
        }.bind(null, lts, lt);
        setTimeout(fn, DEDUP_TIMEOUT);
      }
    }
  };

  INSTALLER = new Installer(
    touchEvents.elementAdded,
    touchEvents.elementRemoved,
    touchEvents.elementChanged,
    touchEvents
  );

  var pointermap$2 = dispatcher.pointermap;
  var HAS_BITMAP_TYPE =
    window.MSPointerEvent &&
    typeof window.MSPointerEvent.MSPOINTER_TYPE_MOUSE === "number";
  var msEvents = {
    events: [
      "MSPointerDown",
      "MSPointerMove",
      "MSPointerUp",
      "MSPointerOut",
      "MSPointerOver",
      "MSPointerCancel",
      "MSGotPointerCapture",
      "MSLostPointerCapture"
    ],
    register: function(target) {
      dispatcher.listen(target, this.events);
    },
    unregister: function(target) {
      dispatcher.unlisten(target, this.events);
    },
    POINTER_TYPES: ["", "unavailable", "touch", "pen", "mouse"],
    prepareEvent: function(inEvent) {
      var e = inEvent;
      if (HAS_BITMAP_TYPE) {
        e = dispatcher.cloneEvent(inEvent);
        e.pointerType = this.POINTER_TYPES[inEvent.pointerType];
      }
      return e;
    },
    cleanup: function(id) {
      pointermap$2.delete(id);
    },
    MSPointerDown: function(inEvent) {
      pointermap$2.set(inEvent.pointerId, inEvent);
      var e = this.prepareEvent(inEvent);
      dispatcher.down(e);
    },
    MSPointerMove: function(inEvent) {
      var e = this.prepareEvent(inEvent);
      dispatcher.move(e);
    },
    MSPointerUp: function(inEvent) {
      var e = this.prepareEvent(inEvent);
      dispatcher.up(e);
      this.cleanup(inEvent.pointerId);
    },
    MSPointerOut: function(inEvent) {
      var e = this.prepareEvent(inEvent);
      dispatcher.leaveOut(e);
    },
    MSPointerOver: function(inEvent) {
      var e = this.prepareEvent(inEvent);
      dispatcher.enterOver(e);
    },
    MSPointerCancel: function(inEvent) {
      var e = this.prepareEvent(inEvent);
      dispatcher.cancel(e);
      this.cleanup(inEvent.pointerId);
    },
    MSLostPointerCapture: function(inEvent) {
      var e = dispatcher.makeEvent("lostpointercapture", inEvent);
      dispatcher.dispatchEvent(e);
    },
    MSGotPointerCapture: function(inEvent) {
      var e = dispatcher.makeEvent("gotpointercapture", inEvent);
      dispatcher.dispatchEvent(e);
    }
  };

  function applyPolyfill() {
    // only activate if this platform does not have pointer events
    if (!window.PointerEvent) {
      window.PointerEvent = PointerEvent;

      if (window.navigator.msPointerEnabled) {
        var tp = window.navigator.msMaxTouchPoints;
        Object.defineProperty(window.navigator, "maxTouchPoints", {
          value: tp,
          enumerable: true
        });
        dispatcher.registerSource("ms", msEvents);
      } else {
        Object.defineProperty(window.navigator, "maxTouchPoints", {
          value: 0,
          enumerable: true
        });
        dispatcher.registerSource("mouse", mouseEvents);
        if (window.ontouchstart !== undefined) {
          dispatcher.registerSource("touch", touchEvents);
        }
      }

      dispatcher.register(document);
    }
  }

  var n = window.navigator;
  var s;
  var r;
  var h;
  function assertActive(id) {
    if (!dispatcher.pointermap.has(id)) {
      var error = new Error("InvalidPointerId");
      error.name = "InvalidPointerId";
      throw error;
    }
  }
  function assertConnected(elem) {
    var parent = elem.parentNode;
    while (parent && parent !== elem.ownerDocument) {
      parent = parent.parentNode;
    }
    if (!parent) {
      var error = new Error("InvalidStateError");
      error.name = "InvalidStateError";
      throw error;
    }
  }
  function inActiveButtonState(id) {
    var p = dispatcher.pointermap.get(id);
    return p.buttons !== 0;
  }
  if (n.msPointerEnabled) {
    s = function(pointerId) {
      assertActive(pointerId);
      assertConnected(this);
      if (inActiveButtonState(pointerId)) {
        dispatcher.setCapture(pointerId, this, true);
        this.msSetPointerCapture(pointerId);
      }
    };
    r = function(pointerId) {
      assertActive(pointerId);
      dispatcher.releaseCapture(pointerId, true);
      this.msReleasePointerCapture(pointerId);
    };
  } else {
    s = function setPointerCapture(pointerId) {
      assertActive(pointerId);
      assertConnected(this);
      if (inActiveButtonState(pointerId)) {
        dispatcher.setCapture(pointerId, this);
      }
    };
    r = function releasePointerCapture(pointerId) {
      assertActive(pointerId);
      dispatcher.releaseCapture(pointerId);
    };
  }
  h = function hasPointerCapture(pointerId) {
    return !!dispatcher.captureInfo[pointerId];
  };

  function applyPolyfill$1() {
    if (window.Element && !Element.prototype.setPointerCapture) {
      Object.defineProperties(Element.prototype, {
        setPointerCapture: {
          value: s
        },
        releasePointerCapture: {
          value: r
        },
        hasPointerCapture: {
          value: h
        }
      });
    }
  }

  applyAttributeStyles();
  applyPolyfill();
  applyPolyfill$1();

  var pointerevents = {
    dispatcher: dispatcher,
    Installer: Installer,
    PointerEvent: PointerEvent,
    PointerMap: PointerMap,
    targetFinding: targeting
  };

  return pointerevents;
});


(function () {
    var eon = this;

    // NOTE: template import order matters!    
    // ############################################################################################
// DEBUG
// ############################################################################################

eon.warn = eon.warn || {};
eon.error = eon.error || {};

eon.debug.log = function(condition, message) {
  if (eon.debug[condition]) {
    console.log(condition + ": " + message);
  }
};

eon.warn.log = function(condition, message) {
  if (eon.warn[condition]) {
    console.warn(condition + ": " + message);
  }
};

eon.error.log = function(condition, message) {
  if (eon.error[condition]) {
    console.error(condition + ": " + message);
  }
};

eon.debug.adapterEvents = "adapterEvents" in eon.debug ? eon.debug.adapterEvents : false;
eon.debug.configEvents = "configEvents" in eon.debug ? eon.debug.configEvents : false;
eon.debug.elementEvents = "elementEvents" in eon.debug ? eon.debug.elementEvents : false;

eon.warn.store = "store" in eon.warn?  eon.warn.store : true;
eon.error.store = "store" in eon.error? eon.error.store : true;
    
    // ############################################################################################
// BASE
// ############################################################################################

eon.cacheBusting = "cacheBusting" in eon ? eon.cacheBusting : false;
eon.importCacheBusting = "importCacheBusting" in eon ? eon.importCacheBusting : false;
eon.themeCacheBusting = "themeCacheBusting" in eon ? eon.themeCacheBusting : false;
eon.pollyfillCacheBusting = "pollyfillCacheBusting" in eon ? eon.pollyfillCacheBusting : false;

eon.getCacheBustedUrl = function (url) {
  return url + "?ecb=" + (+ new Date);
}

eon.getCurrentScript = function() {
    if (document.currentScript) {
      return document.currentScript.src;
    } else {
      var scripts = document.getElementsByTagName("script");
      return scripts[scripts.length - 1].src;
    }
  };
  
  eon.__setBase = function() {
    var path = eon.getCurrentScript().replace(new RegExp("(\\/[^\\/]+)\\/?$"), "");
    path = path.replace(/.*:\/\//g, "");
    path = path.split("/");
    path = path.slice(1, path.length);
  
    var basePath = "";
    for (i = 0; i < path.length; i++) {
      basePath += "/";
      basePath += path[i];
    }
  
    eon.basePath = basePath;
  };
  
  // Attempt to find basePath if not set
  if (!eon.basePath) {
    eon.__setBase();
  }
      
    // ############################################################################################
// STYLE
// ############################################################################################

// Creates a style node and saves the reference
eon.style = document.createElement("style");
eon.rules = {};

// Appends the style to the head
document.head.appendChild(eon.style);

// Hides initial elements
eon.style.sheet.insertRule(".eon-until-rendered { opacity: 0; }", 0);
// Hide eon-script
eon.style.sheet.insertRule("eon-script { display: none; }", 0);

// ############################################################################################
// RESPONSIVE
// ############################################################################################

eon.mobileWidth = 450;
eon.tabletWidth = 800;

eon.addViewportMeta = "addViewportMeta" in eon? eon.addViewportMeta : true;

if (eon.addViewportMeta) {
    document.write(
        '<meta name="viewport" content="width=device-width, initial-scale=1.0">'
    );
}
    
    
// ############################################################################################
// POLYFILL DETECTION
// ############################################################################################

eon.polyfills.injectPolyfill = function (url) {
  url = eon.cacheBusting || eon.pollyfillCacheBusting ? eon.getCacheBustedUrl(url) : url;
  document.write('<script type="text/javascript" src="' + url + '"></script>');
};

eon.polyfills.needCustomElementsPolyfill = function () {
  var __customElements = window.hasOwnProperty("customElements");
  if (eon.debug.polyfill) {
    console.log("Polyfill custom-elements", !__customElements);
  }
  return !__customElements;
};

eon.polyfills.needTemplatePolyfill = function () {
  var __template = "content" in document.createElement("template") === true;
  if (eon.debug.polyfill) {
    console.log("Polyfill template", !__template);
  }
  return !__template;
};

eon.polyfills.needCSSScopePolyfill = function () {
  var needPolyfill = false;
  try {
    doc.querySelector(":scope body");
  } catch (err) {
    needPolyfill = true;
  }
  if (eon.debug.polyfill) {
    console.log("Polyfill CSS Scope", needPolyfill);
  }
  return needPolyfill;
};

eon.polyfills.needObjectAssignPolyfill = function () {
  var needPolyfill = !Object.assign;
  if (eon.debug.polyfill) {
    console.log("Polyfill Object Assign", needPolyfill);
  }
  return needPolyfill;
};

eon.polyfills.needLocaleStringPolyfill = function () {
  return (new Date(1994, 1, 9).toLocaleString("en", { weekday: "short" }) != "Wed");
}

eon.polyfills.needPromisesPolyfill = function () {
  if(typeof Promise !== "undefined" && Promise.toString().indexOf("[native code]") !== -1){
    return false;
  }
  return true;
}
eon.polyfills.needClassListAddPolyfill = function () {
  var div = document.createElement("div");
  div.classList.add("class1", "class2");

  return div.classList.contains("class2") ? false : true;
}

// ############################################################################################
// POLYFILL IMPORTS
// ############################################################################################

// Custom Elements - https://github.com/webcomponents/custom-elements
if (!eon.polyfills.customElements && eon.polyfills.needCustomElementsPolyfill()) {
  eon.polyfills.injectPolyfill(eon.basePath + "/polyfill/custom-elements/custom-elements.min.js");
}

// Template - https://github.com/webcomponents/template
if (!eon.polyfills.template && eon.polyfills.needTemplatePolyfill()) {
  eon.polyfills.injectPolyfill(eon.basePath + "/polyfill/template/template.js");
}

// CSS :scope
if (!eon.polyfills.CSSScope && eon.polyfills.needCSSScopePolyfill()) {
  eon.polyfills.injectPolyfill(eon.basePath + "/polyfill/css/scope.js");
}

// Object.assign
if (!eon.polyfills.assign && eon.polyfills.needObjectAssignPolyfill()) {
  eon.polyfills.injectPolyfill(eon.basePath + "/polyfill/object/assign.js");
}

// Promises
if (!eon.polyfills.promises && eon.polyfills.needPromisesPolyfill()) {
  eon.polyfills.injectPolyfill(eon.basePath + "/polyfill/promises/promises.js");
}

// Date locale polyfill
if (!eon.polyfills.localeString && eon.polyfills.needLocaleStringPolyfill()) {
  eon.polyfills.injectPolyfill(eon.basePath + "/polyfill/locale-string/locale-string.js");
}

//
if (!eon.polyfills.classList && eon.polyfills.needClassListAddPolyfill()) {
  eon.polyfills.injectPolyfill(eon.basePath + "/polyfill/class-list/class-list.js");
}

// Pointer events (Must run always)
if (!eon.polyfills.pep) {
  eon.polyfills.injectPolyfill(eon.basePath + "/polyfill/pointer-events/pep.js");
}



    
    // ############################################################################################
// IMPORT JS - AMD (RequireJS)
// ############################################################################################

// Creates a namespace for requirejs
eon.amd = eon.amd || {};

(function () {

  // Import requirejs file
  // ------------------------------------------------------------------------------------
    /** vim: et:ts=4:sw=4:sts=4
 * @license RequireJS 2.3.5 Copyright jQuery Foundation and other contributors.
 * Released under MIT license, https://github.com/requirejs/requirejs/blob/master/LICENSE
 */
//Not using strict: uneven strict support in browsers, #392, and causes
//problems with requirejs.exec()/transpiler plugins that may not be strict.
/*jslint regexp: true, nomen: true, sloppy: true */
/*global window, navigator, document, importScripts, setTimeout, opera */

var requirejs, require, define;
(function (global, setTimeout) {
    var req, s, head, baseElement, dataMain, src,
        interactiveScript, currentlyAddingScript, mainScript, subPath,
        version = '2.3.5',
        commentRegExp = /\/\*[\s\S]*?\*\/|([^:"'=]|^)\/\/.*$/mg,
        cjsRequireRegExp = /[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,
        jsSuffixRegExp = /\.js$/,
        currDirRegExp = /^\.\//,
        op = Object.prototype,
        ostring = op.toString,
        hasOwn = op.hasOwnProperty,
        isBrowser = !!(typeof window !== 'undefined' && typeof navigator !== 'undefined' && window.document),
        isWebWorker = !isBrowser && typeof importScripts !== 'undefined',
        //PS3 indicates loaded and complete, but need to wait for complete
        //specifically. Sequence is 'loading', 'loaded', execution,
        // then 'complete'. The UA check is unfortunate, but not sure how
        //to feature test w/o causing perf issues.
        readyRegExp = isBrowser && navigator.platform === 'PLAYSTATION 3' ?
                      /^complete$/ : /^(complete|loaded)$/,
        defContextName = '_',
        //Oh the tragedy, detecting opera. See the usage of isOpera for reason.
        isOpera = typeof opera !== 'undefined' && opera.toString() === '[object Opera]',
        contexts = {},
        cfg = {},
        globalDefQueue = [],
        useInteractive = false;

    //Could match something like ')//comment', do not lose the prefix to comment.
    function commentReplace(match, singlePrefix) {
        return singlePrefix || '';
    }

    function isFunction(it) {
        return ostring.call(it) === '[object Function]';
    }

    function isArray(it) {
        return ostring.call(it) === '[object Array]';
    }

    /**
     * Helper function for iterating over an array. If the func returns
     * a true value, it will break out of the loop.
     */
    function each(ary, func) {
        if (ary) {
            var i;
            for (i = 0; i < ary.length; i += 1) {
                if (ary[i] && func(ary[i], i, ary)) {
                    break;
                }
            }
        }
    }

    /**
     * Helper function for iterating over an array backwards. If the func
     * returns a true value, it will break out of the loop.
     */
    function eachReverse(ary, func) {
        if (ary) {
            var i;
            for (i = ary.length - 1; i > -1; i -= 1) {
                if (ary[i] && func(ary[i], i, ary)) {
                    break;
                }
            }
        }
    }

    function hasProp(obj, prop) {
        return hasOwn.call(obj, prop);
    }

    function getOwn(obj, prop) {
        return hasProp(obj, prop) && obj[prop];
    }

    /**
     * Cycles over properties in an object and calls a function for each
     * property value. If the function returns a truthy value, then the
     * iteration is stopped.
     */
    function eachProp(obj, func) {
        var prop;
        for (prop in obj) {
            if (hasProp(obj, prop)) {
                if (func(obj[prop], prop)) {
                    break;
                }
            }
        }
    }

    /**
     * Simple function to mix in properties from source into target,
     * but only if target does not already have a property of the same name.
     */
    function mixin(target, source, force, deepStringMixin) {
        if (source) {
            eachProp(source, function (value, prop) {
                if (force || !hasProp(target, prop)) {
                    if (deepStringMixin && typeof value === 'object' && value &&
                        !isArray(value) && !isFunction(value) &&
                        !(value instanceof RegExp)) {

                        if (!target[prop]) {
                            target[prop] = {};
                        }
                        mixin(target[prop], value, force, deepStringMixin);
                    } else {
                        target[prop] = value;
                    }
                }
            });
        }
        return target;
    }

    //Similar to Function.prototype.bind, but the 'this' object is specified
    //first, since it is easier to read/figure out what 'this' will be.
    function bind(obj, fn) {
        return function () {
            return fn.apply(obj, arguments);
        };
    }

    function scripts() {
        return document.getElementsByTagName('script');
    }

    function defaultOnError(err) {
        throw err;
    }

    //Allow getting a global that is expressed in
    //dot notation, like 'a.b.c'.
    function getGlobal(value) {
        if (!value) {
            return value;
        }
        var g = global;
        each(value.split('.'), function (part) {
            g = g[part];
        });
        return g;
    }

    /**
     * Constructs an error with a pointer to an URL with more information.
     * @param {String} id the error ID that maps to an ID on a web page.
     * @param {String} message human readable error.
     * @param {Error} [err] the original error, if there is one.
     *
     * @returns {Error}
     */
    function makeError(id, msg, err, requireModules) {
        var e = new Error(msg + '\nhttp://requirejs.org/docs/errors.html#' + id);
        e.requireType = id;
        e.requireModules = requireModules;
        if (err) {
            e.originalError = err;
        }
        return e;
    }

    if (typeof define !== 'undefined') {
        //If a define is already in play via another AMD loader,
        //do not overwrite.
        return;
    }

    if (typeof requirejs !== 'undefined') {
        if (isFunction(requirejs)) {
            //Do not overwrite an existing requirejs instance.
            return;
        }
        cfg = requirejs;
        requirejs = undefined;
    }

    //Allow for a require config object
    if (typeof require !== 'undefined' && !isFunction(require)) {
        //assume it is a config object.
        cfg = require;
        require = undefined;
    }

    function newContext(contextName) {
        var inCheckLoaded, Module, context, handlers,
            checkLoadedTimeoutId,
            config = {
                //Defaults. Do not set a default for map
                //config to speed up normalize(), which
                //will run faster if there is no default.
                waitSeconds: 7,
                baseUrl: './',
                paths: {},
                bundles: {},
                pkgs: {},
                shim: {},
                config: {}
            },
            registry = {},
            //registry of just enabled modules, to speed
            //cycle breaking code when lots of modules
            //are registered, but not activated.
            enabledRegistry = {},
            undefEvents = {},
            defQueue = [],
            defined = {},
            urlFetched = {},
            bundlesMap = {},
            requireCounter = 1,
            unnormalizedCounter = 1;

        /**
         * Trims the . and .. from an array of path segments.
         * It will keep a leading path segment if a .. will become
         * the first path segment, to help with module name lookups,
         * which act like paths, but can be remapped. But the end result,
         * all paths that use this function should look normalized.
         * NOTE: this method MODIFIES the input array.
         * @param {Array} ary the array of path segments.
         */
        function trimDots(ary) {
            var i, part;
            for (i = 0; i < ary.length; i++) {
                part = ary[i];
                if (part === '.') {
                    ary.splice(i, 1);
                    i -= 1;
                } else if (part === '..') {
                    // If at the start, or previous value is still ..,
                    // keep them so that when converted to a path it may
                    // still work when converted to a path, even though
                    // as an ID it is less than ideal. In larger point
                    // releases, may be better to just kick out an error.
                    if (i === 0 || (i === 1 && ary[2] === '..') || ary[i - 1] === '..') {
                        continue;
                    } else if (i > 0) {
                        ary.splice(i - 1, 2);
                        i -= 2;
                    }
                }
            }
        }

        /**
         * Given a relative module name, like ./something, normalize it to
         * a real name that can be mapped to a path.
         * @param {String} name the relative name
         * @param {String} baseName a real name that the name arg is relative
         * to.
         * @param {Boolean} applyMap apply the map config to the value. Should
         * only be done if this normalization is for a dependency ID.
         * @returns {String} normalized name
         */
        function normalize(name, baseName, applyMap) {
            var pkgMain, mapValue, nameParts, i, j, nameSegment, lastIndex,
                foundMap, foundI, foundStarMap, starI, normalizedBaseParts,
                baseParts = (baseName && baseName.split('/')),
                map = config.map,
                starMap = map && map['*'];

            //Adjust any relative paths.
            if (name) {
                name = name.split('/');
                lastIndex = name.length - 1;

                // If wanting node ID compatibility, strip .js from end
                // of IDs. Have to do this here, and not in nameToUrl
                // because node allows either .js or non .js to map
                // to same file.
                if (config.nodeIdCompat && jsSuffixRegExp.test(name[lastIndex])) {
                    name[lastIndex] = name[lastIndex].replace(jsSuffixRegExp, '');
                }

                // Starts with a '.' so need the baseName
                if (name[0].charAt(0) === '.' && baseParts) {
                    //Convert baseName to array, and lop off the last part,
                    //so that . matches that 'directory' and not name of the baseName's
                    //module. For instance, baseName of 'one/two/three', maps to
                    //'one/two/three.js', but we want the directory, 'one/two' for
                    //this normalization.
                    normalizedBaseParts = baseParts.slice(0, baseParts.length - 1);
                    name = normalizedBaseParts.concat(name);
                }

                trimDots(name);
                name = name.join('/');
            }

            //Apply map config if available.
            if (applyMap && map && (baseParts || starMap)) {
                nameParts = name.split('/');

                outerLoop: for (i = nameParts.length; i > 0; i -= 1) {
                    nameSegment = nameParts.slice(0, i).join('/');

                    if (baseParts) {
                        //Find the longest baseName segment match in the config.
                        //So, do joins on the biggest to smallest lengths of baseParts.
                        for (j = baseParts.length; j > 0; j -= 1) {
                            mapValue = getOwn(map, baseParts.slice(0, j).join('/'));

                            //baseName segment has config, find if it has one for
                            //this name.
                            if (mapValue) {
                                mapValue = getOwn(mapValue, nameSegment);
                                if (mapValue) {
                                    //Match, update name to the new value.
                                    foundMap = mapValue;
                                    foundI = i;
                                    break outerLoop;
                                }
                            }
                        }
                    }

                    //Check for a star map match, but just hold on to it,
                    //if there is a shorter segment match later in a matching
                    //config, then favor over this star map.
                    if (!foundStarMap && starMap && getOwn(starMap, nameSegment)) {
                        foundStarMap = getOwn(starMap, nameSegment);
                        starI = i;
                    }
                }

                if (!foundMap && foundStarMap) {
                    foundMap = foundStarMap;
                    foundI = starI;
                }

                if (foundMap) {
                    nameParts.splice(0, foundI, foundMap);
                    name = nameParts.join('/');
                }
            }

            // If the name points to a package's name, use
            // the package main instead.
            pkgMain = getOwn(config.pkgs, name);

            return pkgMain ? pkgMain : name;
        }

        function removeScript(name) {
            if (isBrowser) {
                each(scripts(), function (scriptNode) {
                    if (scriptNode.getAttribute('data-requiremodule') === name &&
                            scriptNode.getAttribute('data-requirecontext') === context.contextName) {
                        scriptNode.parentNode.removeChild(scriptNode);
                        return true;
                    }
                });
            }
        }

        function hasPathFallback(id) {
            var pathConfig = getOwn(config.paths, id);
            if (pathConfig && isArray(pathConfig) && pathConfig.length > 1) {
                //Pop off the first array value, since it failed, and
                //retry
                pathConfig.shift();
                context.require.undef(id);

                //Custom require that does not do map translation, since
                //ID is "absolute", already mapped/resolved.
                context.makeRequire(null, {
                    skipMap: true
                })([id]);

                return true;
            }
        }

        //Turns a plugin!resource to [plugin, resource]
        //with the plugin being undefined if the name
        //did not have a plugin prefix.
        function splitPrefix(name) {
            var prefix,
                index = name ? name.indexOf('!') : -1;
            if (index > -1) {
                prefix = name.substring(0, index);
                name = name.substring(index + 1, name.length);
            }
            return [prefix, name];
        }

        /**
         * Creates a module mapping that includes plugin prefix, module
         * name, and path. If parentModuleMap is provided it will
         * also normalize the name via require.normalize()
         *
         * @param {String} name the module name
         * @param {String} [parentModuleMap] parent module map
         * for the module name, used to resolve relative names.
         * @param {Boolean} isNormalized: is the ID already normalized.
         * This is true if this call is done for a define() module ID.
         * @param {Boolean} applyMap: apply the map config to the ID.
         * Should only be true if this map is for a dependency.
         *
         * @returns {Object}
         */
        function makeModuleMap(name, parentModuleMap, isNormalized, applyMap) {
            var url, pluginModule, suffix, nameParts,
                prefix = null,
                parentName = parentModuleMap ? parentModuleMap.name : null,
                originalName = name,
                isDefine = true,
                normalizedName = '';

            //If no name, then it means it is a require call, generate an
            //internal name.
            if (!name) {
                isDefine = false;
                name = '_@r' + (requireCounter += 1);
            }

            nameParts = splitPrefix(name);
            prefix = nameParts[0];
            name = nameParts[1];

            if (prefix) {
                prefix = normalize(prefix, parentName, applyMap);
                pluginModule = getOwn(defined, prefix);
            }

            //Account for relative paths if there is a base name.
            if (name) {
                if (prefix) {
                    if (isNormalized) {
                        normalizedName = name;
                    } else if (pluginModule && pluginModule.normalize) {
                        //Plugin is loaded, use its normalize method.
                        normalizedName = pluginModule.normalize(name, function (name) {
                            return normalize(name, parentName, applyMap);
                        });
                    } else {
                        // If nested plugin references, then do not try to
                        // normalize, as it will not normalize correctly. This
                        // places a restriction on resourceIds, and the longer
                        // term solution is not to normalize until plugins are
                        // loaded and all normalizations to allow for async
                        // loading of a loader plugin. But for now, fixes the
                        // common uses. Details in #1131
                        normalizedName = name.indexOf('!') === -1 ?
                                         normalize(name, parentName, applyMap) :
                                         name;
                    }
                } else {
                    //A regular module.
                    normalizedName = normalize(name, parentName, applyMap);

                    //Normalized name may be a plugin ID due to map config
                    //application in normalize. The map config values must
                    //already be normalized, so do not need to redo that part.
                    nameParts = splitPrefix(normalizedName);
                    prefix = nameParts[0];
                    normalizedName = nameParts[1];
                    isNormalized = true;

                    url = context.nameToUrl(normalizedName);
                }
            }

            //If the id is a plugin id that cannot be determined if it needs
            //normalization, stamp it with a unique ID so two matching relative
            //ids that may conflict can be separate.
            suffix = prefix && !pluginModule && !isNormalized ?
                     '_unnormalized' + (unnormalizedCounter += 1) :
                     '';

            return {
                prefix: prefix,
                name: normalizedName,
                parentMap: parentModuleMap,
                unnormalized: !!suffix,
                url: url,
                originalName: originalName,
                isDefine: isDefine,
                id: (prefix ?
                        prefix + '!' + normalizedName :
                        normalizedName) + suffix
            };
        }

        function getModule(depMap) {
            var id = depMap.id,
                mod = getOwn(registry, id);

            if (!mod) {
                mod = registry[id] = new context.Module(depMap);
            }

            return mod;
        }

        function on(depMap, name, fn) {
            var id = depMap.id,
                mod = getOwn(registry, id);

            if (hasProp(defined, id) &&
                    (!mod || mod.defineEmitComplete)) {
                if (name === 'defined') {
                    fn(defined[id]);
                }
            } else {
                mod = getModule(depMap);
                if (mod.error && name === 'error') {
                    fn(mod.error);
                } else {
                    mod.on(name, fn);
                }
            }
        }

        function onError(err, errback) {
            var ids = err.requireModules,
                notified = false;

            if (errback) {
                errback(err);
            } else {
                each(ids, function (id) {
                    var mod = getOwn(registry, id);
                    if (mod) {
                        //Set error on module, so it skips timeout checks.
                        mod.error = err;
                        if (mod.events.error) {
                            notified = true;
                            mod.emit('error', err);
                        }
                    }
                });

                if (!notified) {
                    req.onError(err);
                }
            }
        }

        /**
         * Internal method to transfer globalQueue items to this context's
         * defQueue.
         */
        function takeGlobalQueue() {
            //Push all the globalDefQueue items into the context's defQueue
            if (globalDefQueue.length) {
                each(globalDefQueue, function(queueItem) {
                    var id = queueItem[0];
                    if (typeof id === 'string') {
                        context.defQueueMap[id] = true;
                    }
                    defQueue.push(queueItem);
                });
                globalDefQueue = [];
            }
        }

        handlers = {
            'require': function (mod) {
                if (mod.require) {
                    return mod.require;
                } else {
                    return (mod.require = context.makeRequire(mod.map));
                }
            },
            'exports': function (mod) {
                mod.usingExports = true;
                if (mod.map.isDefine) {
                    if (mod.exports) {
                        return (defined[mod.map.id] = mod.exports);
                    } else {
                        return (mod.exports = defined[mod.map.id] = {});
                    }
                }
            },
            'module': function (mod) {
                if (mod.module) {
                    return mod.module;
                } else {
                    return (mod.module = {
                        id: mod.map.id,
                        uri: mod.map.url,
                        config: function () {
                            return getOwn(config.config, mod.map.id) || {};
                        },
                        exports: mod.exports || (mod.exports = {})
                    });
                }
            }
        };

        function cleanRegistry(id) {
            //Clean up machinery used for waiting modules.
            delete registry[id];
            delete enabledRegistry[id];
        }

        function breakCycle(mod, traced, processed) {
            var id = mod.map.id;

            if (mod.error) {
                mod.emit('error', mod.error);
            } else {
                traced[id] = true;
                each(mod.depMaps, function (depMap, i) {
                    var depId = depMap.id,
                        dep = getOwn(registry, depId);

                    //Only force things that have not completed
                    //being defined, so still in the registry,
                    //and only if it has not been matched up
                    //in the module already.
                    if (dep && !mod.depMatched[i] && !processed[depId]) {
                        if (getOwn(traced, depId)) {
                            mod.defineDep(i, defined[depId]);
                            mod.check(); //pass false?
                        } else {
                            breakCycle(dep, traced, processed);
                        }
                    }
                });
                processed[id] = true;
            }
        }

        function checkLoaded() {
            var err, usingPathFallback,
                waitInterval = config.waitSeconds * 1000,
                //It is possible to disable the wait interval by using waitSeconds of 0.
                expired = waitInterval && (context.startTime + waitInterval) < new Date().getTime(),
                noLoads = [],
                reqCalls = [],
                stillLoading = false,
                needCycleCheck = true;

            //Do not bother if this call was a result of a cycle break.
            if (inCheckLoaded) {
                return;
            }

            inCheckLoaded = true;

            //Figure out the state of all the modules.
            eachProp(enabledRegistry, function (mod) {
                var map = mod.map,
                    modId = map.id;

                //Skip things that are not enabled or in error state.
                if (!mod.enabled) {
                    return;
                }

                if (!map.isDefine) {
                    reqCalls.push(mod);
                }

                if (!mod.error) {
                    //If the module should be executed, and it has not
                    //been inited and time is up, remember it.
                    if (!mod.inited && expired) {
                        if (hasPathFallback(modId)) {
                            usingPathFallback = true;
                            stillLoading = true;
                        } else {
                            noLoads.push(modId);
                            removeScript(modId);
                        }
                    } else if (!mod.inited && mod.fetched && map.isDefine) {
                        stillLoading = true;
                        if (!map.prefix) {
                            //No reason to keep looking for unfinished
                            //loading. If the only stillLoading is a
                            //plugin resource though, keep going,
                            //because it may be that a plugin resource
                            //is waiting on a non-plugin cycle.
                            return (needCycleCheck = false);
                        }
                    }
                }
            });

            if (expired && noLoads.length) {
                //If wait time expired, throw error of unloaded modules.
                err = makeError('timeout', 'Load timeout for modules: ' + noLoads, null, noLoads);
                err.contextName = context.contextName;
                return onError(err);
            }

            //Not expired, check for a cycle.
            if (needCycleCheck) {
                each(reqCalls, function (mod) {
                    breakCycle(mod, {}, {});
                });
            }

            //If still waiting on loads, and the waiting load is something
            //other than a plugin resource, or there are still outstanding
            //scripts, then just try back later.
            if ((!expired || usingPathFallback) && stillLoading) {
                //Something is still waiting to load. Wait for it, but only
                //if a timeout is not already in effect.
                if ((isBrowser || isWebWorker) && !checkLoadedTimeoutId) {
                    checkLoadedTimeoutId = setTimeout(function () {
                        checkLoadedTimeoutId = 0;
                        checkLoaded();
                    }, 50);
                }
            }

            inCheckLoaded = false;
        }

        Module = function (map) {
            this.events = getOwn(undefEvents, map.id) || {};
            this.map = map;
            this.shim = getOwn(config.shim, map.id);
            this.depExports = [];
            this.depMaps = [];
            this.depMatched = [];
            this.pluginMaps = {};
            this.depCount = 0;

            /* this.exports this.factory
               this.depMaps = [],
               this.enabled, this.fetched
            */
        };

        Module.prototype = {
            init: function (depMaps, factory, errback, options) {
                options = options || {};

                //Do not do more inits if already done. Can happen if there
                //are multiple define calls for the same module. That is not
                //a normal, common case, but it is also not unexpected.
                if (this.inited) {
                    return;
                }

                this.factory = factory;

                if (errback) {
                    //Register for errors on this module.
                    this.on('error', errback);
                } else if (this.events.error) {
                    //If no errback already, but there are error listeners
                    //on this module, set up an errback to pass to the deps.
                    errback = bind(this, function (err) {
                        this.emit('error', err);
                    });
                }

                //Do a copy of the dependency array, so that
                //source inputs are not modified. For example
                //"shim" deps are passed in here directly, and
                //doing a direct modification of the depMaps array
                //would affect that config.
                this.depMaps = depMaps && depMaps.slice(0);

                this.errback = errback;

                //Indicate this module has be initialized
                this.inited = true;

                this.ignore = options.ignore;

                //Could have option to init this module in enabled mode,
                //or could have been previously marked as enabled. However,
                //the dependencies are not known until init is called. So
                //if enabled previously, now trigger dependencies as enabled.
                if (options.enabled || this.enabled) {
                    //Enable this module and dependencies.
                    //Will call this.check()
                    this.enable();
                } else {
                    this.check();
                }
            },

            defineDep: function (i, depExports) {
                //Because of cycles, defined callback for a given
                //export can be called more than once.
                if (!this.depMatched[i]) {
                    this.depMatched[i] = true;
                    this.depCount -= 1;
                    this.depExports[i] = depExports;
                }
            },

            fetch: function () {
                if (this.fetched) {
                    return;
                }
                this.fetched = true;

                context.startTime = (new Date()).getTime();

                var map = this.map;

                //If the manager is for a plugin managed resource,
                //ask the plugin to load it now.
                if (this.shim) {
                    context.makeRequire(this.map, {
                        enableBuildCallback: true
                    })(this.shim.deps || [], bind(this, function () {
                        return map.prefix ? this.callPlugin() : this.load();
                    }));
                } else {
                    //Regular dependency.
                    return map.prefix ? this.callPlugin() : this.load();
                }
            },

            load: function () {
                var url = this.map.url;

                //Regular dependency.
                if (!urlFetched[url]) {
                    urlFetched[url] = true;
                    context.load(this.map.id, url);
                }
            },

            /**
             * Checks if the module is ready to define itself, and if so,
             * define it.
             */
            check: function () {
                if (!this.enabled || this.enabling) {
                    return;
                }

                var err, cjsModule,
                    id = this.map.id,
                    depExports = this.depExports,
                    exports = this.exports,
                    factory = this.factory;

                if (!this.inited) {
                    // Only fetch if not already in the defQueue.
                    if (!hasProp(context.defQueueMap, id)) {
                        this.fetch();
                    }
                } else if (this.error) {
                    this.emit('error', this.error);
                } else if (!this.defining) {
                    //The factory could trigger another require call
                    //that would result in checking this module to
                    //define itself again. If already in the process
                    //of doing that, skip this work.
                    this.defining = true;

                    if (this.depCount < 1 && !this.defined) {
                        if (isFunction(factory)) {
                            //If there is an error listener, favor passing
                            //to that instead of throwing an error. However,
                            //only do it for define()'d  modules. require
                            //errbacks should not be called for failures in
                            //their callbacks (#699). However if a global
                            //onError is set, use that.
                            if ((this.events.error && this.map.isDefine) ||
                                req.onError !== defaultOnError) {
                                try {
                                    exports = context.execCb(id, factory, depExports, exports);
                                } catch (e) {
                                    err = e;
                                }
                            } else {
                                exports = context.execCb(id, factory, depExports, exports);
                            }

                            // Favor return value over exports. If node/cjs in play,
                            // then will not have a return value anyway. Favor
                            // module.exports assignment over exports object.
                            if (this.map.isDefine && exports === undefined) {
                                cjsModule = this.module;
                                if (cjsModule) {
                                    exports = cjsModule.exports;
                                } else if (this.usingExports) {
                                    //exports already set the defined value.
                                    exports = this.exports;
                                }
                            }

                            if (err) {
                                err.requireMap = this.map;
                                err.requireModules = this.map.isDefine ? [this.map.id] : null;
                                err.requireType = this.map.isDefine ? 'define' : 'require';
                                return onError((this.error = err));
                            }

                        } else {
                            //Just a literal value
                            exports = factory;
                        }

                        this.exports = exports;

                        if (this.map.isDefine && !this.ignore) {
                            defined[id] = exports;

                            if (req.onResourceLoad) {
                                var resLoadMaps = [];
                                each(this.depMaps, function (depMap) {
                                    resLoadMaps.push(depMap.normalizedMap || depMap);
                                });
                                req.onResourceLoad(context, this.map, resLoadMaps);
                            }
                        }

                        //Clean up
                        cleanRegistry(id);

                        this.defined = true;
                    }

                    //Finished the define stage. Allow calling check again
                    //to allow define notifications below in the case of a
                    //cycle.
                    this.defining = false;

                    if (this.defined && !this.defineEmitted) {
                        this.defineEmitted = true;
                        this.emit('defined', this.exports);
                        this.defineEmitComplete = true;
                    }

                }
            },

            callPlugin: function () {
                var map = this.map,
                    id = map.id,
                    //Map already normalized the prefix.
                    pluginMap = makeModuleMap(map.prefix);

                //Mark this as a dependency for this plugin, so it
                //can be traced for cycles.
                this.depMaps.push(pluginMap);

                on(pluginMap, 'defined', bind(this, function (plugin) {
                    var load, normalizedMap, normalizedMod,
                        bundleId = getOwn(bundlesMap, this.map.id),
                        name = this.map.name,
                        parentName = this.map.parentMap ? this.map.parentMap.name : null,
                        localRequire = context.makeRequire(map.parentMap, {
                            enableBuildCallback: true
                        });

                    //If current map is not normalized, wait for that
                    //normalized name to load instead of continuing.
                    if (this.map.unnormalized) {
                        //Normalize the ID if the plugin allows it.
                        if (plugin.normalize) {
                            name = plugin.normalize(name, function (name) {
                                return normalize(name, parentName, true);
                            }) || '';
                        }

                        //prefix and name should already be normalized, no need
                        //for applying map config again either.
                        normalizedMap = makeModuleMap(map.prefix + '!' + name,
                                                      this.map.parentMap,
                                                      true);
                        on(normalizedMap,
                            'defined', bind(this, function (value) {
                                this.map.normalizedMap = normalizedMap;
                                this.init([], function () { return value; }, null, {
                                    enabled: true,
                                    ignore: true
                                });
                            }));

                        normalizedMod = getOwn(registry, normalizedMap.id);
                        if (normalizedMod) {
                            //Mark this as a dependency for this plugin, so it
                            //can be traced for cycles.
                            this.depMaps.push(normalizedMap);

                            if (this.events.error) {
                                normalizedMod.on('error', bind(this, function (err) {
                                    this.emit('error', err);
                                }));
                            }
                            normalizedMod.enable();
                        }

                        return;
                    }

                    //If a paths config, then just load that file instead to
                    //resolve the plugin, as it is built into that paths layer.
                    if (bundleId) {
                        this.map.url = context.nameToUrl(bundleId);
                        this.load();
                        return;
                    }

                    load = bind(this, function (value) {
                        this.init([], function () { return value; }, null, {
                            enabled: true
                        });
                    });

                    load.error = bind(this, function (err) {
                        this.inited = true;
                        this.error = err;
                        err.requireModules = [id];

                        //Remove temp unnormalized modules for this module,
                        //since they will never be resolved otherwise now.
                        eachProp(registry, function (mod) {
                            if (mod.map.id.indexOf(id + '_unnormalized') === 0) {
                                cleanRegistry(mod.map.id);
                            }
                        });

                        onError(err);
                    });

                    //Allow plugins to load other code without having to know the
                    //context or how to 'complete' the load.
                    load.fromText = bind(this, function (text, textAlt) {
                        /*jslint evil: true */
                        var moduleName = map.name,
                            moduleMap = makeModuleMap(moduleName),
                            hasInteractive = useInteractive;

                        //As of 2.1.0, support just passing the text, to reinforce
                        //fromText only being called once per resource. Still
                        //support old style of passing moduleName but discard
                        //that moduleName in favor of the internal ref.
                        if (textAlt) {
                            text = textAlt;
                        }

                        //Turn off interactive script matching for IE for any define
                        //calls in the text, then turn it back on at the end.
                        if (hasInteractive) {
                            useInteractive = false;
                        }

                        //Prime the system by creating a module instance for
                        //it.
                        getModule(moduleMap);

                        //Transfer any config to this other module.
                        if (hasProp(config.config, id)) {
                            config.config[moduleName] = config.config[id];
                        }

                        try {
                            req.exec(text);
                        } catch (e) {
                            return onError(makeError('fromtexteval',
                                             'fromText eval for ' + id +
                                            ' failed: ' + e,
                                             e,
                                             [id]));
                        }

                        if (hasInteractive) {
                            useInteractive = true;
                        }

                        //Mark this as a dependency for the plugin
                        //resource
                        this.depMaps.push(moduleMap);

                        //Support anonymous modules.
                        context.completeLoad(moduleName);

                        //Bind the value of that module to the value for this
                        //resource ID.
                        localRequire([moduleName], load);
                    });

                    //Use parentName here since the plugin's name is not reliable,
                    //could be some weird string with no path that actually wants to
                    //reference the parentName's path.
                    plugin.load(map.name, localRequire, load, config);
                }));

                context.enable(pluginMap, this);
                this.pluginMaps[pluginMap.id] = pluginMap;
            },

            enable: function () {
                enabledRegistry[this.map.id] = this;
                this.enabled = true;

                //Set flag mentioning that the module is enabling,
                //so that immediate calls to the defined callbacks
                //for dependencies do not trigger inadvertent load
                //with the depCount still being zero.
                this.enabling = true;

                //Enable each dependency
                each(this.depMaps, bind(this, function (depMap, i) {
                    var id, mod, handler;

                    if (typeof depMap === 'string') {
                        //Dependency needs to be converted to a depMap
                        //and wired up to this module.
                        depMap = makeModuleMap(depMap,
                                               (this.map.isDefine ? this.map : this.map.parentMap),
                                               false,
                                               !this.skipMap);
                        this.depMaps[i] = depMap;

                        handler = getOwn(handlers, depMap.id);

                        if (handler) {
                            this.depExports[i] = handler(this);
                            return;
                        }

                        this.depCount += 1;

                        on(depMap, 'defined', bind(this, function (depExports) {
                            if (this.undefed) {
                                return;
                            }
                            this.defineDep(i, depExports);
                            this.check();
                        }));

                        if (this.errback) {
                            on(depMap, 'error', bind(this, this.errback));
                        } else if (this.events.error) {
                            // No direct errback on this module, but something
                            // else is listening for errors, so be sure to
                            // propagate the error correctly.
                            on(depMap, 'error', bind(this, function(err) {
                                this.emit('error', err);
                            }));
                        }
                    }

                    id = depMap.id;
                    mod = registry[id];

                    //Skip special modules like 'require', 'exports', 'module'
                    //Also, don't call enable if it is already enabled,
                    //important in circular dependency cases.
                    if (!hasProp(handlers, id) && mod && !mod.enabled) {
                        context.enable(depMap, this);
                    }
                }));

                //Enable each plugin that is used in
                //a dependency
                eachProp(this.pluginMaps, bind(this, function (pluginMap) {
                    var mod = getOwn(registry, pluginMap.id);
                    if (mod && !mod.enabled) {
                        context.enable(pluginMap, this);
                    }
                }));

                this.enabling = false;

                this.check();
            },

            on: function (name, cb) {
                var cbs = this.events[name];
                if (!cbs) {
                    cbs = this.events[name] = [];
                }
                cbs.push(cb);
            },

            emit: function (name, evt) {
                each(this.events[name], function (cb) {
                    cb(evt);
                });
                if (name === 'error') {
                    //Now that the error handler was triggered, remove
                    //the listeners, since this broken Module instance
                    //can stay around for a while in the registry.
                    delete this.events[name];
                }
            }
        };

        function callGetModule(args) {
            //Skip modules already defined.
            if (!hasProp(defined, args[0])) {
                getModule(makeModuleMap(args[0], null, true)).init(args[1], args[2]);
            }
        }

        function removeListener(node, func, name, ieName) {
            //Favor detachEvent because of IE9
            //issue, see attachEvent/addEventListener comment elsewhere
            //in this file.
            if (node.detachEvent && !isOpera) {
                //Probably IE. If not it will throw an error, which will be
                //useful to know.
                if (ieName) {
                    node.detachEvent(ieName, func);
                }
            } else {
                node.removeEventListener(name, func, false);
            }
        }

        /**
         * Given an event from a script node, get the requirejs info from it,
         * and then removes the event listeners on the node.
         * @param {Event} evt
         * @returns {Object}
         */
        function getScriptData(evt) {
            //Using currentTarget instead of target for Firefox 2.0's sake. Not
            //all old browsers will be supported, but this one was easy enough
            //to support and still makes sense.
            var node = evt.currentTarget || evt.srcElement;

            //Remove the listeners once here.
            removeListener(node, context.onScriptLoad, 'load', 'onreadystatechange');
            removeListener(node, context.onScriptError, 'error');

            return {
                node: node,
                id: node && node.getAttribute('data-requiremodule')
            };
        }

        function intakeDefines() {
            var args;

            //Any defined modules in the global queue, intake them now.
            takeGlobalQueue();

            //Make sure any remaining defQueue items get properly processed.
            while (defQueue.length) {
                args = defQueue.shift();
                if (args[0] === null) {
                    return onError(makeError('mismatch', 'Mismatched anonymous define() module: ' +
                        args[args.length - 1]));
                } else {
                    //args are id, deps, factory. Should be normalized by the
                    //define() function.
                    callGetModule(args);
                }
            }
            context.defQueueMap = {};
        }

        context = {
            config: config,
            contextName: contextName,
            registry: registry,
            defined: defined,
            urlFetched: urlFetched,
            defQueue: defQueue,
            defQueueMap: {},
            Module: Module,
            makeModuleMap: makeModuleMap,
            nextTick: req.nextTick,
            onError: onError,

            /**
             * Set a configuration for the context.
             * @param {Object} cfg config object to integrate.
             */
            configure: function (cfg) {
                //Make sure the baseUrl ends in a slash.
                if (cfg.baseUrl) {
                    if (cfg.baseUrl.charAt(cfg.baseUrl.length - 1) !== '/') {
                        cfg.baseUrl += '/';
                    }
                }

                // Convert old style urlArgs string to a function.
                if (typeof cfg.urlArgs === 'string') {
                    var urlArgs = cfg.urlArgs;
                    cfg.urlArgs = function(id, url) {
                        return (url.indexOf('?') === -1 ? '?' : '&') + urlArgs;
                    };
                }

                //Save off the paths since they require special processing,
                //they are additive.
                var shim = config.shim,
                    objs = {
                        paths: true,
                        bundles: true,
                        config: true,
                        map: true
                    };

                eachProp(cfg, function (value, prop) {
                    if (objs[prop]) {
                        if (!config[prop]) {
                            config[prop] = {};
                        }
                        mixin(config[prop], value, true, true);
                    } else {
                        config[prop] = value;
                    }
                });

                //Reverse map the bundles
                if (cfg.bundles) {
                    eachProp(cfg.bundles, function (value, prop) {
                        each(value, function (v) {
                            if (v !== prop) {
                                bundlesMap[v] = prop;
                            }
                        });
                    });
                }

                //Merge shim
                if (cfg.shim) {
                    eachProp(cfg.shim, function (value, id) {
                        //Normalize the structure
                        if (isArray(value)) {
                            value = {
                                deps: value
                            };
                        }
                        if ((value.exports || value.init) && !value.exportsFn) {
                            value.exportsFn = context.makeShimExports(value);
                        }
                        shim[id] = value;
                    });
                    config.shim = shim;
                }

                //Adjust packages if necessary.
                if (cfg.packages) {
                    each(cfg.packages, function (pkgObj) {
                        var location, name;

                        pkgObj = typeof pkgObj === 'string' ? {name: pkgObj} : pkgObj;

                        name = pkgObj.name;
                        location = pkgObj.location;
                        if (location) {
                            config.paths[name] = pkgObj.location;
                        }

                        //Save pointer to main module ID for pkg name.
                        //Remove leading dot in main, so main paths are normalized,
                        //and remove any trailing .js, since different package
                        //envs have different conventions: some use a module name,
                        //some use a file name.
                        config.pkgs[name] = pkgObj.name + '/' + (pkgObj.main || 'main')
                                     .replace(currDirRegExp, '')
                                     .replace(jsSuffixRegExp, '');
                    });
                }

                //If there are any "waiting to execute" modules in the registry,
                //update the maps for them, since their info, like URLs to load,
                //may have changed.
                eachProp(registry, function (mod, id) {
                    //If module already has init called, since it is too
                    //late to modify them, and ignore unnormalized ones
                    //since they are transient.
                    if (!mod.inited && !mod.map.unnormalized) {
                        mod.map = makeModuleMap(id, null, true);
                    }
                });

                //If a deps array or a config callback is specified, then call
                //require with those args. This is useful when require is defined as a
                //config object before require.js is loaded.
                if (cfg.deps || cfg.callback) {
                    context.require(cfg.deps || [], cfg.callback);
                }
            },

            makeShimExports: function (value) {
                function fn() {
                    var ret;
                    if (value.init) {
                        ret = value.init.apply(global, arguments);
                    }
                    return ret || (value.exports && getGlobal(value.exports));
                }
                return fn;
            },

            makeRequire: function (relMap, options) {
                options = options || {};

                function localRequire(deps, callback, errback) {
                    var id, map, requireMod;

                    if (options.enableBuildCallback && callback && isFunction(callback)) {
                        callback.__requireJsBuild = true;
                    }

                    if (typeof deps === 'string') {
                        if (isFunction(callback)) {
                            //Invalid call
                            return onError(makeError('requireargs', 'Invalid require call'), errback);
                        }

                        //If require|exports|module are requested, get the
                        //value for them from the special handlers. Caveat:
                        //this only works while module is being defined.
                        if (relMap && hasProp(handlers, deps)) {
                            return handlers[deps](registry[relMap.id]);
                        }

                        //Synchronous access to one module. If require.get is
                        //available (as in the Node adapter), prefer that.
                        if (req.get) {
                            return req.get(context, deps, relMap, localRequire);
                        }

                        //Normalize module name, if it contains . or ..
                        map = makeModuleMap(deps, relMap, false, true);
                        id = map.id;

                        if (!hasProp(defined, id)) {
                            return onError(makeError('notloaded', 'Module name "' +
                                        id +
                                        '" has not been loaded yet for context: ' +
                                        contextName +
                                        (relMap ? '' : '. Use require([])')));
                        }
                        return defined[id];
                    }

                    //Grab defines waiting in the global queue.
                    intakeDefines();

                    //Mark all the dependencies as needing to be loaded.
                    context.nextTick(function () {
                        //Some defines could have been added since the
                        //require call, collect them.
                        intakeDefines();

                        requireMod = getModule(makeModuleMap(null, relMap));

                        //Store if map config should be applied to this require
                        //call for dependencies.
                        requireMod.skipMap = options.skipMap;

                        requireMod.init(deps, callback, errback, {
                            enabled: true
                        });

                        checkLoaded();
                    });

                    return localRequire;
                }

                mixin(localRequire, {
                    isBrowser: isBrowser,

                    /**
                     * Converts a module name + .extension into an URL path.
                     * *Requires* the use of a module name. It does not support using
                     * plain URLs like nameToUrl.
                     */
                    toUrl: function (moduleNamePlusExt) {
                        var ext,
                            index = moduleNamePlusExt.lastIndexOf('.'),
                            segment = moduleNamePlusExt.split('/')[0],
                            isRelative = segment === '.' || segment === '..';

                        //Have a file extension alias, and it is not the
                        //dots from a relative path.
                        if (index !== -1 && (!isRelative || index > 1)) {
                            ext = moduleNamePlusExt.substring(index, moduleNamePlusExt.length);
                            moduleNamePlusExt = moduleNamePlusExt.substring(0, index);
                        }

                        return context.nameToUrl(normalize(moduleNamePlusExt,
                                                relMap && relMap.id, true), ext,  true);
                    },

                    defined: function (id) {
                        return hasProp(defined, makeModuleMap(id, relMap, false, true).id);
                    },

                    specified: function (id) {
                        id = makeModuleMap(id, relMap, false, true).id;
                        return hasProp(defined, id) || hasProp(registry, id);
                    }
                });

                //Only allow undef on top level require calls
                if (!relMap) {
                    localRequire.undef = function (id) {
                        //Bind any waiting define() calls to this context,
                        //fix for #408
                        takeGlobalQueue();

                        var map = makeModuleMap(id, relMap, true),
                            mod = getOwn(registry, id);

                        mod.undefed = true;
                        removeScript(id);

                        delete defined[id];
                        delete urlFetched[map.url];
                        delete undefEvents[id];

                        //Clean queued defines too. Go backwards
                        //in array so that the splices do not
                        //mess up the iteration.
                        eachReverse(defQueue, function(args, i) {
                            if (args[0] === id) {
                                defQueue.splice(i, 1);
                            }
                        });
                        delete context.defQueueMap[id];

                        if (mod) {
                            //Hold on to listeners in case the
                            //module will be attempted to be reloaded
                            //using a different config.
                            if (mod.events.defined) {
                                undefEvents[id] = mod.events;
                            }

                            cleanRegistry(id);
                        }
                    };
                }

                return localRequire;
            },

            /**
             * Called to enable a module if it is still in the registry
             * awaiting enablement. A second arg, parent, the parent module,
             * is passed in for context, when this method is overridden by
             * the optimizer. Not shown here to keep code compact.
             */
            enable: function (depMap) {
                var mod = getOwn(registry, depMap.id);
                if (mod) {
                    getModule(depMap).enable();
                }
            },

            /**
             * Internal method used by environment adapters to complete a load event.
             * A load event could be a script load or just a load pass from a synchronous
             * load call.
             * @param {String} moduleName the name of the module to potentially complete.
             */
            completeLoad: function (moduleName) {
                var found, args, mod,
                    shim = getOwn(config.shim, moduleName) || {},
                    shExports = shim.exports;

                takeGlobalQueue();

                while (defQueue.length) {
                    args = defQueue.shift();
                    if (args[0] === null) {
                        args[0] = moduleName;
                        //If already found an anonymous module and bound it
                        //to this name, then this is some other anon module
                        //waiting for its completeLoad to fire.
                        if (found) {
                            break;
                        }
                        found = true;
                    } else if (args[0] === moduleName) {
                        //Found matching define call for this script!
                        found = true;
                    }

                    callGetModule(args);
                }
                context.defQueueMap = {};

                //Do this after the cycle of callGetModule in case the result
                //of those calls/init calls changes the registry.
                mod = getOwn(registry, moduleName);

                if (!found && !hasProp(defined, moduleName) && mod && !mod.inited) {
                    if (config.enforceDefine && (!shExports || !getGlobal(shExports))) {
                        if (hasPathFallback(moduleName)) {
                            return;
                        } else {
                            return onError(makeError('nodefine',
                                             'No define call for ' + moduleName,
                                             null,
                                             [moduleName]));
                        }
                    } else {
                        //A script that does not call define(), so just simulate
                        //the call for it.
                        callGetModule([moduleName, (shim.deps || []), shim.exportsFn]);
                    }
                }

                checkLoaded();
            },

            /**
             * Converts a module name to a file path. Supports cases where
             * moduleName may actually be just an URL.
             * Note that it **does not** call normalize on the moduleName,
             * it is assumed to have already been normalized. This is an
             * internal API, not a public one. Use toUrl for the public API.
             */
            nameToUrl: function (moduleName, ext, skipExt) {
                var paths, syms, i, parentModule, url,
                    parentPath, bundleId,
                    pkgMain = getOwn(config.pkgs, moduleName);

                if (pkgMain) {
                    moduleName = pkgMain;
                }

                bundleId = getOwn(bundlesMap, moduleName);

                if (bundleId) {
                    return context.nameToUrl(bundleId, ext, skipExt);
                }

                //If a colon is in the URL, it indicates a protocol is used and it is just
                //an URL to a file, or if it starts with a slash, contains a query arg (i.e. ?)
                //or ends with .js, then assume the user meant to use an url and not a module id.
                //The slash is important for protocol-less URLs as well as full paths.
                if (req.jsExtRegExp.test(moduleName)) {
                    //Just a plain path, not module name lookup, so just return it.
                    //Add extension if it is included. This is a bit wonky, only non-.js things pass
                    //an extension, this method probably needs to be reworked.
                    url = moduleName + (ext || '');
                } else {
                    //A module that needs to be converted to a path.
                    paths = config.paths;

                    syms = moduleName.split('/');
                    //For each module name segment, see if there is a path
                    //registered for it. Start with most specific name
                    //and work up from it.
                    for (i = syms.length; i > 0; i -= 1) {
                        parentModule = syms.slice(0, i).join('/');

                        parentPath = getOwn(paths, parentModule);
                        if (parentPath) {
                            //If an array, it means there are a few choices,
                            //Choose the one that is desired
                            if (isArray(parentPath)) {
                                parentPath = parentPath[0];
                            }
                            syms.splice(0, i, parentPath);
                            break;
                        }
                    }

                    //Join the path parts together, then figure out if baseUrl is needed.
                    url = syms.join('/');
                    url += (ext || (/^data\:|^blob\:|\?/.test(url) || skipExt ? '' : '.js'));
                    url = (url.charAt(0) === '/' || url.match(/^[\w\+\.\-]+:/) ? '' : config.baseUrl) + url;
                }

                return config.urlArgs && !/^blob\:/.test(url) ?
                       url + config.urlArgs(moduleName, url) : url;
            },

            //Delegates to req.load. Broken out as a separate function to
            //allow overriding in the optimizer.
            load: function (id, url) {
                req.load(context, id, url);
            },

            /**
             * Executes a module callback function. Broken out as a separate function
             * solely to allow the build system to sequence the files in the built
             * layer in the right sequence.
             *
             * @private
             */
            execCb: function (name, callback, args, exports) {
                return callback.apply(exports, args);
            },

            /**
             * callback for script loads, used to check status of loading.
             *
             * @param {Event} evt the event from the browser for the script
             * that was loaded.
             */
            onScriptLoad: function (evt) {
                //Using currentTarget instead of target for Firefox 2.0's sake. Not
                //all old browsers will be supported, but this one was easy enough
                //to support and still makes sense.
                if (evt.type === 'load' ||
                        (readyRegExp.test((evt.currentTarget || evt.srcElement).readyState))) {
                    //Reset interactive script so a script node is not held onto for
                    //to long.
                    interactiveScript = null;

                    //Pull out the name of the module and the context.
                    var data = getScriptData(evt);
                    context.completeLoad(data.id);
                }
            },

            /**
             * Callback for script errors.
             */
            onScriptError: function (evt) {
                var data = getScriptData(evt);
                if (!hasPathFallback(data.id)) {
                    var parents = [];
                    eachProp(registry, function(value, key) {
                        if (key.indexOf('_@r') !== 0) {
                            each(value.depMaps, function(depMap) {
                                if (depMap.id === data.id) {
                                    parents.push(key);
                                    return true;
                                }
                            });
                        }
                    });
                    return onError(makeError('scripterror', 'Script error for "' + data.id +
                                             (parents.length ?
                                             '", needed by: ' + parents.join(', ') :
                                             '"'), evt, [data.id]));
                }
            }
        };

        context.require = context.makeRequire();
        return context;
    }

    /**
     * Main entry point.
     *
     * If the only argument to require is a string, then the module that
     * is represented by that string is fetched for the appropriate context.
     *
     * If the first argument is an array, then it will be treated as an array
     * of dependency string names to fetch. An optional function callback can
     * be specified to execute when all of those dependencies are available.
     *
     * Make a local req variable to help Caja compliance (it assumes things
     * on a require that are not standardized), and to give a short
     * name for minification/local scope use.
     */
    req = requirejs = function (deps, callback, errback, optional) {

        //Find the right context, use default
        var context, config,
            contextName = defContextName;

        // Determine if have config object in the call.
        if (!isArray(deps) && typeof deps !== 'string') {
            // deps is a config object
            config = deps;
            if (isArray(callback)) {
                // Adjust args if there are dependencies
                deps = callback;
                callback = errback;
                errback = optional;
            } else {
                deps = [];
            }
        }

        if (config && config.context) {
            contextName = config.context;
        }

        context = getOwn(contexts, contextName);
        if (!context) {
            context = contexts[contextName] = req.s.newContext(contextName);
        }

        if (config) {
            context.configure(config);
        }

        return context.require(deps, callback, errback);
    };

    /**
     * Support require.config() to make it easier to cooperate with other
     * AMD loaders on globally agreed names.
     */
    req.config = function (config) {
        return req(config);
    };

    /**
     * Execute something after the current tick
     * of the event loop. Override for other envs
     * that have a better solution than setTimeout.
     * @param  {Function} fn function to execute later.
     */
    req.nextTick = typeof setTimeout !== 'undefined' ? function (fn) {
        setTimeout(fn, 4);
    } : function (fn) { fn(); };

    /**
     * Export require as a global, but only if it does not already exist.
     */
    if (!require) {
        require = req;
    }

    req.version = version;

    //Used to filter out dependencies that are already paths.
    req.jsExtRegExp = /^\/|:|\?|\.js$/;
    req.isBrowser = isBrowser;
    s = req.s = {
        contexts: contexts,
        newContext: newContext
    };

    //Create default context.
    req({});

    //Exports some context-sensitive methods on global require.
    each([
        'toUrl',
        'undef',
        'defined',
        'specified'
    ], function (prop) {
        //Reference from contexts instead of early binding to default context,
        //so that during builds, the latest instance of the default context
        //with its config gets used.
        req[prop] = function () {
            var ctx = contexts[defContextName];
            return ctx.require[prop].apply(ctx, arguments);
        };
    });

    if (isBrowser) {
        head = s.head = document.getElementsByTagName('head')[0];
        //If BASE tag is in play, using appendChild is a problem for IE6.
        //When that browser dies, this can be removed. Details in this jQuery bug:
        //http://dev.jquery.com/ticket/2709
        baseElement = document.getElementsByTagName('base')[0];
        if (baseElement) {
            head = s.head = baseElement.parentNode;
        }
    }

    /**
     * Any errors that require explicitly generates will be passed to this
     * function. Intercept/override it if you want custom error handling.
     * @param {Error} err the error object.
     */
    req.onError = defaultOnError;

    /**
     * Creates the node for the load command. Only used in browser envs.
     */
    req.createNode = function (config, moduleName, url) {
        var node = config.xhtml ?
                document.createElementNS('http://www.w3.org/1999/xhtml', 'html:script') :
                document.createElement('script');
        node.type = config.scriptType || 'text/javascript';
        node.charset = 'utf-8';
        node.async = true;
        return node;
    };

    /**
     * Does the request to load a module for the browser case.
     * Make this a separate function to allow other environments
     * to override it.
     *
     * @param {Object} context the require context to find state.
     * @param {String} moduleName the name of the module.
     * @param {Object} url the URL to the module.
     */
    req.load = function (context, moduleName, url) {
        var config = (context && context.config) || {},
            node;
        if (isBrowser) {
            //In the browser so use a script tag
            node = req.createNode(config, moduleName, url);

            node.setAttribute('data-requirecontext', context.contextName);
            node.setAttribute('data-requiremodule', moduleName);

            //Set up load listener. Test attachEvent first because IE9 has
            //a subtle issue in its addEventListener and script onload firings
            //that do not match the behavior of all other browsers with
            //addEventListener support, which fire the onload event for a
            //script right after the script execution. See:
            //https://connect.microsoft.com/IE/feedback/details/648057/script-onload-event-is-not-fired-immediately-after-script-execution
            //UNFORTUNATELY Opera implements attachEvent but does not follow the script
            //script execution mode.
            if (node.attachEvent &&
                    //Check if node.attachEvent is artificially added by custom script or
                    //natively supported by browser
                    //read https://github.com/requirejs/requirejs/issues/187
                    //if we can NOT find [native code] then it must NOT natively supported.
                    //in IE8, node.attachEvent does not have toString()
                    //Note the test for "[native code" with no closing brace, see:
                    //https://github.com/requirejs/requirejs/issues/273
                    !(node.attachEvent.toString && node.attachEvent.toString().indexOf('[native code') < 0) &&
                    !isOpera) {
                //Probably IE. IE (at least 6-8) do not fire
                //script onload right after executing the script, so
                //we cannot tie the anonymous define call to a name.
                //However, IE reports the script as being in 'interactive'
                //readyState at the time of the define call.
                useInteractive = true;

                node.attachEvent('onreadystatechange', context.onScriptLoad);
                //It would be great to add an error handler here to catch
                //404s in IE9+. However, onreadystatechange will fire before
                //the error handler, so that does not help. If addEventListener
                //is used, then IE will fire error before load, but we cannot
                //use that pathway given the connect.microsoft.com issue
                //mentioned above about not doing the 'script execute,
                //then fire the script load event listener before execute
                //next script' that other browsers do.
                //Best hope: IE10 fixes the issues,
                //and then destroys all installs of IE 6-9.
                //node.attachEvent('onerror', context.onScriptError);
            } else {
                node.addEventListener('load', context.onScriptLoad, false);
                node.addEventListener('error', context.onScriptError, false);
            }
            node.src = url;

            //Calling onNodeCreated after all properties on the node have been
            //set, but before it is placed in the DOM.
            if (config.onNodeCreated) {
                config.onNodeCreated(node, config, moduleName, url);
            }

            //For some cache cases in IE 6-8, the script executes before the end
            //of the appendChild execution, so to tie an anonymous define
            //call to the module name (which is stored on the node), hold on
            //to a reference to this node, but clear after the DOM insertion.
            currentlyAddingScript = node;
            if (baseElement) {
                head.insertBefore(node, baseElement);
            } else {
                head.appendChild(node);
            }
            currentlyAddingScript = null;

            return node;
        } else if (isWebWorker) {
            try {
                //In a web worker, use importScripts. This is not a very
                //efficient use of importScripts, importScripts will block until
                //its script is downloaded and evaluated. However, if web workers
                //are in play, the expectation is that a build has been done so
                //that only one script needs to be loaded anyway. This may need
                //to be reevaluated if other use cases become common.

                // Post a task to the event loop to work around a bug in WebKit
                // where the worker gets garbage-collected after calling
                // importScripts(): https://webkit.org/b/153317
                setTimeout(function() {}, 0);
                importScripts(url);

                //Account for anonymous modules
                context.completeLoad(moduleName);
            } catch (e) {
                context.onError(makeError('importscripts',
                                'importScripts failed for ' +
                                    moduleName + ' at ' + url,
                                e,
                                [moduleName]));
            }
        }
    };

    function getInteractiveScript() {
        if (interactiveScript && interactiveScript.readyState === 'interactive') {
            return interactiveScript;
        }

        eachReverse(scripts(), function (script) {
            if (script.readyState === 'interactive') {
                return (interactiveScript = script);
            }
        });
        return interactiveScript;
    }

    //Look for a data-main script attribute, which could also adjust the baseUrl.
    if (isBrowser && !cfg.skipDataMain) {
        //Figure out baseUrl. Get it from the script tag with require.js in it.
        eachReverse(scripts(), function (script) {
            //Set the 'head' where we can append children by
            //using the script's parent.
            if (!head) {
                head = script.parentNode;
            }

            //Look for a data-main attribute to set main script for the page
            //to load. If it is there, the path to data main becomes the
            //baseUrl, if it is not already set.
            dataMain = script.getAttribute('data-main');
            if (dataMain) {
                //Preserve dataMain in case it is a path (i.e. contains '?')
                mainScript = dataMain;

                //Set final baseUrl if there is not already an explicit one,
                //but only do so if the data-main value is not a loader plugin
                //module ID.
                if (!cfg.baseUrl && mainScript.indexOf('!') === -1) {
                    //Pull off the directory of data-main for use as the
                    //baseUrl.
                    src = mainScript.split('/');
                    mainScript = src.pop();
                    subPath = src.length ? src.join('/')  + '/' : './';

                    cfg.baseUrl = subPath;
                }

                //Strip off any trailing .js since mainScript is now
                //like a module name.
                mainScript = mainScript.replace(jsSuffixRegExp, '');

                //If mainScript is still a path, fall back to dataMain
                if (req.jsExtRegExp.test(mainScript)) {
                    mainScript = dataMain;
                }

                //Put the data-main script in the files to load.
                cfg.deps = cfg.deps ? cfg.deps.concat(mainScript) : [mainScript];

                return true;
            }
        });
    }

    /**
     * The function that handles definitions of modules. Differs from
     * require() in that a string for the module should be the first argument,
     * and the function to execute after dependencies are loaded should
     * return a value to define the module corresponding to the first argument's
     * name.
     */
    define = function (name, deps, callback) {
        var node, context;

        //Allow for anonymous modules
        if (typeof name !== 'string') {
            //Adjust args appropriately
            callback = deps;
            deps = name;
            name = null;
        }

        //This module may not have dependencies
        if (!isArray(deps)) {
            callback = deps;
            deps = null;
        }

        //If no name, and callback is a function, then figure out if it a
        //CommonJS thing with dependencies.
        if (!deps && isFunction(callback)) {
            deps = [];
            //Remove comments from the callback string,
            //look for require calls, and pull them into the dependencies,
            //but only if there are function args.
            if (callback.length) {
                callback
                    .toString()
                    .replace(commentRegExp, commentReplace)
                    .replace(cjsRequireRegExp, function (match, dep) {
                        deps.push(dep);
                    });

                //May be a CommonJS thing even without require calls, but still
                //could use exports, and module. Avoid doing exports and module
                //work though if it just needs require.
                //REQUIRES the function to expect the CommonJS variables in the
                //order listed below.
                deps = (callback.length === 1 ? ['require'] : ['require', 'exports', 'module']).concat(deps);
            }
        }

        //If in IE 6-8 and hit an anonymous define() call, do the interactive
        //work.
        if (useInteractive) {
            node = currentlyAddingScript || getInteractiveScript();
            if (node) {
                if (!name) {
                    name = node.getAttribute('data-requiremodule');
                }
                context = contexts[node.getAttribute('data-requirecontext')];
            }
        }

        //Always save off evaluating the def call until the script onload handler.
        //This allows multiple modules to be in a file without prematurely
        //tracing dependencies, and allows for anonymous module support,
        //where the module name is not known until the script onload event
        //occurs. If no context, use the global queue, and get it processed
        //in the onscript load callback.
        if (context) {
            context.defQueue.push([name, deps, callback]);
            context.defQueueMap[name] = true;
        } else {
            globalDefQueue.push([name, deps, callback]);
        }
    };

    define.amd = {
        jQuery: true
    };

    /**
     * Executes the text. Normally just uses eval, but can be modified
     * to use a better, environment-specific call. Only used for transpiling
     * loader plugins, not for plain JS modules.
     * @param {String} text the text to execute/evaluate.
     */
    req.exec = function (text) {
        /*jslint evil: true */
        return eval(text);
    };

    //Set up with config info.
    req(cfg);
}(this, (typeof setTimeout === 'undefined' ? undefined : setTimeout)));  // ------------------------------------------------------------------------------------

  this.require = require;
  this.define = define;

}).apply(eon.amd);
    
    // MODE: INTERPRETER
// - client (browser)
// - server (node)
//
// MODE: COMMAND	(node)


var vimlet = vimlet || {};

vimlet.meta = vimlet.meta || {};

// Hooks for sanbox functions
// vimlet.meta.sandbox

(function () {
  // Node require
  var require_fs;
  var require_vm;

  // Engine [browser, node]
  vimlet.meta.engine = vimlet.meta.engine || "browser";

  // Tags Array [tagOpen, tagClose, tagEcho]
  vimlet.meta.tags = vimlet.meta.tags || ["", "="];

  //Line break replacement
  vimlet.meta.lineBreak = vimlet.meta.lineBreak || null;

  // Decode html
  vimlet.meta.decodeHTML = "decodeHTML" in vimlet.meta? vimlet.meta.decodeHTML : true;
  vimlet.meta.__decodeEntityRegex = /&(?:#x[a-f0-9]+|#[0-9]+|[a-z0-9]+);?/ig;

  vimlet.meta.parse = function (scope, text, data, callback) {

    if (vimlet.meta.decodeHTML) {
      text = vimlet.meta.__decodeHTMLEntities(text);
    }

    vimlet.meta.__setTags();
    var __sandbox = vimlet.meta.__createSandbox(scope);
    __sandbox.data = data || {};
    var result = __sandbox.__parse(text);
    vimlet.meta.__destroySandbox(__sandbox);
    callback(result);
  };

  vimlet.meta.parseTemplate = function (scope, template, data, callback) {
    vimlet.meta.__setTags();
    var __sandbox = vimlet.meta.__createSandbox(scope);
    __sandbox.data = data || {};
    var result = __sandbox.__parseTemplate(template);
    vimlet.meta.__destroySandbox(__sandbox);
    callback(result);
  };

  // Decode html entities
  vimlet.meta.__decodeHTMLEntities = function (str) {

    if (vimlet.meta.engine === "browser") {

      if (!vimlet.meta.__decodeElement) {
        vimlet.meta.__decodeElement = document.createElement("div");
      }

      if (str && typeof str === "string") {

        // find and replace all the html entities
        str = str.replace(vimlet.meta.__decodeEntityRegex, function (match) {
          vimlet.meta.__decodeElement.innerHTML = match;
          return vimlet.meta.__decodeElement.textContent;
        });

        // reset the value
        vimlet.meta.__decodeElement.textContent = "";

      }

    }

    return str;

  }

  // Initialize tags
  vimlet.meta.__setTags = function () {
    // Tags
    vimlet.meta.__tagOpen = vimlet.meta.tags[0];
    vimlet.meta.__tagClose = vimlet.meta.tags[1];
    vimlet.meta.__tagEcho = vimlet.meta.tags[2];

    // Regex
    vimlet.meta.__regex = new RegExp(
      vimlet.meta.__escapeRegExp(vimlet.meta.__tagOpen) +
      "(?:(?!" +
      vimlet.meta.__escapeRegExp(vimlet.meta.__tagOpen) +
      ")[\\s\\S])*" +
      vimlet.meta.__escapeRegExp(vimlet.meta.__tagClose) +
      "(\\r\\n|\\r|\\n){0,1}",
      "g"
    );
  };

  // Escape special characters from tags
  vimlet.meta.__escapeRegExp = function (str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
  };

  // Sanitize given string.
  vimlet.meta.sanitize = function (s) {
    s = s.replace(vimlet.meta.__tagOpen, "");
    s = s.replace(vimlet.meta.__tagClose, "");
    return s;
  };

  vimlet.meta.__getFile = function (path, callback) {
    if (vimlet.meta.engine == "node") {
      // node command
      if (!require_fs) {
        require_fs = require("fs");
      }

      if (callback) {
        // Must be asynchronous
        require_fs.readFile(path, "utf8", function (error, buf) {
          if (error) {
            console.log(error);
          } else {
            callback(buf.toString());
          }
        });
      } else {
        // Must be synchronous
        return require_fs.readFileSync(path, "utf8").toString();
      }
    } else {
      // TODO replace XMLHttpRequest by window.fetch with synchronous support
      // Browser
      var xhttp = new XMLHttpRequest();

      xhttp.onreadystatechange = function () {
        if (this.readyState === 4) {
          if (this.status === 200) {
            if (callback) {
              // Must be asynchronous
              callback(xhttp.responseText);
            }
          } else {
            console.log("File error: " + this.status);
          }
        }
      };

      if (callback) {
        // Must be asynchronous
        xhttp.open("GET", path, true);
        xhttp.send();
      } else {
        // Must be synchronous
        xhttp.open("GET", path, false);
        xhttp.send();
        return xhttp.responseText;
      }
    }
  };

  vimlet.meta.__createSandbox = function (scope) {
    var sandbox = eval.call(null, "this");

    if (vimlet.meta.engine == "node") {
      if (!require_vm) {
        require_vm = require("vm");
      }

      // Clone node global scope to baseContext
      var baseContext = Object.assign({}, sandbox);

      // Add other node global modules to baseContext

      // exports
      // require
      // module
      // __filename
      // __dirname

      baseContext.exports = exports;
      baseContext.require = require;
      baseContext.module = module;
      baseContext.__filename = __filename;
      baseContext.__dirname = __dirname;

      sandbox = new require_vm.createContext(baseContext);
    } else {
      // Browser sandbox
      iframe = document.createElement("iframe");
      iframe.style.display = "none";
      iframe.setAttribute(
        "sandbox",
        "allow-same-origin allow-scripts allow-popups allow-forms allow-modals"
      );
      document.body.appendChild(iframe);
      sandbox = iframe.contentWindow;
    }

    // Inject scope
    if (scope) {
      sandbox.context = scope;
    }

    // Inject sandbox functions
    vimlet.meta.__injectSandboxFunctions(sandbox);

    return sandbox;
  };

  vimlet.meta.__destroySandbox = function (sandbox) {
    if (vimlet.meta.engine == "browser") {
      var iframe = sandbox.frameElement;
      iframe.parentNode.removeChild(iframe);
    }

    sandbox = null;
  };

  vimlet.meta.__injectSandboxFunctions = function (sandbox) {
    sandbox.__output = "";

    sandbox.__basePath = "";

    sandbox.echo = function (s) {
      sandbox.__output += s;
    };

    sandbox.template = function (t) {
      var __fullPath = sandbox.__basePath + "/" + t;
      var storedOutput = sandbox.__output;
      var parsedTemplate = sandbox.__parseTemplate(__fullPath);
      sandbox.__output = storedOutput + parsedTemplate;
    };

    sandbox.include = function (t) {
      var __fullPath = sandbox.__basePath + "/" + t;
      var parsedTemplate = sandbox.__includeTemplate(__fullPath);
    };

    sandbox.__eval = function (s, basepath) {
      sandbox.__output = "";
      sandbox.__basePath = basepath;

      if (vimlet.meta.engine == "node") {
        var script = new require_vm.Script(s);
        script.runInContext(sandbox);
      } else {
        sandbox.eval.call(null, s);
      }

      return sandbox.__output;
    };

    sandbox.__parse = function (t, templatePath) {
      var result = "";

      if (!templatePath) {
        templatePath = "";
      }

      // Eval matches
      var endOfLine = "";

      // Replace template with evalMatches
      result = t.replace(vimlet.meta.__regex, function (match) {
        endOfLine = vimlet.meta.__preserveNewLineIfNeeded(match);
        match = vimlet.meta.__cleanMatch(match);
        return sandbox.__eval(match, vimlet.meta.__getBasePath(templatePath)) + endOfLine;
      });

      //Replace line break.
      if (vimlet.meta.lineBreak) {
        result = result.replace(
          new RegExp("[\\r\\n|\\r|\\n]+", "g"),
          vimlet.meta.lineBreak
        );
      }

      return result;
    };

    sandbox.__parseTemplate = function (templatePath) {
      // Get file must be synchronous
      var tContent = vimlet.meta.__getFile(templatePath);
      // Call template parser
      return sandbox.__parse(tContent, templatePath);
    };

    sandbox.__includeTemplate = function (templatePath) {
      // Get file must be synchronous
      var tContent = vimlet.meta.__getFile(templatePath);
      // Call template parser with wrapped in tags since its code that must run inside sandboxed scope
      return sandbox.__parse(vimlet.meta.tags[0] + " " + tContent + " " + vimlet.meta.tags[1], templatePath);
    };

    // Inject custom properties so they are available to the sandbox
    if (vimlet.meta.sandbox) {
      var customSandboxKeys = Object.keys(vimlet.meta.sandbox);
      var key;
      var value;
      for (var i = 0; i < customSandboxKeys.length; i++) {
        key = customSandboxKeys[i];
        value = vimlet.meta.sandbox[key];
        if (typeof value === "function") {
          // Inject sandbox scope if its a function
          sandbox[key] = function () {
            value.apply(sandbox, arguments);
          };
        } else {
          // Inject directly for any other property
          sandbox[key] = value;
        }
      }
    }

  };

  vimlet.meta.__getBasePath = function (f) {
    // Replace Windows separators
    var standarPath = f.replace(/\\/g, "/");
    var path = standarPath.split("/");

    var base = "";

    if (standarPath.indexOf("/") > -1) {
      // Remove last part of the path
      for (var i = 0; i < path.length - 1; i++) {
        base += "/" + path[i];
      }

      // Remove first /
      base = base.substring(1, base.length);
    }

    return base;
  };

  vimlet.meta.__cleanMatch = function (match) {
    // Remove new line
    match = match.trim();

    // Remove tags
    match = match
      .substring(
        vimlet.meta.__tagOpen.length,
        match.length - vimlet.meta.__tagClose.length
      )
      .trim();

    // Echo shortcut if starts with echo tag
    if (match.indexOf(vimlet.meta.__tagEcho, 0) === 0) {
      match = "echo(" + match.substring(vimlet.meta.__tagEcho.length, match.length).trim() + ");";
    }

    // Allow the creation of custom shortcuts
    if (vimlet.meta.shortcut) {
      var shortcutKeys = Object.keys(vimlet.meta.shortcut);
      var shortcutTag;
      var shortcutHandler;
      for (var i = 0; i < shortcutKeys.length; i++) {
        shortcutTag = shortcutKeys[i];
        shortcutHandler = vimlet.meta.shortcut[shortcutTag];
        if (match.indexOf(shortcutTag, 0) === 0) {
          match = shortcutHandler(match.substring(shortcutTag.length, match.length).trim());
        }
      }
    }

    return match;
  };

  vimlet.meta.__preserveNewLineIfNeeded = function (match) {

    // Remove start spaces with regex since trimLeft is not IE compatible
    match = match.replace(/^\s+/, "");

    var endOfLine = "";

    // Return endOfLine if echo found
    if (match.match(new RegExp("(^" + vimlet.meta.__tagOpen + vimlet.meta.__tagEcho + "|echo(.*);|template(.*);)", "g"))) {

      // Determine match end of line
      var endsWithNewLine = match.match(new RegExp("(\\r\\n$|\\r$|\\n$)", "g"));

      if (endsWithNewLine) {
        endOfLine = endsWithNewLine[0];
      }

    }

    return endOfLine;
  };

}.apply(vimlet.meta));  
    
// ############################################################################################
// CORE MODULES
// ############################################################################################

// ** First line not read by meta
eon.object = eon.object || {};

eon.object.assignToPath = function(obj, path, value) {
  var pathArray = path.split(".");
  var target = obj;

  for (var i = 0; i < (pathArray.length - 1); i++) {
    if(!target[pathArray[i]]) {
      target[pathArray[i]] = {};
    }

    target = target[pathArray[i]];    
  }

  target[pathArray[pathArray.length - 1]] = value;
};

eon.object.readFromPath = function(obj, path) {
  var pathArray = path.split(".");
  var target = obj;

  for (var i = 0; i < pathArray.length; i++) {
    if (target) {
      target = target[pathArray[i]];    
    }
  }

  return target;
};



//  --- Types ---
//  always: (default)     Call stored functions always when triggered.
//  once:                Call stored functions once when triggered.
//  ready:              Call stored functions when triggered and force future functions to run immediately.
eon.createCallback = function (callback, obj, type) {
  // Set callback type
  if (!obj["__" + callback + "__type"]) {
    // Set always as the default type when undefined
    if (typeof type === "undefined") {
      type = "always";
    }
    obj["__" + callback + "__type"] = type;
  }
  // Set callback triggered flag
  if (!obj["__" + callback + "__triggered"]) {
    obj["__" + callback + "__triggered"] = false;
  }
  // Stored functions array
  if (!obj["__" + callback]) {
    obj["__" + callback] = [];
  }
  // Add callback function to array
  if (!obj[callback]) {
    obj[callback] = function (fn, scope, args) {

      // If ready and triggered inmediately call the function else store it
      if (
        obj["__" + callback + "__type"] === "ready" &&
        obj["__" + callback + "__triggered"] === true
      ) {
        fn.apply(
          obj["__" + callback + "__scope"],
          obj["__" + callback + "__args"]
        );
      } else {
        // callback wrapper object
        obj["__" + callback].push({
          fn: fn,
          scope: scope,
          args: args
        });
      }
    };
  }
};

eon.triggerCallback = function (callback, obj, scope, args) {

  // Check if callback exsists
  if (obj["__" + callback]) {
    // Check if callback functions need to be triggered
    if (obj["__" + callback + "__type"] === "always" || obj["__" + callback + "__triggered"] === false) {

      obj["__" + callback + "__triggered"] = true;

      var scopeUndefinedOrNull = typeof scope === "undefined" || scope == null;
      var argsUndefinedOrNull = typeof args === "undefined" || args == null;
      var callbackFunctions = obj["__" + callback];

      // If the callback is of "ready" type we make a copy of the functions queue to trigger them and then clear the callback queue
      if (obj["__" + callback + "__type"] == "ready") {
        callbackFunctions = obj["__" + callback].slice(0);
        obj["__" + callback] = [];
      }

      // Trigger stored functions
      for (var i = 0; i < callbackFunctions.length; i++) {

        if (scopeUndefinedOrNull) {
          scope = callbackFunctions[i].scope ? callbackFunctions[i].scope : obj;
        }

        if (argsUndefinedOrNull) {
          args = callbackFunctions[i].args ? callbackFunctions[i].args : [];
        }

        callbackFunctions[i].fn.apply(scope, args);

      }

      // Store scope, args and tag as triggered
      obj["__" + callback + "__scope"] = scope;
      obj["__" + callback + "__args"] = args;

    }
  }
};

eon.removeCallback = function (callback, obj, fn) {
  var callbacksArray = obj["__" + callback];

  for (var i = 0; i < callbacksArray.length; i++) {
    if (callbacksArray[i].fn === fn) {
      callbacksArray.splice(i, 1);
    }
  }
};



eon.dom = eon.dom || {};

// eon custom selector function
// prototype $ and $1 should not conflict with other frameworks API 

HTMLElement.prototype.$ = function (query) {
  return query.indexOf("#", 0) === 0 ? this.querySelector(query) : this.querySelectorAll(query);
};

HTMLElement.prototype.$1 = function (query) {
  return this.querySelector(query);
};

HTMLElement.prototype.getEnclosingComponent = function () {

  var parentNode = this.parentNode;
  var nodeName, enclosingComponent;
  
  while (parentNode) {

    if (parentNode.eon) {

      enclosingComponent = parentNode;
      parentNode = undefined;
      
    } else {

      nodeName = parentNode.nodeName.toLowerCase();
      parentNode = nodeName == "body" ? undefined : parentNode.parentNode;

    }

  }

  return enclosingComponent;

};

// eon definitions will always be available
eon.$ = function (query) {
  return query.indexOf("#", 0) === 0 ? document.querySelector(query) : document.querySelectorAll(query);
};

eon.$1 = function (query) {
  return document.querySelector(query);
};

// window & document definitions will use any other framework $ and $1 if found
window.$ = window.$ || eon.$;
window.$1 = window.$1 || eon.$1;
document.$ = document.$ || eon.$;
document.$1 = document.$1 || eon.$1;

// TODO: MOVE THIS EXCEPT DOMREADY TO eon.DOM
(function () {
  var self = this;

  // eon.domReady (Doesn't wait for customElements)
  (function (funcName, baseObj) {
    "use strict";
    // The public function name defaults to window.docReady
    // but you can modify the last line of this function to pass in a different object or method name
    // if you want to put them in a different namespace and those will be used instead of
    // window.docReady(...)
    funcName = funcName || "docReady";
    baseObj = baseObj || window;
    var readyList = [];
    var readyFired = false;
    var readyEventHandlersInstalled = false;
    // call this when the document is ready
    // this function protects itself against being called more than once
    function ready() {
      if (!readyFired) {
        // this must be set to true before we start calling callbacks
        readyFired = true;
        for (var i = 0; i < readyList.length; i++) {
          // if a callback here happens to add new ready handlers,
          // the docReady() function will see that it already fired
          // and will schedule the callback to run right after
          // this event loop finishes so all handlers will still execute
          // in order and no new ones will be added to the readyList
          // while we are processing the list
          readyList[i].fn.call(window, readyList[i].ctx);
        }
        // allow any closures held by these functions to free
        readyList = [];
      }
    }

    function readyStateChange() {
      if (document.readyState === "complete") {
        ready();
      }
    }
    // This is the one public interface
    // docReady(fn, context);
    // the context argument is optional - if present, it will be passed
    // as an argument to the callback
    baseObj[funcName] = function (callback, context) {
      if (typeof callback !== "function") {
        throw new TypeError("callback for docReady(fn) must be a function");
      }
      // if ready has already fired, then just schedule the callback
      // to fire asynchronously, but right away
      if (readyFired) {
        setTimeout(function () {
          callback(context);
        }, 1);
        return;
      } else {
        // add the function and context to the list
        readyList.push({
          fn: callback,
          ctx: context
        });
      }
      // if document already ready to go, schedule the ready function to run
      // IE only safe when readyState is "complete", others safe when readyState is "interactive"
      if (
        document.readyState === "complete" ||
        (!document.attachEvent && document.readyState === "interactive")
      ) {
        setTimeout(ready, 1);
      } else if (!readyEventHandlersInstalled) {
        // otherwise if we don't have event handlers installed, install them
        if (document.addEventListener) {
          // first choice is DOMContentLoaded event
          document.addEventListener("DOMContentLoaded", ready, false);
          // backup is window load event
          window.addEventListener("load", ready, false);
        } else {
          // must be IE
          document.attachEvent("onreadystatechange", readyStateChange);
          window.attachEvent("onload", ready);
        }
        readyEventHandlersInstalled = true;
      }
    };
  })("domReady", self);

  self.getEnclosingComponent = function (el) {
    while (
      el.parentNode &&
      Object.prototype.toString.call(el.parentNode) != "[object HTMLDocument]"
    ) {
      el = el.parentNode;

      if (el.eon) {
        return el;
      }
    }

    return null;
  };

  // Register resize listener callback
  eon.createCallback("onResize", eon);
  
  window.addEventListener("resize", function (event) {
    eon.triggerCallback("onResize", eon, null, [event]);
  });

  // Register global focus
  eon.domReady(function () {
    document.body.addEventListener(
      "focus",
      function (e) {
        eon.triggerCallback("onFocus", eon, e.target, e);

        if (e.target.onFocus) {
          eon.triggerCallback("onFocus", e.target, e.target, e);
        }
      },
      true
    ); //Non-IE
    //document.body.onfocusin = focusHandler; //IE

    // Register global blur
    document.body.addEventListener(
      "blur",
      function (e) {
        eon.triggerCallback("onBlur", eon, e.target, e);

        if (e.target.onBlur) {
          eon.triggerCallback("onBlur", e.target, e.target, e);
        }
      },
      true
    ); //Non-IE
    //document.body.onfocusout = blurHandler; //IE
  });

  // ###########################################################################

  /**
   * The right position (in pixels) relative to the right side of the specified parent
   * * If no parent is specified, document body is de default one
   * @param {[type]} el     [description]
   * @param {[type]} parent [description]
   */
  eon.dom.offsetRight = function (el, parent) {
    // Get parent the element is relative to
    parent = !parent ? document.documentElement || document.body : parent;
    var docWidth = parent.offsetWidth;
    // Get element offset left and offset width
    var elOffsetLeft = el.offsetLeft;
    var elOffsetWidth = el.offsetWidth;
    // Calculate offset right value
    var offsetRight = docWidth - (elOffsetLeft + elOffsetWidth);
    return offsetRight;
  };
  /**
   * The bottom position (in pixels) relative to the bottom side of the specified parent
   * * If no parent is specified, document body is de default one
   * @param {[type]} el     [description]
   * @param {[type]} parent [description]
   */
  eon.dom.offsetBottom = function (el, parent) {
    // Get parent the element is relative to
    parent = !parent ? document.documentElement || document.body : parent;
    var docHeight = parent.offsetHeight;
    // Get element offset top and offset height
    var elOffsetTop = el.offsetTop;
    var elOffsetHeight = el.offsetHeight;
    // Calculate offset bottom value
    var offsetBottom = docHeight - (elOffsetTop + elOffsetHeight);
    return offsetBottom;
  };
  /**
   * Get element transform axis value
   * @param  {[type]}  el   [description]
   * @param  {[type]}  axis [description]
   * @return {Boolean}      [description]
   */
  eon.dom.getTransformAxis = function (el, axis) {
    var value;
    // Get element transform property
    var transform = el.style.transform;
    if (transform) {
      // Extract specified axis from transform string
      switch (axis.toLowerCase()) {
        case "x":
          value = parseInt(transform.split(",")[0].split("(")[1]);
          break;
        case "y":
          value = parseInt(transform.split(",")[1]);
          break;
        case "z":
          value = parseInt(transform.split(",")[2].split(")")[0]);
          break;
      }
    }
    return value;
  };
  /**
   * Move a node the specified pixels distance
   * @param  {[type]} node     [description]
   * @param  {[type]} distance [description]
   * @return {[type]}          [description]
   */
  eon.dom.translate = function (el, axis, value) {
    // Set the new node translate position
    switch (axis.toLowerCase()) {
      case "x":
        el.style.transform = "translate3d(" + value + "px, 0px, 0px)";
        break;
      case "y":
        el.style.transform = "translate3d(0px, " + value + "px, 0px)";
        break;
      case "z":
        el.style.transform = "translate3d(0px, 0px, " + value + "px)";
        break;
    }
  };

  /**
   * Whether or not the class exists in the dom
   * @param  {[type]} className [description]
   * @return {[type]}          [description]
   */
  eon.dom.classExists = function (className) {
    var el = this;
    var classes = eon.style.sheet.cssRules;
    var cls;
    
    for (var i = 0; i < classes.length; i++) {
        cls = classes[i];
  
        if(cls.selectorText == className){
        return true;
        }
    }
    return false;
  };

  // Register if the element is on the path on mouse events
  self.registerPathListener = function (el) {
    el.isOnPath = false;

    el.addEventListener("pointerdown", function () {
      el.isOnPath = true;
    }, true);

    el.addEventListener("mousedown", function () {
      el.isOnPath = true;
    }, true);

    el.addEventListener("touchstart", function () {
      el.isOnPath = true;
    }, true);

    document.addEventListener("pointerup", function () {
      setTimeout(function () {
        el.isOnPath = false;
      }, 0);

    }, true);

    document.addEventListener("mouseup", function () {
      setTimeout(function () {
        el.isOnPath = false;
      }, 0);

    }, true);

    document.addEventListener("touchend", function () {
      setTimeout(function () {
        el.isOnPath = false;
      }, 0);

    }, true);

  };
}.apply(eon));


// ############################################################################################
// IMPORT ELEMENTS
// ############################################################################################

// Create imports reade callback
eon.createCallback("onImportsReady", eon, "ready");
eon.createCallback("onScriptsReady", eon, "ready");

eon.imports = eon.imports || {
    count: 0,
    total: 0,
    ready: false
};

eon.imports.style = eon.imports.style || "";

eon.imports.scripts = eon.imports.scripts || {};
eon.imports.links = eon.imports.links || {};
eon.imports.templates = eon.imports.templates || {};
eon.imports.paths = eon.imports.paths || {};
eon.imports.config = eon.imports.config || {};
eon.imports.errors = eon.imports.errors || {};

// Imports the requested custom element file, admits arrays and strings
eon.import = function (param) {

    if (param.constructor === Array) {

        for (var i = 0; i < param.length; i++) {
            eon.insertImport(param[i]);
        }

    } else if (param.constructor === String) {

        eon.insertImport(param);

    }

};

eon.insertImport = function (href) {

    var elementName;

    elementName = (href.indexOf(".html") > -1) ? href.match(/[^\/]*$/g)[0].replace(".html", "").toLowerCase() : href.match(/[^\/]*$/g)[0].toLowerCase();
    href = (href.indexOf(".html") > -1) ? href : href + "/" + elementName + ".html";

    if (!(elementName in eon.imports.templates)) {

        // Increment total
        eon.imports.total++;

        // Avoid duplicated imports while waiting XMLHttpRequest callback.
        eon.imports.templates[elementName] = null;

        // Saves the paths of the imported elements
        eon.imports.paths[elementName] = href.substring(0, href.length - href.match(/[^\/]*$/g)[0].length);

        // Declare element
        eon.declare(elementName);

        eon.ajax(href, { cacheBusting: eon.cacheBusting || eon.importCacheBusting }, function (success, obj) {

            if (success) {

                // Cache
                eon.cache.add(obj.url, { name: elementName });

                if (obj.xhr.status == 200) {

                    eon.insertFragment(elementName, obj.responseText);

                } else {

                    // Since this element can't be imported, we reduce the total components amount so that the execution may continue
                    eon.imports.total--;

                    // Removes it from the already saved objects
                    delete eon.imports.templates[elementName];
                    delete eon.imports.paths[elementName];

                    // Saves it into the erros object
                    eon.imports.errors[elementName] = obj.xhr.status;

                }

            }

        });

    }

};

eon.insertFragment = function (elementName, content) {
    
    var importFragment = eon.fragmentFromString(content);

    var i;

    // Store combined styles
    var styles = importFragment.querySelectorAll("style");

    for (i = 0; i < styles.length; i++) {
        eon.imports.style += styles[i].innerHTML;
    }

    // Store scripts
    var scripts = importFragment.querySelectorAll("script");

    if (scripts.length > 0) {

        eon.imports.scripts[elementName] = {};

        for (i = 0; i < scripts.length; i++) {

            if (scripts[i].getAttribute("data-src")) {
                scripts[i].src = eon.imports.paths[elementName] + scripts[i].getAttribute("data-src");
                scripts[i].removeAttribute("data-src");
            }

            eon.imports.scripts[elementName][i] = scripts[i];

        }

    }

    // Store links
    var links = importFragment.querySelectorAll("link");

    if (links.length > 0) {

        eon.imports.links[elementName] = {};

        for (i = 0; i < links.length; i++) {
            eon.imports.links[elementName][i] = links[i];
        }

    }

    // Store template
    var template = importFragment.querySelector("template");

    if (template) {
        eon.imports.templates[elementName] = template;
    }

    // Wait unity domReady to ensure all imports are done and total value is accurate
    eon.domReady(function () {

        eon.imports.count++;
        
        if (!eon.imports.ready && eon.imports.count == eon.imports.total) {

            // Appends all elements combined style
            eon.handleStyleAppend();
            // Appends the imported links
            eon.handleLinksAppend();
            // Appends the imported scripts
            eon.handleScriptsAppend();
            // When all the scripts are properly appended and ready then we import dependencies and see if we have finished all the imports
            eon.onScriptsReady(function () {

                // Handles the dependencies and returns a boolean for whether there are pending imports or not
                var hasPendingImports = eon.handleDependencies();

                // If there are no more dependencies to handle trigger onImportsReady
                if (!hasPendingImports && !eon.imports.ready && eon.imports.count == eon.imports.total && eon.imports.total == Object.keys(eon.imports.config).length) {

                    eon.imports.ready = true;

                    // Here we will register the main theme, the one declared by the user or our default one
                    eon.importMainTheme(eon.theme);
                    // Reads the themeSchema and imports the requested files
                    eon.importSchemaThemes();

                    eon.triggerCallback('onImportsReady', eon);

                } else {
                    eon.__onScriptsReady__triggered = false;
                }

            });

        }

    });
};

eon.handleDependencies = function () {

    // Automated dependencies and interpolation
    var elementNames = Object.keys(eon.imports.config);
    var hasPendingImports = false;
    var hasDependencies;

    // For every element config imported we check if it needs dependencies and interpolation
    for (var i = 0; i < elementNames.length; i++) {

        // Handle dependencies
        hasDependencies = eon.handleConfigDependencies(elementNames[i]);

        if (hasDependencies) {
            hasPendingImports = true;
        }

        // Handle interpolation
        eon.handleTemplateInterpolation(elementNames[i]);
    }

    return hasPendingImports;

};


// Handle template interpolation
eon.handleTemplateInterpolation = function (name) {
    if (eon.imports.config[name].parse) {
        eon.interpolation.prepare(eon.imports.templates[name]);
    }
};

// Imports specific componentes themes if specified
eon.importSchemaThemes = function () {

    if (eon.themeSchema) {

        var themes = Object.keys(eon.themeSchema);
        var documentHead = document.querySelector("head");
        var theme, themeElements, themeLink, themePath;

        // For each theme
        for (var i = 0; i < themes.length; i++) {

            theme = themes[i];
            themeElements = eon.themeSchema[theme];

            // Imports the main theme file
            eon.importMainTheme(theme);

            // Loops through the elements
            for (var j = 0; j < themeElements.length; j++) {

                eon.registry.registerTheme(themeElements[j], theme);
                themePath = eon.basePath + "/theme/" + theme + "/" + themeElements[j].toLowerCase() + ".css";

                themeLink = document.createElement("link");
                themeLink.setAttribute("rel", "stylesheet");
                themeLink.setAttribute("href", themePath);

                // Cache
                eon.cache.add(themePath, { name: themeElements[j].toLowerCase() });

                documentHead.appendChild(themeLink);

            }

        }

    }

};

eon.importMainTheme = function (theme) {

    if (theme && !eon.registry.isThemeRegistered("main", theme)) {

        var documentHead = document.querySelector("head");
        var mainLink = document.createElement("link");
        var themePath = eon.basePath + "/theme/" + theme + "/main.css";

        themePath = eon.cacheBusting || eon.themeBoostedCache ? eon.getCacheBustedUrl(themePath) : themePath;

        eon.registry.registerTheme("main", theme);

        mainLink.setAttribute("rel", "stylesheet");
        mainLink.setAttribute("href", themePath);

        // Cache
        eon.cache.add(themePath);

        documentHead.appendChild(mainLink);

    }

};

eon.importElementTheme = function (config, name, theme) {

    if (theme && config.themed && !eon.registry.isThemeRegistered(name, theme)) {

        var importedDocumentHead = document.querySelector("head");
        var elementLink = document.createElement("link");
        var themePath = eon.basePath + "/theme/" + theme + "/" + name.toLowerCase() + ".css";

        themePath = eon.cacheBusting || eon.themeBoostedCache ? eon.getCacheBustedUrl(themePath) : themePath;

        eon.registry.registerTheme(name, theme);

        elementLink.setAttribute("rel", "stylesheet");
        elementLink.setAttribute("href", themePath);

        // Cache
        eon.cache.add(themePath, { name: name });

        importedDocumentHead.appendChild(elementLink);

    }
};

eon.handleStyleAppend = function () {

    if (eon.imports.style != "") {

        var combinedStyle = document.createElement("style");

        combinedStyle.setAttribute("data-eon", "element-styles")
        combinedStyle.innerHTML = eon.imports.style;

        // Resets style to avoid css rules style replication
        eon.imports.style = "";

        document.head.appendChild(combinedStyle);

    }

};

eon.handleScriptsAppend = function (elementIndex, scriptIndex) {

    var elementNames = Object.keys(eon.imports.scripts);
    var resume = !isNaN(elementIndex - 1) && !isNaN(scriptIndex - 1) ? true : false;
    var elementScriptsKeys, elementScripts, script;

    // If it has to resume a previous scripts append we start from that index
    for (var i = resume ? elementIndex : 0; i < elementNames.length; i++) {

        elementScripts = eon.imports.scripts[elementNames[i]];
        elementScriptsKeys = Object.keys(elementScripts);

        // If it has to resume a previous scripts append we start from that index
        for (var j = (resume && i == elementIndex) ? scriptIndex : 0; j < elementScriptsKeys.length; j++) {

            resume = false;

            if (elementScripts[elementScriptsKeys[j]].src) {

                // If the script has a src then we import it via require
                eon.amd.require([elementScripts[elementScriptsKeys[j]].src], function () {
                    eon.handleScriptsAppend(i, j + 1);
                });

                // Since we have to wait for the require to resumen our loops we break all the function execution
                return;

            } else {

                // iPad fix, if we tried to append the script saved in elementScripts directly the script was not executing
                script = document.createElement("script");
                script.innerHTML = elementScripts[elementScriptsKeys[j]].innerHTML;
                elementScripts[elementScriptsKeys[j]] = script;

                // // Here we take the current script text and add our code to remove the script once its finished
                elementScripts[elementScriptsKeys[j]].innerHTML = elementScripts[elementScriptsKeys[j]].innerHTML;
                elementScripts[elementScriptsKeys[j]].innerHTML = elementScripts[elementScriptsKeys[j]].innerHTML +
                    "var elementNames = Object.keys(eon.imports.scripts);" +
                    "var elementScripts = eon.imports.scripts[elementNames[" + i + "]];" +
                    "var scriptKey = Object.keys(elementScripts)[" + j + "];" +
                    "elementScripts[scriptKey].parentNode.removeChild(elementScripts[scriptKey]);";

                document.head.appendChild(elementScripts[elementScriptsKeys[j]]);

            }

        }

    }

    // Since we are finished looping all the current element scripts we reset our scripts object to avoid looping through them again in case more elements are being imported after
    eon.imports.scripts = {};

    var scriptsReadyScript = document.createElement("script");

    scriptsReadyScript.setAttribute("scriptsready-script", "");
    scriptsReadyScript.innerHTML = "eon.triggerCallback('onScriptsReady', eon); eon.removeScriptsReadyScripts();";

    document.head.appendChild(scriptsReadyScript);

};

eon.removeScriptsReadyScripts = function () {
    var el = this;
    var scriptReadyScripts = document.head.querySelectorAll("script[scriptsready-script]");

    for (var i = 0; i < scriptReadyScripts.length; i++) {
        scriptReadyScripts[i].parentNode.removeChild(scriptReadyScripts[i]);
    }
};

eon.handleLinksAppend = function () {

    var elementNames = Object.keys(eon.imports.links);
    var elementLinksKeys, elementLinks, link;

    for (var i = 0; i < elementNames.length; i++) {

        elementLinksKeys = Object.keys(eon.imports.links[elementNames[i]]);
        elementLinks = eon.imports.links[elementNames[i]];

        for (var j = 0; j < elementLinksKeys.length; j++) {

            link = elementLinks[elementLinksKeys[j]];

            if (link.getAttribute("data-href")) {

                link.href = eon.imports.paths[elementNames[i]] + link.getAttribute("data-href");
                link.removeAttribute("data-href");

            }

            document.head.appendChild(link);

        }

    }

};

// Handle config dependencies
eon.handleConfigDependencies = function (name) {
    var hasDependencies = false;
    var elementConfig = eon.imports.config[name];
    var dependencyName, dependencyPath, dependencyFile;

    // Loop through dependencies path and import new ones
    if (elementConfig.dependencies) {
        for (var j = 0; j < elementConfig.dependencies.length; j++) {
            dependencyName = elementConfig.dependencies[j].match(/[^\/]*$/g)[0].replace(".html", "").toLowerCase();
            dependencyPath = elementConfig.dependencies[j].charAt(0) == "/" ? eon.basePath + elementConfig.dependencies[j] : elementConfig.dependencies[j];
            if (!(dependencyName in eon.imports.templates)) {
                hasDependencies = true;
                dependencyPath = (dependencyPath.indexOf(".html") > -1) ? dependencyPath : dependencyPath + "/" + dependencyName + ".html";
                dependencyFile = elementConfig.dependencies[j].charAt(0) == "/" ? dependencyPath : eon.imports.paths[name] + dependencyPath;
                eon.import(dependencyFile);
            }
        }
    }

    return hasDependencies;
}

// If there are no imports in the document we will trigger onImportsReady event immediately
eon.domReady(function () {
    if (!eon.imports || (eon.imports && eon.imports.total == 0)) {
        eon.triggerCallback("onImportsReady", eon);
    }
});

eon.registry = eon.registry || {};

eon.registry.transformedQueue = [];
eon.registry.renderQueue = [];
eon.registry.bubbleRenderQueue = [];
eon.registry.readyQueue = [];

eon.registry.elementThemes = {};
eon.registry.elementCounters = {};
eon.registry.elementRegistry = {};

eon.registry.elementStatus = {
  declared: [],
  created: [],
  attached: {}, // Object is used to avoid duplication
  imported: [],
  transformed: [],
  rendered: [],
  bubbleRendered: [],
  ready: []
};

// Register eon ready callback
eon.createCallback("onReady", eon, "ready");

// Register element
eon.registry.registerElement = function (el) {
  var name = el.tagName.toLowerCase();
  var uid = el.uid ? el.uid : el.getAttribute("uid");
  var uidFull;

  if (!uid) {

    if (!eon.registry.elementCounters[name]) {
      eon.registry.elementCounters[name] = 0;
    }

    // Assign uid
    eon.registry.elementCounters[name]++;
    uid = eon.registry.elementCounters[name];
    el.setAttribute("uid", uid);
    el.uid = uid;

    uidFull = name + "-" + uid;

    // Track element status
    eon.registry.elementRegistry[uidFull] = {
      el: el,
      status: "created"
    };

    // InnerHTML support
  } else if (uid && (!el.uid || !el.getAttribute("uid"))) {
    uidFull = name + "-" + uid;

    // In case it has either the uid property or the attribute but not the other we just set them again
    el.setAttribute("uid", uid);
    el.uid = uid;

    // Updates the reference for the element
    eon.registry.elementRegistry[uidFull].el = el;
  }

  el.eon = true;

  return uidFull;
};

eon.registry.triggerTransformed = function (index) {
  eon.registry.transformedQueue[index].fn.apply(eon.registry.transformedQueue[index].el);
};

eon.registry.addToTransformedQueue = function (el, elementDoc, fn) {
  var script = document.createElement("script");
  var index;

  eon.registry.transformedQueue.push({
    el: el,
    fn: fn
  });

  index = eon.registry.transformedQueue.length - 1;

  script.innerHTML =
    "setTimeout(function(){setTimeout(function(){eon.registry.triggerTransformed(" +
    index +
    ");}, 0);}, 0);";

  eon.registry.transformedQueue[index][script] = script;

  elementDoc.querySelector("head").appendChild(script);
};

eon.registry.addToRenderQueue = function (el, fn) {
  eon.registry.renderQueue.push({
    el: el,
    fn: fn
  });
};

eon.registry.addToBubbleRenderQueue = function (el, fn) {
  eon.registry.bubbleRenderQueue.push({
    el: el,
    fn: fn
  });
};

eon.registry.addToReadyQueue = function (el, fn) {
  eon.registry.readyQueue.push({
    el: el,
    fn: fn
  });
};

eon.registry.triggerRenders = function () {

  if (Object.keys(eon.registry.elementStatus.attached).length == eon.registry.elementStatus.transformed.length) {
    
    eon.registry.triggerRenderCallbacks();
    eon.registry.triggerBubbleRenderCallbacks();
    eon.registry.triggerReadyCallbacks();

    // Trigger global onReady
    eon.onImportsReady(function () {
      eon.triggerCallback("onReady", eon);
    });

  }

};

eon.registry.triggerRenderCallbacks = function () {
  // Clone queue and clear
  var auxQueue = eon.registry.renderQueue.slice();
  eon.registry.renderQueue = [];

  // Trigger queue
  for (var i = 0; i < auxQueue.length; i++) {
    auxQueue[i].fn.apply(auxQueue[i].el);
  }
};

eon.registry.triggerBubbleRenderCallbacks = function () {
  // Clone queue and clear
  var auxQueue = eon.registry.bubbleRenderQueue.slice();
  eon.registry.bubbleRenderQueue = [];

  // Trigger queue
  for (var i = auxQueue.length - 1; i >= 0; i--) {
    auxQueue[i].fn.apply(auxQueue[i].el);
  }
};

eon.registry.triggerReadyCallbacks = function () {
  // Clone queue and clear
  var auxQueue = eon.registry.readyQueue.slice();
  eon.registry.readyQueue = [];

  // Trigger queue
  for (var i = 0; i < auxQueue.length; i++) {
    auxQueue[i].fn.apply(auxQueue[i].el);
  }
};

eon.registry.registerTheme = function (tagName, theme) {
  if (!eon.registry.elementThemes[theme]) {
    eon.registry.elementThemes[theme] = {};
  }

  eon.registry.elementThemes[theme][tagName] = true;
};

eon.registry.isThemeRegistered = function (tagName, theme) {
  return !eon.registry.elementThemes[theme]
    ? false
    : eon.registry.elementThemes[theme][tagName];
};

eon.registry.getUidFull = function (el) {
  var uid = el.uid ? el.uid : el.getAttribute("uid");
  var fullUid;

  if (typeof el != "string" && uid) {
    fullUid = el.tagName.toLowerCase() + "-" + uid;
  }

  return fullUid;
};

eon.registry.updateElementStatus = function (el, status) {

  if (status != "parsed") {

    var uidFull = eon.registry.getUidFull(el);

    if (status == "attached") {

      eon.registry.elementStatus[status][uidFull] = el;

      if (eon.registry.elementStatus.ready.length != Object.keys(eon.registry.elementStatus.attached).length) {
        eon["__onReady__triggered"] = false;
      }

    } else if (status != "detached") {

      eon.registry.elementStatus[status].push(el);
      
    }

    if (status != "created" && status != "declared") {
      eon.registry.elementRegistry[uidFull][status] = true;
    }

  }

};

eon.registry.isAttached = function (el) {
  return (
    eon.registry.elementRegistry[eon.registry.getUidFull(el)] &&
    eon.registry.elementRegistry[eon.registry.getUidFull(el)].attached
  );
};

eon.registry.isImported = function (el) {
  return (
    eon.registry.elementRegistry[eon.registry.getUidFull(el)] &&
    eon.registry.elementRegistry[eon.registry.getUidFull(el)].imported
  );
};

eon.registry.isTransformed = function (el) {
  return (
    eon.registry.elementRegistry[eon.registry.getUidFull(el)] &&
    eon.registry.elementRegistry[eon.registry.getUidFull(el)].transformed
  );
};

eon.registry.isRendered = function (el) {
  return (
    eon.registry.elementRegistry[eon.registry.getUidFull(el)] &&
    eon.registry.elementRegistry[eon.registry.getUidFull(el)].rendered
  );
};

eon.registry.isBubbleRendered = function (el) {
  return (
    eon.registry.elementRegistry[eon.registry.getUidFull(el)] &&
    eon.registry.elementRegistry[eon.registry.getUidFull(el)].bubbleRendered
  );
};

eon.registry.isReady = function (el) {
  return (
    eon.registry.elementRegistry[eon.registry.getUidFull(el)] &&
    eon.registry.elementRegistry[eon.registry.getUidFull(el)].ready
  );
};

// Trigger global onReady
eon.onImportsReady(function () {

  if (eon.registry.elementStatus.declared.length == 0) {
    eon.triggerCallback("onReady", eon);
  }

});

eon.interpolation = eon.interpolation || {};
eon.interpolation.tags = ["{{", "}}", "="];

eon.interpolation.globalScope = eon.interpolation.globalScope || eon;

eon.interpolation.globalScope.data = eon.interpolation.globalScope.data || {};
eon.interpolation.globalScope.locale = eon.interpolation.globalScope.locale || {};

// Replaces all the echo/script for its corresponding elements and prepares them
eon.interpolation.prepare = function (template) {

  // Extend vimlet.meta
  if (!vimlet.meta.sandbox) {
    vimlet.meta.sandbox = {
      "bind": function (keyPath, rootPath, global) {

        global = eon.util.isTrue(global) ? true : false;

        // If rootPath is provided we split it
        rootPath = rootPath && rootPath != "" ? rootPath.split(".") : rootPath;

        // If the first element of the rootPath is either "data" or "global"
        if (rootPath && ((rootPath[0] == "data" && !global) || (rootPath[0] == "global"))) {

          // Removes the data/global from the path
          rootPath.shift();
          // Joins the remaining path
          rootPath = rootPath.join(".");

          keyPath = rootPath != "" ? rootPath + "." + keyPath : keyPath;

        }

        this.echo('<eon-variable bind="' + keyPath + '" global="' + global + '"></eon-variable>');
      }
    };
  }

  if (!vimlet.meta.shortcut) {
    vimlet.meta.shortcut = {
      "@": function (s) {

        // Transforms the string argument into our binding parameters
        var params = s.split(" ");

        var keyPath = params.length > 1 ? params[1] : params[0];
        var rootPath = params.length > 1 ? params[0] : undefined;
        var global = rootPath && rootPath.split(".")[0] == "global" ? true : false;

        keyPath = "\"" + keyPath + "\"";
        rootPath = rootPath ? "\"" + rootPath + "\"" : rootPath;
        params = "[ " + keyPath + ", " + rootPath + ", " + global + "]";

        return "bind.apply(undefined, " + params + ");";
      }
    };
  }


  vimlet.meta.tags = eon.interpolation.tags;
  vimlet.meta.parse(window, template.innerHTML, null, function (result) {
    template.innerHTML = result;
  });

  return template;
};

// Handles all the initial state of the data and variable elements
eon.interpolation.init = function (el, config) {

  var sources = {};

  sources.element = {};
  sources.global = {};
  
  // First of all checks if there is a data specified in the element config, if so, it creates the source
  if (Object.keys(el.data).length > 0) {

    sources.element.data = {};
    sources.element.data.scope = el;
    sources.element.data.obj = el.data;
    sources.element.data.isGlobal = false;
    sources.element.data.isLocale = false;

  }

  // If parse is not enabled then we will try to create onDataChanged callback if data exists on the component
  if (!config.parse) {

    if (sources.element.data) {
      
      eon.interpolation.setupDataChangeCallback(el, sources.element.data, config);
      eon.interpolation.setupDataPropDescriptors(sources.element.data, "data");

    }

  } else {

    var variables = el.template.querySelectorAll("eon-variable");
    var currentVariable;

    var isGlobal, scope, source, sourceType;
    var bindString, bindValue, root;

    eon.interpolation.globalScope.__interpolations = eon.interpolation.globalScope.__interpolations || {};
    el.__interpolations = el.__interpolations || {};

    // Loops all the inner element variables
    for (var i = 0; i < variables.length; i++) {

      currentVariable = variables[i];

      // Sets some basic variables to be used later on
      isGlobal = eon.util.isTrue(currentVariable.getAttribute("global"));
      bindString = currentVariable.getAttribute("bind");
      scope = isGlobal ? eon.interpolation.globalScope : el;
      sourceName = bindString.split(".")[0] == "locale" ? "locale" : "data";

      root = sourceName != "locale" ? scope[sourceName] : scope;

      // Reads if there is already a value on the source if there is not then it assigns an empty string
      bindValue = eon.object.readFromPath(root, bindString);
      bindValue = typeof bindValue == "undefined" ? "" : bindValue;

      // Reassigns the value to the source, in case there was no value
      eon.object.assignToPath(root, bindString, bindValue);

      sourceType = isGlobal ? "global" : "element";

      // Creates the source object
      if (!sources[sourceType][sourceName]) {

        sources[sourceType][sourceName] = {};
        sources[sourceType][sourceName].scope = scope;
        sources[sourceType][sourceName].obj = scope[sourceName];
        sources[sourceType][sourceName].isGlobal = isGlobal;

        sources[sourceType][sourceName].isLocale = (sourceName == "locale");

      }

    }

    var sourceTypeKeys = Object.keys(sources);
    var sourceKeys;

    for (var i = 0; i < sourceTypeKeys.length; i++) {

      sourceKeys = Object.keys(sources[sourceTypeKeys[i]]);

      for (var j = 0; j < sourceKeys.length; j++) {

        source = sources[sourceTypeKeys[i]][sourceKeys[j]];

        eon.interpolation.setupDataChangeCallback(el, source, config);
        eon.interpolation.setupDataPropDescriptors(source, sourceKeys[j]);
        eon.interpolation.interpolate(el, source, source.obj, source.scope.__interpolations);

      }

    }

  }

};

// Creates the descriptor for the data object itself and for all its properties
// eon.interpolation.setupDataPropDescriptors = function (el, config) {
eon.interpolation.setupDataPropDescriptors = function (source, sourceName) {

  var scope = source.scope;

  // Defines its own descriptor, in case the whole "data" object changes
  Object.defineProperty(
    scope,
    sourceName,
    eon.interpolation.createPropDescriptor(scope, scope, sourceName, "", scope[sourceName])
  );

  // Loops through all the keys of the object
  eon.interpolation.createObjectPropDescriptors(scope, scope[sourceName], sourceName);
}

// Simple property descriptor creation that in case its changed it will trigger our internal callback
eon.interpolation.createPropDescriptor = function (scope, keyOwnerObj, key, keyPath, value) {
  var propDescriptor = {};

  // Update property value
  keyOwnerObj["__" + key] = value;

  // Redirect get and set to __key
  propDescriptor.get = function () {
    return keyOwnerObj["__" + key];
  };

  propDescriptor.set = function (value) {
    // Trigger onDataChanged
    eon.triggerCallback("_onDataChanged", scope, scope, [keyPath + key, keyOwnerObj["__" + key], value]);

    // Update property value
    keyOwnerObj["__" + key] = value;
  };

  return propDescriptor;
}

// When the property we want to observer is an object we create its descriptor and ones for its properties
eon.interpolation.createObjectPropDescriptors = function (el, obj, keyPath) {
  var value;

  keyPath = keyPath + ".";

  for (var key in obj) {
    // We only want take into account the keys that are not used for the descriptor
    if (key.indexOf("__") == -1) {
      value = obj[key];

      obj["__" + key] = value;

      Object.defineProperty(
        obj,
        key,
        eon.interpolation.createPropDescriptor(el, obj, key, keyPath, value)
      );

      // If the value is an Object then we update the keyPath and create the propDescriptors
      if (value && value.constructor === Object) {
        keyPath = keyPath + key;
        eon.interpolation.createObjectPropDescriptors(el, value, keyPath);
      }
    }
  }
}

// Creates the private onDataChanged callback to handle the public one
eon.interpolation.setupDataChangeCallback = function (el, source, config) {
  var scope = source.scope;

  // If the private callback doesnt exist creates it
  if (!scope._onDataChanged) {

    eon.createCallback("_onDataChanged", scope);

    // When any data changes (incluiding data itself), we manage the onDataChanged triggers depending on the situation
    scope._onDataChanged(function (keyPath, oldVal, newVal) {
      
      if (newVal.constructor === Object) {
        eon.interpolation.handleObjectChange(el, scope, keyPath, oldVal, newVal, config);
      } else {
        eon.interpolation.handleVariableChange(el, scope, keyPath, oldVal, newVal, config);
      }

    });

  }

}

// Takes all the properties from data, finds its variable and sets its value
eon.interpolation.interpolate = function (el, source, obj, interpolations, bind) {
  var key, i, variableBind, variable;

  for (key in obj) {
    // We only want take into account the keys that are not used for the descriptor
    if (key.indexOf("__") == -1) {
      // If the property is an object the call ourselfs again to loop through our keys
      if (obj[key] && obj[key].constructor === Object) {

        bind = bind ? bind + "." + key : key;
        interpolations[key] = interpolations[key] ? interpolations[key] : {};

        eon.interpolation.interpolate(el, source, obj[key], interpolations[key], bind);

      } else {

        variableBind = bind ? bind + "." + key : key;
        variableBind = source.isLocale ? "locale." + variableBind : variableBind;

        interpolations[key] = interpolations[key] ? interpolations[key] : [];

        // Looks for the variables matching the binding
        Array.prototype.push.apply(interpolations[key], el.template.querySelectorAll(
          'eon-variable[bind="' + variableBind + '"][global="' + source.isGlobal + '"]'
        ));

        // For each variable found previously sets its value
        for (i = 0; i < interpolations[key].length; i++) {
          variable = interpolations[key][i];
          variable.textContent = obj[key];
        }

      }
    }
  }
}

// Handles the situation when a whole object has been changed
eon.interpolation.handleObjectChange = function (el, scope, keyPath, oldData, newData, config) {
  var checked = {};

  eon.triggerAllCallbackEvents(el, config, "onDataChanged", [keyPath, oldData, newData]);

  // Checks differences between the old and the new data
  checked = eon.interpolation.backwardDataDiffing(el, scope, keyPath, oldData, newData, checked, config);

  // Checks differences between the new and the old data, escaping the already checked ones
  eon.interpolation.forwardDataDiffing(el, scope, keyPath, newData, checked, config);
  eon.interpolation.createObjectPropDescriptors(scope, newData, keyPath, config);
}

// Handles the value change of the variable element and triggers onDataChanged
eon.interpolation.handleVariableChange = function (el, scope, keyPath, oldVal, newVal, config) {
  var pathArray = keyPath.split(".");
  var interpolationPath;
  var variablesToChange;

  // Removes the first index of the pathArray, that corresponds to "data", which we dont need for the interpolations
  pathArray.shift();
  // Sets the path back together withouth data
  interpolationPath = pathArray.join(".");
  // Takes the variable elements for the path
  variablesToChange = eon.object.readFromPath(scope.__interpolations, interpolationPath);

  // If it has variable elements changes its value 
  if (variablesToChange) {
    for (var i = 0; i < variablesToChange.length; i++) {
      variablesToChange[i].textContent = newVal;
    }
  }

  eon.triggerAllCallbackEvents(scope, config ? config : {}, "onDataChanged", [interpolationPath, oldVal, newVal]);
}

// Compares the old data with the new one and triggers the changes
eon.interpolation.backwardDataDiffing = function (el, scope, keyPath, oldData, newData, checked, config) {
  var newVal;
  // Loops through the oldData
  for (var key in oldData) {
    // We only want take into account the keys that are not used for the descriptor
    if (key.indexOf("__") == -1) {
      // If the property is an object, we enter this function again for that object
      if (oldData[key].constructor === Object) {
        checked[key] = eon.interpolation.backwardDataDiffing(el, scope, keyPath + "." + key, oldData[key], newData ? newData[key] : newData, {}, config);
      } else {
        // If there is no such property on the new Data we set it as an empty string
        newVal = newData ? newData[key] : "";
        // Handles the variable change
        eon.interpolation.handleVariableChange(el, scope, keyPath + "." + key, oldData[key], newVal, config);

        if (newData && newData.hasOwnProperty(key)) {
          checked[key] = newData[key];
        }
      }
    }
  }

  return checked;
}

// Compares the data with the already checked object
eon.interpolation.forwardDataDiffing = function (el, scope, keyPath, data, checked, config) {
  var oldVal;
  // Loops through data
  for (var key in data) {
    // We only want take into account the keys that are not used for the descriptor
    if (key.indexOf("__") == -1) {
      // If the property is an object, we enter this function again for that object
      if (data[key].constructor === Object) {
        eon.interpolation.forwardDataDiffing(el, scope, keyPath + "." + key, data[key], checked ? checked[key] : checked, config);
      } else {
        oldVal = checked ? checked[key] : "";
        // To only trigger variable change for properties that are not already checked/triggered
        if ((checked && !checked.hasOwnProperty(key)) || !checked) {
          eon.interpolation.handleVariableChange(el, scope, keyPath + "." + key, oldVal, data[key], config);
        }
      }
    }
  }
}

eon.createCallback("onThemeChanged", eon);

document.addEventListener("DOMContentLoaded", function (event) {

    var theme = eon.theme;
    var themeDescriptor = {};

    // Default theme
    if (!theme) {
        theme = "claro";
    }
    
    // If there is no theme specified to the body we set the default one, 
    // otherwise we take that theme as the default one
    if (!document.body.dataset.theme && !document.body.hasAttribute("theme")) {

      document.body.setAttribute("theme", theme);

    } else {

        theme = document.body.dataset.theme ? document.body.dataset.theme : theme;
        theme = document.body.hasAttribute("theme") ? document.body.getAttribute("theme") : theme;

    }
  
    eon.__theme = theme;
    
    // Theme property descriptor, that will notify the theme change triggering onThemeChanged, 
    // import new Main theme and set the new theme body attribute
    themeDescriptor.get = function () {
        return eon.__theme;
    };

    themeDescriptor.set = function (value) {

      eon.domReady(function(){

        document.body.setAttribute("theme", value);

        if (!eon.registry.isThemeRegistered("main", value)) {
            eon.importMainTheme(value);
        }

        eon.triggerCallback("onThemeChanged", eon, null, [eon.__theme, value]);
        eon.__theme = value;
      });

    };
  
    Object.defineProperty(eon, "theme", themeDescriptor);
  
  }); 

eon.constructClass = function (baseElement) {
  // Class adpater
  var classAdapter = function () {
    // WARNING! Reflect.construct returned value will fail to return element when browser has native
    // support for webcomponents and webcomponents polyfill is enabled at the same time
    var el;
    // Constructor
    if (window.hasOwnProperty("Reflect")) {
      el = Reflect.construct(baseElement, [], classAdapter); // ES6 Reflect is preferred when available
    } else {
      baseElement.prototype.constructor = classAdapter;
      baseElement.__proto__.constructor = classAdapter;
      el = baseElement.call(classAdapter); // ES alternative
    }
    // Trigger onCreated callback
    eon.triggerCallback("onCreated", classAdapter, el);
    return el;
  };

  // Adapt class prototype and constructor
  Object.setPrototypeOf(classAdapter, baseElement);
  Object.setPrototypeOf(classAdapter.prototype, baseElement.prototype);
  Object.setPrototypeOf(classAdapter.__proto__, baseElement.__proto__);

  // Create callbacks
  eon.createCallback("onCreated", classAdapter);
  eon.createCallback("onAttached", classAdapter);
  eon.createCallback("onDetached", classAdapter);
  eon.createCallback("onAttributeChanged", classAdapter);

  // Trigger callbacks
  classAdapter.prototype.connectedCallback = function () {
    var el = this;
    eon.triggerCallback("onAttached", classAdapter, el);
  };
  classAdapter.prototype.disconnectedCallback = function () {
    var el = this;
    eon.triggerCallback("onDetached", classAdapter, el);
  };
  classAdapter.prototype.attributeChangedCallback = function (
    attrName,
    oldVal,
    newVal
  ) {
    var el = this;
    el["__" + eon.util.hyphenToCamelCase(attrName)] = newVal;
    eon.triggerCallback("onAttributeChanged", classAdapter, el, [
      attrName,
      oldVal,
      newVal
    ]);
  };
  // TODO future callback implementation
  // classAdapter.prototype.adoptedCallback = function() {
  //
  // };
  return classAdapter;
};

eon.element = function (param1, param2) {
    
    var config, stylePath, name;

    if (param2) {

        config = param2.config ? param2.config : param2.constructor === Object ? param2 : {};
        name = param1;

    } else {

        config = param1.config ? param1.config : param1.constructor === Object ? param1 : {};
        name = config.name ? config.name : param1;

    }

    stylePath = config.style ? config.style : "";

    // If the user provided a style path then we create its link and append it
    if (stylePath != "") {

        var link = document.createElement("link");

        stylePath = eon.imports.paths[name.toLowerCase()] + stylePath;
        stylePath = eon.cacheBusting || eon.themeCacheBusting ? eon.getCacheBustedUrl(stylePath) : stylePath;

        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", stylePath);

        // Cache
        eon.cache.add(stylePath, { name: name });

        document.head.appendChild(link);

    }

    eon.imports.config[name.toLowerCase()] = config;
    eon.triggerCallback('onScriptsReady', eon);

};

eon.define = function (config) {
    eon.amd.define(function () {
        return config;
    });
};

eon.createElement = function (name, config) {

    var el = document.createElement(name);

    if (config) {

        var callbacks = ["onCreated", "onInit", "onTransformed", "onRender", "onBubbleRender", "onReady"];

        for (var i = 0; i < callbacks.length; i++) {
            if (config[callbacks[i]]) {
                el[callbacks[i]](config[callbacks[i]]);
            }
        }

        if (config.functions) {

            var functions = Object.keys(config.functions);

            for (var j = 0; j < functions.length; j++) {
                el[functions[j]] = config.functions[functions[j]];
            }

        }

        if (config.properties) {

            var properties = Object.keys(config.properties);

            for (var k = 0; k < properties.length; k++) {
                el[properties[k]] = config.properties[properties[k]];
            }

        }

    }

    return el;

};

eon.hideElement = function (el) {
    el.classList.add("eon-until-rendered");
};

eon.unhideElement = function (el) {
    el.classList.remove("eon-until-rendered");
};

eon.declareCallbacks = function (el) {
    // Creates the callback needed for the element
    eon.createCallback("onCreated", el, "ready");
    eon.createCallback("onInit", el, "ready");
    eon.createCallback("onTransformed", el, "ready");
    eon.createCallback("onRender", el, "ready");
    eon.createCallback("onBubbleRender", el, "ready");
    eon.createCallback("onReady", el, "ready");
    eon.createCallback("onPropertyChanged", el);
    eon.createCallback("onAttributeChanged", el);
    eon.createCallback("onDataChanged", el);
};

eon.generateSourceFragment = function (el) {

    el.source = document.createDocumentFragment();

    if (el.childNodes.length == 0) {
        // Chrome only
        var observer = new MutationObserver(function (mutations) {

            mutations.forEach(function (mutation) {

                for (var i = 0; i < mutation.addedNodes.length; i++) {
                    el.source.appendChild(mutation.addedNodes[i]);
                }

            });

        });

        // Start observing
        observer.observe(el, {
            attributes: false,
            childList: true,
            characterData: false
        });

        el.__onCreatedObserver = observer;

    } else {

        // Move child to source fragment
        while (el.childNodes.length > 0) {
            el.source.appendChild(el.childNodes[0]);
        }

    }

};

eon.prepareElement = function (el, callback) {
    
    // Mark element as first attach
    el.isFirstAttach = true;

    // Runs the callback provided when all imports are ready
    eon.onImportsReady(function () {
        callback();
    });

};

eon.parse = function (el, config) {
    // Creates object properties for the element with data about the properties/attributes to be observed
    eon.collectObserveData(el, config);

    // Imports Data and Public/Private properties and functions
    eon.importData(el, config);
    eon.importLocale(el, config);
    eon.importPublic(el, config);
    eon.importPrivate(el, config);

    eon.definePath(el);
    eon.defineParentComponent(el);
    eon.defineOverlayCreation(el);
    eon.definePlaceholderCreation(el);

    eon.triggerAllCallbackEvents(el, config, "onParsed");
    eon.registry.updateElementStatus(el, "parsed");

};

eon.definePath = function (el) {
    el.importPath = eon.imports.paths[el.nodeName.toLowerCase()];
};

eon.defineParentComponent = function (el) {

    var propDescriptor = {};

    propDescriptor.get = function () {
        el.__parentComponent = el.__parentComponent ? el.__parentComponent : eon.getEnclosingComponent(el);
        return el.__parentComponent;
    };

    propDescriptor.set = function () { };

    Object.defineProperty(el, "parentComponent", propDescriptor);

};

eon.defineOverlayCreation = function (el) {

    // Defines the function for the element
    el.generateOverlayNode = function (overlay) {

        // If an overlay is provided we will prepare that one, otherwise we just create a new one
        overlay = overlay ? overlay : document.createElement("eon-overlay");

        // The properties assignation takes place in the onRender callback since if we assign a theme to the overlay
        // it will search a theme file for the overlay, and we just want to assign a theme so that the overlay can recieve
        // the main theme classes
        overlay.onRender(function () {

            // Assigns properties for the overlay
            overlay.owner = el;
            overlay.type = el.nodeName.toLowerCase();
            overlay.ownerId = eon.registry.getUidFull(el);

            if (el.hasAttribute("theme")) {
                overlay.setAttribute("theme", el.getAttribute("theme"));
            }

        })

        return overlay;

    };

};
eon.definePlaceholderCreation = function (el) {

    // Defines the function for the element
    el.generatePlaceholderNode = function (placeholder) {

        // If a placeholder is provided we will prepare that one, otherwise we just create a new one
        placeholder = placeholder ? placeholder : document.createElement("eon-placeholder");

        // The properties assignation takes place in the onRender callback since we want to make sure the owner has an uid for the ownerId property
        placeholder.onRender(function () {

            // Assigns properties for the overlay
            placeholder.owner = el;
            placeholder.type = el.nodeName.toLowerCase();
            placeholder.ownerId = eon.registry.getUidFull(el);

        })

        return placeholder;

    };

};

eon.collectObserveData = function (el, config) {

    el.__observeProperties = {};
    el.__observeAttributes = {};
    el.__reflectProperties = {};
    
    // Assigns each index of the array to the object
    eon.addObserveFromArray(el.__observeProperties, config.observeProperties);
    eon.addObserveFromArray(el.__observeAttributes, config.observeAttributes);

    // Reads properties object to add them to the observe object if needed
    if (config.properties) {

        var propertiesKeys = Object.keys(config.properties);

        for (i = 0; i < propertiesKeys.length; i++) {
            // Add observe to observeProperties
            if (config.properties[propertiesKeys[i]].observe) {
                el.__observeProperties[propertiesKeys[i]] = true;
            }

            // If the property has reflect active but it has no value we set an empty string
            if (config.properties[propertiesKeys[i]].reflect && !config.properties[propertiesKeys[i]].hasOwnProperty("value")) {
                config.properties[propertiesKeys[i]].value = "";
            }

            // If the property has reflect but its value is of type object we set reflect to false
            if (config.properties[propertiesKeys[i]].reflect && typeof config.properties[propertiesKeys[i]].value == "object") {
                config.properties[propertiesKeys[i]].reflect = false;
            }

            // Add reflect to observeAttributes
            if (config.properties[propertiesKeys[i]].reflect) {
                el.__observeAttributes[eon.util.camelToHyphenCase(propertiesKeys[i])] = true;
                el.__reflectProperties[propertiesKeys[i]] = true;
            }
        }
    }

    // Reads private properties object to add them to the observe object if needed
    if (config.privateProperties) {

        var privatePropertiesKeys = Object.keys(config.privateProperties);

        for (i = 0; i < privatePropertiesKeys.length; i++) {
            // Add observe to observeProperties
            if (config.privateProperties[privatePropertiesKeys[i]].observe) {
                el.__observeProperties["_" + privatePropertiesKeys[i]] = true;
            }

            // Add reflect to observeAttributes
            if (config.privateProperties[privatePropertiesKeys[i]].reflect) {
                el.__observeAttributes[eon.util.camelToHyphenCase(privatePropertiesKeys[i])] = true;
                el.__reflectProperties["_" + privatePropertiesKeys[i]] = true;
            }
        }
    }

};

eon.addObserveFromArray = function (observeObj, observeArray) {

    observeArray = observeArray ? observeArray : [];

    for (var i = 0; i < observeArray.length; i++) {
        observeObj[observeArray[i]] = true;
    }

};

eon.createAttributesObserver = function (el, config) {

    var observeAttributesKeys = Object.keys(el.__observeAttributes);

    // First we check if we have attributes to observe
    if (observeAttributesKeys.length > 0) {

        var property, privateProperty, value;

        // For each observe attribute if check which value should be assign to it
        for (var i = 0; i < observeAttributesKeys.length; i++) {

            property = eon.util.hyphenToCamelCase(observeAttributesKeys[i]);
            privateProperty = "__" + property;

            // If the attribute already has a value we assign this value to its corresponding property
            if (el.getAttribute(observeAttributesKeys[i])) {

                el[privateProperty] = el.getAttribute(observeAttributesKeys[i]);

                // If the attribute has no value we check if the property has it, if not we assign it an empty value
            } else {

                if (config.properties[property].reflectDefault) {

                    value = el.hasOwnProperty(privateProperty) ? el[privateProperty] : "";

                    // Only sets the attribute if the value is not of object type
                    if (typeof value != "object") {
                        el.setAttribute(observeAttributesKeys[i], value);
                    } else {
                        el.removeAttribute(observeAttributesKeys[i]);
                    }

                }

            }

        }

        // Here we override the setAttribute function for our element, to also call another callback when the user sets an attribute
        (function (proxied) {
            el.setAttribute = function () {
                setAttributeCallback(arguments[0], el.getAttribute(arguments[0]), arguments[1]);
                return proxied.apply(this, arguments);
            };
        })(el.setAttribute);

        // Callback to be triggered when the user calls to setAttribute
        var setAttributeCallback = function (attrName, oldVal, newVal) {

            var property = eon.util.hyphenToCamelCase(attrName);

            // The onAttributeChanged callback is triggered whether its observed or as a reflection of a property
            if (el.__observeAttributes[attrName] || el.__reflectProperties[property]) {
                eon.triggerAllCallbackEvents(el, config, "onAttributeChanged", [attrName, oldVal, newVal]);
            }

            // The onPropertyChanged callback is triggered when the attribute has changed and its reflect by a property
            if (el.__reflectProperties[property]) {
                el["__" + property] = newVal;
                eon.triggerAllCallbackEvents(el, config, "onPropertyChanged", [property, oldVal, newVal]);
            }

        };

    }

};

eon.handleProperty = function (el, config, reflectProperties, observeProperties, property) {

    var key = property.key;
    var value = property.value;

    var observe = observeProperties[key];
    var reflect = reflectProperties[key];

    // Complex property
    if (typeof value === "object" && value.hasOwnProperty("value")) {
        if (typeof value.value === "object") {
            value = Object.assign({}, value.value);
        } else {
            value = value.value;
        }
    }

    // Define property value before to avoid setting attributes onCreated if reflect
    el[key] = value;

    if (observe || reflect) {
        // Define property descriptor with custom get and set
        Object.defineProperty(
            el,
            key,
            eon.createPropDescriptor(el, config, key, value, reflect)
        );
        el["__" + key] = value;
    }
};

eon.createPropDescriptor = function (el, config, key, value, reflect) {
    var propDescriptor = {};
    // Redirect get and set to __key
    propDescriptor.get = function () {
        return el["__" + key];
    };

    propDescriptor.set = function (value) {
        if (reflect) {
            // Trigger onAttributeChanged, note this will trigger also onPropertyChanged if needed
            // Only sets the attribute if the value is not of object type
            if (typeof value != "object") {
                el.setAttribute(eon.util.camelToHyphenCase(key), value);
            } else {
                el.removeAttribute(eon.util.camelToHyphenCase(key));
            }

        } else {
            // Trigger onPropertyChanged
            eon.triggerAllCallbackEvents(el, config, "onPropertyChanged", [
                key,
                el["__" + key],
                value
            ]);
        }

        // Update property value
        el["__" + key] = value;
    };

    return propDescriptor;
};

eon.importData = function (el, config) {

    el.data = {};

    if (config.data) {
        el.data = Object.assign({}, config.data);
    }

}

eon.importLocale = function (el, config) {

    el.locale = {};

    if (config.locale) {
        el.locale = Object.assign({}, config.locale);
    }

}

eon.importPublic = function (el, config) {

    if (config.properties) {
        var keys = Object.keys(config.properties);
        var attributeKey;

        for (var i = 0; i < keys.length; i++) {
            attributeKey = eon.util.camelToHyphenCase(keys[i]);
            // If the element has one of the reflected attributes we send that value as the value of the property
            eon.handleProperty(el, config, el.__reflectProperties, el.__observeProperties, {
                key: keys[i],
                value: el.hasAttribute(attributeKey) ? el.getAttribute(attributeKey) : config.properties[keys[i]]
            });
        }
    }

    if (config.functions) {
        var keys = Object.keys(config.functions);

        for (var i = 0; i < keys.length; i++) {
            el[keys[i]] = config.functions[keys[i]];
        }
    }

};

eon.importPrivate = function (el, config) {

    if (config.privateProperties) {
        var keys = Object.keys(config.privateProperties);

        for (var i = 0; i < keys.length; i++) {
            eon.handleProperty(el, config, el.__reflectProperties, el.__observeProperties, {
                key: "_" + keys[i],
                value: config.privateProperties[keys[i]]
            });
        }
    }

    if (config.privateFunctions) {
        var keys = Object.keys(config.privateFunctions);

        for (var i = 0; i < keys.length; i++) {
            el["_" + keys[i]] = config.privateFunctions[keys[i]];
        }
    }

};

eon.importTemplateClasses = function (el) {

    var template = eon.imports.templates[el.tagName.toLowerCase()];

    if (template && template.classList.length != 0) {

        var elClassesArray = Array.prototype.slice.call(el.classList);
        var templateClassesArray = Array.prototype.slice.call(template.classList);

        elClassesArray = templateClassesArray.concat(elClassesArray);

        el.setAttribute("class", elClassesArray.join(" "));

    }


};

eon.triggerAllCallbackEvents = function (el, config, callback, params) {

    eon.debug.log("triggerAllCallbackEvents", callback);

    // This "if" is created for the porpuse of not allowing onPropertyChanged and onAttributeChanged
    // to be triggered once the element is render, this is so we dont have to use el.onRender() inside this callback to not crash
    if (!((callback == "onPropertyChanged" || callback == "onAttributeChanged") && eon.registry.isRendered(el) != true)) {

        if (config[callback]) {
            config[callback].apply(el, params);
        }

        eon.debug.log("elementEvents", callback);
        eon.triggerCallback(callback, el, el, params);

    }

};

eon.transform = function (el, config) {
    
    if (!eon.registry.isTransformed(el)) {
        
        // Gets the theme that will be used for this element, if it has none we set a default theme and return it
        // We pass the config so that if the element has themed: "false" but the element has a theme specified by the user it turns it into "true"
        var theme = eon.initElementTheme(el, config);
        var name = el.nodeName.toLowerCase();

        // Imports the template of the element
        eon.appendElementTemplate(el);

        // Registers the main theme of this theme if its not yet registered
        eon.importMainTheme(theme);

        // If the element has not yet registered its theme it will proceed on importing it
        eon.importElementTheme(config, name, theme);

        // Prepares th element to change its theme in case eon theme changes
        eon.setupEonThemeListener(el, config)

        // Adds the element to the transformQueue
        setTimeout(function () {
            eon.triggerTransformed(el, config);
        }, 0);

    }

};

eon.initElementTheme = function (el, config) {

    var theme = eon.theme;

    el.__specificTheme = el.hasAttribute("theme") || el.theme ? true : false;

    theme = document.body.dataset.theme ? document.body.dataset.theme : theme;
    theme = document.body.hasAttribute("theme") ? document.body.getAttribute("theme") : theme;
    theme = el.hasAttribute("theme") ? el.getAttribute("theme") : theme;
    theme = el.theme ? el.theme : theme;

    // If the user has specified a theme but the element is not themeable then we turn themed: "true" so
    // that it can now import a theme
    config.themed = el.__specificTheme && !config.themed ? true : config.themed;

    // Whether it has the attribute or not, we set it
    el.setAttribute("theme", theme);

    return theme;
}

eon.setupEonThemeListener = function (el, config) {

    // When eon theme changes it also changes the element's theme attribute and 
    // if the theme file is not imported it also imports it
    eon.onThemeChanged(function (previousTheme, newTheme) {

        var elementName = el.nodeName.toLowerCase();
        var elementTheme = document.body.hasAttribute("theme") != "" ? document.body.getAttribute("theme") : el.theme;
        
        // It will only change and attempt to import the new elements theme if matches the body one and 
        // if it is not strictly specified by the user
        if (elementTheme && !el.__specificTheme) {

            el.setAttribute("theme", newTheme);

            if (!eon.registry.isThemeRegistered(elementName, newTheme)) {
                eon.importElementTheme(config, elementName, newTheme);
            }

        }

    });

}

eon.slot = function (el) {

    var sourceNodes = el.getSourceNodes();
    var slotAttribute;
    var node;
    var slottedArray = [];

    // Initiates the slots object
    el._slots = {};

    for (var i = 0; i < sourceNodes.length; i++) {

        node = sourceNodes[i];

        // If the node can have attributes then we get/remove the slot one
        if (node.getAttribute) {
            slotAttribute = node.getAttribute("slot");
            node.removeAttribute("slot");
        }

        // If it hasn't been already slotted
        if (!node.__slotted) {

            // For each source node we check if it has a slot attribute and append it to its corresponding slot
            if (slotAttribute) {

                // If we have already queried this slot we just access it through the object, otherwise we call the querySelector and save its result
                el._slots[slotAttribute] = el._slots[slotAttribute] ? el._slots[slotAttribute] : el.template.querySelector(slotAttribute);

                if (el._slots[slotAttribute]) {

                    el._slots[slotAttribute].appendChild(node);
                    node.__slotted = true;

                    slottedArray.push(i);

                } else {

                    el.template.appendChild(node);

                }

            } else {

                // if it has no slot its appended to the template root.
                if (node.parentNode.isEqualNode(el.source)) {
                    el.template.appendChild(node);
                }

            }

        }

    }

};

eon.fragmentFromString = function (str) {
    // Test createContextualFragment support
    if (!("__supportsContextualFragment" in eon)) {
        try {
            document.createRange().createContextualFragment("test");
            eon.__supportsContextualFragment = true;
        } catch (error) {
            eon.__supportsContextualFragment = false;
        }
    }
    if (eon.__supportsContextualFragment) {
        return document.createRange().createContextualFragment(str);
    } else {
        var temp = document.createElement("template");
        temp.innerHTML = str;
        return temp.content;
    }
};

eon.generateElementTemplate = function (el) {
    var name = el.nodeName.toLowerCase();
    var template = eon.imports.templates[name];
    var clone = document.createElement("template");

    // All the content related checks are made to improve compatibility with browsers that do not support template
    clone.content = document.createDocumentFragment();

    if (template) {

        if (!template.content) {
            template.content = eon.fragmentFromString(template.innerHTML);
        }

        clone = template.cloneNode(true);

        if (!clone.content) {
            clone.content = eon.fragmentFromString(clone.innerHTML);
        }

    }

    el.template = clone.content;
};

eon.appendElementTemplate = function (el) {
    el.appendChild(el.template);
    delete el.template;
};

eon.initSourceCallbacks = function (el) {
    // Creates the getSourceElements function even if it has no source elements
    el.getSourceNodes = function () {
        return Array.prototype.slice.call(el.source.childNodes);
    }

    // Creates the getSourceNodes function even if it has no source nodes
    el.getSourceElements = function () {
        var sourceNodes = el.getSourceNodes();
        var sourceElements = [];
        for (var i = 0; i < sourceNodes.length; i++) {
            // NodeType 1 means its an Html element
            if (sourceNodes[i].nodeType == 1) {
                sourceElements.push(sourceNodes[i]);
            }

        }

        return Array.prototype.slice.call(sourceElements);
    }

};

eon.updateSourceCallbacks = function (el) {

    var sourceNodes = el.source.childNodes;

    sourceNodes = !sourceNodes[0] ? el.childNodes : sourceNodes;
    sourceNodes = Array.prototype.slice.call(sourceNodes);

    // Creates the getSourceElements function even if it has no source elements
    el.getSourceNodes = function () {
        return sourceNodes;
    }

    // Creates the getSourceNodes function even if it has no source nodes
    el.getSourceElements = function () {

        var sourceNodes = el.getSourceNodes();
        var sourceElements = [];

        for (var i = 0; i < sourceNodes.length; i++) {
            // NodeType 1 means its an Html element
            if (sourceNodes[i].nodeType == 1) {
                sourceElements.push(sourceNodes[i]);
            }

        }

        return Array.prototype.slice.call(sourceElements);
    }

}

eon.triggerTransformed = function (el, config) {

    eon.domReady(function () {

        // Triggered when it has imported the template, it doesnt care of the state
        // of the other elements
        eon.registry.updateElementStatus(el, "transformed");
        eon.triggerAllCallbackEvents(el, config, "onTransformed");

        // Triggered when all registered elements are transformed,
        // the execution is descendant, parent -> child
        eon.registry.addToRenderQueue(el, function () {
            eon.triggerAllCallbackEvents(el, config, "onRender");
            eon.registry.updateElementStatus(el, "rendered");
        });

        // Triggered when all registered elements are transformed,
        // the execution is ascendant, parent <- child
        eon.registry.addToBubbleRenderQueue(el, function () {
            eon.triggerAllCallbackEvents(el, config, "onBubbleRender");
            eon.registry.updateElementStatus(el, "bubbleRendered");
        });

        // This callback is meant only for the users,
        // so that they can hook when the component finished rendering
        eon.registry.addToReadyQueue(el, function () {
            eon.triggerAllCallbackEvents(el, config, "onReady");
            eon.registry.updateElementStatus(el, "ready");
        });

        // Timeout forces triggerRender to wait child onTransformed
        // When render and bubbleRender are finished, it triggers onReady
        setTimeout(function () {
            eon.registry.triggerRenders();
        }, 0);

    });

};

eon.initializeDisplay = function (el, config) {

    var name = el.nodeName.toLowerCase();
    var display = config.display ? config.display : "block";
    var ruleIndex;

    if (!eon.rules[name]) {

        ruleIndex = eon.style.sheet.insertRule(name + " { display: " + display + "; -webkit-tap-highlight-color: transparent;}", 0);
        eon.rules[name] = eon.style.sheet.cssRules[ruleIndex];

    }

    // Remove opacity 0 rule
    el.onBubbleRender(function () {
        eon.unhideElement(this);
    });

};

eon.registerResizeListeners = function (el, config) {

    // If it has onResize callback on its config we create the onResize callback
    if (config.onResize) {

        el.onReady(function () {

            eon.createCallback("onResize", el);

            eon.addResizeListener(el, el.nodeName.toLowerCase(), function () {
                eon.triggerAllCallbackEvents(el, config, "onResize", []);
            });

        });

    } else {

        // Else all eon elements will have this pseudo onResize callback, this callback will create
        // the real resize callback once its called for the first time
        el.onResize = function (callback) {
            // Once the pseudo callback has been called we set it to null so that it can create the real one
            el.onResize = null;

            eon.createCallback("onResize", el);

            // Once the element is ready, it will add the listener
            el.onReady(function () {

                eon.addResizeListener(el, el.nodeName.toLowerCase(), function () {
                    eon.triggerAllCallbackEvents(el, config, "onResize", []);
                });

                el.onResize(callback);

            });

        }

    }

    // Once the element is ready, it will add the listener
    el.onReady(function () {

        eon.createCallback("onWindowResize", el);

        eon.onResize(function () {
            eon.triggerAllCallbackEvents(el, config, "onWindowResize", []);
        }, el);

    });

};
eon.declare = function (name, baseElement) {
    
    // Specifies HTML element interface
    var baseElement = baseElement ? baseElement : HTMLElement;

    // Constructs the element class
    var elementClass = eon.constructClass(baseElement);

    // Element constructor: Important! never modify element attributes or children here
    elementClass.onCreated(function () {

        var el = this;
        
        eon.declareCallbacks(el);

        eon.generateSourceFragment(el);

        eon.initSourceCallbacks(el); 

        eon.prepareElement(el, function () {
            
            var config = eon.imports.config[el.nodeName.toLowerCase()];

            // Adds eon element default config properties and functions 
            eon.parse(el, config);

            // Generates an instance of the element template and assigns it as a property of the element so we can easily access from anywhere
            eon.generateElementTemplate(el);

            // Sets a css rule with the provided display by the config, if no display is provided it will have display block by default
            eon.initializeDisplay(el, config);
            
            eon.triggerAllCallbackEvents(el, config, "onCreated");
            eon.registry.updateElementStatus(el, "created");
            
        });
        
        eon.registry.updateElementStatus(el, "declared");

    });

    elementClass.onAttached(function () {

        var el = this;

        el.onCreated(function () {

            var config = eon.imports.config[el.nodeName.toLowerCase()];

            // TODO: should also provide attribute check
            if (el.isFirstAttach) {
                
                el.isFirstAttach = false;

                eon.importTemplateClasses(el);

                eon.hideElement(el);

                // If it has an observer for the declaration of the element we disconnect it as we will no longer need it
                if (el.__onCreatedObserver) {
                    el.__onCreatedObserver.disconnect();
                }

                // Registers the element and generates uid
                eon.registry.registerElement(el);

                eon.createAttributesObserver(el, config);

                // Updates the references for the source nodes
                eon.updateSourceCallbacks(el);
                
                // Moves source-template elements to eon-template-clone elements by slot attribute query selector string
                // Unslotted source-template elements will be appended to eon-clone root
                // Note dynamic things that should be slotted must be added onCreated
                eon.slot(el);
                
                // Callback for the first time that the element has been attached, no template imported, only created and parsed
                eon.triggerAllCallbackEvents(el, config, "onInit");

                // Interpolation data bind
                eon.interpolation.init(el, config);

                // Creates the on resize callbacks handler for the element
                eon.registerResizeListeners(el, config);

                // Begins the transformation process
                eon.transform(el, config);

            }

            eon.triggerAllCallbackEvents(el, config, "onAttached");

            eon.registry.updateElementStatus(el, "attached");
            eon.debug.log("adapterEvents", "onAttached");

        });

    });

    elementClass.onDetached(function () {
        this.__parentComponent = null;
    });

    elementClass.onAttributeChanged(function (attrName, oldVal, newVal) {

    });

    customElements.define(name, elementClass);

};

eon.createPropertyObserver = function (property, obj, callback, pollingRate) {
  if (typeof pollingRate == "undefined") {
    pollingRate = 300;
  }
  obj.propertyObservers = obj.propertyObservers || {};
  var startObserver = false;
  if (!obj.propertyObservers[property]) {
    obj.propertyObservers[property] = {
      value: obj[property],
      callbacks: [],
      observer: null
    };
    startObserver = true;
  }
  // Add new callback to callbacks array
  obj.propertyObservers[property].callbacks.push(callback);
  // Start observing if needed
  if (startObserver) {
    var args;
    obj.propertyObservers[property].observer = setInterval(function () {
      if (obj.propertyObservers[property].value != obj[property]) {
        //  De-reference oldValue if its type is object
        if (typeof obj.propertyObservers[property].value == "object") {
          args = [
            property,
            Object.assign({}, obj.propertyObservers[property].value),
            obj[property]
          ];
        } else {
          args = [
            property,
            obj.propertyObservers[property].value,
            obj[property]
          ];
        }
        // Update stored value
        obj.propertyObservers[property].value = obj[property];
        // Trigger callback with scope and args
        for (
          var i = 0;
          i < obj.propertyObservers[property].callbacks.length;
          i++
        ) {
          obj.propertyObservers[property].callbacks[i].apply(obj, args);
        }
      }
    }, pollingRate);
  }
};

eon.removePropertyObserver = function (property, obj) {
  if (obj.propertyObservers && obj.propertyObservers[property]) {
    // Clear interval
    window.clearInterval(obj.propertyObservers[property].observer);
    // Delete propertyObservers. property
    delete obj.propertyObservers[property];
  }
};



eon.time = eon.time || {};

eon.time.isLeapYear = function (year) {
  return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
};

eon.time.getDaysInMonth = function (year, month) {
  return [31, eon.time.isLeapYear(parseInt(year)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][parseInt(month)];
};

eon.time.getMonthNames = function (locale, format) {
  var monthNames = [];
  format = format ? format : "long";
  for (var i = 0; i <= 11; i++) {
    monthNames.push(eon.time.getMonthName(locale, i, format));
  }
  return monthNames;
};

eon.time.getMonthName = function (locale, month, format) {
  var dummyDate = new Date(2000, month, 15);
  format = format ? format : "long";
  return dummyDate.toLocaleString(locale, { month: format });
};

eon.time.getWeekDays = function (locale, format) {
  var dayNames = [];
  var dummyDate;
  format = format ? format : "long";
  for (var i = 1; i <= 7; i++) {
    dummyDate = new Date(2000, 4, i);
    dayNames.push(dummyDate.toLocaleString(locale, { weekday: format }));
  }
  return dayNames;
};

eon.time.getWeekDay = function (year, month, day) {
  return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][new Date(year, month, day).getDay()];
};

eon.time.getFirstWeekDay = function (locale, year, month, format) {
  var dummyDate = new Date(year, month, 1);
  format = format ? format : "long";
  return dummyDate.toLocaleString(locale, {
    weekday: format
  });
};

eon.time.getFirstWeekMonday = function (locale, year, month, format) {
  var monDay, monthDays;
  var firstWeekDay = eon.time.getFirstWeekDay(locale, year, month, format);
  var weekPosition = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].indexOf(firstWeekDay);
  // Check first month reached
  if (month == 0) {
    month = 11;
    year--;
  } else {
    month--;
  }
  // Get previous month days
  monthDays = eon.time.getDaysInMonth(year, month);
  monDay = (monthDays + 1) - weekPosition;
  return monDay;
};

eon.time.getDateWithFormat = function (date, format, locale) {
  var dayFormat = format.match(/[d|D]{1,2}/)
    ? format.match(/[d|D]{1,2}/)[0]
    : undefined;
  var monthFormat = format.match(/[M]{1,4}/)
    ? format.match(/[M]{1,4}/)[0]
    : undefined;
  var yearFormat = format.match(/[y|Y]{2,4}/)
    ? format.match(/[y|Y]{2,4}/)[0]
    : undefined;
  var dayType, monthType, yearType, dayString, monthString, yearString;
  if (yearFormat) {
    yearType = yearFormat.length > 1 ? "numeric" : "2-digit";
    yearString = formatedMonth = date.toLocaleString([locale], {
      year: yearType
    });
    format = format.replace(yearFormat, yearString);
  }
  if (dayFormat) {
    dayType = dayFormat.length > 1 ? "2-digit" : "numeric";
    dayString = formatedMonth = date.toLocaleString([locale], {
      day: dayType
    });
    format = format.replace(dayFormat, dayString);
  }
  if (monthFormat) {
    switch (monthFormat.length) {
      case 1:
        monthType = "numeric";
        break;
      case 3:
        monthType = "short";
        break;
      case 4:
        monthType = "long";
        break;
      default:
        monthType = "2-digit";
    }
    monthString = formatedMonth = date.toLocaleString([locale], {
      month: monthType
    });
    format = format.replace(monthFormat, monthString);
  }
  return format;
};

eon.time.getFormatSeparator = function (format) {

  var dayFormat = (format.match(/[d|D]{1,2}/)) ? format.match(/[d|D]{1,2}/)[0] : undefined;
  var monthFormat = (format.match(/[M]{1,4}/)) ? format.match(/[M]{1,4}/)[0] : undefined;
  var yearFormat = (format.match(/[y|Y]{2,4}/)) ? format.match(/[y|Y]{2,4}/)[0] : undefined;

  format = format.replace(dayFormat, "");
  format = format.replace(monthFormat, "");
  format = format.replace(yearFormat, "");

  return format[0];

};

eon.time.getDateObjectFromString = function (value, format) {

  var el = this;

  var separator = eon.time.getFormatSeparator(format);

  var dayFormat = (format.match(/[d|D]{1,2}/)) ? format.match(/[d|D]{1,2}/)[0] : undefined;
  var monthFormat = (format.match(/[M]{1,4}/)) ? format.match(/[M]{1,4}/)[0] : undefined;
  var yearFormat = (format.match(/[y|Y]{2,4}/)) ? format.match(/[y|Y]{2,4}/)[0] : undefined;

  var splittedValue = value.split(separator);
  var splittedFormat = format.split(separator);

  var dayIndex = splittedFormat.indexOf(dayFormat);
  var monthIndex = splittedFormat.indexOf(monthFormat);
  var yearIndex = splittedFormat.indexOf(yearFormat);

  return { day: splittedValue[dayIndex], month: splittedValue[monthIndex], year: splittedValue[yearIndex] };

};

eon.time.generateOutput = function (dateObj, format) {

  var dayFormat = (format.match(/[d|D]{1,2}/)) ? format.match(/[d|D]{1,2}/)[0] : undefined;
  var monthFormat = (format.match(/[M]{1,4}/)) ? format.match(/[M]{1,4}/)[0] : undefined;
  var yearFormat = (format.match(/[y|Y]{2,4}/)) ? format.match(/[y|Y]{2,4}/)[0] : undefined;

  var formatFn = function (text, format) {

    text = text ? text + "" : "";

    if (text.length > 0 && text.length < format.length) {
      for (var i = 0; i < (format.length - text.length); i++) {
        text = "0" + text;
      }
    }

    return text;

  };

  if (dateObj.day) {

    var day = formatFn(dateObj.day, dayFormat);
    format = format.replace(dayFormat, day);

  }

  if (dateObj.month) {

    var month = formatFn(dateObj.month, monthFormat);
    format = format.replace(monthFormat, month);

  }

  if (dateObj.year) {

    var year = formatFn(dateObj.year, yearFormat);
    format = format.replace(yearFormat, year);

  }

  return format;

};

eon.time.defaultLocale = {

  months: {

    long: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    short: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  },

  weekdays: {

    long: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    short: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    min: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]

  }

};


// Creates a namespace for requirejs
eon.resizeObserver = eon.resizeObserver || {};

(function () {
  
  eon.resizeObserver = function (callback) {
  var elm = this;

  elm.observe = function (el) {
    if (elm.observables.some(function (observable) {
      return observable.el === el;
    })) {
      return;
    }
    var newObservable = {
      el: el,
      size: {
        height: el.clientHeight,
        width: el.clientWidth
      }
    }
    elm.observables.push(newObservable);
  }

  elm.unobserve = function (el) {
    elm.observables = elm.observables.filter(function (obj) {
      return obj.el !== el;
    });
  }

  elm.disconnect = function () {
    elm.observables = [];
  }

  elm.check = function () {
    var changedEntries = elm.observables.filter(function (obj) {
      var currentHeight = obj.el.clientHeight;
      var currentWidth = obj.el.clientWidth;
      if (obj.size.height !== currentHeight || obj.size.width !== currentWidth) {
        obj.size.height = currentHeight;
        obj.size.width = currentWidth;
        return true;
      }
    }).map(function (obj) {
      return obj.el;
    });
    if (changedEntries.length > 0) {
      elm.callback(changedEntries);
    }
    window.requestAnimationFrame(elm.boundCheck);
  }
  //  class ResizeObserver {
  function constructor(callback) {
    elm.observables = [];
    // Array of observed elements that looks like el:
    // [{
    //   el: domNode,
    //   size: {height: x, width: y}
    // }]
    elm.boundCheck = elm.check.bind(elm);
    elm.boundCheck();
    elm.callback = callback;
  }
  constructor(callback);
}
}).apply(eon);


/**
*
* @param {[type]} element [description]
* @param {[type]} key [description]
* @param {Function} callback [description]
* @return {[type]} [description]
*/
eon.addResizeListener = function (element, key, fn) {

if ('ResizeObserver' in window) {

element.__resizeObservers = element.__resizeObservers || {};

// If there is already a resizeObserver with that key,
// we disconnect/delete it, and create a new one with the provided callback
if (element.__resizeObservers[key]) {
element.__resizeObservers[key].disconnect();
delete element.__resizeObservers[key];
}

// Creates the resizeObserver for the element with the provided callback
element.__resizeObservers[key] = new ResizeObserver(fn);
element.__resizeObservers[key].observe(element);

} else {

eon.onReady(function () {

element._resizeMutationObservers = element._resizeMutationObservers || {};

// If there is already a resizeListener with that key,
// we remove it, and create a new one with the provided callback
if (element._resizeMutationObservers[key]) {
element._resizeMutationObservers[key].disconnect();
delete element._resizeMutationObservers[key]; 
}

// Creates the resizeObserver for the element with the provided callback
element._resizeMutationObservers[key] = new eon.resizeObserver(fn);
element._resizeMutationObservers[key].observe(element);

});

}

};

/**
*
* @param {[type]} element [description]
* @param {[type]} key [description]
* @return {[type]} [description]
*/
eon.removeResizeListener = function (element, key) {

if ('ResizeObserver' in window) {

// Checks if the key already exists and disconnects/deletes it
if (element.__resizeObservers[key]) {
element.__resizeObservers[key].disconnect();
delete element.__resizeObservers[key];
}

} else {

// Checks if there is a resizeListener with that key and removes it
if (element._resizeMutationObservers[key]) {
element._resizeMutationObservers[key].disconnect();
delete element._resizeMutationObservers[key];
}

}

};

eon.util = eon.util || {};
/**
 * Set first string character to upper case
 * @param  {[type]} str [description]
 * @return {[type]}     [description]
 */
eon.util.firstToUpperCase = function (str) {
  return str.substring(0, 1).toUpperCase() + str.substring(1);
}
/**
 * Set first string character to lower case
 * @param  {[type]} str [description]
 * @return {[type]}     [description]
 */
eon.util.firstToLowerCase = function (str) {
  var first = str.substring(0, 1);
  var low = str.substring(0, 1).toLowerCase();
  return low + str.substring(1, str.length);
};
/**
 * Replaces the camel cases for hyphens
 * @param  {[type]} str [description]
 * @return {[type]}     [description]
 */
eon.util.camelToHyphenCase = function (str) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
};
/**
 * Replaces the hyphens cases for camels
 * @param  {[type]} str [description]
 * @return {[type]}     [description]
 */
eon.util.hyphenToCamelCase = function (str) {
  return str.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
};
/**
 * Parse query params to object
 * @param  {[type]} url [description]
 * @return {[type]}     [description]
 */
eon.util.queryToObject = function (url) {
  var obj = {};
  // Get query params substring from url
  var paramsStr = url.split("?")[1];
  if (paramsStr) {
    paramsStr = paramsStr.split("#")[0];
    // Store each params into an array
    var paramsArray = paramsStr.split("&");
    for (var i = 0; i < paramsArray.length; i++) {
      var paramStr = paramsArray[i];
      // Store query param as an object property
      obj[paramStr.split("=")[0]] = paramStr.split("=")[1];
    }
  }
  return obj;
};
/**
 * Parse params object to query string
 * @param  {[type]} obj [description]
 * @return {[type]}      [description]
 */
eon.util.objectToQuery = function (obj) {
  var queryStr = "";
  var keyIndex = 0;
  for (var key in obj) {
    // Check first parameter added
    if (keyIndex > 0) {
      // Build string with query parameters separator
      queryStr += "&" + key + "=" + obj[key];
    } else {
      // Build string without query parameters separator
      queryStr += key + "=" + obj[key];
    }
    keyIndex++;
  }
  return queryStr;
};
/**
 * Replace or add params to specified url
 * @param  {[type]} url [description]
 * @param  {[type]} paramsObj [description]
 * @return {[type]}      [description]
 */
eon.util.replaceParam = function (url, paramsObj) {
  // Convert url params into a manipulable object
  var queryObj = this.queryToObject(url);
  // Replace or add query param
  for (var key in paramsObj) {
    queryObj[key] = paramsObj[key];
  }
  // Return url with its parameters updated
  var newUrl = url.split("?")
    ? url.split("?")[0] + "?" + this.objectToQuery(queryObj)
    : url + "?" + this.objectToQuery(queryObj);
  return newUrl;
};
/**
 * Replace or add params to specified url
 * @param  {[type]} url [description]
 * @param  {[type]} paramsObj [description]
 * @return {[type]}      [description]
 */
eon.util.getBrowser = function () {
  var browserName;
  // Internet Explorer 6-11
  if (document.documentMode) {
    browserName = "IE";
  }
  // Edge 20+
  if (!document.documentMode && window.StyleMedia) {
    browserName = "Edge";
  }
  // Chrome 1+
  if (window.chrome && navigator.userAgent.indexOf("Chrome") > -1 && browserName !== "Edge") {
    browserName = "Chrome";
  }
  // Firefox 1.0+
  if (typeof InstallTrigger !== "undefined") {
    browserName = "Firefox";
  }
  // Safari
  if (!window.chrome && navigator.userAgent.indexOf("Safari") > -1) {
    browserName = "Safari";
  }
  // TODO - ** Test in Opera**
  if (
    (window.opr && opr.addons) ||
    window.opera ||
    navigator.userAgent.indexOf(" OPR/") >= 0
  ) {
    browserName = "Opera";
  }
  return browserName;
};

/**
 * Replace or add params to specified url
 * @param  {[type]} url [description]
 * @param  {[type]} paramsObj [description]
 * @return {[type]}      [description]
 */
eon.util.getBrowserScrollBarWidth = function () {

  if (!eon.__browserScrollBarWidth) {

    var outer = document.createElement("div");
    outer.style.visibility = "hidden";
    outer.style.width = "100px";
    outer.style.msOverflowStyle = "scrollbar"; // needed for WinJS apps

    document.body.appendChild(outer);

    var widthNoScroll = outer.getBoundingClientRect().width;
    // force scrollbars
    outer.style.overflow = "scroll";

    // add innerdiv
    var inner = document.createElement("div");
    inner.style.width = "100%";
    outer.appendChild(inner);

    var widthWithScroll = inner.getBoundingClientRect().width;

    // remove divs
    outer.parentNode.removeChild(outer);

    // Creates a listener for the window resize to handle the zoom in/out of the browser that may affect the scroll bar width
    if (!eon.__browserScrollBarWidthListener) {
      window.addEventListener("resize", function () {
        delete eon.__browserScrollBarWidth;
      });
    }

    eon.__browserScrollBarWidth = widthNoScroll - widthWithScroll;
    eon.__browserScrollBarWidthListener = true;

  }

  return eon.__browserScrollBarWidth;

};

eon.util.isTrue = function (a) {
  return a == true || a == "true";
};

eon.util.isTouchScreen = function () {
  return "ontouchstart" in window;
};

eon.ajax = function (url, options, cb) {
  options = options || {};
  options.method = options.method ? options.method.toUpperCase() : "GET";
  options.querySeparator = options.querySeparator || "?";
  options.paramSeparator = options.paramSeparator || "&";
  options.payload = options.payload || null;
  options.async = options.async || null;
  options.user = options.user || null;
  options.password = options.password || null;
  options.cacheBusting = "cacheBusting" in options ? options.cacheBusting : false;

  url = options.cacheBusting? eon.getCacheBustedUrl(url) : url;

  var xhr = options.xhr || new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (this.readyState == 4) {
      var success = this.status >= 200 && this.status < 300;
      if(cb) {
        cb(success, {
          url: url,
          method: options.method,
          xhr: this,
          status: this.status,
          response: this.response,
          responseText: this.responseText
        });
      }
    }
  };

  if (options.params) {
    var paramsKeys = Object.keys(options.params);
    if (paramsKeys.length > 0) {
      url += options.querySeparator + paramsKeys[0] + "=" + options.params[paramsKeys[0]];
      for (var i = 1; i < paramsKeys.length; i++) {
        url += options.paramSeparator + paramsKeys[i] + "=" + options.params[paramsKeys[i]];
      }
    }
  }

  if (options.async || options.user || options.password) {
    xhr.open(options.method, url, options.async, options.user, options.password);
  } else {
    xhr.open(options.method, url);
  }

  if (options.contentType) {
    xhr.setRequestHeader("Content-Type", options.contentType);
  }

  if (options.headers) {
    for (var header in options.headers) {
      xhr.setRequestHeader(header, options.headers[header]);
    }
  }
  xhr.send(options.payload);
};

eon.setLocale = function (url, options) {

  options = options ? options : {};

  eon.ajax(url, options, function(success, obj) {
    
    if (success) {
      
      var jsonObj = JSON.parse(obj.responseText);

      if (jsonObj) {
        eon.interpolation.globalScope.locale = jsonObj;
      }

    }

  });

};

/**
 * 
 * @param  {[type]}  [description]
 */
eon.util.arrayToMap = function (array) {
  var map = new Map();

  for (var i = 0; i < array.length; i++) {
    map.set(i.toString(), array[i]);
  }

  return map;
};

/**
 * 
 * @param  {[type]}  [description]
 */
eon.util.objectToMap = function (object) {
  var map = new Map();

  for(var key in object){
    map.set(key, object[key]);
  }

  return map;
};
/**
 * Get Map Js Object representation
 * @param  {[type]}  [description]
 */
eon.util.mapToObject = function (map) {
  var obj = Object.create(null);
  map.forEach(function (value, key, mapObj) {
    mapObj[key] = value;
});
  return obj;
};


/**
 * :::::::::::::::::::::
 * Progressive Web App
 * :::::::::::::::::::::
 * 
 * > Home screen access - manifest.json
 * > Offline mode - service-worker.js
 * 
 * *** SERVICE WORKERS *** 
 * . Service Worker is an experimental technology. New browsers versions are supporting it
 * by default but its functionality is not guaranteed for now.
 *  
 * . An HTTPS implementation is needed to work with service workers.
 * Localhost is considered a secure origin by browsers as well
 * 
 * ***************************
 * 
 */

eon.cache = eon.cache || {};

eon.cache.config = eon.cache.config || {};

 // Check if eon has any cache strategy
 if ('serviceWorker' in navigator && Object.keys(eon.cache.config).length) {
  // Check service worker existence
  (function (proxied) {
    ServiceWorkerContainer.prototype.register = function () {

      this._registered = true;

      return proxied.apply(this, arguments);
    };
  })(ServiceWorkerContainer.prototype.register);

  eon.onReady(function () {
    // Check service worker existence
    if(!navigator.serviceWorker._registered) {

      // Register eon service worker
      navigator.serviceWorker
        .register(eon.basePath + '/modules/cache-sw.js')
        .then(function () {
          console.log('[ServiceWorker] Registered');
      });

    }
  });
}

eon.cache.open = function (cb) {

  eon.cache.config.name = eon.cache.config.name || "eon-cache";

  // Check browser cache storage existence
  if ('caches' in window) {

    // Create cache
    caches.open(eon.cache.config.name).then(function (cache) {
      // Cache config
      cb(null, cache);
    });

  }
}

eon.cache.add = function (request, options, cb) {
  var config = eon.cache.config;

  // Conditions
  var excluded = config.exclude && (options && config.exclude.indexOf(options.name) > -1);
  var requestAll = config.requests && config.requests.indexOf("*") > -1;
  var included = requestAll || !options || (options && config.requests && config.requests.indexOf(options.name) > -1);

  // Check cache config
  if (!excluded && included) {
    // Check eon-cache reference existence
    if (!eon.cache.ref) {
      eon.cache.open(function (error, cache) {
        eon.cache.ref = eon.cache.ref || cache;
        // Check if the file has been cached already
        cache.match(request).then(function (cached) {
          if(!cached) {
            cache.add(request).then(function () {    
              if (cb) { cb(null, request) }
            });
          }
        });
      });
    }
  }
}

eon.history = eon.history || {};

eon.history.location = {};

eon.history.location.origin = window.location.origin;
eon.history.location.href = window.location.href;
eon.history.location.state = window.location.hash || window.location.pathname.split("/")[1];
eon.history.location.params = eon.util.queryToObject(window.location.href);
eon.history.current = window.location.pathname.substring(1);
eon.history.states = {};
eon.history.cancelNavigation = false;

eon.history.push = function (obj, url, title) {
  if (!eon.history.cancelNavigation) {
    history.pushState(obj, url, title);
    eon.history.getURLInformation();
    eon.history.states[eon.history.current] = url;
  }
};
eon.history.replace = function (obj, url, title) {
  if (!eon.history.cancelNavigation) {
    history.replaceState(obj, url, title);
    delete eon.history.states[eon.history.current];
    eon.history.getURLInformation();
    eon.history.states[eon.history.current] = url;
  }
};

// Create on URL hash changed callback
eon.createCallback("onHashChanged", eon.history);

// Wrap window on pop state event
window.onpopstate = function () {
  eon.history.getURLInformation();
  eon.triggerCallback("onHashChanged", eon.history, eon.history, [eon.history]);
};

/*
  @function getURLInformation
  @description Save window location object information
*/
eon.history.getURLInformation = function () {
  eon.history.location.origin = window.location.origin;
  eon.history.location.state = window.location.history || window.location.pathname.substring(1);
  eon.history.location.params = eon.util.queryToObject(window.location.href);
  eon.history.current = window.location.hash ? window.location.pathname.substring(1) + window.location.hash
    : window.location.pathname.substring(1);
};

eon.store = function () {
  var el = this;
  /* Resources representation */
  this.data = {};

  // Create useful callbacks
  createCallbacks();

  // Import Memory Adapter
  importAdapter();
  
  /* 
      ##########
      Private Functions
      ##########
  */
  /*
      @function _createCallbacks
      @description 
  */
  function createCallbacks() {
    eon.createCallback("onLoaded", el, "ready");
    eon.createCallback("onDataChanged", el);
  }
  /*
      ** TO BE REMOVED
      @function importAdapter
      @description 
  */
  function importAdapter() {
    // Clone adapter functions
    cloneFunctions(new eon.data.MemoryAdapter());
    // Store data access
    createDataDescriptor();
    // Trigger user callback once VPA has been loaded
    eon.triggerCallback("onLoaded", el, el, [el]);

  };
  /*
      @function (private) _cloneFunctions
      @description 
  */
  function cloneFunctions(adapter) {
    // Clone adapter data object
    Object.assign(el, adapter);
    // Get BaseAdapter prototype functions
    Object.assign(el, adapter.constructor.prototype);
  };
  /*
      @function (private) _createDataDescriptor
      @description 
  */
  function createDataDescriptor() {
    // Define property descriptor with custom get and set 
    Object.defineProperty(
      el,
      "data",
      {
        get: function () {
          return el._memory.data;
        },
        set: function (value) {
          // Update property value
          el._memory.data = value;
          // Fire data changed event
          eon.triggerCallback("onDataChanged", el, el, [el.data]);
        }
      }
    );
  }
}


eon.endpoint = function (type, url) {
  var el = this;
  /* Endpoint standard type */
  this.type = type;
  /* Resources root url */
  this.composedURL = "";
  /* Resources url */
  this.url = url;
  /* GraphQL Web Sockets based use only */
  this.socket = type == "graphSockets" && !this.socket ? new WebSocket(this.url) : this.socket;
  this.socket = ~["WebSockets", "graphSockets"].indexOf(type) ? new WebSocket(this.url) : this.socket;

  /* 
      ##########
      Functions
      ##########
  */

  // -- REST API --

  /*
    @function get
    @description Read data resource // Read all data resources
  */
  this.get = type == "rest" ? function (id, cb) {
    // Check resource id and set url
    el.composedUrl = el.url;
    el.composedUrl += id ? "/" + id : "";
    // Set up request
    var options = {
      method: "GET"
    };
    // Send request
    eon.ajax(el.composedUrl, options, cb);
  } : this.get;
  /*
    @function put
    @description Overwrite data resource // create if not exists
  */
  this.put = type == "rest" ? function (id, data, cb) {
    // Check resource id and set url
    el.composedUrl = el.url;
    el.composedUrl += id ? "/" + id : "";
    if (id) {
      // Set up request
      var options = {
        method: "PUT",
        payload: data
      };
      // Send request
      eon.ajax(el.composedUrl, options, cb);
    } else {
      console.error('No resource id found');
    }
  } : this.put;
  /*
    @function post
    @description Create data resource
  */
  this.post = type == "rest" ? function (data, cb) {
    // Check resource id and set url
    if (data) {
      // Set up request
      var options = {
        method: "POST",
        payload: data
      };
      // Send request
      eon.ajax(el.url, options, cb);
    } else {
      console.error('No resource data found');
    }
  } : this.post;
  /*
    @function delete
    @description Delete data resource
  */
  this.delete = type == "rest" ? function (id, cb) {
    // Check resource id and set url
    el.composedUrl = el.url;
    el.composedUrl += id ? "/" + id : "";
    if (id) {
      // Set up request
      var options = {
        method: "DELETE"
      };
      // Send request
      eon.ajax(el.composedUrl, options, cb);
    } else {
      console.error('No resource id found');
    }
  } : this.delete;

  // -- Web Sockets --

  /*
    @function send
    @description Send data
  */
  this.send = type == "WebSockets" ? function (data) {
    el.socket.send(data);
  } : this.send;

  /*
    @function onMessage
    @description On socket data received
  */
  this.onMessage = function (cb) {
    // Server response listener
    el.socket.onmessage = function (event) {
      // TODO Handle response messages
      cb(true, event);
    };
  };

  // -- GraphQL --

  /*
    @function send
    @description Query data source
  */
  this.send = type == "graphHTTP" ? function (queryString, cb) {
    el.query(queryString, cb);
  } : this.send;
  /*
    @function query
    @description Query data source
  */
  this.query = type == "graphHTTP" ? function (queryString, cb) {
    graphHTTPQuery(queryString, cb);
  } : this.query;
  /*
    @function mutation
    @description Update data source
   */
  this.mutation = type == "graphHTTP" ? function (queryString, cb) {
    graphHTTPMutation(queryString, cb);
  } : this.query;
  /*
    @function subscribe
    @description Subscribe
   */
  this.subscribe = type == "graphSockets" ? function (queryString, cb) {
    // Check graphQL protocol based on
    graphSocketsSubscription(queryString, cb);
  } : this.subscribe;
 
  /* 
      #################
      Private Functions
      #################
  */

  // -- GraphQL HTTP API --

  // Query call HTTP based
  function graphHTTPQuery(queryString, cb) {
  
    // Validate query string 
    if (queryString) {
      // Set up request
      var options = {
        method: "GET",
        contentType: "application/json",
        payload: "query:" +  queryString
      };
      // Send request
      eon.ajax(el.url, options, cb);
    }
  }
  // Mutation call HTTP based
  function graphHTTPMutation(queryString, cb) {
    // Validate mutation string 
    if (queryString) {
      // Set up request
      var options = {
        method: "POST",
        payload: "mutation:" + queryString
      };
      // Send request
      eon.ajax(el.url, options, cb);
    }
  }

  // -- GraphQL Web Sockets API --

  // Query call Web Sockets based
  function graphSocketsSubscription(queryString) {
    el.socket.send("subscription:" + queryString);
  }
}

eon.data = eon.data || {};

eon.data.MemoryAdapter = function () {
  // eon.vpa.declareAdapter("MemoryAdapter", function (config) {
  var memory = {}; // Memory itself
  memory.data = new Map(); // Where data will be stored
  var counter = 0;

  // @function create (private) [Create a new entry to the memory object with given data] @param query
  function create(query) {
    return new Promise(function (resolve, reject) {
      if (query.data) {
        var id;
        if (query.data.id) {
          id = query.data.id;
        }
        else {
          // ** Check if some data has already been inserted
          counter = memory.data.size ? memory.data.size + 1 : 0;
          id = counter;
          query.data.id = "" + id;
          counter++;
        }
        var validated = validate(query);
        if (validated) {
          memory.data.set(id, validated);
          resolve(validated);
        }
        else {
          reject(new Error("Validation error"));
        }
      }
      else {
        reject(new Error("Data not found"));
      }
    });
  }
  // @function read (private) [Read from memory or list if no id given] @param query
  function read(query) {
    return new Promise(function (resolve, reject) {
      // Check id value
      if (query.id) {
        if (memory.data.get(query.id)) {
          resolve(memory.data.get(query.id));
        } else {
          reject(new Error("Not found"));
        }
      } else {
        var keys;
        var result = new Map();
        // Sort data before get range
        if (query.sortField) {
          var asc = 1;
          if (query.sortRule && ~["descending", "desc"].indexOf(query.sortRule)) {
            asc = -1;
          }
          keys = sortArray(memory.data, query.sortField, asc);
        }
        // Check ranges
        var start = query.limitStart || 0;
        var end = (query.limitAmount + query.limitStart) || memory.data.size;
        end = end > memory.data.size ? memory.data.size : end;

        if (!keys) {
          keys = [];
          // Store map keys
          memory.data.forEach(function (value, key, map) {
            keys.push(key);
          });
        }
        // Build sorted map
        for (var i = start; i < end; i++) {
          // Check keys sorted 
          if (query.sortField) {
            result.set(keys[i].key, memory.data.get(keys[i].key));
          } else {
            result.set(keys[i], memory.data.get(keys[i]));
          }
        }
        resolve(result);
      }
    });
  }
  // @function update (private) [Update an existing entry from memory] @param query
  function update(query) {
    return new Promise(function (resolve, reject) {
      // Check null values
      if (query.id) {
        if (query.data) {
          // Check update target
          if (memory.data.get(query.id)) {
            // Merge current and new data
            query.data = deepMerge(memory.data.get(query.id), query.data);
            var validated = validate(query);
            if (validated) {
              // Set new validated data entry
              memory.data.set(query.id, validated);
              resolve(validated);
            }
            else {
              reject(new Error("Validation error"));
            }
          }
          else {
            reject(new Error("Id doesn't exist"));
          }
        }
        else {
          reject(new Error("Data not found"));
        }
      }
      else {
        reject(new Error("Id not found"));
      }
    });
  }
  // @function delete (private) [Delete from memory] @param query
  function remove(query) {
    return new Promise(function (resolve, reject) {
      // Check null values
      if (query.id) {
        // Check remove target
        if (memory.data.get(query.id)) {
          var result = memory.data.get(query.id);
          memory.data.delete(query.id);
          resolve(result);
        }
        else {
          reject("Id not found");
        }
      }
      else {
        // Remove all entries
        var result = memory;
        // Safe clear object and its copy baseAdapter._memory
        memory.data.forEach(function (value, key, map) {
          memory.data.delete(key);
        });
        resolve(result);
      }
    });
  }
  // @function sortArray (private) [Sort an array of objects] @param array @param key @param asc (number) [1 if ascendant, -1 if descendant]
  function sortArray(data, field, asc) {
    // ** IMPROVE
    var array = [];
    // Store map keys
    data.forEach(function (value, key, map) {
      array.push({
        key: key,
        field: data.get(key)[field]
      });
    });
    // Check ascending value
    asc = asc || 1;
    // Sort comparing function
    function compare(a, b) {
      if (a.field < b.field) {
        return -1 * asc;
      }
      else if (a.field > b.field) {
        return 1 * asc;
      }
      else {
        return 0;
      }
    }
    // Sort map keys
    array.sort(compare);
    return array;
  }
  // @function validate(private) [Not implemented yet] @param query
  function validate(query) {
    if (query.validate) {
      // Do something
    }
    return query.data;
  }
  // @function deepMerge (private) [Merge two objects] @param args
  var deepMerge = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    var merged = {};
    var merge = function (obj) {
      for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          if (obj[prop] && typeof obj[prop] == 'object') {
            merged[prop] = deepMerge(merged[prop], obj[prop]);
          }
          else {
            merged[prop] = obj[prop];
          }
        }
      }
    };
    for (var i = 0; i < arguments.length; i++) {
      var obj = arguments[i];
      merge(obj);
    }
    return merged;
  };
  var queryHandler = function (adapterData) {
    var baseQuery = eon.vpa.createBaseQuery(adapterData);
    baseQuery.result = function (cb) {
      var query = baseQuery.query;
      var result;
      var error;
      switch (query.action) {
        case "create":
          create(query).then(function (data) {
            result = data;
            cb(error, result);
          }).catch(function (er) {
            error = er;
            cb(error, result);
          });
          break;
        case "read":
          read(query).then(function (data) {
            result = data;
            cb(error, result);
          }).catch(function (er) {
            error = er;
            cb(error, result);
          });
          break;
        case "update":
          update(query).then(function (data) {
            result = data;
            cb(error, result);
          }).catch(function (er) {
            error = er;
            cb(error, result);
          });
          break;
        case "delete":
          remove(query).then(function (data) {
            result = data;
            cb(error, result);
          }).catch(function (er) {
            error = er;
            cb(error, result);
          });
          break;
      }
    };
    return baseQuery;
  };
  var baseAdapter = eon.vpa.createBaseAdapter(queryHandler);
  baseAdapter._memory = memory;
  return baseAdapter;
}



eon.validator = eon.validator || {};
eon.validator.schemas = eon.validator.schemas = {};
eon.validator.defaultErrorMessage = "Does not meet the requirements.";

eon.validator.addSchema = function (id, schema) {
    if (schema) {
        // Saves the schema with the given id
        eon.validator.schemas[id] = schema;
    }
}

eon.validator.containsSchema = function (id) {
    // Returns whether there is already a schema id or not
    return eon.validator.schemas[id] ? true : false;
}

eon.validator.validate = function (data, schema) {

    // If the parameter is a string then we assume its the id of the schema, else we take for granted its a schema object
    schema = schema.constructor === String ? eon.validator.schemas[schema] : schema;

    if (data && schema) {

        var errorObj = {};

        // Loops all the properties for the given schema and for each property validates the field type, if it does not meet
        // the schema requirements the errorObj gets filled with the proper information
        eon.validator.loopProperties(schema, function (property) {

            eon.validator.validateRequiredField(property, schema, data, errorObj);
            eon.validator.validateStringField(property, schema, data, errorObj);
            eon.validator.validateDateField(property, schema, data, errorObj);
            eon.validator.validateNumericField(property, schema, data, errorObj);
            eon.validator.validateArrayField(property, schema, data, errorObj);
            eon.validator.validateObjectField(property, schema, data, errorObj);

        });

        // If there are errors collected then returns the errorObj, else just returns undefined
        return Object.keys(errorObj).length > 0 ? errorObj : undefined;

    }

    return undefined;

}

eon.validator.loopProperties = function (schema, callback) {

    // We take the schema properties
    var properties = schema.properties;
    var fields = Object.keys(properties);

    // And loop through them
    for (var i = 0; i < fields.length; i++) {

        // Call the callback passing the field
        callback(fields[i]);

    }

}

eon.validator.validateRequiredField = function (property, schema, data, errorObj) {

    var propertySchema = schema.properties[property];
    var isRequired = (schema.required && schema.required.indexOf(property) > -1) || eon.util.isTrue(propertySchema.required);

    var isInvalid = ((!data[property] || data[property] == "") && isRequired);

    // If if does not meet any of the requirements then it fills the error object with the proper information
    if (isInvalid) {
        eon.validator.fillErrorObj(property, "Required", errorObj);
    }

}

eon.validator.validateStringField = function (property, schema, data, errorObj) {

    var propertySchema = schema.properties[property];

    if (propertySchema.type == "string" && data.hasOwnProperty(property)) {

        // MaxLength
        var hasMaxLength = propertySchema.hasOwnProperty("maxLength") && (parseInt(propertySchema.maxLength) > 0);
        var exceedsMaxLength = data[property].length > parseInt(propertySchema.maxLength);

        // MinLength
        var hasMinLength = propertySchema.hasOwnProperty("minLength") && (parseInt(propertySchema.maxLength) > 0);
        var exceedsMinLength = data[property].length < parseInt(propertySchema.minLength);

        // Pattern
        var hasPattern = propertySchema.hasOwnProperty("pattern");
        var matchesPattern = new RegExp(propertySchema.pattern).test(data[property]);

        var isInvalid = (hasPattern && !matchesPattern) || (hasMaxLength && exceedsMaxLength) || (hasMinLength && exceedsMinLength);

        // If if does not meet any of the requirements then it fills the error object with the proper information
        if (isInvalid) {
            var errorMessage = propertySchema.errorMessage ? propertySchema.errorMessage : eon.validator.defaultErrorMessage;
            eon.validator.fillErrorObj(property, errorMessage, errorObj);
        }

    }

}

eon.validator.validateDateField = function (property, schema, data, errorObj) {

    var propertySchema = schema.properties[property];

    if (propertySchema.type == "date" && data.hasOwnProperty(property)) {

        // Takes the format of the schema, if there is no format in the schema it takes a default format work with
        var format = propertySchema.format ? propertySchema.format : "YYYY-MM-DD";

        // Takes the data value
        var value = data[property];
        // Turns that value into an object with day,month and year properties
        var valueObj = eon.time.getDateObjectFromString(value, format);
        // Takes the object and applies the schema format to see if both values (the value and the schema value) are the same,
        // that would mean if follows the same format
        var schemaValue = eon.time.generateOutput(valueObj, format);

        var isInvalid;

        // If it does not follow the same format then it is no valid
        if (value != schemaValue) {

            isInvalid = true;

        } else {

            var year = valueObj.year != undefined ? valueObj.year : 0;
            var month = valueObj.month != undefined ? (valueObj.month - 1) : 0;
            var day = valueObj.day != undefined ? valueObj.day : 1;

            // Turns the date into epoch so that we are able to compare dates
            var epochDate = new Date(year, month, day).getTime();
            var minEpochDate, maxEpochDate;

            // Checks if there is a minimum specified in the schema
            if (propertySchema.hasOwnProperty("minimum")) {

                var minDateObj = eon.time.getDateObjectFromString(propertySchema.minimum, format);

                var minYear = minDateObj.year != undefined ? minDateObj.year : 0;
                var minMonth = minDateObj.month != undefined ? (minDateObj.month - 1) : 0;
                var minDay = minDateObj.day != undefined ? minDateObj.day : 1;

                minEpochDate = new Date(minYear, minMonth, minDay).getTime();
                
                isInvalid = epochDate < minEpochDate ? true : isInvalid;

            }

            // Checks if there is a maximum specified in the schema
            if (propertySchema.hasOwnProperty("maximum")) {

                var maxDateObj = eon.time.getDateObjectFromString(propertySchema.minimum, format);

                var maxYear = maxDateObj.year != undefined ? maxDateObj.year : 0;
                var maxMonth = maxDateObj.month != undefined ? (maxDateObj.month - 1) : 0;
                var maxDay = maxDateObj.day != undefined ? maxDateObj.day : 1;

                maxEpochDate = new Date(maxYear, maxMonth, maxDay).getTime();
                isInvalid = epochDate > maxEpochDate ? true : isInvalid;

            }

        }

        // If if does not meet any of the requirements then it fills the error object with the proper information
        if (isInvalid) {
            var errorMessage = propertySchema.errorMessage ? propertySchema.errorMessage : eon.validator.defaultErrorMessage;
            eon.validator.fillErrorObj(property, errorMessage, errorObj);
        }

    }

}

eon.validator.validateNumericField = function (property, schema, data, errorObj) {

    var propertySchema = schema.properties[property];

    if ((propertySchema.type == "integer" || propertySchema.type == "number") && data.hasOwnProperty(property)) {

        var value = parseFloat(data[property]);

        // MultipleOf
        var hasMultipleOf = propertySchema.hasOwnProperty("multipleOf");
        var isMultipleOf = value % propertySchema.multipleOf === 0;

        // Maximum
        var hasMaximum = propertySchema.hasOwnProperty("maximum");
        var exceedsMaximum = propertySchema.exclusiveMaximum ? (value >= propertySchema.maximum) : (value > propertySchema.maximum);
        
        // Minimum
        var hasMinimum = propertySchema.hasOwnProperty("minimum");
        var exceedsMinimum = propertySchema.exclusiveMinimum ? (value <= propertySchema.minimum) : (value < propertySchema.minimum);

        var isInvalid = (hasMultipleOf && !isMultipleOf) || (hasMaximum && exceedsMaximum) || (hasMinimum && exceedsMinimum);

        // If if does not meet any of the requirements then it fills the error object with the proper information
        if (isInvalid) {
            var errorMessage = propertySchema.errorMessage ? propertySchema.errorMessage : eon.validator.defaultErrorMessage;
            eon.validator.fillErrorObj(property, errorMessage, errorObj);
        }

    }

}

eon.validator.validateArrayField = function (property, schema, data, errorObj) {

    var propertySchema = schema.properties[property];

    if (propertySchema.type == "array" && data.hasOwnProperty(property)) {

        var valuesArray = data[property].filter(function (value) {
            return value != false;
        });

        var hasMinItems = propertySchema.hasOwnProperty("minItems");
        var exceedsMinItems = valuesArray.length < parseInt(propertySchema.minItems);

        var hasMaxItems = propertySchema.hasOwnProperty("maxItems");
        var exceedsMaxItems = valuesArray.length > parseInt(propertySchema.maxItems);

        var isInvalid = (hasMinItems && exceedsMinItems) || (hasMaxItems && exceedsMaxItems);

        // If if does not meet any of the requirements then it fills the error object with the proper information
        if (isInvalid) {
            var errorMessage = propertySchema.errorMessage ? propertySchema.errorMessage : eon.validator.defaultErrorMessage;
            eon.validator.fillErrorObj(property, errorMessage, errorObj);
        }

    }

}

eon.validator.validateObjectField = function (property, schema, data, errorObj) {

    var propertySchema = schema.properties[property];

    if (propertySchema.type == "object" && data.hasOwnProperty(property)) {

        var propertyData = data[property];
        var nestedErrorObj = {};

        errorObj[property] = nestedErrorObj;

        // Loops through the new schema and validates against the property data
        eon.validator.loopProperties(propertySchema, function (property) {

            eon.validator.validateRequiredField(property, propertySchema, propertyData, nestedErrorObj);
            eon.validator.validateStringField(property, propertySchema, propertyData, nestedErrorObj);
            eon.validator.validateNumericField(property, propertySchema, propertyData, nestedErrorObj);
            eon.validator.validateArrayField(property, propertySchema, propertyData, nestedErrorObj);
            eon.validator.validateObjectField(property, propertySchema, propertyData, nestedErrorObj);

        });

        if (Object.keys(errorObj[property]) == 0) {
            delete errorObj[property];
        }

    }

}

eon.validator.fillErrorObj = function (property, errorMessage, errorObj) {
    !errorObj[property] ? errorObj[property] = [errorMessage] : errorObj[property].push(errorMessage);
}



eon.domReady(function () {

    eon.imports.total++;
    eon.imports.count++;

    // Declare element
    eon.declare("eon-variable");

    eon.element({

        name: "eon-variable",

        display: "inline-block",

        properties: {},

        privateFunctions: {},

    });

});

eon.domReady(function () {

  eon.imports.total++;
  eon.imports.count++;

  // Declare element
  eon.declare("eon-placeholder");

  eon.element({

    name: "eon-placeholder",

    properties: {
      /*
      @property {String} value
      @description Node name of the owner component
      */
      type: {
        value: "",
        reflect: true
      },
      /*
      @property {String} ownerId
      @description Owner's unique identifier
      */
      ownerId: {
        value: "",
        reflect: true
      },
      /*
      @property {Object} owner
      @description Reference to the owner
      */
      owner: {
        value: {},
        reflect: false
      },
    }

  });

})


  
    // ############################################################################################
// VPA JS
// ############################################################################################

// Creates a namespace for vpa.js
eon.vpa = eon.vpa || {};

(function () {
  
  var define = eon.amd.define;
  var require = eon.amd.require;

  var vpa = {};
  vpa.useAmd = true;
  vpa.declareLocal = true;

  // Import vpa.js file
  // ------------------------------------------------------------------------------------
    // USE ONLY WITH SCRIPT SRC!

// Support module in any environment
var scope = typeof global != "undefined" ? global : window;
scope["module"] = scope["module"] || undefined;

// Global vpa declaration
scope.vpa = scope.vpa || {};

vpa.declareLocal = vpa.hasOwnProperty("declareLocal") ? vpa.declareLocal : true;
vpa.declareGlobal = vpa.hasOwnProperty("declareGlobal") ? vpa.declareGlobal : true;

vpa.useAmd = vpa.hasOwnProperty("useAmd") ? vpa.useAmd : false;
vpa.allowAmdRequire = vpa.hasOwnProperty("allowAmdRequire") ? vpa.allowAmdRequire : false;

if (vpa.useAmd || vpa.allowAmdRequire) {
  vpa.define = vpa.define || define;
  vpa.require = vpa.require || require;
  vpa.useAmd = true; // Force AMD when any related option is used
}

vpa.declareAdapter = function (name, adapter, ext_module) {
  (function () {
    if (vpa.declareLocal && vpa.useAmd) {
        vpa.define(function () {
          return adapter;
        });      
    }
    if (vpa.declareGlobal) {
      vpa[name] = adapter;
    }
  })();
};

// Base implementation
(function () {
    var self = this;
    // Base Query and Adapter Objects
    self.createBaseQuery = function (adapterData) {
        var BaseQuery = /** @class */ (function () {
            function BaseQuery() {
                this.query = adapterData || {};
            }
            BaseQuery.prototype.options = function (o) {
                this.query.options = o;
                return this;
            };
            BaseQuery.prototype.limit = function (start, amount) {
                this.query.limitStart = start;
                this.query.limitAmount = amount;
                return this;
            };
            BaseQuery.prototype.validate = function (schema) {
                this.query.validate = schema;
                return this;
            };
            BaseQuery.prototype.sort = function (field, rule) {
                this.query.sortField = field;
                this.query.sortRule = rule;
                return this;
            };
            BaseQuery.prototype.view = function (v) {
                this.query.view = v;
                return this;
            };
            BaseQuery.prototype.result = function (cb) {
                throw "Not implemented, please override result function";
            };
            return BaseQuery;
        }());
        return new BaseQuery();
    };
    self.createBaseAdapter = function (queryHandler) {
        var BaseAdapter = /** @class */ (function () {
            function BaseAdapter() {
            }
            BaseAdapter.prototype.create = function (data) {
                return queryHandler({
                    action: "create",
                    data: data
                });
            };
            BaseAdapter.prototype.read = function (id) {
                return queryHandler({
                    action: "read",
                    id: id
                });
            };
            BaseAdapter.prototype.update = function (id, data) {
                return queryHandler({
                    action: "update",
                    id: id,
                    data: data
                });
            };
            BaseAdapter.prototype.delete = function (id) {
                return queryHandler({
                    action: "delete",
                    id: id
                });
            };
            return BaseAdapter;
        }());
        return new BaseAdapter();
    };
}).apply(vpa);


// Allow vpa require
if (vpa.allowAmdRequire) {
  vpa.define(function () {
    return vpa;
  });
}  // ------------------------------------------------------------------------------------

  eon.vpa = vpa;

}).apply({});


}.apply(eon));
  


