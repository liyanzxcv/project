/*
/!*在页面加载完成运行
 * touch
 * *!/
window.onload = function(){
    scrollPic();
};
/!*window.onload只能写一次*!/
/!*可以写自执行函数(function(){



})()*!/



/!*滚动图*!/
var scrollPic = function(){
    /!*获取需要的dom对象*!/

    /!*banner*!/
    var banner = document.getElementsByClassName('jrl_banner')[0];
    /!*获取宽度*!/
    var width = banner.offsetWidth;
    /!*图片盒子*!/
    var imgBox = banner.getElementsByTagName('ul')[0];
    /!*点盒子*!/
    var pointBox = banner.getElementsByTagName('ul')[1];
    /!*所有的点*!/
    var pointList = pointBox.getElementsByTagName('li');

    /!*1.滚起来*!/
    /!*添加过渡*!/
    var addTransition = function(){
        imgBox.style.transition = "all .2s ease";
        imgBox.style.webkitTransition = "all .2s ease";/!*兼容 老版本webkit内核浏览器*!/
    };
    /!*清除过渡*!/
    var removeTransition = function(){
        imgBox.style.transition = "none";
        imgBox.style.webkitTransition = "none";/!*兼容 老版本webkit内核浏览器*!/
    };
    /!*让图片改变位置*!/
    var changeTranslateX = function(x){
        imgBox.style.transform = "translateX("+x+"px)";
        imgBox.style.webkitTransform = "translateX("+x+"px)";
    };

    /!*1.滚动起来*!/
    var index = 1;/!*全局索引*!/
    var timer;
    timer = setInterval(function(){
        index ++;
        /!*加过渡*!/
        addTransition();
        /!*改变位子*!/
        changeTranslateX(-index*width);
    },3000);

    /!*是自定义事件绑定方法*!/
    banners.transitionEnd(imgBox,function(e){
        if(index >= 3){
            index = 0;
            removeTransition();
            changeTranslateX(-index*width);
        }else if(index <= 0){
            index = 3;
            removeTransition();
            changeTranslateX(-index*width);
        }
        /!*设置点*!/
        setPoint();
    });

    /!*让点动起来*!/
    var setPoint = function(){
        for(var i = 0;i <pointList.length;i++){
            pointList[i].className = " ";
        }
        /!*index 0-3*!/
        var pointIndex = index;/!*先让点的索引一致和图片*!/
        /!*1-8*!/
        if(index >= 3){
            pointIndex = 1;
        }else if(index <= 0){
            pointIndex = 3;
        }
        /!*设置当前索引的点加上now*!/
        pointList[pointIndex-1].className = "now";
    };

    /!*3.滑动*!/
    var startX =0;/!*开始你的X的位置*!/
    var endX = 0;/!*停止滑动的时候的X的位置*!/
    var distanceX = 0;/!*是改变的距离*!/
    imgBox.addEventListener('touchstart',function(e){
        // console.log(e.touches[0])
        clearInterval(timer);
        startX = e.touches[0].clientX;
        console.log(startX);
    },false);
    imgBox.addEventListener('touchmove',function(e){
        e.preventDefault();
        endX = e.touches[0].clientX;
        distanceX = startX - endX;  //获取一个touch的距离
        removeTransition();
        changeTranslateX(-index*width-distanceX);
    },false);
    imgBox.addEventListener('touchend',function(e){
        /!*满足1/3的时候滑动一格*!/
        /!*满足1/3 并且滑动*!/
        if(Math.abs(distanceX) > 1/3*width && endX != 0){
            if(distanceX > 0){
                index ++;
            }else{
                index --;
            }
        }
        /!*4.当不满足1/3的时候吸附回去*!/
        addTransition();
        changeTranslateX(-index*width);

        /!*防止多次绑定setInterval*!/
        clearInterval(timer);
        timer = setInterval(function(){
            index ++;
            /!*加过渡*!/
            addTransition();
            /!*改变位子*!/
            changeTranslateX(-index*width);
        },3000);

        startX = 0;
        endX = 0;
        distanceX = 0
    },false);
};

window.banners ={};
banners.transitionEnd = function(obj,callback){
    /!*如果obj是对象的时候绑定事件*!/
    if(typeof obj == 'object'){
        obj.addEventListener('transitionEnd',function(e){
            /!*if(callback){
             callback(e);
             }*!/
            callback && callback(e);
        },false);
        obj.addEventListener('webkitTransitionEnd',function(e){
            callback && callback(e);
        },false);
    }
};
*/

(function(){
    var em=document.querySelector('#em');
    em.addEventListener('click',function(){
        location.href='../my.html';
    });

    var banner = document.querySelector('.jrl_banner');
    var width = banner.offsetWidth;/*获取内部样式的方法*/
    var ul = banner.querySelector('.pic_box');
    var lis = ul.querySelectorAll('li');
    var points = document.querySelectorAll('.point');
    function addTransition(){
        ul.style.transition='all 0.5s ease';
    }
    function addTranslateX(x){
        ul.style.transform='translateX('+x+'px)';
    }
    function removeTransition(){
        ul.style.transition='none';
    }


    var index=1;
    var timer;
    timer = setInterval(function(){
        index++;
        addTransition();
        addTranslateX(-width*index);
        setPoint();
    },2000);


    ul.addEventListener('webkitTransitionEnd',function(e){
        // console.log(e);
        if(index>=4){
            index=1;
            removeTransition();/*删除过渡*/
            addTranslateX(-width*index);/*此时在第一张*/
            setPoint();/*小圆点在第一个*/
        }else if(index<=0){
            index=3;
            removeTransition();
            addTranslateX( - width*index);
            setPoint();
        }
    });
    function setPoint(){
        var pointIndex=index;
        for(var i=0;i<points.length;i++){
            points[i].classList.remove('now');
        }
        if(index>=4){
            pointIndex=1;
        }else if(index<=0){
            pointIndex=3;
        }
        points[pointIndex-1].classList.add('now');
    }
    var start=0;
    var end=0;
    var step=0;
    ul.addEventListener('touchstart',function(e){
        clearInterval(timer);
        start= e.touches[0].clientX;
    });
    ul.addEventListener('touchmove',function(e){
        e.preventDefault();
        end= e.touches[0].clientX;
        step=start-end;
        addTransition();
        addTranslateX(-index*width-step);
    });
    ul.addEventListener('touchend',function(e){
        if(Math.abs(step)> width/3  &&  end!=0){
            if(step>0){
                index++;
            }else{
                index--;
            }
        }
        addTransition();
        addTranslateX( - width*index);
        setPoint();
        clearInterval(timer);
        timer = setInterval(function(){
            index++;
            addTransition();
            addTranslateX(-width*index);
            setPoint();
        },2000);
        start=0;
        end=0;
        step=0;

    },false);


})();

