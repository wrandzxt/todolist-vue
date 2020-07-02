import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// 自动聚焦
Vue.directive('focus', {
  bind: function () { 
 
  },
  inserted: function (el) {
    el.focus()

  },
  updated: function () {

  }
})
new Vue({
  render: h => h(App),

  mounted() {
    // alert('是时候展现真正的技术了')
  },
}).$mount('#app')

