<template>
    <div id="trademarkScreen">
        <div id="trademarkQuery">
            <InputText v-model="designStore.trademark_input"></InputText>
            <Button label="Search" icon="pi pi-search" @click="executeQuery"></Button>
        </div>

        <div v-if="!queryExecuted" id="trademarkResultPlaceholder">
            <span>Type in the keywords you would like to search the database for.</span>
        </div>

        <div v-else-if="designStore.trademark_count > 0" id="trademarkResults">
            <span>Returned {{ designStore.trademark_count }} results for query "{{ designStore.trademark_input }}":</span>
            <ResultCard v-for="(item, index) in designStore.trademark_items" :key="index" 
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
import { useDesignStore } from '../../../store/DesignStore';

const designStore = useDesignStore();
const queryExecuted = ref(designStore.items === null ? false : true);

const executeQuery = async () => {
    try {
        const response = await queryTESS(designStore.trademark_input);
        designStore.trademark_count = response.count
        designStore.trademark_items = response.items

    } catch (error) {
        console.log(`Error: ${error.message}`); 
    }

}

</script>

<style scoped>
#trademarkScreen {
    display: flex;
    flex-direction: column;
}

#trademarkQuery {
    display: flex;
    flex-direction: row;
}
</style>