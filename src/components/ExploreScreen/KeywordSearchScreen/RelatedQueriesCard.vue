<template>
    <div class="relatedQueriesCard">
        <ProgressSpinner v-if="loading"/>
        <h4 v-else-if="noRelatedQueriesWereFound">No related queries were found.</h4>
        <div v-else>
            <h4>Popular queries related to "{{ store.keyword_search_keyword }}":</h4>
            <div class="queryList flex-column">
                <div class="queryItem" v-for="(query, index) in store.related_queries.slice(0, 25)" :key="index">
                    <span>{{ index + 1 }}</span>
                    <span>{{ query.query }}</span>
                    <span class="padding-left">+{{ query.extracted_value }}%</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useStore } from '../../../store/Store';
import ProgressSpinner from 'primevue/progressspinner';
import { queryRelatedQueries } from '../../../api/TrendsApi';

const store = useStore();
const loading = ref(true);
const noRelatedQueriesWereFound = computed(() => store.related_queries === undefined);

const fetchRelatedQueries = async () => {
    try {
        loading.value = true;
        const response = await queryRelatedQueries(store.keyword_search_keyword);

        if (response.message) {
            store.serpapi_limit_exceeded = true;
        }
        else {
            store.related_queries = response.error? undefined : response.related_queries.rising;
        }
        
    } catch (error) {
        console.log(`Error: ${error.message}`);
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    fetchRelatedQueries();
});
</script>

<style scoped>
.relatedQueriesCard {
    width: 475px;
    height: 775px;
    padding: 20px;
}

.queryList {
    margin: 10px 20px 10px 20px;
    padding: 10px 15px 0px 15px;
    border-radius: 10px;
    height: fit-content;
}

.queryList>h4 {
    margin: 20px 20px 20px 20px;
}

.queryItem {
    display: grid;
    grid-template-columns: 30px 230px 100px;
    margin-bottom: 10px;
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

.padding-left {
    padding-left: 20px;
}

.p-progress-spinner {
    margin-left: 40%;
    margin-top: 80%;
}
</style>
