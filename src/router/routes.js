import Layout from '../components/Layout'

/**
 * 路由可配置参数
 meta: {
    title: (default: 'admin') 标题
    icon: (default: -) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
    hideInMenu: (default: false) 设为true后在左侧菜单不会显示该页面选项
    hideInBread: (default: false) 设为true后在左侧菜单不会显示该页面选项
    showAlways: (default: false) 设为true后如果该路由只有一个子路由，在菜单中也会显示该父级菜单
    noCache: (default: false) 设为true后页面不会缓存
    roles: (default: null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
    href: 'https://xxx' (default: null) 用于跳转到外部连接
  }

 注意！所有组件（除了 layout ），必须父组件显示子组件才能显示
 */

export const dynamicRoutes = [
  {
    path: '/layout',
    name: 'layout',
    component: Layout,
    meta: {
      hideInMenu: true
    },
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import(/* webpackChunkName: "home" */ '../views/home'),
        meta: {
          title: '主页',
          icon: 'home',
          hideInBread: true,
          roles: ['admin']
        }
      },
      {
        path: '/a',
        name: 'A',
        component: () => import(/* webpackChunkName: "a" */ '../views/A'),
        meta: {
          title: 'A',
          icon: 'menu',
          hideInBread: true,
          roles: ['super']
        }
      }
    ]
  },
  {
    path: '*',
    redirect: '/error/404',
    name: 'any',
    meta: {
      hideInMenu: true
    }
  }
]

export const staticRoutes = [
  {
    path: '/',
    name: 'index',
    redirect: '/login',
    meta: {
      hideInMenu: true
    }
  },
  {
    path: '/base-layout',
    name: 'base-layout',
    component: () =>
      import(/* webpackChunkName: "base-layout" */ '@/views/user/base-layout'),
    meta: {
      hideInMenu: true
    },
    children: [
      {
        path: '/login',
        name: 'login',
        component: () =>
          import(/* webpackChunkName: "login" */ '@/views/user/login'),
        meta: {
          title: '登录',
          hideInMenu: true
        }
      },
      {
        path: '/register',
        name: 'register',
        component: () =>
          import(/* webpackChunkName: "register" */ '@/views/user/register'),
        meta: {
          title: '注册',
          hideInMenu: true
        }
      }
    ]
  },
  {
    path: '/error/:code',
    name: 'error',
    component: () =>
      import(/* webpackChunkName: "error" */ '../components/error'),
    meta: {
      title: '错误',
      hideInMenu: true
    }
  }
]
