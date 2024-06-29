
<template>
  <div class="flex-column dock">
    <Button icon="pi pi-home" raised @click="goToDesignScreen" class="dock-button"></Button>
    <Button icon="pi pi-search" raised @click="goToKeywordSearchScreen" class="dock-button"></Button>
    <Button icon="pi pi-plus" raised @click="goToCreateScreen" class="dock-button"></Button>
  </div>
</template>

<script setup>
import Button from 'primevue/button';
import { useRouter } from 'vue-router';

const router = useRouter();

const goToDesignScreen = () => {
    router.push('/');
}
const goToKeywordSearchScreen = () => {
    router.push('/keywordSearch');
}
const goToCreateScreen = () => {
    router.push('/create');
}
</script>

<style scoped>
.dock {
    width: fit-content;
    position: fixed;
    right: 10px;
    top: 230px;
}

.dock-button {
  width: 50px;
  height: 50px;
  margin: 5px;

  border-radius: 30px;
}
</style>
