! function a(b, c, d) {
	function e(g, h) {
		var i, j, k;
		if(!c[g]) {
			if(!b[g]) {
				if(i = "function" == typeof require && require, !h && i) return i(g, !0);
				if(f) return f(g, !0);
				throw j = new Error("Cannot find module '" + g + "'"), j.code = "MODULE_NOT_FOUND", j
			}
			k = c[g] = {
				exports: {}
			}, b[g][0].call(k.exports, function(a) {
				var c = b[g][1][a];
				return e(c ? c : a)
			}, k, k.exports, a, b, c, d)
		}
		return c[g].exports
	}
	for(var f = "function" == typeof require && require, g = 0; g < d.length; g++) e(d[g]);
	return e
}({
	1: [function(a) {
		var d = a("./js/main");
		d.init(window)
	}, {
		"./js/main": 9
	}],
	2: [function(a, b) {
		var d = a("./Event"),
			e = a("./Params"),
			f = a("./Util"),
			g = a("./Dialog"),
			h = a("./Config"),
			i = [].slice,
			j = {
				act: {
					b: "batchdownload",
					dl: "download",
					d: "detail"
				},
				ls: {},
				init: function() {
					var a = this;
					a.setVersionSupport("MM", [510, 501, 500]), a.setVersionSupport("MMLITE", [200, 200, 200]), a.setVersionSupport("MMOPEN", [100, 100, 100])
				},
				setVersionSupport: function(a, b) {
					var c = this,
						d = c.ls[a] || (c.ls[a] = {});
					d[c.act.b] = b[0], d[c.act.dl] = b[1], d[c.act.d] = b[2]
				},
				support: function(a) {
					var h, b = this,
						c = f.getCookie(e.version),
						d = f.getCookie(e.version_type),
						g = !1;
					return a && f.s(c) && c.length > 0 && (c = parseInt(c, 10), h = b.ls[d][a], h && c >= h && (g = !0)), g
				},
				checkVersion: function(a) {
					var b = f.getCookie(e.version),
						c = !1;
					return f.s(b) && b.length > 0 && (b = parseInt(b, 10), b > a && (c = !0)), c
				}
			},
			k = {
				ua: navigator.userAgent.toLowerCase(),
				isChrome: function() {
					var a = this.ua;
					return a.match(/360 aphone /i) ? !1 : "chrome" == a.match(/Chrome/i)
				},
				query: function(a) {
					var c, b = "";
					for(c in a) b += encodeURIComponent(c) + "=" + encodeURIComponent(a[c]) + "&";
					return b
				},
				isWechat: function() {
					return "micromessenger" == this.ua.match(/MicroMessenger/i) ? 1 : 0
				},
				isIOS: function() {
					return /ios|ipad|iphone|ipod/i.test(this.ua)
				},
				isQq: function() {
					return this.ua.match(/MQQBrowser/i) ? 1 : 0
				},
				bs: function() {
					var d, a = "",
						b = this.ua,
						c = {
							whatchar: b.match(/MicroMessenger/i) ? "微信" : "",
							uc: b.match(/(UCBrowser)|(UCWEB)/i) ? "UC浏览器" : "",
							qq: b.match(/MQQBrowser/i) ? "QQ浏览器" : "",
							op: b.match(/oupeng/i) ? "欧朋浏览器" : "",
							ay: b.match(/MxBrowser/i) ? "遨游浏览器" : "",
							lb: b.match(/LieBao/i) ? "猎豹浏览器" : "",
							xm: b.match(/MiuiBrowser/i) ? "小米浏览器" : "",
							bd: b.match(/baidubrowser/i) ? "百度浏览器" : "",
							b360: b.match(/360 aphone/i) ? "360浏览器" : "",
							sg: b.match(/sogoumobilebrowser/i) ? "搜狗浏览器" : ""
						};
					for(d in c)
						if("" != c[d]) {
							a = c[d];
							break
						}
					return a
				},
				longFileNameAccept: function() {
					var d, a = !1,
						b = this.ua,
						c = {
							qq: b.match(/MQQBrowser/i) ? "QQ浏览器" : "",
							ay: b.match(/MxBrowser/i) ? "遨游浏览器" : "",
							lb: b.match(/LieBao/i) ? "猎豹浏览器" : "",
							bd: b.match(/baidubrowser/i) ? "百度浏览器" : ""
						};
					for(d in c)
						if("" != c[d]) {
							a = !0;
							break
						}
					return a
				},
				getCurrentBs: function() {
					var a = this.bs();
					return "" != a ? a : "浏览器"
				}
			},
			l = {
				reqUrl: {
					index: "mm://index",
					download2: "mm://downloadmanager?url=",
					batchDownload2: "mm://downloadmanager?contentids=",
					launch: "mm://launchbrowser?url=",
					appdetail: "mm://appdetail?requestid=app_info_forward&contentid=",
					downloadUri: "http://odp.mmarket.com/t.do?requestid=app_order&goodsid=999100008100930100001752138{contentid}&payMode=1",
					mmrelaapp: "http://zjw.mmarket.com/mmapk/{channelid}/mmarket-999100008100930100001752138{contentid}-180.apk",
					batchmmrelaapp: "http://zjw.mmarket.com/mmapk/{channelid}/mmarket-{contentid}-180.apk",
					MM_CONTENT_ID: "300000863435"
				},
				reqMethod: {
					queryapp: "queryapp&appname=",
					querydownprogress: "querydownprogress&contentid=",
					download: "download&url=",
					jump: "jump&url=",
					batchdownload: "batchdownload&contentids="
				},
				run: function(a, b) {
					var c = this;
					b && c.isChrome() ? c.chrome(a) : c.iframe(a)
				},
				isChrome: function() {
					var a = navigator.userAgent.toLowerCase();
					return a.match(/360 aphone /i) ? !1 : "chrome" == a.match(/Chrome/i)
				},
				downloadApp: function(a) {
					window.location.href = a
				},
				chrome: function(a) {
					var b = a.split("://"),
						c = b[0],
						a = b[1],
						d = "intent://" + a + "#Intent;scheme=" + c + ("mm" == c ? ";package=" + e.mmpkg : "") + ";end";
					window.location.href = d
				},
				iframe: function(a) {
					var b = document.createElement("iframe");
					b.style.display = "none", b.src = a, document.body.appendChild(b), setTimeout(function() {
						document.body.removeChild(b)
					}, 2e3)
				},
				open: function(a, b) {
					var c = this,
						d = j,
						f = k,
						b = b || h.showtitle,
						g = c.reqUrl,
						i = c.reqMethod,
						l = g.launch + encodeURIComponent(a),
						m = e.getBaseUrl();
					d.support(d.act.d) ? (l = m + i.jump + encodeURIComponent(a) + (b ? "&appname=" + f.getCurrentBs() : ""), c.iframe(l)) : c.run(l, !0)
				},
				batchDownload: function(a) {
					this.download(a, j.act.b)
				},
				download: function(a, b) {
					var f, i, l, m, n, c = this,
						d = j;
					if(b = b || d.act.dl, f = c.reqUrl, i = c.reqMethod, l = f.appdetail + encodeURIComponent(a), m = e.getBaseUrl(), d.support(b)) switch(b) {
						case d.act.dl:
							l = m + i.download + encodeURIComponent(f.downloadUri.replace("{contentid}", a)), c.iframe(l);
							break;
						case d.act.b:
							l = m + i.batchdownload + a, c.iframe(l)
					} else d.act.dl === b ? c.run(l, !0) : d.act.b == b && (c.run(l, !0), n = function() {
						var a;
						d.support(d.act.d) ? (a = m + i.jump + encodeURIComponent(f.appdetail + f.MM_CONTENT_ID) + (h.showtitle ? "&appname=" + k.getCurrentBs() : ""), c.iframe(a)) : (a = f.appdetail + encodeURIComponent(f.MM_CONTENT_ID), c.run(a, !0))
					}, g.one("dialog.after.show", function() {
						g.one("dialog.res.save", n)
					}), g.show({
						type: "alert",
						info: h.lowVersionAlert
					}))
				},
				detail: function(a, b) {
					var c = this,
						d = j,
						f = k,
						g = c.reqUrl,
						b = b || h.showtitle,
						i = c.reqMethod,
						l = g.appdetail + encodeURIComponent(a),
						m = e.getBaseUrl();
					d.support(d.act.d) ? (l = m + i.jump + encodeURIComponent(g.appdetail + a) + (b ? "&appname=" + f.getCurrentBs() : ""), c.iframe(l)) : c.run(l, !0)
				},
				error: function() {
					var p, q, t, u, v, a = this,
						b = h.onIntent,
						c = a.reqUrl,
						e = k,
						f = e.ua.match(/(UCBrowser)|(UCWEB)/i),
						j = f || e.isQq() ? 1 : 0,
						m = i.call(arguments),
						n = m[0],
						o = !("open" === n && !m[2]);
					e.isWechat() ? o && (p = function() {
						a.downloadApp(h.wetchartmm)
					}, h.useGuide ? (g.one("dialog.after.show", function() {
						g.one("dialog.res.save", p)
					}), q = "detail" === m[0] || "open" === m[0] ? "detail" : "download", g.show({
						type: "weixin",
						flag: q
					})) : p(), d.trigger("server.over.error", n)) : !b && o ? a.downloadmm.apply(a, m) : (Date.now(), "open" === n ? (t = m[1], t && !j ? a.iframe(c.launch + encodeURIComponent(t)) : a.iframe(c.index)) : "detail" === n ? (u = m[1], u && !j ? a.iframe(c.appdetail + u) : a.iframe(c.index)) : "download" === n ? (v = c.download2 + encodeURIComponent(this.reqUrl.downloadUri.replace("{contentid}", m[1])), a.iframe(v)) : "batchDownload" === n ? (v = c.batchDownload2 + m[1], a.iframe(v)) : a.iframe(c.index))
				},
				downloadmm: function(a) {
					var o, p, q, r, s, b = this,
						c = j,
						e = k,
						f = i.call(arguments, 1),
						l = f && f[0] || "",
						m = e.bs(),
						n = e.longFileNameAccept();
					d.trigger("server.over.error", a), h.downloadmm && a && (o = function() {
						var b = "";
						switch(a) {
							case "download":
								b = c.act.dl;
								break;
							case "batchDownload":
								b = c.act.b;
								break;
							default:
								b = c.act.d
						}
						return b
					}(), p = b.getMMUrl(o), "" == m || !n && o == c.act.b || o == c.act.d ? b.downloadApp(p.replace("{contentid}", "")) : b.downloadApp(p.replace("{contentid}", l)), h.useGuide && (q = o == c.act.d || "open" == o ? "detail" : "download", r = i.call(arguments), r.unshift("server.check.start"), s = function() {
						d.trigger.apply(d, r)
					}, setTimeout(function() {
						g.one("dialog.after.show", function() {
							g.one("dialog.res.save", s)
						}), g.show({
							type: "guid",
							flag: q
						})
					}, 1e3)))
				},
				getMMUrl: function() {
					var b = this,
						c = b.reqUrl;
					return c.batchmmrelaapp.replace("{channelid}", h.channelid)
				},
				none: function() {}
			};
		j.init(), b.exports = {
			execute: function(a) {
				var b = l;
				return b[a] && b[a].apply(b, i.call(arguments, 1))
			},
			browserUtil: k
		}
	}, {
		"./Config": 3,
		"./Dialog": 4,
		"./Event": 5,
		"./Params": 6,
		"./Util": 8
	}],
	3: [function(a, b) {
		function d(a) {
			return {
				version_reg: new RegExp("^(" + a + ")[0-9]+(\\.[0-9]*|$)?(\\.[0-9]*|$)?", "i"),
				version_prefix: new RegExp("^(" + a + ")", "i")
			}
		}
		var e = "MMLite|MMOpen|MM",
			f = d(e),
			g = null;
		b.exports = {
			batchMaxApps: "15",
			maxAlert: "批量下载超过最大下载数15个,请重新选择",
			lowVersionAlert: "抱歉,您的MM版本过低无法支持该功能,请升级新版客户端",
			showtitle: !0,
			channelid: "5410093632",
			onIntent: !0,
			useGuide: 1,
			wetchartmm: "http://a.app.qq.com/o/simple.jsp?pkgname=com.aspire.mm",
			callOnlyVersion: function(a) {
				var c, e, b = this;
				b.onIntent = !1, c = a.split("|"), c.length, c.sort(function(a, b) {
					return b.length - a.length
				}), a = c.length > 0 ? c.join("|") : c[0], e = d(a), b.version_reg = e.version_reg, b.version_prefix = e.version_prefix
			},
			setVersionLimit: function(a) {
				if(!/^\d+$/g.test(a)) throw new Error("参数只能为数字");
				var b = this;
				b.onIntent = !1, g = a
			},
			versionCode: function() {
				return g
			},
			versionReg: function() {
				return f
			},
			downloadmm: 1
		}
	}, {}],
	4: [function(a, b) {
		var d = a("./Event"),
			e = a("./Util"),
			f = {
				cssloaded: 0,
				el: {},
				options: {
					type: "alert",
					info: "",
					base: "",
					flag: "download",
					css: "mmapp.css"
				},
				infos: {
					guid: {
						detail: {
							info: '安装并启动MM商城<span class="__mm-wap-hint-link" id="__mm-wap-success">请点这里</span>即可打开目标页面'
						},
						download: {
							info: '安装并启动MM商场后将自动开始高速下载，如没开始高速下载，<span class="__mm-wap-hint-link" id="__mm-wap-success">请点这里</span>'
						}
					},
					weixin: {
						detail: {
							tit: "操作指引",
							tip: "请按以下步骤操作",
							second: "回到微信再次点击"
						},
						download: {
							tit: "高速下载指引",
							tip: "请按以下步骤操作完成高速下载：",
							second: "回到微信再次点击“高速下载”。"
						}
					}
				},
				movePrevent: function(a) {
					this.preventDefault(a), this.stopPropagation(a)
				},
				set: function(a) {
					var c, b = this;
					for(c in b.options) "undefined" != typeof a[c] && (b.options[c] = a[c])
				},
				view: function() {
					var d, a = this,
						b = "",
						c = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QTVEODgwMTBBNjQwMTFFNkJBQTU5MDgzMDI5RUQ1RUIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QTVEODgwMTFBNjQwMTFFNkJBQTU5MDgzMDI5RUQ1RUIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBNUQ4ODAwRUE2NDAxMUU2QkFBNTkwODMwMjlFRDVFQiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBNUQ4ODAwRkE2NDAxMUU2QkFBNTkwODMwMjlFRDVFQiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pn2r2asAAAWPSURBVHja3Jp5bBVVFMZvh0exbFIEKQQUbSmNItEKCpUiYPCPBlEguETQuCRGiIIQxQVjAAkUMCFFjSwJqGGRQOOuGEEDGhRQC1oBW9sYkS1taEARpRa+E74LJ8PrdN5789p5fskvc2fem7lz5m7nnJm0uro6E5B6g0HgRpANeoLLQAZIA38DqewPUAXKwDdgbxCVRxI8vwe4B9wJbvV5zg2u/R3gQ7AWVMZ7I2lxtkgueAJMBJe6fpMnvB9UgKPgJDjDlukCrgZ9wfWu8+ppzGLwfbINuQTMAdOAo45/DD4Am2mAH/UCw8AdbNF09dvb4Dl2w8ANuR28BnK4L31+KVgWQD+X8fQQmAy68Zjc2BTwVpCGPA/mqv03wHzwmwlWmeBpMEO1+KvsxgkbsgI8wvIB8CjYZJKrAWC5GkfSZYvAv42d4DRxwXXKiM954WQbIdrF2W0V928DX7vGkW9DlnNqtYNvJKg1zSsZN/NUK22K1ZBn2IVEa8ADpuUk47OY5WGcXHyNkZu54oq+AoUmHJJeMYFl2a72MkRaqBpcAY7R7ThuwqNycA0HfRbvMWrXepFGiO4NmRGicdymcw2LOka6ghdY3gA+M+HTPnoWovHazdGGTAetQQOYasKr2fThjDLqvCHtweMsr4zFx2kB1dOrEI2yLpM1ZCzoyPLCBCtqFdB/vLSUvp6xC7Y1xC5839IFj0U59F7FF/sS1NBzbUyz+J8t4GV6v9kx1imhQSnLd9nASuKJ4TxY2sQFrgT9QT4YDG6io6d1QvXhaDrCsThc1WvoNUiQtZ3xyB7wu8d11oP7QR7oJ+vICDplooH0cwwrG8rwVW74FoauWqe4eG7neVL5rwykvOSwJfszNC7gQtzG9b8aLso72Fu2gdP8rTM4yHMmiyEzOHiOMC6oV25Kseumv+NNy0V/5nTYENAgbsWney0fXAFbXhv3JFii9nfSB1sWYSvYObpe/ekLUAJ284RfwD9JnI3+48pdzm5jI9JcGtaPLaK1m4bkRNgKJkqQtJO0pE6xu+5p5PcqbrOkr3bizmGTerJhRabD7Ibxir5CrJPcZjjmfyJHrZDpKXj/7WxGx2HaRdQ9BQ3pzO0xR62evVPQEJtjO+Rw1RT15WqeSrLxSIWj1orLzcUJ5jCrC70AUZlDt+MvHhiRQoYMVRPU1gi9VXEaRzMmnp9gBRl0BIWrQFs6erV0P+TBVQZgyN0qIbHXvh95h4YMYHOVx3HhfEaZE+gjeekn8CZTOofiqKuDjUNs6GHTQW3pEktsssqcy/D5lYytBeBB7v8JNtJLruJ+hMkNeUhFDA2spAfMizFjoz1zed9SrfNaEsjPVFOx30z7eHqrVayg1Ec8IteXl0Qv0X2Xt11bfdaXzocusdG7YIw7QZfJZhb//z3VdE2pI6PFLSroiaU18xky+A0RivnADF37crchIv0eROLw90M2U8mN/8jyanMhhRo191vJZMBx9r/aEBlSwdVc/MMsPa6cRvq87TKfhsiI9colmeieHKIZ8gN4imWZjjeEwIjF6gGXcFY0TRliTyxheZyKoVvKiCksf6LKvgwxPGGl6m7y6qtHMxoga88adeOSFhrlFVh56WHVMgXsdmOawYhCzk73cf8jrjUN8RpiW2aamvdLufrnJsEAmYle4eKYx2OL2BKe+bNYPhgYAl4H13FfcmDyPk9empYlaEAfc+6d5WPmwichh/kQfY3PeL5FkST0s64YfzObX7b7fGZk+jBsKKLDqiUfJMjbsxq/NxXvRzXink+io9jV9Vs1jRHf66hK2bRhMJRNI/KipHZktV6iVm+TbEOsxIixnKILfbjv0bSNzt9Gk8AnIWkBfniWxQV0IJ+2+8MzSX/KW9gDdDUkwNrFFkxYZwUYAFG8X10/VXN/AAAAAElFTkSuQmCC";
					return "guid" === a.options.type ? (d = a.infos.guid[a.options.flag], b = '<div class="__mm-wap-hint"><div class="__mm-wap-hint-msg">' + d.info + '</div><div class="__mm-wap-hint-close" id="__mm-wap-close"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAfCAYAAAAfrhY5AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MjIwMUY5NTEyQUJCMTFFNTg0MTQ5NzUyMzMyNDY2QjEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MjIwMUY5NTIyQUJCMTFFNTg0MTQ5NzUyMzMyNDY2QjEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoyMjAxRjk0RjJBQkIxMUU1ODQxNDk3NTIzMzI0NjZCMSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoyMjAxRjk1MDJBQkIxMUU1ODQxNDk3NTIzMzI0NjZCMSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PpWGpx8AAAEwSURBVHjavJU9DoJAEEZh9Aja0FtZWHACDdaWFl7AwrvY6Q0sNF7AmHgDEwtbDyDUVib6bcImhPAz+zNs8goC4b0lMIRxHAdYa3AGadDhIrABe3ADww6cA3ABYyU/gqc66CBAia9gDrZK/gazDgK0eAIeYEX5CRUwFQwoi9XOUypckAoFVIr1CxcIBtSKq+Q+AxrFdXIfAa3iJrlLAEvcJrcJYIs5cpMAIzFXzgkoixPOf4IMXqK6gCpxxrlh3/Dz0QG3QsDXRmwjrwoIbMSmj724fvmOi5sIbf7nrpPLehKSozhxmYTkKM5cRjE5ip1GMXkQWweQJ7FVAHkUGweQZ7FRAAmI2QEkJGYFkKC4NYCExY0BWn4QFNcFLHtRFKkTdzACCyGxXh9wAi+w+wswAP5lpcbsuZqsAAAAAElFTkSuQmCC" /></div></div>') : "weixin" === a.options.type ? (d = a.infos.weixin[a.options.flag], b = '<div class="__mm-wap-dialog-mask"></div><div class="__mm-wap-dialog" id="__mm-wap-dialog"><div class="__mm-wap-dialog-close " id="__mm-wap-close"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAfCAYAAAAfrhY5AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MjIwMUY5NTEyQUJCMTFFNTg0MTQ5NzUyMzMyNDY2QjEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MjIwMUY5NTIyQUJCMTFFNTg0MTQ5NzUyMzMyNDY2QjEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoyMjAxRjk0RjJBQkIxMUU1ODQxNDk3NTIzMzI0NjZCMSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoyMjAxRjk1MDJBQkIxMUU1ODQxNDk3NTIzMzI0NjZCMSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PpWGpx8AAAEwSURBVHjavJU9DoJAEEZh9Aja0FtZWHACDdaWFl7AwrvY6Q0sNF7AmHgDEwtbDyDUVib6bcImhPAz+zNs8goC4b0lMIRxHAdYa3AGadDhIrABe3ADww6cA3ABYyU/gqc66CBAia9gDrZK/gazDgK0eAIeYEX5CRUwFQwoi9XOUypckAoFVIr1CxcIBtSKq+Q+AxrFdXIfAa3iJrlLAEvcJrcJYIs5cpMAIzFXzgkoixPOf4IMXqK6gCpxxrlh3/Dz0QG3QsDXRmwjrwoIbMSmj724fvmOi5sIbf7nrpPLehKSozhxmYTkKM5cRjE5ip1GMXkQWweQJ7FVAHkUGweQZ7FRAAmI2QEkJGYFkKC4NYCExY0BWn4QFNcFLHtRFKkTdzACCyGxXh9wAi+w+wswAP5lpcbsuZqsAAAAAElFTkSuQmCC" /></div><div class="__mm-wap-hd">' + d.tit + '</div><div class="__mm-wap-bd"><p class="__mm-wap-guid-tit">' + d.tip + '</p><div class="__mm-wap-guid-step"><p>第<span class="__mm-wap-guid-step-num">1</span>步 </p><p>下载安装MM商场后<span class="__mm-wap-guid-step-hint">启动一次</span>或<span class="__mm-wap-guid-step-hint">打开一次</span></p></div><div class="__mm-wap-guid-step"><p>第<span class="__mm-wap-guid-step-num">2</span>步</p><p>' + d.second + '</p></div></div><div class="__mm-wap-ft"><div class="__mm-wap-btn  " id="__mm-wap-success">前往下载MM商场</div></div></div>') : b = "ios-weixin" === a.options.type ? '<div class=__mm-wap-dialog-mask><div id="__mm-wap-dialog" class="__mm-wap-no-support-toast"><div id="toast-guide" class=__mm-wap-iso-no-support-guid><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAA1CAYAAAAztqkoAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6REYwNjY3MUVBNjQwMTFFNjk4QTFDQjExMzhENzdGMjciIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6REYwNjY3MUZBNjQwMTFFNjk4QTFDQjExMzhENzdGMjciPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpERjA2NjcxQ0E2NDAxMUU2OThBMUNCMTEzOEQ3N0YyNyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpERjA2NjcxREE2NDAxMUU2OThBMUNCMTEzOEQ3N0YyNyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PhZTwDQAAANNSURBVHjazJl7aE9hGMffaYQJmSXCVmt/uDdC/fhDjWQuNaNFI6VWJHIpRcytKLeixB+EJPd/2Ihcov1GUcgltskolOQ3fyzm+n3se9rTcX7T77dzeZ/6dJ5z3nNO3/O85z3v8z4nI5FImIisC7gBYmAy/X+sk4nOtoIJIAOsT3ZSRkQRnARuuo6NAE9sieAej2MltnRxJSj0OD7Lhi4eB+610z4R1EQZwd3cfgffPNrnRNnFaxghsSvgOf1r4Bb9maBbFAKHg5306xjJQdy/Ds7SzwdFUQjcpfxl4API5v5TJVCsLGyBS8FU+lXgqtoXawYfQZz7M0DfsATmuwbGatXlYl9BI/0z3PamyFAE7gBd1SB5QX8ot/WggX41BYvNDkPgIvXZuA320c8Bo+g3qvPrOGCcbs4NUuAA1bViK5SfB3rQv+u6zulmSSBKgxS4HfShvw48VG0x5buTgyoOGBOkwJFgIf0HFOv+Jjqj97Gr7RPfRedBCoMQ+JLvUhOo8GiPqQHyyqP9nPLLMwMQKCNxGnvHPd/mqRFcm+T6y+A1z40F9Q4mSwamKD+e5NqfYDNoAccyTbg2Xj1AbTvnHSWhZjOd1RT3jN+9/1qYAkeDgWrWMLYJLFZ+jY0Cp3P7nkmqVQJlSTlGzRYttgnUS8rqVC4MS2Apt+/AJdsEFnF+FjvPb6BVAhco/1SqFwctcDCYq6a2uG0CF4Pu9I+kc4MgSx89mXr1Y3ZSAH7YFMEKihM7kI64ICPYi6WN/kzhC5jAGlsiuJziDFdzTeneKIgI5nKtIe/gGzCE6w9jSwQ3UpyzumvuyM38jmCpWvTcB2M7ekM/Iyg1lb1qf5UfN/VT4GHTVvPbAu7YJHCDKvjIYmiTX0/th8B5jJjYFyYHv20RKOuMk7oSYNrKaZELLGH67tgScNHvb1a6AleCC2pfipMHg5iSUq0sSLX0hErhnWltf1AZRyoC53NezVY1lDKm8SYqgfJPV8q4a9W6QuwRo9hgArZM9S5K2TWL5YlhpvUnswyEHNc1leqzYsIQKIml/B5NMGLZHoPnFzjOROBtiNWIvwKLGbksj3ZJOk+DQ6b171DoJgK3MWJSHvvMxbWUx+TXQb2J2P4IMADlBqwIsIY18QAAAABJRU5ErkJggg=="><p>点击分享</p></div><div class=__mm-wap-iso-no-support><img src="' + c + '"><p class=title>Sorry!</p><p class=text>我们只支持安卓设备</p><p class=text>但不影响你把好东西分享给</p><p class=text>使用安卓手机的朋友</p></div></div></div>' : "ios" === a.options.type ? '<div class=__mm-wap-dialog-mask><div id="__mm-wap-dialog" class=__mm-wap-iso-no-support><img src="' + c + '"><p class=title>Sorry!</p><p class=text>我们只支持安卓设备</p></div></div>' : '<div class="__mm-wap-dialog-mask"></div><div class="__mm-wap-dialog" id="__mm-wap-dialog"><div class="__mm-wap-dialog-close " id="__mm-wap-close"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAfCAYAAAAfrhY5AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MjIwMUY5NTEyQUJCMTFFNTg0MTQ5NzUyMzMyNDY2QjEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MjIwMUY5NTIyQUJCMTFFNTg0MTQ5NzUyMzMyNDY2QjEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoyMjAxRjk0RjJBQkIxMUU1ODQxNDk3NTIzMzI0NjZCMSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoyMjAxRjk1MDJBQkIxMUU1ODQxNDk3NTIzMzI0NjZCMSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PpWGpx8AAAEwSURBVHjavJU9DoJAEEZh9Aja0FtZWHACDdaWFl7AwrvY6Q0sNF7AmHgDEwtbDyDUVib6bcImhPAz+zNs8goC4b0lMIRxHAdYa3AGadDhIrABe3ADww6cA3ABYyU/gqc66CBAia9gDrZK/gazDgK0eAIeYEX5CRUwFQwoi9XOUypckAoFVIr1CxcIBtSKq+Q+AxrFdXIfAa3iJrlLAEvcJrcJYIs5cpMAIzFXzgkoixPOf4IMXqK6gCpxxrlh3/Dz0QG3QsDXRmwjrwoIbMSmj724fvmOi5sIbf7nrpPLehKSozhxmYTkKM5cRjE5ip1GMXkQWweQJ7FVAHkUGweQZ7FRAAmI2QEkJGYFkKC4NYCExY0BWn4QFNcFLHtRFKkTdzACCyGxXh9wAi+w+wswAP5lpcbsuZqsAAAAAElFTkSuQmCC" /></div><div class="__mm-wap-bd"><div class="__mm-wap-bd-info"><p>' + a.options.info + '</p></div></div><div class="__mm-wap-ft"><div class="__mm-wap-btn  " id="__mm-wap-success">确定</div></div></div>', b
				},
				onload: function(a, b) {
					var c = this;
					a.attachEvent ? a.attachEvent("onload", b) : setTimeout(function() {
						c.poll(a, b)
					}, 0)
				},
				poll: function(a, b) {
					var c = this;
					if(!b.isCalled) {
						if(/webkit/i.test(navigator.userAgent)) a.sheet && (c.cssloaded = !0);
						else if(a.sheet) try {
							a.sheet.cssRules && (c.cssloaded = !0)
						} catch(d) {
							1e3 === d.code && (c.cssloaded = !0)
						}
						c.cssloaded ? setTimeout(function() {
							b(), b.isCalled = !0
						}, 1) : setTimeout(function() {
							c.poll(a, b)
						}, 1)
					}
				},
				loadcss: function(a, b) {
					var c = this,
						d = document.createElement("link");
					d.setAttribute("rel", "stylesheet"), d.setAttribute("type", "text/css"), d.setAttribute("href", a), document.body.appendChild(d), c.onload(d, b)
				},
				show: function(a) {
					var b = this;
					b.destroy(), b.set(a), b.loaded(b.create.bind(b))
				},
				create: function() {
					var a = this,
						b = a.view(),
						c = document.createElement("div");
					c.setAttribute("id", "__mm-wap-toast"), c.style.display = "none", c.innerHTML = b, a.trigger("dialog.before.show"), document.body.appendChild(c), a.el["__mm-wap-toast"] = [c], a.refresh(), a.addHandle(), a.trigger("dialog.after.show")
				},
				refresh: function() {
					var c, d, e, f, a = this,
						b = a.query("__mm-wap-toast");
					null != b && (b.style.display = "block", c = document.body.scrollTop || document.documentElement.scrollTop, "guid" != a.options.type && (b.style.height = Math.max(document.body.scrollHeight, document.body.clientHeight) - 1 + "px", b.setAttribute("class", "__mm-wap-toast-cover")), document.body.offsetHeight || document.documentElement.offsetHeight, d = a.query("__mm-wap-dialog"), e = a.query("toast-guide"), f = d ? (window.innerHeight - d.offsetHeight) / 2 : 0, d && (d.style.top = parseInt(c + f, 10) + "px", 1), e && (e.style.top = -(f - 10) + "px"))
				},
				addHandle: function() {
					var d, e, a = this,
						b = a.query("__mm-wap-toast"),
						c = [b];
					("ios-weixin" === a.options.type || "ios" === a.options.type) && a.addEvent(b, "click", function() {
						return a.trigger("dialog.res.cancle"), a.destroy(), !1
					}), c.push("touchmove"), c.push(a.movePrevent.bind(a)), a.addEvent.apply(a, c), a.resize = function() {
						a.refresh()
					}, a.addEvent(window, "resize", a.resize), a.addEvent(window, "scroll", a.resize), d = [a.query("__mm-wap-success")], e = [a.query("__mm-wap-close")], null != d && d.length > 0 && (d.push("click"), d.push(function(b) {
						return a.preventDefault(b), a.stopPropagation(b), a.trigger("dialog.res.save"), a.destroy(), !1
					}), a.addEvent.apply(a, d)), null != e && e.length > 0 && (e.push("click"), e.push(function(b) {
						return a.preventDefault(b), a.stopPropagation(b), this.className += " active", a.trigger("dialog.res.cancle"), a.destroy(), !1
					}), a.addEvent.apply(a, e))
				},
				loaded: function(a) {
					var d, b = this,
						c = b.options;
					b.cssloaded ? e.f(a) && a() : (d = c.base + c.css, b.loadcss(d, a))
				},
				query: function(a) {
					return document.querySelector ? document.querySelector("#" + a) : document.getElementById(a)
				},
				destroy: function() {
					var b, c, d, a = this;
					for(b in a.el)
						if(c = a.el[b]) {
							if(c[0]) continue;
							"__mm-wap-toast" === b && (c[0].style.display = "none"), a.removeEvent.apply(a, c)
						}
					a.removeEvent(window, "resize", a.resize), a.removeEvent(window, "scroll", a.resize), "undefined" != typeof a.el["__mm-wap-toast"] && (d = a.el["__mm-wap-toast"][0], d && d.parentNode && d.parentNode.removeChild(d)), a.el = {}, a.off("dialog.res")
				},
				init: function(a) {
					this.options.base = a
				},
				addEvent: function(a, b, c) {
					a && (a.addEventListener ? a.addEventListener(b, c, !1) : a.attachEvent ? a.attachEvent("on" + b, c) : a["on" + b] = c)
				},
				removeEvent: function(a, b, c) {
					a.addEventListener ? a.removeEventListener(b, c, !1) : a.attachEvent ? a.detachEvent("on" + b, c) : a["on" + b] = null
				},
				getEvent: function(a) {
					return a ? a : window.event
				},
				getTarget: function(a) {
					return a.target || a.srcElement
				},
				stopPropagation: function(a) {
					a.stopPropagation ? a.stopPropagation() : a.cancelBubble = !0
				},
				preventDefault: function(a) {
					a.preventDefault ? a.preventDefault() : a.returnValue = !1
				},
				on: function() {
					d.on.apply(d, arguments)
				},
				off: function() {
					d.off.apply(d, arguments)
				},
				trigger: function() {
					d.trigger.apply(d, arguments)
				},
				one: function() {
					d.one.apply(d, arguments)
				}
			};
		b.exports = f
	}, {
		"./Event": 5,
		"./Util": 8
	}],
	5: [function(a, b) {
		function d(a, b, c) {
			(a || "").split(j).forEach(function(a) {
				c(a, b)
			})
		}

		function e(a) {
			return new RegExp("(?:^| )" + a.replace(" ", " .* ?") + "(?: |$)")
		}

		function f(a) {
			var b = ("" + a).split(".");
			return {
				e: b[0],
				ns: b.slice(1).sort().join(" ")
			}
		}

		function g(a, b, c, d) {
			var g, h;
			return h = f(b), h.ns && (g = e(h.ns)), a.filter(function(a) {
				return !(!a || h.e && a.e !== h.e || h.ns && !g.test(a.ns) || c && a.cb !== c && a.cb._cb !== c || d && a.ctx !== d)
			})
		}

		function h(a, b) {
			return this instanceof h ? (b && $.extend(this, b), this.type = a, this) : new h(a, b)
		}
		var i = [].slice,
			j = /\s+/,
			k = function() {
				return !1
			},
			l = function() {
				return !0
			};
		h.prototype = {
			isDefaultPrevented: k,
			isPropagationStopped: k,
			preventDefault: function() {
				this.isDefaultPrevented = l
			},
			stopPropagation: function() {
				this.isPropagationStopped = l
			}
		}, b.exports = {
			on: function(a, b, c) {
				var e, g = this;
				return b ? (e = this._events || (this._events = []), d(a, b, function(a, b) {
					var d = f(a);
					d.cb = b, d.ctx = c, d.ctx2 = c || g, d.id = e.length, e.push(d)
				}), this) : this
			},
			one: function(a, b, c) {
				var e = this;
				return b ? (d(a, b, function(a, b) {
					var d = function() {
						return e.off(a, d), b.apply(c || e, arguments)
					};
					d._cb = b, e.on(a, d, c)
				}), this) : this
			},
			off: function(a, b, c) {
				var e = this._events;
				return e ? a || b || c ? (d(a, b, function(a, b) {
					g(e, a, b, c).forEach(function(a) {
						delete e[a.id]
					})
				}), this) : (this._events = [], this) : this
			},
			trigger: function(a) {
				var b, c, d, e, f, j = -1;
				if(!this._events || !a) return this;
				if("string" == typeof a && (a = new h(a)), b = i.call(arguments, 1), a.args = b, b.unshift(a), c = g(this._events, a.type))
					for(e = c.length; ++j < e;)
						if((d = a.isPropagationStopped()) || !1 === (f = c[j]).cb.apply(f.ctx2, b)) {
							d || (a.stopPropagation(), a.preventDefault());
							break
						}
				return this
			}
		}
	}, {}],
	6: [function(a, b) {
		var d = a("./Util"),
			e = "http://{adress}:{port}/moversion",
			f = "http://{adress}:{port}/action=",
			g = "localwap.mmarket.com",
			h = "127.0.0.1";
		navigator.userAgent.toLowerCase().match(/MicroMessenger|MQQBrowser/i) ? (e = e.replace("{adress}", g), f = f.replace("{adress}", g)) : (e = e.replace("{adress}", h), f = f.replace("{adress}", h)), b.exports = {
			versionUrl: e,
			baseUrl: f,
			DAEMON: "mmcd",
			mmpkg: "com.aspire.mm",
			version: "mmversion",
			version_type: "mmversiontype",
			port: "mmport",
			getBaseUrl: function() {
				var a = this,
					b = d.getCookie(a.port);
				return f.replace("{port}", b)
			}
		}
	}, {
		"./Util": 8
	}],
	7: [function(a, b) {
		function d(a) {
			g(), y = x.call(a.args, 1), q || (l.trigger("server.before.check"), e(f))
		}

		function e(a) {
			s.forEach(function(b) {
				var c = document.createElement("script");
				c.type = "text/javascript", c.setAttribute("port", b), c.setAttribute("class", "__js_load_mm"), c.onload = c.onerror = a, c.src = t.replace("{port}", b) + "?" + Date.now(), document.getElementsByTagName("head")[0].appendChild(c)
			})
		}

		function f(a) {
			if("" === r)
				if("load" == a.type) {
					var b = a.target;
					r = b.getAttribute("port"), l.trigger("server.after.check", "success", r)
				} else u++, u == s.length && l.trigger("server.after.check", "error")
		}

		function g() {
			"undefined" != typeof window.a && "undefined" == typeof window.a.appname && (z = window.a)
		}

		function h() {
			k(), q = !0, r = "", u = 0, n.setCookie(m.port, null), n.setCookie(m.version, null), n.setCookie(m.version_type, null)
		}

		function i(a) {
			var d, b = a.args.slice(1),
				c = function() {
					y.unshift("server.check.error"), l.trigger.apply(l, y)
				};
			return k(), q = !1, r = "", u = 0, "success" === b[0] && (n.setCookie(m.port, b[1]), "undefined" != typeof window.a && "undefined" != typeof window.a.appname) && (d = j(window.a), null === z ? delete window.a : window.a = z, d) ? (y.unshift("server.check.success"), void l.trigger.apply(l, y)) : (c(), void 0)
		}

		function j(a) {
			var d, e, f, g, b = a.appname,
				c = 0;
			return b && b.length > 0 && (d = b.match(v), d && (e = d[1] || "MM", n.setCookie(m.version_type, e.toUpperCase()), d = d[0].replace(w, ""), d.length > 0 && (f = d.replace(/\./g, ""), g = o.versionCode(), (!g || g && parseInt(f, 10) >= parseInt(g, 10)) && (n.setCookie(m.version, f || 0), c = 1)))), c
		}

		function k() {
			var b, a = document.getElementsByClassName("__js_load_mm");
			a.length && (b = x.call(a), b.forEach(function(a) {
				a.onload = a.onerror = null, a.remove && (a.remove(), 1) || a.parentNode && (a.parentNode.removeChild(a), 1)
			}))
		}
		var l = a("./Event"),
			m = a("./Params"),
			n = a("./Util"),
			o = a("./Config"),
			p = o.versionReg(),
			q = !1,
			r = "",
			s = [9817, 19817, 29817, 39817, 49817, 59817],
			t = m.versionUrl,
			u = 0,
			v = p.version_reg,
			w = p.version_prefix,
			x = [].slice,
			y = [],
			z = null,
			A = function() {
				l.on("server.before.check", h.bind(this)), l.on("server.after.check", i.bind(this)), l.on("server.check.start", d.bind(this))
			};
		b.exports = {
			init: A
		}
	}, {
		"./Config": 3,
		"./Event": 5,
		"./Params": 6,
		"./Util": 8
	}],
	8: [function(a, b) {
		var d = {
			e: Object.prototype.toString,
			f: function(a) {
				return "[object Function]" == this.e.call(a)
			},
			o: function(a) {
				return "[object Object]" == this.e.call(a)
			},
			a: function(a) {
				return "[object Array]" == this.e.call(a)
			},
			s: function(a) {
				return "string" == typeof a
			},
			each: function(a, b) {
				var d, e, c = this;
				if(c.f(b))
					if(c.o(a))
						for(d in a) b(d, a[d]);
					else if(a && a.length > 0)
					for(e = 0; e < a.length; e++) b(a[e], e)
			},
			CHATSET: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
			encode: function(a) {
				var d, e, f, b = this,
					c = "";
				if(!isNaN(a))
					for(d = parseInt(a, 10), e = b.CHATSET, f = e.length; d > 0; d = parseInt(d / f, 10)) c += e.charAt(parseInt(d % f, 10));
				return c
			},
			decode: function(a) {
				var b, c, d, e, f, g;
				if("undefined" == typeof a || 0 == a.length) return 0;
				for(b = this.CHATSET, c = b.length, d = 0, e = 0; e < a.length; e++) f = a.charAt(e), g = b.indexOf(f), d += g * Math.pow(c, e);
				return d
			},
			setCookie: function(a, b, c) {
				var e, d = a + "=" + encodeURIComponent(b) + ";path=/";
				null != c && (e = new Date, e.setTime(e.getTime() + 1e3 * 60 * 60 * 24 * c), d += ";expires=" + e.toGMTString()), document.cookie = d
			},
			getCookie: function(a) {
				var b = document.cookie.match(new RegExp("(^| )" + a + "=([^;]*)(;|$)"));
				return null != b ? decodeURIComponent(b[2]) : null
			}
		};
		b.exports = d
	}, {}],
	9: [function(a, b) {
		function d(a) {
			return {
				f: "[object Function]" === m.call(a),
				o: "[object Object]" === m.call(a),
				a: "[object Array]" === m.call(a)
			}
		}

		function e(a) {
			a.mm = {
				download: function(a) {
					f.trigger("server.check.start", "download", a)
				},
				detail: function(a) {
					f.trigger("server.check.start", "detail", a)
				},
				open: function(a, b) {
					void 0 === b && (b = !0), f.trigger("server.check.start", "open", a, b)
				},
				batchDownload: function(a) {
					var c, d, e, b = this;
					if("undefined" != typeof a && "" != a) {
						if(c = new Array, g.s(a)) {
							if(!/^[\d\/]*$/.test(a)) return;
							c = a.split("/")
						} else if(g.a(a)) {
							if(0 == a.length) return;
							c = a
						}
						c.length > 0 && (d = "", e = 0, c.forEach(function(a) {
							a && /^(\d)*$/.test(a) && ("" === d ? d = g.encode(a) : d += "-" + g.encode(a), e++)
						}), e > b.get("batchMaxApps") ? j.show({
							type: "alert",
							info: b.get("maxAlert")
						}) : "" != d && f.trigger("server.check.start", "batchDownload", d))
					}
				},
				set: function(a, b) {
					var c, e = k;
					return a in e && (c = e[a], d(c).f ? e[a](b) : e[a] = b), this
				},
				get: function(a) {
					var b, c = k;
					return a in c ? (b = c[a], d(b).f ? b() : b) : void 0
				},
				init: function(a) {
					var b, c;
					if("undefined" != typeof a && g.o(a)) {
						b = k;
						for(c in b) c in a && (b[c] = a[c])
					}
				},
				error: function(a) {
					if(d(a).f) {
						var b = function(b) {
							var c = l.call(b.args, 1);
							c && c[0] || "", console.log(c), a.apply(this, arguments)
						};
						f.on("server.over.error", b)
					}
				}
			}, g.each(["download", "detail", "open", "batchDownload"], function(b) {
				var c = h.browserUtil,
					d = c.isIOS(),
					e = c.isWechat();
				a.mm[b] = a.mm[b].before(function() {
					var a = e && d ? "ios-weixin" : d ? "ios" : "";
					return "open" == b && void 0 !== arguments[1] && arguments[1] === !1 ? !1 : "" !== a ? (j.show({
						type: a
					}), !1) : !0
				})
			})
		}
		var f = a("./Event"),
			g = a("./Util"),
			h = a("./Client"),
			i = a("./ServerManager"),
			j = a("./Dialog"),
			k = a("./Config"),
			l = [].slice,
			m = Object.prototype.toString;
		Function.prototype.bind || (Function.prototype.bind = function(a) {
			var b = [].slice,
				c = b.call(arguments, 1),
				d = this,
				e = function() {},
				f = function() {
					return d.apply(this instanceof e ? this : a || {}, c.concat(b.call(arguments)))
				};
			return e.prototype = d.prototype, f.prototype = new e, f
		}), Function.prototype.before = function(a) {
			var b = this;
			return function() {
				return a.apply(this, arguments) === !1 ? !1 : b.apply(this, arguments)
			}
		}, i.init(), f.on("server.check.success", function(a) {
			var b = a.args.slice(1),
				c = b && b[0] || "";
			"downloadmm" == c && b.shift(), h.execute.apply(h, b)
		}), f.on("server.check.error", function(a) {
			var b = l.call(a.args, 1),
				c = b && b[0] || "";
			"downloadmm" !== c && b.unshift("error"), h.execute.apply(h, b)
		}), g.each(document.querySelectorAll("script"), function(a) {
			var c, b = a.src;
			b && (c = b.match(/^(.*)mmapp.js/), c && j.init(c[1]))
		}), b.exports = {
			init: e
		}
	}, {
		"./Client": 2,
		"./Config": 3,
		"./Dialog": 4,
		"./Event": 5,
		"./ServerManager": 7,
		"./Util": 8
	}]
}, {}, [1]);