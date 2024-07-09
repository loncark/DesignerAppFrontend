<template>
    <div id="sdScreen" class="flex-row">
        <div id="sdScreenInputFields">
            <label>Width</label>
            <InputText v-model="store.sd_width_input"></InputText>
            <label>Height</label>
            <InputText v-model="store.sd_height_input"></InputText>
            <label>Steps</label>
            <InputText v-model="store.sd_no_steps_input"></InputText>

            <label class="customPromptLabel">Custom prompt</label>
            <Textarea class="customPromptTextArea" v-model="store.sd_custom_prompt_input"></Textarea>

            <Button class="generateButton" :label="generateBtnLabel" @click="handleGenerateClick"></Button>
        </div>

        <span v-if="loading">Loading...</span>
        <div v-else id="imagePart">
            <img v-if="base64Image" :src="base64Image">
            <img v-else :src="placeholderImagePath"/>
            <Button class="acceptButton" label="Accept" @click="acceptImage" :disabled="!store.sd_base64String"></Button>
            <Button class="discardButton" label="Discard" @click="discardImg"></Button>
        </div>
        
    </div>
</template>

<script setup>
import InputText from "primevue/inputtext";
import Button from 'primevue/button';
import Textarea from "primevue/textarea";
import { querySDtxt2img, querySDimg2img } from '../../api/StableDiffusionApi'
import { convertImageUrlToBase64 } from '../../api/FirebaseApi'
import { ref, computed, onMounted } from "vue";
import { useStore } from '../../store/Store';
import placeholderImage from '../../assets/placeholder.svg';

const placeholderImagePath = ref(placeholderImage);

const store = useStore();
const loading = ref(false);

const generateBtnLabel = computed(() => {
    return store.sd_base64String ? 'Modify' : 'Generate';
});
const base64Image = computed(() => {
    return store.sd_base64String ? `data:image/png;base64,${store.sd_base64String}` : '';
});

onMounted(async () => {
    if(store.sd_img_to_load) {
        if(store.sd_img_to_load.includes("storage.googleapis.com")) {
            try {
                loading.value = true;
                store.sd_base64String = await convertImageUrlToBase64(store.sd_img_to_load); 
                loading.value = false;
            }
            catch (error) {
                console.log(error);
            }
        }
        else {
            store.sd_base64String = imgUrl;
        }
    }
});

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

    store.new_images_buffer.push(store.sd_base64String);
}
</script>

<style scoped>
#sdScreenInputFields {
    display: grid;
    grid-template-columns: 80px auto 80px auto;
    grid-template-rows: 50px 50px 30px 120px auto;
    grid-gap : 5px 0px;
}

.p-inputtext {
    height: 35px;
    width: 60px;
    margin: auto;

    text-align: center;
}

#sdScreenInputFields>label {
    width: fit-content;
    height: fit-content;
    margin: auto;
}

.customPromptLabel {
    grid-row: 3;
    grid-column: 1 / 3;
    margin-left: 0px !important;
    margin-top: 20px !important;
}
.customPromptTextArea {
    grid-row: 4;
    grid-column: 1 / 5;

    width: 100%;
    height: 100px;
    padding: 10px;

    text-align: left;
}
.generateButton {
    grid-row: 5;
    grid-column: 1 / 5;

    width: 100%;
    justify-content: center;
    margin-top: 20px;
}


#imagePart {
    display: grid;
    grid-template-columns: auto auto;
    grid-template-rows: auto auto;
    grid-gap: 10px;

    margin-left: 15px;
}
#imagePart>img {
    width: 400px;
    height: 400px;
    grid-row: 1;
    grid-column: 1 / 3;

    border: dashed black 2px;
}
#imagePart .p-button {
    width: 100%;
    justify-content: center;
}
.acceptButton {
    grid-row: 2;
    grid-column: 1;
}
.discardButton {
    grid-row: 2;
    grid-column: 2;
}
</style>