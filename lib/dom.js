if(typeof(module)=='undefined') 
    var module = { exports:{} };

(function(require,exports,module) {
    "use strict";
    var r = "http://www.w3.org/1999/xhtml";
    exports.buildDom = function s(e, t, n) {
        if (typeof e == "string" && e) {
            var r = document.createTextNode(e);
            return t && t.appendChild(r), r
        }
        if (!Array.isArray(e)) return e;
        if (typeof e[0] != "string" || !e[0]) {
            var i = [];
            for (var o = 0; o < e.length; o++) {
                var u = s(e[o], t, n);
                u && i.push(u)
            }
            return i
        }
        var a = document.createElement(e[0]),
            f = e[1],
            l = 1;
        f && typeof f == "object" && !Array.isArray(f) && (l = 2);
        for (var o = l; o < e.length; o++) s(e[o], a, n);
        return l == 2 && Object.keys(f).forEach(function (e) {
            var t = f[e];
            e === "class"
                ? a.className = Array.isArray(t) 
                    ? t.join(" ") 
                    : t 
                : typeof t == "function" || e == "value" ? a[e] = t 
            : e === "ref" 
                ? n && (n[t] = a) 
                : t != null && a.setAttribute(e, t)
        }), t && t.appendChild(a), a
    }, exports.getDocumentHead = function (e) {
        return e || (e = document), e.head || e.getElementsByTagName("head")[0] || e.documentElement
    }, exports.createElement = function (e, t) {
        return document.createElementNS ? document.createElementNS(t || r, e) : document.createElement(e)
    }, exports.hasCssClass = function (e, t) {
        var n = (e.className + "").split(/\s+/g);
        return n.indexOf(t) !== -1
    }, exports.addCssClass = function (e, n) {
        exports.hasCssClass(e, n) || (e.className += " " + n)
    }, exports.removeCssClass = function (e, t) {
        var n = e.className.split(/\s+/g);
        for (;;) {
            var r = n.indexOf(t);
            if (r == -1) break;
            n.splice(r, 1)
        }
        e.className = n.join(" ")
    }, exports.toggleCssClass = function (e, t) {
        var n = e.className.split(/\s+/g),
            r = !0;
        for (;;) {
            var i = n.indexOf(t);
            if (i == -1) break;
            r = !1, n.splice(i, 1)
        }
        return r && n.push(t), e.className = n.join(" "), r
    }, exports.setCssClass = function (e, n, r) {
        r ? exports.addCssClass(e, n) : exports.removeCssClass(e, n)
    }, exports.hasCssString = function (e, t) {
        var n = 0,
            r;
        t = t || document;
        if (r = t.querySelectorAll("style"))
            while (n < r.length)
                if (r[n++].id === e) return !0
    }, exports.importCssString = function (n, r, i) {
        var s = i && i.getRootNode ? i.getRootNode() : i || document,
            o = s.ownerDocument || s;
        if (r && exports.hasCssString(r, s)) return null;
        r && (n += "\n/*# sourceURL=ace/css/" + r + " */");
        var u = exports.createElement("style");
        u.appendChild(o.createTextNode(n)), r && (u.id = r), s == o && (s = exports.getDocumentHead(o)), s.appendChild(u)
    }, exports.importCssStylesheet = function (e, n) {
        exports.buildDom("link", {
            rel: "stylesheet",
            href: e
        }, exports.getDocumentHead(n))
    }, exports.scrollbarWidth = function (e) {
        var n = exports.createElement("ace_inner");
        n.style.width = "100%", n.style.minWidth = "0px", n.style.height = "200px", n.style.display = "block";
        var r = exports.createElement("ace_outer"),
            i = r.style;
        i.position = "absolute", i.left = "-10000px", i.overflow = "hidden", i.width = "200px", i.minWidth = "0px", i.height = "150px", i.display = "block", r.appendChild(n);
        var s = e.documentElement;
        s.appendChild(r);
        var o = n.offsetWidth;
        i.overflow = "scroll";
        var u = n.offsetWidth;
        return o == u && (u = r.clientWidth), s.removeChild(r), o - u
    }, typeof document == "undefined" && (exports.importCssString = function () {}), exports.computedStyle = function (e, t) {
        return window.getComputedStyle(e, "") || {}
    }, exports.HAS_CSS_ANIMATION = !1;
    if (typeof document != "undefined") {
        var i = document.createElement("div");
        typeof i.style.animationName != "undefined" && (exports.HAS_CSS_ANIMATION = !0)
    }
    exports.inherits = function (e, t) {
        e.super_ = t, e.prototype = Object.create(t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        })
    }, exports.mixin = function (e, t) {
        for (var n in t) e[n] = t[n];
        return e
    }, exports.implement = function (e, n) {
        exports.mixin(e, n)
    }
    return exports;
})(require, module.exports,module)


if(typeof(window)!='undefined') 
    window.DOM = module.exports;