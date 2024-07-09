<template>
    <div id="createScreen" >
        <h1 class="big-title">Create new design</h1>
        <div class="flex-row">
            <div id="leftPart">
                <div id="leftPartInputFields">
                    <div class="first-row flex-row">
                        <InputText v-model="store.design.design_name" placeholder="Design name"></InputText>
                        <Button label="Save" @click="handleSaveClick"></Button>
                    </div>
                
                    <label>Listing title</label>
                    <Textarea v-model="store.design.title"></Textarea>

                    <label>Tags</label>
                    <div>
                        <div class="flex-row">
                            <InputText v-model="newTag" placeholder="Type tag and click 'Add'"></InputText>
                            <Button label="Add" @click="addTag"></Button>
                        </div>
                        <!-- DO NOT USE INDEX AS KEY WHEN DELETING ITEMS IN V-FOR! -->
                        <Chip v-for="(tag, index) in store.design.tags" :key="tag" :label="tag" removable @remove="removeTag(index)" class="flex-row"/>
                    </div>

                    <label>Related links</label>
                    <div>
                        <div class="flex-row">
                            <InputText v-model="newLink" placeholder="Paste url and click 'Add'"></InputText>
                            <Button label="Add" @click="addLink"></Button>
                        </div>
                        <Chip v-for="(link, index) in store.design.related_links" :key="link" :label="link" removable @remove="removeLink(index)" class="flex-row"/>
                    </div>
                </div>

                <h1>Images</h1>
                <ImageList v-if="store.design.image_links.length > 0 || store.new_images_buffer.length > 0" :images="store.design.image_links" :newImages="store.new_images_buffer"/>
                <span v-else>No images present.</span>
            </div>


            <div id="rightPart">
                <div class="flex-row">
                    <div class="tabItem" @click="changeActiveTab('gemini')">
                        <i class="pi pi-microchip-ai"></i>
                        <span>Gemini</span>
                    </div>
                    <div class="tabItem" @click="changeActiveTab('sd')">
                        <i class="pi pi-image"></i>
                        <span>Stable Diffusion</span>
                    </div>
                    <div class="tabItem" @click="changeActiveTab('trademark')">
                        <i class="pi pi-briefcase"></i>
                        <span>Trademarks</span>
                    </div>
                </div>

            <GeminiScreen v-if="active === 'gemini'"/>
            <StableDiffusionScreen v-else-if="active === 'sd'"/>
            <TrademarkScreen v-else/>
            </div>
        </div>
    </div>
</template>

<script setup>
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import ImageList from './ImageList.vue'
import { useStore } from '../../store/Store';
import { ref } from 'vue';
import Chip from 'primevue/chip';
import { uploadDesignToRealtimeDb } from '../../api/FirebaseApi'
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'vue-router';
import StableDiffusionScreen from './StableDiffusionScreen.vue';
import GeminiScreen from './GeminiScreen.vue';
import TrademarkScreen from './TrademarkScreen/TrademarkScreen.vue';
import { uploadImgToFirebaseStorage } from '../../api/FirebaseApi'
import Textarea from 'primevue/textarea';

const store = useStore();
const router = useRouter();

const newTag = ref('');
const newLink = ref('');
const active = ref('gemini');

const changeActiveTab = (keyword) => {
    active.value = keyword;
}

const removeTag = (index) => {
    store.design.tags.splice(index, 1);
}
const addTag = () => {
    store.design.tags.push(newTag.value);
    newTag.value = "";
}
const removeLink = (index) => {
    store.design.related_links.splice(index, 1);
}
const addLink = () => {
    store.design.related_links.push(newLink.value);
    newLink.value = "";
}

const handleSaveClick = async () => {
    if (store.design.design_id === null) {
        store.design.design_id = uuidv4();
    }
    
    try {
        for (let imgUrl of store.deleted_images_buffer) {
            await deleteImageFromStorage(imgUrl);
        }
        
        for (let image of store.new_images_buffer) {
            let downloadUrl = await uploadImgToFirebaseStorage(image, store.design.design_id);
            console.log("Image successfully uploaded");

            store.design.image_links.push(downloadUrl);
        }

        await uploadDesignToRealtimeDb(store.design);

        store.resetDesign();
        newTag.value = '';
        newLink.value = '';
        
        router.back();
    }
    catch (error) {
        console.log(error);
    }
}
</script>

<style scoped>
#createScreen {
    margin-left: 10px;
}

.big-title {
    margin-bottom: 10px;
}

#leftPartInputFields {
    display: grid;
    grid-template-rows: auto auto auto auto;
    grid-template-columns: 150px auto;

    margin: 0px 20px 10px 0px;
    padding: 0px 20px 0px 0px;
    width: 600px;

    border: solid black;
    border-width: 0px 2px 0px 0px;
}

#leftPartInputFields>* {
    margin-top: 5px;
    margin-bottom: 5px;
}

#leftPartInputFields>label {
    width: fit-content;
    height: fit-content;
    margin: auto;
}

.first-row {
    grid-row: 1;
    grid-column: 1/3;
}

.p-inputtext {
    height: 35px;
    text-align: left;
    padding-left: 10px;
    margin-right: 10px;
}

.p-inputtextarea {
    padding-left: 0px;
    height: 80px;
}


#rightPart {
    width: 700px;
}

.tabItem {
    padding: 10px;
    margin: 10px;

    border: solid black;
    border-width: 0px 0px 1px 0px;
}

.tabItem i {
    margin-right: 10px;
}
</style>