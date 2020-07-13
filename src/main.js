import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false;

// 组件通信 中介
Vue.prototype.$bus = new Vue

// 引入element
import ElementUI from 'element-ui'; // 组件
import 'element-ui/lib/theme-chalk/index.css'; // 样式
Vue.use(ElementUI);

//引入Echarts
import echarts from 'echarts'

// 引入iconfont
import '@/assets/fonts/iconfont.css'
Vue.prototype.$echarts = echarts
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

