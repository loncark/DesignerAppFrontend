import { shallowMount } from '@vue/test-utils';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import ExploreScreen from '../src/components/ExploreScreen/ExploreScreen.vue';
import KeywordSearchScreen from '../src/components/ExploreScreen/KeywordSearchScreen/KeywordSearchScreen.vue';
import EtsyScreen from '../src/components/ExploreScreen/EtsyScreen/EtsyScreen.vue';
import TrendScreen from '../src/components/ExploreScreen/TrendScreen/TrendScreen.vue';
import { nextTick } from 'vue'

describe('ExploreScreen.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(ExploreScreen, {
        global: {
          stubs: {
              KeywordSearchScreen,
              EtsyScreen,
              TrendScreen,
              TabMenu: true,
            },
        }
      });

  });

  afterEach(() => {
    vi.clearAllMocks();
  })

  it('renders the component', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('displays the title correctly', () => {
    const title = wrapper.find('.big-title');
    expect(title.text()).toBe('Explore');
  });

  it('initializes with the correct active tab', async () => {
    await nextTick();
    expect(wrapper.vm.store.explore_active_tab).toBe(0);
  });

  it('updates the active tab when a tab is clicked', async () => {
    const tabItems = wrapper.vm.tabItems;
    
    tabItems[1].command();
    await wrapper.vm.$nextTick();
    
    expect(wrapper.vm.store.explore_active_tab).toBe(1);
  });

  it('renders TrendScreen when the Trends tab is clicked', async () => {
    const tabItems = wrapper.vm.tabItems;
    
    tabItems[0].command();
    await wrapper.vm.$nextTick();

    expect(wrapper.findComponent({ name: 'TrendScreen' }).exists()).toBe(true);
  });

  it('renders KeywordSearchScreen when the Keywords tab is clicked', async () => {
    const tabItems = wrapper.vm.tabItems;
    
    tabItems[1].command();
    await wrapper.vm.$nextTick();

    expect(wrapper.findComponent({ name: 'KeywordSearchScreen' }).exists()).toBe(true);
  });

  it('renders EtsyScreen when the Products tab is clicked', async () => {
    const tabItems = wrapper.vm.tabItems;
    
    tabItems[2].command();
    await wrapper.vm.$nextTick();

    expect(wrapper.findComponent({ name: 'EtsyScreen' }).exists()).toBe(true);
  });

  it('sets main_active_tab to 1 on mount', async () => {
    await nextTick();
    expect(wrapper.vm.store.main_active_tab).toBe(1);
  });
});
