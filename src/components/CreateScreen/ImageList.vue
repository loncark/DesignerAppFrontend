<template>
    <div id="imageList">
        <div class="imageListImage" v-for="imgUrl in props.images" :key="imgUrl">
            <img :src="imgUrl">
            <div class="buttonRow flex-row">
                <i class="pi pi-pen-to-square" title="Modify image" @click="transferImgToSD(imgUrl)"></i>
                <i class="pi pi-trash" title="Delete image" @click="addToDeletedImagesQueue(imgUrl)"></i>
            </div> 
        </div>
        <div class="imageListImage" v-for="base64String in props.newImages" :key="base64String">
            <img :src="`data:image/png;base64,${base64String}`">
            <div class="buttonRow flex-row">
                <i class="pi pi-pen-to-square" title="Modify image" @click="transferImgToSD(base64String)"></i>
                <i class="pi pi-trash" title="Delete image" @click="removeFromNewImages(base64String)"></i>
            </div>
        </div>
    </div>
</template>

<script setup>
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
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 20px 20px;
    width: 100%;
}

.imageListImage>img {
    width: 100%;
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

.imageListImage {
    /* neccessary for the below absolute position to work */
    position: relative;
}

.buttonRow {
    width: 100%;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
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

