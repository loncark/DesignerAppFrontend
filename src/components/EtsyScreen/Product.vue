<template>
    <div id="productCard">
        <img src="C:\Users\Kristina\Documents\Diplomski rad\DesignerAppFrontend\src\assets\person.png">
        <h1>Product name</h1>
        <p id="timesBasketed">Times basketed</p>
        <p id="productPrice">Price</p>
    </div>
</template>

<script setup>

</script>

<style scoped>
#productCard {
    width: fit-content;
    display: grid;
    grid-auto-columns: auto auto;
    grid-auto-rows: auto auto auto;
}

#productCard>img {
    grid-row: 1;
    grid-column: 1 / 3;
    width: 100px;
    height: 100px;
}

#productCard>h1 {
    grid-row: 2;
    grid-column: 1 / 3;
}

#timesBasketed {
    grid-row: 3;
    grid-column: 1 / 3;
}

#productPrice {
    grid-row: 3;
    grid-column: 3;
}
</style>