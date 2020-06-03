const MainLayout = () => import('@/layouts/main')

export default [
  {
    path: '/',
    name: 'index',
    meta: { title: '首页' },
    component: MainLayout,
    children: [
      {
        path: '',
        meta: {
          icon: 'home',
          title: 'Home',
        },
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
