import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import ElementPlus from 'element-plus'
// import "element-plus/lib/theme-chalk/index.css"
import 'element-plus/dist/index.css'
import axios from 'axios'
// import echarts from 'echarts'
import * as echarts from 'echarts'
// axios.defaults.baseURL="/data"
const app = createApp(App)
app.use(router)
app.config.globalProperties.$echarts = echarts
app.config.globalProperties.$axios = axios
app.use(ElementPlus)
app.mount('#app')


