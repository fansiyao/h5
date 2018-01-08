//创建场景
var move_z;
var s = new C3D.Stage();
s.size(window.innerWidth, window.innerHeight).material({
    color: "#cccccc"
}).update();
document.getElementById('main').appendChild(s.el);

//创建1个立方体放入场景
var panoRect = {w: 1000, h: 600};
var bgData = [

];

function createPano(imgs, rect) {
    var _len = imgs.length;
    var _step = rect.w / _len;
    var _radius = Math.floor(_step / 2 / Math.tan(Math.PI / _len));

    var _sp = new C3D.Sprite();
    for (var i = 0; i < _len; i++) {
        var _p = new C3D.Plane();
        var _r = 360 / _len * i;
        var _a = Math.PI * 2 / _len * i;
        _p.size(_step, rect.h).position(Math.sin(_a) * _radius, 0, -Math.cos(_a) * _radius).rotation(0, -_r, 0).material({
            image: imgs[i].url,
            repeat: 'no-repeat',
            bothsides: true,
        }).update();
        _p.on('click',function () {
            move_z=-4
        });
        _sp.addChild(_p);
    }

    return _sp;
}
move_z=-4
var pano = this.createPano(bgData, panoRect);
pano.position(0, 0, -1000).updateT();
s.addChild(pano);
//创建平面图片文字
var img2 = new C3D.Plane({el:document.getElementById('img2')});
img2.name('img2').size(window.innerWidth*0.6,'auto').position(0, 200, 0).rotation(0, 0, 0).update();
s.addChild(img2);
//创建平面图片logo
var img3 = new C3D.Plane({el:document.getElementById('img3')});
img3.name('img3').size(window.innerWidth*0.2,'auto').position(0, 300, 0).rotation(0, 0, 0).update();
s.addChild(img3);

img2.position(0, 130, -550).updateT();
img3.position(0, 220, -500).updateT();
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

function go() {
    pano.rotate(0, 0.1, 0).updateT();
    s.camera.move(0, 0, move_z).update();
    requestAnimationFrame(go);
}

requestAnimationFrame(go);
//loading

/*
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
        $(".img").remove();
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

},50);*/
