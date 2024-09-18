<template>
    <div id="etsyScreen">
        <div class="topBar flex-row">
            <InputText v-model="keyword" @keyup.enter="getProductsByKeyword" :class="{'invalid-input': !inputIsValid(keyword)}"></InputText>
            <Dropdown placeholder="Filter" v-model="selectedOrder" :options="orders" :highlightOnSelect="false"/>
            <Button icon="pi pi-search" label="Search" @click="getProductsByKeyword"></Button>
        </div>

        <ProgressSpinner v-if="loading"></ProgressSpinner>
        
        <span v-else-if="!queryWasExecuted">Awaiting input.</span>
        <span v-else-if="noResultsWereFound">No results have been found for the given input.</span>

        <div v-else>
            <div class="resultText flex-row">
                <h4>Search results for query "{{ store.etsy_keyword }}":</h4>
            </div>
            
            <div id="productList">
                <Product v-for="(product, index) in store.products" :key="index" :product="product"/>    
            </div>

            <div class="loadMoreContent">
                <Button v-if="!loadingMoreContent" label="Load more" severity="secondary" outlined @click="amendResults" :disabled="rateLimitExceeded" />
                <ProgressSpinner v-else/>
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
import { useStore } from '../../../store/store';
import ProgressSpinner from 'primevue/progressspinner';
import { orderBy } from '../../../utils/functions';
import { inputIsValid } from '../../../utils/validation';

const store = useStore();
const loading = ref(false);
const loadingMoreContent = ref(false);
const keyword = ref(store.etsy_keyword);

const noResultsWereFound = computed(() => store.products.length === 0? true : false);
const queryWasExecuted = computed(() => store.products === null? false : true);
const rateLimitExceeded = ref(false);

const orders = ref(['Default', 'Bestsellers only', 'Price ascending', 'Price descending', 'Rating ascending', 'Rating descending', 'Name A-Z', 'Name Z-A']);
const selectedOrder = ref(store.etsy_order);

const getProductsByKeyword = async () => {
    try {
        loading.value = true;
        store.etsy_keyword = keyword.value;
        store.etsy_order = selectedOrder.value;
        store.etsy_current_page = 1;

        const response = await queryEtsy(store.etsy_keyword);

        store.products = response.response;
        store.products = store.products.filter(product => product.reviews !== undefined && product.rating !== '');
        store.products = orderBy(store.products, store.etsy_order);

    } catch (error) {
        console.log(`Error: ${error.message}`);
    } finally {
        loading.value = false;
    }
  }

const amendResults = async () => {
    try {
        loadingMoreContent.value = true;
        store.etsy_current_page += 1;

        const response = await queryEtsy(store.etsy_keyword, store.etsy_current_page);

        let productsToAdd = orderBy(response.response, store.etsy_order);
        productsToAdd.filter(product => product.reviews !== undefined && product.rating !== '');
        store.products.push(...productsToAdd);

    } catch (error) {
        response.value = `Error: ${error.message}`;
    }
    finally {
        loadingMoreContent.value = false;
    }
}

</script>

<style scoped>
.topBar {
    align-items: center;
    height: 35px;
    margin-bottom: 15px;
}
:deep(.p-component) {
    text-align: left;
    height: 100%;
    width: 200px;
    padding-left: 10px;
    margin-right: 10px;
}
.p-button {
    width: revert;
    padding: 0px 10px 0px 10px;
}
.p-dropdown {
    align-items: center;
}
:deep(.p-dropdown-label) {
    height: fit-content;
}

.resultText {
    margin-bottom: 15px;
}

#productList {
    display: grid;
    grid-template-columns: 300px 300px 300px 300px;
    grid-gap: 20px 35px;
}

.loadMoreContent {
    height: fit-content;
    width: fit-content;
    margin: 20px auto 20px auto;
}
.loadMoreContent>.p-button {
    height: 35px;
    margin: revert;
}

#etsyScreen>.p-progress-spinner {
    position: fixed;
    top: 40vh;
    left: 45vw;
}
</style>