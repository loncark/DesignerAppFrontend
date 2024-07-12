<template>
    <div id="etsyScreen">
        <div class="searchBar flex-row">
            <InputText v-model="keyword" @keyup.enter="getProductsByKeyword"></InputText>
            <Button icon="pi pi-search" label="Search" @click="getProductsByKeyword"></Button>
        </div>

        <ProgressSpinner v-if="loading"></ProgressSpinner>
        
        <span v-else-if="!queryWasExecuted">Awaiting input.</span>
        <span v-else-if="noResultsWereFound">No results have been found for the given input.</span>

        <div v-else>
            <div class="resultText flex-row">
                <h4>Search results for query "{{ store.etsy_keyword }}":</h4>
                <!--Dropdown placeholder="Filter by"></!--Dropdown-->
            </div>
            
            <div id="productList">
                <Product v-for="(product, index) in store.products" :key="index" :product="product"/>    
            </div>
        </div>

        
    </div>
</template>

<script setup>
import Product from './Product.vue';
import Dropdown from 'primevue/dropdown';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { queryEtsy } from '../../../api/EtsyApi';
import { ref, computed } from 'vue';
import { useStore } from '../../../store/Store';
import ProgressSpinner from 'primevue/progressspinner';

const store = useStore();
const loading = ref(false);
const keyword = ref(store.etsy_keyword);
const noResultsWereFound = computed(() => store.products.length === 0? true : false);
const queryWasExecuted = computed(() => store.products === null? false : true);

const getProductsByKeyword = async () => {
    try {
        loading.value = true;
        store.etsy_keyword = keyword.value;
        const response = await queryEtsy(keyword.value);
        store.products = response.response;
        store.products = store.products.filter(product => product.reviews !== undefined && product.rating !== '');

    } catch (error) {
        console.log(`Error: ${error.message}`);
    } finally {
        loading.value = false;
    }
  }

</script>

<style scoped>
.resultText {
    margin-bottom: 15px;
}

#productList {
    display: grid;
    grid-template-columns: auto auto auto auto;
    grid-gap: 20px 25px;
}

:deep(.p-button-icon), 
:deep(.p-button-label) {
    margin: 0px 3px 0px 3px;
}
</style>