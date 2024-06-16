import { defineStore } from 'pinia';
import { nullDesign } from '../utils/constants';

export const useDesignStore = defineStore('design', {
  state: () => ({
    design: nullDesign,
  }),
  actions: {
    setDesign(design) {
      this.design = design;
    },
    resetDesign() {
      this.design = nullDesign;
    }
  },
});
