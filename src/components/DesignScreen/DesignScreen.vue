<template>
    <div id="topBar">
      <h1>Designs</h1>
      <Button label="New" icon="pi pi-plus"></Button>
    </div>
    <DesignCardList/>
</template>
  
<script setup>
  import Button from 'primevue/button';
  import DesignCardList from "./DesignCardList.vue"
</script>

<style scoped>
#topBar {
  display: flex;
  flex-direction: row;
}
</style>

  