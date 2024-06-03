import { createRouter, createWebHistory } from 'vue-router';
import StartScreen from '../components/StartScreen/StartScreen.vue';
import GeminiScreen from '../components/GeminiScreen.vue';
import TrademarkScreen from '../components/TrademarkScreen.vue';
import TrendScreen from '../components/TrendScreen/TrendScreen.vue';

import NotFound from '../components/NotFound.vue';

const routes = [
  {
    path: '/',
    name: 'Start',
    component: StartScreen
  },
  {
    path: '/gemini',
    name: 'Gemini',
    component: GeminiScreen
  },
  {
    path: '/trends',
    name: 'Trends',
    component: TrendScreen
  },
  {
    path: '/trademark',
    name: 'Trademark',
    component: TrademarkScreen
  },
  {
    path: '/404',
    name: 'NotFound',
    component: NotFound
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
