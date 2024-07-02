<template>
    <div id="trademarkResultCard">
        <span class="item1">{{ keyword }}</span>
        <span class="item2">{{ status }}</span>
        <span class="item3">{{ owner }}</span>
        <span class="item4">{{ description }}</span>
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