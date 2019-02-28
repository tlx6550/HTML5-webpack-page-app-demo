! function(t, e) {
    'object' == typeof exports && 'undefined' != typeof module ? module.exports = e() : 'function' == typeof define && define.amd ? define(e) : t.LotteryCard = e();
}(this, function() {
    'use strict';
    Object.assign = Object.assign || function(t) {
        if(void 0 === t || null === t) throw new TypeError('Cannot convert undefined or null to object');
        for(var e = Object(t), i = 1; i < arguments.length; i++) {
            var n = arguments[i];
            if(void 0 !== n && null !== n)
                for(var o in n) n.hasOwnProperty(o) && (e[o] = n[o]);
        }
        return e;
    };
    var t = function(t, e) {
            if(!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
        },
        e = function(t, e) {
            if('function' != typeof e && null !== e) throw new TypeError('Super expression must either be null or a function, not ' + typeof e);
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);
        },
        i = function(t, e) {
            if(!t) throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');
            return !e || 'object' != typeof e && 'function' != typeof e ? t : e;
        },
        n = function() {
            function e() {
                t(this, e), this._queue = [];
            }
            return e.prototype.on = function(t, e) {
                return this._queue[t] = this._queue[t] || [], this._queue[t].push(e), this;
            }, e.prototype.off = function(t, e) {
                if(this._queue[t]) {
                    var i = void 0 === e ? -2 : this._queue[t].indexOf(e); - 2 === i ? delete this._queue[t] : -1 !== i && this._queue[t].splice(i, 1), this._queue[t] && 0 === this._queue[t].length && delete this._queue[t];
                }
                return this;
            }, e.prototype.has = function(t) {
                return !!this._queue[t];
            }, e.prototype.trigger = function(t) {
                for(var e = this, i = arguments.length, n = Array(i > 1 ? i - 1 : 0), o = 1; o < i; o++) n[o - 1] = arguments[o];
                return this._queue[t] && this._queue[t].forEach(function(t) {
                    return t.apply(e, n);
                }), this;
            }, e;
        }();
    return function(n) {
        function o(e, s) {
            t(this, o);
            var h = i(this, n.call(this));
            return h.options = Object.assign({
                size: 20,
                percent: 50,
                resize: !0,
                cover: null,
                bgImgH:106,
                bgImgW:306,
            }, s), h.canvas = e, h.ctx = e.getContext('2d'), h._first = !0, h._touch = !1, h.init(), h.bind(), h;
        }
        return e(o, n), o.prototype.getCanvasInfo = function() {
            var t = this.canvas.getBoundingClientRect(),
                e = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
                i = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeftp || 0;
            this.width = t.width, this.height = t.height, this.offsetX = Math.round(t.left + i), this.offsetY = Math.round(t.top + e), this.canvas.width = t.width, this.canvas.height = t.height;
        }, o.prototype.bind = function() {
            var t = 'ontouchstart' in window && /mobile|tablet|ip(ad|hone|od)|android/i.test(navigator.userAgent);
            this.canvas.addEventListener(t ? 'touchstart' : 'mousedown', this.onTouchStart.bind(this), !1), this.canvas.addEventListener(t ? 'touchmove' : 'mousemove', this.onTouchMove.bind(this), !1), document.addEventListener(t ? 'touchend' : 'mouseup', this.onTouchEnd.bind(this)), window.addEventListener('onorientationchange' in document ? 'orientationchange' : 'resize', this.onResize.bind(this));
        }, o.prototype.init = function() {
            this._state = 'init', this.getCanvasInfo(), this.ctx.closePath(), this.ctx.globalCompositeOperation = 'source-over';
            var t = this.options.cover;
            var imgW = this.options.bgImgW;
            var imgH = this.options.bgImgH;
            t instanceof Image ? ( this.ctx.drawImage(t,0,0,imgW,imgH)/* this.ctx.fillStyle = this.ctx.createPattern(t, "no-repeat"), this.ctx.rect(0, 0, this.width, this.height)*/) : (this.ctx.fillStyle = 'string' == typeof t ? t : 'gray', this.ctx.fillRect(0, 0, this.width, this.height)), this.ctx.fill(), this.ctx.globalCompositeOperation = 'destination-out';
        }, o.prototype.reset = function() {
            this._first = !0, this._touch = !1, this.canvas.style.backgroundImage = null, this.init(), this.trigger('reset');
        }, o.prototype.setResult = function(t) {
            this.canvas.style.backgroundImage = 'url(' + t + ')';
        }, o.prototype.draw = function() {
            'end' !== this._state && (this._state = 'end', this.ctx.clearRect(0, 0, this.width, this.height), this.trigger('end'));
        }, o.prototype.scratchPercent = function() {
            for(var t = this.ctx.getImageData(0, 0, this.width, this.height), e = 0, i = 0, n = t.data.length; i < n; i += 4) 0 === t.data[i] && 0 === t.data[i + 1] && 0 === t.data[i + 2] && 0 === t.data[i + 3] && e++;
            return e / (this.width * this.height) * 100;
        }, o.prototype.getEventXY = function(t) {
            return t = t.changedTouches ? t.changedTouches[0] : t, {
                x: t.pageX - this.offsetX,
                y: t.pageY - this.offsetY
            };
        }, o.prototype.onTouchStart = function(t) {
            if(t.preventDefault(), 'end' !== this._state) {
                this.has('start') && this._first && this.trigger('start');
                var e = this.getEventXY(t);
                this._state = 'start', this._touch = !0, this._first = !1, this.ctx.beginPath(), this.ctx.arc(e.x, e.y, this.options.size / 2, 0, 2 * Math.PI, !0), this.ctx.closePath(), this.ctx.fill(), this.ctx.beginPath(), this.ctx.lineWidth = this.options.size, this.ctx.moveTo(e.x, e.y);
            }
        }, o.prototype.onTouchMove = function(t) {
            if(t.preventDefault(), this._touch) {
                var e = this.getEventXY(t);
                this.ctx.lineTo(e.x, e.y), this.ctx.stroke();
            }
        }, o.prototype.onTouchEnd = function(t) {
            if(this._touch) {
                this._touch = !1;
                var e = this.getEventXY(t);
                this.ctx.closePath(), this.ctx.beginPath(), this.ctx.arc(e.x, e.y, this.options.size / 2, 0, 2 * Math.PI, !0), this.ctx.closePath(), this.ctx.fill(), this.scratchPercent() >= this.options.percent && (this.ctx.clearRect(0, 0, this.width, this.height), this._state = 'end', this.trigger('end'));
            }
        }, o.prototype.onResize = function() {
            this._touch = !1, this.options.resize && 'end' !== this._state ? this.init() : this.getCanvasInfo();
        }, o;
    }(n);
});