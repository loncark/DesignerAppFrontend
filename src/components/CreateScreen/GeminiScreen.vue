<template>
    <div id="geminiScreen">
        <div class="geminiGrid">
            <Textarea v-model="store.gemini_input" :class="{'invalid-input': !inputIsValid(store.gemini_input)}"></Textarea>
            <Button icon="pi pi-hashtag" label="Tags prompt" severity="secondary" @click="fillIn(TAGS_PROMPT)"></Button>
            <Button icon="pi pi-bars" label="Title prompt" severity="secondary" @click="fillIn(TITLE_PROMPT)"></Button>
            <Button icon="pi pi-lightbulb" label="Idea prompt" severity="secondary" @click="fillIn(IDEA_PROMPT)"></Button>
            <Button icon="pi pi-play" label="Generate" @click="executeQuery" :disabled="!inputIsValid(store.gemini_input) || store.gemini_input === ''"></Button>
        </div>

        <ProgressSpinner v-if="loading" ></ProgressSpinner>
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
import ProgressSpinner from 'primevue/progressspinner';
import { inputIsValid } from '../../utils/validation';

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
    grid-template-columns: auto 150px 150px;
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
    padding: 10px;
}

.geminiGrid>.p-inputtextarea {
    grid-row: 1 / 3;
    height: 100%;
    padding: 5px;
}

.p-progress-spinner {
    top: 50vh;
    left: 60vw;
}
</style>