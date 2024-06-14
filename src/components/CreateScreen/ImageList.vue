<template>
    <div id="imageList">
        <div id="image" v-for="(imgUrl, index) in imageArray" :key="index">
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
import { ref } from 'vue';
const imageArray = ref([])

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

#image>img {
    height: 100px;
    width: 100px;
}
</style>

