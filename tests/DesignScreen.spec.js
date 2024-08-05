import { describe, it, expect, beforeEach, vi } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import DesignScreen from '../src/components/DesignScreen/DesignScreen.vue'
import ProgressSpinner from 'primevue/progressspinner'
import DesignCard from '../src/components/DesignScreen/DesignCard.vue'
import { useStore } from '../src/store/Store'
import { nextTick } from 'vue'
import { getAllDesignsFromStorage } from '../src/api/FirebaseApi';
import getAllDesignsFromStorageMockData from './mockdata/getAllDesignsFromStorageMockData';

vi.mock('../src/api/FirebaseApi', () => ({
  getAllDesignsFromStorage: vi.fn(() => {
    return Promise.resolve(getAllDesignsFromStorageMockData);
  })
}))

describe('DesignScreen', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(DesignScreen, {
      global: {
        plugins: [createTestingPinia()],
        stubs: {
          ProgressSpinner,
          DesignCard
        }
      }
    });
  })

  afterEach(() => {
    vi.clearAllMocks();
  })

  it('renders the title correctly', () => {
    expect(wrapper.find('.big-title').text()).toBe('Designs')
  })

  it('shows ProgressSpinner when loading', async () => {
    wrapper.vm.loading = true;
    await nextTick();

    expect(wrapper.findComponent(ProgressSpinner).exists()).toBe(true)
  })

  it('renders DesignCard components when not loading', async () => {
    wrapper.vm.loading = false;
    await nextTick();
    const designCards = wrapper.findAllComponents(DesignCard);
    expect(designCards.length).toBe(2);
  });

  it('calls getAllDesigns on mount and on design-deleted emit', async () => {
    const mocked = vi.mocked(getAllDesignsFromStorage);
    expect(mocked).toHaveBeenCalledTimes(1);
    await nextTick();
    expect(wrapper.vm.designArray).toHaveLength(2);

    wrapper.findComponent(DesignCard).vm.$emit('design-deleted', 'some-design-id');
    expect(mocked).toHaveBeenCalledTimes(2);
  })

  it('updates store when handleDesignDeleted is called with current design ID', async () => {
    const store = useStore();
    store.design.design_id = '123';
    await wrapper.vm.handleDesignDeleted('123');
    expect(store.resetCreateScreen).toHaveBeenCalled();
  })
})