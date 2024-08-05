import { describe, it, expect, beforeEach, vi } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import DesignScreen from '../src/components/DesignScreen/DesignScreen.vue'
import ProgressSpinner from 'primevue/progressspinner'
import DesignCard from '../src/components/DesignScreen/DesignCard.vue'
import { useStore } from '../src/store/Store'
import { nextTick } from 'vue'
import { getAllDesignsFromStorage } from '../src/api/FirebaseApi';

vi.mock('../src/api/FirebaseApi', () => ({
  getAllDesignsFromStorage: vi.fn(() => {
    return Promise.resolve([{
    "design_id": "94ece9bf-2057-49be-931c-ba06dcb1fe00",
    "design_name": "Testin Stable Diffusion Steps",
    "image_links": [
      "https://storage.googleapis.com/designerapp-65092.appspot.com/images/94ece9bf-2057-49be-931c-ba06dcb1fe00/08b52f49-9e6f-43ac-8df0-84f494a1cde0.png",
      "https://storage.googleapis.com/designerapp-65092.appspot.com/images/94ece9bf-2057-49be-931c-ba06dcb1fe00/2e8e94aa-6ed0-4194-abf6-0f72f29fe42d.png",
      "https://storage.googleapis.com/designerapp-65092.appspot.com/images/94ece9bf-2057-49be-931c-ba06dcb1fe00/2c3fed60-431a-48df-9eb6-158b955409b5.png",
      "https://storage.googleapis.com/designerapp-65092.appspot.com/images/94ece9bf-2057-49be-931c-ba06dcb1fe00/c746af4d-ba29-4f4e-9de6-872c36258ef1.png"
    ],
    "related_links": [],
    "tags": [],
    "title": "50, 100, 200, 400 steps"
  },
  {
    "design_id": "a2ed1fc9-6034-404e-95da-447ecb5b01d5",
    "design_name": "Holidays",
    "image_links": [
      "https://storage.googleapis.com/designerapp-65092.appspot.com/images/a2ed1fc9-6034-404e-95da-447ecb5b01d5/f4b0ed6e-64f8-46e3-b65a-c12b3fbdc918.png",
      "https://storage.googleapis.com/designerapp-65092.appspot.com/images/a2ed1fc9-6034-404e-95da-447ecb5b01d5/2c47cd89-3b84-41e3-b5b8-072446c79137.png",
      "https://storage.googleapis.com/designerapp-65092.appspot.com/images/a2ed1fc9-6034-404e-95da-447ecb5b01d5/25ebde50-8664-4780-9b2a-743794186437.png",
      "https://storage.googleapis.com/designerapp-65092.appspot.com/images/a2ed1fc9-6034-404e-95da-447ecb5b01d5/4025159f-2cb4-4716-b301-bd43751ee48c.png"
    ],
    "related_links": [
      "something.com"
    ],
    "tags": [
      "christmas",
      "easter"
    ],
    "title": "Holiday Shirts"
  }])})
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

  it('calls getAllDesigns on mount', async () => {
    const mocked = vi.mocked(getAllDesignsFromStorage);
    expect(mocked).toHaveBeenCalledTimes(1);
    await nextTick();
    expect(wrapper.vm.designArray).toHaveLength(2) 
  })

  it('updates store when handleDesignDeleted is called with current design ID', async () => {
    const store = useStore()
    store.design.design_id = '123'
    await wrapper.vm.handleDesignDeleted('123')
    expect(store.resetCreateScreen).toHaveBeenCalled()
  })
})