import { createRouter, createWebHistory } from 'vue-router';
import CreateScreen from '../components/CreateScreen/CreateScreen.vue';
import DesignScreen from '../components/DesignScreen/DesignScreen.vue';
import ExploreScreen from '../components/ExploreScreen/ExploreScreen.vue';
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
    path: '/explore',
    name: 'ExploreScreen',
    component: ExploreScreen
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
