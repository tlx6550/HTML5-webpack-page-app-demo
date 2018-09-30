/**
 * Created by issuser on 2018/9/28 0028.
 */
import '../assets/styles/zqsy.scss';
import $ from '../js/jquery.min.js';
/*import {yd} from '../assets/js/ydui.js';*/
import {flexible} from '../assets/js/flexible.js';

$(".inner-tab-nav-item").click(function(){
    var index = $(this).index();
    $('.inner-tab-nav-item').removeClass("on");
    $(".inner-tab-panel").removeClass("on");
    $(this).addClass("on");
    $(".inner-tab-panel").eq(index).addClass("on");
})

// 折叠
$('div.card').find('.fold-btn').on('click', function(e) {
    e.stopPropagation();
    $(this).toggleClass('show-up-arrow')
    $(this).parent().toggleClass('text-ellipsis');
})
// 去除遮罩
$('div.pop-wrap').find('.content').on('touchstart', function(e) {
    e.stopPropagation();
    $(this).children('.zhezhao').hide();
})
// 马上开通
$('div.card').find('.mskt-btn').on('click', function(e) {
    e.stopPropagation();
    $('.pop-big').show();
})
$('div.xiangqingye-wrap').find('.comfirm').on('click', function(e) {
    e.stopPropagation();
    $('.toast').show();
    setTimeout(()=>{
        $('.toast').hide();
    },2000);
})
$('div.pop-big').find('.comfirm').on('click', function(e) {
    e.stopPropagation();
    $('.toast').show();
    setTimeout(()=>{
        $('.toast').hide();
        $('.pop-com').hide();
    },2000);
})
// 取消
$('div.pop-big').find('.cancle').on('click', function(e) {
    e.stopPropagation();
    $('.pop-com').hide();
})
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