<template>
  <div class="dock">
    <i class="pi pi-home dock-button" raised @click="goToDesignScreen"></i>
    <i class="pi pi-compass dock-button" raised @click="goToKeywordSearchScreen"></i>
    <i class="pi dock-button" raised @click="goToCreateScreen" 
        :class="{
        'pi-plus': store.design.design_id === null,
        'pi-pen-to-square': store.design.design_id !== null
      }"></i>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useStore } from '../store/Store';

const router = useRouter();
const store = useStore();

const goToDesignScreen = () => {
    router.push('/');
}
const goToKeywordSearchScreen = () => {
    router.push('/explore');
}
const goToCreateScreen = () => {
    router.push('/create');
}
</script>

<style scoped>
.dock {
    display: flex;
    flex-direction: column;
    padding: 20px 15px 20px 25px;
}

.dock-button {
  padding: 15px;
  margin: 5px;

  font-size: 1.5em;
  border-radius: 30px;
  border: 2px solid black;

  cursor: pointer;
}
</style>