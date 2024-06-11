<template>
    <div id="dateItem">
        <p>{{ date_item.date }}</p>
        <TrendList :searches="props.date_item.searches"/>
    </div>
</template>

<script setup>
import TrendList from './TrendList.vue';
const props = defineProps(["date_item"])
</script>

<style scoped>
#dateItem {
    display: flex;
    flex-direction: column;
}
</style>