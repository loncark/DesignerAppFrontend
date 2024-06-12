<template>
    <div id="sdScreen">
        <h1>Stable Diffusion</h1>

        <div id="sdScreenInputFields">
            <label>No iterations</label>
            <InputText></InputText>
            <label>Steps</label>
            <InputText></InputText>
            <label>Width</label>
            <InputText></InputText>
            <label>Height</label>
            <InputText></InputText>

            <label>Custom prompt</label>
            <Textarea></Textarea>

            <Button label="Generate" @click="executeQuery"></Button>
        </div>

        <p v-if="loading">Loading...</p>
        <div v-else id="imagePart">
            <img v-if="base64Image" :src="base64Image">
            <img v-else src="C:\Users\Kristina\Documents\Diplomski rad\DesignerAppFrontend\src\assets\person.png"/>
            <Button id="acceptButton" label="Accept"></Button>
            <Button id="discardButton" label="Discard"></Button>
        </div>
        
    </div>
</template>

<script setup>
import InputText from "primevue/inputtext";
import Button from 'primevue/button';
import Textarea from "primevue/textarea";
import { querySDtxt2img } from '../api/StableDiffusionApi'
import { ref, computed } from "vue";

const loading = ref(false);
const base64String = ref(null);

const base64Image = computed(() => {
    return base64String.value ? `data:image/png;base64,${base64String.value}` : '';
});

const executeQuery = async () => {
    try {
        loading.value = true;
        const response = await querySDtxt2img();
        base64String.value = response.images[0]
        loading.value = false;
    } catch (error) {
        console.log(`Error: ${error.message}`); 
    }
};
</script>

<style scoped>
#sdScreen {
    display: grid;
    grid-template-columns: auto auto;
    grid-template-rows: auto auto;
}

#sdScreen>h1 {
    grid-row: 1;
    grid-column: 1 / 3;
}

#sdScreenInputFields {
    grid-column: 1;
    grid-row: 2;

    display: grid;
    grid-template-columns: auto auto;
    grid-template-rows: auto auto auto auto auto auto;
}

#sdScreenInputFields>Button {
    grid-row: 6;
    grid-column: 1 / 3;
}

#imagePart {
    grid-column: 2;
    grid-row: 2;

    display: grid;
    grid-template-columns: auto auto;
    grid-template-rows: auto auto;
}

#imagePart>img {
    width: 400px;
    height: 400px;
    grid-row: 1;
    grid-column: 1 / 3;
}

#acceptButton {
    grid-row: 2;
    grid-column: 1;
}

#disccardtButton {
    grid-row: 2;
    grid-column: 2;
}
</style>