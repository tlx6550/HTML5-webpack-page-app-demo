import '../css/all.css';
import '../assets/styles/fkzx.scss';
import $ from '../js/jquery.min.js';
import lrz from  './lrz.bundle';
import {flexible} from '../assets/js/flexible.js';
import request from './request';
import { api } from './api';

request.get('/v2/movie/in_theaters?city=广州&start=0&count=10')
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });


// 配合http://www.jq22.com/jquery-info19864 其中生成图片预览

// 指定大小https://blog.csdn.net/xyphf/article/details/70841319
let picArr = new Array(); // 存储图片
const config = {
    allowType:[ 'jpeg', 'jpg', 'png'],
    maxSize:5,
    maxWidth:3000
}
document.querySelector('#file').addEventListener('change', function () {
    if (this.files.length === 0) return;
    lrz(this.files[0],{
        width: 800,
        quality  : 0.8
    })
        .then(function (rst) {
            // 检查大小
            const maxSize = config.maxSize * 1024 * 1024 ;
            if(rst.origin.size >= maxSize){
                alert('上传图片超出允许上传大小');
                return false;
            }
            // 文件类型检查
            if(!isAllowFile(origin.name,config.allowType)){
                // 处理成功会执行
                console.log(rst);
                createImg(rst);
                removeImg();
                upDateLoadNum(picArr.length);
            }else{
                alert('请上传 jpeg, jpg, png 格式的图片！');
            }
        })
        .catch(function (err) {
            // 处理失败会执行
        })
        .always(function () {
            // 不管是成功失败，都会执行
        });
});

function createImg(result) {
    let img = new Image();
    img.src = result.base64;
    let _str = "<span class='pic_look' style='background-image: url(" + img.src + ")'><em class='delete_pic'>-</em></span>"
    $('#chose_pic_btn').before(_str);
    let _i = picArr.length
    picArr[_i] = result.base64;
    console.log(picArr);
    removeImg();
}
function removeImg() {
    const imgList = document.getElementsByClassName('delete_pic');
    // 元素生成后动态绑定事件
    for (let j = 0; j < imgList.length; j++) {
        imgList[j].onclick = function() {
            const that = this;
            const removeIndex = $(that).parent().index();
            removeDom(removeIndex);
        };
    }
}
function removeDom(index) {
    $('.up_pic').children('.pic_look').eq(index).remove();
    picArr.splice(index,1);
    console.log(picArr)
    upDateLoadNum(picArr.length);
}
function upDateLoadNum(num) {
    $('.up_pic').find('.amount-per').text(num);
    if(num >= 4){
        $('#chose_pic_btn').hide();
    }else{
        $('#chose_pic_btn').show();
    }
}
// 获取上传文件的后缀名
function getFileExt(fileName){
    if (!fileName) {
        return '';
    }

    var _index = fileName.lastIndexOf('.');
    if (_index < 1) {
        return '';
    }

    return fileName.substr(_index+1);
}

function isAllowFile(fileName, allowType){

    var fileExt = getFileExt(fileName).toLowerCase();
    if (!allowType) {
        allowType = ['jpg', 'jpeg', 'png', 'gif', 'bmp'];
    }

    if ($.inArray(fileExt, allowType) != -1) {
        return true;
    }
    return false;

}
function submit() {
    $('.submit').click(function (e) {
        e.stopPropagation();
        const description =  $('#description').val();
        if(description.length <10 || description.length >300){
            $('.pop-desc').show()
            setTimeout(()=>{
                $('.pop-a').hide();
            },4000);
        }
        const checkValue = $("input[type='radio']:checked").val();
        console.log(checkValue);
        console.log(description);
    });
}
submit();