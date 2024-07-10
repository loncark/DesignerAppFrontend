<template>
    <div id="trendScreen" class="flex-column">
        <div class="searchBar flex-row">
            <InputText v-model="countryCode"/>
            <InputText v-model="dateString"></InputText>
            <Button label="Search" icon="pi pi-search" @click="executeQuery"></Button>
        </div>

        <span class="loadingText" v-if="loading">Loading...</span>
        <div id="dateList" class="flex-column" v-else-if="!notFound">
            <div v-for="(date_item, index) in store.daily_searches" :key="index" class="dateItem flex-column">
                <span class="dateText">{{ insertSlashesIntoDateString(date_item.date) }}</span>
                <TrendListPerDate :searches="date_item.searches"/>
            </div>
        </div>
        <span v-else>No results found for given date.</span>
    </div>
</template>

<script setup>
// trendovi mogu samo unazad mjesec dana
import TrendListPerDate from './TrendListPerDate.vue';
import { queryTrends } from '../../../api/TrendsApi';
import { ref, onMounted } from 'vue';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { useStore } from '../../../store/Store';
import { convertDateToString, convertStringToDate, formatDateForBackend, insertSlashesIntoDateString } from '../../../utils/functions';

const store = useStore();
const date = ref(new Date());
const dateString = ref(convertDateToString(date.value));
const countryCode = ref('US');
const nextDate = ref(date.value);
const loading = ref(false);
const notFound = ref(false);

const executeQuery = async () => {
    try {
        loading.value = true;
        const response = await queryTrends(formatDateForBackend(convertStringToDate(dateString.value)), countryCode.value);
        if (response.daily_searches) {
            store.daily_searches = response.daily_searches;
            nextDate.value = response.serpapi_pagination.next_date;
            notFound.value = false;
        }
        else { 
            notFound.value = true;
        }
        
    } catch (error) {
        response.value = `Error: ${error.message}`;
    }
    finally {
        loading.value = false;
    }
};
</script>

<style scoped>
.loadingText {
    margin-top: 20px;
}

.dateText {
    font-weight: 700;
    font-size: 20px;
    margin-top: 10px;
    margin-bottom: 10px;
}

</style>