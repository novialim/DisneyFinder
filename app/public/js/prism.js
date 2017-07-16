/* http://prismjs.com/download.html?themes=prism&languages=markup+css+clike+javascript+scss+bash */
self = "undefined" != typeof window ? window : "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope ? self : {};
var Prism = function() {
    var e = /\blang(?:uage)?-(?!\*)(\w+)\b/i
      , t = self.Prism = {
        util: {
            encode: function(e) {
                return e instanceof n ? new n(e.type,t.util.encode(e.content),e.alias) : "Array" === t.util.type(e) ? e.map(t.util.encode) : e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ")
            },
            type: function(e) {
                return Object.prototype.toString.call(e).match(/\[object (\w+)\]/)[1]
            },
            clone: function(e) {
                var n = t.util.type(e);
                switch (n) {
                case "Object":
                    var a = {};
                    for (var r in e)
                        e.hasOwnProperty(r) && (a[r] = t.util.clone(e[r]));
                    return a;
                case "Array":
                    return e.slice()
                }
                return e
            }
        },
        languages: {
            extend: function(e, n) {
                var a = t.util.clone(t.languages[e]);
                for (var r in n)
                    a[r] = n[r];
                return a
            },
            insertBefore: function(e, n, a, r) {
                r = r || t.languages;
                var i = r[e];
                if (2 == arguments.length) {
                    a = arguments[1];
                    for (var l in a)
                        a.hasOwnProperty(l) && (i[l] = a[l]);
                    return i
                }
                var s = {};
                for (var o in i)
                    if (i.hasOwnProperty(o)) {
                        if (o == n)
                            for (var l in a)
                                a.hasOwnProperty(l) && (s[l] = a[l]);
                        s[o] = i[o]
                    }
                return t.languages.DFS(t.languages, function(t, n) {
                    n === r[e] && t != e && (this[t] = s)
                }),
                r[e] = s
            },
            DFS: function(e, n, a) {
                for (var r in e)
                    e.hasOwnProperty(r) && (n.call(e, r, e[r], a || r),
                    "Object" === t.util.type(e[r]) ? t.languages.DFS(e[r], n) : "Array" === t.util.type(e[r]) && t.languages.DFS(e[r], n, r))
            }
        },
        highlightAll: function(e, n) {
            for (var a, r = document.querySelectorAll('code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'), i = 0; a = r[i++]; )
                t.highlightElement(a, e === !0, n)
        },
        highlightElement: function(a, r, i) {
            for (var l, s, o = a; o && !e.test(o.className); )
                o = o.parentNode;
            if (o && (l = (o.className.match(e) || [, ""])[1],
            s = t.languages[l]),
            s) {
                a.className = a.className.replace(e, "").replace(/\s+/g, " ") + " language-" + l,
                o = a.parentNode,
                /pre/i.test(o.nodeName) && (o.className = o.className.replace(e, "").replace(/\s+/g, " ") + " language-" + l);
                var g = a.textContent;
                if (g) {
                    var u = {
                        element: a,
                        language: l,
                        grammar: s,
                        code: g
                    };
                    if (t.hooks.run("before-highlight", u),
                    r && self.Worker) {
                        var c = new Worker(t.filename);
                        c.onmessage = function(e) {
                            u.highlightedCode = n.stringify(JSON.parse(e.data), l),
                            t.hooks.run("before-insert", u),
                            u.element.innerHTML = u.highlightedCode,
                            i && i.call(u.element),
                            t.hooks.run("after-highlight", u)
                        }
                        ,
                        c.postMessage(JSON.stringify({
                            language: u.language,
                            code: u.code
                        }))
                    } else
                        u.highlightedCode = t.highlight(u.code, u.grammar, u.language),
                        t.hooks.run("before-insert", u),
                        u.element.innerHTML = u.highlightedCode,
                        i && i.call(a),
                        t.hooks.run("after-highlight", u)
                }
            }
        },
        highlight: function(e, a, r) {
            var i = t.tokenize(e, a);
            return n.stringify(t.util.encode(i), r)
        },
        tokenize: function(e, n) {
            var a = t.Token
              , r = [e]
              , i = n.rest;
            if (i) {
                for (var l in i)
                    n[l] = i[l];
                delete n.rest
            }
            e: for (var l in n)
                if (n.hasOwnProperty(l) && n[l]) {
                    var s = n[l];
                    s = "Array" === t.util.type(s) ? s : [s];
                    for (var o = 0; o < s.length; ++o) {
                        var g = s[o]
                          , u = g.inside
                          , c = !!g.lookbehind
                          , f = 0
                          , h = g.alias;
                        g = g.pattern || g;
                        for (var p = 0; p < r.length; p++) {
                            var d = r[p];
                            if (r.length > e.length)
                                break e;
                            if (!(d instanceof a)) {
                                g.lastIndex = 0;
                                var m = g.exec(d);
                                if (m) {
                                    c && (f = m[1].length);
                                    var y = m.index - 1 + f
                                      , m = m[0].slice(f)
                                      , v = m.length
                                      , k = y + v
                                      , b = d.slice(0, y + 1)
                                      , w = d.slice(k + 1)
                                      , O = [p, 1];
                                    b && O.push(b);
                                    var N = new a(l,u ? t.tokenize(m, u) : m,h);
                                    O.push(N),
                                    w && O.push(w),
                                    Array.prototype.splice.apply(r, O)
                                }
                            }
                        }
                    }
                }
            return r
        },
        hooks: {
            all: {},
            add: function(e, n) {
                var a = t.hooks.all;
                a[e] = a[e] || [],
                a[e].push(n)
            },
            run: function(e, n) {
                var a = t.hooks.all[e];
                if (a && a.length)
                    for (var r, i = 0; r = a[i++]; )
                        r(n)
            }
        }
    }
      , n = t.Token = function(e, t, n) {
        this.type = e,
        this.content = t,
        this.alias = n
    }
    ;
    if (n.stringify = function(e, a, r) {
        if ("string" == typeof e)
            return e;
        if ("[object Array]" == Object.prototype.toString.call(e))
            return e.map(function(t) {
                return n.stringify(t, a, e)
            }).join("");
        var i = {
            type: e.type,
            content: n.stringify(e.content, a, r),
            tag: "span",
            classes: ["token", e.type],
            attributes: {},
            language: a,
            parent: r
        };
        if ("comment" == i.type && (i.attributes.spellcheck = "true"),
        e.alias) {
            var l = "Array" === t.util.type(e.alias) ? e.alias : [e.alias];
            Array.prototype.push.apply(i.classes, l)
        }
        t.hooks.run("wrap", i);
        var s = "";
        for (var o in i.attributes)
            s += o + '="' + (i.attributes[o] || "") + '"';
        return "<" + i.tag + ' class="' + i.classes.join(" ") + '" ' + s + ">" + i.content + "</" + i.tag + ">"
    }
    ,
    !self.document)
        return self.addEventListener ? (self.addEventListener("message", function(e) {
            var n = JSON.parse(e.data)
              , a = n.language
              , r = n.code;
            self.postMessage(JSON.stringify(t.util.encode(t.tokenize(r, t.languages[a])))),
            self.close()
        }, !1),
        self.Prism) : self.Prism;
    var a = document.getElementsByTagName("script");
    return a = a[a.length - 1],
    a && (t.filename = a.src,
    document.addEventListener && !a.hasAttribute("data-manual") && document.addEventListener("DOMContentLoaded", t.highlightAll)),
    self.Prism
}();
"undefined" != typeof module && module.exports && (module.exports = Prism);
;Prism.languages.markup = {
    comment: /<!--[\w\W]*?-->/g,
    prolog: /<\?.+?\?>/,
    doctype: /<!DOCTYPE.+?>/,
    cdata: /<!\[CDATA\[[\w\W]*?]]>/i,
    tag: {
        pattern: /<\/?[\w:-]+\s*(?:\s+[\w:-]+(?:=(?:("|')(\\?[\w\W])*?\1|[^\s'">=]+))?\s*)*\/?>/gi,
        inside: {
            tag: {
                pattern: /^<\/?[\w:-]+/i,
                inside: {
                    punctuation: /^<\/?/,
                    namespace: /^[\w-]+?:/
                }
            },
            "attr-value": {
                pattern: /=(?:('|")[\w\W]*?(\1)|[^\s>]+)/gi,
                inside: {
                    punctuation: /=|>|"/g
                }
            },
            punctuation: /\/?>/g,
            "attr-name": {
                pattern: /[\w:-]+/g,
                inside: {
                    namespace: /^[\w-]+?:/
                }
            }
        }
    },
    entity: /\&#?[\da-z]{1,8};/gi
},
Prism.hooks.add("wrap", function(t) {
    "entity" === t.type && (t.attributes.title = t.content.replace(/&amp;/, "&"))
});
;Prism.languages.css = {
    comment: /\/\*[\w\W]*?\*\//g,
    atrule: {
        pattern: /@[\w-]+?.*?(;|(?=\s*{))/gi,
        inside: {
            punctuation: /[;:]/g
        }
    },
    url: /url\((["']?).*?\1\)/gi,
    selector: /[^\{\}\s][^\{\};]*(?=\s*\{)/g,
    property: /(\b|\B)[\w-]+(?=\s*:)/gi,
    string: /("|')(\\?.)*?\1/g,
    important: /\B!important\b/gi,
    punctuation: /[\{\};:]/g,
    "function": /[-a-z0-9]+(?=\()/gi
},
Prism.languages.markup && (Prism.languages.insertBefore("markup", "tag", {
    style: {
        pattern: /<style[\w\W]*?>[\w\W]*?<\/style>/gi,
        inside: {
            tag: {
                pattern: /<style[\w\W]*?>|<\/style>/gi,
                inside: Prism.languages.markup.tag.inside
            },
            rest: Prism.languages.css
        },
        alias: "language-css"
    }
}),
Prism.languages.insertBefore("inside", "attr-value", {
    "style-attr": {
        pattern: /\s*style=("|').+?\1/gi,
        inside: {
            "attr-name": {
                pattern: /^\s*style/gi,
                inside: Prism.languages.markup.tag.inside
            },
            punctuation: /^\s*=\s*['"]|['"]\s*$/,
            "attr-value": {
                pattern: /.+/gi,
                inside: Prism.languages.css
            }
        },
        alias: "language-css"
    }
}, Prism.languages.markup.tag));
;Prism.languages.clike = {
    comment: [{
        pattern: /(^|[^\\])\/\*[\w\W]*?\*\//g,
        lookbehind: !0
    }, {
        pattern: /(^|[^\\:])\/\/.*?(\r?\n|$)/g,
        lookbehind: !0
    }],
    string: /("|')(\\?.)*?\1/g,
    "class-name": {
        pattern: /((?:(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[a-z0-9_\.\\]+/gi,
        lookbehind: !0,
        inside: {
            punctuation: /(\.|\\)/
        }
    },
    keyword: /\b(if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/g,
    "boolean": /\b(true|false)\b/g,
    "function": {
        pattern: /[a-z0-9_]+\(/gi,
        inside: {
            punctuation: /\(/
        }
    },
    number: /\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee]-?\d+)?)\b/g,
    operator: /[-+]{1,2}|!|<=?|>=?|={1,3}|&{1,2}|\|?\||\?|\*|\/|\~|\^|\%/g,
    ignore: /&(lt|gt|amp);/gi,
    punctuation: /[{}[\];(),.:]/g
};
;Prism.languages.javascript = Prism.languages.extend("clike", {
    keyword: /\b(break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|false|finally|for|function|get|if|implements|import|in|instanceof|interface|let|new|null|package|private|protected|public|return|set|static|super|switch|this|throw|true|try|typeof|var|void|while|with|yield)\b/g,
    number: /\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee][+-]?\d+)?|NaN|-?Infinity)\b/g,
    "function": /(?!\d)[a-z0-9_$]+(?=\()/gi
}),
Prism.languages.insertBefore("javascript", "keyword", {
    regex: {
        pattern: /(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\r\n])+\/[gim]{0,3}(?=\s*($|[\r\n,.;})]))/g,
        lookbehind: !0
    }
}),
Prism.languages.markup && Prism.languages.insertBefore("markup", "tag", {
    script: {
        pattern: /<script[\w\W]*?>[\w\W]*?<\/script>/gi,
        inside: {
            tag: {
                pattern: /<script[\w\W]*?>|<\/script>/gi,
                inside: Prism.languages.markup.tag.inside
            },
            rest: Prism.languages.javascript
        },
        alias: "language-javascript"
    }
});
;Prism.languages.scss = Prism.languages.extend("css", {
    comment: {
        pattern: /(^|[^\\])(\/\*[\w\W]*?\*\/|\/\/.*?(\r?\n|$))/g,
        lookbehind: !0
    },
    atrule: /@[\w-]+(?=\s+(\(|\{|;))/gi,
    url: /([-a-z]+-)*url(?=\()/gi,
    selector: /([^@;\{\}\(\)]?([^@;\{\}\(\)]|&|\#\{\$[-_\w]+\})+)(?=\s*\{(\}|\s|[^\}]+(:|\{)[^\}]+))/gm
}),
Prism.languages.insertBefore("scss", "atrule", {
    keyword: /@(if|else if|else|for|each|while|import|extend|debug|warn|mixin|include|function|return|content)|(?=@for\s+\$[-_\w]+\s)+from/i
}),
Prism.languages.insertBefore("scss", "property", {
    variable: /((\$[-_\w]+)|(#\{\$[-_\w]+\}))/i
}),
Prism.languages.insertBefore("scss", "ignore", {
    placeholder: /%[-_\w]+/i,
    statement: /\B!(default|optional)\b/gi,
    "boolean": /\b(true|false)\b/g,
    "null": /\b(null)\b/g,
    operator: /\s+([-+]{1,2}|={1,2}|!=|\|?\||\?|\*|\/|\%)\s+/g
});
;Prism.languages.bash = Prism.languages.extend("clike", {
    comment: {
        pattern: /(^|[^"{\\])(#.*?(\r?\n|$))/g,
        lookbehind: !0
    },
    string: {
        pattern: /("|')(\\?[\s\S])*?\1/g,
        inside: {
            property: /\$([a-zA-Z0-9_#\?\-\*!@]+|\{[^\}]+\})/g
        }
    },
    keyword: /\b(if|then|else|elif|fi|for|break|continue|while|in|case|function|select|do|done|until|echo|exit|return|set|declare)\b/g
}),
Prism.languages.insertBefore("bash", "keyword", {
    property: /\$([a-zA-Z0-9_#\?\-\*!@]+|\{[^}]+\})/g
}),
Prism.languages.insertBefore("bash", "comment", {
    important: /(^#!\s*\/bin\/bash)|(^#!\s*\/bin\/sh)/g
});
;