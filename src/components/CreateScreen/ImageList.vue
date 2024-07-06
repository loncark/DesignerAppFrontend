<template>
    <div id="imageList">
        <div class="imageListImage" v-for="imgUrl in props.images" :key="imgUrl">
            <img :src="imgUrl">
            <Button label="Modify" @click="transferImgToSD(imgUrl)"></Button> 
            <Button label="Delete" @click="addToDeletedImagesQueue(imgUrl)"></Button>
        </div>
        <div class="imageListImage" v-for="base64String in props.newImages" :key="base64String">
            <img :src="`data:image/png;base64,${base64String}`">
            <Button label="Modify" @click="transferImgToSD(base64String)"></Button> 
            <Button label="Delete" @click="removeFromNewImages(base64String)"></Button>
        </div>
    </div>
</template>

<script setup>
import Button from 'primevue/button';
import { useStore } from '../../store/Store';

const props = defineProps(["images", "newImages"])
const store = useStore();

const transferImgToSD = (url) => {
    store.sd_img_to_load = url;
}

const removeFromNewImages = (base64String) => {
    const index = store.new_images.indexOf(base64String);
    if (index !== -1) {
        store.new_images.splice(index, 1);
    }
}

const addToDeletedImagesQueue = (imgUrl) => {
    store.deleted_images.push(imgUrl);
    store.design.image_links = store.design.image_links.filter(link => link !== imgUrl); 

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

