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

        <h1>Images</h1>
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
    display: flex;
    flex-direction: column;
}

#designScreenTopBar {
    display: flex;
    flex-direction: row;
}

#designScreenInputFields {
    display: grid;
    grid-template-rows: auto auto auto;
    grid-template-columns: auto auto;
}

</style>