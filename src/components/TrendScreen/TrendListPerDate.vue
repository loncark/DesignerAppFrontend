<template>
    <div id="trendListPerDate">
        <div v-for="(search_item, index) in props.searches" :key="index" @click="navigateToUrl(search_item.articles[0].link)">
            <a :href="search_item.articles[0].link" target="_blank" class="trendCard">
                <img :src="search_item.articles[0].thumbnail? search_item.articles[0].thumbnail : 'placeholder.svg'" />
                <span id="trendTraffic">{{ search_item.traffic }} views</span>
                <span id="trendSource">{{ search_item.articles[0].source }}</span>
                <span id="trendTitle">{{ search_item.articles[0].title }}</span>
                <span id="trendSummary">{{ search_item.articles[0].snippet }}</span>
            </a>
        </div>
    </div>
</template>

<script setup>
const props = defineProps(["searches"])

const navigateToUrl = (url) => {
    window.location.href = url;
}
</script>

<style scoped>
#trendListPerDate {
    display: grid;
    grid-auto-columns: auto auto auto;
}

.trendCard {
    display: grid;
    grid-auto-columns: auto auto auto;
    grid-auto-rows: auto auto auto;

    cursor: pointer;
    text-decoration: none;
    color: inherit;
}

.trendCard>img {
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