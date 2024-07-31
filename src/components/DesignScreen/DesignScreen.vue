<template>
  <div id="designScreen">
    <div class="titlePart flex-row">
      <i class="pi pi-home"></i>
      <h1 class="big-title">Designs</h1>
    </div>

    <ProgressSpinner v-if="loading"></ProgressSpinner>

    <div v-else id="designCardList">
        <DesignCard v-for="(design, index) in designArray" :key="index" :design="design" @design-deleted="handleDesignDeleted"/>    
    </div>

  </div>
</template>
  
<script setup>
  import { ref, onMounted } from 'vue';
  import { getAllDesignsFromStorage } from '../../api/FirebaseApi';
  import DesignCard from './DesignCard.vue';
  import ProgressSpinner from 'primevue/progressspinner';
  import { useStore } from '../../store/Store';
  
  const loading = ref(false);
  const designArray = ref([]);
  const store = useStore();

  const getAllDesigns = async () => {
    loading.value = true;
    const response = await getAllDesignsFromStorage();
    designArray.value = response;
    loading.value = false;
  }

  const handleDesignDeleted = (deletedId) => {
    if(store.design.design_id === deletedId) {
        store.resetCreateScreen();
    }
    getAllDesigns();
}


  onMounted(() => {
    store.main_active_tab = 0;
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

  margin-bottom: 20px;
  width: 400px;
}
.titlePart i {
  font-size: 60px;
}

#designCardList {
    display: grid;
    grid-template-columns: 240px 240px 240px 240px;
    grid-gap: 25px 50px;
}

.p-progress-spinner {
  position: fixed;
  top: 40vh;
  left: 45vw;
}
</style>

  