import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { TroisJSVuePlugin } from 'troisjs'

import './styles/scss/abstracts/variables.scss'



createApp(App).use(router).use(TroisJSVuePlugin).mount('#app')