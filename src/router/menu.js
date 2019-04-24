/**
 * 导航菜单数组，数组中每一个的元素可能包含以下几个属性
 *  title 标题，显示在文档标题、左侧导航菜单、面包屑导航中
 *  icon 图标，显示在左侧导航菜单
 *  [path] 对应的路由的path，作为父级菜单时省略
 *  [children] 子菜单，没有子菜单时省略
 *  [noBread] 在该组件不显示面包屑导航
 */
const menu = [
  {
    title: '首页',
    icon: 'home',
    path: '/home',
    noBread: true
  },
  {
    title: '1',
    icon: 'home',
    children: [
      {
        title: '5',
        icon: 'home',
        children: [
          {
            title: '6',
            icon: 'home',
            path: '/home'
          }
        ]
      }
    ]
  },
  {
    title: '2',
    icon: 'home',
    path: '/home',
    children: [
      {
        title: '3',
        icon: 'home',
        path: '/a'
      },
      {
        title: '4',
        icon: 'home',
        path: '/home'
      }
    ]
  },
  {
    title: '7',
    icon: 'home',
    path: '/home',
    children: [
      {
        title: '8',
        icon: 'home',
        path: '/a'
      }
    ]
  },
  {
    title: '7',
    icon: 'home',
    path: '/home',
    children: [
      {
        title: '8',
        icon: 'home',
        path: '/a'
      }
    ]
  },
  {
    title: '7',
    icon: 'home',
    path: '/home',
    children: [
      {
        title: '8',
        icon: 'home',
        path: '/a'
      }
    ]
  },
  {
    title: '7',
    icon: 'home',
    path: '/home',
    children: [
      {
        title: '8',
        icon: 'home',
        path: '/a'
      }
    ]
  },
  {
    title: '7',
    icon: 'home',
    path: '/home',
    children: [
      {
        title: '8',
        icon: 'home',
        path: '/a'
      }
    ]
  },
  {
    title: '7',
    icon: 'home',
    path: '/home',
    children: [
      {
        title: '8',
        icon: 'home',
        path: '/a'
      }
    ]
  },
  {
    title: '7',
    icon: 'home',
    path: '/home',
    children: [
      {
        title: '8',
        icon: 'home',
        path: '/a'
      }
    ]
  },
  {
    title: '7',
    icon: 'home',
    path: '/home',
    children: [
      {
        title: '8',
        icon: 'home',
        path: '/a'
      }
    ]
  },
  {
    title: '7',
    icon: 'home',
    path: '/home',
    children: [
      {
        title: '8',
        icon: 'home',
        path: '/a'
      }
    ]
  },
  {
    title: '7',
    icon: 'home',
    path: '/home',
    children: [
      {
        title: '8',
        icon: 'home',
        path: '/a'
      }
    ]
  }
]

export default menu
