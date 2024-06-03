<template>
    <div id="trademarkScreen">
        <div id="trademarkQuery">
            <InputText></InputText>
            <Button label="Search" icon="pi pi-search"></Button>
        </div>
        <p>Results of query</p>
        <p>These are returned results</p>
    </div>
</template>

<script setup>
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
</script>

<style scoped>
#trademarkScreen {
    display: flex;
    flex-direction: column;
}

#trademarkQuery {
    display: flex;
    flex-direction: row;
}
</style>