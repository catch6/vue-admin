import { getUserInfo } from '@/api/user'
import { filterMenu, makeMenu } from '@/libs/util'

export default {
  namespaced: true,
  state: {
    roles: [],
    menu: null
  },
  getters: {
    roles: state => state.roles,
    menu: state => state.menu
  },
  mutations: {
    setRoles(state, roles) {
      state.roles = roles
    },
    generateMenu(state, { allMenu, routes }) {
      allMenu = filterMenu(allMenu, routes)
      state.menu = makeMenu(allMenu)
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
