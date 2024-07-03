<template>
        <a :href="product.productUrl" target="_blank" class="productCard">
            <img :src="product.imageUrl">
            <span class="productName">{{ product.title }}</span>
            <span class="productPrice">${{ product.price.originalPrice }}</span>
            <span class="productRating">{{ product.rating }}/{{ product.reviews.split(' ')[product.reviews.split(' ').length - 2] }}</span>
        </a>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps(["product"]);
const product = ref(props.product);
</script>

<style scoped>
.productCard {
    width: fit-content;

    display: grid;
    grid-auto-columns: auto auto;
    grid-auto-rows: auto auto auto;

    text-decoration: none;
    color: inherit;
}

.productCard>img {
    grid-row: 1;
    grid-column: 1 / 3;
    height: 200px;
}

.productName {
    grid-row: 2;
    grid-column: 1 / 3;
}

.productPrice {
    grid-row: 3;
    grid-column: 1;
}

.productRating {
    grid-row: 3;
    grid-column: 2;
}
</style>