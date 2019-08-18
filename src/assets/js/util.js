import Cookies from 'js-cookie'
import {resetRouter} from '@/router'

Cookies.defaults = {expires: 9999}
const TOKEN_KEY = 'token'

export const getToken = () => {
  return Cookies.get(TOKEN_KEY)
}

export const setToken = (token, expires) => {
  return Cookies.set(TOKEN_KEY, token, {expires: expires || 1})
}

export const removeToken = () => {
  return Cookies.remove(TOKEN_KEY)
}

/**
 * 清除登录信息
 */
export const clearLogin = () => {
  removeToken()
  resetRouter()
}

/**
 * 判断用户是否具有当前路由的权限
 * @param route 当前路由
 * @param roles 用户角色列表
 */
function hasAccess(route, roles) {
  if (route.meta && route.meta.roles && route.meta.roles.length) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * 判断节点对象是否含有元素个数大于0的 children 数组
 * @param node 要判断的节点
 * @returns {Boolean}
 */
export const hasChildren = node => {
  return node.children && node.children.length
}

/**
 * 过滤动态路由
 * @param routes {Array} 动态路由列表
 * @param roles {Array} 用户角色列表
 * @returns {Array} 过滤后的动态路由列表
 */
export const filterDynamicRoutes = (routes, roles) => {
  const accessRoutes = []
  let children = []
  routes.forEach(route => {
    if (hasAccess(route, roles)) {
      if (hasChildren(route)) {
        children = filterDynamicRoutes(route.children, roles)
        if (children.length) {
          route.children = children
        } else {
          delete route.children
        }
      }
      accessRoutes.push(route)
    }
  })
  return accessRoutes
}

/**
 * 生成所有路由列表，主要是为每个路由添加 parent 属性，方便面包屑导航
 * @param accessRoutes 可访问路由列表
 */
export const generateAllRoutes = accessRoutes => {
  let routes = accessRoutes[0].children
  if (routes) {
    routes.forEach(route => {
      generateParent(route, routes)
    })
  } else {
    routes = []
  }
  return routes
}

/**
 * 生成菜单路由列表，主要是去除掉那些 meta.showMenu=false的路由
 * @param allRoutes 可访问路由列表
 */
export const generateMenuRoutes = allRoutes => {
  const routes = []
  allRoutes.forEach(route => {
    if (route.meta.showMenu === undefined || route.meta.showMenu) {
      if (hasChildren(route)) {
        let children = generateMenuRoutes(route.children)
        if (children.length) {
          route.children = children
        } else {
          delete route.children
        }
      }
      routes.push(route)
    }
  })
  return routes
}

/**
 * 在子对象的 parent 上挂载父对象
 * 为子节点设置 parent 便于根据当前路由追溯生成面包屑导航
 * @param item
 */
export const generateParent = (item, routes) => {
  if (item.meta.parentName) {
    item.meta.parent = findRouteByName(item.meta.parentName, routes)
  }
  if (hasChildren(item)) {
    item.children.forEach(child => {
      child.meta.parent = item
      generateParent(child)
    })
  }
}

/**
 * 生成缓存池
 * @param allRoutes 菜单路由列表
 */
export const generateCachePool = allRoutes => {
  let cachePool = []
  allRoutes.forEach(route => {
    if (!route.meta || route.meta.cache === undefined || route.meta.cache) {
      cachePool.push(route.name)
    }
    if (hasChildren(route)) {
      cachePool.concat(generateCachePool(route.children))
    }
  })
  return cachePool
}

/**
 * 根据路由的 name 在路由列表中查找路由
 * @param name 要判断的路由的 name
 * @param routes 路由列表
 * @returns {Object} 找到的路由
 */
export const findRouteByName = (name, routes) => {
  for (let route of routes) {
    if (route.name === name) {
      return route
    } else {
      if (hasChildren(route)) {
        let result = findRouteByName(name, route.children)
        if (result) {
          return result
        }
      }
    }
  }
  return null
}
