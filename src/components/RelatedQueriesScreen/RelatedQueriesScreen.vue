<template>
    <div id="relatedQueriesScreen">
        <div class="searchBar">
            <InputText v-model="keyword"/>
            <Button label="Search" @click="executeQuery"></Button>
        </div>

        <p v-if="loading">Loading...</p>
        <div id="relatedQueryList" v-else-if="!notFound">
            <div class="relatedQueryItem" v-for="(query, index) in related_queries" :key="index">
                <span>{{ index }}</span>
                <span>{{ query.query }}</span>
                <span>+{{ query.extracted_value }}%</span>
            </div>
        </div>
        <p v-else>No results found for given keyword.</p>
    </div>
</template>

<script setup>
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { queryRelatedQueries } from '../../api/TrendsApi';
import { ref } from 'vue';

const keyword = ref('');
const loading = ref(false);
const related_queries = ref(null);
const notFound = ref(false)

const executeQuery = async () => {
    try {
        loading.value = true;
        const response = await queryRelatedQueries(keyword.value);
        if (response.related_queries) {
            related_queries.value = response.related_queries.rising;
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
#relatedQueriesScreen>.searchBar {
    display: flex;
    flex-direction: row;
}
</style>