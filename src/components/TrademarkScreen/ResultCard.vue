<template>
    <div id="trademarkResultCard">
        <p class="item1">{{ keyword }}</p>
        <p class="item2">{{ status }}</p>
        <p class="item3">{{ owner }}</p>
        <p class="item4">{{ description }}</p>
    </div>
</template>

<script setup>
defineProps(["keyword", "owner", "description", "status"])
</script>

<style scoped>
#trademarkResultCard {
    display: grid;
    grid-template-rows: auto auto;
    grid-template-columns: auto auto auto;
}

#trademarkResultCard>.item1 {
    grid-row: 1;
    grid-column: 1;
}

#trademarkResultCard>.item2 {
    grid-row: 1;
    grid-column: 2;
}

#trademarkResultCard>.item3 {
    grid-row: 1;
    grid-column: 3;
}

#trademarkResultCard>.item4 {
    grid-row: 2;
    grid-column: 1 / 4;
}
</style>