<template>
    <div id="trendCard">
        <img src="C:\Users\Kristina\Documents\Diplomski rad\DesignerAppFrontend\src\assets\person.png"/>
        <p id="trendTime">{{ article.date }}</p>
        <p id="trendSource">{{ article.source }}</p>
        <p id="trendTitle">{{ article.title }}</p>
        <p id="trendSummary">{{ article.snippet }}</p>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps(["search_item"])
const article = ref(props.search_item.articles[0])
</script>

<style scoped>
#trendCard {
    display: grid;
    grid-auto-columns: auto auto auto;
    grid-auto-rows: auto auto auto;
}

#trendCard>img {
    width: 100px;
    height: 100px;
    grid-column: 1;
    grid-row: 1 / 4;
}

#trendTime {
    grid-row: 1;
    grid-column: 3;
}

#trendSource {
    grid-row: 1;
    grid-column: 2;
}

#trendTitle {
    grid-row: 2;
    grid-column: 2 / 4;
}

#trendSummary {
    grid-row: 3;
    grid-column: 2 / 4;
}
</style>