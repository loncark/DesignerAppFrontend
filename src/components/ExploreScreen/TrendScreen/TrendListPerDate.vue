<template>
        <div id="trendListPerDate">
            <a class="trendCard" 
                v-for="(search_item, index) in props.searches" :key="index" 
                @click="navigateToUrl(search_item.articles[0].link)"
                :href="search_item.articles[0].link" 
                target="_blank" >

                <img :src="search_item.articles[0].thumbnail? search_item.articles[0].thumbnail : placeholderImagePath" />
                <div class="trendInfo flex-column">
                    <div>{{ search_item.articles[0].source }}</div>
                    <div class="trendTitle">{{ search_item.articles[0].title }}</div>
                    <div class="snippet">{{ search_item.articles[0].snippet }}</div>
                </div>
                <div class="trendTraffic flex-column">
                    <span class="trendTrafficNumber">{{ search_item.traffic / 1000 }}k+</span>
                    <span>views</span>
                </div>

            </a>
        </div>
</template>

<script setup>
const props = defineProps(["searches"])
import placeholderImage from '../../../assets/placeholder.svg';
import { ref } from 'vue';

const placeholderImagePath = ref(placeholderImage);
</script>

<style scoped>
#trendListPerDate {
    display: grid;
    grid-template-columns: auto auto;
    grid-gap: 0px 50px;
}

.trendCard {
    display: grid;
    grid-auto-columns: auto auto auto;

    text-decoration: none;
    color: inherit;

    width: fit-content;
    margin-top: 10px;
    margin-bottom: 10px;
}

.trendCard>img {
    width: 120px;
    height: 120px;

    border-radius: 5px;
    grid-column: 1;
}

.trendInfo {
    grid-column: 2;
    width: 40ch;

    margin-left: 10px;
    margin-right: 10px;

    justify-content: space-between;
    align-items: start;
};
.trendInfo>* {
    overflow: hidden;
    text-overflow: clip;

    /* does proper ellipsis */
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
.trendTitle {
  font-style: italic;
  font-weight: 600;

  overflow: hidden;
    text-overflow: clip;

    /* does proper ellipsis */
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}

.snippet {
    max-height: 53px;
    overflow: hidden;
    text-overflow: clip;

    /* does proper ellipsis */
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
}

.trendTraffic {
    grid-column: 3;
    width: 100%;
    margin-left: 5px;
    justify-content: center;
    align-items: center;
}

.trendTrafficNumber {
    font-size: 30px;
    font-style: bold;
}

</style>