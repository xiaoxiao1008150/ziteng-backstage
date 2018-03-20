// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'common/stylus/index.styl'
import App from './App'
import router from './router'
import store from './store'
// import VDistpicker from 'v-distpicker'
// import './permission' // permission control
import VueClipboard from 'vue-clipboard2'

Vue.use(VueClipboard)
// Vue.component('v-distpicker', VDistpicker)
Vue.config.productionTip = false
Vue.use(ElementUI)

/* eslint-disable no-new */
let vm = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
