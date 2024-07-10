<template>
    <div id="trademarkScreen" class="flex-column">
        <div class="searchBar flex-row">
            <InputText v-model="store.trademark_input"></InputText>
            <Button label="Search" icon="pi pi-search" @click="executeQuery"></Button>
        </div>

        <div v-if="!queryExecuted">
            <span>Type in the keywords you would like to search the database for.</span>
        </div>

        <div v-else-if="store.trademark_count > 0" class="trademarkResults">
            <h4>Returned {{ store.trademark_count }} results for query "{{ store.trademark_input }}":</h4>
            <ResultCard v-for="(item, index) in store.trademark_items" :key="index" 
                :keyword="item.keyword"
                :owner="item.owners && item.owners.length > 0 ? item.owners[0].name : 'Unknown'"
                :description="item.description"
                :status="item.status_label"/>
        </div>
        <span v-else>No results were found for given input.</span>
    </div>
</template>

<script setup>
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import ResultCard from './ResultCard.vue';
import { ref } from 'vue';
import { queryTESS } from '../../../api/TrademarkApi'
import { useStore } from '../../../store/Store';

const store = useStore();
const queryExecuted = ref(store.items === null ? false : true);

const executeQuery = async () => {
    try {
        const response = await queryTESS(store.trademark_input);
        store.trademark_count = response.count
        store.trademark_items = response.items

    } catch (error) {
        console.log(`Error: ${error.message}`); 
    }

}

</script>

<style scoped>
.searchBar {
    width: 380px;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
}
.searchBar .p-component {
    height: 35px;
    text-align: left;
    margin-right: 10px;
    margin-left: 0px;
    padding-left: 10px;
}

.trademarkResults>h4 {
    margin-bottom: 15px;
}
</style>