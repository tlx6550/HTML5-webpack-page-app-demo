/* eslint-disable */
import $ from 'jquery'

function a(t, a) {
  this.$el = $(t), this.configMap = $.extend({}, this.configMap, a || {}), this.init(), this.addEvent()
}
var n = function () {
  var t = function () {
    var t = document,
      a = t.body || t.documentElement,
      n = {
        WebkitTransition: "webkitTransitionEnd",
        MozTransition: "transitionend",
        OTransition: "oTransitionEnd otransitionend",
        transition: "transitionend"
      };
    for (var i in n)
      if (void 0 !== a.style[i]) return n[i]
  }();
  return t && {
    end: t
  }
}()
a.staticMap = {
  dial: ".zw-rotary-dial",
  indicator: ".zw-rotary-indicator",
  btn: ".js-btn",
  disable: "disable"
}
a.prototype = {
  configMap: {
    awards: {},
    fixAngle: 5,
    duration: 2,
    minRotate: 2
  },
  stateMap: {
    award: "",
    disable: !1
  },
  init: function () {
    var t = this,
      n = a.staticMap;
    t.stateMap = $.extend({}, t.stateMap, {
      $btn: t.$(n.btn),
      $dial: t.$(n.dial)
    })
  },
  on: function () {
    return this.$el.on.apply(this.$el, [].slice.call(arguments)), this
  },
  rotate: function (t, a) {
    var n = this,
      i = n.configMap.duration;
    t += 360 * n.configMap.minRotate, n.animate(t, i);
    var o = $.proxy(function () {
      this.gameover()
    }, n);
    i = 1e3 * i + 500, setTimeout(o, i)
  },
  animate: function (t, a) {
    var n = void 0 === a ? this.configMap.duration : a;
    this.stateMap.$dial.css({
      transform: "rotate3d(0,0,1," + t + "deg)",
      "-webkit-transform": "rotate3d(0,0,1," + t + "deg)",
      "-moz-transform": "rotate3d(0,0,1," + t + "deg)",
      "-o-transform": "rotate3d(0,0,1," + t + "deg)",
      "transition-duration": n + "s",
      "-webkit-transition-duration": n + "s",
      "-moz-transition-duration": n + "s",
      "-o-transition-duration": n + "s"
    })
  },
  gameover: function () {
    var t = this,
      a = t.stateMap.award;
    t.stateMap.award = "", t.disable(!1), t.$el.trigger("gameover", [a])
  },
  gamestart: function () {
    var t = this,
      a = (t.stateMap.$btn, t.stateMap.disable);
    a || (t.animate(0, 0), t.disable(!0), t.$el.trigger("gamestart"))
  },
  disable: function (t) {
    var n = this,
      i = a.staticMap.disable;
    n.stateMap.disable = !!t, t ? n.stateMap.$btn.addClass(i) : n.stateMap.$btn.removeClass(i)
  },
  setAward: function (t) {
    var a, n = this,
      i = n.configMap.awards;
    if (void 0 != t && (a = i[t])) {
      n.stateMap.award = t;
      var o, e;
      if (a.angles) {
        var r = n.random(0, a.angles.length - 1);
        o = a.angles[r].max_angle, e = a.angles[r].min_angle
      } else o = a.max_angle, e = a.min_angle;
      var s = parseInt(o) - parseInt(n.configMap.fixAngle),
        d = parseInt(e) + parseInt(n.configMap.fixAngle),
        p = n.random(d, s);
      setTimeout(function () {
        n.rotate(p, t)
      }, 500)
    }
  },
  random: function (t, a) {
    var n = a - t + 1;
    return Math.floor(Math.random() * n + t)
  },
  addEvent: function () {
    var t = this;
    t.stateMap;
    t.$el.on("click.rotary.zwui", a.staticMap.btn, $.proxy(t.gamestart, t))
  },
  $: function (t) {
    return this.$el.find(t)
  },
  destroy: function () {
    this.stateMap.$dial.off(n.end), this.$el.off("rotary.zwui")
  }
}

export default a
/* eslint-enable */
