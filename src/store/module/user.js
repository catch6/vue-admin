import {getUserInfo} from '@/api/user'

export default {
  namespaced: true,
  state: {
    roles: [],
    avatar: null,
    nickname: null,
    allRoutes: null,
    menuRoutes: null,
    cachePool: []
  },
  getters: {
    roles: state => state.roles,
    avatar: state => state.avatar,
    nickname: state => state.nickname,
    allRoutes: state => state.allRoutes,
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
    setNickname(state, nickname) {
      state.nickname = nickname
    },
    setAllRoutes(state, allRoutes) {
      state.allRoutes = allRoutes
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
    getUserInfo({commit}) {
      return new Promise((resolve, reject) => {
        getUserInfo()
          .then(data => {
            commit('setRoles', data.user.roles)
            commit('setAvatar', data.user.avatar)
            commit('setNickname', data.user.nickname)
            resolve(data.user)
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  }
}
