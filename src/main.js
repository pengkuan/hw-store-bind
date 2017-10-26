import Vue from 'vue'
import './common/wcss/reset.css'
import './hwsk.css'
import WastePlugin from './directive/waste.js'

Vue.use(WastePlugin)

import App from './app'

window.appp = new Vue({

  'el' : '.body-bg',

  render : h => h(App)
  
})