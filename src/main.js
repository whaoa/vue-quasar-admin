import Vue from 'vue'
// 粒子背景
import VueParticles from 'vue-particles'

import QA from '@/plugins/qa'

import App from './App'
import router from './router'
import store from './store'
import './quasar'
import './mock'

import './styles/transition.scss'

Vue.use(VueParticles)
Vue.use(QA)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
