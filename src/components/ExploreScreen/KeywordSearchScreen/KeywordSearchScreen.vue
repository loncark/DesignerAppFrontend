<template>
    <div id="keywordSearchScreen">
        <div class="searchBar flex-row">
            <InputText v-model="keyword" @keyup.enter="executeAllQueries" :class="{'invalid-input': !inputIsValid(keyword)}"/>
            <Button label="Search" icon="pi pi-search" @click="executeAllQueries" :disabled="rateLimitExceeded"></Button>
        </div>

        <span v-show="!store.keyword_query_executed">Awaiting input.</span>

        <div v-show="store.keyword_query_executed" class="keywordSearchLayout flex-row">
            <div class="leftPart flex-column">
                <InterestOvertimeCard class="card"/>
                <InterestByRegionCard class="card"/>                             
            </div>
            <div class="rightPart">
                <RelatedQueriesCard class="card"/>
            </div>
        </div>
    </div>
</template>

<script setup>
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { ref, computed } from 'vue';
import { useStore } from '../../../store/store';
import { inputIsValid } from '../../../utils/validation';
import InterestOvertimeCard from './InterestOverTimeCard.vue';
import RelatedQueriesCard from './RelatedQueriesCard.vue';
import InterestByRegionCard from './InterestByRegionCard.vue';
import eventBus from '../../../utils/EventBus';

const store = useStore();
const keyword = ref(store.keyword_search_keyword);
const rateLimitExceeded = computed(() => store.serpapi_limit_exceeded? true : false);

const executeAllQueries = async () => {
    try {
        store.keyword_search_keyword = keyword.value;
        store.keyword_query_executed = true;

        eventBus.emit('execute-queries');
        
    } catch (error) {
        console.log(`Error: ${error.message}`);
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
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    margin: 10px 20px 10px 0px;
}
</style>