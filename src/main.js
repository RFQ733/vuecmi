import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import ElementPlus from 'element-plus'
import * as clay from 'claygl'
window.clay = clay // 将clay暴露到全局
// import "element-plus/lib/theme-chalk/index.css"
import 'element-plus/dist/index.css'
import axios from 'axios'
// import echarts from 'echarts'
import * as echarts from 'echarts'
// import * as echarts from 'echarts/core'


import { GraphChart, PieChart } from 'echarts/charts'
import { TooltipComponent, GridComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'


// 注册必须的组件
echarts.use([
  GraphChart,
  PieChart,
  
  TooltipComponent,
  GridComponent,
  CanvasRenderer
])

// 在组件初始化部分注册扩展
// echarts.use([WordCloudChart])
// axios.defaults.baseURL="/data"
const app = createApp(App)
app.use(router)
app.config.globalProperties.$echarts = echarts
app.config.globalProperties.$axios = axios
app.use(ElementPlus)
app.mount('#app')


