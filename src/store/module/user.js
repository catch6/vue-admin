import { getUserInfo } from '@/api/user'
import { filterMenuRoutes, filterMenu } from '@/libs/util'
import menu from '@/router/menu'

export default {
  namespaced: true,
  state: {
    roles: [],
    menuRoutes: [],
    menu: []
  },
  getters: {
    roles: state => state.roles,
    menuRoutes: state => state.menuRoutes,
    menu: state => state.menu
  },
  mutations: {
    setRoles(state, roles) {
      state.roles = roles
    },
    setMenuRoutes(state, routes) {
      state.menuRoutes = filterMenuRoutes(routes)
    },
    generateMenu(state, routes) {
      state.menu = filterMenu(menu, routes)
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
