<template>
    <div id="etsyScreen">
        <h1>Etsy</h1>
        <div id="etsyQuery">
            <InputText></InputText>
            <Button label="Search" icon="pi pi-search"></Button>
        </div>
        <p>Search results for query</p>
        <Dropdown id="etsyDropdown" placeholder="Filter by"></Dropdown>
    </div>
    <ProductList/>
</template>

<script setup>
import ProductList from './ProductList.vue'
import Dropdown from 'primevue/dropdown';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

</script>

<style scoped>
#etsyScreen {
    display: grid;
    grid-template-columns: auto auto auto;
}

#etsyQuery {
    display: flex;
    flex-direction: row;
}

#etsyScreen>h1 {
    grid-row: 1;
    grid-column: 1;
}

#etsyQuery {
    grid-column: 2 / 4;
    grid-row: 1;
}

#etsyScreen>p {
    grid-row: 2;
    grid-column: 1 / 3;
}

#etsyDropdown {
    grid-column: 3 / 4;
    grid-row: 2;
}


</style>