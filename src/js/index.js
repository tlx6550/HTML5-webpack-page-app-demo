/**
 * Created by issuser on 2018/9/28 0028.
 */
import '../assets/styles/index.scss';
import LotteryCard from '../assets/js/card.js';

import $ from '../assets/js/jquery.min.js';
import Rotary from '../assets/js/ui.rotary.js';
import  '../assets/js/flexible.js';

// app download

/*import '../js/mmdl.js';
import '../js/mmapp.js';*/
/**
 * ydui main
 */
!function (window) {
    "use strict";

    var doc = window.document,
        ydui = {};


    $(window).on('load', function () {
        typeof FastClick == 'function' && FastClick.attach(doc.body);
    });

    var util = ydui.util = {

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

        localStorage: function () {
            return storage(window.localStorage);
        }(),

        sessionStorage: function () {
            return storage(window.sessionStorage);
        }(),

        serialize: function (value) {
            if (typeof value === 'string') return value;
            return JSON.stringify(value);
        },
        deserialize: function (value) {
            if (typeof value !== 'string') return undefined;
            try {
                return JSON.parse(value);
            } catch (e) {
                return value || undefined;
            }
        },

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
var iconImg = {
    checkComfrim:'data:image/png;base64,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'
}
//弹窗组件封装
!function (window,ydui) {
    "use strict";
    var dialog = ydui.dialog = ydui.dialog || {},
        $body = $(window.document.body);

    dialog.confirm = function (title,mes,prizeMesage,opts) {
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
        if (args == 3) {
            opts = mes;
            mes = title;
            title = '提示';
        }
        let btnArr = opts;
        if(typeof opts === 'function'){
            btnArr = [
                {
                    txt:'取消',
                    color:true
                },
                {
                    txt:'关闭',
                    color:'false',
                    callback:function () {
                        opts && opts();
                    }
                }];
        }
        let html = '';
        let prizeHtml = '';
        if (prizeMesage && prizeMesage.length > 0) {
            html+= '<div class="m-confirm  succees" id=" '+ ID +  '">' +
                '<div class="pop">'+
                '<div class="confirm-hd">'+title+'</div>'+
                '<div class="confirm-bd">'+
                '<div class="text sub-title">'+ mes +'</div>'+
                '<div class="text my-prize">'+ prizeMesage +'</div>'+
                ' </div>'+
                '</div>'+
                '</div>';
        }else{
            html+= '<div class="m-confirm  succees" id=" '+ ID +  '">' +
                '<div class="pop">'+
                '<div class="confirm-hd">'+title+'</div>'+
                '<div class="confirm-bd">'+
                '<div class="text">'+ mes +'</div>'+
                ' </div>'+
                '</div>'+
                '</div>';
        }

        const $dom = $(html)
        // 遍历按钮数组
        var $btnBox = $('<div class="confirm-ft"></div>');
        if(btnArr.length==1){
            $btnBox = $('<div class="confirm-ft only-one"></div>');
        }
        $.each(btnArr,function (i,val) {
            var $btn;
            if(val.txt == '取消'){
                $btn = $(' <a href="javascript:;"  class="close-btn cancel-btn">'+val.txt+'</a>')
            }else{
                $btn = $(' <a href="javascript:;"  class="close-btn check-my-submit">'+val.txt+'</a>')
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

    dialog.toast = function () {
        var timer = null;

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
    !function init(){
        var fixedP = $('.app-list-wrap').next()
        var flag = fixedP.hasClass("fixed-pop")
        if(flag){
            $('.app-list-wrap').css('margin-bottom',1 + 'rem')
        }


    }()
    !function initCanvas(){
        //获取屏幕的宽度
        var  clientWidth = document.documentElement.clientWidth;
        //根据设计图中的canvas画布的占比进行设置
        var canvasWidth = Math.floor(clientWidth*690/720)+6;
        var canvasHeight = Math.floor((240/690) * canvasWidth)
        $('.canvas_lottery').css({'width':canvasWidth + 'px','height':canvasHeight+'px'})
    }()
//弹窗实例
    var dialog = window.YDUI.dialog;
/*    dialog.confirm('MM铁杆粉丝福利', '很抱歉！您非本次活动对象,<br/>感谢你的关注~','去首页看看更多精彩内容吧~', [
        {
            txt: '去逛逛',
            callback: function () {
                window.location.href='www.hao123.com';
            }
        }
    ]);*/
}(window)

!function (window) {
    //刮刮乐
    $('.show-guagua-le').click(function(){
        $('.result-text').find('.title').text("").text("恭喜了")
        $('.result-text').find('.info-detail').text("").text("刮中了爱奇艺会员周卡！")
        $('.guagua-pop').css('visibility','visible')
    })
    $('.guagua-colse-btn').click(function(){
        $('.guagua-pop').css('visibility','hidden')
    })

    function initGuaGuaLe() {
        var canvas = $(".canvas_lottery")[0]
        var ctx = canvas.getContext("2d")
        var img = new Image()
        var urlImg = $('.guauga-bg-img').attr("src")
        img.src = urlImg

        img.onload = function () {
            var baseSize = window.FONTSIZE
            var bgImgW = Math.floor(7.04 * baseSize)
            var bgImgH = Math.floor(2.54 * baseSize)
            var lottery = new LotteryCard(document.getElementById('js_lottery'), { // eslint-disable-line
                size: 20, //滑动区域大小
                percent: 90, //激活百分比到谋个值 就全显示
                resize: true, //canvas的大小是否是可变的
                cover:img,
                bgImgH:bgImgH,
                bgImgW:bgImgW
            })
            lottery.on('start', function () {
                lottery.setResult('')
            })
            lottery.on('end', function () {

            })
            window.lottery = lottery
        }
    }
    initGuaGuaLe()
}(window)
!function (window) {
    // 转盘js
    $(function(){
        /*
         * 初始化大转盘，设置各奖项对应的转盘角度
         * 奖项对应关系：1-KFC美食体验资格 2-流量大赠送70M 3-再接再厉～ 4-友宝免费畅饮体验 5-我勒个去～ 6-流量大赠送150M
         * */
        var $count = $('.rotary-count span'), count = 0;
        function setCount(count){
            var text = repeat(count, 2);
            $count.text(text);
        }
        function repeat(s, l) {
            return (new Array(l - (new String(s)).length + 1)).join('0') + s;
        }
        setCount(count);
        var rCounts = 6;  //奖品个数
        var rOffset = -30;  //初始化角度
        var angle = 360/rCounts
        var awards = {};
        for(var i=0;i<rCounts;i++){
            awards[i] = {
                min_angle:-(i*angle + 5 + rOffset),
                max_angle:-((i+1)*angle - 5 + rOffset),
            }
        }
        var rotary = new Rotary('.zw-rotary',{
            fixAngle: 0,
            awards:awards
        });
        /*
         * 抽奖请求逻辑再此方法写,setAward传入awards对应的奖项
         * */

        //rotary.disable(false);
        rotary.on('gamestart', function(e){
            /*if(count <= 0){
             alert("ff");
             return;
             }*/


            setCount(count);
            /*
             * 此处为ajax发送请求抽奖逻辑
             * */
            /*$.ajax({
             url: 'cj.json',
             cache: false,
             dataType: 'json',
             method: 'GET'
             }).done(function(res){
             /!*
             * 按照奖项开始抽奖
             * *!/
             rotary.setAward(1);
             });*/
            /*
             * 按照奖项开始抽奖
             * */
            rotary.setAward(0);
        });
        /*
         * 重新抽奖
         * */
        $('.zw-rotary-again').on('click', function(e){
            e.preventDefault();
            rotary.gamestart();
        });
        /*
         * 抽奖结束触发
         * */
        rotary.on('gameover', function(e){
        });


        $('.js-btn').click(function(){
            if(count<=0){
                //winSlideDown(1);
                //$("#cjcs").html(0);
            }
        });

    });


}(window)

