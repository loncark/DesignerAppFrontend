<template>
    <div id="exploreScreen">
        <div class="flex-row">
            <div class="tabItem" @click="changeActiveTab('trends')">
                <i class="pi pi-chart-line"></i>
                <span>Trends</span>
            </div>
            <div class="tabItem" @click="changeActiveTab('keywords')">
                <i class="pi pi-search"></i>
                <span>Keywords</span>
            </div>
            <div class="tabItem" @click="changeActiveTab('products')">
                <i class="pi pi-list"></i>
                <span >Products</span>
            </div>
        </div>

        <TrendScreen v-if="active === 'trends'"/>
        <KeywordSearchScreen v-else-if="active === 'keywords'"/>
        <EtsyScreen v-else/>
    </div>
</template>

<script setup>
import TrendScreen from '../ExploreScreen/TrendScreen/TrendScreen.vue';
import KeywordSearchScreen from './KeywordSearchScreen.vue';
import EtsyScreen from '../ExploreScreen/EtsyScreen/EtsyScreen.vue';
import { ref, onMounted } from 'vue';
import { useStore } from '../../store/Store';

const active = ref('trends');
const store = useStore();

const changeActiveTab = (keyword) => {
    active.value = keyword;
}
onMounted(() => {
    store.resetExploreScreen();
})
</script>

<style scoped>
#exploreScreen {
    margin-left: 20px;
    margin-top: 10px;
}

.tabItem {
    padding: 0px 10px 10px 10px;
    margin: 10px;

    border: solid black;
    border-width: 0px 0px 1px 0px;
}

.tabItem i {
    margin-right: 10px;
}
</style>