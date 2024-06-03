<template>
    <div id="trendScreen">
        <h1>Trends</h1>
        <Calendar></Calendar>
        <TrendList/>
    </div>
</template>

<script setup>
import Calendar from 'primevue/calendar';
import TrendList from './TrendList.vue'
</script>

<style scoped>
#trendScreen {
    display: flex;
    flex-direction: column;
}
</style>