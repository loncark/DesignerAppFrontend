<template>
  <div id="designScreen">
    <div class="titlePart flex-row">
      <i class="pi pi-home"></i>
      <h1 class="big-title">Designs</h1>
    </div>
    <span v-if="loading">Loading...</span>
    <div v-else id="designCardList">
        <DesignCard v-for="(design, index) in designArray" :key="index" :design="design" @design-deleted="getAllDesigns"/>    
    </div>
  </div>
</template>
  
<script setup>
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
#designScreen {
  margin-left: 20px;
  margin-top: 10px;
}

.titlePart {
  justify-content: space-between;
  align-items: center;

  margin-bottom: 15px;
  width: 400px;
}
.titlePart i {
  font-size: 60px;
}

#designCardList {
    display: grid;
    grid-template-columns: 240px 240px 240px 240px;
    grid-gap: 50px 50px;
}
</style>

  