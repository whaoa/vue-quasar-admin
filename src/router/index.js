import Vue from 'vue'
import VueRouter from 'vue-router'

import { LoadingBar } from 'quasar'

import { setTitle } from '@/utils'

import routes from './routes'

// fix vue-router NavigationDuplicated
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return VueRouterPush.call(this, location).catch(err => err)
}
const VueRouterReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace (location) {
  return VueRouterReplace.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const router = new VueRouter({
  routes,
})

// 路由拦截
// TODO 权限验证
router.beforeEach((to, from, next) => {
  LoadingBar.start()
  next()
})

router.afterEach(to => {
  // 进度条
  LoadingBar.stop()
  // 更改标题
  setTitle(to.meta.title)
})

export default router
