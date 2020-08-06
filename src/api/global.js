// 导入组件
import myApple from '@/components/common/Header.vue'

export default (Vue) => {
    // 注册组件
    // 使用Vue.component()注册组件时，全局id自动作为组件的名称
    // 也就是说，此时第一参数为组件的名称
    Vue.component('vHead', myApple)
}
