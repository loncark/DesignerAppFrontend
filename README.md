Stuff I learned the hard way:

1. IF PRIMEVUE COMPONENTS DON'T WORK ITS BECAUSE YOU ARE NOT IMPORTING CSS IN MAIN.JS
2. Do not put :key="index" in v-for for items that have to eventually be deleted
3. :deep(.className) selector allows for manipulation of child component css from the parent
(unlikely to be necessary if the first step is done correctly)
4. EXPECT YOUR BUTTON ICONS TO BE STUCK TO THE BUTTON LABEL WITH CSS * {margin: 0px;}
5. Some components are named differently in different primevue versions
(calendar -> datepicker, dropdown -> select)
6. Dropdowns can take simple arrays, not necessarily arrays of objects with the optionLabel gymnastics
7. How to add google font: insert link tag in index.html and make a css class that google gives you in embed code 
8. Use emits/buses when deleting components and trigerring multiple actions
9. Be careful with v-if vs v-show in parent component if the child has onMounted

10. TESTING: Mock the store if the purpose of the test is isolation and control (@pinia/testing). 
Test with the real store for integration (by accessing wrapper.vm.store, e.g. the store within the component).
11. wrapper.findComponent does not work with CSS selectors