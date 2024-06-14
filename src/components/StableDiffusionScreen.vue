<template>
    <div id="sdScreen">
        <h1>Stable Diffusion</h1>

        <div id="sdScreenInputFields">
            <label>Steps</label>
            <InputText v-model="noSteps"></InputText>
            <label>Width</label>
            <InputText v-model="width"></InputText>
            <label>Height</label>
            <InputText v-model="height"></InputText>

            <label>Custom prompt</label>
            <Textarea v-model="customPrompt"></Textarea>

            <Button :label="generateBtnLabel" @click="handleGenerateClick"></Button>
        </div>

        <p v-if="loading">Loading...</p>
        <div v-else id="imagePart">
            <img v-if="base64Image" :src="base64Image">
            <img v-else src="C:\Users\Kristina\Documents\Diplomski rad\DesignerAppFrontend\src\assets\person.png"/>
            <Button id="acceptButton" label="Accept" @click="uploadImage"></Button>
            <Button id="discardButton" label="Discard" @click="discardImg"></Button>
        </div>
        
    </div>
</template>

<script setup>
import InputText from "primevue/inputtext";
import Button from 'primevue/button';
import Textarea from "primevue/textarea";
import { querySDtxt2img, querySDimg2img } from '../api/StableDiffusionApi'
import { uploadImgToFirebaseStorage } from '../api/FirebaseApi'
import { ref, computed } from "vue";

const loading = ref(false);
const base64String = ref(null);

const noSteps = ref(1)
const width = ref(64)
const height = ref(64)
const customPrompt = ref('a yellow triangle')

const generateBtnLabel = computed(() => {
    return base64String.value ? 'Modify' : 'Generate';
});
const base64Image = computed(() => {
    return base64String.value ? `data:image/png;base64,${base64String.value}` : '';
});

const handleGenerateClick = () => {
    if (base64String.value === null) {
        executeTxt2Img();
    } else {
        executeImg2Img();
    }
};

const executeTxt2Img = async () => {
    try {
        loading.value = true;
        let params = {
        "prompt": customPrompt.value,
        "batch_size": 1,
        "steps": noSteps.value,
        "cfg_scale": 1,
        "width": width.value,
        "height": height.value,
        "restore_faces": false,
        "tiling": false,  
    }
        const response = await querySDtxt2img(params);
        base64String.value = response.images[0]
        loading.value = false;
    } catch (error) {
        console.log(`Error: ${error.message}`); 
    }
};

const executeImg2Img = async () => {
    try {
        loading.value = true;
        let params = {
        "prompt": customPrompt.value,
        "batch_size": 1,
        "steps": noSteps.value,
        "cfg_scale": 1,
        "width": width.value,
        "height": height.value,
        "restore_faces": false,
        "tiling": false,  
        "init_images": [
            base64String.value
        ],
    }
        const response = await querySDimg2img(params);
        base64String.value = response.images[0]
        loading.value = false;
    } catch (error) {
        console.log(`Error: ${error.message}`); 
    }
};

const discardImg = () => {
    base64String.value = null;
}

const uploadImage = async () => {
    if (!base64String.value) {
        console.log("No image provided");
        return;
    }
    let downloadUrl = await uploadImgToFirebaseStorage(base64String.value);
    console.log("Image successfully uploaded: " + downloadUrl);
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