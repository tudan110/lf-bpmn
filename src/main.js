import Vue from 'vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import LfBpmn from '../packages'

Vue.use(Element)
Vue.use(LfBpmn)
// 在 App.vue 中引用，并启动项目查看

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
}).$mount('#app')
