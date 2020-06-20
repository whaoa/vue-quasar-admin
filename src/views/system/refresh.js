export default {
  // 组件内路由守卫: 组件创建前调用，无法获取 this
  beforeRouteEnter (to, from, next) {
    // 可传入一个 callback 接收一个参数为组件实例
    next(vm => vm.$router.replace(from.fullPath))
  },
}
