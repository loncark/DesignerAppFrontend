<template>
    <div id="exploreScreen">
        <div class="titlePart flex-row">
            <i class="pi pi-compass"></i>
            <h1 class="big-title">Explore</h1>
        </div>
        
        <div class="flex-row">
            <div class="tabItem" :class="{ 'active-tab': active === 'trends' }" @click="changeActiveTab('trends')">
                <i class="pi pi-chart-line"></i>
                <span>Trends</span>
            </div>
            <div class="tabItem" :class="{ 'active-tab': active === 'keywords' }" @click="changeActiveTab('keywords')">
                <i class="pi pi-search"></i>
                <span>Keywords</span>
            </div>
            <div class="tabItem" :class="{ 'active-tab': active === 'products' }" @click="changeActiveTab('products')">
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
import KeywordSearchScreen from '../ExploreScreen/KeywordSearchScreen/KeywordSearchScreen.vue';
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

.titlePart {
    align-items: center;
    justify-content: space-between;
    width: 400px;

    position: absolute;
    top: 20px;
    right: 110px;
}
.titlePart i {
    font-size: 60px;
}

.tabItem {
    padding: 10px 10px 10px 10px;
    margin: 0px 15px 15px 0px;
    border: solid transparent;
    border-width: 0px 0px 1px 0px;
    border-bottom-color: black;
}
.tabItem i {
    margin-right: 10px;
}
.active-tab {
    border-radius: 10px;
}
</style>