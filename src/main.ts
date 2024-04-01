import { createApp } from 'vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

import pinia from '@/store/index'

import App from './App.vue'

import router from '@/router/index'
import '@/styles/index.scss'
// iconfont 字体图标
import '@/assets/iconfonts/iconfont.js'
import '@/permission'
// 全局指令
import directives from '@/directives/index'

const app = createApp(App)
app.use(router).use(ElementPlus, { locale: zhCn }).use(pinia).use(directives).mount('#app')
