
/**
 * ydui main
 */
!function (window) {
    "use strict";

    var doc = window.document,
        ydui = {};

    /**
     * 直接绑定FastClick
     */
    $(window).on('load', function () {
        typeof FastClick == 'function' && FastClick.attach(doc.body);
    });

    var util = ydui.util = {
        /**
         * 格式化参数
         * @param string
         */
        parseOptions: function (string) {
            if ($.isPlainObject(string)) {
                return string;
            }

            var start = (string ? string.indexOf('{') : -1),
                options = {};

            if (start != -1) {
                try {
                    options = (new Function('', 'var json = ' + string.substr(start) + '; return JSON.parse(JSON.stringify(json));'))();
                } catch (e) {
                }
            }
            return options;
        },
        /**
         * 页面滚动方法【移动端】
         * @type {{lock, unlock}}
         * lock：禁止页面滚动, unlock：释放页面滚动
         */
        pageScroll: function () {
                var fn = function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                };
                var islock = false;

                return {
                    lock: function () {
                        if (islock)return;
                        islock = true;
                        doc.addEventListener('touchmove', fn);
                    },
                    unlock: function () {
                        islock = false;
                        doc.removeEventListener('touchmove', fn);
                    }
                };
            }(),
        /**
         * 本地存储
         */
        localStorage: function () {
            return storage(window.localStorage);
        }(),
        /**
         * Session存储
         */
        sessionStorage: function () {
            return storage(window.sessionStorage);
        }(),
        /**
         * 序列化
         * @param value
         * @returns {string}
         */
        serialize: function (value) {
            if (typeof value === 'string') return value;
            return JSON.stringify(value);
        },
        /**
         * 反序列化
         * @param value
         * @returns {*}
         */
        deserialize: function (value) {
            if (typeof value !== 'string') return undefined;
            try {
                return JSON.parse(value);
            } catch (e) {
                return value || undefined;
            }
        }
    };

    /**
     * HTML5存储
     */
    function storage (ls) {
        return {
            set: function (key, value) {
                ls.setItem(key, util.serialize(value));
            },
            get: function (key) {
                return util.deserialize(ls.getItem(key));
            },
            remove: function (key) {
                ls.removeItem(key);
            },
            clear: function () {
                ls.clear();
            }
        };
    }

    /**
     * 判断css3动画是否执行完毕
     * @git http://blog.alexmaccaw.com/css-transitions
     * @param duration
     */
    $.fn.emulateTransitionEnd = function (duration) {
        var called = false,
            $el = this;

        $(this).one('webkitTransitionEnd', function () {
            called = true;
        });

        var callback = function () {
            if (!called) $($el).trigger('webkitTransitionEnd');
        };

        setTimeout(callback, duration);
    };

    if (typeof define === 'function') {
        define(ydui);
    } else {
        window.YDUI = ydui;
    }

}(window);

/**
 * Device
 */
!function (window) {
    var doc = window.document,
        ydui = window.YDUI,
        ua = window.navigator && window.navigator.userAgent || '';

    var ipad = !!ua.match(/(iPad).*OS\s([\d_]+)/),
        ipod = !!ua.match(/(iPod)(.*OS\s([\d_]+))?/),
        iphone = !ipad && !!ua.match(/(iPhone\sOS)\s([\d_]+)/);

    ydui.device = {
        /**
         * 是否移动终端
         * @return {Boolean}
         */
        isMobile: !!ua.match(/AppleWebKit.*Mobile.*/) || 'ontouchstart' in doc.documentElement,
        /**
         * 是否IOS终端
         * @returns {boolean}
         */
        isIOS: !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
        /**
         * 是否Android终端
         * @returns {boolean}
         */
        isAndroid: !!ua.match(/(Android);?[\s\/]+([\d.]+)?/),
        /**
         * 是否ipad终端
         * @returns {boolean}
         */
        isIpad: ipad,
        /**
         * 是否ipod终端
         * @returns {boolean}
         */
        isIpod: ipod,
        /**
         * 是否iphone终端
         * @returns {boolean}
         */
        isIphone: iphone,
        /**
         * 是否webview
         * @returns {boolean}
         */
        isWebView: (iphone || ipad || ipod) && !!ua.match(/.*AppleWebKit(?!.*Safari)/i),
        /**
         * 是否微信端
         * @returns {boolean}
         */
        isWeixin: ua.indexOf('MicroMessenger') > -1,
        /**
         * 是否火狐浏览器
         */
        isMozilla: /firefox/.test(navigator.userAgent.toLowerCase()),
        /**
         * 设备像素比
         */
        pixelRatio: window.devicePixelRatio || 1
    };
}(window);

/**
 * 解决:active这个高端洋气的CSS伪类不能使用问题
 */
!function (window) {
    window.document.addEventListener('touchstart', function (event) {
        /* Do Nothing */
    }, false);
}(window);

/**
 * ProgressBar Plugin
 * Refer to: https://github.com/kimmobrunfeldt/progressbar.js.git
 */
!function (window) {
    "use strict";

    var doc = window.document,
        util = window.YDUI.util;

    function Circle (element, options) {
        this.pathTemplate = 'M 50,50 m 0,-{radius} a {radius},{radius} 0 1 1 0,{2radius} a {radius},{radius} 0 1 1 0,-{2radius}';
        ProgressBar.apply(this, arguments);
    }

    Circle.prototype = new ProgressBar();

    Circle.prototype.getPathString = function (widthOfWider) {
        var _this = this,
            r = 50 - widthOfWider / 2;
        return _this.render(_this.pathTemplate, {
            radius: r,
            '2radius': r * 2
        });
    };

    Circle.prototype.initSvg = function (svg) {
        svg.setAttribute('viewBox', '0 0 100 100');
        svg.style.display = 'block';
        svg.style.width = '100%';
    };

    function Line (element, options) {
        this.pathTemplate = 'M 0,{center} L 100,{center}';
        ProgressBar.apply(this, arguments);
    }

    Line.prototype = new ProgressBar();

    Line.prototype.getPathString = function (widthOfWider) {
        var _this = this;
        return _this.render(_this.pathTemplate, {
            center: widthOfWider / 2
        });
    };

    Line.prototype.initSvg = function (svg, options) {
        svg.setAttribute('viewBox', '0 0 100 ' + options.strokeWidth);
        svg.setAttribute('preserveAspectRatio', 'none');
        svg.style.width = '100%';
        svg.style.height = '100%';
    };

    function ProgressBar (element, options) {
        this.$element = $(element);
        this.options = $.extend({}, ProgressBar.DEFAULTS, options || {});
    }

    ProgressBar.DEFAULTS = {
        type: 'circle',
        strokeWidth: 0,
        strokeColor: '#E5E5E5',
        trailWidth: 0,
        trailColor: '#646464',
        fill: '',
        progress: 0,
        delay: true,
        binder: window
    };

    ProgressBar.prototype.set = function (progress) {

        var _this = this,
            length = _this.trailPath.getTotalLength();

        if (!progress) progress = _this.options.progress;
        if (progress > 1)progress = 1;

        _this.trailPath.style.strokeDashoffset = length - progress * length;
    };

    ProgressBar.prototype.appendView = function () {
        var _this = this,
            options = _this.options,
            progress = options.progress,
            svgView = _this.createSvgView(),
            $element = _this.$element;

        _this.$binder = options.binder === window || options.binder == 'window' ? $(window) : $(options.binder);

        var path = svgView.trailPath,
            length = path.getTotalLength();

        path.style.strokeDasharray = length + ' ' + length;

        var $svg = $(svgView.svg);
        $svg.one('appear.ydui.progressbar', function () {
            _this.set(progress);
        });
        $element.append($svg);

        if (options.delay) {
            _this.checkInView($svg);

            _this.$binder.on('scroll.ydui.progressbar', function () {
                _this.checkInView($svg);
            });

            $(window).on('resize', function () {
                _this.checkInView($svg);
            });
        } else {
            $svg.trigger('appear.ydui.progressbar');
        }

        return this;
    };

    ProgressBar.prototype.checkInView = function ($svg) {

        var _this = this,
            $binder = _this.$binder,
            contentHeight = $binder.height(),
            contentTop = $binder.get(0) === window ? $(window).scrollTop() : $binder.offset().top;

        var post = $svg.offset().top - contentTop,
            posb = post + $svg.height();

        if ((post >= 0 && post < contentHeight) || (posb > 0 && posb <= contentHeight)) {
            $svg.trigger('appear.ydui.progressbar');
        }
    };

    ProgressBar.prototype.createSvgView = function () {
        var _this = this,
            options = _this.options;

        var svg = doc.createElementNS('http://www.w3.org/2000/svg', 'svg');
        _this.initSvg(svg, options);

        var path = _this.createPath(options);
        svg.appendChild(path);

        var trailPath = null;
        if (options.trailColor || options.trailWidth) {
            trailPath = _this.createTrailPath(options);
            trailPath.style.strokeDashoffset = trailPath.getTotalLength();
            svg.appendChild(trailPath);
        }

        _this.svg = svg;
        _this.trailPath = trailPath;

        return {
            svg: svg,
            trailPath: trailPath
        }
    };

    ProgressBar.prototype.createTrailPath = function (options) {

        var _this = this;

        if (options.trailWidth == 0) {
            options.trailWidth = options.strokeWidth;
        }

        var pathString = _this.getPathString(options.trailWidth);

        return _this.createPathElement(pathString, options.trailColor, options.trailWidth);
    };

    ProgressBar.prototype.createPath = function (options) {
        var _this = this,
            width = options.strokeWidth;

        if (options.trailWidth && options.trailWidth > options.strokeWidth) {
            width = options.trailWidth;
        }

        var pathString = _this.getPathString(width);
        return _this.createPathElement(pathString, options.strokeColor, options.strokeWidth, options.fill);
    };

    ProgressBar.prototype.createPathElement = function (pathString, color, width, fill) {

        var path = doc.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', pathString);
        path.setAttribute('stroke', color);
        path.setAttribute('stroke-width', width);

        if (fill) {
            path.setAttribute('fill', fill);
        } else {
            path.setAttribute('fill-opacity', '0');
        }

        return path;
    };

    ProgressBar.prototype.render = function (template, vars) {
        var rendered = template;

        for (var key in vars) {
            if (vars.hasOwnProperty(key)) {
                var val = vars[key];
                var regExpString = '\\{' + key + '\\}';
                var regExp = new RegExp(regExpString, 'g');

                rendered = rendered.replace(regExp, val);
            }
        }

        return rendered;
    };

    function Plugin (option) {
        var args = Array.prototype.slice.call(arguments, 1);

        return this.each(function () {
            var $this = $(this),
                progressbar = $this.data('ydui.progressbar');

            if (!progressbar) {
                if (option.type == 'line') {
                    $this.data('ydui.progressbar', (progressbar = new Line(this, option)));
                } else {
                    $this.data('ydui.progressbar', (progressbar = new Circle(this, option)));
                }
                if (!option || typeof option == 'object') {
                    progressbar.appendView();
                }
            }

            if (typeof option == 'string') {
                progressbar[option] && progressbar[option].apply(progressbar, args);
            }
        });
    }

    $('[data-ydui-progressbar]').each(function () {
        var $this = $(this);

        Plugin.call($this, util.parseOptions($this.data('ydui-progressbar')));
    });

    $.fn.progressBar = Plugin;

}(window);

/**
 * Tab Plugin
 */
!function (window) {
    "use strict";

    function Tab (element, options) {
        this.$element = $(element);
        this.options = $.extend({}, Tab.DEFAULTS, options || {});
        this.init();
        this.bindEvent();
        this.transitioning = false;
    }

    // 150ms 为切换动画执行时间
    Tab.TRANSITION_DURATION = 150;

    Tab.DEFAULTS = {
        nav: '.tab-nav-item',
        panel: '.tab-panel-item',
        activeClass: 'tab-active'
    };

    Tab.prototype.init = function () {
        var _this = this,
            $element = _this.$element;

        _this.$nav = $element.find(_this.options.nav);
        _this.$panel = $element.find(_this.options.panel);
    };

    /**
     * 給选项卡导航绑定点击事件
     */
    Tab.prototype.bindEvent = function () {
        var _this = this;
        _this.$nav.each(function (e) {
            $(this).on('click.ydui.tab', function () {
                _this.open(e);
            });
        });
    };

    /**
     * 打开选项卡
     * @param index 当前导航索引
     */
    Tab.prototype.open = function (index) {
        var _this = this;

        index = typeof index == 'number' ? index : _this.$nav.filter(index).index();

        var $curNav = _this.$nav.eq(index);

        // 如果切换动画进行时或者当前二次点击 禁止重复操作
        if (_this.transitioning || $curNav.hasClass(_this.options.activeClass))return;

        _this.transitioning = true;

        // 打开选项卡时绑定自定义事件
        $curNav.trigger($.Event('open.ydui.tab', {
            index: index
        }));

        // 给tab导航添加选中样式
        _this.active($curNav, _this.$nav);

        // 给tab内容添加选中样式
        _this.active(_this.$panel.eq(index), _this.$panel, function () {
            // 打开选项卡后绑定自定义事件
            $curNav.trigger({
                type: 'opened.ydui.tab',
                index: index
            });
            _this.transitioning = false;
        });
    };

    /**
     * 添加选中样式
     * @param $element 当前需要添加选中样式的对象
     * @param $container 当前对象的同级所有对象
     * @param callback 回调
     */
    Tab.prototype.active = function ($element, $container, callback) {
        var _this = this,
            activeClass = _this.options.activeClass;

        var $avtive = $container.filter('.' + activeClass);

        function next () {
            typeof callback == 'function' && callback();
        }

        // 动画执行完毕后回调
        $element.one('webkitTransitionEnd', next).emulateTransitionEnd(Tab.TRANSITION_DURATION);

        $avtive.removeClass(activeClass);
        $element.addClass(activeClass);
    };

    function Plugin (option) {
        var args = Array.prototype.slice.call(arguments, 1);

        return this.each(function () {
            var target = this,
                $this = $(target),
                tab = $this.data('ydui.tab');

            if (!tab) {
                $this.data('ydui.tab', (tab = new Tab(target, option)));
            }

            if (typeof option == 'string') {
                tab[option] && tab[option].apply(tab, args);
            }
        });
    }

    $(window).on('load.ydui.tab', function () {
        $('[data-ydui-tab]').each(function () {
            var $this = $(this);
            $this.tab(window.YDUI.util.parseOptions($this.data('ydui-tab')));
        });
    });

    $.fn.tab = Plugin;

}(window);

/**
 * ydui.util
 */
!function (window) {
    "use strict";

    var util = window.YDUI.util = window.YDUI.util || {},
        doc = window.document;

    /**
     * 日期格式化
     * @param format 日期格式 {%d天}{%h时}{%m分}{%s秒}{%f毫秒}
     * @param time 单位 毫秒
     * @returns {string}
     */
    util.timestampTotime = function (format, time) {
        var t = {},
            floor = Math.floor;

        t.f = time % 1000;
        time = floor(time / 1000);
        t.s = time % 60;
        time = floor(time / 60);
        t.m = time % 60;
        time = floor(time / 60);
        t.h = time % 24;
        t.d = floor(time / 24);

        var ment = function (a) {
            if (a <= 0) {
                return '';
            }
            return '$1' + (a < 10 ? '0' + a : a) + '$2';
        };

        format = format.replace(/\{([^{]*?)%d(.*?)\}/g, ment(t.d));
        format = format.replace(/\{([^{]*?)%h(.*?)\}/g, ment(t.h));
        format = format.replace(/\{([^{]*?)%m(.*?)\}/g, ment(t.m));
        format = format.replace(/\{([^{]*?)%s(.*?)\}/g, ment(t.s));
        format = format.replace(/\{([^{]*?)%f(.*?)\}/g, ment(t.f));

        return format;
    };

    /**
     * js倒计时
     * @param format 时间格式 {%d}天{%h}时{%m}分{%s}秒{%f}毫秒
     * @param time 结束时间时间戳 毫秒
     * @param speed 速度
     * @param callback ret 倒计时结束回调函数 ret 时间字符 ；ret == '' 则倒计时结束
     * DEMO: YDUI.util.countdown('{%d天}{%h时}{%m分}{%s秒}{%f毫秒}', Date.parse(new Date()) + 60000, 1000, function(ret){ console.log(ret); });
     */
    util.countdown = function (format, time, speed, callback) {
        var that = this;
        var timer = setInterval(function () {
            var l_time = time - new Date().getTime();
            if (l_time > 0) {
                callback(that.timestampTotime(format, l_time));
            } else {
                clearInterval(timer);
                typeof callback == 'function' && callback('');
            }
        }, speed);
    };

    /**
     * js 加减乘除
     * @param arg1 数值1
     * @param op 操作符string 【+ - * /】
     * @param arg2 数值2
     * @returns {Object} arg1 与 arg2运算的精确结果
     */
    util.calc = function (arg1, op, arg2) {
        var ra = 1, rb = 1, m;

        try {
            ra = arg1.toString().split('.')[1].length;
        } catch (e) {
        }
        try {
            rb = arg2.toString().split('.')[1].length;
        } catch (e) {
        }
        m = Math.pow(10, Math.max(ra, rb));

        switch (op) {
            case '+':
            case '-':
                arg1 = Math.round(arg1 * m);
                arg2 = Math.round(arg2 * m);
                break;
            case '*':
                ra = Math.pow(10, ra);
                rb = Math.pow(10, rb);
                m = ra * rb;
                arg1 = Math.round(arg1 * ra);
                arg2 = Math.round(arg2 * rb);
                break;
            case '/':
                arg1 = Math.round(arg1 * m);
                arg2 = Math.round(arg2 * m);
                m = 1;
                break;
        }
        try {
            var result = eval('(' + '(' + arg1 + ')' + op + '(' + arg2 + ')' + ')/' + m);
        } catch (e) {
        }
        return result;
    };

    /**
     * 读取图片文件 并返回图片的DataUrl
     * @param obj
     * @param callback
     */
    util.getImgBase64 = function (obj, callback) {
        var that = this, dataimg = '', file = obj.files[0];
        if (!file)return;
        if (!/image\/\w+/.test(file.type)) {
            that.tipMes('请上传图片文件', 'error');
            return;
        }
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            dataimg = this.result;
            typeof callback === 'function' && callback(dataimg);
        };
    };

    /**
     * 获取地址栏参数
     * @param name
     * @returns {*}
     */
    util.getQueryString = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
            r = window.location.search.substr(1).match(reg),
            qs = '';
        if (r != null)qs = decodeURIComponent(r[2]);
        return qs;
    };

    /**
     * Cookie
     * @type {{get, set}}
     */
    util.cookie = function () {
        return {
            /**
             * 获取 Cookie
             * @param  {String} name
             * @return {String}
             */
            get: function (name) {
                var m = doc.cookie.match('(?:^|;)\\s*' + name + '=([^;]*)');
                return (m && m[1]) ? decodeURIComponent(m[1]) : '';
            },
            /**
             * 设置 Cookie
             * @param {String}  name 名称
             * @param {String}  val 值
             * @param {Number} expires 单位（秒）
             * @param {String}  domain 域
             * @param {String}  path 所在的目录
             * @param {Boolean} secure 跨协议传递
             */
            set: function (name, val, expires, domain, path, secure) {
                var text = String(encodeURIComponent(val)),
                    date = expires;

                // 从当前时间开始，多少小时后过期
                if (typeof date === 'number') {
                    date = new Date();
                    date.setTime(date.getTime() + expires * 1000);
                }

                date instanceof Date && (text += '; expires=' + date.toUTCString());

                !!domain && (text += '; domain=' + domain);

                text += '; path=' + (path || '/');

                secure && (text += '; secure');

                doc.cookie = name + '=' + text;
            }
        }
    }();

}(window);

;(function () {
    'use strict';

    /**
     * @preserve FastClick: polyfill to remove click delays on browsers with touch UIs.
     *
     * @codingstandard ftlabs-jsv2
     * @copyright The Financial Times Limited [All Rights Reserved]
     * @license MIT License (see LICENSE.txt)
     */

    /*jslint browser:true, node:true*/
    /*global define, Event, Node*/


    /**
     * Instantiate fast-clicking listeners on the specified layer.
     *
     * @constructor
     * @param {Element} layer The layer to listen on
     * @param {Object} [options={}] The options to override the defaults
     */
    function FastClick(layer, options) {
        var oldOnClick;

        options = options || {};

        /**
         * Whether a click is currently being tracked.
         *
         * @type boolean
         */
        this.trackingClick = false;


        /**
         * Timestamp for when click tracking started.
         *
         * @type number
         */
        this.trackingClickStart = 0;


        /**
         * The element being tracked for a click.
         *
         * @type EventTarget
         */
        this.targetElement = null;


        /**
         * X-coordinate of touch start event.
         *
         * @type number
         */
        this.touchStartX = 0;


        /**
         * Y-coordinate of touch start event.
         *
         * @type number
         */
        this.touchStartY = 0;


        /**
         * ID of the last touch, retrieved from Touch.identifier.
         *
         * @type number
         */
        this.lastTouchIdentifier = 0;


        /**
         * Touchmove boundary, beyond which a click will be cancelled.
         *
         * @type number
         */
        this.touchBoundary = options.touchBoundary || 10;


        /**
         * The FastClick layer.
         *
         * @type Element
         */
        this.layer = layer;

        /**
         * The minimum time between tap(touchstart and touchend) events
         *
         * @type number
         */
        this.tapDelay = options.tapDelay || 200;

        /**
         * The maximum time for a tap
         *
         * @type number
         */
        this.tapTimeout = options.tapTimeout || 700;

        if (FastClick.notNeeded(layer)) {
            return;
        }

        // Some old versions of Android don't have Function.prototype.bind
        function bind(method, context) {
            return function() { return method.apply(context, arguments); };
        }


        var methods = ['onMouse', 'onClick', 'onTouchStart', 'onTouchMove', 'onTouchEnd', 'onTouchCancel'];
        var context = this;
        for (var i = 0, l = methods.length; i < l; i++) {
            context[methods[i]] = bind(context[methods[i]], context);
        }

        // Set up event handlers as required
        if (deviceIsAndroid) {
            layer.addEventListener('mouseover', this.onMouse, true);
            layer.addEventListener('mousedown', this.onMouse, true);
            layer.addEventListener('mouseup', this.onMouse, true);
        }

        layer.addEventListener('click', this.onClick, true);
        layer.addEventListener('touchstart', this.onTouchStart, false);
        layer.addEventListener('touchmove', this.onTouchMove, false);
        layer.addEventListener('touchend', this.onTouchEnd, false);
        layer.addEventListener('touchcancel', this.onTouchCancel, false);

        // Hack is required for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
        // which is how FastClick normally stops click events bubbling to callbacks registered on the FastClick
        // layer when they are cancelled.
        if (!Event.prototype.stopImmediatePropagation) {
            layer.removeEventListener = function(type, callback, capture) {
                var rmv = Node.prototype.removeEventListener;
                if (type === 'click') {
                    rmv.call(layer, type, callback.hijacked || callback, capture);
                } else {
                    rmv.call(layer, type, callback, capture);
                }
            };

            layer.addEventListener = function(type, callback, capture) {
                var adv = Node.prototype.addEventListener;
                if (type === 'click') {
                    adv.call(layer, type, callback.hijacked || (callback.hijacked = function(event) {
                            if (!event.propagationStopped) {
                                callback(event);
                            }
                        }), capture);
                } else {
                    adv.call(layer, type, callback, capture);
                }
            };
        }

        // If a handler is already declared in the element's onclick attribute, it will be fired before
        // FastClick's onClick handler. Fix this by pulling out the user-defined handler function and
        // adding it as listener.
        if (typeof layer.onclick === 'function') {

            // Android browser on at least 3.2 requires a new reference to the function in layer.onclick
            // - the old one won't work if passed to addEventListener directly.
            oldOnClick = layer.onclick;
            layer.addEventListener('click', function(event) {
                oldOnClick(event);
            }, false);
            layer.onclick = null;
        }
    }

    /**
     * Windows Phone 8.1 fakes user agent string to look like Android and iPhone.
     *
     * @type boolean
     */
    var deviceIsWindowsPhone = navigator.userAgent.indexOf("Windows Phone") >= 0;

    /**
     * Android requires exceptions.
     *
     * @type boolean
     */
    var deviceIsAndroid = navigator.userAgent.indexOf('Android') > 0 && !deviceIsWindowsPhone;


    /**
     * iOS requires exceptions.
     *
     * @type boolean
     */
    var deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent) && !deviceIsWindowsPhone;


    /**
     * iOS 4 requires an exception for select elements.
     *
     * @type boolean
     */
    var deviceIsIOS4 = deviceIsIOS && (/OS 4_\d(_\d)?/).test(navigator.userAgent);


    /**
     * iOS 6.0-7.* requires the target element to be manually derived
     *
     * @type boolean
     */
    var deviceIsIOSWithBadTarget = deviceIsIOS && (/OS [6-7]_\d/).test(navigator.userAgent);

    /**
     * BlackBerry requires exceptions.
     *
     * @type boolean
     */
    var deviceIsBlackBerry10 = navigator.userAgent.indexOf('BB10') > 0;

    /**
     * Determine whether a given element requires a native click.
     *
     * @param {EventTarget|Element} target Target DOM element
     * @returns {boolean} Returns true if the element needs a native click
     */
    FastClick.prototype.needsClick = function(target) {
        switch (target.nodeName.toLowerCase()) {

            // Don't send a synthetic click to disabled inputs (issue #62)
            case 'button':
            case 'select':
            case 'textarea':
                if (target.disabled) {
                    return true;
                }

                break;
            case 'input':

                // File inputs need real clicks on iOS 6 due to a browser bug (issue #68)
                if ((deviceIsIOS && target.type === 'file') || target.disabled) {
                    return true;
                }

                break;
            case 'label':
            case 'iframe': // iOS8 homescreen apps can prevent events bubbling into frames
            case 'video':
                return true;
        }

        return (/\bneedsclick\b/).test(target.className);
    };


    /**
     * Determine whether a given element requires a call to focus to simulate click into element.
     *
     * @param {EventTarget|Element} target Target DOM element
     * @returns {boolean} Returns true if the element requires a call to focus to simulate native click.
     */
    FastClick.prototype.needsFocus = function(target) {
        switch (target.nodeName.toLowerCase()) {
            case 'textarea':
                return true;
            case 'select':
                return !deviceIsAndroid;
            case 'input':
                switch (target.type) {
                    case 'button':
                    case 'checkbox':
                    case 'file':
                    case 'image':
                    case 'radio':
                    case 'submit':
                        return false;
                }

                // No point in attempting to focus disabled inputs
                return !target.disabled && !target.readOnly;
            default:
                return (/\bneedsfocus\b/).test(target.className);
        }
    };


    /**
     * Send a click event to the specified element.
     *
     * @param {EventTarget|Element} targetElement
     * @param {Event} event
     */
    FastClick.prototype.sendClick = function(targetElement, event) {
        var clickEvent, touch;

        // On some Android devices activeElement needs to be blurred otherwise the synthetic click will have no effect (#24)
        if (document.activeElement && document.activeElement !== targetElement) {
            document.activeElement.blur();
        }

        touch = event.changedTouches[0];

        // Synthesise a click event, with an extra attribute so it can be tracked
        clickEvent = document.createEvent('MouseEvents');
        clickEvent.initMouseEvent(this.determineEventType(targetElement), true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
        clickEvent.forwardedTouchEvent = true;
        targetElement.dispatchEvent(clickEvent);
    };

    FastClick.prototype.determineEventType = function(targetElement) {

        //Issue #159: Android Chrome Select Box does not open with a synthetic click event
        if (deviceIsAndroid && targetElement.tagName.toLowerCase() === 'select') {
            return 'mousedown';
        }

        return 'click';
    };


    /**
     * @param {EventTarget|Element} targetElement
     */
    FastClick.prototype.focus = function(targetElement) {
        var length;

        // Issue #160: on iOS 7, some input elements (e.g. date datetime month) throw a vague TypeError on setSelectionRange. These elements don't have an integer value for the selectionStart and selectionEnd properties, but unfortunately that can't be used for detection because accessing the properties also throws a TypeError. Just check the type instead. Filed as Apple bug #15122724.
        if (deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month') {
            length = targetElement.value.length;
            targetElement.setSelectionRange(length, length);
        } else {
            targetElement.focus();
        }
    };


    /**
     * Check whether the given target element is a child of a scrollable layer and if so, set a flag on it.
     *
     * @param {EventTarget|Element} targetElement
     */
    FastClick.prototype.updateScrollParent = function(targetElement) {
        var scrollParent, parentElement;

        scrollParent = targetElement.fastClickScrollParent;

        // Attempt to discover whether the target element is contained within a scrollable layer. Re-check if the
        // target element was moved to another parent.
        if (!scrollParent || !scrollParent.contains(targetElement)) {
            parentElement = targetElement;
            do {
                if (parentElement.scrollHeight > parentElement.offsetHeight) {
                    scrollParent = parentElement;
                    targetElement.fastClickScrollParent = parentElement;
                    break;
                }

                parentElement = parentElement.parentElement;
            } while (parentElement);
        }

        // Always update the scroll top tracker if possible.
        if (scrollParent) {
            scrollParent.fastClickLastScrollTop = scrollParent.scrollTop;
        }
    };


    /**
     * @param {EventTarget} targetElement
     * @returns {Element|EventTarget}
     */
    FastClick.prototype.getTargetElementFromEventTarget = function(eventTarget) {

        // On some older browsers (notably Safari on iOS 4.1 - see issue #56) the event target may be a text node.
        if (eventTarget.nodeType === Node.TEXT_NODE) {
            return eventTarget.parentNode;
        }

        return eventTarget;
    };


    /**
     * On touch start, record the position and scroll offset.
     *
     * @param {Event} event
     * @returns {boolean}
     */
    FastClick.prototype.onTouchStart = function(event) {
        var targetElement, touch, selection;

        // Ignore multiple touches, otherwise pinch-to-zoom is prevented if both fingers are on the FastClick element (issue #111).
        if (event.targetTouches.length > 1) {
            return true;
        }

        targetElement = this.getTargetElementFromEventTarget(event.target);
        touch = event.targetTouches[0];

        if (deviceIsIOS) {

            // Only trusted events will deselect text on iOS (issue #49)
            selection = window.getSelection();
            if (selection.rangeCount && !selection.isCollapsed) {
                return true;
            }

            if (!deviceIsIOS4) {

                // Weird things happen on iOS when an alert or confirm dialog is opened from a click event callback (issue #23):
                // when the user next taps anywhere else on the page, new touchstart and touchend events are dispatched
                // with the same identifier as the touch event that previously triggered the click that triggered the alert.
                // Sadly, there is an issue on iOS 4 that causes some normal touch events to have the same identifier as an
                // immediately preceeding touch event (issue #52), so this fix is unavailable on that platform.
                // Issue 120: touch.identifier is 0 when Chrome dev tools 'Emulate touch events' is set with an iOS device UA string,
                // which causes all touch events to be ignored. As this block only applies to iOS, and iOS identifiers are always long,
                // random integers, it's safe to to continue if the identifier is 0 here.
                if (touch.identifier && touch.identifier === this.lastTouchIdentifier) {
                    event.preventDefault();
                    return false;
                }

                this.lastTouchIdentifier = touch.identifier;

                // If the target element is a child of a scrollable layer (using -webkit-overflow-scrolling: touch) and:
                // 1) the user does a fling scroll on the scrollable layer
                // 2) the user stops the fling scroll with another tap
                // then the event.target of the last 'touchend' event will be the element that was under the user's finger
                // when the fling scroll was started, causing FastClick to send a click event to that layer - unless a check
                // is made to ensure that a parent layer was not scrolled before sending a synthetic click (issue #42).
                this.updateScrollParent(targetElement);
            }
        }

        this.trackingClick = true;
        this.trackingClickStart = event.timeStamp;
        this.targetElement = targetElement;

        this.touchStartX = touch.pageX;
        this.touchStartY = touch.pageY;

        // Prevent phantom clicks on fast double-tap (issue #36)
        if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {
            event.preventDefault();
        }

        return true;
    };


    /**
     * Based on a touchmove event object, check whether the touch has moved past a boundary since it started.
     *
     * @param {Event} event
     * @returns {boolean}
     */
    FastClick.prototype.touchHasMoved = function(event) {
        var touch = event.changedTouches[0], boundary = this.touchBoundary;

        if (Math.abs(touch.pageX - this.touchStartX) > boundary || Math.abs(touch.pageY - this.touchStartY) > boundary) {
            return true;
        }

        return false;
    };


    /**
     * Update the last position.
     *
     * @param {Event} event
     * @returns {boolean}
     */
    FastClick.prototype.onTouchMove = function(event) {
        if (!this.trackingClick) {
            return true;
        }

        // If the touch has moved, cancel the click tracking
        if (this.targetElement !== this.getTargetElementFromEventTarget(event.target) || this.touchHasMoved(event)) {
            this.trackingClick = false;
            this.targetElement = null;
        }

        return true;
    };


    /**
     * Attempt to find the labelled control for the given label element.
     *
     * @param {EventTarget|HTMLLabelElement} labelElement
     * @returns {Element|null}
     */
    FastClick.prototype.findControl = function(labelElement) {

        // Fast path for newer browsers supporting the HTML5 control attribute
        if (labelElement.control !== undefined) {
            return labelElement.control;
        }

        // All browsers under test that support touch events also support the HTML5 htmlFor attribute
        if (labelElement.htmlFor) {
            return document.getElementById(labelElement.htmlFor);
        }

        // If no for attribute exists, attempt to retrieve the first labellable descendant element
        // the list of which is defined here: http://www.w3.org/TR/html5/forms.html#category-label
        return labelElement.querySelector('button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea');
    };


    /**
     * On touch end, determine whether to send a click event at once.
     *
     * @param {Event} event
     * @returns {boolean}
     */
    FastClick.prototype.onTouchEnd = function(event) {
        var forElement, trackingClickStart, targetTagName, scrollParent, touch, targetElement = this.targetElement;

        if (!this.trackingClick) {
            return true;
        }

        // Prevent phantom clicks on fast double-tap (issue #36)
        if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {
            this.cancelNextClick = true;
            return true;
        }

        if ((event.timeStamp - this.trackingClickStart) > this.tapTimeout) {
            return true;
        }

        // Reset to prevent wrong click cancel on input (issue #156).
        this.cancelNextClick = false;

        this.lastClickTime = event.timeStamp;

        trackingClickStart = this.trackingClickStart;
        this.trackingClick = false;
        this.trackingClickStart = 0;

        // On some iOS devices, the targetElement supplied with the event is invalid if the layer
        // is performing a transition or scroll, and has to be re-detected manually. Note that
        // for this to function correctly, it must be called *after* the event target is checked!
        // See issue #57; also filed as rdar://13048589 .
        if (deviceIsIOSWithBadTarget) {
            touch = event.changedTouches[0];

            // In certain cases arguments of elementFromPoint can be negative, so prevent setting targetElement to null
            targetElement = document.elementFromPoint(touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset) || targetElement;
            targetElement.fastClickScrollParent = this.targetElement.fastClickScrollParent;
        }

        targetTagName = targetElement.tagName.toLowerCase();
        if (targetTagName === 'label') {
            forElement = this.findControl(targetElement);
            if (forElement) {
                this.focus(targetElement);
                if (deviceIsAndroid) {
                    return false;
                }

                targetElement = forElement;
            }
        } else if (this.needsFocus(targetElement)) {

            // Case 1: If the touch started a while ago (best guess is 100ms based on tests for issue #36) then focus will be triggered anyway. Return early and unset the target element reference so that the subsequent click will be allowed through.
            // Case 2: Without this exception for input elements tapped when the document is contained in an iframe, then any inputted text won't be visible even though the value attribute is updated as the user types (issue #37).
            if ((event.timeStamp - trackingClickStart) > 100 || (deviceIsIOS && window.top !== window && targetTagName === 'input')) {
                this.targetElement = null;
                return false;
            }

            this.focus(targetElement);
            this.sendClick(targetElement, event);

            // Select elements need the event to go through on iOS 4, otherwise the selector menu won't open.
            // Also this breaks opening selects when VoiceOver is active on iOS6, iOS7 (and possibly others)
            if (!deviceIsIOS || targetTagName !== 'select') {
                this.targetElement = null;
                event.preventDefault();
            }

            return false;
        }

        if (deviceIsIOS && !deviceIsIOS4) {

            // Don't send a synthetic click event if the target element is contained within a parent layer that was scrolled
            // and this tap is being used to stop the scrolling (usually initiated by a fling - issue #42).
            scrollParent = targetElement.fastClickScrollParent;
            if (scrollParent && scrollParent.fastClickLastScrollTop !== scrollParent.scrollTop) {
                return true;
            }
        }

        // Prevent the actual click from going though - unless the target node is marked as requiring
        // real clicks or if it is in the whitelist in which case only non-programmatic clicks are permitted.
        if (!this.needsClick(targetElement)) {
            event.preventDefault();
            this.sendClick(targetElement, event);
        }

        return false;
    };


    /**
     * On touch cancel, stop tracking the click.
     *
     * @returns {void}
     */
    FastClick.prototype.onTouchCancel = function() {
        this.trackingClick = false;
        this.targetElement = null;
    };


    /**
     * Determine mouse events which should be permitted.
     *
     * @param {Event} event
     * @returns {boolean}
     */
    FastClick.prototype.onMouse = function(event) {

        // If a target element was never set (because a touch event was never fired) allow the event
        if (!this.targetElement) {
            return true;
        }

        if (event.forwardedTouchEvent) {
            return true;
        }

        // Programmatically generated events targeting a specific element should be permitted
        if (!event.cancelable) {
            return true;
        }

        // Derive and check the target element to see whether the mouse event needs to be permitted;
        // unless explicitly enabled, prevent non-touch click events from triggering actions,
        // to prevent ghost/doubleclicks.
        if (!this.needsClick(this.targetElement) || this.cancelNextClick) {

            // Prevent any user-added listeners declared on FastClick element from being fired.
            if (event.stopImmediatePropagation) {
                event.stopImmediatePropagation();
            } else {

                // Part of the hack for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
                event.propagationStopped = true;
            }

            // Cancel the event
            event.stopPropagation();
            event.preventDefault();

            return false;
        }

        // If the mouse event is permitted, return true for the action to go through.
        return true;
    };


    /**
     * On actual clicks, determine whether this is a touch-generated click, a click action occurring
     * naturally after a delay after a touch (which needs to be cancelled to avoid duplication), or
     * an actual click which should be permitted.
     *
     * @param {Event} event
     * @returns {boolean}
     */
    FastClick.prototype.onClick = function(event) {
        var permitted;

        // It's possible for another FastClick-like library delivered with third-party code to fire a click event before FastClick does (issue #44). In that case, set the click-tracking flag back to false and return early. This will cause onTouchEnd to return early.
        if (this.trackingClick) {
            this.targetElement = null;
            this.trackingClick = false;
            return true;
        }

        // Very odd behaviour on iOS (issue #18): if a submit element is present inside a form and the user hits enter in the iOS simulator or clicks the Go button on the pop-up OS keyboard the a kind of 'fake' click event will be triggered with the submit-type input element as the target.
        if (event.target.type === 'submit' && event.detail === 0) {
            return true;
        }

        permitted = this.onMouse(event);

        // Only unset targetElement if the click is not permitted. This will ensure that the check for !targetElement in onMouse fails and the browser's click doesn't go through.
        if (!permitted) {
            this.targetElement = null;
        }

        // If clicks are permitted, return true for the action to go through.
        return permitted;
    };


    /**
     * Remove all FastClick's event listeners.
     *
     * @returns {void}
     */
    FastClick.prototype.destroy = function() {
        var layer = this.layer;

        if (deviceIsAndroid) {
            layer.removeEventListener('mouseover', this.onMouse, true);
            layer.removeEventListener('mousedown', this.onMouse, true);
            layer.removeEventListener('mouseup', this.onMouse, true);
        }

        layer.removeEventListener('click', this.onClick, true);
        layer.removeEventListener('touchstart', this.onTouchStart, false);
        layer.removeEventListener('touchmove', this.onTouchMove, false);
        layer.removeEventListener('touchend', this.onTouchEnd, false);
        layer.removeEventListener('touchcancel', this.onTouchCancel, false);
    };


    /**
     * Check whether FastClick is needed.
     *
     * @param {Element} layer The layer to listen on
     */
    FastClick.notNeeded = function(layer) {
        var metaViewport;
        var chromeVersion;
        var blackberryVersion;
        var firefoxVersion;

        // Devices that don't support touch don't need FastClick
        if (typeof window.ontouchstart === 'undefined') {
            return true;
        }

        // Chrome version - zero for other browsers
        chromeVersion = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [,0])[1];

        if (chromeVersion) {

            if (deviceIsAndroid) {
                metaViewport = document.querySelector('meta[name=viewport]');

                if (metaViewport) {
                    // Chrome on Android with user-scalable="no" doesn't need FastClick (issue #89)
                    if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
                        return true;
                    }
                    // Chrome 32 and above with width=device-width or less don't need FastClick
                    if (chromeVersion > 31 && document.documentElement.scrollWidth <= window.outerWidth) {
                        return true;
                    }
                }

                // Chrome desktop doesn't need FastClick (issue #15)
            } else {
                return true;
            }
        }

        if (deviceIsBlackBerry10) {
            blackberryVersion = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/);

            // BlackBerry 10.3+ does not require Fastclick library.
            // https://github.com/ftlabs/fastclick/issues/251
            if (blackberryVersion[1] >= 10 && blackberryVersion[2] >= 3) {
                metaViewport = document.querySelector('meta[name=viewport]');

                if (metaViewport) {
                    // user-scalable=no eliminates click delay.
                    if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
                        return true;
                    }
                    // width=device-width (or less than device-width) eliminates click delay.
                    if (document.documentElement.scrollWidth <= window.outerWidth) {
                        return true;
                    }
                }
            }
        }

        // IE10 with -ms-touch-action: none or manipulation, which disables double-tap-to-zoom (issue #97)
        if (layer.style.msTouchAction === 'none' || layer.style.touchAction === 'manipulation') {
            return true;
        }

        // Firefox version - zero for other browsers
        firefoxVersion = +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [,0])[1];

        if (firefoxVersion >= 27) {
            // Firefox 27+ does not have tap delay if the content is not zoomable - https://bugzilla.mozilla.org/show_bug.cgi?id=922896

            metaViewport = document.querySelector('meta[name=viewport]');
            if (metaViewport && (metaViewport.content.indexOf('user-scalable=no') !== -1 || document.documentElement.scrollWidth <= window.outerWidth)) {
                return true;
            }
        }

        // IE11: prefixed -ms-touch-action is no longer supported and it's recomended to use non-prefixed version
        // http://msdn.microsoft.com/en-us/library/windows/apps/Hh767313.aspx
        if (layer.style.touchAction === 'none' || layer.style.touchAction === 'manipulation') {
            return true;
        }

        return false;
    };


    /**
     * Factory method for creating a FastClick object
     *
     * @param {Element} layer The layer to listen on
     * @param {Object} [options={}] The options to override the defaults
     */
    FastClick.attach = function(layer, options) {
        return new FastClick(layer, options);
    };


    if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {

        // AMD. Register as an anonymous module.
        define(function() {
            return FastClick;
        });
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = FastClick.attach;
        module.exports.FastClick = FastClick;
    } else {
        window.FastClick = FastClick;
    }
}());

undefined