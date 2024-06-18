<template>
    <div id="imageList">
        <div class="imageListImage" v-for="imgUrl in props.images" :key="imgUrl">
            <img :src="imgUrl">
            <Button label="E"></Button> 
        </div>
        <div id="newImage">
            <p>+ New</p>
        </div>
     
    </div>
</template>

<script setup>
import Button from 'primevue/button';

const props = defineProps(["images"])

</script>

<style scoped>
#imageList {
    display: grid;
    grid-template-columns: auto auto auto;
}

#imageList>h1 {
    grid-row: 1;
    grid-column: 1 / 4;
}

.imageListImage>img {
    height: 100px;
    width: 100px;
}
</style>

