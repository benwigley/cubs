(function() {
    "use strict";
    var globals = "undefined" != typeof window ? window : global;
    if ("function" != typeof globals.require) {
        var modules = {}, cache = {}, has = function(object, name) {
            return {}.hasOwnProperty.call(object, name);
        }, expand = function(root, name) {
            var parts, part, results = [];
            parts = /^\.\.?(\/|$)/.test(name) ? [ root, name ].join("/").split("/") : name.split("/");
            for (var i = 0, length = parts.length; length > i; i++) part = parts[i], ".." === part ? results.pop() : "." !== part && "" !== part && results.push(part);
            return results.join("/");
        }, dirname = function(path) {
            return path.split("/").slice(0, -1).join("/");
        }, localRequire = function(path) {
            return function(name) {
                var dir = dirname(path), absolute = expand(dir, name);
                return globals.require(absolute);
            };
        }, initModule = function(name, definition) {
            var module = {
                id: name,
                exports: {}
            };
            definition(module.exports, localRequire(name), module);
            var exports = cache[name] = module.exports;
            return exports;
        }, require = function(name) {
            var path = expand(name, ".");
            if (has(cache, path)) return cache[path];
            if (has(modules, path)) return initModule(path, modules[path]);
            var dirIndex = expand(path, "./index");
            if (has(cache, dirIndex)) return cache[dirIndex];
            if (has(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);
            throw Error('Cannot find module "' + name + '"');
        }, define = function(bundle) {
            for (var key in bundle) has(bundle, key) && (modules[key] = bundle[key]);
        };
        globals.require = require, globals.require.define = define;
    }
})(), function() {
    var n = this, t = n._, r = {}, e = Array.prototype, u = Object.prototype, i = Function.prototype, a = e.push, o = e.slice, c = e.concat, l = u.toString, f = u.hasOwnProperty, s = e.forEach, p = e.map, h = e.reduce, v = e.reduceRight, d = e.filter, g = e.every, m = e.some, y = e.indexOf, b = e.lastIndexOf, x = Array.isArray, _ = Object.keys, j = i.bind, w = function(n) {
        return n instanceof w ? n : this instanceof w ? (this._wrapped = n, void 0) : new w(n);
    };
    "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = w), 
    exports._ = w) : n._ = w, w.VERSION = "1.4.4";
    var A = w.each = w.forEach = function(n, t, e) {
        if (null != n) if (s && n.forEach === s) n.forEach(t, e); else if (n.length === +n.length) {
            for (var u = 0, i = n.length; i > u; u++) if (t.call(e, n[u], u, n) === r) return;
        } else for (var a in n) if (w.has(n, a) && t.call(e, n[a], a, n) === r) return;
    };
    w.map = w.collect = function(n, t, r) {
        var e = [];
        return null == n ? e : p && n.map === p ? n.map(t, r) : (A(n, function(n, u, i) {
            e[e.length] = t.call(r, n, u, i);
        }), e);
    };
    var O = "Reduce of empty array with no initial value";
    w.reduce = w.foldl = w.inject = function(n, t, r, e) {
        var u = arguments.length > 2;
        if (null == n && (n = []), h && n.reduce === h) return e && (t = w.bind(t, e)), 
        u ? n.reduce(t, r) : n.reduce(t);
        if (A(n, function(n, i, a) {
            u ? r = t.call(e, r, n, i, a) : (r = n, u = !0);
        }), !u) throw new TypeError(O);
        return r;
    }, w.reduceRight = w.foldr = function(n, t, r, e) {
        var u = arguments.length > 2;
        if (null == n && (n = []), v && n.reduceRight === v) return e && (t = w.bind(t, e)), 
        u ? n.reduceRight(t, r) : n.reduceRight(t);
        var i = n.length;
        if (i !== +i) {
            var a = w.keys(n);
            i = a.length;
        }
        if (A(n, function(o, c, l) {
            c = a ? a[--i] : --i, u ? r = t.call(e, r, n[c], c, l) : (r = n[c], u = !0);
        }), !u) throw new TypeError(O);
        return r;
    }, w.find = w.detect = function(n, t, r) {
        var e;
        return E(n, function(n, u, i) {
            return t.call(r, n, u, i) ? (e = n, !0) : void 0;
        }), e;
    }, w.filter = w.select = function(n, t, r) {
        var e = [];
        return null == n ? e : d && n.filter === d ? n.filter(t, r) : (A(n, function(n, u, i) {
            t.call(r, n, u, i) && (e[e.length] = n);
        }), e);
    }, w.reject = function(n, t, r) {
        return w.filter(n, function(n, e, u) {
            return !t.call(r, n, e, u);
        }, r);
    }, w.every = w.all = function(n, t, e) {
        t || (t = w.identity);
        var u = !0;
        return null == n ? u : g && n.every === g ? n.every(t, e) : (A(n, function(n, i, a) {
            return (u = u && t.call(e, n, i, a)) ? void 0 : r;
        }), !!u);
    };
    var E = w.some = w.any = function(n, t, e) {
        t || (t = w.identity);
        var u = !1;
        return null == n ? u : m && n.some === m ? n.some(t, e) : (A(n, function(n, i, a) {
            return u || (u = t.call(e, n, i, a)) ? r : void 0;
        }), !!u);
    };
    w.contains = w.include = function(n, t) {
        return null == n ? !1 : y && n.indexOf === y ? -1 != n.indexOf(t) : E(n, function(n) {
            return n === t;
        });
    }, w.invoke = function(n, t) {
        var r = o.call(arguments, 2), e = w.isFunction(t);
        return w.map(n, function(n) {
            return (e ? t : n[t]).apply(n, r);
        });
    }, w.pluck = function(n, t) {
        return w.map(n, function(n) {
            return n[t];
        });
    }, w.where = function(n, t, r) {
        return w.isEmpty(t) ? r ? null : [] : w[r ? "find" : "filter"](n, function(n) {
            for (var r in t) if (t[r] !== n[r]) return !1;
            return !0;
        });
    }, w.findWhere = function(n, t) {
        return w.where(n, t, !0);
    }, w.max = function(n, t, r) {
        if (!t && w.isArray(n) && n[0] === +n[0] && 65535 > n.length) return Math.max.apply(Math, n);
        if (!t && w.isEmpty(n)) return -1 / 0;
        var e = {
            computed: -1 / 0,
            value: -1 / 0
        };
        return A(n, function(n, u, i) {
            var a = t ? t.call(r, n, u, i) : n;
            a >= e.computed && (e = {
                value: n,
                computed: a
            });
        }), e.value;
    }, w.min = function(n, t, r) {
        if (!t && w.isArray(n) && n[0] === +n[0] && 65535 > n.length) return Math.min.apply(Math, n);
        if (!t && w.isEmpty(n)) return 1 / 0;
        var e = {
            computed: 1 / 0,
            value: 1 / 0
        };
        return A(n, function(n, u, i) {
            var a = t ? t.call(r, n, u, i) : n;
            e.computed > a && (e = {
                value: n,
                computed: a
            });
        }), e.value;
    }, w.shuffle = function(n) {
        var t, r = 0, e = [];
        return A(n, function(n) {
            t = w.random(r++), e[r - 1] = e[t], e[t] = n;
        }), e;
    };
    var k = function(n) {
        return w.isFunction(n) ? n : function(t) {
            return t[n];
        };
    };
    w.sortBy = function(n, t, r) {
        var e = k(t);
        return w.pluck(w.map(n, function(n, t, u) {
            return {
                value: n,
                index: t,
                criteria: e.call(r, n, t, u)
            };
        }).sort(function(n, t) {
            var r = n.criteria, e = t.criteria;
            if (r !== e) {
                if (r > e || void 0 === r) return 1;
                if (e > r || void 0 === e) return -1;
            }
            return n.index < t.index ? -1 : 1;
        }), "value");
    };
    var F = function(n, t, r, e) {
        var u = {}, i = k(t || w.identity);
        return A(n, function(t, a) {
            var o = i.call(r, t, a, n);
            e(u, o, t);
        }), u;
    };
    w.groupBy = function(n, t, r) {
        return F(n, t, r, function(n, t, r) {
            (w.has(n, t) ? n[t] : n[t] = []).push(r);
        });
    }, w.countBy = function(n, t, r) {
        return F(n, t, r, function(n, t) {
            w.has(n, t) || (n[t] = 0), n[t]++;
        });
    }, w.sortedIndex = function(n, t, r, e) {
        r = null == r ? w.identity : k(r);
        for (var u = r.call(e, t), i = 0, a = n.length; a > i; ) {
            var o = i + a >>> 1;
            u > r.call(e, n[o]) ? i = o + 1 : a = o;
        }
        return i;
    }, w.toArray = function(n) {
        return n ? w.isArray(n) ? o.call(n) : n.length === +n.length ? w.map(n, w.identity) : w.values(n) : [];
    }, w.size = function(n) {
        return null == n ? 0 : n.length === +n.length ? n.length : w.keys(n).length;
    }, w.first = w.head = w.take = function(n, t, r) {
        return null == n ? void 0 : null == t || r ? n[0] : o.call(n, 0, t);
    }, w.initial = function(n, t, r) {
        return o.call(n, 0, n.length - (null == t || r ? 1 : t));
    }, w.last = function(n, t, r) {
        return null == n ? void 0 : null == t || r ? n[n.length - 1] : o.call(n, Math.max(n.length - t, 0));
    }, w.rest = w.tail = w.drop = function(n, t, r) {
        return o.call(n, null == t || r ? 1 : t);
    }, w.compact = function(n) {
        return w.filter(n, w.identity);
    };
    var R = function(n, t, r) {
        return A(n, function(n) {
            w.isArray(n) ? t ? a.apply(r, n) : R(n, t, r) : r.push(n);
        }), r;
    };
    w.flatten = function(n, t) {
        return R(n, t, []);
    }, w.without = function(n) {
        return w.difference(n, o.call(arguments, 1));
    }, w.uniq = w.unique = function(n, t, r, e) {
        w.isFunction(t) && (e = r, r = t, t = !1);
        var u = r ? w.map(n, r, e) : n, i = [], a = [];
        return A(u, function(r, e) {
            (t ? e && a[a.length - 1] === r : w.contains(a, r)) || (a.push(r), i.push(n[e]));
        }), i;
    }, w.union = function() {
        return w.uniq(c.apply(e, arguments));
    }, w.intersection = function(n) {
        var t = o.call(arguments, 1);
        return w.filter(w.uniq(n), function(n) {
            return w.every(t, function(t) {
                return w.indexOf(t, n) >= 0;
            });
        });
    }, w.difference = function(n) {
        var t = c.apply(e, o.call(arguments, 1));
        return w.filter(n, function(n) {
            return !w.contains(t, n);
        });
    }, w.zip = function() {
        for (var n = o.call(arguments), t = w.max(w.pluck(n, "length")), r = Array(t), e = 0; t > e; e++) r[e] = w.pluck(n, "" + e);
        return r;
    }, w.object = function(n, t) {
        if (null == n) return {};
        for (var r = {}, e = 0, u = n.length; u > e; e++) t ? r[n[e]] = t[e] : r[n[e][0]] = n[e][1];
        return r;
    }, w.indexOf = function(n, t, r) {
        if (null == n) return -1;
        var e = 0, u = n.length;
        if (r) {
            if ("number" != typeof r) return e = w.sortedIndex(n, t), n[e] === t ? e : -1;
            e = 0 > r ? Math.max(0, u + r) : r;
        }
        if (y && n.indexOf === y) return n.indexOf(t, r);
        for (;u > e; e++) if (n[e] === t) return e;
        return -1;
    }, w.lastIndexOf = function(n, t, r) {
        if (null == n) return -1;
        var e = null != r;
        if (b && n.lastIndexOf === b) return e ? n.lastIndexOf(t, r) : n.lastIndexOf(t);
        for (var u = e ? r : n.length; u--; ) if (n[u] === t) return u;
        return -1;
    }, w.range = function(n, t, r) {
        1 >= arguments.length && (t = n || 0, n = 0), r = arguments[2] || 1;
        for (var e = Math.max(Math.ceil((t - n) / r), 0), u = 0, i = Array(e); e > u; ) i[u++] = n, 
        n += r;
        return i;
    }, w.bind = function(n, t) {
        if (n.bind === j && j) return j.apply(n, o.call(arguments, 1));
        var r = o.call(arguments, 2);
        return function() {
            return n.apply(t, r.concat(o.call(arguments)));
        };
    }, w.partial = function(n) {
        var t = o.call(arguments, 1);
        return function() {
            return n.apply(this, t.concat(o.call(arguments)));
        };
    }, w.bindAll = function(n) {
        var t = o.call(arguments, 1);
        return 0 === t.length && (t = w.functions(n)), A(t, function(t) {
            n[t] = w.bind(n[t], n);
        }), n;
    }, w.memoize = function(n, t) {
        var r = {};
        return t || (t = w.identity), function() {
            var e = t.apply(this, arguments);
            return w.has(r, e) ? r[e] : r[e] = n.apply(this, arguments);
        };
    }, w.delay = function(n, t) {
        var r = o.call(arguments, 2);
        return setTimeout(function() {
            return n.apply(null, r);
        }, t);
    }, w.defer = function(n) {
        return w.delay.apply(w, [ n, 1 ].concat(o.call(arguments, 1)));
    }, w.throttle = function(n, t) {
        var r, e, u, i, a = 0, o = function() {
            a = new Date(), u = null, i = n.apply(r, e);
        };
        return function() {
            var c = new Date(), l = t - (c - a);
            return r = this, e = arguments, 0 >= l ? (clearTimeout(u), u = null, a = c, i = n.apply(r, e)) : u || (u = setTimeout(o, l)), 
            i;
        };
    }, w.debounce = function(n, t, r) {
        var e, u;
        return function() {
            var i = this, a = arguments, o = function() {
                e = null, r || (u = n.apply(i, a));
            }, c = r && !e;
            return clearTimeout(e), e = setTimeout(o, t), c && (u = n.apply(i, a)), u;
        };
    }, w.once = function(n) {
        var t, r = !1;
        return function() {
            return r ? t : (r = !0, t = n.apply(this, arguments), n = null, t);
        };
    }, w.wrap = function(n, t) {
        return function() {
            var r = [ n ];
            return a.apply(r, arguments), t.apply(this, r);
        };
    }, w.compose = function() {
        var n = arguments;
        return function() {
            for (var t = arguments, r = n.length - 1; r >= 0; r--) t = [ n[r].apply(this, t) ];
            return t[0];
        };
    }, w.after = function(n, t) {
        return 0 >= n ? t() : function() {
            return 1 > --n ? t.apply(this, arguments) : void 0;
        };
    }, w.keys = _ || function(n) {
        if (n !== Object(n)) throw new TypeError("Invalid object");
        var t = [];
        for (var r in n) w.has(n, r) && (t[t.length] = r);
        return t;
    }, w.values = function(n) {
        var t = [];
        for (var r in n) w.has(n, r) && t.push(n[r]);
        return t;
    }, w.pairs = function(n) {
        var t = [];
        for (var r in n) w.has(n, r) && t.push([ r, n[r] ]);
        return t;
    }, w.invert = function(n) {
        var t = {};
        for (var r in n) w.has(n, r) && (t[n[r]] = r);
        return t;
    }, w.functions = w.methods = function(n) {
        var t = [];
        for (var r in n) w.isFunction(n[r]) && t.push(r);
        return t.sort();
    }, w.extend = function(n) {
        return A(o.call(arguments, 1), function(t) {
            if (t) for (var r in t) n[r] = t[r];
        }), n;
    }, w.pick = function(n) {
        var t = {}, r = c.apply(e, o.call(arguments, 1));
        return A(r, function(r) {
            r in n && (t[r] = n[r]);
        }), t;
    }, w.omit = function(n) {
        var t = {}, r = c.apply(e, o.call(arguments, 1));
        for (var u in n) w.contains(r, u) || (t[u] = n[u]);
        return t;
    }, w.defaults = function(n) {
        return A(o.call(arguments, 1), function(t) {
            if (t) for (var r in t) null == n[r] && (n[r] = t[r]);
        }), n;
    }, w.clone = function(n) {
        return w.isObject(n) ? w.isArray(n) ? n.slice() : w.extend({}, n) : n;
    }, w.tap = function(n, t) {
        return t(n), n;
    };
    var I = function(n, t, r, e) {
        if (n === t) return 0 !== n || 1 / n == 1 / t;
        if (null == n || null == t) return n === t;
        n instanceof w && (n = n._wrapped), t instanceof w && (t = t._wrapped);
        var u = l.call(n);
        if (u != l.call(t)) return !1;
        switch (u) {
          case "[object String]":
            return n == t + "";

          case "[object Number]":
            return n != +n ? t != +t : 0 == n ? 1 / n == 1 / t : n == +t;

          case "[object Date]":
          case "[object Boolean]":
            return +n == +t;

          case "[object RegExp]":
            return n.source == t.source && n.global == t.global && n.multiline == t.multiline && n.ignoreCase == t.ignoreCase;
        }
        if ("object" != typeof n || "object" != typeof t) return !1;
        for (var i = r.length; i--; ) if (r[i] == n) return e[i] == t;
        r.push(n), e.push(t);
        var a = 0, o = !0;
        if ("[object Array]" == u) {
            if (a = n.length, o = a == t.length) for (;a-- && (o = I(n[a], t[a], r, e)); ) ;
        } else {
            var c = n.constructor, f = t.constructor;
            if (c !== f && !(w.isFunction(c) && c instanceof c && w.isFunction(f) && f instanceof f)) return !1;
            for (var s in n) if (w.has(n, s) && (a++, !(o = w.has(t, s) && I(n[s], t[s], r, e)))) break;
            if (o) {
                for (s in t) if (w.has(t, s) && !a--) break;
                o = !a;
            }
        }
        return r.pop(), e.pop(), o;
    };
    w.isEqual = function(n, t) {
        return I(n, t, [], []);
    }, w.isEmpty = function(n) {
        if (null == n) return !0;
        if (w.isArray(n) || w.isString(n)) return 0 === n.length;
        for (var t in n) if (w.has(n, t)) return !1;
        return !0;
    }, w.isElement = function(n) {
        return !(!n || 1 !== n.nodeType);
    }, w.isArray = x || function(n) {
        return "[object Array]" == l.call(n);
    }, w.isObject = function(n) {
        return n === Object(n);
    }, A([ "Arguments", "Function", "String", "Number", "Date", "RegExp" ], function(n) {
        w["is" + n] = function(t) {
            return l.call(t) == "[object " + n + "]";
        };
    }), w.isArguments(arguments) || (w.isArguments = function(n) {
        return !(!n || !w.has(n, "callee"));
    }), true && (w.isFunction = function(n) {
        return "function" == typeof n;
    }), w.isFinite = function(n) {
        return isFinite(n) && !isNaN(parseFloat(n));
    }, w.isNaN = function(n) {
        return w.isNumber(n) && n != +n;
    }, w.isBoolean = function(n) {
        return n === !0 || n === !1 || "[object Boolean]" == l.call(n);
    }, w.isNull = function(n) {
        return null === n;
    }, w.isUndefined = function(n) {
        return void 0 === n;
    }, w.has = function(n, t) {
        return f.call(n, t);
    }, w.noConflict = function() {
        return n._ = t, this;
    }, w.identity = function(n) {
        return n;
    }, w.times = function(n, t, r) {
        for (var e = Array(n), u = 0; n > u; u++) e[u] = t.call(r, u);
        return e;
    }, w.random = function(n, t) {
        return null == t && (t = n, n = 0), n + Math.floor(Math.random() * (t - n + 1));
    };
    var M = {
        escape: {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#x27;",
            "/": "&#x2F;"
        }
    };
    M.unescape = w.invert(M.escape);
    var S = {
        escape: RegExp("[" + w.keys(M.escape).join("") + "]", "g"),
        unescape: RegExp("(" + w.keys(M.unescape).join("|") + ")", "g")
    };
    w.each([ "escape", "unescape" ], function(n) {
        w[n] = function(t) {
            return null == t ? "" : ("" + t).replace(S[n], function(t) {
                return M[n][t];
            });
        };
    }), w.result = function(n, t) {
        if (null == n) return null;
        var r = n[t];
        return w.isFunction(r) ? r.call(n) : r;
    }, w.mixin = function(n) {
        A(w.functions(n), function(t) {
            var r = w[t] = n[t];
            w.prototype[t] = function() {
                var n = [ this._wrapped ];
                return a.apply(n, arguments), D.call(this, r.apply(w, n));
            };
        });
    };
    var N = 0;
    w.uniqueId = function(n) {
        var t = ++N + "";
        return n ? n + t : t;
    }, w.templateSettings = {
        evaluate: /<%([\s\S]+?)%>/g,
        interpolate: /<%=([\s\S]+?)%>/g,
        escape: /<%-([\s\S]+?)%>/g
    };
    var T = /(.)^/, q = {
        "'": "'",
        "\\": "\\",
        "\r": "r",
        "\n": "n",
        "	": "t",
        "\u2028": "u2028",
        "\u2029": "u2029"
    }, B = /\\|'|\r|\n|\t|\u2028|\u2029/g;
    w.template = function(n, t, r) {
        var e;
        r = w.defaults({}, r, w.templateSettings);
        var u = RegExp([ (r.escape || T).source, (r.interpolate || T).source, (r.evaluate || T).source ].join("|") + "|$", "g"), i = 0, a = "__p+='";
        n.replace(u, function(t, r, e, u, o) {
            return a += n.slice(i, o).replace(B, function(n) {
                return "\\" + q[n];
            }), r && (a += "'+\n((__t=(" + r + "))==null?'':_.escape(__t))+\n'"), e && (a += "'+\n((__t=(" + e + "))==null?'':__t)+\n'"), 
            u && (a += "';\n" + u + "\n__p+='"), i = o + t.length, t;
        }), a += "';\n", r.variable || (a = "with(obj||{}){\n" + a + "}\n"), a = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + a + "return __p;\n";
        try {
            e = Function(r.variable || "obj", "_", a);
        } catch (o) {
            throw o.source = a, o;
        }
        if (t) return e(t, w);
        var c = function(n) {
            return e.call(this, n, w);
        };
        return c.source = "function(" + (r.variable || "obj") + "){\n" + a + "}", c;
    }, w.chain = function(n) {
        return w(n).chain();
    };
    var D = function(n) {
        return this._chain ? w(n).chain() : n;
    };
    w.mixin(w), A([ "pop", "push", "reverse", "shift", "sort", "splice", "unshift" ], function(n) {
        var t = e[n];
        w.prototype[n] = function() {
            var r = this._wrapped;
            return t.apply(r, arguments), "shift" != n && "splice" != n || 0 !== r.length || delete r[0], 
            D.call(this, r);
        };
    }), A([ "concat", "join", "slice" ], function(n) {
        var t = e[n];
        w.prototype[n] = function() {
            return D.call(this, t.apply(this._wrapped, arguments));
        };
    }), w.extend(w.prototype, {
        chain: function() {
            return this._chain = !0, this;
        },
        value: function() {
            return this._wrapped;
        }
    });
}.call(this), function() {
    var g, n = this, B = n.Backbone, h = [], C = h.push, u = h.slice, D = h.splice;
    g = "undefined" != typeof exports ? exports : n.Backbone = {}, g.VERSION = "0.9.10";
    var f = n._;
    !f && "undefined" != typeof require && (f = require("underscore")), g.$ = n.jQuery || n.Zepto || n.ender, 
    g.noConflict = function() {
        return n.Backbone = B, this;
    }, g.emulateHTTP = !1, g.emulateJSON = !1;
    var v = /\s+/, q = function(a, b, c, d) {
        if (!c) return !0;
        if ("object" == typeof c) for (var e in c) a[b].apply(a, [ e, c[e] ].concat(d)); else {
            if (!v.test(c)) return !0;
            c = c.split(v), e = 0;
            for (var f = c.length; f > e; e++) a[b].apply(a, [ c[e] ].concat(d));
        }
    }, w = function(a, b) {
        var c, d = -1, e = a.length;
        switch (b.length) {
          case 0:
            for (;e > ++d; ) (c = a[d]).callback.call(c.ctx);
            break;

          case 1:
            for (;e > ++d; ) (c = a[d]).callback.call(c.ctx, b[0]);
            break;

          case 2:
            for (;e > ++d; ) (c = a[d]).callback.call(c.ctx, b[0], b[1]);
            break;

          case 3:
            for (;e > ++d; ) (c = a[d]).callback.call(c.ctx, b[0], b[1], b[2]);
            break;

          default:
            for (;e > ++d; ) (c = a[d]).callback.apply(c.ctx, b);
        }
    }, h = g.Events = {
        on: function(a, b, c) {
            return q(this, "on", a, [ b, c ]) && b ? (this._events || (this._events = {}), (this._events[a] || (this._events[a] = [])).push({
                callback: b,
                context: c,
                ctx: c || this
            }), this) : this;
        },
        once: function(a, b, c) {
            if (!q(this, "once", a, [ b, c ]) || !b) return this;
            var d = this, e = f.once(function() {
                d.off(a, e), b.apply(this, arguments);
            });
            return e._callback = b, this.on(a, e, c), this;
        },
        off: function(a, b, c) {
            var d, e, t, g, j, l, k, h;
            if (!this._events || !q(this, "off", a, [ b, c ])) return this;
            if (!a && !b && !c) return this._events = {}, this;
            for (g = a ? [ a ] : f.keys(this._events), j = 0, l = g.length; l > j; j++) if (a = g[j], 
            d = this._events[a]) {
                if (t = [], b || c) for (k = 0, h = d.length; h > k; k++) e = d[k], (b && b !== e.callback && b !== e.callback._callback || c && c !== e.context) && t.push(e);
                this._events[a] = t;
            }
            return this;
        },
        trigger: function(a) {
            if (!this._events) return this;
            var b = u.call(arguments, 1);
            if (!q(this, "trigger", a, b)) return this;
            var c = this._events[a], d = this._events.all;
            return c && w(c, b), d && w(d, arguments), this;
        },
        listenTo: function(a, b, c) {
            var d = this._listeners || (this._listeners = {}), e = a._listenerId || (a._listenerId = f.uniqueId("l"));
            return d[e] = a, a.on(b, "object" == typeof b ? this : c, this), this;
        },
        stopListening: function(a, b, c) {
            var d = this._listeners;
            if (d) {
                if (a) a.off(b, "object" == typeof b ? this : c, this), !b && !c && delete d[a._listenerId]; else {
                    "object" == typeof b && (c = this);
                    for (var e in d) d[e].off(b, c, this);
                    this._listeners = {};
                }
                return this;
            }
        }
    };
    h.bind = h.on, h.unbind = h.off, f.extend(g, h);
    var r = g.Model = function(a, b) {
        var c, d = a || {};
        this.cid = f.uniqueId("c"), this.attributes = {}, b && b.collection && (this.collection = b.collection), 
        b && b.parse && (d = this.parse(d, b) || {}), (c = f.result(this, "defaults")) && (d = f.defaults({}, d, c)), 
        this.set(d, b), this.changed = {}, this.initialize.apply(this, arguments);
    };
    f.extend(r.prototype, h, {
        changed: null,
        idAttribute: "id",
        initialize: function() {},
        toJSON: function() {
            return f.clone(this.attributes);
        },
        sync: function() {
            return g.sync.apply(this, arguments);
        },
        get: function(a) {
            return this.attributes[a];
        },
        escape: function(a) {
            return f.escape(this.get(a));
        },
        has: function(a) {
            return null != this.get(a);
        },
        set: function(a, b, c) {
            var d, e, g, p, j, l, k;
            if (null == a) return this;
            if ("object" == typeof a ? (e = a, c = b) : (e = {})[a] = b, c || (c = {}), !this._validate(e, c)) return !1;
            g = c.unset, p = c.silent, a = [], j = this._changing, this._changing = !0, j || (this._previousAttributes = f.clone(this.attributes), 
            this.changed = {}), k = this.attributes, l = this._previousAttributes, this.idAttribute in e && (this.id = e[this.idAttribute]);
            for (d in e) b = e[d], f.isEqual(k[d], b) || a.push(d), f.isEqual(l[d], b) ? delete this.changed[d] : this.changed[d] = b, 
            g ? delete k[d] : k[d] = b;
            if (!p) for (a.length && (this._pending = !0), b = 0, d = a.length; d > b; b++) this.trigger("change:" + a[b], this, k[a[b]], c);
            if (j) return this;
            if (!p) for (;this._pending; ) this._pending = !1, this.trigger("change", this, c);
            return this._changing = this._pending = !1, this;
        },
        unset: function(a, b) {
            return this.set(a, void 0, f.extend({}, b, {
                unset: !0
            }));
        },
        clear: function(a) {
            var c, b = {};
            for (c in this.attributes) b[c] = void 0;
            return this.set(b, f.extend({}, a, {
                unset: !0
            }));
        },
        hasChanged: function(a) {
            return null == a ? !f.isEmpty(this.changed) : f.has(this.changed, a);
        },
        changedAttributes: function(a) {
            if (!a) return this.hasChanged() ? f.clone(this.changed) : !1;
            var b, e, c = !1, d = this._changing ? this._previousAttributes : this.attributes;
            for (e in a) f.isEqual(d[e], b = a[e]) || ((c || (c = {}))[e] = b);
            return c;
        },
        previous: function(a) {
            return null != a && this._previousAttributes ? this._previousAttributes[a] : null;
        },
        previousAttributes: function() {
            return f.clone(this._previousAttributes);
        },
        fetch: function(a) {
            a = a ? f.clone(a) : {}, void 0 === a.parse && (a.parse = !0);
            var b = a.success;
            return a.success = function(a, d, e) {
                return a.set(a.parse(d, e), e) ? (b && b(a, d, e), void 0) : !1;
            }, this.sync("read", this, a);
        },
        save: function(a, b, c) {
            var d, e, g = this.attributes;
            return null == a || "object" == typeof a ? (d = a, c = b) : (d = {})[a] = b, !d || c && c.wait || this.set(d, c) ? (c = f.extend({
                validate: !0
            }, c), this._validate(d, c) ? (d && c.wait && (this.attributes = f.extend({}, g, d)), 
            void 0 === c.parse && (c.parse = !0), e = c.success, c.success = function(a, b, c) {
                a.attributes = g;
                var k = a.parse(b, c);
                return c.wait && (k = f.extend(d || {}, k)), f.isObject(k) && !a.set(k, c) ? !1 : (e && e(a, b, c), 
                void 0);
            }, a = this.isNew() ? "create" : c.patch ? "patch" : "update", "patch" === a && (c.attrs = d), 
            a = this.sync(a, this, c), d && c.wait && (this.attributes = g), a) : !1) : !1;
        },
        destroy: function(a) {
            a = a ? f.clone(a) : {};
            var b = this, c = a.success, d = function() {
                b.trigger("destroy", b, b.collection, a);
            };
            if (a.success = function(a, b, e) {
                (e.wait || a.isNew()) && d(), c && c(a, b, e);
            }, this.isNew()) return a.success(this, null, a), !1;
            var e = this.sync("delete", this, a);
            return a.wait || d(), e;
        },
        url: function() {
            var a = f.result(this, "urlRoot") || f.result(this.collection, "url") || x();
            return this.isNew() ? a : a + ("/" === a.charAt(a.length - 1) ? "" : "/") + encodeURIComponent(this.id);
        },
        parse: function(a) {
            return a;
        },
        clone: function() {
            return new this.constructor(this.attributes);
        },
        isNew: function() {
            return null == this.id;
        },
        isValid: function(a) {
            return !this.validate || !this.validate(this.attributes, a);
        },
        _validate: function(a, b) {
            if (!b.validate || !this.validate) return !0;
            a = f.extend({}, this.attributes, a);
            var c = this.validationError = this.validate(a, b) || null;
            return c ? (this.trigger("invalid", this, c, b || {}), !1) : !0;
        }
    });
    var s = g.Collection = function(a, b) {
        b || (b = {}), b.model && (this.model = b.model), void 0 !== b.comparator && (this.comparator = b.comparator), 
        this.models = [], this._reset(), this.initialize.apply(this, arguments), a && this.reset(a, f.extend({
            silent: !0
        }, b));
    };
    f.extend(s.prototype, h, {
        model: r,
        initialize: function() {},
        toJSON: function(a) {
            return this.map(function(b) {
                return b.toJSON(a);
            });
        },
        sync: function() {
            return g.sync.apply(this, arguments);
        },
        add: function(a, b) {
            a = f.isArray(a) ? a.slice() : [ a ], b || (b = {});
            var c, d, e, g, p, j, l, k, h, m;
            for (l = [], k = b.at, h = this.comparator && null == k && !1 != b.sort, m = f.isString(this.comparator) ? this.comparator : null, 
            c = 0, d = a.length; d > c; c++) (e = this._prepareModel(g = a[c], b)) ? (p = this.get(e)) ? b.merge && (p.set(g === e ? e.attributes : g, b), 
            h && !j && p.hasChanged(m) && (j = !0)) : (l.push(e), e.on("all", this._onModelEvent, this), 
            this._byId[e.cid] = e, null != e.id && (this._byId[e.id] = e)) : this.trigger("invalid", this, g, b);
            if (l.length && (h && (j = !0), this.length += l.length, null != k ? D.apply(this.models, [ k, 0 ].concat(l)) : C.apply(this.models, l)), 
            j && this.sort({
                silent: !0
            }), b.silent) return this;
            for (c = 0, d = l.length; d > c; c++) (e = l[c]).trigger("add", e, this, b);
            return j && this.trigger("sort", this, b), this;
        },
        remove: function(a, b) {
            a = f.isArray(a) ? a.slice() : [ a ], b || (b = {});
            var c, d, e, g;
            for (c = 0, d = a.length; d > c; c++) (g = this.get(a[c])) && (delete this._byId[g.id], 
            delete this._byId[g.cid], e = this.indexOf(g), this.models.splice(e, 1), this.length--, 
            b.silent || (b.index = e, g.trigger("remove", g, this, b)), this._removeReference(g));
            return this;
        },
        push: function(a, b) {
            return a = this._prepareModel(a, b), this.add(a, f.extend({
                at: this.length
            }, b)), a;
        },
        pop: function(a) {
            var b = this.at(this.length - 1);
            return this.remove(b, a), b;
        },
        unshift: function(a, b) {
            return a = this._prepareModel(a, b), this.add(a, f.extend({
                at: 0
            }, b)), a;
        },
        shift: function(a) {
            var b = this.at(0);
            return this.remove(b, a), b;
        },
        slice: function(a, b) {
            return this.models.slice(a, b);
        },
        get: function(a) {
            return null != a ? (this._idAttr || (this._idAttr = this.model.prototype.idAttribute), 
            this._byId[a.id || a.cid || a[this._idAttr] || a]) : void 0;
        },
        at: function(a) {
            return this.models[a];
        },
        where: function(a) {
            return f.isEmpty(a) ? [] : this.filter(function(b) {
                for (var c in a) if (a[c] !== b.get(c)) return !1;
                return !0;
            });
        },
        sort: function(a) {
            if (!this.comparator) throw Error("Cannot sort a set without a comparator");
            return a || (a = {}), f.isString(this.comparator) || 1 === this.comparator.length ? this.models = this.sortBy(this.comparator, this) : this.models.sort(f.bind(this.comparator, this)), 
            a.silent || this.trigger("sort", this, a), this;
        },
        pluck: function(a) {
            return f.invoke(this.models, "get", a);
        },
        update: function(a, b) {
            b = f.extend({
                add: !0,
                merge: !0,
                remove: !0
            }, b), b.parse && (a = this.parse(a, b));
            var c, d, e, g, h = [], j = [], l = {};
            if (f.isArray(a) || (a = a ? [ a ] : []), b.add && !b.remove) return this.add(a, b);
            for (d = 0, e = a.length; e > d; d++) c = a[d], g = this.get(c), b.remove && g && (l[g.cid] = !0), 
            (b.add && !g || b.merge && g) && h.push(c);
            if (b.remove) for (d = 0, e = this.models.length; e > d; d++) c = this.models[d], 
            l[c.cid] || j.push(c);
            return j.length && this.remove(j, b), h.length && this.add(h, b), this;
        },
        reset: function(a, b) {
            b || (b = {}), b.parse && (a = this.parse(a, b));
            for (var c = 0, d = this.models.length; d > c; c++) this._removeReference(this.models[c]);
            return b.previousModels = this.models.slice(), this._reset(), a && this.add(a, f.extend({
                silent: !0
            }, b)), b.silent || this.trigger("reset", this, b), this;
        },
        fetch: function(a) {
            a = a ? f.clone(a) : {}, void 0 === a.parse && (a.parse = !0);
            var b = a.success;
            return a.success = function(a, d, e) {
                a[e.update ? "update" : "reset"](d, e), b && b(a, d, e);
            }, this.sync("read", this, a);
        },
        create: function(a, b) {
            if (b = b ? f.clone(b) : {}, !(a = this._prepareModel(a, b))) return !1;
            b.wait || this.add(a, b);
            var c = this, d = b.success;
            return b.success = function(a, b, f) {
                f.wait && c.add(a, f), d && d(a, b, f);
            }, a.save(null, b), a;
        },
        parse: function(a) {
            return a;
        },
        clone: function() {
            return new this.constructor(this.models);
        },
        _reset: function() {
            this.length = 0, this.models.length = 0, this._byId = {};
        },
        _prepareModel: function(a, b) {
            if (a instanceof r) return a.collection || (a.collection = this), a;
            b || (b = {}), b.collection = this;
            var c = new this.model(a, b);
            return c._validate(a, b) ? c : !1;
        },
        _removeReference: function(a) {
            this === a.collection && delete a.collection, a.off("all", this._onModelEvent, this);
        },
        _onModelEvent: function(a, b, c, d) {
            ("add" === a || "remove" === a) && c !== this || ("destroy" === a && this.remove(b, d), 
            b && a === "change:" + b.idAttribute && (delete this._byId[b.previous(b.idAttribute)], 
            null != b.id && (this._byId[b.id] = b)), this.trigger.apply(this, arguments));
        },
        sortedIndex: function(a, b, c) {
            b || (b = this.comparator);
            var d = f.isFunction(b) ? b : function(a) {
                return a.get(b);
            };
            return f.sortedIndex(this.models, a, d, c);
        }
    }), f.each("forEach each map collect reduce foldl inject reduceRight foldr find detect filter select reject every all some any include contains invoke max min toArray size first head take initial rest tail drop last without indexOf shuffle lastIndexOf isEmpty chain".split(" "), function(a) {
        s.prototype[a] = function() {
            var b = u.call(arguments);
            return b.unshift(this.models), f[a].apply(f, b);
        };
    }), f.each([ "groupBy", "countBy", "sortBy" ], function(a) {
        s.prototype[a] = function(b, c) {
            var d = f.isFunction(b) ? b : function(a) {
                return a.get(b);
            };
            return f[a](this.models, d, c);
        };
    });
    var y = g.Router = function(a) {
        a || (a = {}), a.routes && (this.routes = a.routes), this._bindRoutes(), this.initialize.apply(this, arguments);
    }, E = /\((.*?)\)/g, F = /(\(\?)?:\w+/g, G = /\*\w+/g, H = /[\-{}\[\]+?.,\\\^$|#\s]/g;
    f.extend(y.prototype, h, {
        initialize: function() {},
        route: function(a, b, c) {
            return f.isRegExp(a) || (a = this._routeToRegExp(a)), c || (c = this[b]), g.history.route(a, f.bind(function(d) {
                d = this._extractParameters(a, d), c && c.apply(this, d), this.trigger.apply(this, [ "route:" + b ].concat(d)), 
                this.trigger("route", b, d), g.history.trigger("route", this, b, d);
            }, this)), this;
        },
        navigate: function(a, b) {
            return g.history.navigate(a, b), this;
        },
        _bindRoutes: function() {
            if (this.routes) for (var a, b = f.keys(this.routes); null != (a = b.pop()); ) this.route(a, this.routes[a]);
        },
        _routeToRegExp: function(a) {
            return a = a.replace(H, "\\$&").replace(E, "(?:$1)?").replace(F, function(a, c) {
                return c ? a : "([^/]+)";
            }).replace(G, "(.*?)"), RegExp("^" + a + "$");
        },
        _extractParameters: function(a, b) {
            return a.exec(b).slice(1);
        }
    });
    var m = g.History = function() {
        this.handlers = [], f.bindAll(this, "checkUrl"), "undefined" != typeof window && (this.location = window.location, 
        this.history = window.history);
    }, z = /^[#\/]|\s+$/g, I = /^\/+|\/+$/g, J = /msie [\w.]+/, K = /\/$/;
    m.started = !1, f.extend(m.prototype, h, {
        interval: 50,
        getHash: function(a) {
            return (a = (a || this).location.href.match(/#(.*)$/)) ? a[1] : "";
        },
        getFragment: function(a, b) {
            if (null == a) if (this._hasPushState || !this._wantsHashChange || b) {
                a = this.location.pathname;
                var c = this.root.replace(K, "");
                a.indexOf(c) || (a = a.substr(c.length));
            } else a = this.getHash();
            return a.replace(z, "");
        },
        start: function(a) {
            if (m.started) throw Error("Backbone.history has already been started");
            m.started = !0, this.options = f.extend({}, {
                root: "/"
            }, this.options, a), this.root = this.options.root, this._wantsHashChange = !1 !== this.options.hashChange, 
            this._wantsPushState = !!this.options.pushState, this._hasPushState = !(!this.options.pushState || !this.history || !this.history.pushState), 
            a = this.getFragment();
            var b = document.documentMode, b = J.exec(navigator.userAgent.toLowerCase()) && (!b || 7 >= b);
            return this.root = ("/" + this.root + "/").replace(I, "/"), b && this._wantsHashChange && (this.iframe = g.$('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo("body")[0].contentWindow, 
            this.navigate(a)), this._hasPushState ? g.$(window).on("popstate", this.checkUrl) : this._wantsHashChange && "onhashchange" in window && !b ? g.$(window).on("hashchange", this.checkUrl) : this._wantsHashChange && (this._checkUrlInterval = setInterval(this.checkUrl, this.interval)), 
            this.fragment = a, a = this.location, b = a.pathname.replace(/[^\/]$/, "$&/") === this.root, 
            this._wantsHashChange && this._wantsPushState && !this._hasPushState && !b ? (this.fragment = this.getFragment(null, !0), 
            this.location.replace(this.root + this.location.search + "#" + this.fragment), !0) : (this._wantsPushState && this._hasPushState && b && a.hash && (this.fragment = this.getHash().replace(z, ""), 
            this.history.replaceState({}, document.title, this.root + this.fragment + a.search)), 
            this.options.silent ? void 0 : this.loadUrl());
        },
        stop: function() {
            g.$(window).off("popstate", this.checkUrl).off("hashchange", this.checkUrl), clearInterval(this._checkUrlInterval), 
            m.started = !1;
        },
        route: function(a, b) {
            this.handlers.unshift({
                route: a,
                callback: b
            });
        },
        checkUrl: function() {
            var a = this.getFragment();
            return a === this.fragment && this.iframe && (a = this.getFragment(this.getHash(this.iframe))), 
            a === this.fragment ? !1 : (this.iframe && this.navigate(a), this.loadUrl() || this.loadUrl(this.getHash()), 
            void 0);
        },
        loadUrl: function(a) {
            var b = this.fragment = this.getFragment(a);
            return f.any(this.handlers, function(a) {
                return a.route.test(b) ? (a.callback(b), !0) : void 0;
            });
        },
        navigate: function(a, b) {
            if (!m.started) return !1;
            if (b && !0 !== b || (b = {
                trigger: b
            }), a = this.getFragment(a || ""), this.fragment !== a) {
                this.fragment = a;
                var c = this.root + a;
                if (this._hasPushState) this.history[b.replace ? "replaceState" : "pushState"]({}, document.title, c); else {
                    if (!this._wantsHashChange) return this.location.assign(c);
                    this._updateHash(this.location, a, b.replace), this.iframe && a !== this.getFragment(this.getHash(this.iframe)) && (b.replace || this.iframe.document.open().close(), 
                    this._updateHash(this.iframe.location, a, b.replace));
                }
                b.trigger && this.loadUrl(a);
            }
        },
        _updateHash: function(a, b, c) {
            c ? (c = a.href.replace(/(javascript:|#).*$/, ""), a.replace(c + "#" + b)) : a.hash = "#" + b;
        }
    }), g.history = new m();
    var A = g.View = function(a) {
        this.cid = f.uniqueId("view"), this._configure(a || {}), this._ensureElement(), 
        this.initialize.apply(this, arguments), this.delegateEvents();
    }, L = /^(\S+)\s*(.*)$/, M = "model collection el id attributes className tagName events".split(" ");
    f.extend(A.prototype, h, {
        tagName: "div",
        $: function(a) {
            return this.$el.find(a);
        },
        initialize: function() {},
        render: function() {
            return this;
        },
        remove: function() {
            return this.$el.remove(), this.stopListening(), this;
        },
        setElement: function(a, b) {
            return this.$el && this.undelegateEvents(), this.$el = a instanceof g.$ ? a : g.$(a), 
            this.el = this.$el[0], !1 !== b && this.delegateEvents(), this;
        },
        delegateEvents: function(a) {
            if (a || (a = f.result(this, "events"))) {
                this.undelegateEvents();
                for (var b in a) {
                    var c = a[b];
                    if (f.isFunction(c) || (c = this[a[b]]), !c) throw Error('Method "' + a[b] + '" does not exist');
                    var d = b.match(L), e = d[1], d = d[2], c = f.bind(c, this), e = e + (".delegateEvents" + this.cid);
                    "" === d ? this.$el.on(e, c) : this.$el.on(e, d, c);
                }
            }
        },
        undelegateEvents: function() {
            this.$el.off(".delegateEvents" + this.cid);
        },
        _configure: function(a) {
            this.options && (a = f.extend({}, f.result(this, "options"), a)), f.extend(this, f.pick(a, M)), 
            this.options = a;
        },
        _ensureElement: function() {
            if (this.el) this.setElement(f.result(this, "el"), !1); else {
                var a = f.extend({}, f.result(this, "attributes"));
                this.id && (a.id = f.result(this, "id")), this.className && (a["class"] = f.result(this, "className")), 
                a = g.$("<" + f.result(this, "tagName") + ">").attr(a), this.setElement(a, !1);
            }
        }
    });
    var N = {
        create: "POST",
        update: "PUT",
        patch: "PATCH",
        "delete": "DELETE",
        read: "GET"
    };
    g.sync = function(a, b, c) {
        var d = N[a];
        f.defaults(c || (c = {}), {
            emulateHTTP: g.emulateHTTP,
            emulateJSON: g.emulateJSON
        });
        var e = {
            type: d,
            dataType: "json"
        };
        if (c.url || (e.url = f.result(b, "url") || x()), null != c.data || !b || "create" !== a && "update" !== a && "patch" !== a || (e.contentType = "application/json", 
        e.data = JSON.stringify(c.attrs || b.toJSON(c))), c.emulateJSON && (e.contentType = "application/x-www-form-urlencoded", 
        e.data = e.data ? {
            model: e.data
        } : {}), c.emulateHTTP && ("PUT" === d || "DELETE" === d || "PATCH" === d)) {
            e.type = "POST", c.emulateJSON && (e.data._method = d);
            var h = c.beforeSend;
            c.beforeSend = function(a) {
                return a.setRequestHeader("X-HTTP-Method-Override", d), h ? h.apply(this, arguments) : void 0;
            };
        }
        "GET" !== e.type && !c.emulateJSON && (e.processData = !1);
        var m = c.success;
        c.success = function(a) {
            m && m(b, a, c), b.trigger("sync", b, a, c);
        };
        var j = c.error;
        return c.error = function(a) {
            j && j(b, a, c), b.trigger("error", b, a, c);
        }, a = c.xhr = g.ajax(f.extend(e, c)), b.trigger("request", b, a, c), a;
    }, g.ajax = function() {
        return g.$.ajax.apply(g.$, arguments);
    }, r.extend = s.extend = y.extend = A.extend = m.extend = function(a, b) {
        var d, c = this;
        d = a && f.has(a, "constructor") ? a.constructor : function() {
            return c.apply(this, arguments);
        }, f.extend(d, c, b);
        var e = function() {
            this.constructor = d;
        };
        return e.prototype = c.prototype, d.prototype = new e(), a && f.extend(d.prototype, a), 
        d.__super__ = c.prototype, d;
    };
    var x = function() {
        throw Error('A "url" property or function must be specified');
    };
}.call(this);