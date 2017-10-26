

import Vue from 'vue';
import {isIOS, dateFormat, getCookie, isSupportTouch} from '../common/util';

import {Toast} from 'mint-ui';

/**
 *
 * 微信浏览器IOS 端不能用js改变title，以下是hack
 * @param  {String} t [新title]
 * @return undefine
 */
let setTitle = t => {

  document.title = t;
  if (!isIOS()) return;

  let i = document.createElement('iframe');
  i.style.display = 'none';
  i.src = '/favicon.ico';
  i.onload = function() {
    setTimeout(function(){
      console.log('remove');
      i.remove();
    }, 9)
  }
  document.body.appendChild(i);
};


/**
 * hsb公用插件 放在这里, 以下方法、指令、过滤器都是全局的，谨慎注册！
 */
export default {

  install(Vue) {
    //vue的全局变量
    //Vue.prototype.$myName = "TMQ";

    //指令写法如下
    // Vue.directive('test', {

    //   bind (arg) {
    //     console.log('bind');
    //   },

    //   update (newV, oldV) {
    //     this.el.innerHTML = newV;
    //   },

    //   unbind () {
    //     console.log('unbind!')
    //   }
    // });
    //过滤器
    // Vue.filter('test', value => {
    //   return value * 2;
    // });

    //start
    // Vue.directive('title', nV => {
    //   setTitle(nV);
    // });
    //
    Vue.prototype.openId = getCookie('_wallet_openid');

    Vue.prototype.setTitle = t => setTitle(t);

    Vue.filter('date', (value , formate)=> {
      return dateFormat(value, formate);
    });

    Vue.filter('phoneFilter', (value = '132') => {

        let start = value.substring(0, 3);
        let end   = value.substring(7);

        return start + '****' + end;
    });

    Vue.prototype.Toast = (message, position, duration) => {

      Toast({message,position, duration});
    };

    var _tapShare = {
      tapObj : {},

      isTap () { //判断是否为tap

        var tapObj = this.tapObj;
        return this.time < 150 && Math.abs(tapObj.distanceX) < 2 && Math.abs(tapObj.distanceY) < 2;
      },


      touchstart (e,self) {
        var touches = e.touches[0];
        var tapObj = self.tapObj;

        tapObj.pageX = touches.pageX;
        tapObj.pageY = touches.pageY;
        tapObj.clientX = touches.clientX;
        tapObj.clientY = touches.clientY;
        self.time = +new Date();
      },

      touchend (e,self) {
        var touches = e.changedTouches[0];
        var tapObj = self.tapObj;
        self.time = +new Date() - self.time;
        tapObj.distanceX = tapObj.pageX - touches.pageX;
        tapObj.distanceY = tapObj.pageY - touches.pageY;
        if (self.isTap(tapObj)) self.handler(e);

      }

    };

    Vue.directive('tap', {
      isFn : true,
      // acceptStatement:true,
      bind () {},
      update (el, binding, vnode) {
        _tapShare.tapObj = {};

        if (typeof vnode !== 'function') {
          return ;
        }

        _tapShare.handler = e => {
          e.tapObj = _tapShare.tapObj;
          vnode.call(_tapShare, e);
        };

        if (isSupportTouch) {
          el.addEventListener('touchstart', e => {
            _tapShare.touchstart(e, _tapShare);
          }, false);

          el.addEventListener('touchend', e => {
            _tapShare.touchend(e, _tapShare);
          });
        } else {
          console.log('click');
          el.addEventListener('click', e => {
            _tapShare.handler(e);
          });
        }

      },
      unbind () {}
    });

  }
}


