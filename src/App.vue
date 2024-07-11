<template>
  <div id="app" class="flex-row">
    <DockMenu/>
    <router-view></router-view>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import DockMenu from './components/DockMenu.vue';

const theme = ref('light');

const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light';
};

watchEffect(() => {
  document.documentElement.setAttribute('data-theme', theme.value);
});
</script>

<style>
html {
  --text-light: #000000;
  --background-light: #f2f2f2;
  --primary-light: #ffd814;
  --secondary-light: #cecaca;
  --accent-light: #232f3e;

  --text-dark: #ffffff;
  --background-dark: #0d0d0d;
  --primary-dark: #ebc400;
  --secondary-dark: #353131;
  --accent-dark: #c1cddc;
}

html[data-theme="light"] {
  --text: var(--text-light);
  --background: var(--background-light);
  --primary: var(--primary-light);
  --secondary: var(--secondary-light);
  --accent: var(--accent-light);
}

html[data-theme="dark"] {
  --text: var(--text-dark);
  --background: var(--background-dark);
  --primary: var(--primary-dark);
  --secondary: var(--secondary-dark);
  --accent: var(--accent-dark);
}
</style>

