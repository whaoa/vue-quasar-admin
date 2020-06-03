import Vue from 'vue'

import QA from '@/plugins/qa'

import App from './App'
import router from './router'
import store from './store'
import './quasar'

Vue.use(QA)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
