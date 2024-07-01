import { createRouter, createWebHistory } from 'vue-router';
import CreateScreen from '../components/CreateScreen/CreateScreen.vue';
import GeminiScreen from '../components/GeminiScreen.vue';
import TrademarkScreen from '../components/TrademarkScreen/TrademarkScreen.vue';
import DesignScreen from '../components/DesignScreen/DesignScreen.vue';
import StableDiffusionScreen from '../components/StableDiffusionScreen.vue';
import ExploreScreen from '../components/ExploreScreen.vue';
import DockMenu from '../components/DockMenu.vue';
import NotFound from '../components/NotFound.vue';

const routes = [
  {
    path: '/',
    name: 'Designs',
    component: DesignScreen
  },
  {
    path: '/create',
    name: 'Create',
    component: CreateScreen
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
    path: '/explore',
    name: 'ExploreScreen',
    component: ExploreScreen
  },
  {
    path: '/trademark',
    name: 'Trademark',
    component: TrademarkScreen
  },
  {
    path: '/dock',
    name: 'Dock',
    component: DockMenu
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
