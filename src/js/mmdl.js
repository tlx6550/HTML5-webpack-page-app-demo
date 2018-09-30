import $ from '../js/jquery.min.js';
/*!
 * Author: linxiaojie 
 *  Version: 1.0.1
 */
!function(e){
  function t(a){
    if(n[a]) return n[a].exports;
    var o = n[a] = {exports: {}, id: a, loaded: !1};
    return e[a].call(o.exports, o, o.exports, t), o.loaded = !0, o.exports
  }

  var n = {};
  return t.m = e, t.c = n, t.p = "", t(0)
}([function(e, t, n){
  n(1);
  var a = n(2), o = n(3), i = n(4), r = n(7);
  window.Observer = a, window.AppManager = i, window.Command = r, window[o.MM_DL_APP_CALLBACK] = function(e){
    a.trigger(o.NOTIFY_APP_STATUS, e)
  },
          window[o.MM_BROADCAST_APP_CALLBACK] = function(e){
            // printm("enter MM_BROADCAST_APP_CALLBACK");
            a.trigger(o.ACCEPT_BROADCAST, e)
          }
}, function(e, t){
}, function(e, t){
  var n = $({});
  e.exports = {
    on: function(){
      n.on.apply(n, arguments)
    }, off: function(){
      n.off.apply(n, arguments)
    }, trigger: function(){
      n.trigger.apply(n, arguments)
    }, notifyAppStatue: function(){
    }
  }
}, function(e, t){
  e.exports = {
    MM_APP_MANAGER: "__mm_app_manager__",
    MM_APP_MANAGER_DLURL_REL_PKG: "MM_APP_MANAGER_DLURL_REL_PKG",
    MM_DL_APP_CALLBACK: "_mm_dl_app_callback",
    MM_BROADCAST_APP_CALLBACK: "_mm_broadcast_app_callback",
    MM_NETWORK_APP_CALLBACK: "_mm_network_app_callback",
    NOTIFY_APP_STATUS: "notify_app_status",
    ACCEPT_BROADCAST: "accept_broadcast",
    EVENT_NAME_SPACE: "MMDL",
    UPDATE_FROM_DOWNLOAD: "update_from_download"
  }
}, function(e, t, n){
  function a(e){
    return this instanceof a ? (this.$el = $(e.el || document.body), this.itemSelector = ".js-item", this.buttonSelector = ".js-button", this.progressSelector = ".js-progress", this.labelSelector = ".js-label", this.template = e.template, this.caches = {}, this.isListenToClient = 0, this.labels = e.labels || {}, this.openType = void 0===e.openType ? 1 : e.openType, void this.init((e.data || []).slice(0))) : new a(e)
  }

  var o = n(5), i = n(6), r = n(8), s = n(2), c = n(3), p = n(7), l = c.MM_APP_MANAGER,
          u = c.MM_APP_MANAGER_DLURL_REL_PKG, d = c.UPDATE_FROM_DOWNLOAD;
  a.prototype = {
    constructor: a, getAppCacheMgr: function(){
      var e = window[l] || (window[l] = {});
      return e[u] || (e[u] = {}), e
    }, init: function(e){
      var t = this;
      r.setLabels(t.labels), t.render(e).bindEvent().transformKeyMap(e), t.initUpdateStatus(), t.addListenToClient(), t.addListenToBroadcast(Object.keys(t.data))
    }, initUpdateStatus: function(){
      var e = this, t = e.data, n = e.getAppCacheMgr(), a = null, o = null;
      $.each(t, function(i){
        a = t[i], o = n[i], o && $.each(o, function(t){
          e.isOneApp(a, o[t]) && e.update(o[t])
        })
      })
    }, updateAppCacheMgr: function(e){
      var t = this.getAppCacheMgr(), n = e.packagename, a = e.downloadurl;
      n && (!t[n] && (t[n] = {}), t[n][a] = e, "undefined"!==n && (t[u][a] = n))
    }, transformKeyMap: function(e){
      var t = this;
      return t.data = {}, $.isArray(e) ? $.each(e, function(e, n){
        t.data[n.packagename] = n
      }) : t.data[e.packagename] = e, t
    }, render: function(e){
      var t = this;
      return t.template && t.$el.append(o.compile(t.template, e)), this
    }, getEventType: function(e){
      return e+"."+c.EVENT_NAME_SPACE
    }, getSpeedSize: function(e, t){
      var n = t, a = "K/s", i = '<span class="speed"><em>{speed}</em>{union}</span>';
      return r.getState(e)!==r.names.DOWNLOAD ? r.getStateLabel(e) : (n = 0===t ? 0 : new Number(t).toFixed(1), n>=1024 && (n = new Number(n/1024).toFixed(1), a = "M/s"), n>=100 && (n = parseInt(n, 10)), o.compile(i, {
        speed: n,
        union: a
      }))
    }, bindEvent: function(){
      var e = this, t = 10, n = {start: 0, x: 0, y: 0, move: 1};
      return e.$el.delegate(e.buttonSelector, e.getEventType("touchstart"), function(e){
        e.originalEvent && (e = e.originalEvent), e.touches && 0!=e.touches.length && (n = {
          start: Date.now(),
          x: e.touches[0].pageX,
          y: e.touches[0].pageY,
          move: 0
        })
      }).delegate(e.buttonSelector, e.getEventType("touchmove"), function(e){
        if(e.originalEvent && (e = e.originalEvent), e.changedTouches.length>0){
          var a = ($(this), e.changedTouches[0].pageX), o = e.changedTouches[0].pageY;
          n.start && (Math.abs(a-n.x)>t || Math.abs(o-n.y)>t) && (n.move = 1)
        }
      }).delegate(e.buttonSelector, e.getEventType("touchend"), function(t){
        t.preventDefault();
        var a, o = $(this), s = o.closest(e.itemSelector).data("id"), c = e.data[s], p = "";
        Date.now()-n.start>250 || n.move || !c || (a = e.cacheDom(s), p = r.stateChange(c.state), "open"===p && (p = 2===e.openType ? "openWithAnimate" : p), i.changeState(p, c))
      }), s.on(c.NOTIFY_APP_STATUS, function(t, n){
        if(n){
          var a = "object"== typeof n ? n : JSON.parse(n), o = a.items, i = null;
          $.each(o, function(t){
            i = o[t], e.update(i, d), e.updateAppCacheMgr(i)
          })
        }
      }), s.on(c.ACCEPT_BROADCAST, function(t, n){
        e.acceptBroadcast(n)
      }), e
    }, isOneApp: function(e, t){
      var n = 0;
      if(e && t){
        var a = t.downloadurl;
        n = e._downloadurl ? e._downloadurl===a : p.cmd("isOneApp", e.url, a)
      }
      return n
    }, update: function(e, t){
      var n = this, a = e.packagename && e.packagename.replace(/\s+/g, "") || "", o = n.data, i = o[a],
              s = e.downloadurl, c = e.state, p = 0;
      return ""==a && (a = n.getAppCacheMgr()[u][s], i = a && o[a]), i ? p = n.isOneApp(i, e) : $.each(o, function(t){
        p || (i = o[t], p = n.isOneApp(i, e))
      }), p && (e.packagename = i.packagename, t===d && c===r.states.STATE_6 && (e.state = c = r.isInstalled(i), e.offset = 0, e.speed = 0), i = $.extend(i, {
        state: c,
        _downloadurl: e.downloadurl,
        offset: e.offset,
        size: e.filesize,
        speed: e.speed
      }), n.updateDom(i)), p
    },

    updateDom: function(e){
      // printm("enter updateDom");
      // printm("updateDom - e:");
      // printm(JSON.stringify(e));
      var t, n, a = this, o = e.packagename, i = a.cacheDom(o), s = e.offset || 0, c = e.size || 1,
              p = a.getAppState(e), l = a.getBtnClass(p), u = i.$button;
      n = r.getState(p), n!==r.names.INIT && n!==r.names.DOWNLOADED || (s = 0), t = 100*(s/c>1 ? 1 : s/c)+"%";
      // printm("updateDom-a.getSpeedSize(p, e.speed):");
      // printm(a.getSpeedSize(p, e.speed));
      i.$label.html(a.getSpeedSize(p, e.speed));
      i.$progress.css({width: t});
      $.each([i.$app, u, i.$label, i.$progress], function(){
        a.setNewClass(this, l)
      })
      //ww
      var status = a.getSpeedSize(p, e.speed);
      Observer.trigger('initStatusOver',{data:e, status:status});

    },

    setNewClass: function(e, t){
      var n = "old_class", a = e.data(n);
      a && e.removeClass(a), e.addClass(t).data(n, t)
    }, getBtnClass: function(e){
      return r.getState(e)
    }, getAppState: function(e){
      return r.realState(e.state, {packageName: e.packagename, ver: e.ver, downloadUrl: e.url})
    }, acceptBroadcast: function(e){
      if(e && e.items){
        var t = this, n = null, a = null, o = "", i = t.data;
        $.each(e.items, function(s){
          if(n = e.items[s], o = n.packagename, a = i[o], a){
            var c = n.state;
            c ? (a.state = r.states.STATE_5, c = t.getAppState(a)) : c = r.states.STATE__1, a.offset = 0, a.state = c, t.updateDom(a)
          }
        })
      }
    },
    cacheDom: function(e){
      // printm("enter cacheDom");
      // printm("cacheDom-e:");
      // printm(e);

      var t = this, n = t.caches[e];
      if(!n){
        n = {};
        var a = n.$app = t.$el.find(t.itemSelector+'[data-id="'+e+'"]'), o = a.length;
        if(o>0){
          var i = a;
          n.$button = i.find(t.buttonSelector), n.$progress = i.find(t.progressSelector), n.$label = i.find(t.labelSelector)
        }else n.$button = $("<div/>"), n.$progress = $("<div/>"), n.$label = $("<div/>")
      }
      return n
    },
    addListenToClient: function(){
      !this.isListenToClient && p.cmd("addListenToClient", c.MM_DL_APP_CALLBACK)
    }, addListenToBroadcast: function(e){
      p.cmd("subscribeAppChanged", e, c.MM_BROADCAST_APP_CALLBACK)
    }, addListenToNetwork: function(){
      p.cmd("subscribeNetworkChanged", apps, c.MM_NETWORK_APP_CALLBACK)
    }, copyText: function(e){
      p.cmd("copyText", e)
    }
  }, e.exports = a
}, function(e, t){
  function n(e, t){
    return e.replace(o, function(e, n, a, o){
      if(n || o) return e.replace("\\", "");
      var i, r, s, c = a.replace(/\s/g, "").split("."), p = t;
      for(i = 0, r = c.length; i<r; ++i) if(s = c[i], p = p[s], void 0===p || null===p) return "";
      return p
    })
  }

  function a(e, t){
    if(null==t || !$.isArray(t)) return e;
    var a = "", o = {};
    return $.each(t, function(i){
      "[object Object]"==toString.call(t[i]) ? (o = t[i], o._order = i+1) : (o.value = t[i], o._order = i+1), a += n(e, o)
    }), a
  }

  var o = /(\\)?\{([^\{\}\\]+)(\\)?\}/g;
  e.exports = {
    compile: function(e, t){
      var o = "";
      return o = $.isArray(t) ? a(e, t) : n(e, t)
    }
  }
}, function(e, t, n){
  var a = n(7), o = a.cmd, i = {
    download: function(e, t){
      var n = t.packagename, i = t.contentId, r = t.price || 0, s = t.size || 0, c = t.canOrder || !0, p = t.url,
              l = t.title || "", u = t.icon || "", d = t.reporturl || "";
      o.apply(a, [e, l, p, u, d, n, s, r, c, i])
    }, pause: function(e, t){
      o.apply(a, [e, t._downloadurl])
    }, resume: function(e, t){
      this.download.apply(this, arguments)
    }, install: function(e, t){
      o.apply(a, [e, t.packagename, t.ver, t.url])
    }, open: function(e, t){
      o.apply(a, [e, t.packagename])
    }, update: function(e, t){
      this.download.apply(this, arguments)
    }, openWithAnimate: function(e, t){
      o.apply(a, [e, t.intent, t.packagename])
    }
  };
  e.exports = {
    changeState: function(e){
      i[e].apply(i, arguments)
    }
  }
}, function(e, t){
  var n = window.androidmm, a = window.mmutil, o = {
    download: function(e, t, a, o, i, r, s, c, p){
      r = parseInt(r), n.download ? n.download(e, t, a, o, i, r, s, c) : n.updateInstall(null, t, i, p, s, r, c)
    }, update: function(){
      this.download.apply(this, arguments)
    }, pause: function(e){
      n.pauseDownload(e)
    }, resume: function(){
      this.download.apply(this, arguments)
    }, open: function(e){
      n.openApp(e)
    }, install: function(e, t, a){
      n.installAPK(e, t, a)
    }, getAppState: function(e, t, n){
      return a.getAppStatusId(e, t, n)
    }, addListenToClient: function(e){
      a.subscribeDownloadEvent(e)
    }, isOneApp: function(e, t){
      return a.compareDownloadUrl(e, t)
    }, subscribeAppChanged: function(e, t){
      a.subscribeAppChanged(e, t)
    }, openWithAnimate: function(e, t){
      a.launch3rdApp(t, e)
    }, copyText: function(e){
      a.copyText(e)
    }, setShareInfo: function(e, t, n){
      window.androidmm.setShareInfo(e, t, n)
    }, shareUrlToWxFriends: function(e, t, n, a){
      window.androidmm.shareUrlToWxFriends(e, t, n, a)
    }
  }, i = [].slice;
  e.exports = {
    cmd: function(e){
      var t = i.call(arguments, 1);
      return o[e] && o[e].apply(o, t)
    }
  }
}, function(e, t, n){
  var a = n(7), o = "init", i = "download", r = "pause", s = "downloaded", c = "install", p = "installed",
          l = "installing", u = "update", d = "error", A = "resume", f = "open", _ = "waitwifi", T = {
            INIT: o,
            DOWNLOAD: i,
            PAUSE: r,
            DOWNLOADED: s,
            INSTALL: c,
            INSTALLED: p,
            INSTALLING: l,
            UPDATE: u,
            ERROR: d,
            RESUME: A,
            OPEN: f,
            WIFI: _
          }, g = 0, h = 1, m = 2, S = 3, v = 4, E = 5, w = 6, b = 7, C = 8, L = 9, M = 10, P = 11, D = 12, y = 255, O = -1,
          N = 100, k = 101, R = 102, x = 103, I = {};
  I[g] = i, I[h] = r, I[m] = i, I[S] = r, I[v] = s, I[E] = p, I[w] = o, I[b] = i, I[C] = d, I[L] = i, I[M] = l, I[P] = _, I[D] = l, I[y] = d, I[O] = o, I[N] = p, I[k] = o, I[R] = u, I[x] = u;
  var B = {};
  B.STATE_0 = g, B.STATE_1 = h, B.STATE_2 = m, B.STATE_3 = S, B.STATE_4 = v, B.STATE_5 = E, B.STATE_6 = w, B.STATE_7 = b, B.STATE_8 = C, B.STATE_9 = L, B.STATE_10 = M, B.STATE_11 = P, B.STATE_12 = D, B.STATE_255 = y, B.STATE__1 = O, B.STATE_100 = N, B.STATE_101 = k, B.STATE_102 = R, B.STATE_103 = x;
  var U = {};
  U[o] = "下载", U[i] = "暂停", U[r] = "继续", U[A] = "暂停", U[s] = "安装", U[l] = "安装中", U[d] = "请重试", U[p] = "打开", U[u] = "更新", U[_] = "等待WiFi", e.exports = {
    states: B,
    names: T,
    getState: function(e){
      return I[e] || o
    },
    getStateLabel: function(e, t){
      var n = this.getState(e);
      return U[n]
    },
    stateChange: function(e){
      var t = this.getState(e), n = "";
      switch(t){
        case o:
          n = i;
          break;
        case i:
          n = r;
          break;
        case r:
        case _:
          n = A;
          break;
        case s:
          n = c;
          break;
        case p:
          n = f;
          break;
        case u:
          n = u;
          break;
        default:
          n = t
      }
      return n
    },
    realState: function(e, t){
      return I[e]===p && (e = a.cmd("getAppState", t.packageName, t.ver, t.downloadUrl)), e
    },
    isInstalled: function(e){
      var t = this.realState(B.STATE_5, {packageName: e.packagename, ver: e.ver, downloadUrl: e.url});
      return t
    },
    setLabels: function(e){
      $.each(e, function(e, t){
        U[e] = t
      })
    }
  }
}]);