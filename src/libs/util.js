import Cookies from 'js-cookie'
import store from '@/store'
import { resetRouter } from '@/router'

const TOKEN_KEY = 'token'

export const getToken = () => {
  return Cookies.get(TOKEN_KEY)
}

export const setToken = (token, expires) => {
  return Cookies.set(TOKEN_KEY, token, { expires: expires || 1 })
}

export const removeToken = () => {
  return Cookies.remove(TOKEN_KEY)
}

/**
 * 清除登录信息
 */
export const clearLogin = () => {
  removeToken()
  store.commit('user/setRoles', [])
  resetRouter()
}

/**
 * 判断用户是否具有当前路由的权限
 * @param route 当前路由
 * @param roles 用户角色列表
 */
function hasAccess(route, roles) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * 判断对象是否含有 children
 * @param route 要判断的路由
 * @returns {Boolean}
 */
export const hasChildren = route => {
  return route.children && route.children.length
}

/**
 * 过滤动态路由
 * @param routes {Array} 动态路由列表
 * @param roles {Array} 用户角色列表
 * @returns {Array} 过滤后的动态路由列表
 */
export const filterDynamicRoutes = (routes, roles) => {
  const accessRoutes = []
  routes.forEach(route => {
    const tmpRoute = { ...route } // 设置临时变量来存储当前路由，不在原路由上做修改，注意！不要修改dynamicRoutes！！！
    if (hasAccess(tmpRoute, roles)) {
      if (hasChildren(tmpRoute)) {
        tmpRoute.children = filterDynamicRoutes(tmpRoute.children, roles)
      }
      accessRoutes.push(route)
    }
  })
  return accessRoutes
}

/**
 * 判断一个路由是否在路由列表（包含子路由）中
 * @param route 要判断的路由
 * @param routes 路由列表
 * @returns {boolean}
 */
export const routeInRoutes = (route, routes) => {
  for (const item of routes) {
    if (item.name === route.name) {
      return true
    } else {
      if (hasChildren(item)) {
        if (routeInRoutes(route, item.children)) {
          return true
        }
      }
    }
  }
  return false
}

/**
 * 过滤菜单路由
 * @param routes 全部可访问路由列表
 */
export const filterMenuRoutes = routes => {
  let menuRoutes = []
  routes.forEach(route => {
    if (route.name === 'layout') {
      if (hasChildren(route)) {
        menuRoutes.push(...route.children)
      }
    } else {
      if (!route.meta.hideInMenu) {
        menuRoutes.push(route)
      }
    }
  })
  return menuRoutes
}
