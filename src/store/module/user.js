import { getUserInfo } from '@/api/user'

export default {
  namespaced: true,
  state: {
    roles: []
  },
  getters: {
    roles: state => state.roles
  },
  mutations: {
    setRoles(state, roles) {
      state.roles = roles
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
