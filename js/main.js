/**
 * Created by Carl_Hugo on 2016/9/24.
 */

/*自定义js脚本*/

'use strict'
/* 当文档加载完成就会执行*/
$(function(){


    function resize(){
        //alert('js');
        /*获取屏幕宽度
        * 根据屏幕宽度的变化 来展示显示的图片的大小
        * */
        var windowWidth=$(window).width();
        //判断屏幕属于大还是小
        var isSmallScreen=windowWidth<768;
        //根据大小为界面上的每一张轮播图设置背景
        //$('#main_ad>.carousel-inner>.item') //获取到的是多个元素
        $('#main_ad>.carousel-inner>.item').each(function(index,item){

            //alert('js1');
            var $item=$(item);//因为拿到的是dom对象 需要转换成jquery对象
            //$item.css('backgroundImg',$item.data(isSmallScreen?'image-xs':'image-lg'));
            //$element.data()是一个函数 专门用于取元素上的自定义属性（data-abc）
            //函数的参数是我们要取的属性名称（abc）
            var imgSrc=isSmallScreen
                ?$item.data('image-xs')
                :$item.data('image-lg');
            //alert(imgSrc);

            $item.css('backgroundImage','url("'+imgSrc+'")');

            //因为需要小图时尺寸等比列变化 所以小图时 我们使用img方式
            if(isSmallScreen){

                $item.html('<img src="'+imgSrc+'" alt=""/>')
            }else{
                $item.html('');
            }

        })
    }
    /* 注册时间之后想要直接被触发可以用trigger */
    $(window).on('resize',resize).trigger('resize');


});
