import Vue from 'vue'

import {
  Quasar,
  // 组件
  QAjaxBar,
  QIcon,
  QList,
  QItem,
  QItemLabel,
  QItemSection,
  QSeparator,
  QExpansionItem,
  QIntersection,
  QScrollArea,
  // 插件
  LoadingBar,
  AppFullscreen,
  // 指令
  Ripple,
} from 'quasar'

import lang from 'quasar/lang/zh-hans'

Vue.use(Quasar, {
  lang,
  config: {
    loadingBar: {
      color: 'blue-grey',
      size: '5px',
      position: 'top',
      skipHijack: true,
    },
  },
  components: {
    QAjaxBar,
    QList,
    QIcon,
    QItem,
    QItemLabel,
    QItemSection,
    QSeparator,
    QExpansionItem,
    QIntersection,
    QScrollArea,
  },
  directives: {
    Ripple,
  },
  plugins: {
    LoadingBar,
    AppFullscreen,
  },
})
