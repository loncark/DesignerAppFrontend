<template>
    <div id="exploreScreen">
        <div class="titlePart flex-row">
            <i class="pi pi-compass"></i>
            <h1 class="big-title">Explore</h1>
        </div>
        
        <TabMenu :model="tabItems" v-model:activeIndex="active"/>

        <TrendScreen v-if="active === 0"/>
        <KeywordSearchScreen v-else-if="active === 1"/>
        <EtsyScreen v-else/>
    </div>
</template>

<script setup>
import TrendScreen from '../ExploreScreen/TrendScreen/TrendScreen.vue';
import KeywordSearchScreen from '../ExploreScreen/KeywordSearchScreen/KeywordSearchScreen.vue';
import EtsyScreen from '../ExploreScreen/EtsyScreen/EtsyScreen.vue';
import { computed, onMounted, ref } from 'vue';
import { useStore } from '../../store/Store';
import TabMenu from 'primevue/tabmenu';

const store = useStore();
const active = computed(() => store.explore_active_tab);

const tabItems = ref([
  { label: 'Trends', icon: 'pi pi-chart-line', command: () => changeActiveTab(0) },
  { label: 'Keywords', icon: 'pi pi-search', command: () => changeActiveTab(1) },
  { label: 'Products', icon: 'pi pi-list', command: () => changeActiveTab(2) },
]);

const changeActiveTab = (keyword) => {
    store.explore_active_tab = keyword;
}

onMounted(() => {
    store.main_active_tab = 1;
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

:deep(.p-menuitem-link) {
    padding: 10px 15px 10px 15px;
}
:deep(.p-tabmenu) {
    border: none;
    margin-bottom: 15px;
    width: fit-content;
}
</style>