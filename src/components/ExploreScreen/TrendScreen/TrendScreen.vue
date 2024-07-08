<template>
    <div id="trendScreen" class="flex-column">
        <div class="searchBar flex-row">
            <InputText v-model="country_code"/>
            <Calendar v-model="date" iconDisplay="input" dateFormat="dd/mm/yy"/>
            <Button label="Search" icon="pi pi-search" @click="executeQuery"></Button>
        </div>

        <span class="loadingText" v-if="loading">Loading...</span>
        <div id="dateList" class="flex-column" v-else-if="!notFound">
            <div v-for="(date_item, index) in store.daily_searches" :key="index" class="dateItem flex-column">
                <span class="dateText">{{ inverseFormatDate(date_item.date) }}</span>
                <TrendListPerDate :searches="date_item.searches"/>
            </div>
        </div>
        <span v-else>No results found for given date.</span>
    </div>
</template>

<script setup>
// trendovi mogu samo unazad mjesec dana
import Calendar from 'primevue/calendar';
import TrendListPerDate from './TrendListPerDate.vue';
import { queryTrends } from '../../../api/TrendsApi';
import { ref, onMounted } from 'vue';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { useStore } from '../../../store/Store';

const store = useStore();
const date = ref(new Date());
const country_code = ref('US')
const next_date = ref(date);
const loading = ref(false);
const notFound = ref(false);

const executeQuery = async () => {
    try {
        loading.value = true;
        const response = await queryTrends(formatDate(date.value), country_code.value);
        if (response.daily_searches) {
            store.daily_searches = response.daily_searches;
            next_date.value = response.serpapi_pagination.next_date;
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

const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
};

const inverseFormatDate = (dateString) => {
    if (dateString.length !== 8) {
        throw new Error("Invalid date string format. Expected 8 digits.");
    }

    const year = dateString.slice(0, 4);
    const month = dateString.slice(4, 6);
    const day = dateString.slice(6, 8);

    return `${year}/${month}/${day}`;
}

onMounted(() => {
    if(store.daily_searches === null) {
        executeQuery();
    }
});
</script>

<style scoped>
.searchBar {
    width: 380px;
    justify-content: space-between;
    align-items: center;
}
.searchBar .p-component {
    height: 35px;
    text-align: center;
    margin: auto;
}

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