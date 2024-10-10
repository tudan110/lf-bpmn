import LfBpmn from './lf-bpmn'
// 存储组件列表
const components = [
    LfBpmn
]
/*
  定义install 方法，接收Vue作为参数，如果使用use注册插件，则所有的组件都将被注册
*/
const install = function (Vue) {
    // 判断是否安装
    if (install.installed) {
        return
    }
    // 遍历所有组件
    components.map(component => {
        Vue.component(component.name, component)
    })
}
// 判断是否引入文件
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}
export {
    LfBpmn
}
export default {
    install
}
