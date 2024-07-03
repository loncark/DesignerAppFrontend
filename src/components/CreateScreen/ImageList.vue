<template>
    <div id="imageList">
        <div class="imageListImage" v-for="imgUrl in props.images" :key="imgUrl">
            <img :src="imgUrl">
            <Button label="Modify" @click="transferImgToSD(imgUrl)"></Button> 
            <Button label="Delete" @click="deleteImage(imgUrl)"></Button>
        </div>
    </div>
</template>

<script setup>
import Button from 'primevue/button';
import { useStore } from '../../store/Store';
import { deleteImageFromStorage, updateImageLinksOnDesignWithId } from '../../api/FirebaseApi';

const props = defineProps(["images"])
const store = useStore();

const transferImgToSD = (url) => {
    store.imgUrl = url;
}

const deleteImage = async (imgUrl) => {
    try {
        await deleteImageFromStorage(imgUrl);
            
        let tempImageLinks = store.design.image_links.filter(link => link !== imgUrl); 
        let response2 = await updateImageLinksOnDesignWithId(tempImageLinks, store.design.design_id);
        console.log(response2);

        store.design.image_links = tempImageLinks;
    }
    catch (error) {
        console.log(error);
    }
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

