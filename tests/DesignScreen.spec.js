import { describe, it, expect, beforeEach, vi } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import DesignScreen from '../src/components/DesignScreen/DesignScreen.vue'
import ProgressSpinner from 'primevue/progressspinner'
import DesignCard from '../src/components/DesignScreen/DesignCard.vue'
import { useStore } from '../src/store/Store'
import { nextTick } from 'vue'
import { deleteDesignFromDb, getAllDesignsFromStorage } from '../src/api/FirebaseApi';
import getAllDesignsFromStorageMockData from './mockdata/getAllDesignsFromStorageMockData';
import Button from 'primevue/button'
import { useRouter } from 'vue-router';


vi.mock('../src/api/FirebaseApi', () => ({
  getAllDesignsFromStorage: vi.fn(() => {
    return Promise.resolve(getAllDesignsFromStorageMockData);
  }),
  deleteDesignFromDb: vi.fn(() => "Design deleted successfully")
}))

const mockRoutePush = vi.fn()
vi.mock('vue-router', async () => {
  return {
    useRouter: () => {
      return {
        push: mockRoutePush
      }
    }
  }
})

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

  //ui
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

  //unit
  it('calls getAllDesigns on mount and on design-deleted emit', async () => {
    const mocked = vi.mocked(getAllDesignsFromStorage);
    expect(mocked).toHaveBeenCalledTimes(1);
    await nextTick();
    expect(wrapper.vm.designArray).toHaveLength(2);

    wrapper.findComponent(DesignCard).vm.$emit('design-deleted', 'some-design-id');
    expect(mocked).toHaveBeenCalledTimes(2);
  })

  it('resets CreateScreen when handleDesignDeleted is called with current design ID', async () => {
    wrapper.vm.store.design.design_id = '123';
    await wrapper.vm.handleDesignDeleted('123');
    expect(wrapper.vm.store.resetCreateScreen).toHaveBeenCalled();
  })

  //integration
  it('deletes the DesignCard when the delete button is clicked', async () => {
    let designCard = wrapper.findComponent(DesignCard);
    expect(designCard.exists()).toBe(true);
    let deleteButton = designCard.findAllComponents(Button)[2];
    expect(deleteButton.exists()).toBe(true);

    await deleteButton.trigger('click');

    expect(designCard.exists()).toBe(false);
  })

  it('navigates to CreateScreen with proper data when edit button on Designcard is clicked', async () => {
    let designCard = wrapper.findComponent(DesignCard);
    expect(designCard.exists()).toBe(true);
    let editButton = designCard.findAllComponents(Button)[1];
    expect(editButton.exists()).toBe(true);

    await editButton.trigger('click');

    const designId = designCard.props('design').design_id;
    expect(wrapper.vm.store.design.design_id).toBe(designId);
    expect(mockRoutePush).toHaveBeenCalled();
  })
})