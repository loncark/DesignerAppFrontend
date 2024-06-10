<template>
    <div id="trademarkScreen">
        <div id="trademarkQuery">
            <InputText v-model="keyword"></InputText>
            <Button label="Search" icon="pi pi-search" @click="executeQuery"></Button>
        </div>

        <div v-if="!queryExecuted" id="trademarkResultPlaceholder">
            <p>Type in the keywords you would like to search the database for.</p>
        </div>

        <div v-else id="trademarkResults">
            <p>Returned {{ count }} results for query "{{ keyword }}":</p>
            <ResultCard v-for="(item, index) in items" :key="index" 
                :keyword="item.keyword"
                :owner="item.owners && item.owners.length > 0 ? item.owners[0].name : 'Unknown'"
                :description="item.description"
                :status="item.status_label"/>
        </div>
    </div>
</template>

<script setup>
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import ResultCard from './ResultCard.vue';
import { ref } from 'vue';
import { queryTESS } from '../../api/TrademarkApi'

const count = ref(0);
const keyword = ref ('');
const queryExecuted = ref(false);
const items = ref([]);

const executeQuery = async () => {
    try {
        const response = await queryTESS(keyword.value);
        queryExecuted.value = true;
        count.value = response.count
        items.value = response.items

    } catch (error) {
        response.value = `Error: ${error.message}`;
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