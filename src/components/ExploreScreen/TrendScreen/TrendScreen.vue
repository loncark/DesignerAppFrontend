<template>
    <div id="trendScreen" class="flex-column">
        <div class="searchBar flex-row">
            <Dropdown v-model="countryObject" :options="countryCodeArray" optionLabel="name" placeholder="Select a country" :highlightOnSelect="false" />
            <InputText v-model="dateString" ></InputText>
            <Button label="Search" icon="pi pi-search" @click="executeQuery"></Button>
        </div>

        <ProgressSpinner v-if="loading"></ProgressSpinner>

        <span v-else-if="!queryWasExecuted">Enter date, country code and press 'Search'.</span>
        <span v-else-if="noResultsWereFound">No results found for given date.</span>
        
        <div v-else id="dateList" class="flex-column">
            <div v-for="(date_item, index) in store.daily_searches" :key="index" class="dateItem flex-column">
                <span class="dateText">{{ insertSlashesIntoDateString(date_item.date) }}</span>
                <TrendListPerDate :searches="date_item.searches"/>
            </div>
        </div>
        
    </div>
</template>

<script setup>
// trendovi mogu samo unazad mjesec dana
import TrendListPerDate from './TrendListPerDate.vue';
import { queryTrends } from '../../../api/TrendsApi';
import { ref, computed } from 'vue';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { useStore } from '../../../store/Store';
import { convertDateToString, convertStringToDate, formatDateForBackend, insertSlashesIntoDateString, getCountryCode } from '../../../utils/functions';
import ProgressSpinner from 'primevue/progressspinner';
import { COUNTRY_CODES } from '../../../utils/constants';
import Dropdown from 'primevue/dropdown';

const store = useStore();
const countryCodeArray = ref(COUNTRY_CODES);
const dateString = ref(convertDateToString(store.trends_date));
const countryObject = ref(store.trends_country_object);
const nextDate = ref(store.trends_date);

const loading = ref(false);
const noResultsWereFound = computed(() => store.daily_searches === undefined || store.daily_searches.length === 0? true : false);
const queryWasExecuted = computed(() => store.daily_searches === null? false : true);

const executeQuery = async () => {
    try {
        loading.value = true;
        store.trends_date = convertStringToDate(dateString.value);
        store.trends_country_object = countryObject.value;
        const response = await queryTrends(formatDateForBackend(convertStringToDate(dateString.value)), getCountryCode((countryObject.value)['name']));
        store.daily_searches = response.daily_searches;
        nextDate.value = response.serpapi_pagination.next_date;
        
    } catch (error) {
        response.value = `Error: ${error.message}`;
    }
    finally {
        loading.value = false;
    }
};
</script>

<style scoped>
.p-component:not(.p-button) {
    text-align: center !important;
    width: 200px;
}

.dateText {
    font-weight: 700;
    font-size: 20px;
    margin-top: 10px;
    margin-bottom: 10px;
}

.p-dropdown {
    align-items: center;
}
:deep(.p-dropdown-label) {
    height: fit-content;
}
</style>