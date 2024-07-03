<template>
    <div id="sdScreen">
        <div id="sdScreenInputFields">
            <label>Steps</label>
            <InputText v-model="store.sd_no_steps_input"></InputText>
            <label>Width</label>
            <InputText v-model="store.sd_width_input"></InputText>
            <label>Height</label>
            <InputText v-model="store.sd_height_input"></InputText>

            <label>Custom prompt</label>
            <Textarea v-model="store.sd_custom_prompt_input"></Textarea>

            <Button :label="generateBtnLabel" @click="handleGenerateClick"></Button>
        </div>

        <span v-if="loading">Loading...</span>
        <div v-else id="imagePart">
            <img v-if="base64Image" :src="base64Image">
            <img v-else src="C:\Users\Kristina\Documents\Diplomski rad\DesignerAppFrontend\src\assets\placeholder.svg"/>
            <Button id="acceptButton" label="Accept" @click="acceptImage" :disabled="!store.sd_base64String"></Button>
            <Button id="discardButton" label="Discard" @click="discardImg"></Button>
        </div>
        
    </div>
</template>

<script setup>
import InputText from "primevue/inputtext";
import Button from 'primevue/button';
import Textarea from "primevue/textarea";
import { querySDtxt2img, querySDimg2img } from '../../api/StableDiffusionApi'
import { uploadImgToFirebaseStorage, convertImageUrlToBase64 } from '../../api/FirebaseApi'
import { ref, computed, onMounted } from "vue";
import { useStore } from '../../store/Store';
import { updateImageLinksOnDesignWithId } from '../../api/FirebaseApi';

const store = useStore();
const loading = ref(false);

const generateBtnLabel = computed(() => {
    return store.sd_base64String ? 'Modify' : 'Generate';
});
const base64Image = computed(() => {
    return store.sd_base64String ? `data:image/png;base64,${store.sd_base64String}` : '';
});

onMounted(async () => {
    if(store.imgUrl) {
        try {
            loading.value = true;
            store.sd_base64String = await loadImg(store.imgUrl);
            loading.value = false;
        }
        catch (error) {
            console.log(error);
        }
    }
});

const loadImg = async (imgUrl) => {
    return await convertImageUrlToBase64(imgUrl); 
}

const handleGenerateClick = () => {
    if (store.sd_base64String === null) {
        executeTxt2Img();
    } else {
        executeImg2Img();
    }
};

const executeTxt2Img = async () => {
    try {
        loading.value = true;
        let params = {
        "prompt": store.sd_custom_prompt_input,
        "batch_size": 1,
        "steps": store.sd_no_steps_input,
        "cfg_scale": 1,
        "width": store.sd_width_input,
        "height": store.sd_height_input,
        "restore_faces": false,
        "tiling": false,  
    }
        const response = await querySDtxt2img(params);
        store.sd_base64String = response.images[0];

    } catch (error) {
        console.log(`Error: ${error.message}`); 
    }
    loading.value = false;
};

const executeImg2Img = async () => {
    try {
        loading.value = true;
        let params = {
        "prompt": store.sd_custom_prompt_input,
        "batch_size": 1,
        "steps": store.sd_no_steps_input,
        "cfg_scale": 1,
        "width": store.sd_width_input,
        "height": store.sd_height_input,
        "restore_faces": false,
        "tiling": false,  
        "init_images": [
            store.sd_base64String
        ],
    }
        const response = await querySDimg2img(params);
        store.sd_base64String = response.images[0];

    } catch (error) {
        console.log(`Error: ${error.message}`); 
    }
    loading.value = false;
};

const discardImg = () => {
    store.sd_base64String = null;
}

const acceptImage = async () => {
    if (!store.sd_base64String) {
        console.log("No image provided");
        return;
    }

    try {
        let downloadUrl = await uploadImage();

        let tempImageLinks = store.design.image_links;
        tempImageLinks.push(downloadUrl); 
        let response = await updateImageLinksOnDesignWithId(tempImageLinks, store.design.design_id);
        console.log(response);
    }
    catch (error) {
        console.log(error);
    }
}

const uploadImage = async () => {
    try {
        let downloadUrl = await uploadImgToFirebaseStorage(store.sd_base64String, store.design.design_id);
        console.log("Image successfully uploaded");
        return downloadUrl
    }
    catch (error) {
        console.log(error);
    }
}
</script>

<style scoped>
#sdScreen {
    display: grid;
    grid-template-columns: auto auto;
    grid-template-rows: auto auto;
}

#sdScreen>h1 {
    grid-row: 1;
    grid-column: 1 / 3;
}

#sdScreenInputFields {
    grid-column: 1;
    grid-row: 2;

    display: grid;
    grid-template-columns: auto auto;
    grid-template-rows: auto auto auto auto auto auto;
}

#sdScreenInputFields>Button {
    grid-row: 6;
    grid-column: 1 / 3;
}

#imagePart {
    grid-column: 2;
    grid-row: 2;

    display: grid;
    grid-template-columns: auto auto;
    grid-template-rows: auto auto;
}

#imagePart>img {
    width: 400px;
    height: 400px;
    grid-row: 1;
    grid-column: 1 / 3;
}

#acceptButton {
    grid-row: 2;
    grid-column: 1;
}

#disccardtButton {
    grid-row: 2;
    grid-column: 2;
}
</style>