<template>
    <div id="trademarkScreen" class="flex-column">
        <div class="searchBar flex-row">
            <InputText v-model="keyword"></InputText>
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
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import ResultCard from './ResultCard.vue';
import { ref, computed } from 'vue';
import { queryTESS } from '../../../api/TrademarkApi'
import { useStore } from '../../../store/Store';
import ProgressSpinner from 'primevue/progressspinner';

const store = useStore();
const loading = ref(false);
const keyword = ref(store.trademark_input);
const queryExecuted = computed(() => store.items === null ? false : true);

const executeQuery = async () => {
    try {
        loading.value = true;
        store.trademark_input = keyword.value;
        const response = await queryTESS(store.trademark_input);
        store.trademark_count = response.count
        store.trademark_items = response.items

    } catch (error) {
        console.log(`Error: ${error.message}`); 
    } finally {
        loading.value = false;
    }
}

</script>

<style scoped>
.trademarkResults>h4 {
    margin-bottom: 15px;
}



.p-progress-spinner {
    top: 50vh;
    left: 70vw;
}
</style>