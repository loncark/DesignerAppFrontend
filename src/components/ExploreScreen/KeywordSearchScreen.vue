<template>
    <div id="keywordSearchScreen">
        <div class="searchBar">
            <InputText v-model="keyword"/>
            <Button label="Search" @click="executeQuery"></Button>
        </div>

        <span v-if="loading">Loading...</span>

        <div class="flex-row" v-else-if="!notFound">
            <div id="relatedQueryList" >
                <p>Popular queries related to "{{ store.keyword_search_keyword }}":</p>
                <div class="relatedQueryItem" v-for="(query, index) in store.related_queries" :key="index">
                    <span>{{ index }}</span>
                    <span>{{ query.query }}</span>
                    <span>+{{ query.extracted_value }}%</span>
                </div>
            </div>

            <div id="interestByRegionList">
                <p>Countries "{{ store.keyword_search_keyword }}" has been searched in most:</p>
                <div class="interestByRegionItem"  v-for="(item, index) in store.interest_by_region" :key="index">
                    <span>{{ index }}</span>
                    <span>{{ item.location }}</span>
                    <span>{{ item.extracted_value }}</span>
                </div>
            </div>
        </div>
        
        <span v-else-if="!queryExecuted">Awaiting input.</span>
        <span v-else>No results found for given keyword.</span>
    </div>
</template>

<script setup>
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { queryRelatedQueries, queryInterestByRegion } from '../../api/TrendsApi';
import { ref } from 'vue';
import { useStore } from '../../store/Store';

const store = useStore();
const keyword = ref(store.keyword_search_keyword);
const loading = ref(false);
const notFound = ref(store.related_queries && store.related_queries.length > 0? false : true);
const queryExecuted = ref(store.related_queries === null? false : true);

const executeQuery = async () => {
    try {
        loading.value = true;
        store.keyword_search_keyword = keyword.value;
        const response = await queryRelatedQueries(keyword.value);
        const response2 = await queryInterestByRegion(keyword.value);

        if (response.related_queries && response2.interest_by_region) {
            store.related_queries = response.related_queries.rising;
            store.interest_by_region = response2.interest_by_region;
            notFound.value = false;
        }
        else { 
            notFound.value = true;
        }
        loading.value = false;
        queryExecuted.value = true;
        
    } catch (error) {
        response.value = `Error: ${error.message}`;
    }
};

</script>

<style scoped>
#keywordSearchScreen>.searchBar {
    display: flex;
    flex-direction: row;
}
</style>