
<template>


  <section class="hwsk-wrap">

    <login v-if="status.bindStats == 'loging'" ></login>

    <confirm-info v-if="status.bindStats == 'binding'"></confirm-info>


    <div class="hwsk-other-info" v-if="status.bindStats == 'bindsuccess'">

      <img :src="bindsuccessIcon">

      <br>
      <br>

      绑定成功!

    </div>

    <div class="hwsk-other-info" v-if="status.bindStats == 'errInfo'">

      <img :src="connectIcon">

      <br>
      <br>

      请联系渠道经理!

    </div>

    <div class="hwsk-other-info" v-if="status.bindStats == 'cantubind'">

      <img :src="cantIcon">

      <br>
      <br>

      您无权绑定!

    </div>

  </section>

</template>


<style type="text/css">

.hwsk-other-info {
  padding-top: 1.5rem;

  text-align: center;
}

</style>

<script type="text/javascript">


import login from './login';
import confirmInfo from './confirm-info.vue';

import {shareState} from './common-data';

export default {
  name: 'hsb-hwsk-login',


  data () {

    return {

      status : shareState,

      cantIcon : require('./img/cant.png'),

      bindsuccessIcon : require('./img/bindsuccess.png'),

      connectIcon : require('./img/connect.png')
    }
  },

  components : {
    login,
    confirmInfo
  }
}

</script>