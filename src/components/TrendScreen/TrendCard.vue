<template>
    <div id="trendCard">
        <img src="C:\Users\Kristina\Documents\Diplomski rad\DesignerAppFrontend\src\assets\person.png"/>
        <p id="trendTime">Trend Time</p>
        <p id="trendSource">Trend Source</p>
        <p id="trendTitle">Title of the trend</p>
        <p id="trendSummary">Summary of the trend</p>
    </div>
</template>

<style scoped>
#trendCard {
    display: grid;
    grid-auto-columns: auto auto auto;
    grid-auto-rows: auto auto auto;
}

#trendCard>img {
    width: 100px;
    height: 100px;
    grid-column: 1;
    grid-row: 1 / 4;
}

#trendTime {
    grid-row: 1;
    grid-column: 3;
}

#trendSource {
    grid-row: 1;
    grid-column: 2;
}

#trendTitle {
    grid-row: 2;
    grid-column: 2 / 4;
}

#trendSummary {
    grid-row: 3;
    grid-column: 2 / 4;
}
</style>