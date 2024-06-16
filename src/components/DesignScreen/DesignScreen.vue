<template>
    <div id="topBar">
      <h1>Designs</h1>
      <Button label="New" icon="pi pi-plus"></Button>
    </div>
    <p v-if="loading">Loading...</p>
    <div v-else id="designCardList">
        <DesignCard v-for="(design, index) in designArray" :key="index" :design="design"/>    
    </div>
    
</template>
  
<script setup>
  import Button from 'primevue/button';
  import { ref, onMounted } from 'vue';
  import { getAllDesignsFromStorage } from '../../api/FirebaseApi';
  import DesignCard from './DesignCard.vue';

  const loading = ref(false);
  const designArray = ref([])

  const getAllDesigns = async () => {
    loading.value = true;
    const response = await getAllDesignsFromStorage();
    designArray.value = response;
    loading.value = false;
  }

  onMounted(() => {
    getAllDesigns();
});
</script>

<style scoped>
#topBar {
  display: flex;
  flex-direction: row;
}

#designCardList {
    display: grid;
    grid-template-columns: auto auto auto auto;
}
</style>

  