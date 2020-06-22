import { Dialog, Notify } from 'quasar'
import router from '@/router'
import { ls } from '@/utils'
import { Login } from '@/api/user'
import config from '@/config'

export default {
  namespaced: true,
  state: {
    // 用户信息
    userInfo: {},
    // token 信息
    token: {},
  },
  mutations: {
    // 设置用户信息
    setUserInfo (state, payload) {
      // 缓存到本地
      if (!payload) ls.remove('user_info')
      else ls.set('user_info', payload)
      // 保存到 Vuex
      state.userInfo = payload || {}
    },
    // 设置 token
    setToken (state, payload) {
      // 如果参数为空
      if (!payload) {
        ls.remove('token')
        state.token = {}
        return
      }
      // 如果参数是字符串
      if (typeof payload === 'string') {
        const token = {
          token: payload,
          timeStamp: Date.now(),
          expires: config.tokenExpires,
        }
        ls.set('token', token)
        state.token = token
      } else {
        // 如果参数是对象
        ls.set('token', payload)
        state.token = payload
      }
    },
    // 清除缓存的登录状态信息
    clearStatus (state) {
      ls.remove('token')
      ls.remove('user_info')
      state.token = {}
      state.userInfo = {}
    },
  },
  actions: {
    /**
     * 用户登录
     * @param store {Object} - Vuex Store 示例
     * @param store.commit {Function} - 提交 mutation
     * @param payload {Object} - 数据对象
     * @param payload.username {String} - 用户账号
     * @param payload.password {String} - 用户密码
     * @returns {Promise<Object>}
     */
    async login ({ dispatch }, { username = '', password = '' } = {}) {
      const result = await Login({ username, password })
      // 初始化登录状态
      await dispatch('initLoginStatus', { userInfo: result, token: result.token })
      return result
    },
    /**
     * 退出登录
     * @param store {Object} - Vuex Store 示例
     * @param store.commit {Function} - 提交 mutation
     * @param payload {Object} - 数据对象
     * @param [payload.needConfirm=false] {Boolean} - 是否需要确认弹窗
     */
    logout ({ dispatch }, { needConfirm = false } = {}) {
      function logout () {
        // 清空登录状态信息
        dispatch('clearLoginStatus')
        // 跳转路由
        router.push({ name: 'login' })
        // 消息提示
        Notify.create('退出登录成功！')
      }

      // 是否需要确认
      if (needConfirm) {
        logout()
        return
      }
      Dialog.create({
        title: '退出登录',
        message: '确定要退出当前登录状态吗？',
        cancel: true,
        persistent: true, // 禁止空白处/ESC关闭
      })
        .onOk(() => logout())
        .onCancel(() => Notify.create({ message: '取消注销操作' }))
    },

    /**
     * 清空所有登录状态
     * @param commit {Function}
     * @param dispatch {Function}
     */
    clearLoginStatus ({ commit, dispatch }) {
      commit('clearStatus')
      dispatch('qadmin/page/compileRoutes', undefined, { root: true })
    },
    /**
     * 初始化登录状态
     * @param commit {Function}
     * @param dispatch {Function}
     * @param userInfo {Object} - 用户信息
     * @param token {Object | String} - 用户登录 token 信息
     */
    initLoginStatus ({ commit, dispatch }, { userInfo, token }) {
      // 设置 token
      commit('setToken', token)
      // 设置用户细腻
      commit('setUserInfo', userInfo)
      // 处理路由权限
      dispatch('qadmin/page/compileRoutes', userInfo.role, { root: true })
    },
  },
}
