import log from '@/utils/util.log'
import { setTitle, openPage, dateFormat } from '@/utils'

export default {
  async install (Vue) {
    // 设置为 false 以阻止 vue 在启动时生成生产提示
    // https://cn.vuejs.org/v2/api/#productionTip
    Vue.config.productionTip = false
    // 当前环境
    Vue.prototype.$env = process.env.NODE_ENV
    // 当前的 baseUrl
    Vue.prototype.$baseUrl = process.env.BASE_URL
    // 当前版本
    Vue.prototype.$version = process.env.VUE_APP_VERSION
    // 构建时间
    Vue.prototype.$buildTime = process.env.VUE_APP_BUILD_TIME
    // 工具插件
    Vue.prototype.$log = log
    Vue.prototype.$setTitle = setTitle
    Vue.prototype.$openPage = openPage
    Vue.prototype.$dateFormat = dateFormat
  },
}
