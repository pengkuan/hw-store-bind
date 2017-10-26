
import {getQueryStringByName} from './common/util'


let CommonData = {

  orgInfo : {},

  code : getQueryStringByName('code')
}


let shareState = {

  //loging
  //
  //binding
  //
  //bindsuccess
  //
  //errInfo
  //
  //cantubind
  //
  bindStats : 'loging',

  showLogin () {
    this.bindStats = 'loging'
  },

  showBind () {
    this.bindStats = 'binding'
  },

  showBindResult () {
    this.bindStats = 'bindsuccess'
  },

  showErrFeedBack () {
    this.bindStats = 'errInfo'
  },

  showCantuBind () {
    this.bindStats = 'cantubind'
  }
};


export {
  CommonData,

  shareState
}