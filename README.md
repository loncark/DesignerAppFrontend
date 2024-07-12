Stuff I learned the hard way:

1. IF PRIMEVUE COMPONENTS DON'T WORK ITS BECAUSE YOU ARE NOT IMPORTING CSS IN MAIN.JS
2. Do not put :key="index" in v-for for items that have to eventually be deleted
3. :deep(.className) selector allows for manipulation of child component css from the parent
(unlikely to be necessary if the first step is done correctly)