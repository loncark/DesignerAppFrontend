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
            <Button icon="pi pi-pen-to-square" aria-label="Edit" severity="secondary" @click="goToCreateScreen"></Button>
            <Button icon="pi pi-trash" aria-label="Delete" severity="danger" @click="deleteDesign(props.design.design_id)"></Button>
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

const placeholderImagePath = ref(placeholderImage);
const props = defineProps(["design"]);
const images = ref(props.design.image_links);
const emit = defineEmits(['design-deleted']);

const router = useRouter();
const store = useStore();

const goToCreateScreen = () => {
  store.design = props.design;
  store.resetCreateScreen();
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
</script>

<style scoped>
.designCard {
    width: fit-content;
    border-radius: 10px;
}
.designCard>* {
    margin-bottom: 10px;
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
}
.designCardImageGrid>img {
    width: 120px;
    height: 120px;
    border-radius: 10px;
}

.buttonRow {
    justify-content: end;
    align-items: center;
}
.buttonRow .p-button {
    margin-left: 5px;
}
</style>