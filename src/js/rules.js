import '../assets/styles/index.scss';
import $ from '../assets/js/jquery.min.js';
import  '../assets/js/flexible.js';
!function init(){
    var fixedP = $('.rule-detail-wrap').next()
    var flag = fixedP.hasClass("fixed-pop")
    if(flag){
        $('.rule-detail-wrap').css('margin-bottom',1 + 'rem')
    }
}()





