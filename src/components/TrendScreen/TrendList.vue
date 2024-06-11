<template>
    <div id="trendList">
        <TrendCard v-for="(search_item, index) in props.searches" :key="index" :search_item="search_item" />
    </div>
</template>

<script setup>
import TrendCard from "./TrendCard.vue"
const props = defineProps(["searches"])
</script>

<style scoped>
#trendList {
    display: grid;
    grid-auto-columns: auto auto auto;
}
</style>