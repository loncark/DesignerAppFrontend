<template>
    <div id="designCardList">
        <DesignCard v-for="num in array" :key="num" />    
    </div>
</template>

<script setup>
import DesignCard from './DesignCard.vue';
const array = [1, 2, 3, 4, 5]

</script>

<style scoped>
#designCardList {
    display: grid;
    grid-template-columns: auto auto auto auto;
}
</style>

