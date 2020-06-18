const MainLayout = () => import('@/layouts/main')

/**
 * 路由配置文件
 * QA 定义配置项：
 * meta {Object} 路由信息配置对象
 * meta.icon {String} 路由侧边栏图标
 * meta.title {String} 路由页面标题
 * meta.hidden {Boolean} 是否在侧边栏隐藏
 * meta.auth {Array<String>} 路由权限配置
 */

export const pageRoutes = [
  {
    path: '/',
    name: 'index',
    meta: { title: '首页' },
    component: MainLayout,
    redirect: '/',
    children: [
      {
        path: '',
        meta: {
          icon: 'home',
          title: 'Home',
        },
        name: 'home',
        component: () => import('@/views/Home'),
      },
    ],
  },
  {
    path: '/about',
    name: 'about',
    meta: {
      title: '关于',
      caption: '了解更多信息',
    },
    redirect: '/about',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'about-index',
        meta: {
          title: '关于',
          icon: 'speed',
        },
        component: () => import('@/views/About'),
      },
    ],
  },
]

export const systemRoutes = [
  {
    path: '/login',
    name: 'login',
    meta: { title: '用户登录', hidden: true },
    component: () => import('@/views/login'),
  },
  // TODO: 403, 404
]

export default [
  ...pageRoutes,
  ...systemRoutes,
]
