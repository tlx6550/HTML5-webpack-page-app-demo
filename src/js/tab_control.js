import $ from '../js/jquery.min.js';

$(".inner-tab-nav-item").click(function(){
	var index = $(this).index();
	$('.inner-tab-nav-item').removeClass("on");
	$(".inner-tab-panel").removeClass("on");
	$(this).addClass("on");
	$(".inner-tab-panel").eq(index).addClass("on");
})
