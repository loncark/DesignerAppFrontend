<template>
    <div class="designCard">
        <div class="designCardImageGrid">
            <img v-if="images.length > 0" :src="images[0]" alt="img">
            <img v-else :src="placeholderImagePath"/>
            <img v-if="images.length > 1" :src="images[1]" alt="img">
            <img v-else :src="placeholderImagePath"/>
            <img v-if="images.length > 2" :src="images[2]" alt="img">
            <img v-else :src="placeholderImagePath"/>
            <img v-if="images.length > 3" :src="images[3]" alt="img">
            <img v-else :src="placeholderImagePath"/>
        </div>
        <h3>{{ props.design.design_name }}</h3>
        <div class="buttonRow flex-row">
            <Button v-if="!exportInProgress" icon="pi pi-download" title="Export" severity="secondary" text rounded @click="exportDesign()"></Button>
            <ProgressSpinner v-else/>

            <Button icon="pi pi-pen-to-square" title="Edit" severity="secondary" text rounded @click="goToCreateScreen"></Button>
            <Button icon="pi pi-trash" title="Delete" severity="danger" text rounded @click="deleteDesign(props.design.design_id)"></Button>
        </div>
    </div>
</template>

<script setup>
import Button from 'primevue/button';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '../../store/Store';
import { deleteImageFromStorage, deleteDesignFromDb } from '../../api/FirebaseApi';
import { defineProps, defineEmits } from 'vue';
import placeholderImage from '../../assets/placeholder.svg';
import { downloadDesign } from '../../api/FirebaseApi';
import ProgressSpinner from 'primevue/progressspinner';

const placeholderImagePath = ref(placeholderImage);
const props = defineProps(["design"]);
const images = ref(props.design.image_links);
const emit = defineEmits(['design-deleted']);

const router = useRouter();
const store = useStore();
const exportInProgress = ref(false);

const goToCreateScreen = () => {
  store.design = props.design;
  router.push('/create');
};

const deleteDesign = async (id) => {
    try {
        for (let i = 0; i < images.length; i++) {
            await deleteImageFromStorage(images[i]);
            let temp = images[i];
            props.design.image_links = props.design.image_links.filter(link => link !== temp)
        }

        await deleteDesignFromDb(id);
        emit('design-deleted');
    }
    catch (error) {
        console.log(error);
    }
}

const exportDesign = async () => {
    try {
        exportInProgress.value = true;
        const result = await downloadDesign(props.design);
        
        if (result.success) {
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = result.url;
            a.download = result.fileName;
            
            document.body.appendChild(a);
            a.click();
            
            window.URL.revokeObjectURL(result.url);
            document.body.removeChild(a);
        } else {
            console.error('Failed to download design:', result.error);
        }
    } catch (error) {
        console.error('Error in exportDesign:', error);
    } finally {
        exportInProgress.value = false;
    }
}
</script>

<style scoped>
.designCard {
    width: fit-content;
    border-radius: 10px;
    padding: 15px 15px 10px 15px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
.designCard>h3 {
    height: 45px;
    width: 240px;
    overflow: hidden;
    text-overflow: clip;

    /* does proper ellipsis */
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}

.designCardImageGrid {
    display: grid;
    grid-template: auto auto / auto auto;
    margin-bottom: 10px;
}
.designCardImageGrid>img {
    width: 120px;
    height: 120px;
    border-radius: 10px;
}

.buttonRow {
    justify-content: space-between;
    align-items: center;
    margin-bottom: revert;
}
.buttonRow .pi {
    font-size: larger;
}
.buttonRow .p-progress-spinner {
    margin: 0px;
    margin-left: 15px;
    width: 30px;
    height: 25px;
}
</style>