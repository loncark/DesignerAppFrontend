<template>
    <div id="trendList">
        <TrendCard v-for="num in array" :key="num" />
    </div>
</template>

<script setup>
import TrendCard from "./TrendCard.vue"
const array = [1, 2, 3, 4, 5]
</script>

<style scoped>
#trendList {
    display: grid;
    grid-auto-columns: auto auto auto;
}
</style>