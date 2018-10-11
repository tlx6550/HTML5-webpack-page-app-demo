/**
 * Created by issuser on 2018/9/28 0028.
 */
import '../assets/styles/zqsy.scss';
import $ from '../js/jquery.min.js';
import '../assets/js/swiper.min.js';
import  '../assets/js/flexible.js';
import Cookie from '../assets/js/cookie.js';
// app download
import '../js/mmdl.js';
import '../js/mmapp.js';
import initAllApp from '../js/tab_control.js';
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

const appName = {
    '001': 'aiqiyi',
    '002': 'wangyi',
    '003': 'toutiao',
    '004': 'youku'
}
let appId = ''



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
            var tabs = ['我的流量应用', '重磅推荐'];
            return '<div class="' + className + '">' + tabs[index] + '</div>';
        },
        onSlideChangeEnd:function(swiper){
            swiperChangeIndexActive(swiper.activeIndex)
        },
    });
}
setTimeout(()=>{
    initSwiper();
},500)
//当点击开通包某个标签后切换状态不对的bug
function swiperChangeIndexActive(index){
    $('.swiper-pagination').children('.swiper-pagination-bullet')
        .removeClass('swiper-pagination-bullet-active').eq(index)
        .addClass('swiper-pagination-bullet-active')
}
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
    if($(this).hasClass('active')){
        $('.had-kai').show()
        setTimeout(()=>{
            $('.had-kai').hide()
        },1000)
        return
    }
    appId = $(this).data('id')
    //模拟数据需要
    //临时选中的id，以防用户取消按钮不选了
    YDUI.util.sessionStorage.set('tempId',appId)
    Cookie.set('tempId',appId)
    // 支付环节需要知道选了那个套餐
    YDUI.util.sessionStorage.set('selectAppId',appId)
    Cookie.set('selectAppId',appId)
    addContent();
    $('.pop-big').show();
})
$('div.xiangqingye-wrap .main').find('.comfirm').on('click', function(e) {
    e.stopPropagation();
    if($(this).hasClass('active'))return
    $('#toastS').show();
    $(this).addClass('active')
    $(this).text('已开通')
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
    if($(this).hasClass('default'))return
    //window.location.href = '/s.do?requestid=weixinpay';
    let way = ''
    $('div.pop-big').find('.pay-way').each(function () {
        if($(this).hasClass('active')){
            way = $(this).text();
            return
        }
    })
    if(way=='微信支付'){
        window.location.href = 'weixinpay.html';
    }else{
        window.location.href = 'zhifubaopay.html';
    }

})

// 取消
$('div.pop-big').find('.cancle').on('click', function(e) {
    e.stopPropagation();
    hidePop();
})
// 添加套餐
function addOptionServiceApp() {
   // const appId =  YDUI.util.sessionStorage.get('appId')
    try{
        let appId =  Cookie.get('appId')
        appId = JSON.parse(appId);
        for(let i = 0;i<appId.length;i++){
            if(appId[i]){
                switch(appId[i])
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
                        appendData(toutiaobao)
                        break;
                    default:

                }

            }
        }
        initAllApp();
    }catch(e){

    }


   try{
        if(Cookie.get('suceess')=='true'){
            $('#toastS').show();
            setTimeout(()=>{
                $('.toast').hide();
                Cookie.set('suceess',false)
                hidePop();
            },1000);
        }
    }catch (e){

    }

    /* 开通了的按钮变灰 */
    try{
        let selecttArr =  Cookie.get('appId')
        selecttArr = JSON.parse(selecttArr);
        $('div.card').find('.mskt-btn').each(function () {
            try{
                for(let i=0;i<selecttArr.length;i++){
                    if( $(this).data('id') == selecttArr[i]){
                        console.log('ok')
                        $(this).addClass('active');
                        //已开通的显示已开通
                        $(this).text('已开通')
                    }
                }
            }catch (e){

            }
        });
    }catch (e){

    }

}
// 弹窗加载内容
function addContent(){
    let title = '',subtitle = ''
    if(appId=='001'){
        subtitle = '优酷视频'
        title = '畅享“爱奇艺”30G流量套餐'
        $('div.pop-big').find('.aiqiy-vip').show()
    }else if(appId=='002'){
        subtitle = '优酷视频'
        title = '畅享“网易态度包”30G流量套餐'
        $('div.pop-big').find('.aiqiy-vip').hide()
    }


    var html = '<div class="header"><p>'+ title+'</p></div>'
        + '<div class="content ">'
        + '1、套餐包免流APP包括:'
        + '<span class="app-name">'+ subtitle+'</span> <br>'
        + '2、免流范围不包括优酷视频APP中的以下内容：客户端'
        + '<br>'
        +   '启动、登录及客户端内的图片、文字、视频内插播广告、弹幕、第三方广告、直播类视频、在线观看、下 载、缓存第三方视频所产生的流量、下载、缓存视频。'
        + '<br>'+ ' 3、本活动各种的流量当月清零、不能分享、不能转赠。'+ '<br>' +'4、更多业务规则详询10086。'
        + '<div class="zhezhao"></div>'
        + '</div>'
    $('div.pop').prepend(html);
}
// 弹窗消失
function hidePop(){
    $('div.pop-big .pop').children('.header').remove()
    $('div.pop-big .pop').children('.content').remove()

    $('div.pop-big .option-service').find('.select').removeClass('active')
    $('div.pop-big .option-service').find('.pay-way').removeClass('active')
    $('div.option-service').find('.pay-way-wrap').show()
    $('div.option-service').find('.address-wrap').hide()
    //YDUI.util.sessionStorage.remove('aiqiyi')
    Cookie.del('aiqiyi')
    //  YDUI.util.sessionStorage.remove('selectAppId')
    //YDUI.util.sessionStorage.remove('wangyi')
    Cookie.del('wangyi')
    $('.pop-com').hide();
}
// 可选服务功能
!function () {
    //马上支付状态改变
    function checkPayBtnState() {
        const tag = $('div.pop-big').find('.pay-way').hasClass('active')
        const btn = $('div.pop-big .btn-group').find('.comfirm');
        if(tag){
            btn.removeClass('default')
        }else{
            btn.addClass('default')
        }
    }
    // 价格变动
    function checkPayPriceState(initPice) {
        var price =  new Array()
        price.push(initPice)
        $('div.option-service').find('.select').each(function () {
            let optionPrice = 0
            const id = $(this).data('id')
            if($(this).hasClass('active')){
                if( id=='aiqiyi-month-vip'){
                    optionPrice = 10
                }else if( id =='tv-box'){
                    $('div.option-service').find('.address-wrap').show()
                    optionPrice = 100
                }
            }else{
                $('div.option-service').find('.address-wrap').hide()
            }
            price.push(optionPrice)
        })
        function getSum(total, num) {
            return total + num;
        }
        const P =  price.reduce(getSum)
        $('div.pop-big').find('.price').text(P+'元')
        //存储价格

        if(appId=='001'){
            YDUI.util.sessionStorage.set('aiqiyi',P)
            Cookie.set('aiqiyi',P,60)
        }else if(appId=='002'){
            YDUI.util.sessionStorage.set('wangyi',P)
            Cookie.set('wangyi',P,60)
        }

    }
    // 套餐选择
    $('div.pop-big').find('.select-btn').on('click', function(e) {
        $(this).toggleClass('active');
        //套餐传一个默认价格
        checkPayPriceState(18)

        //当点击编辑地址后 此时没有输入地址 不选盒子套餐
        //即只需要爱奇艺会员时候付款方式需要展现的bug
        let flag2 = $("[data-id=tv-box]").hasClass('active')
        if(!flag2){
            $('.edit-state').hide()
            $('.save-state').show()
            $('div.pop-big').find('.pay-way-wrap').show()
        }
    })
    //支付方式
    $('div.pop-big').find('.pay-way').on('click', function(e) {
        $(this).siblings().removeClass('active')
        $(this).toggleClass('active');
        //套餐传一个默认价格
        checkPayPriceState(18)
        checkPayBtnState()
        //
    })
    //编辑收货地址
    $('div.pop-big').find('.edit').on('click', function(e) {
        const text = $(this).text();
        //text == '编辑' ? $(this).text('保存'):$(this).text('编辑')
        if(text=='保存'){
            //一定需要保存了才能支付
            $('div.pop-big').find('.pay-way').removeClass('active')
            checkPayBtnState()
            //取值保存
            const name =  $('div.edit-state').find('.name').val()
            $('div.save-state').find('.name').val(name)
            const phone =  $('div.edit-state').find('.phone').val()
            $('div.save-state').find('.phone').val(phone)
            const diqu =  $('div.edit-state').find('.diqu').val()
            const adress =  $('div.edit-state').find('.detail-adress').val()
            $('div.save-state').find('.address').val(diqu+adress)
            if(name&&phone&&diqu&&adress){
                $('div.pop-big').find('.save-state').show()
                $('div.pop-big').find('.edit-state').hide()
                $('div.pop-big').find('.pay-way-wrap').show()
            } else{
                alert('联系方式不能为空')
            }
        }else{
            $('div.pop-big').find('.edit-state').show()
            $('div.pop-big').find('.save-state').hide()
            $('div.pop-big').find('.pay-way-wrap').hide()
        }
    })
}();




let aiqiyi = {
    name: '爱奇艺',
    data: [{
        name: "爱奇艺",
        category: "软件",
        packagename: "com.qiyi.video",
        ver: "81160",
        contentId: "300002478830",
        iconUrl: "../assets/img/image013.png",
        url: "http://221.179.8.170:8080/s.do?requestid=sony_widget_download&payMode=1&goodsid=000x13519196833100001755288300002478830&MD5=fa948d381568d8e662ef2d7eb267770b&channel_id=x13519&appname=MM_FR18&ua=android-26-480x800-GT-I9108",
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
        url: "http://221.179.8.170:8080/s.do?requestid=sony_widget_download&payMode=1&goodsid=000x13519374031100010486288300009212575&MD5=1e61f52071a126b1183975a34b41528b&channel_id=x13519&appname=MM_FR18&ua=android-26-480x800-GT-I9108",
    },
        {
            name: "网易新闻",
            category: "软件",
            packagename: "com.netease.newsreader.activity",
            ver: "906",
            contentId: "300008402837",
            iconUrl: "../assets/img/image009.png",
            url: "http://221.179.8.170:8080/s.do?requestid=sony_widget_download&payMode=1&goodsid=000x13519374031100007351775300008402837&MD5=5493ef32d21441a57fdea575c149bf81&channel_id=x13519&appname=MM_FR18&ua=android-26-480x800-GT-I9108",
        },
        {
            name: "终结者2",
            category: "软件",
            packagename: "com.netease.zjz",
            ver: "244268",
            contentId: "300011494396",
            iconUrl: "../assets/img/image019.png",
            url: "http://221.179.8.170:8080/s.do?requestid=sony_widget_download&payMode=1&goodsid=000x13519313096100011542071300011494396&MD5=337582ecf82465f57cb9828b32718597&channel_id=x13519&appname=MM_FR18&ua=android-26-480x800-GT-I9108",
        },
        {
            name: "梦幻西游",
            category: "软件",
            packagename: "com.netease.my",
            ver: "11860",
            contentId: "300009508195",
            iconUrl: "../assets/img/image021.png",
            url: "http://221.179.8.170:8080/s.do?requestid=sony_widget_download&payMode=1&goodsid=000x13519313096100010886739300009508195&MD5=cb2f95c87eed12307a7b1cf3267af6f8&channel_id=x13519&appname=MM_FR18&ua=android-26-480x800-GT-I9108",
        },
        {
            name: "大话西游",
            category: "软件",
            packagename: "com.netease.dhxy",
            ver: "",
            contentId: "300009486307",
            iconUrl: "../assets/img/image023.png",
            url: "http://221.179.8.170:8080/s.do?requestid=sony_widget_download&payMode=1&goodsid=000x13519313096100010762630300009486307&MD5=7c8a06deeb6cb52890e616f427aedaff&channel_id=x13519&appname=MM_FR18&ua=android-26-480x800-GT-I9108",
        },
        {
            name: "倩女幽魂",
            category: "软件",
            packagename: "com.netease.l10",
            ver: "48",
            contentId: "300009670205",
            iconUrl: "http://u5.fr18.mmarket.com:80/rs/res2/21/2018/08/29/a103/660/51660103/logo120x1205532773133-png8.png",
            url: "http://221.179.8.170:8080/s.do?requestid=sony_widget_download&payMode=1&goodsid=000x13519313096100011030624300009670205&MD5=95eaeef29c982667a3c849a63708c41f&channel_id=x13519&appname=MM_FR18&ua=android-26-480x800-GT-I9108",
        },
        {
            name: "阴阳师 ",
            category: "软件",
            packagename: "com.netease.onmyoji",
            ver: "48",
            contentId: "300009968304",
            iconUrl: "http://u5.fr18.mmarket.com:80/rs/res2/21/2018/09/19/a604/709/51709604/logo120x1207345546481-png8.png",
            url: "http://221.179.8.170:8080/s.do?requestid=sony_widget_download&payMode=1&goodsid=000x13519313096100011051448300009968304&MD5=999d6db0c6397f944a44f6bbd335962c&channel_id=x13519&appname=MM_FR18&ua=android-26-480x800-GT-I9108",
        },
        {
            name: "决战平安京",
            category: "软件",
            packagename: "com.netease.moba",
            ver: "125",
            contentId: "300011853240",
            iconUrl: "../assets/img/image029.png",
            url: "http://221.179.8.170:8080/s.do?requestid=sony_widget_download&payMode=1&goodsid=000x13519432187100011549817300011853240&MD5=ceaef16bd207fe008b9a8f23d120e29c&channel_id=x13519&appname=MM_FR18&ua=android-26-480x800-GT-I9108",
        },
        {
            name: "楚留香",
            category: "软件",
            packagename: "com.netease.wyclx",
            ver: "3",
            contentId: "300011853831",
            iconUrl: "http://u5.fr18.mmarket.com:80/rs/res2/21/2018/02/02/a816/223/51223816/logo120x1207536462000-png8.png",
            url: "http://221.179.8.170:8080/s.do?requestid=sony_widget_download&payMode=1&goodsid=000x13519313096100011553259300011853831&MD5=cb4c6c12d03cddd7edad83a6edd77ede&channel_id=x13519&appname=MM_FR18&ua=android-26-480x800-GT-I9108",
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
        iconUrl: "http://u5.fr18.mmarket.com:80/rs/res2/21/2018/09/27/a219/731/51731219/logo120x1208039870786-png8.png",
        url: "http://221.179.8.170:8080/s.do?requestid=sony_widget_download&payMode=1&goodsid=000x13519111899100000575958300000033601&MD5=28aa6cc589a423dbb593e9568e782d15&channel_id=x13519&appname=MM_FR18&ua=android-26-480x800-GT-I9108",
    }]
}
let toutiaobao = {
    name: '头条包',
    present: '63%',
    data: [{
        name: "今日头条",
        category: "软件",
        packagename: "com.ss.android.article.news",
        ver: "692",
        contentId: "300011857013",
        iconUrl: "../assets/img/image001.png",
        url: "http://221.179.8.170:8080/s.do?requestid=sony_widget_download&payMode=1&goodsid=000x13519380247100011554055300011857013&MD5=c2bcf21af21d9dc50d0a35e141e3723e&channel_id=x13519&appname=MM_FR18&ua=android-26-480x800-GT-I9108",
    },
        {
            name: "抖音短视频",
            category: "短视频",
            packagename: "com.ss.android.ugc.aweme",
            ver: "280",
            contentId: "300011010385",
            iconUrl: "../assets/img/image003.png",
            url: "http://221.179.8.170:8080/s.do?requestid=sony_widget_download&payMode=1&goodsid=000x13519380247100011539010300011010385&MD5=440ff9b9b7c8c556de225889fa88aa29&channel_id=x13519&appname=MM_FR18&ua=android-26-480x800-GT-I9108",
        },
        {
            name: "火山小视频",
            category: "",
            packagename: "com.ss.android.ugc.live",
            ver: "480",
            contentId: "300011853723",
            iconUrl: "../assets/img/image005.png",
            url: "http://221.179.8.170:8080/s.do?requestid=sony_widget_download&payMode=1&goodsid=000x13519430508100011553213300011853723&MD5=9449902d2c875bc0a250e2f3f75d1f4e&channel_id=x13519&appname=MM_FR18&ua=android-26-480x800-GT-I9108",
        },
        {
            name: "懂车帝",
            category: "",
            packagename: "com.ss.android.auto",
            ver: "402",
            contentId: "330000005508",
            iconUrl: "../assets/img/image007.png",
            url: "http://221.179.8.170:8080/s.do?requestid=sony_widget_download&payMode=1&goodsid=000x13519380247100011555008300011859083&MD5=27f2af26a168cee8c12979ad5def3f2d&channel_id=x13519&appname=MM_FR18&ua=android-26-480x800-GT-I9108",
        },
        {
            name: "悟空问答",
            category: "",
            packagename: "com.ss.android.article.wenda",
            ver: "263",
            contentId: "330000005508",
            iconUrl: "../assets/img/image005.png",
            url: "http://221.179.8.170:8080/s.do?requestid=sony_widget_download&payMode=1&goodsid=000x13519330000100033003300330000005508&MD5=&channel_id=x13519&appname=MM_FR18&ua=android-26-480x800-GT-I9108",
        }
    ]
}
// 初始化
addOptionServiceApp()