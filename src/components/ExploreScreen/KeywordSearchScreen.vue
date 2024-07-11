<template>
    <div id="keywordSearchScreen">
        <div class="searchBar flex-row">
            <InputText v-model="keyword" @keyup.enter="executeQuery"/>
            <Button label="Search" icon="pi pi-search" @click="executeQuery"></Button>
        </div>

        <span v-if="loading">Loading...</span>
        <span v-else-if="!queryWasExecuted">Awaiting input.</span>
        <span v-else-if="noRelatedQueriesWereFound && noInterestByRegionWasFound">No results found for given input.</span>

        <div v-else class="flex-row">

            <h4 v-if="noRelatedQueriesWereFound">No related queries were found.</h4>
            <div v-else class="queryList flex-column" >
                <h4>Popular queries related to "{{ store.keyword_search_keyword }}":</h4>
                <div class="queryItem" v-for="(query, index) in store.related_queries.slice(0, 25)" :key="index">
                    <span>{{ index + 1 }}</span>
                    <span>{{ query.query }}</span>
                    <span>+{{ query.extracted_value }}%</span>
                </div>
            </div>

            <h4 v-if="noInterestByRegionWasFound">No interest by region was found.</h4>
            <div v-else class="queryList flex-column">
                <h4>Countries "{{ store.keyword_search_keyword }}" has been searched in most:</h4>
                <div class="queryItem"  v-for="(item, index) in store.interest_by_region.slice(0, 25)" :key="index">
                    <span>{{ index + 1 }}</span>
                    <span>{{ item.location }}</span>
                    <span>{{ item.extracted_value }}</span>
                </div>
            </div>
        </div>
        
        
    </div>
</template>

<script setup>
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { queryRelatedQueries, queryInterestByRegion } from '../../api/TrendsApi';
import { ref, computed } from 'vue';
import { useStore } from '../../store/Store';

const store = useStore();
const keyword = ref(store.keyword_search_keyword);
const loading = ref(false);
const noRelatedQueriesWereFound = computed(() => store.related_queries === undefined);
const noInterestByRegionWasFound = computed(() => store.interest_by_region === undefined);
const queryWasExecuted = computed(() => store.related_queries === null? false : true);

const executeQuery = async () => {
    try {
        loading.value = true;
        store.keyword_search_keyword = keyword.value;

        const response = await queryRelatedQueries(keyword.value);
        const response2 = await queryInterestByRegion(keyword.value);

        store.related_queries = response.error? undefined : response.related_queries.rising;
        store.interest_by_region = response.error? undefined : response2.interest_by_region;
        
    } catch (error) {
        console.log(`Error: ${error.message}`);
    } finally {
        loading.value = false;
    }
};

</script>

<style scoped>
.queryList {
    margin-right: 50px;
}
.queryList>h4 {
    margin-bottom: 15px;
}
.queryItem {
    display: grid;
    grid-template-columns: 30px 230px 100px;
    margin-bottom: 5px;
    margin-left: 15px;
}
.queryItem:nth-child(1) {
    grid-column: 1;
}
.queryItem:nth-child(2) {
    grid-column: 2;
}
.queryItem:nth-child(3) {
    grid-column: 3;
}

:deep(.p-button-icon), 
:deep(.p-button-label) {
    margin: 0px 3px 0px 3px;
}
</style>