!(async function () {
    const e = "22222222222221111111111111",
        t = document.createElement("span");
    function r(t) {
        return t.indexOf("?") < 0 ? `${t}?access_token=${e}` : `${t}&access_token=${e}`;
    }
    (t.innerText = "Sorting forks..."),
        (t.style.position = "fixed"),
        (t.style.background = "#22f922"),
        (t.style.padding = "10px"),
        (t.style.borderRadius = "10px"),
        (t.style.zIndex = "9999"),
        (t.style.left = "calc(50% - 60px)"),
        (t.style.top = "calc(50% - 20px)"),
        document.body.appendChild(t);
    const n = document.querySelector(".network");
    const ny = n.querySelector(".repo");
    var repolast = ny.querySelectorAll("a.Link--secondary");
    const  o = repolast[repolast.length-1].getAttribute("href").substring(1);

    console.log("TCL: currentRepoUrl", o);
    const a = o.substring(0, o.lastIndexOf("/")),
        s = r(`https://api.github.com/repos/${o}/forks?sort=stargazers`);
    console.log("TCL: forkApiUrl", s);
    let i = await fetch(s);
    const c = await i.json();
    c.forEach((e) => {
        console.log(e.full_name + ", ");
    }),
        console.log("TCL: forks.length: " + c.length);
    const l = [];
    var d, u, h, p;
    async function f(e, t) {
        let r,
            n = await fetch(e);
        if (!n.ok) throw new Error("Network response is not OK!");
        if (((r = await n.json()), "string" == typeof t)) return o(r, t);
        if (Array.isArray(t)) return t.map((e) => o(r, e));
        function o(e, t) {
            if (t.indexOf(".") >= 0) {
                let r = e;
                return (
                    t.split(".").forEach((e) => {
                        r = r[e];
                    }),
                    r
                );
            }
            return e[t];
        }
    }
    async function g(e) {
        return f(r(`https://api.github.com/repos/${e}`), "default_branch");
    }
    function m(e) {
        const t = "http://www.w3.org/2000/svg";
        var r = document.createElementNS(t, "svg");
        r.setAttribute("height", 12),
            r.setAttribute("width", 10.5),
            r.setAttribute("viewBox", "0 0 14 16"),
            (r.style["vertical-align"] = "middle"),
            (r.style.fill = "currentColor"),
            (r.style.position = "relative"),
            (r.style.bottom = "1px"),
            r.classList.add("opticon", "opticon-" + e);
        var n = document.createElementNS(t, "title"),
            o = document.createElementNS(t, "path");
        switch (e) {
            case "star":
                n.appendChild(document.createTextNode("Number of real stars (excluding author's star)")),
                    o.setAttribute("d", "M14 6l-4.9-0.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14l4.33-2.33 4.33 2.33L10.4 9.26 14 6z"),
                    o.setAttribute("fill", "black");
                break;
            case "up":
                n.appendChild(document.createTextNode("Number of commits ahead")), o.setAttribute("d", "M5 3L0 9h3v4h4V9h3L5 3z"), o.setAttribute("fill", "#84ed47"), r.setAttribute("viewBox", "0 0 10 16"), r.setAttribute("height", 16);
                break;
            case "flame":
                n.appendChild(document.createTextNode("Fork may be more recent than upstream.")),
                    o.setAttribute(
                        "d",
                        "M5.05 0.31c0.81 2.17 0.41 3.38-0.52 4.31-0.98 1.05-2.55 1.83-3.63 3.36-1.45 2.05-1.7 6.53 3.53 7.7-2.2-1.16-2.67-4.52-0.3-6.61-0.61 2.03 0.53 3.33 1.94 2.86 1.39-0.47 2.3 0.53 2.27 1.67-0.02 0.78-0.31 1.44-1.13 1.81 3.42-0.59 4.78-3.42 4.78-5.56 0-2.84-2.53-3.22-1.25-5.61-1.52 0.13-2.03 1.13-1.89 2.75 0.09 1.08-1.02 1.8-1.86 1.33-0.67-0.41-0.66-1.19-0.06-1.78 1.25-1.23 1.75-4.09-1.88-6.22l-0.02-0.02z"
                    ),
                    o.setAttribute("fill", "#d26911");
        }
        return o.appendChild(n), r.appendChild(o), r;
    }
    c.forEach((e, t, n) => {
        const o = e.owner.login;
        console.log("TCL: authorName", o);
        const a = r(e.stargazers_url);
        l.push(
            fetch(a)
                .then((e) => {
                    if (e.ok) return e.json();
                    throw new Error("Network response is not OK!");
                })
                .then((e) => {
                    e.forEach((e) => {
                        e.login === o && n[t].stargazers_count > 0 && (console.log(`TCL: starCount of ${o} before: ${n[t].stargazers_count}`), n[t].stargazers_count--, console.log(`TCL: starCount of ${o} after: ${n[t].stargazers_count}`));
                    });
                })
                .catch(function (e) {
                    console.log("There has been a problem with your fetch operation: ", e.message);
                })
        );
    }),
        await Promise.all(l),
        c.sort(
            ((d = "stargazers_count"),
            (u = !0),
            (h = parseInt),
            (p = h
                ? function (e) {
                      return h(e[d]);
                  }
                : function (e) {
                      return e[d];
                  }),
            (u = u ? -1 : 1),
            function (e, t) {
                return (e = p(e)), (t = p(t)), u * ((e > t) - (t > e));
            })
        ),
        console.log("End of modifying stargazer count!"),
        await (async function (e, t) {
            const r = [];
            for (let n = 0; n < e.length; n++) r.push(t(e[n], n, e));
            return Promise.all(r);
        })(c, async (e, t, n) => {
            try {
                const s = e.owner.login,
                    i = e.full_name;
                let c = await g(o),
                    l = await g(i);
                const d = r(`https://api.github.com/repos/${i}/compare/${a}:${c}...${s}:${l}`);
                let [u, h] = await f(d, ["ahead_by", "behind_by"]);
                (n[t].ahead_by = u), (n[t].behind_by = h);
            } catch (e) {
                console.log(e);
            }
        }),
        console.log("TCL: forks", c),
        c.sort(
            (function () {
                var e = [].slice.call(arguments),
                    t = e.length;
                return function (r, n) {
                    var o, a, s, i, c, l, d;
                    for (
                        d = 0;
                        d < t &&
                        ((l = 0),
                        (s = e[d]),
                        (i = "string" == typeof s ? s : s.name),
                        (o = r[i]),
                        (a = n[i]),
                        void 0 !== s.primer && ((o = s.primer(o)), (a = s.primer(a))),
                        (c = s.highToLow ? -1 : 1),
                        o < a && (l = -1 * c),
                        o > a && (l = 1 * c),
                        0 === l);
                        d++
                    );
                    return l;
                };
            })({ name: "stargazers_count", primer: parseInt, highToLow: !0 }, { name: "ahead_by", primer: parseInt, highToLow: !0 }, { name: "behind_by", primer: parseInt, highToLow: !1 })
        ),
        console.log("Beginning of DOM operations!"),
        c.reverse().forEach((e) => {
            const r = e.full_name,
                o = e.stargazers_count;
            let a = !1;
            if (
                (n.querySelectorAll("div.repo").forEach((e) => {
                    const t = e.lastElementChild.getAttribute("href");
                    if (t) {
                        t.substring(1) === r && ((a = !0), s(e));
                    }
                }),
                !a)
            ) {
                const t = document.createElement("div");
                t.classList.add("repo");
                const n = document.createElement("img");
                (n.alt = ""), n.classList.add("network-tree"), (n.src = "https://github.githubassets.com/images/modules/network/t.png");
                const o = e.owner.type.toLowerCase(),
                    a = document.createElement("a");
                a.setAttribute("data-hovercard-type", o);
                const i = e.owner.login;
                if ("user" === o) {
                    const t = e.owner.id;
                    a.setAttribute("data-hovercard-url", `/hovercards?user_id=${t}`);
                } else "organization" === o && (a.setAttribute("data-hovercard-url", `/orgs/${i}/hovercard`), a.setAttribute("href", `/${i}`));
                a.setAttribute("href", `/${i}`), a.setAttribute("data-octo-click", "hovercard-link-click"), a.setAttribute("data-octo-dimensions", "link_type:self");
                const c = a.cloneNode(!0);
                (c.style.paddingLeft = "4px"), (c.style.paddingRight = "4px"), (a.innerText = i), c.classList.add("d-inline-block");
                const l = document.createElement("img");
                l.classList.add("gravatar");
                const d = e.owner.avatar_url;
                (l.src = d), (l.width = "16"), (l.height = "16"), (l.alt = `@${i}`), c.appendChild(l);
                const u = document.createElement("a");
                (u.style.paddingRight = "4px"), u.setAttribute("href", `/${r}`), (u.innerText = e.name), t.appendChild(n), t.appendChild(c), t.appendChild(a), t.appendChild(document.createTextNode(" / ")), t.appendChild(u), s(t);
            }
            function s(t) {
                const r = document.createDocumentFragment();
                if ((r.appendChild(m("star")), r.appendChild(document.createTextNode(o + " ")), e.ahead_by > 0)) {
                    const t = m("up");
                    r.appendChild(t), r.appendChild(document.createTextNode(e.ahead_by + " "));
                }
                e.ahead_by - e.behind_by > 0 && r.appendChild(m("flame")), t.appendChild(r), n.firstElementChild.insertAdjacentElement("afterend", t);
            }
            t.remove(), console.log("TCL: starCount", e.stargazers_count);
        });
})();
