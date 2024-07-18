<template>
  <div id="app" class="app-container">
    <DockMenu class="sticky-dock"/>
    <div class="main-content">
      <router-view></router-view>
    </div>
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

<style scoped>
.app-container {
  display: flex;
  min-height: 100vh;
}

.sticky-dock {
  position: sticky;
  top: 0;
  height: 100vh;
  
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.main-content {
  flex: 1;
}
</style>