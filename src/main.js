import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import 'normalize.css'
import '@/assets/styl/global.styl'
import 'element-ui/lib/theme-chalk/index.css'
import Element from 'element-ui'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'

Vue.use(Element)
Vue.component('v-icon', Icon)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
