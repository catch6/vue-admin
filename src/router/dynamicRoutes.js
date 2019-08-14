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
        path: '/menu1',
        name: 'menu1',
        redirect: '/menu1-1-1',
        component: Wrap,
        meta: {
          title: '一级菜单',
          icon: 'home',
          roles: ['admin']
        },
        children: [
          {
            path: '/menu1-1',
            name: 'menu1-1',
            redirect: '/menu1-1-1',
            component: Wrap,
            meta: {
              title: '二级菜单1',
              icon: 'home',
              roles: ['admin']
            },
            children: [
              {
                path: '/menu1-1-1',
                name: 'menu1-1-1',
                component: () => import(/* webpackChunkName: "menu1" */ '../views/nested/menu1-1-1'),
                meta: {
                  title: '三级菜单1',
                  icon: 'home',
                  roles: ['admin']
                }
              }
            ]
          },
          {
            path: '/menu1-2',
            name: 'menu1-2',
            component: () => import(/* webpackChunkName: "menu1" */ '../views/nested/menu1-2'),
            meta: {
              title: '二级菜单2',
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
