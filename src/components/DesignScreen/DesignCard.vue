<template>
    <div id="designCard">
        <img v-if="images.length > 0" :src="images[0]" alt="img">
        <span v-else>No image present</span>
        <span>{{ props.design.design_name }}</span>
        <Button label="Edit" @click="goToCreateScreen"></Button>
        <Button label="Delete" @click="deleteDesign(props.design.design_id)"></Button>
    </div>
</template>

<script setup>
import Button from 'primevue/button';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '../../store/Store';
import { deleteImageFromStorage, deleteDesignFromDb } from '../../api/FirebaseApi';
import { defineProps, defineEmits } from 'vue';

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
#designCard>img {
    width: 100px;
    height: 100px;
}

#designCard {
    width: fit-content
}
</style>