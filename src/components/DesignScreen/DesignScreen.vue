<template>
  <div id="designScreen">
    <div id="topBar">
      <h1 class="big-title">Designs</h1>
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
    grid-template-columns: 240px 240px 240px 240px;
    grid-gap: 50px 50px;
}
</style>

  