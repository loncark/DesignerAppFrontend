<template>
    <div id="topBar">
      <h1>Designs</h1>
      <Button label="New" icon="pi pi-plus" @click="getAllDesigns"></Button>
    </div>
    <div id="designCardList">
        <DesignCard v-for="(design, index) in array" :key="index" :design="design"/>    
    </div>
</template>
  
<script setup>
  import Button from 'primevue/button';
  import { ref } from 'vue';
  import { getAllDesignsFromStorage } from '../../api/FirebaseApi';
  import DesignCard from './DesignCard.vue';

  const loading = ref(false);
  const designArray = ref([1,2,3,4,5])

  const getAllDesigns = async () => {
    loading.value = true;
    const response = await getAllDesignsFromStorage();
    designArray.value = response;
    loading.value = false;
  }
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

  