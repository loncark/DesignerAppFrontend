<template>
    <div id="createScreen" class="flex-row">
        <div id="leftPart">
            <div id="createScreenTopBar">
                <InputText v-model="design.design_name" placeholder="Design name"></InputText>
                <Button label="Save" @click="handleSaveClick"></Button>
            </div>

            <div id="createScreenInputFields">
                <label>Title</label>
                <InputText v-model="design.title" placeholder="Listing title"></InputText>

                <label>Tags</label>
                <div>
                    <div class="flex-row">
                        <InputText v-model="newTag" placeholder="Type tag and click 'Add'"></InputText>
                        <Button label="Add" @click="addTag"></Button>
                    </div>
                    <!-- DO NOT USE INDEX AS KEY WHEN DELETING ITEMS IN V-FOR! -->
                    <Chip v-for="(tag, index) in design.tags" :key="tag" :label="tag" removable @remove="removeTag(index)" class="flex-row"/>
                </div>

                <label>Related links</label>
                <div>
                    <div class="flex-row">
                        <InputText v-model="newLink" placeholder="Paste url and click 'Add'"></InputText>
                        <Button label="Add" @click="addLink"></Button>
                    </div>
                    <Chip v-for="(link, index) in design.related_links" :key="link" :label="link" removable @remove="removeLink(index)" class="flex-row"/>
                </div>
            </div>

            <h1>Images</h1>
            <ImageList v-if="design.image_links.length > 0" :images="design.image_links"/>
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
</template>

<script setup>
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import ImageList from './ImageList.vue'
import { useDesignStore } from '../../store/DesignStore';
import { ref, onMounted } from 'vue';
import Chip from 'primevue/chip';
import { uploadDesignToRealtimeDb } from '../../api/FirebaseApi'
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'vue-router';
import StableDiffusionScreen from './StableDiffusionScreen.vue';
import GeminiScreen from './GeminiScreen.vue';
import TrademarkScreen from './TrademarkScreen/TrademarkScreen.vue';

const designStore = useDesignStore();
const design = ref(designStore.design);
const router = useRouter();

const newTag = ref('');
const newLink = ref('');
const active = ref('gemini');

const changeActiveTab = (keyword) => {
    active.value = keyword;
}

onMounted(async () => {
    if (design.value.design_id === null) {
        design.value.design_id = uuidv4();
        try {
            await uploadDesignToRealtimeDb(design.value);
            designStore.design.design_id = design.value.design_id;
        }
        catch (error) {
            console.log(error);
        }
    }
    else {
        design.value = designStore.design;
    }
});

const removeTag = (index) => {
    design.value.tags.splice(index, 1);
}
const addTag = () => {
    design.value.tags.push(newTag.value);
    newTag.value = "";
}
const removeLink = (index) => {
    design.value.related_links.splice(index, 1);
}
const addLink = () => {
    design.value.related_links.push(newLink.value);
    newLink.value = "";
}

const handleSaveClick = async () => {
    try {
        await uploadDesignToRealtimeDb(design.value);

        designStore.resetDesign();
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

#createScreenTopBar {
    display: flex;
    flex-direction: row;
}

#createScreenInputFields {
    display: grid;
    grid-template-rows: auto auto auto;
    grid-template-columns: auto auto;
}
</style>