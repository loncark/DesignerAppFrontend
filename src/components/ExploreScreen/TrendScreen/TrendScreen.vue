<template>
    <div id="trendScreen">
        <div class="searchBar">
            <InputText v-model="country_code"/>
            <Calendar v-model="date" iconDisplay="input" dateFormat="dd/mm/yy"/>
            <Button label="Search" @click="executeQuery"></Button>
        </div>

        <span v-if="loading">Loading...</span>
        <div id="dateList" v-else-if="!notFound">
            <div v-for="(date_item, index) in designStore.daily_searches" :key="index" class="dateItem">
                <span>{{ date_item.date }}</span>
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
import { useDesignStore } from '../../../store/DesignStore';

const designStore = useDesignStore();
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
            designStore.daily_searches = response.daily_searches;
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

onMounted(() => {
    if(designStore.daily_searches === null) {
        executeQuery();
    }
});
</script>

<style scoped>
#trendScreen {
    display: flex;
    flex-direction: column;
}

#trendScreen>.searchBar {
    display: flex;
    flex-direction: row;
}

#dateList {
    display: flex;
    flex-direction: column;
}

.dateItem {
    display: flex;
    flex-direction: column;
}
</style>