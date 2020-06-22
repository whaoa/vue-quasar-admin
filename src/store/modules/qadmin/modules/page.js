import config from '@/config'
import router from '@/router'
import routes, { systemRoutes } from '@/router/routes'
import { filterRoutes, flatRoutes } from '@/utils'

// 不在Tab栏显示的路由列表
const notSave = systemRoutes.map(i => i.name)
notSave.push(config.homePageName)

export default {
  namespaced: true,
  state: {
    // 路由配置列表
    routes: [],
    // 已打开标签页列表
    tabs: [],
    // 激活标签页索引
    activeIndex: -1,
  },
  getters: {
    // 激活标签页信息
    active (state) {
      return {
        index: state.activeIndex,
        active: state.tabs[state.activeIndex],
      }
    },
    // 可缓存页面组件名称
    cache (state) {
      return flatRoutes(state.routes)
        .map(i => ((i.meta || {}).cache ? i.componentName : undefined))
        .filter(i => i)
    },
  },
  mutations: {
    /**
     * 打开新标签页
     * @param state {Object} - Vuex Store 数据
     * @param route {Object} - Vue Router 对象
     */
    open (state, route) {
      if (!route) return
      if (notSave.includes(route.name)) return
      // 查询是否已打开过
      const opened = state.tabs.findIndex(i => i.fullPath === route.fullPath)
      // 如果没打开过
      if (opened === -1) state.tabs.push(route)
      // 如果打开过
      else state.activeIndex = opened
    },

    /**
     * 关闭一个标签页
     * @param state {Object} - Vuex Store 数据
     * @param tabIndex {Number} - 要关闭标签页的索引
     */
    async closeOne (state, tabIndex) {
      if (tabIndex === undefined) return
      // 如果没有已打开的标签页
      if (!state.tabs.length) return
      // 删除该标签页
      state.tabs.splice(tabIndex, 1)
      // 如果关闭的标签页在激活标签页的前面
      if (state.activeIndex >= tabIndex) state.activeIndex -= 1
      // 跳转页面
      const route = {}
      const active = state.tabs[state.activeIndex]
      // 如果还有已打开的标签页
      if (active) route.path = active.fullPath
      // 如果已打开标签页列表为空
      else route.name = config.homePageName
      await router.push(route)
    },

    /**
     * 关闭两侧标签页
     * @param state {Object} - Vuex Store 数据
     * @param side {String} - 侧边名称，'left'/'right'
     */
    closeSide (state, side) {
      // 如果关闭左边
      if (side === 'left') state.tabs = state.tabs.slice(state.activeIndex)
      // 如果关闭右边
      else if (side === 'right') state.tabs = state.tabs.slice(0, state.activeIndex)
    },

    /**
     * 关闭所有非激活标签页
     * @param state {Object} - Vuex Store 数据
     */
    closeOthers (state) {
      state.tabs = [state.tabs[state.activeIndex]]
      state.activeIndex = 0
    },

    /**
     * 关闭所有标签页
     * @param state
     */
    async closeAll (state) {
      state.tabs = []
      state.activeIndex = -1
      await router.push({ name: config.homePageName })
    },

    /**
     * 生成权限路由列表
     * @param state {Object} - Vuex Store 数据
     * @param routesArray {Array} - 处理后的路由配置数组
     */
    setRoutes (state, routesArray = []) {
      state.routes = routesArray
    },
  },
  actions: {
    /**
     * 处理权限路由配置
     * @param commit {Function}
     * @param rootState {Object} Store 根数据
     * @param role {String} - 账号权限信息
     * @returns {Promise<void>}
     */
    async compileRoutes ({ commit, rootState }, role) {
      const routesArray = await filterRoutes(routes, role || rootState.qadmin.user.role)
      commit('setRoutes', routesArray)
    },
  },
}
