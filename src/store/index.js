import Vue from 'vue'
import Vuex from 'vuex'
import user from './module/user'
import layout from './module/layout'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    layout
  }
})
