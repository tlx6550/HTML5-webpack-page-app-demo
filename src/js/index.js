/**
 * Created by issuser on 2018/9/28 0028.
 */
import '../assets/styles/mmzhuochong.scss';
import $ from '../assets/js/jquery.min.js';
import Clipboard from '../assets/js/clipboard.min';
import '../assets/js/swiper.min.js';
import VConsole from '../assets/js/vConsole.js';
import  '../assets/js/flexible.js';

// app download
var vConsole = new VConsole();
import '../js/mmdl.js';
import '../js/mmapp.js';
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
        },
        /**
         * cookie
         */
        setCookie: function(key,value,time){
            //默认保存时间
            var time = time||60;
            //获取当前时间
            var cur = new Date();

            var undefined;

            //设置指定时间
            cur.setTime(cur.getTime()+time*1000);

            //创建cookie  并且设置生存周期为GMT时间
            document.cookie = key+'='+encodeURIComponent(value)+';expires='+(time===undefined?'':cur.toGMTString());

        },
        getCookie: function(key){

            //获取cookie
            var data = document.cookie;
            //获取key第一次出现的位置    pwd=
            var startIndex = data.indexOf(key+'=');
            //  name=123;pwd=abc
            //如果开始索引值大于0表示有cookie
            if(startIndex>-1) {

                //key的起始位置等于出现的位置加key的长度+1
                startIndex = startIndex+key.length+1;

                //结束位置等于从key开始的位置之后第一次;号所出现的位置

                var endIndex = data.indexOf(';',startIndex);

                //如果未找到结尾位置则结尾位置等于cookie长度，之后的内容全部获取
                endIndex = endIndex<0 ? data.length:endIndex;
                return decodeURIComponent(data.substring(startIndex,endIndex));


            }else {

                return '';
            }

        },
        delCookie: function(key){

            //获取cookie
            var data = this.getCookie(key);

            //如果获取到cookie则重新设置cookie的生存周期为过去时间
            if(data!==false){

                this.set(key,data,-1);

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
//弹窗图标
const iconImg = {
    checkComfrim:'data:image/png;base64,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'
}
//弹窗组件封装
!function (window,ydui) {
    "use strict";
    var dialog = ydui.dialog = ydui.dialog || {},
        $body = $(window.document.body);
    /**
     * 确认提示框
     * @param title 标题String 【可选】
     * @param mes   内容String 【必填】
     * @param opts  按钮们Array 或 “确定按钮”回调函数Function 【必填】
     * @constructor
     */
    dialog.confirm = function (title,mes,opts) {
        const ID = 'ZHUOWANG_CONFRIM';
        $('#' + ID).remove()
        const args = arguments.length;
        if(args < 2){
            console.error('From UI\'s confirm: Please set two or three parameters!!!');
            return;
        }
        if (typeof arguments[1] != 'function' && args == 2 && !arguments[1] instanceof Array) {
            console.error('From UI\'s confirm: The second parameter must be a function or array!!!');
            return;
        }
        if (args == 2) {
            opts = mes;
            mes = title;
            title = '提示';
        }
        let btnArr = opts;
        if(typeof opts === 'function'){
            btnArr = [
                {
                    txt:'查看我的反馈',
                    color:true,
                    callback:function () {
                        opts && opts();
                    }
                },
                {
                    txt:'关闭',
                    color:'false'
                }];
        }
        let html = '';
        html+= '<div class="m-confirm  succees" id=" '+ ID +  '">' +
            '<div class="pop">'+
            '<div class="confirm-hd">'+title+'</div>'+
            '<div class="confirm-bd">'+
            '<img src='+iconImg.checkComfrim+ ' class="icon">'+
            '<div class="text">'+ mes +'</div>'+
            ' </div>'+
            '</div>'+
            '</div>';
        const $dom = $(html)
        // 遍历按钮数组
        var $btnBox = $('<div class="confirm-ft"></div>');
        $.each(btnArr,function (i,val) {
            var $btn;
            if(val.txt == '关闭'){
                $btn = $(' <a href="javascript:;"  class="close-btn">'+val.txt+'</a>')
            }else{
                $btn = $(' <a href="javascript:;"  class="check-my-submit">'+val.txt+'</a>')
            }

            // 给对应按钮添加点击事件
            // 给对应按钮添加点击事件
            (function (p) {
                $btn.on('click', function (e) {
                    e.stopPropagation();

                    // 是否保留弹窗(点击关闭 弹窗消失)
                    if (!btnArr[p].stay) {
                        // 释放页面滚动
                        ydui.util.pageScroll.unlock();
                        $dom.remove();
                    }
                    btnArr[p].callback && btnArr[p].callback();
                });
            })(i);
            $btnBox.append($btn);
        });
        $dom.find('.pop').append($btnBox);
        // 禁止滚动屏幕【移动端】
        ydui.util.pageScroll.lock();

        $body.append($dom);
    }
    /**
     * 弹出提示层
     */
    dialog.toast = function () {
        var timer = null;
        /**
         * @param mes       提示文字String 【必填】
         * @param type      类型String success or error 【必填】
         * @param timeout   多久后消失Number 毫秒 【默认：2000ms】【可选】
         * @param callback  回调函数Function 【可选】
         */
        return function (mes, type, timeout, callback) {

            clearTimeout(timer);

            var ID = 'YDUI_TOAST';

            $('#' + ID).remove();

            var args = arguments.length;
            if (args < 2) {
                console.error('From YDUI\'s toast: Please set two or more parameters!!!');
                return;
            }

            var iconHtml = '';
            if (type == 'success' || type == 'error') {
                iconHtml = '<div class="' + (type == 'error' ? 'toast-error-ico' : 'toast-success-ico') + '"></div>';
            }

            var $dom = $('' +
                '<div class="mask-white-dialog" id="' + ID + '">' +
                '    <div class="m-toast ' + (iconHtml == '' ? 'none-icon' : '') + '">' + iconHtml +
                '        <p class="toast-content">' + (mes || '') + '</p>' +
                '    </div>' +
                '</div>');

            ydui.util.pageScroll.lock();

            $body.append($dom);

            if (typeof timeout === 'function' && arguments.length >= 3) {
                callback = timeout;
                timeout = 2000;
            }

            timer = setTimeout(function () {
                clearTimeout(timer);
                ydui.util.pageScroll.unlock();
                $dom.remove();
                typeof callback === 'function' && callback();
            }, (~~timeout || 2000) + 100);//100为动画时间
        };
    }();
}(window,YDUI)
!function (window) {
// 跳转活动规则
$('.rules-btn').click(function () {
    location.href = './ruleDeail.html'
})

// 跳转活动规则
    $('.wodetucao').click(function () {
        location.href = './myTuCao.html'
    })
// 跳转活动规则
    $('.tucaozhixin').click(function () {
        location.href = './monthRane.html'
 })
// 跳转活动规则
    $('.liketucao').click(function () {
        location.href = './fankuisearch.html'
    })
// 跳转活动规则
    $('.buhaoyong').click(function () {
        location.href = './fankuiyijian.html'
    })
}(window)

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
!function (window) {
    //检查是否支持复制
    function checkSerportCopy(){
        $('.copy-btn').click(function (e) {
            var that = $(this)
            setTimeout(function () {
                var val = that.data("clipboard-text");
                YDUI.util.setCookie('styleDemo',val)
            },150)
        })
    }
    checkSerportCopy();
    function showPop(txt){
        var dfd = $.Deferred();
        YDUI.dialog.toast(txt, 'none',1000, function(){
            dfd.resolve();
        });
        return dfd;
    }
// 搜索反馈样式拷贝
  var searchClipboard =   new Clipboard('#search-copy-btn');
    searchClipboard.on('success', function(e) {
        YDUI.util.sessionStorage.set('copyFlag',true)
        showPop('复制成功').then(function () {
            e.clearSelection();
            location.href= './fankuisearch.html'
        })
    });
   searchClipboard.on('error', function(e) {
       showPop('复制失败')
    });
    // 搜索应用样式拷贝
    var appClip = new Clipboard('#app-copy-btn');
    appClip.on('success', function(e) {
        YDUI.util.sessionStorage.set('copyFlag',true)
        showPop('复制成功').then(function () {
            e.clearSelection();
            location.href= './fankuiyijian.html'
        })

    });
    appClip.on('error', function(e) {
        showPop('复制失败')
    });

}(window)



