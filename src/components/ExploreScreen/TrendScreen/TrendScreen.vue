<template>
    <div id="trendScreen" class="flex-column">
        <div class="flex-row topBar">
            <Dropdown v-model="countryObject" :options="countryCodeArray" optionLabel="name" placeholder="Select a country" :highlightOnSelect="false" />
            <Calendar v-model="dateString" :minDate="minDate" :maxDate="maxDate" :manualInput="false" dateFormat="yy/mm/dd"/>
            <Button label="Search" icon="pi pi-search" @click="executeQuery" :disabled="rateLimitExceeded"></Button>
        </div>

        <ProgressSpinner v-if="loading"></ProgressSpinner>

        <span v-else-if="!queryWasExecuted">Enter date, country code and press 'Search'.</span>
        <span v-else-if="noResultsWereFound">No results found for given date.</span>
        
        <div v-else>
            <div class="dateList flex-column">
                <div v-for="(date_item, index) in store.daily_searches" :key="index" class="dateItem flex-column">
                    <span class="dateText">{{ insertSlashesIntoDateString(date_item.date) }}</span>
                    <TrendListPerDate :searches="date_item.searches"/>
                </div>
            </div>

            <div class="loadMoreContent">
                <Button v-if="!loadingMoreContent" label="Load more" severity="secondary" outlined @click="amendResults" :disabled="rateLimitExceeded" />
                <ProgressSpinner v-else/>
            </div>
        </div>

        <span v-if="rateLimitExceeded">API limit of 100 searches per month has been exceeded.</span>
        
    </div>
</template>

<script setup>
import TrendListPerDate from './TrendListPerDate.vue';
import { queryTrends } from '../../../api/TrendsApi';
import { ref, computed } from 'vue';
import Button from 'primevue/button';
import { useStore } from '../../../store/Store';
import { convertDateToString, convertStringToDate, formatDateForBackend, insertSlashesIntoDateString, getCountryCode } from '../../../utils/functions';
import ProgressSpinner from 'primevue/progressspinner';
import { COUNTRY_CODES } from '../../../utils/constants';
import Dropdown from 'primevue/dropdown';
import Calendar from 'primevue/calendar';

const store = useStore();
const countryCodeArray = ref(COUNTRY_CODES);
const dateString = ref(convertDateToString(store.trends_date));
const countryObject = ref(store.trends_country_object);

const maxDate = ref(new Date());
const minDate = ref(new Date(maxDate.value));
minDate.value.setMonth(minDate.value.getMonth() - 1);

const loading = ref(false);
const loadingMoreContent = ref(false);
const noResultsWereFound = computed(() => store.daily_searches === undefined || store.daily_searches.length === 0? true : false);
const queryWasExecuted = computed(() => store.daily_searches === null? false : true);
const rateLimitExceeded = computed(() => store.serpapi_limit_exceeded? true : false);

const executeQuery = async () => {
    try {
        loading.value = true;
        store.trends_date = convertStringToDate(dateString.value);
        store.trends_country_object = countryObject.value;
        const response = await queryTrends(formatDateForBackend(convertStringToDate(dateString.value)), getCountryCode((countryObject.value)['name']));
        if (response.message) {
            store.serpapi_limit_exceeded = true;
        }
        else {
            store.daily_searches = response.daily_searches;
            store.trends_nextDate = response.serpapi_pagination.next_date;
        }
        
    } catch (error) {
        response.value = `Error: ${error.message}`;
    }
    finally {
        loading.value = false;
    }
};

const amendResults = async () => {
    try {
        loadingMoreContent.value = true;
        const response = await queryTrends(store.trends_nextDate, (store.trends_country_object)['code']);
        if (response.message) {
            store.serpapi_limit_exceeded = true;
        }
        else {
            store.daily_searches.push(...response.daily_searches);
            store.trends_nextDate = response.serpapi_pagination.next_date;
        }
    } catch (error) {
        response.value = `Error: ${error.message}`;
    }
    finally {
        loadingMoreContent.value = false;
    }
}
</script>

<style scoped>
.topBar {
    align-items: center;
    height: 35px;
    margin-bottom: 15px;
}
:deep(.p-component) {
    text-align: left;
    width: 180px;
    height: 100%;
    padding-left: 10px;
}
.p-calendar :deep(.p-component) {
    text-align: center;
}

.p-dropdown {
    align-items: center;
}
:deep(.p-dropdown-label) {
    height: fit-content;
}

.p-button {
    width: revert;
    padding: 0px 10px 0px 10px;
    margin-left: 20px;
}

.dateText {
    font-weight: 700;
    font-size: 20px;
    margin-top: 10px;
    margin-bottom: 10px;
}

.loadMoreContent {
    height: fit-content;
    width: fit-content;
    margin: 20px auto 20px auto;
}
.loadMoreContent>.p-button {
    height: 35px;
    margin: revert;
}
</style>