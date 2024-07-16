<template>
    <div id="trademarkScreen" class="flex-column">
        <div class="flex-row topBar">
            <InputText v-model="keyword" @keyup.enter="executeQuery" :class="{'invalid-input': !inputIsValid(keyword)}"></InputText>
            <Dropdown v-model="categoryObject" :options="categoryArray" optionLabel="category" placeholder="Filter" :highlightOnSelect="false" />
            <Button label="Search" icon="pi pi-search" @click="executeQuery"></Button>
        </div>

        <ProgressSpinner v-if="loading"></ProgressSpinner>

        <div v-else-if="store.trademark_count > 0" class="trademarkResults">
            <h4>Returned {{ store.trademark_count }} results for query "{{ store.trademark_input }}":</h4>
            <ResultCard v-for="(item, index) in store.trademark_items" :key="index" 
                :keyword="item.keyword"
                :owner="item.owners && item.owners.length > 0 ? item.owners[0].name : 'Unknown'"
                :description="item.description"
                :status="item.status_label"/>
        </div>

        <span v-else-if="!queryExecuted">Type in the keywords you would like to search the database for.</span>
        <span v-else>No results were found for given input.</span>
    </div>
</template>

<script setup>
import Dropdown from 'primevue/dropdown';
import Button from 'primevue/button';
import ResultCard from './ResultCard.vue';
import { ref, computed } from 'vue';
import { queryTESS } from '../../../api/TrademarkApi'
import { useStore } from '../../../store/Store';
import ProgressSpinner from 'primevue/progressspinner';
import { inputIsValid } from '../../../utils/validation';
import InputText from 'primevue/inputtext';
import { TRADEMARK_FILTERS } from '../../../utils/constants';
import { getCategoryKeywords } from '../../../utils/functions';

const store = useStore();
const categoryArray = ref(TRADEMARK_FILTERS);
const categoryObject = ref(store.trademark_category_object);

const loading = ref(false);
const keyword = ref(store.trademark_input);
const queryExecuted = computed(() => store.items === null ? false : true);

const executeQuery = async () => {
    try {
        loading.value = true;
        store.trademark_input = keyword.value;
        store.trademark_category_object = categoryObject.value;

        const response = await queryTESS(store.trademark_input);
        let allReturnedItems = response.items;
        let categoryKeywords = store.trademark_category_object['categoryKeywords'];

        if (categoryKeywords.length === 0) {
            store.trademark_items = allReturnedItems;
        } 
        else {
            store.trademark_items = allReturnedItems.filter(item => 
                categoryKeywords.some(keyword => item.description.toLowerCase().includes(keyword.toLowerCase()))
            );
        }
        
        store.trademark_count = store.trademark_items.length;

    } catch (error) {
        console.log(`Error: ${error.message}`); 
    } finally {
        loading.value = false;
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
    width: 180px;
    height: 100%;
    padding-left: 10px;
    margin-right: 10px;
}

.p-dropdown {
    align-items: center;
}
:deep(.p-dropdown-label) {
    height: fit-content;
}
.p-button {
    width: revert;
    padding: 0px 10px 0px 10px;
}

.trademarkResults>h4 {
    margin-bottom: 15px;
    margin-top: 5px;
}

.p-progress-spinner {
    top: 50vh;
    left: 70vw;
}
</style>