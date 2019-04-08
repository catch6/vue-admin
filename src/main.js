import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import 'normalize.css'
import './plugins/element.js'
import './assets/styl/global.styl'
import './assets/styl/util.styl'
import Cookies from 'js-cookie'

Cookies.set('ss', 'ssss', { expires: 7 })

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
