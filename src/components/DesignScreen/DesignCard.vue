<template>
    <div id="designCard">
        <img v-if="images.length > 0" :src="images[0]" alt="img">
        <p v-else>No image present</p>
        <h1>{{ props.design.design_name }}</h1>
        <Button label="Edit" @click="goToCreateScreen"></Button>
        <Button label="Delete" @click="deleteDesign(props.design.design_id)"></Button>
    </div>
</template>

<script setup>
import Button from 'primevue/button';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useDesignStore } from '../../store/DesignStore';
import { deleteImageFromStorage, deleteDesignFromDb } from '../../api/FirebaseApi';

const props = defineProps(["design"]);
const images = ref(props.design.image_links);

const router = useRouter();
const designStore = useDesignStore();

const goToCreateScreen = () => {
  designStore.setDesign(props.design);
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
    }
    catch (error) {
        console.log(error);
    }
}
</script>

<style scoped>
#designCard>img, #designCard>p {
    width: 100px;
    height: 100px;
}

#designCard {
    width: fit-content
}
</style>