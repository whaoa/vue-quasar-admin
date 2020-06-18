import { isDev, log } from '@/utils'

export default {
  install (Vue) {
    function writeLog () {
      return (error, vm, info = '') => {
        Vue.nextTick(() => {
          if (!isDev) return
          log.danger('>>>>>> 错误信息 >>>>>>')
          console.log(info)
          log.danger('>>>>>> Vue 实例 >>>>>>')
          console.log(vm)
          log.danger('>>>>>> Error >>>>>>')
          console.log(error)
        })
      }
    }

    if (isDev) Vue.config.warnHandler = writeLog('warning')
    Vue.config.errorHandler = writeLog('danger')
  },
}
