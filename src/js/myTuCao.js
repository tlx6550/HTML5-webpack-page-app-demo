/**
 * Created by issuser on 2018/9/28 0028.
 */
import '../assets/styles/mmzhuochong.scss';
import $ from '../assets/js/jquery.min.js';
import  '../assets/js/flexible.js';
$(function(){
    //只看中奖逻辑
  $('.check-icon').click(function (e) {
      e.stopPropagation();
      $(this).toggleClass('active')
      if($(this).hasClass('active')){
          $('.rane-list').each(function () {
              var dom = $(this).children('.award').find('.award-item').text()
              if(dom==undefined||dom==''||dom==null){
                  $(this).hide()
              }
          })
      }else{
          $('.rane-list').show()
      }
  })
    // 筛选
   $('.btn-group').find('.button').click(function (e) {
       e.stopPropagation();
       $(this).siblings().removeClass('active')
       $(this).toggleClass('active')
   })
});