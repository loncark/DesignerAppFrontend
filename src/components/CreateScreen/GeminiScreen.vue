<template>
    <div id="geminiScreen">
        <div class="geminiGrid">
            <Textarea v-model="store.gemini_input"></Textarea>
            <Button label="Tags prompt" @click="fillIn(TAGS_PROMPT)"></Button>
            <Button label="Title prompt" @click="fillIn(TITLE_PROMPT)"></Button>
            <Button label="Idea prompt" @click="fillIn(IDEA_PROMPT)"></Button>
            <Button label="Generate" @click="executeQuery"></Button>
        </div>
        <p>
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

const store = useStore();

const fillIn = (prompt) => {
    store.gemini_input = prompt;
}

const executeQuery = async () => {
    try {
        const result = await queryGemini(store.gemini_input);
        store.gemini_response = result;
    } catch (error) {
        console.log(`Error: ${error.message}`); 
    }
};

</script>


<style scoped>
.geminiGrid {
    display: grid;
    grid-template-columns: 300px 100px 100px;
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

.geminiGrid>.p-inputtextarea {
    grid-row: 1 / 3;
    height: 100%;
    padding: 5px;
}
</style>