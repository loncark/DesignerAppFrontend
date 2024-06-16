<template>
    <div id="dateList">
        <div v-for="(date_item, index) in props.daily_searches" :key="index" id="dateItem">
            <p>{{ date_item.date }}</p>
            <TrendListPerDate :searches="date_item.searches"/>
        </div>
    </div>
</template>

<script setup>
import TrendListPerDate from './TrendListPerDate.vue';
const props = defineProps(["daily_searches"])
</script>

<style scoped>
#dateList {
    display: flex;
    flex-direction: column;
}

#dateItem {
    display: flex;
    flex-direction: column;
}
</style>