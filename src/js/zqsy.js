/**
 * Created by issuser on 2018/9/28 0028.
 */
import '../assets/styles/zqsy.scss';
import $ from '../js/jquery.min.js';
import '../assets/js/swiper.min.js';
import  '../assets/js/flexible.js';

// app download
import '../js/mmdl.js';
import '../js/mmapp.js';
import initAllApp from '../js/tab_control.js';

const appName = {
    '001': 'aiqiyi',
    '002': 'wangyi',
    '003': 'toutiao',
    '004': 'youku'
}
let appId = ''
$(".inner-tab-nav-item").click(function(){
    var index = $(this).index();
    $('.inner-tab-nav-item').removeClass("on");
    $(".inner-tab-panel").removeClass("on");
    $(this).addClass("on");
    $(".inner-tab-panel").eq(index).addClass("on");
})


initAllApp();


// 滑动
// ww: swiper
function initSwiper() {
    new Swiper('.swiper-container', {
        autoHeight: true,
        pagination: '.swiper-pagination',
        paginationClickable: true,
        observer:true,//修改swiper自己或子元素时，自动初始化swiper
        observeParents:false,//修改swiper的父元素时，自动初始化swiper
        paginationBulletRender: function (swiper, index, className) {
            var tabs = ['应用管理', '重磅推荐'];
            return '<div class="' + className + '">' + tabs[index] + '</div>';
        }
    });
}
setTimeout(()=>{
    initSwiper();
},300)
$(document).on("click", ".inner-tab-nav-item", function() {
    initSwiper();
})
// 解决弹窗弹窗字体模糊问题,宽度一定要是偶数
window.onload = function () {
    const doc = window.document;
    const win  = window
    const or = 'orientationchange' in win ? 'orientationchange' : 'resize'
    function _refreshRem() {
        const docEle = doc.documentElement;
        const s = docEle.style.fontSize
        const fontSize =Math.round( parseInt(s) * 10.08/ 2) * 2
        $('.pop').css('width',fontSize + 'px');
    }
    if(doc.addEventListener){
        win.addEventListener(or, _refreshRem, false);
        doc.addEventListener("DOMContentLoaded", _refreshRem, false);
    }
    _refreshRem();
}
// 折叠
$('div.card').find('.fold-btn').on('click', function(e) {
    e.stopPropagation();
    $(this).toggleClass('show-up-arrow')
    $(this).parent().toggleClass('text-ellipsis');
})
// 去除遮罩
$('div.pop-wrap').on('touchstart','.content', function(e) {
    e.stopPropagation();
    $(this).children('.zhezhao').hide();
})
// 马上开通
$('div.card').find('.mskt-btn').on('click', function(e) {
    e.stopPropagation();
    appId = $(this).data('id')
    addContent();
    $('.pop-big').show();
})
$('div.xiangqingye-wrap').find('.comfirm').on('click', function(e) {
    e.stopPropagation();
    $('.toast').show();
    setTimeout(()=>{
        $('.toast').hide();
    },1000);
})

function appendData(name){
    var storage = window.sessionStorage;
    var val = storage['allApp'];
    val = JSON.parse(val);
    val.push(name);
    val = JSON.stringify(val);
    storage['allApp'] = val;
}

$('div.pop-big').find('.comfirm').on('click', function(e) {
    e.stopPropagation();
    const val = $(this).parent().parent().children('.xieyi').find('input[type=checkbox]').is(':checked')
    if(!val)return
    switch(appId)
    {
        case '001':
            appendData(aiqiyi)
            break;
        case '002':
            appendData(wangyi)
            break;
        case '003':
            appendData(youku)
            break;
        case '004':
            appendData(toutiao)
            break;
        default:

    }
    initAllApp();
    $('.toast').show();
    setTimeout(()=>{
        $('.toast').hide();
        hidePop();
    },1000);
    /* 开通了的按钮变灰 */
    $('div.card').find('.mskt-btn').each(function () {
        if( $(this).data('id') == appId){
            $(this).addClass('active');
        }
    });
})
// 取消
$('div.pop-big').find('.cancle').on('click', function(e) {
    e.stopPropagation();
    hidePop();
})

// 弹窗加载内容
function addContent(){
    var html = '<div class="content ">'
        + '1、套餐包免流APP包括:'
        + '<span class="app-name">优酷视频</span> <br>'
        + '2、免流范围不包括优酷视频APP中的以下内容：客户端'
        + '<br>'
        +   '启动、登录及客户端内的图片、文字、视频内插播广告、弹幕、第三方广告、直播类视频、在线观看、下 载、缓存第三方视频所产生的流量、下载、缓存视频。'
        + '<br>'+ ' 3、本活动各种的流量当月清零、不能分享、不能转赠。'+ '<br>' +'4、更多业务规则详询10086。'
        + '<div class="zhezhao"></div>'
        + '</div>'
    $('div.pop-big .header').after(html);
}
// 弹窗消失
function hidePop(){
    $('div.pop-big .header').next().remove()
    $('.pop-com').hide();
}
// 点击阴影区域弹窗消失
/* $('.pop-b').click(function (e) {
    e.stopPropagation();
    $('.pop-com').hide();
}) */
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


let aiqiyi = {
    name: '爱奇艺',
    data: [{
        name: "爱奇艺",
        category: "软件",
        packagename: "com.qiyi.video",
        ver: "81160",
        contentId: "300002478830",
        iconUrl: "../assets/img/image013.png",
        url: "http://a.10086.cn/pams2/l/s.do?gId=300002478830&c=1528&p=72&j=l&ver=2&src=5210519579",
    }]
}
let wangyi = {
    name: '网易态度包',
    data: [{
        name: "网易云音乐",
        category: "软件",
        packagename: "com.netease.cloudmusic",
        ver: "125",
        contentId: "300009212575",
        iconUrl: "../assets/img/image017.png",
        url: "http://a.10086.cn/pams2/l/s.do?gId=300009212575&c=1528&p=72&j=l&ver=2&src=5210519579",
    },
        {
            name: "网易新闻",
            category: "软件",
            packagename: "com.netease.newsreader.activity",
            ver: "906",
            contentId: "300008402837",
            iconUrl: "../assets/img/image009.png",
            url: "http://a.10086.cn/pams2/l/s.do?gId=300008402837&c=1528&p=72&j=l&ver=2&src=5210519579",
        },
        {
            name: "终结者2",
            category: "软件",
            packagename: "com.netease.zjz",
            ver: "244268",
            contentId: "300011494396",
            iconUrl: "../assets/img/image019.png",
            url: "http://a.10086.cn/pams2/l/s.do?gId=300011494396&c=1528&p=72&j=l&ver=2&src=5210519579",
        },
        {
            name: "梦幻西游",
            category: "软件",
            packagename: "com.netease.my",
            ver: "11860",
            contentId: "300009508195",
            iconUrl: "../assets/img/image021.png",
            url: "http://a.10086.cn/pams2/l/s.do?gId=300009508195&c=1528&p=72&j=l&ver=2&src=5210519579",
        },
        {
            name: "大话西游",
            category: "软件",
            packagename: "com.netease.dhxy",
            ver: "",
            contentId: "300009486307",
            iconUrl: "../assets/img/image023.png",
            url: "http://a.10086.cn/pams2/l/s.do?gId=300009486307&c=1528&p=72&j=l&ver=2&src=5210519579",
        },
        {
            name: "倩女幽魂",
            category: "软件",
            packagename: "com.netease.l10",
            ver: "48",
            contentId: "300009670205",
            iconUrl: "../assets/img/image025.png",
            url: "http://a.10086.cn/pams2/l/s.do?gId=300009670205&c=1528&p=72&j=l&ver=2&src=5210519579",
        },
        {
            name: "阴阳师 ",
            category: "软件",
            packagename: "com.netease.onmyoji",
            ver: "",
            contentId: "300009968304",
            iconUrl: "../assets/img/image027.png",
            url: "http://a.10086.cn/pams2/l/s.do?gId=300009968304&c=1528&p=72&j=l&ver=2&src=5210519579",
        },
        {
            name: "决战平安京",
            category: "软件",
            packagename: "com.netease.moba",
            ver: "125",
            contentId: "300011869498",
            iconUrl: "../assets/img/image029.png",
            url: "http://a.10086.cn/pams2/l/s.do?gId=300011869498&c=1528&p=72&j=l&ver=2&src=5210519579",
        },
        {
            name: "楚留香",
            category: "软件",
            packagename: "com.netease.wyclx",
            ver: "3",
            contentId: "300011494396",
            iconUrl: "../assets/img/image031.png",
            url: "http://a.10086.cn/pams2/l/s.do?gId=300011853831&c=1528&p=72&j=l&ver=2&src=5210519579",
        }
    ]
}
let youku = {
    name: '优酷',
    data: [{
        name: "优酷",
        category: "看动漫",
        packagename: "com.youku.phone",
        ver: "169",
        contentId: "330000003368",
        iconUrl: "../assets/img/image011.png",
        url: "http://a.10086.cn/pams2/l/s.do?gId=330000003368&c=1528&p=72&j=l&ver=2&src=5210519579",
    }]
}
let toutiaobao = {
    name: '头条包',
    exhaust: false,
    data: [{
        name: "今日头条",
        category: "软件",
        packagename: "com.ss.android.article.news",
        ver: "692",
        contentId: "300011857013",
        iconUrl: "../assets/img/image001.png",
        url: "http://a.10086.cn/pams2/l/s.do?gId=300011857013&c=1528&p=72&j=l&ver=2&src=5210519579",
    },
        {
            name: "抖音短视频",
            category: "短视频",
            packagename: "com.ss.android.ugc.aweme",
            ver: "280",
            contentId: "300011010385",
            iconUrl: "../assets/img/image003.png",
            url: "http://a.10086.cn/pams2/l/s.do?gId=300011010385&c=1528&p=72&j=l&ver=2&src=5210519579 ",
        },
        {
            name: "火山小视频",
            category: "",
            packagename: "com.ss.android.ugc.live",
            ver: "480",
            contentId: "300011853723",
            iconUrl: "../assets/img/image005.png",
            url: "http://a.10086.cn/pams2/l/s.do?gId=300011853723&c=1528&p=72&j=l&ver=2&src=5210519579",
        },
        {
            name: "懂车帝",
            category: "",
            packagename: "com.ss.android.auto",
            ver: "402",
            contentId: "330000005508",
            iconUrl: "../assets/img/image007.png",
            url: "http://a.10086.cn/pams2/l/s.do?gId=330000005508&c=1528&p=72&j=l&ver=2&src=5210519579",
        },
        {
            name: "悟空问答",
            category: "",
            packagename: "com.ss.android.article.wenda",
            ver: "263",
            contentId: "330000005508",
            iconUrl: "../assets/img/image005.png",
            url: "http://a.10086.cn/pams2/l/s.do?gId=330000005508&c=1528&p=72&j=l&ver=2&src=5210519579",
        }
    ]
}
