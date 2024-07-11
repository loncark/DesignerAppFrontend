<template>
    <div id="geminiScreen">
        <div class="geminiGrid">
            <Textarea v-model="store.gemini_input"></Textarea>
            <Button icon="pi pi-hashtag" label="Tags prompt" @click="fillIn(TAGS_PROMPT)"></Button>
            <Button icon="pi pi-bars" label="Title prompt" @click="fillIn(TITLE_PROMPT)"></Button>
            <Button icon="pi pi-lightbulb" label="Idea prompt" @click="fillIn(IDEA_PROMPT)"></Button>
            <Button icon="pi pi-play" label="Generate" @click="executeQuery"></Button>
        </div>

        <span v-if="loading">Loading...</span>
        <p v-else>
            {{ store.gemini_response }}
        </p>
    </div>
</template>

<script setup>
import Textarea from 'primevue/textarea';
import Button from 'primevue/button';
import { queryGemini } from '../../api/GeminiApi';
import {TAGS_PROMPT, TITLE_PROMPT, IDEA_PROMPT} from '../../utils/constants';
import { useStore } from '../../store/Store';
import { ref } from 'vue';

const store = useStore();
const loading = ref(false);

const fillIn = (prompt) => {
    store.gemini_input = prompt;
}

const executeQuery = async () => {
    try {
        loading.value = true;
        const result = await queryGemini(store.gemini_input);
        store.gemini_response = result;

    } catch (error) {
        console.log(`Error: ${error.message}`); 
    } finally {
        loading.value = false;
    }
};

</script>


<style scoped>
.geminiGrid {
    display: grid;
    grid-template-columns: 300px 150px 150px;
    grid-template-rows: 50px 50px;
    align-items: center;
    grid-gap: 0px 10px;

    margin-bottom: 15px;
}

.geminiGrid>* {
    margin: auto;
}

.geminiGrid .p-button {
    width: 100%;
    justify-content: center;
}
:deep(.p-button-icon), 
:deep(.p-button-label) {
    margin: 0px 4px 0px 4px;
}

.geminiGrid>.p-inputtextarea {
    grid-row: 1 / 3;
    height: 100%;
    padding: 5px;
}
</style>