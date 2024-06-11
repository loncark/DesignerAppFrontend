<template>
    <div id="trendScreen">
        <h1>Trends</h1>
        <div class="searchBar">
            <InputText v-model="country_code"/>
            <Calendar v-model="date" iconDisplay="input" dateFormat="dd/mm/yy"/>
            <Button label="Search" @click="executeQuery"></Button>
        </div>

        <p v-if="loading">Loading...</p>
        <DateList id= "dateList" v-else-if="!notFound" :daily_searches="daily_searches"/>
        <p v-else>No results found for given date.</p>
    </div>
</template>

<script setup>
import Calendar from 'primevue/calendar';
import DateList from './DateList.vue';
import { queryTrends } from '../../api/TrendsApi';
import { ref, onMounted } from 'vue';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

const date = ref(new Date());
const country_code = ref('US')
const daily_searches = ref(null)
const next_date = ref(date)
const loading = ref(true)
const notFound = ref(false)

const executeQuery = async () => {
    try {
        loading.value = true;
        const response = await queryTrends(formatDate(date.value), country_code.value);
        if (response.daily_searches) {
            daily_searches.value = response.daily_searches;
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
    executeQuery();
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
</style>