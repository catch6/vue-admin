import { getUserInfo } from '@/api/user'

export default {
  namespaced: true,
  state: {
    roles: [],
    avatar: null,
    username: null,
    menuRoutes: null,
    cachePool: []
  },
  getters: {
    roles: state => state.roles,
    avatar: state => state.avatar,
    username: state => state.username,
    menuRoutes: state => state.menuRoutes,
    cachePool: state => state.cachePool
  },
  mutations: {
    setRoles(state, roles) {
      state.roles = roles
    },
    setAvatar(state, avatar) {
      state.avatar = avatar
    },
    setUsername(state, username) {
      state.username = username
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
              commit('setAvatar', data.user.avatar)
              commit('setUsername', data.user.username)
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
