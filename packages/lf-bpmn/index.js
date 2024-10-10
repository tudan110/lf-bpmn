// 引入组件
import LfBpmn from './LfBpmn.vue'

// 为组件提供 install 安装方法，供按需引入
LfBpmn.install = (Vue) => {
    Vue.component(LfBpmn.name, LfBpmn)
}

// 导出组件
export default LfBpmn
