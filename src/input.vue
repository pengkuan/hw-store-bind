
<template>

  <div class="input-wrap">

    <img class="input-icon" v-if="icon" :src="icon">

    <div class="input-outer">
      <input class="hwsk-input" @change="$emit('change', currentValue)" :readonly="readonly" :value="currentValue" @input="handleInput" :type="type" :placeholder="placeholder">
    </div>
  </div>

</template>


<style type="text/css">

  .input-wrap {
    position: relative;
    background-color: #fff;
    padding-left: .4rem;
    box-sizing: border-box;
    border-radius: 8px;
    overflow: hidden;
  }

  .input-icon {
    position: absolute;
    width: .2rem;
    left: .1rem;
    top: .1rem;
  }

  .input-outer {
  }

  .hwsk-input {
    border: none;
    height: .42rem;
    width: 100%;
    background-color: transparent;
  }

</style>


<script type="text/javascript">

  export default {
    name : "hwsk-input",

    data () {

      return {

        currentValue: this.value
      }
    },

    props : {

      placeholder : String,

      icon : String,

      type : String,

      readonly: Boolean,

      value : {}
    },

    watch : {
      value(val) {
        this.currentValue = val;
      },

      currentValue(val) {
        this.$emit('input', val);
      }
    },

    methods : {

      handleInput(evt) {
        this.currentValue = evt.target.value;
      }

    }

  }
</script>