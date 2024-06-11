<template>
    <div id="designScreen">
        <div id="designScreenTopBar">
            <h1>Idea name</h1>
            <Button label="Save"></Button>
        </div>

        <div id="designScreenInputFields">
            <label>Title</label>
            <Textarea></Textarea>
            <label>Tags</label>
            <Textarea></Textarea>
            <label>Related links</label>
            <Textarea></Textarea>
        </div>

        <ImageList/>
    </div>
</template>

<script setup>
import Button from 'primevue/button';
import Textarea from 'primevue/textarea';
import ImageList from './ImageList.vue'
</script>

<style scoped>
#designScreen {
    display: grid;
    grid-auto-columns: 2;
    grid-auto-rows: 2;
}

#designScreenTopBar {
    grid-row: 1;
    grid-column: 1 / 3;
    display: flex;
    flex-direction: row;
}

#designScreenInputFields {
    grid-row: 2;
    grid-column: 1;

    display: grid;
    grid-template-rows: auto auto auto;
    grid-template-columns: auto auto;
}

</style>