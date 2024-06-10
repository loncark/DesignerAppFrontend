import { createRouter, createWebHistory } from 'vue-router';
import StartScreen from '../components/StartScreen/StartScreen.vue';
import GeminiScreen from '../components/GeminiScreen.vue';
import TrademarkScreen from '../components/TrademarkScreen/TrademarkScreen.vue';
import TrendScreen from '../components/TrendScreen/TrendScreen.vue';
import EtsyScreen from '../components/EtsyScreen/EtsyScreen.vue';
import ProductScreen from '../components/ProductScreen.vue';
import DesignScreen from '../components/DesignScreen/DesignScreen.vue';
import StableDiffusionScreen from '../components/StableDiffusionScreen.vue';

import NotFound from '../components/NotFound.vue';

const routes = [
  {
    path: '/',
    name: 'Start',
    component: StartScreen
  },
  {
    path: '/design',
    name: 'Design',
    component: DesignScreen
  },
  {
    path: '/sd',
    name: 'StableDiffusion',
    component: StableDiffusionScreen
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
    path: '/etsy',
    name: 'Etsy',
    component: EtsyScreen
  },
  {
    path: '/product',
    name: 'Product',
    component: ProductScreen
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
