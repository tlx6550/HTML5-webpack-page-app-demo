/**
 * Created by issuser on 2018/9/28 0028.
 */
import '../assets/styles/mmzhuochong.scss';
import $ from '../assets/js/jquery.min.js';
import  '../assets/js/flexible.js';
import '../assets/styles/swiper.scss';
import '../assets/js/swiper.min.js';
$(function(){
    var mySwiper = new Swiper('.swiper-container', {
        initialSlide: 2,
        pagination: '.swiper-pagination',
    });

    var mySwiper2 = new Swiper('.swiper-container2', {
        autoplay: 1,
        speed: 4500,
        loop: true,
        freeMode: true,
        slidesPerView: 3,
        slidesPerGroup: 1,
    });

    var mySwiper3 = new Swiper('.swiper-container3', {
        autoplay: 1,
        speed: 4900,
        loop: true,
        freeMode: true,
        slidesPerView: 3,
        slidesPerGroup: 1,
    });

    var mySwiper4 = new Swiper('.swiper-container4', {
        autoplay: 1,
        speed: 4300,
        loop: true,
        freeMode: true,
        slidesPerView: 3,
        slidesPerGroup: 1,
    });

    var mySwiper5 = new Swiper('.swiper-container5', {
        autoplay: 1,
        speed: 3700,
        loop: true,
        freeMode: true,
        slidesPerView: 3,
        slidesPerGroup: 1,
    });
});