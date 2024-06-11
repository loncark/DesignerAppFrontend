<template>
    <div id="dateList">
        <DateItem v-for="(date_item, index) in props.daily_searches" :key="index" :date_item="date_item" />
    </div>
</template>

<script setup>
import DateItem from './DateItem.vue';
const props = defineProps(["daily_searches"])
</script>

<style scoped>
#dateList {
    display: flex;
    flex-direction: column;
}
</style>