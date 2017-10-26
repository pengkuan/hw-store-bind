
<template>


  <section>

    <div class="channel-info">

      <div class="channel-baseinfo" v-if="orgInfo.showtype == 1">

        <p>
            {{orgInfo.channelname}} <br>
            门店总数：{{orgInfo.orgcount}} 家
        </p>
      </div>


      <div class="channel-baseinfo" v-else>

          <p>
            {{orgInfo.channelname}}<br>
            {{orgInfo.orgname}}
          </p>

      </div>
    </div>


    <div class="confirm-wrap">

      <hsb-input :icon="mobileIcon" v-model="mobile" class="hwsk-confirm-filed" placeholder="手机号"  readonly></hsb-input>

      <div class="hwsk-flex-wrap hwsk-confirm-filed">
        <hsb-input :icon="codeIcon" v-model="code" class="hwsk-confirm-code" placeholder="验证码" ></hsb-input>

        <mt-button size="small" class="hwsk-sendmsg-btn" @click="sendMsg" :disabled="sendCodeing">{{ sendCodeing ? ( secCount +'s') : codeTxT}}</mt-button>
      </div>

      <div class="hwsk-flex-wrap hwsk-confirm-filed">

        <mt-button class="hwsk-confirm-btn" @click="submit">确认绑定</mt-button>

        <mt-button class="hwsk-confirm-btn" plain @click="errInfo">信息有误</mt-button>
      </div>

    </div>

  </section>

</template>

<style>

.channel-info {
  background-image: url('img/info-bg.png');
  background-repeat: repeat-x;
  height: 1.5rem;
  background-color: #ea5520;
  -webkit-background-size: 25% 100%;
  background-size: 25% 100%;
}

.channel-baseinfo {
  line-height: 1.7;
  font-size: .25rem;
  font-family: "PingFang";
  color: rgb( 63, 62, 62 );
  display: flex;
  align-items: center;
  height: 100%;
  justify-content: center;
  text-align: center;
}


.confirm-wrap {
  width: 70%;
  margin: 0 auto;
  margin-top: 128px;
}

.hwsk-confirm-filed {
  margin-bottom: .2rem;
  width: 100%;
}

.hwsk-confirm-code {
  width: 57%;
}

.hwsk-sendmsg-btn {
  background-color: #ccc!important;
  width: 40%;
  font-size: 13px;
  height: .42rem;
}

.hwsk-flex-wrap {
  display: flex;
  justify-content: space-between;
}

.hwsk-confirm-btn {
  width: 48%;
}

</style>

<script type="text/javascript">

import hsbInput from './input'
import {Button} from 'mint-ui'

import {sendMsg, bindAcc} from './http'

import {CommonData, shareState} from './common-data'

import {mobileTest , time33} from './common/util'


const secCount = 60

export default {

  name: 'hwsk-confirm',

  components : {
    hsbInput,
    'mt-button' : Button
  },

  data () {

    return {


      orgInfo : CommonData.orgInfo,

      mobileIcon :require('./img/mobile.png'),

      codeIcon : require('./img/code.png'),

      mobile : CommonData.orgInfo.phone,

      code : '',

      time:'',

      secCount: secCount,

      sendCodeing : false,

      codeTxT : '发送验证码'
    }
  },


  methods : {



    confirmBind () {

      if (!this.code) {
        this.Toast('请填写正确验证码!')
        return 
      }

    },
    submit(){
      if (!this.code) {
        this.Toast('请填写正确验证码!')
        return 
      }

      bindAcc({
        "code": this.code,
        "login_token": CommonData.orgInfo.login_token,
        "wechatcode": CommonData.code,
        "jobNumber": CommonData.jobNumber
      }).then(res => {

        if (res.ret == 0) {
          shareState.showBindResult()
          return
        }
        this.Toast(res.retinfo)
      })
    },

    sendMsg () {

      this.sendCodeing = true
      this.time = String(new Date().getTime())
      sendMsg({
        'jobNumber' : CommonData.jobNumber,
        'login_token' : CommonData.orgInfo.login_token,
      }).then( res => {

        if (res.ret == 0) {
          this.Toast('发送验证码成功!')
          this.codeTxT = '再次发送'

          setTimeout(() => {
            this.count()
          }, 1000)
          return
        }

        this.Toast(res.retinfo)
        this.sendCodeing = false
      })

    },

    errInfo () {

      shareState.showErrFeedBack()
    },


    count () {

      if (--this.secCount == 0) {
        this.sendCodeing = false

        this.secCount = secCount
        return
      }

      setTimeout( () => {
        this.count()
      }, 1000)

    }
  }
}

</script>