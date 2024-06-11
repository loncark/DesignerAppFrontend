<template>
    <div id="imageList">
        <h1>Images</h1>
        <div id="newImage">
            <p>+ New</p>
        </div>
        <div id="images"  v-for="num in array" :key="num">
            <img src="C:\Users\Kristina\Documents\Diplomski rad\DesignerAppFrontend\src\assets\person.png">
            <Button label="E"></Button> 
        </div>
     
    </div>
</template>

<script setup>
import Button from 'primevue/button';
const array = [1, 2, 3, 4, 5]

</script>

<style scoped>
#imageList {
    display: grid;
    grid-template-columns: auto auto auto;
}

#imageList>h1 {
    grid-row: 1;
    grid-column: 1 / 4;
}

#images>img {
    height: 100px;
    width: 100px;
}
</style>

