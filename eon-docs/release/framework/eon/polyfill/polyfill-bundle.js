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

//# sourceMappingURL=custom-elements.min.js.map

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
