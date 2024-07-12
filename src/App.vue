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


