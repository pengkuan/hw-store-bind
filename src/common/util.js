

var fullscreen = function fullscreen(elem) {
  var prefix = 'webkit';

  if (elem['requestFullscreen']) {
    return 'requestFullscreen';
  }
  if (elem[prefix + 'RequestFullScreen']) {
    return prefix + 'RequestFullScreen';
  }
  if (elem[prefix + 'EnterFullScreen']) {
    return prefix + 'EnterFullScreen';
  };
  return false;
};

function autoFullScreen(v, cb){
  var ua   = navigator.userAgent.toLowerCase();
  var Android = String(ua.match(/android/i)) == "android";
  // if(!Android) return;//非android系统不使用;
  var video  = v,doc = document;
  var fullscreenvideo = fullscreen(doc.createElement("video"));
  if(!fullscreenvideo) {
    alert('请使用更新的浏览器，以支持视频播放!');
    return;
  }

  video.addEventListener("webkitfullscreenchange",function(e){

    if(!doc.webkitIsFullScreen){//退出全屏暂停视频
      console.log('全屏!')
      video.pause();
    };
  }, false);

  video.addEventListener('canplay', function (e) {

    console.log('can Play!')
    video.play();
  });

  video.addEventListener('pause', function () {
    cb && cb(); //暂停触发回调
  });

  video.addEventListener("click", function(){
    alert(fullscreenvideo);
    video[fullscreenvideo]();
  }, false);

  video.addEventListener('ended',function(){
    doc.webkitCancelFullScreen(); //播放完毕自动退出全屏
  },false);
};



/**
 * 判断设备是否IOS
 * @return {Boolean} [description]
 */
let isIOS = function cache () {

  if (cache.result) {
    return cache.result;
  }

  let ua = navigator.userAgent.toLowerCase();
  if (/iphone|ipad|ipod/.test(ua)) {
      return cache.result = true;
  }

  if (/android/.test(ua)) {
      return cache.result = false;
  }
};

/**
 *  格式化日期
 * @param  {Date} time 时间戳
 * @param  {String} fmt  格式
 * @return {String}      格式化后的字符串
 */
let dateFormat = (time, fmt) => {

  if (typeof time == 'string' && isIOS()) {
    //IOS下 不认识日期里的‘-’
    time = time.replace(/-/g,"/");
  }
  var date = new Date(time);

  fmt = fmt || 'yyyy-MM-dd hh:mm:ss';
  var o = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds(),
    "q+": Math.floor((date.getMonth() + 3) / 3),
    "S": date.getMilliseconds()
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
  if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
};

/**
 * 获取cookie
 * @param  {string} name cookie的name
 * @return {string}      value
 */
let getCookie = (name) => {

    let reg = new RegExp("(^| )" + name + "(?:=([^;]*))?(;|$)"),
        val = document.cookie.match(reg);
    return val ? (val[2] ? unescape(val[2]) : "") : null;
};


/**
 * 获取query value
 * @param  {string} name key
 * @return {string}      value
 */
let getQueryStringByName = name => {

     let result = window.location.search.match(new RegExp("[\?\&]" + name+ "=([^\&]+)","i"));

     if(result == null || result.length < 1){

         return "";

     }

     return result[1];

};

/**
 * 是否在name 这个页面
 * @param  {[type]} name [description]
 * @return {[type]}      [description]
 */
let inPage = name => {

  let pathNames = window.location.pathname.split('/');

  return pathNames.indexOf(name) > -1;
};

/**
 * 是否支持触摸事件
 * @type {String}
 */
let isSupportTouch = "ontouchend" in document ? true : false;


/**
 * [time33 description]
 * @param  {[type]} str [description]
 * @return {[type]}     [description]
 */
var time33  = function(str) {

    var str = str || ''
    var hash = 5381
    for (var i = 0, len = str.length; i < len; ++i) {
        hash += (hash << 5) + str.charCodeAt(i)
    }
    return hash & 0x7fffffff

}

/**
 * [mobileTest description]
 * @type {RegExp}
 */
let mobileTest        = /^1[3|4|5|7|8]\d{9}$/;


module.exports = {
  autoFullScreen,
  isIOS,
  dateFormat,
  getCookie,
  getQueryStringByName,
  inPage,
  isSupportTouch,
  time33,
  mobileTest
};