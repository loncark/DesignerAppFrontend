<template>
    <div id="createScreen">
        <div id="createScreenTopBar">
            <InputText v-model="design.design_name" placeholder="Design name"></InputText>
            <Button label="Save" @click="saveDesignToFirebase"></Button>
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
        <ImageList :images="design.image_links"/>
    </div>
</template>

<script setup>
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import ImageList from './ImageList.vue'
import { useDesignStore } from '../../store/DesignStore';
import { ref, onMounted } from 'vue';
import Chip from 'primevue/chip';
import { nullDesign } from '../../utils/constants';
import { uploadDesignToRealtimeDb } from '../../api/FirebaseApi'

const design = ref(nullDesign);
const designStore = useDesignStore();
const newTag = ref('');
const newLink = ref('');

onMounted(() => {
    design.value = designStore.design;
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

const saveDesignToFirebase = async () => {
    const response = await uploadDesignToRealtimeDb(design.value);
    console.log(response);
}
</script>

<style scoped>
#createScreen {
    display: flex;
    flex-direction: column;
}

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