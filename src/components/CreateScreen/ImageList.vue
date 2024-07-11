<template>
    <div id="imageList">
        <div class="imageListImage" v-for="imgUrl in props.images" :key="imgUrl">
            <img :src="imgUrl">
            <div class="buttonRow flex-row">
                <i class="pi pi-pen-to-square" @click="transferImgToSD(imgUrl)"></i>
                <i class="pi pi-trash" @click="addToDeletedImagesQueue(imgUrl)"></i>
            </div> 
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
    const index = store.new_images_buffer.indexOf(base64String);
    if (index !== -1) {
        store.new_images_buffer.splice(index, 1);
    }
}

const addToDeletedImagesQueue = (imgUrl) => {
    store.deleted_images_buffer.push(imgUrl);
    store.design.image_links = store.design.image_links.filter(link => link !== imgUrl); 

}

</script>

<style scoped>
#imageList {
    display: grid;
    grid-template-columns: auto auto auto;
    grid-gap: 20px 20px;
    width: 100%;
}

.imageListImage>img {
    width: 100%;
    border-radius: 5px;
}

.buttonRow {
    width: 188px;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    translate: 0px -42px;
}

.buttonRow .pi {
    padding: 10px;
    border: solid transparent;
    background-color: transparent;
    color: white;
    cursor: pointer;
    text-shadow: 1px 0 0 #000, 0 -1px 0 #000, 0 1px 0 #000, -1px 0 0 #000;
}
</style>

