import { defineStore } from 'pinia';
import { nullDesign } from '../utils/constants';

export const useDesignStore = defineStore('design', {
  state: () => ({
    design: JSON.parse(JSON.stringify(nullDesign)),
    imgUrl: null,
  }),
  actions: {
    setDesign(design) {
      this.design = design;
    },
    resetDesign() {
      this.design = JSON.parse(JSON.stringify(nullDesign));
    },
    addImgUrl(url) {
      this.design.image_links.push(url);
    },
    setImgUrl(url) {
      this.imgUrl = url;
    },
    resetImgUrl() {
      this.imgUrl = null;
    }
  },
});
