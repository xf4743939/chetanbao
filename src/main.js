import Vue from 'vue'
import App from '@/App'
 import store from '@/store'
import MpvueRouterPatch from 'mpvue-router-patch'
import mpvueToastRegistry from 'mptoast/registry'


Vue.config.productionTip = false
App.store = store
App.mpType = 'app'
Vue.use(MpvueRouterPatch)
mpvueToastRegistry(Vue)

const app = new Vue({
  store,
  ...App
})
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    pages: [
    ],
    window: {
       "backgroundTextStyle":"light",
       "navigationBarBackgroundColor": "white",
       'navigationBarTextStyle':'black',
       "debug":true,
    }
  }
}
