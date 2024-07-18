<template>
    <div id="keywordSearchScreen">
        <div class="searchBar flex-row">
            <InputText v-model="keyword" @keyup.enter="executeQuery" :class="{'invalid-input': !inputIsValid(keyword)}"/>
            <Button label="Search" icon="pi pi-search" @click="executeQuery" :disabled="rateLimitExceeded"></Button>
        </div>

        <ProgressSpinner v-if="loading"></ProgressSpinner>

        <span v-else-if="!queryWasExecuted">Awaiting input.</span>
        <span v-else-if="noRelatedQueriesWereFound && noInterestByRegionWasFound">No results found for given input.</span>

        <div v-else class="keywordSearchLayout flex-row">
            <div class="leftPart flex-column">
                <div class="card card1">
                    <InterestOvertimeChart :keyword="store.keyword_search_keyword"/>
                </div>

                <div class="card">
                    <h4 v-if="noInterestByRegionWasFound">No interest by region was found.</h4>
                    <div v-else class="card2">
                        <h4>Countries "{{ store.keyword_search_keyword }}" has been searched in most:</h4>
                        <div class="queryList flex-column wrap">
                            <div class="queryItem" v-for="(item, index) in store.interest_by_region.slice(0, 18)" :key="index">
                                <span>{{ index + 1 }}</span>
                                <span>{{ item.location }}</span>
                                <span>{{ item.extracted_value }}</span>
                            </div>
                        </div>
                    </div>
                </div>               
            </div>
            
            <div class="rightPart card">
                <h4 v-if="noRelatedQueriesWereFound">No related queries were found.</h4>
                <div v-else>
                    <h4>Popular queries related to "{{ store.keyword_search_keyword }}":</h4>
                    <div class="queryList flex-column" >
                        <div class="queryItem" v-for="(query, index) in store.related_queries.slice(0, 25)" :key="index">
                            <span>{{ index + 1 }}</span>
                            <span>{{ query.query }}</span>
                            <span class="padding-left">+{{ query.extracted_value }}%</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        
    </div>
</template>

<script setup>
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { queryRelatedQueries, queryInterestByRegion } from '../../../api/TrendsApi';
import { ref, computed } from 'vue';
import { useStore } from '../../../store/Store';
import ProgressSpinner from 'primevue/progressspinner';
import { inputIsValid } from '../../../utils/validation';
import InterestOvertimeChart from '../KeywordSearchScreen/InterestOverTimeChart.vue';

const store = useStore();
const keyword = ref(store.keyword_search_keyword);
const loading = ref(false);
const noRelatedQueriesWereFound = computed(() => store.related_queries === undefined);
const noInterestByRegionWasFound = computed(() => store.interest_by_region === undefined);
const queryWasExecuted = computed(() => store.related_queries === null? false : true);
const rateLimitExceeded = computed(() => store.serpapi_limit_exceeded? true : false);

const executeQuery = async () => {
    try {
        loading.value = true;
        store.keyword_search_keyword = keyword.value;

        const response = await queryRelatedQueries(keyword.value);
        const response2 = await queryInterestByRegion(keyword.value);

        if (response.message || response2.message) {
            store.serpapi_limit_exceeded = true;
        }
        else {
            store.related_queries = response.error? undefined : response.related_queries.rising;
            store.interest_by_region = response.error? undefined : response2.interest_by_region;
        }
        
    } catch (error) {
        console.log(`Error: ${error.message}`);
    } finally {
        loading.value = false;
    }
};

</script>

<style scoped>
#keywordSearchScreen {
    width: 93%;
    height: 70%;
}

.keywordSearchLayout {
    width: 100%;
    height: 100%;
    padding-top: 10px;
}

.card {
    height: fit-content;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    margin: 10px 20px 10px 0px;
}
.card>* {
    margin: 15px;
}
.card1 {
    width: 830px;
    height: 430px;
}
.card2 {
    height: 290px;
    width: 100%;
}

.queryList {
    margin: 10px 20px 10px 20px;
    padding: 10px 15px 0px 15px;
    border-radius: 10px;
    height: fit-content;
}
.queryList>h4 {
    margin: 20px 20px 0px 20px;
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
.wrap {
    height: 95%;
    flex-wrap: wrap;
}

.p-progress-spinner {
    position: fixed;
    top: 40vh;
    left: 45vw;
}
</style>