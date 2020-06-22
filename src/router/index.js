import Vue from 'vue'
import VueRouter from 'vue-router'
import { LoadingBar, Notify } from 'quasar'

import store from '@/store'
import config from '@/config'
import { setTitle, error, ls } from '@/utils'
import routes from './routes'

// fix vue-router NavigationDuplicated
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return VueRouterPush.call(this, location)
    .catch(err => err)
}
const VueRouterReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace (location) {
  return VueRouterReplace.call(this, location)
    .catch(err => err)
}

Vue.use(VueRouter)

const router = new VueRouter({ routes })

// 错误消息提示
const errorNotify = message => {
  Notify.create({
    message,
    icon: 'error',
    color: 'red-5',
  })
}

// 重定向到登录页
const nextToLogin = (to, next) => {
  store.dispatch('qadmin/user/clearLoginStatus')
  return next({
    name: config.loginPageName,
    query: { redirect: to.fullPath },
  })
}

// 路由守卫
router.beforeEach((to, from, next) => {
  LoadingBar.start()
  const { role } = ls.get('user_info') || {}
  const { token, timeStamp, expires } = ls.get('token') || {}

  if (to.name !== config.loginPageName) {
    // 如果路由中所有层级都不需要权限
    if (to.matched.every(r => (!(r.meta || {}).auth))) return next()
    // 需要权限
    // 未登录
    if (!token) {
      errorNotify('检测到您还未登录，请登录后重试')
      return nextToLogin(to, next)
    }
    // 登录状态过期
    if (token && timeStamp + expires < Date.now()) {
      errorNotify('检测到您的登录状态已过期，请重新登录')
      return nextToLogin(to, next)
    }
    if (role === 'admin') return next()
    // auth 配置类型检测
    if (Object.prototype.toString.call(to.meta.auth).slice(8, -1) !== 'Array') {
      error.create(`Vue Router Auth Config: [router-name: ${to.name}] 参数类型不是 Array`)
    }
    // 没有权限
    if (!to.meta.auth.includes(role)) return next({ name: '403' })
    // 有权限
    next()
  } else {
    // 没有登录 去 登录页
    if (!token) return next()
    // 已登录未过期 去 登录
    if (timeStamp + expires > Date.now()) return next({ name: config.homePageName })
    // 已登录已过期 去 登录
    next()
  }
})

router.afterEach(to => {
  // 进度条
  LoadingBar.stop()
  // 记录打开新标签页
  store.commit('qadmin/page/open', to)
  // 更改标题
  setTitle(to.meta.title)
})

export default router
