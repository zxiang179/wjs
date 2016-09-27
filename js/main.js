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
    /*初始化tooltips插件*/
    $('[data-toggle="tooltip"]').tooltip();

    /*
    控制标签页的标签宽度
    */
    var $ulContainer=$('.nav-tabs');
    /*获取所有子元素宽度的和*/
    var width=30;  //因为原本ul上面有padding-left
    /*遍历子元素*/
    console.log($ulContainer.children());
    $ulContainer.children().each(function(index,element){
        console.log(element.clientWidth);
        console.log($(element).width());
        width+=element.clientWidth;
    });
    /* 此时width等于所有LI宽度的总和*/
    //判断当前ul的宽度是否超出了屏幕，如果超出就显示很想滚动条
    if(width>$(window).width()){
        $ulContainer.css('width',width).parent().css('overflow-x','scroll');
    }

    /*a 点击注册事件*/
    /*全局变量本地化*/
    var $newsTitle=$('.news-title')
    $('#news .nav-pills a').on('click',function(){
        //获取当前点击的元素 将dom对象转换为jquery对象
        var $this=$(this);
        //获取对应的title
        var title=$this.data('title');
        //将title设置到相应的位置
        $newsTitle.text(title);
    });

    // 获取界面上的轮播图容器
    //手指触摸开始时记录一下手指所在的x坐标

    var $carousels=$('.carousel');
    var startX,endX;
    var offset=30;
    // 注册滑动时间
    $carousels.on('touchstart',function(e){
        startX=e.originalEvent.touches[0].clientX;
        console.log(startX);
    });
    $carousels.on('touchmove',function(e){
        //结束触摸一瞬间 记录最后的手指所在坐标
        //比大小
        endX=e.originalEvent.touches[0].clientX;
    });
    $carousels.on('touchend',function(e){
        console.log(endX);
        //控制精度
        //获取每次运动的距离 当距离大于一定值 认为有方向的变化
        var distance=Math.abs(startX-endX);
        if(distance>offset){
            //有方向变化
            console.log(startX>endX?'←':'→');
            $(this).carousel(startX>endX?'next':'prev');
        }

    })


    //* 1 获取手指在轮播图上的滑动方向（左右）
    //*    touch
    //* 2 根据获得到的方向选择上一张或者下一张
    //* - $('a').click()
    //* - 原生的carousel方法实现




});
