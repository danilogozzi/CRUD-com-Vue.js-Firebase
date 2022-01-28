import '@babel/polyfill'
import Vue from 'vue'
import App from './App.vue'

//registrando axios de forma global na main
import './plugins/axios'

import './plugins/bootstrap-vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
