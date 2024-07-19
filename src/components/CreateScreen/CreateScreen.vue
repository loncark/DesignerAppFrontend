<template>
    <div id="createScreen" >
        <div class="titlePart flex-row">
            <i class="pi pi-plus"></i>
            <h1 class="big-title">{{ title }} design</h1>
            <Button label="Empty design" icon="pi pi-refresh" @click="store.resetCreateScreen" severity="secondary" id="resetButton"></Button>
            <Button label="Save design" icon="pi pi-save" @click="handleSaveClick" :disabled="!nameIsValid(store.design.design_name) || !titleIsValid(store.design.title)"></Button>
        </div>
        <div class="flex-row">
            <div id="leftPart">
                <div id="leftPartInputFields">
                    <InputText class="first-row" v-model="store.design.design_name" placeholder="Design name" :class="{'invalid-input': !nameIsValid(store.design.design_name)}"></InputText>
                
                    <label id="listingTitleLabel">Listing title</label>
                    <Textarea v-model="store.design.title" :class="{'invalid-input': !titleIsValid(store.design.title)}"></Textarea>

                    <label>Tags</label>
                    <div>
                        <div class="flex-row">
                            <InputText v-model="newTag" placeholder="Type tag and click 'Add'" @keyup.enter="addTag" :class="{'invalid-input': !inputIsValid(newTag)}"/>
                            <Button icon="pi pi-plus" aria-label="Add" severity="secondary" @click="addTag" title="Copy the answer from gemini to add all generated tags"></Button>
                        </div>
                        <div class="chipSet flex-row">
                            <Chip v-for="(tag, index) in store.design.tags" :key="tag" :label="tag" removable @remove="removeTag(index)" class="flex-row"/>
                        </div>
                    </div>

                    <label>Related links</label>
                    <div>
                        <div class="flex-row">
                            <InputText v-model="newLink" placeholder="Paste url and click 'Add'" @keyup.enter="addLink" :class="{'invalid-input': !linkIsValid(newLink)}"></InputText>
                            <Button icon="pi pi-plus" aria-label="Add" severity="secondary" @click="addLink"></Button>
                        </div>
                        <div class="chipSet flex-row">
                            <Chip v-for="(link, index) in store.design.related_links" :key="link" :label="link" removable @remove="removeLink(index)" class="flex-row"/>
                        </div>
                    </div>
                </div>

                <h1 id="imagesTitle">Images</h1>
                <ImageList v-if="store.design.image_links.length > 0 || store.new_images_buffer.length > 0" :images="store.design.image_links" :newImages="store.new_images_buffer"/>
                <span v-else>No images present.</span>
            </div>


            <div id="rightPart">
                <TabMenu :model="tabItems" v-model:activeIndex="active"/>

                <GeminiScreen v-if="active === 0"/>
                <StableDiffusionScreen v-else-if="active === 1"/>
                <TrademarkScreen v-else/>
            </div>
        </div>
    </div>
</template>

<script setup>
import TabMenu from 'primevue/tabmenu';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import ImageList from './ImageList.vue'
import { useStore } from '../../store/Store';
import { ref, computed, onMounted } from 'vue';
import Chip from 'primevue/chip';
import { uploadDesignToRealtimeDb } from '../../api/FirebaseApi'
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'vue-router';
import StableDiffusionScreen from './StableDiffusionScreen.vue';
import GeminiScreen from './GeminiScreen.vue';
import TrademarkScreen from './TrademarkScreen/TrademarkScreen.vue';
import { uploadImgToFirebaseStorage } from '../../api/FirebaseApi'
import Textarea from 'primevue/textarea';
import { titleIsValid, tagIsValid, linkIsValid, nameIsValid, inputIsValid } from '../../utils/validation';

const store = useStore();
const router = useRouter();

const title = computed(() => store.design.design_id !== null? 'Edit' : 'Create new');
const newTag = ref('');
const newLink = ref('');
const active = ref(0);

const tabItems = ref([
  { label: 'Gemini', icon: 'pi pi-microchip-ai', command: () => changeActiveTab(0) },
  { label: 'Stable Diffusion', icon: 'pi pi-image', command: () => changeActiveTab(1) },
  { label: 'Trademarks', icon: 'pi pi-briefcase', command: () => changeActiveTab(2) },
]);

const changeActiveTab = (keyword) => {
    active.value = keyword;
}

const removeTag = (index) => {
    store.design.tags.splice(index, 1);
}
const addTag = () => {
    if(newTag.value === '') return;
    else if(newTag.value.includes(', ')) {
        let tags = newTag.value.split(',');
        let badTags = [];
        for (let tag of tags) {
            if (tag === '' || !tagIsValid(tag)) {
                badTags.push(tag);
            }
            else store.design.tags.push(tag);
        }
        newTag.value = badTags.join(',');
    }
    else if(tagIsValid(tag)) {
        store.design.tags.push(newTag.value);
        newTag.value = "";
    }
}
const removeLink = (index) => {
    store.design.related_links.splice(index, 1);
}
const addLink = () => {
    if(newLink.value === '' || !linkIsValid(newLink.value)) return;
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

        store.resetCreateScreen();
        newTag.value = '';
        newLink.value = '';
        
        router.push('/');
    }
    catch (error) {
        console.log(error);
    }
}

onMounted(() => {
    store.main_active_tab = 2;
})
</script>

<style scoped>
#createScreen {
    margin-left: 20px;
    margin-top: 10px;
}

.titlePart {
    align-items: center;
    width: 95%;
    margin-bottom: 5px;
}
.titlePart i {
    font-size: 45px;
    margin-right: 10px;
}
.titlePart .p-button {
    font-size: larger;
    padding: 20px;
    margin-left: 20px;
}
.big-title {
    margin-bottom: 10px;
}
#resetButton {
    font-size: revert;
    padding: 10px;
    margin-left: auto;
}

#leftPart {
    margin-right: 20px;
    padding-right: 20px;
    border-right: solid black 2px;
}


#leftPartInputFields {
    display: grid;
    grid-template-rows: auto auto auto auto;
    grid-template-columns: 150px auto;

    width: 600px;
}
#leftPartInputFields>* {
    margin-top: 5px;
    margin-bottom: 5px;
}
#leftPartInputFields>label {
    width: fit-content;
    height: fit-content;
    margin: auto;
    margin-top: 15px;
}
#listingTitleLabel {
    margin: auto !important;
}

#imagesTitle {
    margin-bottom: 15px;
    margin-top: 15px;
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
    height: 80px;
    padding: 5px;
}

.p-chip {
    justify-content: space-between;
    align-items: center;

    border: 1px solid black;
    border-radius: 20px;
    padding: 0px 8px 0px 8px;
    margin: 5px 10px 0px 0px;
}
.chipSet {
    flex-wrap: wrap;
}



#rightPart {
    width: 700px;
}

:deep(.p-menuitem-link) {
    padding: 10px 15px 10px 15px;
}
:deep(.p-tabmenu) {
    border: none;
    margin-bottom: 15px;
}
</style>