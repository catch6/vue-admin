import { getUserInfo } from '@/api/user'

export default {
  namespaced: true,
  state: {
    roles: [],
    menuRoutes: null,
    cachePool: []
  },
  getters: {
    roles: state => state.roles,
    menuRoutes: state => state.menuRoutes,
    cachePool: state => state.cachePool
  },
  mutations: {
    setRoles(state, roles) {
      state.roles = roles
    },
    setMenuRoutes(state, menuRoutes) {
      state.menuRoutes = menuRoutes
    },
    setCachePool(state, cachePool) {
      state.cachePool = cachePool
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
