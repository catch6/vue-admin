import Vue from 'vue'
import Router from 'vue-router'
import staticRoutes from './staticRoutes'
import dynamicRoutes from './dynamicRoutes'
import store from '@/store'
import {
  clearLogin,
  filterDynamicRoutes,
  generateCachePool,
  generateMenuRoutes,
  getToken,
  nameInRoutes
} from '../libs/util'

Vue.use(Router)

const createRouter = () =>
  new Router({
    mode: 'history',
    // scrollBehavior: () => ({ y: 0 }),
    routes: staticRoutes
  })

const router = createRouter()

// 重置路由，用来实时生成动态路由
// 详细查看: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export const resetRouter = () => {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

// 登录后需要重定向到首页的路由name列表
const redirectRoutes = ['Login', 'Register']

router.beforeEach((to, from, next) => {
  const token = getToken()
  if (token) {
    // 已登录
    if (store.getters['user/menuRoutes']) {
      // 拥有菜单路由列表说明已加载动态路由列表
      if (redirectRoutes.includes(to.name)) {
        // 当要请求的页面在 redirectHomePages 中时，直接重定向到主页
        next('/home')
      } else {
        next()
      }
    } else {
      // 没有菜单路由列表，则未加载动态路由列表，去获取角色列表并加载动态路由列表
      store
        .dispatch('user/getUserInfo')
        .then(user => {
          // 拉取用户信息，通过用户角色列表来加载具有权限的路由;
          const accessRoutes = filterDynamicRoutes(dynamicRoutes, user.roles)
          router.addRoutes(accessRoutes)
          const menuRoutes = generateMenuRoutes(accessRoutes)
          const cachePool = generateCachePool(menuRoutes)
          store.commit('user/setMenuRoutes', menuRoutes)
          store.commit('user/setCachePool', cachePool)
          // 设置 replace: true 可以避免用户在返回的时候回退到登录页
          next({ ...to, replace: true })
        })
        .catch(error => {
          console.error(error)
          clearLogin()
          location.href = `/login?redirect=${to.path}`
        })
    }
  } else {
    // 未登录
    if (nameInRoutes(to.name, staticRoutes)) {
      // 要前往的路由在静态路由列表中，放行
      next()
    } else {
      // 要前往的路由不在静态路由列表中，登录
      next(`/login?redirect=${to.path}`)
    }
  }
})

router.afterEach(to => {
  if (to.meta && to.meta.title) {
    document.title = to.meta.title
  }
})

export default router
