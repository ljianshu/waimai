// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { Button } from 'mint-ui'
import App from './App'
import VueLazyload from 'vue-lazyload'
import router from './router'
import store from './store'

import './mock/mockServer'
import loading from './common/imgs/loading.gif'

// 注册全局组件标签
Vue.component(Button.name, Button)
Vue.use(VueLazyload, {
  // 内部自定义一个指令lazy
  loading
})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
