import { defineStore } from 'pinia';
import { nullDesign } from '../utils/constants';

export const useDesignStore = defineStore('design', {
  state: () => ({
    design: JSON.parse(JSON.stringify(nullDesign)),
    imgUrl: null,
  }),
  actions: {
    resetDesign() {
      this.design = JSON.parse(JSON.stringify(nullDesign));
    },

  },
});
