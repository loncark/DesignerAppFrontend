import { defineStore } from 'pinia';
import { nullDesign } from '../utils/constants';

export const useDesignStore = defineStore('design', {
  state: () => ({
    design: JSON.parse(JSON.stringify(nullDesign)),

    imgUrl: null,

    keyword_search_keyword: '',
    daily_searches: null,
    related_queries: null,
    interest_by_region: null,
    etsy_keyword: '',
    products: []
  }),
  actions: {
    resetDesign() {
      this.design = JSON.parse(JSON.stringify(nullDesign));
    },

  },
});
