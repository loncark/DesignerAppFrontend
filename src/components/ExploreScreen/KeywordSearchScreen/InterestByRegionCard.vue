<template>
    <div class="interestByRegionCard">
        <ProgressSpinner v-if="loading"/>
        <h4 v-else-if="noInterestByRegionWasFound">No interest by region was found.</h4>
        <div v-else class="container">
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
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useStore } from '../../../store/Store';
import ProgressSpinner from 'primevue/progressspinner';
import { queryInterestByRegion } from '../../../api/TrendsApi';
import eventBus from '../../../utils/EventBus';

const store = useStore();
const loading = ref(true);
const noInterestByRegionWasFound = computed(() => store.interest_by_region === undefined);

const fetchInterestByRegion = async () => {
    try {
        loading.value = true;

        const response = await queryInterestByRegion(store.keyword_search_keyword);

        if (response.message) {
            store.serpapi_limit_exceeded = true;
        }
        else {
            store.interest_by_region = response.error? undefined : response.interest_by_region;
        }
        
    } catch (error) {
        console.log(`Error: ${error.message}`);
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
  eventBus.on('execute-queries', fetchInterestByRegion);
});

onUnmounted(() => {
  eventBus.off('execute-queries', fetchInterestByRegion);
});
</script>

<style scoped>
.interestByRegionCard {
    width: 830px;
    height: 320px;
    padding: 20px;
}

.container {
    height: 100%;
}

.queryList {
    margin: 10px 20px 10px 20px;
    padding: 10px 15px 0px 15px;
    border-radius: 10px;
    height: 100%;
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

.wrap {
    flex-wrap: wrap;
}

.p-progress-spinner {
    margin-left: 45%;
    margin-top: 15%;
}
</style>
