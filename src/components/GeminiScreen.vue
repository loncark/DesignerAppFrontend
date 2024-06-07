<template>
    <div id="geminiScreen">
        <Textarea v-model="inputText"></Textarea>
        <Button label="Tags prompt" @click="fillIn(TAGS_PROMPT)"></Button>
        <Button label="Title prompt" @click="fillIn(TITLE_PROMPT)"></Button>
        <Button label="Idea prompt" @click="fillIn(IDEA_PROMPT)"></Button>
        <Button label="Generate" @click="executeQuery"></Button>
        <p>
            {{ response }}
        </p>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import Textarea from 'primevue/textarea';
import Button from 'primevue/button';
import { queryGemini } from '../api/GeminiApi';
import {TAGS_PROMPT, TITLE_PROMPT, IDEA_PROMPT} from '../utils/constants';

const inputText = ref('');
const response = ref('Awaiting prompt.');

const fillIn = (prompt) => {
    inputText.value = prompt;
}

const executeQuery = async () => {
    try {
        const result = await queryGemini(inputText.value);
        response.value = result;
    } catch (error) {
        response.value = `Error: ${error.message}`;
    }
};

</script>


<style scoped>
#geminiScreen {
    display: grid;
    grid-auto-columns: auto auto auto;
    grid-auto-rows: auto auto auto;
}

#geminiScreen>Textarea {
    grid-row: 1 / 3
}

#geminiScreen>p {
    grid-row: 3;
    grid-column: 1 / 4
}
</style>