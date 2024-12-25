import Vue from 'vue'
import SvgIcon from '../../components/SvgIcon' // svg component

// register globally
console.log('注册 SvgIcon')
Vue.component('svg-icon', SvgIcon)

const requireAll = requireContext => requireContext.keys().map(requireContext)

// built-in icons
const req = require.context('./svgs', false, /\.svg$/)
requireAll(req)

// custom icons
const customIcons = require.context('@/assets/icons/svgs', false, /\.svg$/)
requireAll(customIcons)
