<template>
    <div id="etsyScreen">
        <div class="searchBar flex-row">
            <InputText v-model="keyword"></InputText>
            <Button label="Search" @click="getProductsByKeyword"></Button>
        </div>

        <span v-if="loading">Loading...</span>

        <div v-else-if="store.products.length > 0">
            <div class="resultText flex-row">
                <h4>Search results for query "{{ store.etsy_keyword }}":</h4>
                <!--Dropdown placeholder="Filter by"></!--Dropdown-->
            </div>
            
            <div id="productList">
                <Product v-for="(product, index) in store.products" :key="index" :product="product"/>    
            </div>
        </div>

        <span v-else-if="!queryExecuted">Awaiting input.</span>
        <span v-else>No results have been found for the given keyword.</span>
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

const store = useStore();
const loading = ref(false);
const keyword = ref(store.etsy_keyword);
const queryExecuted = computed(() => store.products === null? false : true);

const getProductsByKeyword = async () => {
    try {
        loading.value = true;
        store.etsy_keyword = keyword.value;
        const response = await queryEtsy(keyword.value);
        store.products = response.response;

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
    grid-gap: 20px 20px;
}
</style>