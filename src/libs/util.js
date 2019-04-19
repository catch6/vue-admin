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
  routes.forEach(route => {
    if (hasAccess(route, roles)) {
      if (hasChildren(route)) {
        route.children = filterDynamicRoutes(route.children, roles)
      }
      accessRoutes.push(route)
    }
  })
  return accessRoutes
}

/**
 * 判断一个路由的 name 是否在路由列表（包含子路由）中
 * @param name 要判断的路由的 name
 * @param routes 路由列表
 * @returns {boolean}
 */
export const nameInRoutes = (name, routes) => {
  for (const item of routes) {
    if (item.name === name) {
      return true
    } else {
      if (hasChildren(item)) {
        if (nameInRoutes(name, item.children)) {
          return true
        }
      }
    }
  }
  return false
}

/**
 * 依据可访问路由过滤菜单数组
 * @param menu 菜单列表
 * @param routes 全部可访问路由列表
 */
export const filterMenu = (menu, routes) => {
  let accessMenu = []
  menu.forEach(item => {
    if (nameInRoutes(item.name, routes)) {
      if (hasChildren(item)) {
        let accessChildrenMenu = filterMenu(item.children, routes)
        if (accessChildrenMenu.length) {
          item.children = accessChildrenMenu
          accessMenu.push(item)
        } else {
          delete item.children
          accessMenu.push(item)
        }
      } else {
        accessMenu.push(item)
      }
    }
  })
  return accessMenu
}

export const makePid = (item, id) => {
  item.children.forEach(child => {
    child.id = id++
    // 为子节点设置 pid 便于根据当前路由 name 追溯生成面包屑导航
    // 但是无法处理两个不同的菜单下包含相同 name 的子菜单的问题
    // 因为根据当前路由映射当前菜单是根据路由的 name 属性来判定的
    child.pid = item.id
    if (hasChildren(child)) {
      makePid(child, id)
    }
  })
}

/**
 * 用于对已过滤的菜单做进一步处理，方便菜单列表索引和面包屑
 * @param menu
 */
export const makeMenu = menu => {
  let id = 0
  menu.forEach(item => {
    // 为每个菜单生成一个唯一 id 用于作为路由的索引
    item.id = id++
    if (hasChildren(item)) {
      makePid(item, id)
    }
  })
  return menu
}
