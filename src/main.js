import './style.css'
import { createApp } from 'vue'; 
import App from './App.vue';
import router from './router/router.js';
import PrimeVue from 'primevue/config';
import { createPinia } from 'pinia';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(PrimeVue);
app.mount('#app');
