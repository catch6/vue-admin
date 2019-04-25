import UserLayout from '@/views/user/UserLayout'

/**
 * 静态路由
 * 静态路由并不会显示在导航菜单中
 * 注意：静态路由默认都具有访问权限，对于需要权限控制的部分应该写在动态路由中
 * 静态路由可配置参数：
 * meta:{
 *   title：标题，用于文档标题
 * }
 */
export default [
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
