/**
 * Created by issuser on 2018/9/28 0028.
 */
import '../assets/styles/mmzhuochong.scss';
/*import $ from '../assets/js/jquery.min.js';*/
import  '../assets/js/flexible.js';
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

// 反馈逻辑
 !function(){
    window.onload = function () {
        // 初始化吐槽内容
      var val = YDUI.util.getCookie('styleDemo')
        tagObj[appNameKey] = 'MM头条'
      $('.submit-content').val(val)
    }
     //toast 弹窗实例
     var dialog = window.YDUI.dialog;
     function checkMyFanKui() {
        location.href='myTuCao.html'
     }
     /* 应用吐槽确认框 */
     $('#fanKui_Confirm').on('click', function () {
        if(!checkIsRightInTextarea()) {
            dialog.toast('请选择一个应用','none')
        }else if(!checkIsPutPlusSimple()){
            dialog.toast('请输入“+”号让你的吐槽变成有效的建议哦~','none')
        }else if(!checkTagLenght()){
            dialog.toast('吐槽应用不能少于3个字哦~','none')
        }else{
            dialog.confirm('提交数据', '提交成功，感谢您的支持', function () {
                checkMyFanKui()
            });
        }
     });
     /* 搜索吐槽确认框 */
     $('#searchFanKui_Confirm').on('click', function () {
         if(!checkIsPutPlusSimple()){
             dialog.toast('请输入“+”号让你的吐槽变成有效的建议哦~','none')
         }else if(!checkTagLenght()){
             dialog.toast('吐槽语不能少于三个字哦~','none')
         }else{
             dialog.confirm('提交数据', '提交成功，感谢您的支持', function () {
                 checkMyFanKui()
             });
         }
     });
     $('.check-my-submit a').click(function (e) {
         e.stopPropagation()
         checkMyFanKui()
     })




     var appName,tagObj = {},appNameKey = 'appNameKey'
     //应用选择
     $('.app-list').on('click','.app-name',function (e) {
         e.stopPropagation()
         $(this).siblings().removeClass('active')
         $(this).toggleClass('active')

         appName =  $(this).find('.title').text().trim()
         /*appName = '#吐槽#'+appName*/
         tagObj[appNameKey] = appName
         $('.submit-content').val( getValueToTextA())
     })
     $('.tag-list').on('click','.title',function (e) {
         e.stopPropagation()
         $(this).toggleClass('active');
         //检查哪个被选上了
         var key = $(this).index();
         if($(this).hasClass('active')){
             tagObj[key] ='+'+ $(this).text().trim()
         }else {
             delete  tagObj[key]
         }
         //console.log(tagObj)
         $('.submit-content').val( getValueToTextA())

     })
     // 吐槽标签转为指定格式到文本框
     function getValueToTextA() {
         var appName = tagObj[appNameKey]
         var result = []
         if(appName!=undefined || appName!='' || appName!=null){
             var first = [],temp = []
             for(var key in tagObj) {
                 if(key ==appNameKey){
                     first= tagObj[key] ;
                 }else{
                     temp.push(tagObj[key])
                 }
             }
             result =  first.concat(temp)
         }
         var subStr = /,/ig;
         return result.toString().replace(subStr,"")
     }
     // 检查是否选择一个应用了
     function checkIsRightInTextarea() {
         var val = $('.submit-content').val()
         var arr = ['MM应用商场','MM头条','网站导航','必备应用']
         var flag =false
         arr.forEach(function (item) {
            var reg = item
            var subStr = new RegExp(reg);
             if(subStr.test(val)){
                 flag = true
             }
         })
         return flag
     }
     // 检查用户手动输入的时候有没有输入加号
     function checkIsPutPlusSimple() {
         var val = $('.submit-content').val().trim()
         var subStr = /\+/ig;
         return subStr.test(val)
     }
     //检查吐槽点有没有少于3个字的
     function checkTagLenght() {
         var val = $('.submit-content').val().trim()
         var index =  val.indexOf('+')+1
         return val.slice(index).length >=3
     }
 }();
