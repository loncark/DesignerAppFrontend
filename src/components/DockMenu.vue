<template>
  <div class="dock">
    <Button icon="pi pi-home" raised rounded severity="contrast" @click="handleOnHomeClick" :outlined="active !== 0"></Button>
    <Button icon="pi pi-compass" raised rounded severity="contrast" @click="handleOnExploreClick" :outlined="active !== 1"></Button>
    <Button v-if="store.design.design_id === null" icon="pi pi-plus" raised rounded severity="contrast" @click="handleOnCreateClick" :outlined="active !== 2"></Button>
    <Button v-else icon="pi pi-pen-to-square" raised rounded severity="contrast" @click="handleOnCreateClick" :outlined="active !== 2"></Button>
  </div>
</template>

<script setup>
import Button from 'primevue/button';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '../store/Store';

const router = useRouter();
const store = useStore();
const active = computed(() => store.main_active_tab);

const changeActiveTab = (keyword) => {
    store.main_active_tab = keyword;
}

const handleOnHomeClick = () => {
  changeActiveTab(0);
  router.push('/');
}
const handleOnExploreClick = () => {
  changeActiveTab(1);
  router.push('/explore');
}
const handleOnCreateClick = () => {
  changeActiveTab(2);
  router.push('/create');
}
</script>

<style scoped>
.dock {
    display: flex;
    flex-direction: column;
    padding: 20px 15px 20px 25px;
}

:deep(.pi) {
  font-size: 1.5rem;
}
:deep(.p-button) {
  padding: 28px;
  margin: 5px;
}
</style>