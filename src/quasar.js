import Vue from 'vue'

import {
  Quasar,
  LoadingBar,
  QAjaxBar,
} from 'quasar'

import lang from 'quasar/lang/zh-hans'

Vue.use(Quasar, {
  lang,
  config: {
    loadingBar: {
      color: 'blue',
      size: '5px',
      position: 'top',
      skipHijack: true,
    },
  },
  components: {
    QAjaxBar,
  },
  directives: {},
  plugins: {
    LoadingBar,
  },
})
