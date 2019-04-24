import { getUserInfo } from '@/api/user'

export default {
  namespaced: true,
  state: {
    roles: [],
    menu: null,
    routes: null
  },
  getters: {
    roles: state => state.roles,
    menu: state => state.menu,
    routes: state => state.routes
  },
  mutations: {
    setRoles(state, roles) {
      state.roles = roles
    },
    setMenu(state, generatedMenu) {
      state.menu = generatedMenu
    },
    setRoutes(state, routes) {
      state.routes = routes
    }
  },
  actions: {
    /**
     * 获取用户相关信息
     */
    getUserInfo({ commit }) {
      return new Promise((resolve, reject) => {
        try {
          getUserInfo()
            .then(data => {
              commit('setRoles', data.user.roles)
              resolve(data.user)
            })
            .catch(err => {
              reject(err)
            })
        } catch (error) {
          reject(error)
        }
      })
    }
  }
}
