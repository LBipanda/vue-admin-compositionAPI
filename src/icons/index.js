import Vue from 'vue';
import SvgIcon from './SvgIcon'
// 自定义全局组件
Vue.component('svg-icon',SvgIcon)
/**
 * require.context读取指定目录下的文件
 * 参数
 * 第一个，目录
 * 第二个，是否遍历自己目录
 * 第三个，定义遍历文件规则
 */
const req = require.context('./svg', false, /\.svg$/);
const requireAll = (requireContext) => {
    return requireContext.keys().map(requireContext)
};
requireAll(req)