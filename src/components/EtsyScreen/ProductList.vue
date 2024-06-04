<template>
    <div id="productList">
        <Product v-for="num in array" :key="num" />    
    </div>
</template>

<script setup>
import Product from './Product.vue';
const array = [1, 2, 3, 4, 5]

</script>

<style scoped>
#productList {
    display: grid;
    grid-template-columns: auto auto auto auto;
}
</style>

