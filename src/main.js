import './style.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router/router.js';
import PrimeVue from 'primevue/config';
import { createPinia } from 'pinia';
import { initializeFirebase } from './utils/FirebaseConfig';

import './style.css'
import 'primeicons/primeicons.css'
import 'primevue/resources/primevue.min.css'    
import 'primevue/resources/themes/lara-light-amber/theme.css' 

async function startApp() {
  await initializeFirebase();

  const app = createApp(App);
  const pinia = createPinia();

  app.use(pinia);
  app.use(router);
  app.use(PrimeVue);

  app.mount('#app');
}

startApp();
