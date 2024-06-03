<template>
    <div id="geminiScreen">
        <Textarea></Textarea>
        <Button label="Tags prompt"></Button>
        <Button label="Title prompt"></Button>
        <Button label="Idea prompt"></Button>
        <Button label="Generate"></Button>
        <p>
            Awaiting prompt.
        </p>
    </div>
</template>

<script setup>
import Textarea from 'primevue/textarea';
import Button from 'primevue/button';

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