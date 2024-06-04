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

            <Button label="Generate"></Button>
        </div>

        <div id="imagePart">
            <img src="C:\Users\Kristina\Documents\Diplomski rad\DesignerAppFrontend\src\assets\person.png">
            <Button id="acceptButton" label="Accept"></Button>
            <Button id="discardButton" label="Discard"></Button>
        </div>
    </div>
</template>

<script setup>
import InputText from "primevue/inputtext";
import Button from 'primevue/button';
import Textarea from "primevue/textarea";
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