<template>
    <div id="trendListPerDate">
        <div v-for="(search_item, index) in props.searches" :key="index" id="trendCard">
            <img src="C:\Users\Kristina\Documents\Diplomski rad\DesignerAppFrontend\src\assets\person.png"/>
            <p id="trendTraffic">{{ search_item.traffic }} views</p>
            <p id="trendSource">{{ search_item.articles[0].source }}</p>
            <p id="trendTitle">{{ search_item.articles[0].title }}</p>
            <p id="trendSummary">{{ search_item.articles[0].snippet }}</p>
        </div>
    </div>
</template>

<script setup>
const props = defineProps(["searches"])
</script>

<style scoped>
#trendListPerDate {
    display: grid;
    grid-auto-columns: auto auto auto;
}

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