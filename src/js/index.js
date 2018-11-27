import '../assets/styles/mmzhuochong.scss';
import  '../assets/js/flexible.js';
import  echarts from '../assets/js/echarts.js';
/*import china from  '../assets/js/china.js';
import  '../assets/js/chinaJson.js';*/
import $ from '../assets/js/jquery.min.js';
//数字滚动
;(function($, window, document) {
    "use strict";
    var defaults = {
        deVal: 0,       //传入值
        className:'dataNums',   //样式名称
        digit:''    //默认显示几位数字
    };
    function rollNum(obj, options){
        this.obj = obj;
        this.options = $.extend(defaults, options);
        this.init = function(){
            this.initHtml(obj,defaults);
        }
    }
    rollNum.prototype = {
        initHtml: function(obj,options){
            var strHtml = '<ul class="' + options.className + ' inrow">';
            var valLen = options.digit ||  (options.deVal + '').length;
            if(obj.find('.'+options.className).length <= 0){
                for(var i = 0; i<  valLen; i++){
                    strHtml += '<li class="dataOne "><div class="dataBoc"><div class="tt" t="38"><span class="num0">0</span> <span class="num1">1</span> <span class="num2">2</span> <span class="num3">3</span> <span class="num4">4</span><span class="num5">5</span> <span class="num6">6</span> <span class="num7">7</span> <span class="num8">8</span> <span class="num9">9</span><span class="num0">0</span> <span class="num1">1</span> <span class="num2">2</span> <span class="num3">3</span> <span class="num4">4</span><span class="num5">5</span> <span class="num6">6</span> <span class="num7">7</span> <span class="num8">8</span> <span class="num9">9</span></div></div></li>';
                }
                strHtml += '</ul>';
                obj.html(strHtml);
            }
            this.scroNum(obj, options);
        },
        scroNum: function(obj, options){
            var number = options.deVal;
            var $num_item = $(obj).find('.' + options.className).find('.tt');
            var h = $(obj).find('.dataBoc').height();

            $num_item.css('transition','all 2s ease-in-out');
            var numberStr = number.toString();
            if(numberStr.length <= $num_item.length - 1){
                var tempStr = '';
                for(var a = 0; a < $num_item.length - numberStr.length; a++){
                    tempStr += '0';
                }
                numberStr = tempStr + numberStr;
            }

            var numberArr = numberStr.split('');
            $num_item.each(function(i, item) {
                setTimeout(function(){
                    $num_item.eq(i).css('top',-parseInt(numberArr[i])*h - h*10 + 'px');
                },i*100)
            });
        }
    }
    $.fn.rollNum = function(options){
        var $that = this;
        var rollNumObj = new rollNum($that, options);
        rollNumObj.init();
    };
})($, window, document);


$('.down-app-total').rollNum({
    deVal:566888
});
//时间
!function () {
    function myformatter(date){
        var y = date.getFullYear();
        var m = date.getMonth()+1;
        var d = date.getDate();
        return y+'-'+(m<10?('0'+m):m)+'-'+(d<10?('0'+d):d);
    }
    function setDate() {
        var date = myformatter(new Date())
        $('.now-date').text(date)
    }
    setDate()
    setInterval(function () {
        setDate()
    },1000 *60 * 60)
    setInterval( function () {
        var time = new Date();//获取系统当前时间
        var hour = time.getHours();
        var minutes = time.getMinutes();
        var seconds = time.getSeconds();
        if(hour<10){
            hour = "0"+hour;
        }
        if(minutes<10){
            minutes = "0"+minutes;
        }
        if(seconds<10){
            seconds = "0"+seconds;
        }
        $('.now-time')[0].innerHTML = hour+":"+minutes+":"+seconds;
    },1000);
}()
!function () {
    window.onload = function () {
        console.log(echarts)
        var size = window.FONTSIZE
        function initFonSize() {
            $('.fensheng-down').css({"width":4*size +"px","height":2.5*size +"px"})
            $('.chart-item2').css({"width":4*size +"px","height":2.5*size +"px"})
            $('.china-map').css({"width":8.8*size +"px","height":6.7*size +"px"})
        }
        initFonSize()

        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init($('.fensheng-down')[0]);
        var myChartUser = echarts.init($('.down-user')[0]);
        var myChartLiu = echarts.init($('.down-liuliang')[0]);

        var myChart2 = echarts.init($('.fensheng-down2')[0]);
        var myChartUser2 = echarts.init($('.down-user2')[0]);
        var myChartLiu2 = echarts.init($('.down-liuliang2')[0]);

        var commonOption = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            grid: {
                left: '5%',
                right: '0%',
                top:'8%',
                bottom: 0,
                containLabel: true
            },
            xAxis: {
                show:false,//隐藏y轴坐标线
                type: 'value',
                boundaryGap: [0, 0.01],
            },
        }
        var option = {
            color:'#357DFF',
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            grid: {
                left: '5%',
                right: '0%',
                top:'8%',
                bottom: 0,
                containLabel: true
            },
            xAxis: {
                show:false,//隐藏y轴坐标线
                type: 'value',
                boundaryGap: [0, 0.01],
            },
            yAxis: {
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: '#D9EBFF'//y轴颜色
                    }
                },
                type: 'category',
                // y 轴线
                axisTick: {
                    show: false
                },
                data: ['6 巴西','5 印尼','4 美国','3 印度','2 中国','1 世界']
            },
            series: [
                {
                    itemStyle: {
                        normal: {
                            label: {
                                show: true, //开启显示
                                position: 'right', //在上方显示
                                textStyle: { //数值样式
                                    color: '#ACC2FF',
                                    fontSize: 16
                                }
                            }
                        }
                    },
                    type: 'bar',
                    data: [18203, 23489, 29034, 104970, 131744, 30230],

                },
            ]
        };
        var optionUser = {
            color:'#FFA95C',
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            grid: {
                left: '5%',
                right: '0%',
                top:'8%',
                bottom: 0,
                containLabel: true
            },
            xAxis: {
                show:false,//隐藏y轴坐标线
                type: 'value',
                boundaryGap: [0, 0.01],
            },
            yAxis: {
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: '#D9EBFF'//y轴颜色
                    }
                },
                type: 'category',
                // y 轴线
                axisTick: {
                    show: false
                },
                data: ['6 巴西','5 印尼','4 美国','3 印度','2 中国','1 世界']
            },
            series: [
                {
                    itemStyle: {
                        normal: {
                            label: {
                                show: true, //开启显示
                                position: 'right', //在上方显示
                                textStyle: { //数值样式
                                    color: '#FFE4CC',
                                    fontSize: 16
                                }
                            }
                        }
                    },
                    type: 'bar',
                    data: [18203, 23489, 29034, 104970, 131744, 30230],

                },
            ]
        };
        var optionLiu = {
            color:'#81D7FF',
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            grid: {
                left: '5%',
                right: '0%',
                top:'8%',
                bottom: 0,
                containLabel: true
            },
            xAxis: {
                show:false,//隐藏y轴坐标线
                type: 'value',
                boundaryGap: [0, 0.01],
            },
            yAxis: {
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: '#D9EBFF'//y轴颜色
                    }
                },
                type: 'category',
                // y 轴线
                axisTick: {
                    show: false
                },
                data: ['6 巴西','5 印尼','4 美国','3 印度','2 中国','1 世界']
            },
            series: [
                {
                    itemStyle: {
                        normal: {
                            label: {
                                show: true, //开启显示
                                position: 'right', //在上方显示
                                textStyle: { //数值样式
                                    color: '#81D7FF',
                                    fontSize: 16
                                }
                            }
                        }
                    },
                    type: 'bar',
                    data: [18203, 23489, 29034, 104970, 131744, 30230],

                },
            ]
        };

        // 使用刚指定的配置项和数据显示图表。
        setTimeout(function () {

            var valOption1 = {
                color:'#357DFF',
                yAxis: {
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: '#D9EBFF'//y轴颜色
                        }
                    },
                    type: 'category',
                    // y 轴线
                    axisTick: {
                        show: false
                    },
                    data: ['6 巴西','5 印尼','4 美国','3 印度','2 中国','1 世界']
                },
                series: [
                    {
                        type: 'bar',
                        data: [18203, 23489, 29034, 104970, 131744, 30230],

                    },
                ]
            }
            var valOption2 = {
                color:'#FFA95C',
                yAxis: {
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: '#D9EBFF'//y轴颜色
                        }
                    },
                    type: 'category',
                    // y 轴线
                    axisTick: {
                        show: false
                    },
                    data: ['6 巴西','5 印尼','4 美国','3 印度','2 中国','1 世界']
                },
                series: [
                    {
                        type: 'bar',
                        data: [18203, 23489, 29034, 104970, 131744, 30230],

                    },
                ]
            }
            var valOption3 = {
                color:'#81D7FF',
                yAxis: {
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: '#D9EBFF'//y轴颜色
                        }
                    },
                    type: 'category',
                    // y 轴线
                    axisTick: {
                        show: false
                    },
                    data: ['6 巴西','5 印尼','4 美国','3 印度','2 中国','1 世界']
                },
                series: [
                    {
                        type: 'bar',
                        data: [18203, 23489, 29034, 104970, 131744, 30230],

                    },
                ]
            }

            var initOptions1 = Object.assign({},commonOption,valOption1)
            var initOptions2 = Object.assign({},commonOption,valOption2)
            var initOptions3 = Object.assign({},commonOption,valOption3)

            var initOptions2 = Object.assign({},commonOption,valOption2)

            myChart.setOption(initOptions1);
            myChartUser.setOption(initOptions2);
            myChartLiu.setOption(initOptions3);

            myChart2.setOption(initOptions2);
            myChartUser2.setOption(initOptions2);
            myChartLiu2.setOption(initOptions2);
       },300)
    }
    var temp = 0
    function randShow() {
        var tag = temp % 2 == 0 ? true :false
        if(!tag){
            $('.chart-item').show()
            $('.chart-item2').hide()
        }else{
            $('.chart-item2').show()
            $('.chart-item').hide()
        }
    }
    setInterval(function () {
       /* temp++;
        randShow()*/
    },2000)
}()
//右侧
!function () {
    var temp = 0
    function randShow() {
        var tag = temp % 2 == 0 ? true :false
        if(!tag){
            $('.r1').show()
            $('.r2').hide()

        }else{
            $('.r2').show()
            $('.r1').hide()
        }
    }
    setInterval(function () {
       /* temp++;
         randShow()*/
    },2000)
}()