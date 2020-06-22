import Vue from 'vue'
import Vuex from 'vuex'

import qadmin from './modules/qadmin'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    qadmin,
  },
})
