import Vue from 'vue'
import SvgIcon from '../../components/SvgIcon' // svg component

// register globally
console.log('注册 SvgIcon')
Vue.component('svg-icon', SvgIcon)

const req = require.context('./svgs', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
