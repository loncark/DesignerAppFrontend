<template>
    <div id="etsyScreen">
        <div class="searchBar">
            <InputText v-model="keyword"></InputText>
            <Button label="Search" icon="pi pi-search" @click="getProductsByKeyword"></Button>
        </div>

        <span v-if="loading">Loading...</span>

        <div v-else-if="productArray.length > 0">
            <div class="flex-row">
                <span>Search results for query "{{ keyword }}":</span>
                <Dropdown placeholder="Filter by"></Dropdown>
            </div>
            
            <div id="productList">
                <Product v-for="(product, index) in productArray" :key="index" :product="product"/>    
            </div>
        </div>

        <span v-else>No results have been found for the given keyword.</span>
    </div>
</template>

<script setup>
import Product from './Product.vue';
import Dropdown from 'primevue/dropdown';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { queryEtsy } from '../../api/EtsyApi';
import { ref } from 'vue';

const loading = ref(false);
const productArray = ref([]);
const keyword = ref('');

const getProductsByKeyword = async () => {
    loading.value = true;
    const response = await queryEtsy(keyword.value);
    productArray.value = response.products;
    loading.value = false;
  }

</script>

<style scoped>

#etsyScreen>.searchBar {
    display: flex;
    flex-direction: row;
}

#productList {
    display: grid;
    grid-template-columns: auto auto auto auto;
}
</style>