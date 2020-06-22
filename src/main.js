import Vue from 'vue'
// 粒子背景
import VueParticles from 'vue-particles'

import QAdmin from '@/plugins/qadmin'

import App from './App'
import router from './router'
import store from './store'
import created from './boot'
import './plugins/quasar'
import './mock'

import './styles/transition.scss'

Vue.use(VueParticles)
Vue.use(QAdmin)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  created,
  render: h => h(App),
}).$mount('#app')
