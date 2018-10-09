import $ from '../js/jquery.min.js';

//一键下载
$(document).on("click", ".downloadAll", function() {
    var downList = [];
    var contentid = $(this).parent().parent().find("[data-contentid]");
    for(var i = 0; i < contentid.length; i++) {
        var text = $(contentid).eq(i).text();
        if(text == '下载' || text == '更新') {
            var id = $(contentid).eq(i).attr("data-contentid");
            downList.push(id);
        }
    }
    downList = downList.join("/");
    mm.batchDownload(downList);
})

//一键下载的状态
function checkDownAll() {
    var appList = $(".app-list");
    for(var i = 0; i < appList.length; i++) {
        var appList_app = $(appList).eq(i).find("[data-contentid]");
        var len = appList_app.length;
        var count = 0;
        for(var j = 0; j < appList_app.length; j++) {
            var text = $(appList_app).eq(j).text();
            if(text == '安装' || text == "打开") {
                count++;
            }
            if(count == len) {
                var target = $(appList).eq(i).parent().find(".downloadAll");
                $(target).css("color", "grey");
                $(target).addClass("disable");
            }
        }
    }
}
checkDownAll();
setTimeout(function() {
    checkDownAll();
}, 2000)

//切换tab
$(document).on("click", ".inner-tab-nav-item", function() {
    var index = $(this).index();
    $('.inner-tab-nav-item').removeClass("on");
    $(".inner-tab-panel").removeClass("on");
    $(".inner-tab-panel").css("height", "1px");
    $(this).addClass("on");
    $(".inner-tab-panel").eq(index).addClass("on");
    $(".inner-tab-panel").eq(index).css("height", "");
    var panelWidth = $(".inner-tab-panel").width();
    $(".inner-tab-action").css("transform", 'translateX(-' + index * panelWidth + 'px)');
})

//下载
/*$(document).on("click", ".js-label", function() {
 var contentid = $(this).data('data-contentid');
 console.log(contentid);
 mm.batchDownload(contentid);
 })*/

//添加选项卡
function addTab(option) {
    allApp.push(option);
    $(".inner-tab-nav").empty();
    $(".inner-tab-action").empty();
    addAll(allApp);
}

//更改选项卡可选项
function changeTab(tabName) {
    $(".inner-tab-nav").empty();
    var tabLen = tabName.length;
    $(".inner-tab-action").css("width", tabLen * 100 + '%');
    $(".inner-tab-panel").css("width", 100 / tabLen + "%");
    for(var i = 0; i < tabName.length; i++) {
        if(i == 0) {
            var tab = '<div class="inner-tab-nav-item on">' + tabName[i] + '</div>'
        } else {
            var tab = '<div class="inner-tab-nav-item">' + tabName[i] + '</div>'
        }
        $(".inner-tab-nav").append(tab);
    }
}

//添加选项卡的单个页面
function addTabPanel(option) {
    var cardWidth = 100 / tabName.length + "%";
    var addName = option.name;
    var data = option.data;
    var total = option.total?option.total:'30G';

    var newPanel = '<div class="inner-tab-panel" style="width:' + cardWidth + '">';
    var present = option.present ? option.present : '100%';
    var flag = parseFloat(present);

    if(flag) {
        newPanel += '<div class="taocan">'
    } else {
        newPanel += '<div class="taocan on">'
    }
    newPanel +=
        '<div class="application-commander">' +
        '  <div class="xiname">' +
        '    <span>' + addName + '</span>' +
        '    <div class="angle"></div>' +
        '  </div>' +
        '  <div class="exhaust">' +
        '    <img src="assets/img/exhaust.png" alt="" />' +
        '  </div>' +
        '  <div class="categray-title">畅享“' + addName + '”30G流量套餐</div>' +
        '  <div class="progress-wrap">' +
        '    <div class="progress-bar" data-ydui-progressbar="{type: \'line\', strokeWidth: 1, progress: '+parseFloat(present)/100+', trailColor: \'#30c104\'}">' +
        '    </div>' +
        '    <div class="progress flex-box-bet">' +
        '      <div class="remainder"><span>剩余' + present + '</span><em>/</em><span>'+parseInt(total)*parseFloat(present)/100+'G</span></div>' +
        '      <div class="tolal">套餐总流量:'+total+'</div>' +
        '    </div>' +
        '  </div>' +
        '</div>' +
        '<div class="app-list-box">' +
        '  <div class="app-list-title">' +
        '    <h2>定向流量APP列表</h2>' +
        '    <button class="downloadAll">一键下载</button>' +
        '  </div>' +
        '  <div class="app-list">'

    for(var i = 0; i < data.length; i++) {
        newPanel +=
            '    <div class="appItem">' +
            '      <div class="app-detail">' +
            '        <img class="app_icon" src="' + data[i].iconUrl + '" alt="">' +
            '        <div class="app_info">' +
            '          <p class="app_name">' + data[i].name + '</p>' +
            '          <p class="app_intrest">分类：' + data[i].category + '</p>' +
            '        </div>' +
            '      </div>' +
            '      <div class="right-button">' +
            '        <div class="btn_c1">' +
            '          <div class="js-item" data-id="' + data[i].packagename + '">' +
            '            <div class="download-btn js-button ignore-pressed app_download_btn fr">' +
            '              <div class="btn-text js-label button_name" data-contentid="' + data[i].contentId + '">下载</div>' +
            '              <div class="btn-wrapper">' +
            '                <div class="btn-percent js-progress"></div>' +
            '              </div>' +
            '            </div>' +
            '          </div>' +
            '        </div>' +
            '      </div>' +
            '    </div>'

    } //for循环

    newPanel +=
        '  </div>' +
        '</div>' +
        '</div>' +
        '</div>'

    $(".inner-tab-action").append(newPanel);

    $('[data-ydui-progressbar]').each(function() {
        var $this = $(this);
        var util = window.YDUI.util;
        var bar = $this.data('ydui-progressbar');
        bar = util.parseOptions(bar);
        $.fn.progressBar.call($this, bar);
    });
}

//选项卡，“全部”的更改。
function addAll(option) {

    tabName = ['全部'];
    $(".inner-tab-nav").empty();
    $(".inner-tab-action").empty();

    var len = option.length + 1;
    var cardWidth = 100 / len + "%";
    $(".inner-tab-action").css("width", len * 100 + "%");
    //添加全部页面
    var newPanel = '<div class="inner-tab-panel" style="width:' + cardWidth + '">';
    for(let i = (option.length-1); i >0; i--) {
        tabName.push(option[i].name);


        var present = option[i].present ? option[i].present : '100%';
        var flag = parseFloat(present);
        if(flag) {
            newPanel += '<div class="taocan">'
        } else {
            newPanel += '<div class="taocan on">'
        }


        var name = option[i].name;
        var total = option[i].total?option[i].total:'30G';

        newPanel +=
            '<div class="application-commander">' +
            '  <div class="xiname">' +
            '    <span>' + name + '</span>' +
            '    <div class="angle"></div>' +
            '  </div>' +
            '  <div class="exhaust">' +
            '    <img src="assets/img/exhaust.png" alt="" />' +
            '  </div>' +
            '  <div class="categray-title">畅享“' + name + '”30G流量套餐</div>' +
            '  <div class="progress-wrap">' +
            '    <div class="progress-bar" data-ydui-progressbar="{type: \'line\', strokeWidth: 1, progress: '+parseFloat(present)/100+', trailColor: \'#30c104\'}">' +
            '    </div>' +
            '    <div class="progress flex-box-bet">' +
            '      <div class="remainder"><span>剩余' + present + '</span><em>/</em><span>'+parseInt(total)*parseFloat(present)/100+'G</span></div>' +
            '      <div class="tolal">套餐总流量:'+total+'</div>' +
            '    </div>' +
            '  </div>' +
            '</div>' +
            '<div class="app-list-box">' +
            '  <div class="app-list-title">' +
            '    <h2>定向流量APP列表</h2>' +
            '    <button class="downloadAll">一键下载</button>' +
            '  </div>' +
            '  <div class="app-list">'
        var data = option[i].data;
        for(let j = 0; j < data.length; j++) {
            newPanel +=
                '    <div class="appItem">' +
                '      <div class="app-detail">' +
                '        <img class="app_icon" src="' + data[j].iconUrl + '" alt="">' +
                '        <div class="app_info">' +
                '          <p class="app_name">' + data[j].name + '</p>' +
                '          <p class="app_intrest">分类：' + data[j].category + '</p>' +
                '        </div>' +
                '      </div>' +
                '      <div class="right-button">' +
                '        <div class="btn_c1">' +
                '          <div class="js-item" data-id="' + data[j].packagename + '">' +
                '            <div class="download-btn js-button ignore-pressed app_download_btn fr">' +
                '              <div class="btn-text js-label button_name" data-contentid="' + data[j].contentId + '">下载</div>' +
                '              <div class="btn-wrapper">' +
                '                <div class="btn-percent js-progress"></div>' +
                '              </div>' +
                '            </div>' +
                '          </div>' +
                '        </div>' +
                '      </div>' +
                '    </div>'
        } //for循环

        newPanel +=
            '  </div>' +
            '</div>' +
            '</div>'
    }
    newPanel +=
        '</div>'
    //全部页面添加完
    $(".inner-tab-action").append(newPanel);

    //更改切换选项
    changeTab(tabName);

    //添加单个页面
    for(var i = 0; i < option.length; i++) {
        addTabPanel(option[i]);
    }
}

var tabName = ["全部"];

var storage = window.sessionStorage;
var appStr = [{
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
            contentId: "300011859083",
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
},
    {
        name: '优酷',
        present: '0%',
        data: [{
            name: "优酷",
            category: "看动漫",
            packagename: "com.youku.phone",
            ver: "169",
            contentId: "330000003368",
            iconUrl: "../assets/img/image011.png",
            url: "http://221.179.8.170:8080/s.do?requestid=sony_widget_download&payMode=1&goodsid=000x13519111899100000575958300000033601&MD5=28aa6cc589a423dbb593e9568e782d15&channel_id=x13519&appname=MM_FR18&ua=android-26-480x800-GT-I9108",
        }]
    }

]
var storage = window.sessionStorage;
appStr = JSON.stringify(appStr);
storage['allApp'] = appStr;

var allApp = storage['allApp'];
allApp = JSON.parse(allApp);

//初始化选项卡
const initAllApp = function initAllApp() {
    setTimeout(function() {
        var storage = window.sessionStorage;
        var allApp = storage['allApp'];
        allApp = JSON.parse(allApp);
        addAll(allApp);
        var apps = [];
        for(var i = 0; i < allApp.length; i++) {
            apps = apps.concat(allApp[i].data);
        }
        new AppManager({
            data: apps
        });
    }, 200)
}

export default initAllApp