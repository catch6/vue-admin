import Layout from '@/components/Layout'
// import Wrap from '@/components/Wrap'
import UserLayout from '@/views/user/UserLayout'

/**
 * 动态路由配置
 * 注意：仅会对 name:'layout' 路由的 children 进行菜单渲染
 * 路由可配置参数：
 * meta:{
 *   title：标题，用于文档标题、左侧导航栏和面包屑导航展示
 *   icon：图标，用于导航栏和面包屑展示
 *   cache：是否缓存组件 默认：true
 *   roles：允许访问的角色列表，如 ['user','admin']，默认允许访问
 *   showMenu：是否在左侧菜单展示 默认：false
 *   showBread：是否展示面包屑导航 默认：true
 * }
 */
export const dynamicRoutes = [
  {
    path: '/layout',
    name: 'layout',
    redirect: '/home',
    component: Layout,
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import(/* webpackChunkName: "home" */ '../views/home'),
        roles: ['admin']
      },
      {
        path: '/a',
        name: 'A',
        component: () => import(/* webpackChunkName: "a" */ '../views/A'),
        roles: ['admin'],
        children: [
          {
            path: '/b',
            name: 'B',
            component: () => import(/* webpackChunkName: "a" */ '../views/B'),
            roles: ['admin']
          },
          {
            path: '/c',
            name: 'C',
            component: () => import(/* webpackChunkName: "a" */ '../views/C'),
            roles: ['admin']
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

export const staticRoutes = [
  {
    path: '/',
    name: 'Index',
    redirect: '/login'
  },
  {
    path: '/user-layout',
    name: 'UserLayout',
    redirect: '/login',
    component: UserLayout,
    children: [
      {
        path: '/login',
        name: 'Login',
        component: () =>
          import(/* webpackChunkName: "user" */ '@/views/user/Login'),
        meta: {
          title: '登录'
        }
      },
      {
        path: '/register',
        name: 'Register',
        component: () =>
          import(/* webpackChunkName: "user" */ '@/views/user/Register'),
        meta: {
          title: '注册'
        }
      }
    ]
  },
  {
    path: '/error/:code',
    name: 'Error',
    component: () =>
      import(/* webpackChunkName: "error" */ '@/components/Error'),
    meta: {
      title: '错误'
    }
  }
]
