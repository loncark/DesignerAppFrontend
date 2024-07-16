<template>
        <a :href="product.productUrl" target="_blank" class="productCard inter-font">
            <img :src="product.imageUrl">
            <span class="productName">{{ product.title }}</span>
            <span class="productPrice">${{ product.price.originalPrice }}</span>
            <span class="productRating">
                <i class="pi pi-star-fill"></i>
                {{ product.rating }}/{{ product.reviews.split(' ')[product.reviews.split(' ').length - 2] }} reviews
            </span>
        </a>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps(["product"]);
const product = ref(props.product);
</script>

<style scoped>
.productCard {
    width: 300px;

    display: grid;
    grid-auto-columns: auto auto;
    grid-auto-rows: auto auto auto;

    text-decoration: none;
    color: inherit;
}

.productCard>* {
    margin-bottom: 10px;
}

.productCard>img {
    grid-row: 1;
    grid-column: 1 / 3;
    width: 300px;
    height: 300px;
    border-radius: 10px;
    border: 1px dotted black;
}

.productName {
    grid-row: 2;
    grid-column: 1 / 3;

    overflow: hidden;
    text-overflow: ellipsis;

    /* does proper ellipsis */
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
}

.productPrice {
    grid-row: 3;
    grid-column: 1;
}

.productRating {
    grid-row: 3;
    grid-column: 2;
    margin-left: auto;
}

.pi-star-fill {
    font-size: 0.6rem; 
    color: orange;
}
</style>