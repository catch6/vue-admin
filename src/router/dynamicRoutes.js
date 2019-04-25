import Layout from '@/components/Layout'
import Wrap from '@/components/Wrap'

/**
 * 动态路由配置
 * 注意：仅会对第一个路由的 children 进行菜单渲染，所以务必把 Layout 放在数组的第一位
 * 动态路由可配置参数：
 * meta:{
 *   title：标题，用于文档标题、左侧导航栏和面包屑导航展示
 *   icon：图标，用于导航栏和面包屑展示
 *   roles：允许访问的角色列表，如 ['user','admin']，默认允许访问
 *   showMenu：是否在左侧菜单展示 默认：true
 *   showBread：是否展示面包屑导航 默认：true
 *   cache：是否缓存组件 默认：true
 * }
 */
const dynamicRoutes = [
  {
    path: '/layout',
    name: 'Layout',
    redirect: '/home',
    component: Layout,
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home" */ '../views/home'),
        meta: {
          title: '首页',
          icon: 'home',
          roles: ['admin'],
          showBread: false
        }
      },
      {
        path: '/a',
        name: 'A',
        redirect: '/b',
        component: Wrap,
        meta: {
          title: 'a',
          icon: 'home',
          roles: ['admin']
        },
        children: [
          {
            path: '/b',
            name: 'B',
            component: () => import(/* webpackChunkName: "a" */ '../views/b'),
            meta: {
              title: 'b',
              icon: 'home',
              roles: ['admin']
            }
          },
          {
            path: '/c',
            name: 'C',
            component: () => import(/* webpackChunkName: "a" */ '../views/c'),
            meta: {
              title: 'c',
              icon: 'home',
              roles: ['admin']
            }
          }
        ]
      }
    ]
  },
  {
    path: '*',
    redirect: '/error/404',
    name: 'Any'
  }
]

export default dynamicRoutes
