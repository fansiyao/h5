/**
 * Created by User on 2017/1/22.
 */
var bgData = [
    {url: 'resource/images/img/11.gif'},
    {url: 'resource/images/img/22.gif'},
    {url: 'resource/images/img/33.gif'},
    {url: 'resource/images/img/44.gif'},
    {url: 'resource/images/img/55.gif'},
    {url: 'resource/images/img/66.gif'},
    {url: 'resource/images/img/77.gif'},
    {url: 'resource/images/img/88.gif'},
];
var bgData2 = [
    {url: 'resource/images/img/1-2.png'},
    {url: 'resource/images/img/2-2.png'},
    {url: 'resource/images/img/3-2.png'},
    {url: 'resource/images/img/4-2.png'},
    {url: 'resource/images/img/5-2.png'},
    {url: 'resource/images/img/6-2.png'},
    {url: 'resource/images/img/7-2.png'},
    {url: 'resource/images/img/8-2.png'},
];
var bgData3 = [
    {url: 'resource/images/img/1-1.png'},
    {url: 'resource/images/img/2-1.png'},
    {url: 'resource/images/img/3-1.png'},
    {url: 'resource/images/img/4-1.png'},
    {url: 'resource/images/img/5-1.png'},
    {url: 'resource/images/img/6-1.png'},
    {url: 'resource/images/img/7-1.png'},
    {url: 'resource/images/img/8-1.png'},
];
var bgData4 = [
    {url: 'resource/images/66.png'},
    {url: 'resource/images/66.png'},
    {url: 'resource/images/66.png'},
    {url: 'resource/images/66.png'},
    {url: 'resource/images/66.png'},
    {url: 'resource/images/66.png'},
    {url: 'resource/images/66.png'},
    {url: 'resource/images/66.png'},
];

function img(data) {
    for(var i=0;i<data.length;i++){
        var _src=data[i].url;
        var new_img='<img src="'+_src+'">';
        $(".img").append(new_img);
    }
}
img(bgData);
img(bgData2);
img(bgData3);
img(bgData4);
var flag=1;
var direction,timer,timer2,timer3,touch_start,touch_end;
direction=1;
//创建场景
var s = new C3D.Stage();
s.size(window.innerWidth, window.innerHeight).material({

}).update();

document.getElementById('main').appendChild(s.el);
//创建平面图片背景
var img4 = new C3D.Plane({el:document.getElementById('img4')});
img4.name('img4').size(window.innerWidth*0.7,'auto').position(0, 0, 0).rotation(0, 0, 0).update();
s.addChild(img4);
//创建平面图片文字
var img2 = new C3D.Plane({el:document.getElementById('img2')});
img2.name('img2').size(window.innerWidth*0.7,'auto').position(0, 200, 0).rotation(0, 0, 0).update();
s.addChild(img2);
//创建平面图片logo
var img3 = new C3D.Plane({el:document.getElementById('img3')});
img3.name('img3').size(window.innerWidth*0.2,'auto').position(0, 300, 0).rotation(0, 0, 0).update();
s.addChild(img3);

img2.position(0, 130, -550).updateT();
img3.position(0, 220, -500).updateT();
//img4.position(0, -140, -500).updateT();

//创建3个立方体放入场景//亭子头亭子和亭子底座
var panoRect = {w: 750, h: 200};

var panoRect2 = {w: 760, h:200};

var panoRect3 = {w: 790, h: 200};

var panoRect4 = {w: 670, h: 60};

function createPano(imgs, rect,type) {
    var _len = imgs.length;
    var _step = rect.w / _len;
    var _radius = Math.floor(_step / 2 / Math.tan(Math.PI / _len));

    var _sp = new C3D.Sprite();
    for (var i = 0; i < _len; i++) {
        var _p = new C3D.Plane();
        var _r = 360 / _len * i;
        var _a = Math.PI * 2 / _len * i;


        if(type==0){
            _p.size(_step, rect.h).position(Math.sin(_a) * _radius, 0, -Math.cos(_a) * _radius).rotation(0, -_r+270, 0).material({
                image: imgs[i].url,
                repeat: 'no-repeat',
                size:'100% 100%',
                bothsides: true,
            }).update();
        }else {
            _p.size(_step, rect.h).position(Math.sin(_a) * _radius, 0, -Math.cos(_a) * _radius).rotation(0, -_r+180, 0).material({
                image: imgs[i].url,
                repeat: 'no-repeat',
                size:'100%',
                bothsides: true,
            }).update();
        }


        _p.on('click',function () {  //点击放大缩小事件
            flag++;
            if(flag%2==0){
                var _p_rotateY=parseFloat($(this).css("transform").split(" ")[7].split("(")[1]);
                if(pano.rotationY+_p_rotateY>0){
                    direction=-1;
                }else {
                    direction=1;
                }
                clearInterval(timer3);
                timer2=setInterval(function () {
                   go2()
                },10);
            } else {
                clearInterval(timer2);
                direction=0;
                timer3=setInterval(function () {
                    var position_z=s.camera.z;
                    if(position_z<0){
                        s.camera.move(0,  75/94, 4).update();


                    }else{
                        direction=1;
                        clearInterval(timer3)
                    }
                },10);
            }
        });
        _p.on('touchstart',function (e) {
            touch_start=e.changedTouches[0].pageX;
        });
        _p.on('touchmove',function (e) {

            touch_end=e.changedTouches[0].pageX;
            console.log(touch_end-touch_start);
            if(touch_end-touch_start>20){
                if(direction<0){
                    direction=1;
                }else if(direction>4){
                    direction=4;
                }else {
                        direction+=1;
                }
            }else if(touch_end-touch_start<-20) {

                if(direction>0){
                    direction=-1
                }else if(direction<-4){
                    direction=-4;
                } else {
                    direction+=-1;
                }
            }
        });
        _sp.addChild(_p);
    }

    return _sp;

}

var pano = this.createPano(bgData, panoRect,1);
var pano2=this.createPano(bgData2, panoRect2,1);
var pano3=this.createPano(bgData3, panoRect3,1);
var pano4=this.createPano(bgData4, panoRect4,0);
pano.position(0, -50, -580).updateT();
pano2.position(0, 100, -580).updateT();
pano3.position(0, -80, -580).updateT();
pano4.position(0, -175, -580).updateT();
pano4.rotation(0,-23,0);

s.addChild(pano);
s.addChild(pano2);
s.addChild(pano3);
s.addChild(pano4);
//响应屏幕调整尺寸
function resize() {
    s.size(window.innerWidth, window.innerHeight).update();
}

window.onresize = function () {
    resize();
};
resize();

//刷新场景
requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame ||
    function (callback) {
        setTimeout(callback, 1000 / 60);
    };




function go(y) {
    pano.rotate(0, y, 0).updateT();
    pano2.rotate(0, y, 0).updateT();
    pano3.rotate(0, y, 0).updateT();
    pano4.rotate(0, y, 0).updateT();


}

timer=setInterval(function () {
    go(direction);
},30);

function go2(){
    pano.update();
    var y=pano.rotationY;
    if(y%45==0){
       direction=0;
        var position_z=s.camera.z;
        if(position_z>-376){
            s.camera.move(0, -75/94, -4).update();
        }
    }
}




var imgList = $("img");
var timer5 = setInterval(function(){
    var _flag = true;
    imgList.each(function(index,ele){
        if($(ele).height() == 0){
            _flag = false;
        }
    });
    if(_flag){
        $("body").css("opacity","1");
        $(".img").hide();
        sendMessage();
        if(document.addEventListener){
            document.addEventListener('WeixinJSBridgeReady', sendMessage, false); }
        else if(document.attachEvent){
            document.attachEvent('WeixinJSBridgeReady' , sendMessage); document.attachEvent('onWeixinJSBridgeReady' , sendMessage);
        }
        function sendMessage() {
            document.getElementById("bgm_1").play();
            document.getElementById("bgm_2").play();
        }

        clearInterval(timer5);
    }

},50);

//关闭背景音乐
$(".close_bgm").click(function () {
    if(document.getElementById("bgm_1").paused){
        $(this).addClass("music");
        document.getElementById("bgm_1").play();
        document.getElementById("bgm_2").play();

    }else {
        $(this).removeClass("music");
        document.getElementById("bgm_1").pause();
        document.getElementById("bgm_2").pause();
    }

});
console.log(43%45)