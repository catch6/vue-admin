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
  if (route.roles && route.roles.length) {
    return roles.some(role => route.roles.includes(role))
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
 * 依据路由器过滤菜单数组
 * @param menu 全部菜单列表
 * @param router 已过滤动态路由的路由器对象
 */
export const filterMenu = (menu, router) => {
  let accessMenu = []
  let accessAble = false
  let route
  menu.forEach(item => {
    if (item.path) {
      route = router.resolve(item.path).route
      if (route.path !== '/error/404') {
        item.name = route.name
        accessAble = true
      } else {
        accessAble = false
      }
    } else {
      accessAble = true
    }
    if (accessAble) {
      if (hasChildren(item)) {
        const accessChildrenMenu = filterMenu(item.children, router)
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

/**
 * 用于对已过滤的菜单做进一步处理，方便菜单列表索引和面包屑
 * @param menu
 */
export const generateMenu = menu => {
  let id = 0
  menu.forEach(item => {
    // 为每个菜单生成一个唯一 id 用于作为路由的索引
    item.id = id++
    if (hasChildren(item)) {
      generatePid(item, id)
    }
  })
  return menu
}

/**
 * 在对象的子对象上挂载此对象的 id
 * @param item 父对象
 * @param id 当前累计的id值
 */
export const generatePid = (item, id) => {
  item.children.forEach(child => {
    child.id = id++
    // 为子节点设置 parent 便于根据当前路由追溯生成面包屑导航
    // 但是无法处理两个不同的菜单下包含相同 name 的子菜单的问题
    // 因为根据当前路由映射当前菜单是根据路由的 name 属性来判定的
    child.parent = item
    if (hasChildren(child)) {
      generatePid(child, id)
    }
  })
}

/**
 * 返回属性等于输入值的菜单项
 * @param menu 全部可用菜单
 * @param key 菜单属性名
 * @param value 菜单属性值
 * @returns {Boolean|Object|Null}
 */
export const findMenu = (menu, key, value) => {
  for (let item of menu) {
    if (item[key] && item[key] === value) {
      return item
    } else {
      if (item.children) {
        let menu = findMenu(item.children, key, value)
        if (menu) {
          return menu
        }
      }
    }
  }
  return null
}
