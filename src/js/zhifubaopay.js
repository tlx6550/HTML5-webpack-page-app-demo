/**
 * Created by issuser on 2018/9/28 0028.
 */
import '../assets/styles/zhifubao.scss';
import $ from '../assets/js/jquery.min.js';
import Cookie from '../assets/js/cookie.js';
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


const appName = {
    '001': 'aiqiyi',
    '002': 'wangyi',
    '003': 'toutiao',
    '004': 'youku'
}

$(function(){
    // money
    // const appId =  YDUI.util.sessionStorage.get('selectAppId')
    const appId =  Cookie.get('selectAppId')
    let price = ''
    console.log(appId)
    if(appId=='001'){
        price = Cookie.get('aiqiyi');
        // price =  YDUI.util.sessionStorage.get('aiqiyi');
    }else if(appId=='002'){
        price = Cookie.get('wangyi');
        // price =  YDUI.util.sessionStorage.get('wangyi');
    }

    $('.pay-money').text(price)
    // 出现浮动层
    $(".ljzf_but").click(function(){
        $(".ftc_wzsf").show();
    });
    // 关闭浮动
    $(".close").click(function(){
        $(".ftc_wzsf").hide();
    });
    // 数字显示隐藏
    $(".xiaq_tb").click(function(){
        $(".numb_box").slideUp(500);
    });
    $(".mm_box").click(function(){
        $(".numb_box").slideDown(500);
    });
    //----
    var i = 0;
    $(".nub_ggg li a").click(function(){
        i++
        if(i<6){
            $(".mm_box li").eq(i-1).addClass("mmdd");
        }else{
            $(".mm_box li").eq(i-1).addClass("mmdd");
            $('.pop-com').show()
            setTimeout(function(){
                $('.pop-com').hide()
                /*  let tempId = YDUI.util.sessionStorage.get('tempId')
                let temp = YDUI.util.sessionStorage.get('appId') */
                let tempId = Cookie.get('tempId')
                let temp = Cookie.get('appId')
                if(temp==undefined || temp==null || temp==''){
                    temp = [];
                }else{
                    temp= JSON.parse(temp);
                }
                temp.push(tempId);
                temp =  JSON.stringify(temp)
                /*  YDUI.util.sessionStorage.set('appId',temp)// app累加
                YDUI.util.sessionStorage.set('suceess',true) //开通成功标识  */
                Cookie.set('appId', temp)
                Cookie.set('suceess',true)
                 // location.href="/s.do?requestid=weixincg";
                location.href="zhifubaocg.html";
            },300);
        }
    });

    $(".nub_ggg li .del").click(function(){

        if(i>0){
            i--
            $(".mm_box li").eq(i).removeClass("mmdd");
            i==0;
        }

    });

     //  返回商家
    $('.goback,.pay-goback').click(function (e) {
        e.stopPropagation();
        window.location.href = 'index.html';
      // window.location.href = '/s.do?requestid=orientationFreeFlowActivity';
    });

});