<template>
    <div id="designCard">
        <img src="C:\Users\Kristina\Documents\Diplomski rad\DesignerAppFrontend\src\assets\person.png">
        <h1>Idea Title</h1>
        <Button>Edit</Button>
    </div>
</template>

<script setup>
import Button from 'primevue/button';
const props = defineProps(["design"])
</script>

<style scoped>
#designCard>img {
    width: 100px;
    height: 100px;
}

#designCard {
    width: fit-content
}
</style>