<template>
    <div id="keywordSearchScreen">
        <div class="searchBar">
            <InputText v-model="keyword"/>
            <Button label="Search" @click="executeQuery"></Button>
        </div>

        <span v-if="loading">Loading...</span>

        <div class="flex-row" v-else-if="!notFound">
            <div id="relatedQueryList" >
                <p>Popular queries related to "{{ keyword }}":</p>
                <div class="relatedQueryItem" v-for="(query, index) in related_queries" :key="index">
                    <span>{{ index }}</span>
                    <span>{{ query.query }}</span>
                    <span>+{{ query.extracted_value }}%</span>
                </div>
            </div>

            <div id="interestByRegionList">
                <p>Countries "{{ keyword }}" has been searched in most:</p>
                <div class="interestByRegionItem"  v-for="(item, index) in interest_by_region" :key="index">
                    <span>{{ index }}</span>
                    <span>{{ item.location }}</span>
                    <span>{{ item.extracted_value }}</span>
                </div>
            </div>
        </div>
        
        <span v-else>No results found for given keyword.</span>
    </div>
</template>

<script setup>
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { queryRelatedQueries, queryInterestByRegion } from '../api/TrendsApi';
import { ref } from 'vue';

const keyword = ref('');
const loading = ref(false);
const related_queries = ref(null);
const interest_by_region = ref(null);
const notFound = ref(false)

const executeQuery = async () => {
    try {
        loading.value = true;
        const response = await queryRelatedQueries(keyword.value);
        const response2 = await queryInterestByRegion(keyword.value);

        if (response.related_queries && response2.interest_by_region) {
            related_queries.value = response.related_queries.rising;
            interest_by_region.value = response2.interest_by_region;
            notFound.value = false;
        }
        else { 
            notFound.value = true;
        }
        loading.value = false;
        
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