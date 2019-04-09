import { getUserInfo } from '@/api/user'

export default {
  namespaced: true,
  state: {
    roles: [],
    routes: []
  },
  getters: {
    roles: state => state.roles,
    routes: state => state.routes
  },
  mutations: {
    setRoles(state, roles) {
      state.roles = roles
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
