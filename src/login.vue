
<template>


  <section class="hwsk-login-wrap">

    <img class="hwsm-logo" :src="logo">

    <hsb-input class="hwsk-login-input"  v-model="account" :icon="accountIcon" type="text" placeholder="请输入账号"></hsb-input>

    <hsb-input class="hwsk-login-input" v-model="pwd" :icon="pwdIcon" type="password" placeholder="请输入密码"></hsb-input>


    <mt-button size="large" :disabled="!pwd && !account" @click="login">登录</mt-button>
  </section>

</template>


<style type="text/css">

.hwsk-login-wrap {
  width: 70%;
  margin: 0 auto;
  padding-top: 2.15rem;
  position: relative;
}

.hwsm-logo {
  position: absolute;
  width: 2rem;
  top: .7rem;
  left: 50%;
  transform: translateX(-50%);
}

.hwsk-login-input {
  margin-bottom: .2rem;
  width: 100%;
}

</style>


<script type="text/javascript">

  import hsbInput from './input'

  import {Button, Indicator} from 'mint-ui'
  import 'mint-ui/lib/style.css'

  import {login, check_code} from './http'

  import {time33, getQueryStringByName} from './common/util'

  import {CommonData, shareState} from './common-data'

  export default {
    name : 'hwsk-login',

    data () {

      return {

        logo : require('./img/logo.png'),

        accountIcon : require('./img/account.png'),

        pwdIcon : require('./img/pwd.png'),

        account : '',

        pwd : ''
      }
    },

    components : {
      hsbInput,
      'mt-button' : Button
    },


    methods : {

      login () {

        if (!this.account || ! this.pwd) {
          this.Toast('请先完成表单!')
          return;
        }

        let pwd =  String(time33(this.pwd))


        login({
          's_username' : this.account,
          's_name_type' : '3',
          's_password' : pwd,
          's_role_id' : '75', // 填写固定ID 75
          's_user_type' : '1'
        }).then(res => {

          if (res.ret == 0) {

            CommonData.orgInfo = res.data
            CommonData.jobNumber = this.account
            console.log(CommonData)
            shareState.showBind()
            return
          }

          if (res.errcode == 14001) {
            shareState.showCantuBind()
            return
          }

          if (res.errcode == 3011) {
            this.Toast('工号或密码输入有误')
            return
          }

          this.Toast(res.retinfo)
        });
      },


      check_code () {
          Indicator.open ('验证微信信息..')

          let code = CommonData.code
          check_code({
            code,
            state: "STATE",
          }).then (res => {

            if (res.ret != 0) {
              shareState.showCantuBind()
              this.Toast(res.retinfo)
            }


          }).finally( () => {
            Indicator.close ()

          })

      }
    },


    mounted () {

      this.check_code()

    }
  }
</script>