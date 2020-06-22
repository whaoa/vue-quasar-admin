const MainLayout = () => import('@/layouts/main')

/**
 * 路由配置文件
 *
 * ** 页面组件必须有 name 字段，QAdmin 依赖于 name 字段进行页面跳转 **
 *
 * QA 定义配置项：
 * meta {Object} - 路由信息配置对象
 * meta.icon {String} - 路由侧边栏图标 (详见: https://quasar.dev/vue-components/icon#Webfont-usage)
 * meta.title {String} - 路由页面标题
 * meta.hidden {Boolean} - 是否在侧边栏隐藏
 * meta.auth {Array<String>} - 路由权限配置
 * meta.href {String} - 外部链接
 * meta.cache {Boolean} - 页面缓存 需要保证组件内导出时有 name 属性, 该配置项仅可用于页面组件，有 children 属性的配置将会忽略
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
          auth: ['user'],
          cache: true,
        },
        component: () => import('@/views/About'),
      },
      {
        path: 'github',
        name: 'github',
        meta: {
          title: '代码仓库',
          icon: 'code',
          href: 'https://github.com/whaoa/vue-quasar-admin',
        },
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
  {
    path: '/refresh',
    name: 'refresh',
    meta: { title: '页面重载', hidden: true },
    component: () => import('@/views/system/refresh'),
  },
  {
    path: '/error',
    name: 'error',
    meta: { title: '错误', hidden: true },
    component: MainLayout,
    children: [
      {
        path: '403',
        name: '403',
        meta: { title: '403', hidden: true },
        component: () => import('@/views/error/403'),
      },
      {
        path: '404',
        name: '404',
        meta: { title: '404', hidden: true },
        component: () => import('@/views/error/404'),
      },
      {
        path: '500',
        name: '500',
        meta: { title: '500', hidden: true },
        component: () => import('@/views/error/500'),
      },
    ],
  },
  {
    path: '*',
    meta: { hidden: true },
    redirect: '/error/404',
  },
]

export default [
  ...pageRoutes,
  ...systemRoutes,
]
