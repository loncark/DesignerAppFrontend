import { defineStore } from 'pinia';
import { nullDesign, COUNTRY_CODES, TRADEMARK_FILTERS } from '../utils/constants';

export const useStore = defineStore('design', {
  state: () => ({
    design: JSON.parse(JSON.stringify(nullDesign)),

    // related to ExploreScreen
    active_tab: 0,
    keyword_query_executed: false,
    serpapi_limit_exceeded: false,
    trends_date: new Date(),
    trends_nextDate: null,  //"yyyymmdd" format for backend
    trends_country_object: COUNTRY_CODES[0],
    daily_searches: null,
    keyword_search_keyword: '',
    related_queries: null,
    interest_by_region: null,
    raw_chart_data: [],
    etsy_keyword: '',
    etsy_order: 'Default',
    etsy_current_page: 1,
    products: null,

    // related to CreateScreen
    new_images_buffer: [],
    deleted_images_buffer: [],
    gemini_input: '',
    gemini_response: 'Awaiting prompt.',
    sd_img_to_load: null,
    sd_no_steps_input: '1',
    sd_width_input: '64',
    sd_height_input: '64',
    sd_custom_prompt_input: 'Yellow triangle',
    sd_base64String: null,
    trademark_input: '',
    trademark_count: 0,
    trademark_items: null,
    trademark_category_object: TRADEMARK_FILTERS[0],
  }),
  actions: {
    resetDesign() {
      this.design = JSON.parse(JSON.stringify(nullDesign));
    },
    resetCreateScreen() {
      this.resetDesign();
      this.new_images_buffer = [],
      this.deleted_images_buffer = [],
      this.sd_img_to_load = null;
      this.gemini_input = '';
      this.gemini_response = 'Awaiting prompt.';
      this.sd_no_steps_input = '1';
      this.sd_width_input = '64';
      this.sd_height_input = '64';
      this.sd_custom_prompt_input = 'Yellow triangle';
      this.sd_base64String = null;
      this.trademark_input = '';
      this.trademark_count = 0;
      this.trademark_items = null;
      this.trademark_category_object = TRADEMARK_FILTERS[0];
    },
    resetExploreScreen() {
      this.keyword_query_executed = false,
      this.keyword_search_keyword = '';
      this.daily_searches = null;
      this.related_queries = null;
      this.interest_by_region = null;
      this.raw_chart_data = [];
      this.etsy_keyword = '';
      this.etsy_order = 'Default';
      this.etsy_current_page = 1,
      this.products = null;
      this.trends_date = new Date();
      this.trends_nextDate = null,
      this.trends_country_object = COUNTRY_CODES[0];
    }
  },
});
