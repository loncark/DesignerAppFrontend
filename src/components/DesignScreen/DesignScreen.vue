<template>
  <div id="designScreen">
    <div id="topBar">
      <h1>Designs</h1>
      <Button label="New" icon="pi pi-plus" @click="goToCreateScreen"></Button>
    </div>
    <span v-if="loading">Loading...</span>
    <div v-else id="designCardList">
        <DesignCard v-for="(design, index) in designArray" :key="index" :design="design" @design-deleted="getAllDesigns"/>    
    </div>
  </div>
</template>
  
<script setup>
  import Button from 'primevue/button';
  import { ref, onMounted } from 'vue';
  import { getAllDesignsFromStorage } from '../../api/FirebaseApi';
  import DesignCard from './DesignCard.vue';
  import { useRouter } from 'vue-router';
  import { useStore } from '../../store/Store';

  const loading = ref(false);
  const designArray = ref([])

  const router = useRouter();
  const store = useStore();

  const getAllDesigns = async () => {
    loading.value = true;
    const response = await getAllDesignsFromStorage();
    designArray.value = response;
    loading.value = false;
  }

  onMounted(() => {
    getAllDesigns();
});

const goToCreateScreen = () => {
  store.resetDesign();
  store.resetCreateScreen();
  router.push('/create');
};
</script>

<style scoped>
#designScreen {
  margin-left: 20px;
  margin-top: 10px;
}

#topBar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  margin-bottom: 15px;
  width: 210px;
}

#designCardList {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
}
</style>

  