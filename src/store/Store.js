import { defineStore } from 'pinia';
import { nullDesign } from '../utils/constants';

export const useStore = defineStore('design', {
  state: () => ({
    design: JSON.parse(JSON.stringify(nullDesign)),

    // related to ExploreScreen
    keyword_search_keyword: '',
    daily_searches: null,
    related_queries: null,
    interest_by_region: null,
    etsy_keyword: '',
    products: [],

    // related to CreateScreen
    new_images: [],
    deleted_images: [],
    gemini_input: '',
    gemini_response: 'Awaiting prompt.',
    sd_img_to_load: null,
    sd_no_steps_input: 1,
    sd_width_input: 64,
    sd_height_input: 64,
    sd_custom_prompt_input: 'Yellow triangle',
    sd_base64String: null,
    trademark_input: '',
    trademark_count: 0,
    trademark_items: null,
  }),
  actions: {
    resetDesign() {
      this.design = JSON.parse(JSON.stringify(nullDesign));
    },
    resetCreateScreen() {
      this.new_images = [],
      this.deleted_images = [],
      this.sd_img_to_load = null;
      this.gemini_input = '';
      this.gemini_response = 'Awaiting prompt.';
      this.sd_no_steps_input = 1;
      this.sd_width_input = 64;
      this.sd_height_input = 64;
      this.sd_custom_prompt_input = 'Yellow triangle';
      this.sd_base64String = null;
      this.trademark_input = '';
      this.trademark_count = 0;
      this.trademark_items = null;
    }
  },
});
