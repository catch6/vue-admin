export default {
  namespaced: true,
  state: {
    isCollapse: false
  },
  getters: {
    isCollapse: state => state.isCollapse
  },
  mutations: {
    toggleCollapse(state) {
      state.isCollapse = !state.isCollapse
    }
  },
  actions: {}
}
