import $ from '../js/jquery.min.js';

//一键下载
$(".downloadAll").click(function() {
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
	mm.batchDownload(contentid);
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
$(document).on("click", ".js-label", function() {
	var contentid = $(this).data('contentid');
	mm.batchDownload(contentid);
})

//添加选项卡
function addTab(option) {
	allApp.push(option);
	$(".inner-tab-nav").empty();
	$(".inner-tab-action").empty();
	addAll(allApp);
}

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

function addTabPanel(option) {
	var present = 100 / tabName.length + "%";
	var addName = option.name;
	var data = option.data;
	var newPanel = '<div class="inner-tab-panel" style="width:' + present + '">' +
		'<div class="taocan">' +
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
		'    <div class="progress-bar" data-ydui-progressbar="{type: \'line\', strokeWidth: 1, progress: .4, trailColor: \'#30c104\'}">' +
		'    </div>' +
		'    <div class="progress flex-box-bet">' +
		'      <div class="remainder"><span>剩余63%</span><em>/</em><span>18.8G</span></div>' +
		'      <div class="tolal">套餐总流量:<span>30</span>G</div>' +
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

function addAll(option) {
	tabName = ['全部'];
    $(".inner-tab-nav").empty();
    $(".inner-tab-action").empty();
	var len = option.length + 1;
	var present = 100 / len + "%";
	$(".inner-tab-action").css("width", len * 100 + "%");
	//添加全部页面
	var newPanel = '<div class="inner-tab-panel" style="width:' + present + '">';
	for(let i = 0; i < option.length; i++) {
		tabName.push(option[i].name);
		var flag = option[i].exhaust;
		if(!flag) {
			newPanel += '<div class="taocan">'
		} else {
			newPanel += '<div class="taocan on">'
		}
		newPanel +=
			'<div class="application-commander">' +
			'  <div class="xiname">' +
			'    <span>' + option[i].name + '</span>' +
			'    <div class="angle"></div>' +
			'  </div>' +
			'  <div class="exhaust">' +
			'    <img src="assets/img/exhaust.png" alt="" />' +
			'  </div>' +
			'  <div class="categray-title">畅享“' + option[i].name + '”30G流量套餐</div>' +
			'  <div class="progress-wrap">' +
			'    <div class="progress-bar" data-ydui-progressbar="{type: \'line\', strokeWidth: 1, progress: .4, trailColor: \'#30c104\'}">' +
			'    </div>' +
			'    <div class="progress flex-box-bet">' +
			'      <div class="remainder"><span>剩余63%</span><em>/</em><span>18.8G</span></div>' +
			'      <div class="tolal">套餐总流量:<span>30</span>G</div>' +
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

	/*$('[data-ydui-progressbar]').each(function() {
		var $this = $(this);
		var util = window.YDUI.util;
		var bar = $this.data('ydui-progressbar');
		bar = util.parseOptions(bar);
		$.fn.progressBar.call($this, bar);
	});*/


	//添加单个页面
	for(var i = 0; i < option.length; i++) {
		addTabPanel(option[i]);
	}
}

var tabName = ["全部"];

var storage = window.sessionStorage;
var appStr = [{
		name: '阿里系',
		exhaust: true,
		data: [{
			name: "咪咕直播",
			category: "网络视频",
			packagename: "com.cmcc.migutvtwo",
			ver: "138",
			contentId: "300010244344",
			iconUrl: "http://u5.fr18.mmarket.com:80/rs/res2/21/2017/09/19/a993/863/50863993/logo120x1205807214979-png8.png",
			url: "http://221.179.8.170:8080/s.do?requestid=sony_widget_download&payMode=1&goodsid=000x13518430508100011191014300010244344&MD5=e6486c3e727e1946533c707085d44cf8&channel_id=x13518&appname=MM_FR18&ua=android-26-480x800-GT-I9108",
		}]
	} 
	
]
var storage = window.sessionStorage;
appStr = JSON.stringify(appStr);
storage['allApp'] = appStr;

var allApp = storage['allApp'];
allApp = JSON.parse(allApp);

/*var allApp = [{
  name: '阿里系',
  data: [{
    name: "咪咕直播",
    category: "网络视频",
    packagename: "com.cmcc.migutvtwo",
    ver: "138",
    contentId: "300010244344",
    iconUrl: "http://u5.fr18.mmarket.com:80/rs/res2/21/2017/09/19/a993/863/50863993/logo120x1205807214979-png8.png",
    url: "http://221.179.8.170:8080/s.do?requestid=sony_widget_download&payMode=1&goodsid=000x13518430508100011191014300010244344&MD5=e6486c3e727e1946533c707085d44cf8&channel_id=x13518&appname=MM_FR18&ua=android-26-480x800-GT-I9108",
  },{
      name: "咪咕直播",
      category: "网络视频",
      packagename: "com.cmcc.migutvtwo",
      ver: "138",
      contentId: "300010244344",
      iconUrl: "http://u5.fr18.mmarket.com:80/rs/res2/21/2017/09/19/a993/863/50863993/logo120x1205807214979-png8.png",
      url: "http://221.179.8.170:8080/s.do?requestid=sony_widget_download&payMode=1&goodsid=000x13518430508100011191014300010244344&MD5=e6486c3e727e1946533c707085d44cf8&channel_id=x13518&appname=MM_FR18&ua=android-26-480x800-GT-I9108",
  }]
}, {
  name: '腾讯系',
  data: [{
    name: "咪咕直播",
    category: "网络视频",
    slogan: "国内优秀的手机直播软件",
    packagename: "com.cmcc.migutvtwo",
    ver: "138",
    interested: "2万+下载",
    official: "",
    appSize: "97225",
    contentId: "300010244344",
    goodsid: "000x13518430508100011191014300010244344",
    iconUrl: "http://u5.fr18.mmarket.com:80/rs/res2/21/2017/09/19/a993/863/50863993/logo120x1205807214979-png8.png",
    url: "http://221.179.8.170:8080/s.do?requestid=sony_widget_download&payMode=1&goodsid=000x13518430508100011191014300010244344&MD5=e6486c3e727e1946533c707085d44cf8&channel_id=x13518&appname=MM_FR18&ua=android-26-480x800-GT-I9108",
  }]
}]*/

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

var option = {
	name: '爱奇艺',
	data: [{
		name: "咪咕直播",
		category: "网络视频",
		slogan: "国内优秀的手机直播软件",
		packagename: "com.cmcc.migutvtwo",
		ver: "138",
		interested: "2万+下载",
		official: "",
		appSize: "97225",
		contentId: "300010244344",
		goodsid: "000x13518430508100011191014300010244344",
		iconUrl: "http://u5.fr18.mmarket.com:80/rs/res2/21/2017/09/19/a993/863/50863993/logo120x1205807214979-png8.png",
		url: "http://221.179.8.170:8080/s.do?requestid=sony_widget_download&payMode=1&goodsid=000x13518430508100011191014300010244344&MD5=e6486c3e727e1946533c707085d44cf8&channel_id=x13518&appname=MM_FR18&ua=android-26-480x800-GT-I9108",
	}, {
		name: "ii哦哦上的",
		category: "网络视频",
		slogan: "国内优秀的手机直播软件",
		packagename: "com.cmcc.migutvtwo",
		ver: "138",
		interested: "2万+下载",
		official: "",
		appSize: "97225",
		contentId: "300010244344",
		goodsid: "000x13518430508100011191014300010244344",
		iconUrl: "http://u5.fr18.mmarket.com:80/rs/res2/21/2017/09/19/a993/863/50863993/logo120x1205807214979-png8.png",
		url: "http://221.179.8.170:8080/s.do?requestid=sony_widget_download&payMode=1&goodsid=000x13518430508100011191014300010244344&MD5=e6486c3e727e1946533c707085d44cf8&channel_id=x13518&appname=MM_FR18&ua=android-26-480x800-GT-I9108",
	}]
}
export default initAllApp