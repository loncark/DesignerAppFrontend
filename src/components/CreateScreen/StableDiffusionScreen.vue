<template>
    <div id="sdScreen" class="flex-row">
        <div class="sdScreenInputFields flex-column">
            <label>Prompt</label>
            <Textarea class="promptTextArea" v-model="store.sd_prompt_input" :class="{'invalid-input': !inputIsValid(store.sd_prompt_input)}"></Textarea>
            <label>Negative prompt</label>
            <Textarea class="promptTextArea" v-model="store.sd_negative_prompt_input" :class="{'invalid-input': !inputIsValid(store.sd_negative_prompt_input)}"></Textarea>

            <Button class="generateButton" 
                icon="pi pi-play-circle" 
                :label="generateBtnLabel" 
                @click="handleGenerateClick"
                :disabled="!inputIsValid(store.sd_prompt_input) || !inputIsValid(store.sd_negative_prompt_input)"/>
        </div>

        <ProgressSpinner v-if="loading"/>

        <div v-else id="imagePart">
            <img v-if="base64Image" :src="base64Image">
            <img class="dashedBorder" v-else :src="placeholderImagePath"/>
            <Button class="acceptButton" severity="success" icon="pi pi-check" label="Accept" @click="acceptImage" :disabled="!store.sd_base64String"></Button>
            <Button class="discardButton" severity="danger" icon="pi pi-times" label="Discard" @click="discardImg"></Button>
        </div>
        
    </div>
</template>

<script setup>
import Button from 'primevue/button';
import Textarea from "primevue/textarea";
import { querySDtxt2img, querySDimg2img } from '../../api/StableDiffusionApi'
import { convertImageUrlToBase64 } from '../../api/FirebaseApi'
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useStore } from '../../store/store';
import placeholderImage from '../../assets/placeholder.svg';
import ProgressSpinner from 'primevue/progressspinner';
import { dimesionInputIsValid, stepInputIsValid, inputIsValid } from "../../utils/validation";
import eventBus from '../../utils/EventBus'

const placeholderImagePath = ref(placeholderImage);

const store = useStore();
const loading = computed (() => store.sd_loading);

const generateBtnLabel = computed(() => {
    return store.sd_base64String ? 'Modify' : 'Generate';
});
const base64Image = computed(() => {
    return store.sd_base64String ? `data:image/png;base64,${store.sd_base64String}` : '';
});

onMounted(() => {
  eventBus.on('load-image', loadImage);
});
onUnmounted(() => {
  eventBus.off('load-image', loadImage);
});

const loadImage = async () => {
    if(store.sd_img_to_load) {
        if(store.sd_img_to_load.includes("storage.googleapis.com")) {
            try {
                loading.value = true;
                store.sd_base64String = await convertImageUrlToBase64(store.sd_img_to_load); 
            }
            catch (error) {
                console.log(error);
            } finally {
                loading.value = false;
            }
        }
        else {
            store.sd_base64String = store.sd_img_to_load;
        }
    }
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
        store.sd_loading = true;

        let params = {
            "alwayson_scripts": {
                "API payload": {"args": []}, 
                "Extra options": {"args": []}, 
                "Refiner": {"args": [false, "", 0.8]}, 
                "Seed": {"args": [456789123, false, -1, 0, 0, 0]}}, 
                "batch_size": 1, 
                "cfg_scale": 7, 
                "comments": {}, 
                "disable_extra_networks": false, 
                "do_not_save_grid": false, 
                "do_not_save_samples": false, 
                "enable_hr": false, 
                "height": 512, 
                "hr_negative_prompt": "", 
                "hr_prompt": "", 
                "hr_resize_x": 0, 
                "hr_resize_y": 0, 
                "hr_scale": 2, 
                "hr_second_pass_steps": 0, 
                "hr_upscaler": "Latent", 
                "n_iter": 1, 
                "negative_prompt": store.sd_negative_prompt_input, 
                "override_settings": {}, 
                "override_settings_restore_afterwards": true, 
                "prompt": "printdesign, " + store.sd_prompt_input, 
                "s_churn": 0.0, 
                "s_min_uncond": 0.0, 
                "s_noise": 1.0, 
                "s_tmax": null, 
                "s_tmin": 0.0, 
                "sampler_name": "DPM++ 2M Karras", 
                "script_args": ["None", "None", "CPU", true, "DPM++ 2M Karras", false, false, "None", 0.8], 
                "script_name": "accelerate with openvino", 
                "seed": 456789123, 
                "seed_enable_extras": true, 
                "seed_resize_from_h": -1, 
                "seed_resize_from_w": -1, 
                "steps": 20, 
                "styles": [], 
                "subseed": -1, 
                "subseed_strength": 0, 
                "width": 512
            }
        const response = await querySDtxt2img(params);
        store.sd_base64String = response.images[0];

    } catch (error) {
        console.log(`Error: ${error.message}`); 
    } finally {
        store.sd_loading = false;
    }
};

const executeImg2Img = async () => {
    try {
        store.sd_loading = true;
        
        let params = {
            "alwayson_scripts": {
                "API payload": {"args": []}, 
                "Extra options": {"args": []}, 
                "Refiner": {"args": [false, "", 0.8]}, 
                "Seed": {"args": [456789123, false, -1, 0, 0, 0]}}, 
                "batch_size": 1, 
                "cfg_scale": 7, 
                "comments": {}, 
                "denoising_strength": 0.65, 
                "disable_extra_networks": false, 
                "do_not_save_grid": false, 
                "do_not_save_samples": false, 
                "height": 512, 
                "image_cfg_scale": 1.5, 
                "init_images": [store.sd_base64String], 
                "initial_noise_multiplier": 1.0, 
                "inpaint_full_res": 0, 
                "inpaint_full_res_padding": 32, 
                "inpainting_fill": 1, 
                "inpainting_mask_invert": 0, 
                "mask_blur": 4, 
                "mask_blur_x": 4, 
                "mask_blur_y": 4, 
                "n_iter": 1, 
                "negative_prompt": store.sd_negative_prompt_input, 
                "override_settings": {}, 
                "override_settings_restore_afterwards": true, 
                "prompt": "printdesign, " + store.sd_prompt_input, //Christmas tree, red needles, decorated with colorful ornaments, star on top, snowflakes, simple background 
                "resize_mode": 0, 
                "s_churn": 0.0, 
                "s_min_uncond": 0.0, 
                "s_noise": 1.0, 
                "s_tmax": null, 
                "s_tmin": 0.0, 
                "sampler_name": "DPM++ 2M Karras", 
                "script_args": ["None", "None", "CPU", true, "DPM++ 2M Karras", false, false, "None", 0.8], 
                "script_name": "accelerate with openvino", 
                "seed": 456789123, 
                "seed_enable_extras": true, 
                "seed_resize_from_h": -1, 
                "seed_resize_from_w": -1, 
                "steps": 20, 
                "styles": [], 
                "subseed": -1, 
                "subseed_strength": 0, 
                "width": 512
            }

        const response = await querySDimg2img(params);
        store.sd_base64String = response.images[0];

    } catch (error) {
        console.log(`Error: ${error.message}`); 
    } finally {
        store.sd_loading = false;
    }
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
.sdScreenInputFields {
    height: 450px;
}

.promptTextArea {
    width: 100%;
    height: 150px;
    padding: 10px;
    margin: auto;
    margin-top: 8px !important;

    text-align: left;
}
.generateButton {
    width: 100%;
    padding: 10px;
    height: fit-content;
}


#imagePart {
    display: grid;
    grid-template-columns: auto auto;
    grid-template-rows: auto auto;
    grid-gap: 10px;

    margin-left: 20px;
}
#imagePart>img {
    width: 400px;
    height: 400px;
    grid-row: 1;
    grid-column: 1 / 3;
}
.dashedBorder {
    border: dashed black 2px;
}

#imagePart .p-button {
    width: 100%;
    justify-content: center;
}
.acceptButton {
    grid-row: 2;
    grid-column: 1;
    padding: 10px;
}
.discardButton {
    grid-row: 2;
    grid-column: 2;
    padding: 10px;
}

.p-progress-spinner {
    margin: auto;
}
</style>