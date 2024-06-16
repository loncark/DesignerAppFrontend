<template>
    <div id="createScreen">
        <div id="createScreenTopBar">
            <h1>{{ design.design_name }}</h1>
            <Button label="Save"></Button>
        </div>

        <div id="createScreenInputFields">
            <label>Title</label>
            <InputText>{{ design.title }}</InputText>

            <label>Tags</label>
            <div>
                <div class="flex-row">
                    <InputText v-model="newTag"></InputText>
                    <Button label="Add" @click="addTag"></Button>
                </div>
                <!-- DO NOT USE INDEX AS KEY WHEN DELETING ITEMS IN V-FOR! -->
                <Chip v-for="(tag, index) in design.tags" :key="tag" :label="tag" removable @remove="removeTag(index)" class="flex-row"/>
            </div>

            <label>Related links</label>
            <div>
                <div class="flex-row">
                    <InputText v-model="newLink"></InputText>
                    <Button label="Add" @click="addLink"></Button>
                </div>
                <Chip v-for="(link, index) in design.image_links" :key="link" :label="link" removable @remove="removeLink(index)" class="flex-row"/>
            </div>
        </div>

        <h1>Images</h1>
        <ImageList/>
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
    design.value.image_links.splice(index, 1);
}

const addLink = () => {
    design.value.image_links.push(newLink.value);
    newLink.value = "";
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