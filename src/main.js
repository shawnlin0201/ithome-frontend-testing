import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import App from './App.vue'
import 'primeflex/primeflex.css'
import 'primevue/resources/themes/aura-light-green/theme.css'
import 'primeicons/primeicons.css'
import 'virtual:uno.css'
import './assets/style.css'

const app = createApp(App)
app.use(PrimeVue)
app.use(ToastService)
app.mount('#app')
