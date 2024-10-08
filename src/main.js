import './assets/base.css'

import { createApp } from 'vue'
import App from './App.vue'
import vMemoryStats from './js/vMemoryStats'

const app = createApp(App)
app.use(vMemoryStats)
app.mount('#app')
