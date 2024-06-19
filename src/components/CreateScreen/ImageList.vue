<template>
    <div id="imageList">
        <div class="imageListImage" v-for="imgUrl in props.images" :key="imgUrl">
            <img :src="imgUrl">
            <Button label="Modify" @click="goToSDScreen(imgUrl)"></Button> 
        </div>
        <div id="newImage" @click="goToSDScreen">
            <p @click="goToSDScreen(null)">+ New</p>
        </div>
     
    </div>
</template>

<script setup>
import Button from 'primevue/button';
import { useRouter } from 'vue-router';
import { useDesignStore } from '../../store/DesignStore';

const props = defineProps(["images"])
const router = useRouter();
const designStore = useDesignStore();

const goToSDScreen = (url) => {
    designStore.setImgUrl(url);
    router.push('/sd');
}

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

