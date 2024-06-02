import { createRouter, createWebHistory } from 'vue-router';
import StartScreen from '../components/StartScreen.vue';
import NotFound from '../components/NotFound.vue';

const routes = [
  {
    path: '/',
    name: 'Start',
    component: StartScreen
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
