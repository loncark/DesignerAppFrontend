<template>
    <div id="designCard">
        <img v-if="images.length > 0" :src="images[0]" alt="img">
        <p v-else>No image present</p>
        <h1>{{ props.design.design_name }}</h1>
        <Button @click="goToCreateScreen">Edit</Button>
    </div>
</template>

<script setup>
import Button from 'primevue/button';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useDesignStore } from '../../store/DesignStore';

const props = defineProps(["design"]);
const images = ref(props.design.image_links);

const router = useRouter();
const designStore = useDesignStore();

const goToCreateScreen = () => {
  designStore.setDesign(props.design);
  router.push('/create');
};
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