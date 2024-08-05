import { describe, it, expect, beforeEach, vi } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import CreateScreen from '../src/components/CreateScreen/CreateScreen.vue';
import { useStore } from '../src/store/Store';
import { createTestingPinia } from '@pinia/testing';
import { useRouter } from 'vue-router';
import { v4 as uuidv4 } from 'uuid';
import { uploadDesignToRealtimeDb, uploadImgToFirebaseStorage, deleteImageFromStorage } from '../src/api/FirebaseApi';
import getAllDesignsFromStorageMockData from './mockdata/getAllDesignsFromStorageMockData';
import TrademarkScreen from '../src/components/CreateScreen/TrademarkScreen/TrademarkScreen.vue';
import StableDiffusionScreen from '../src/components/CreateScreen/StableDiffusionScreen.vue';
import GeminiScreen from '../src/components/CreateScreen/GeminiScreen.vue';
import ImageList from '../src/components/CreateScreen/ImageList.vue';
import InputText from 'primevue/inputtext';
import { nullDesign } from '../src/utils/constants';

vi.mock('uuid', () => ({
  v4: vi.fn(() => 'mock-uuid')
}));

vi.mock('../src/api/FirebaseApi', () => ({
  uploadDesignToRealtimeDb: vi.fn(),
  uploadImgToFirebaseStorage: vi.fn(() => Promise.resolve('mock-download-url')),
  deleteImageFromStorage: vi.fn(() => true)
}));

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

describe('CreateScreen', () => {
  let wrapper;
  let store;
  let router;

  beforeEach(() => {
    wrapper = shallowMount(CreateScreen, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn })],
        stubs: {
            TrademarkScreen,
            StableDiffusionScreen,
            GeminiScreen,
            ImageList,
            InputText: true,
          },
      }
    });
    store = useStore();
    router = useRouter();
  });

  afterEach(() => {
    vi.clearAllMocks();
  })

  it('renders the correct title for creating a new design', () => {
    store.design.design_id = null;
    expect(wrapper.find('.big-title').text()).toBe('Create new design');
  });

  it('renders the correct title for editing a design', () => {
    store.design.design_id = 'some-id';
    expect(wrapper.find('.big-title').text()).toBe('Edit design');
  });

  it('shows invalid-input class for invalid design name', async () => {
    store.design.design_name = '<invalid%name>'
    await wrapper.vm.$nextTick();
    const inputElement = wrapper.findComponent(InputText);
    expect(inputElement.exists()).toBe(true);
    expect(inputElement.classes()).toContain('invalid-input');
  });

  it('adds a valid tag', async () => {
    wrapper.vm.newTag = 'valid-tag';
    await wrapper.vm.addTag();
    expect(store.design.tags).toContain('valid-tag');
  });

  it('does not add an invalid tag', async () => {
    wrapper.vm.newTag = '<tag>';
    await wrapper.vm.addTag();
    expect(store.design.tags).not.toContain('<tag>');
    await wrapper.vm.addTag();
    expect(store.design.tags).not.toContain('');
  });

  it('handleEmptyDesignClick resets the form', async () => {
    store.design = getAllDesignsFromStorageMockData[0];

    await wrapper.vm.handleEmptyDesignClick();
    expect(store.resetCreateScreen).toHaveBeenCalled();
    store.design = JSON.parse(JSON.stringify(nullDesign));
    await wrapper.vm.$nextTick();

    expect(wrapper.find('.big-title').text()).toBe('Create new design');
  });

  it('calls handleSaveClick and processes saving new design correctly', async () => {
    store.design.design_id = null;
    store.new_images_buffer = ["link1", "link2", "link3"];

    await wrapper.vm.handleSaveClick();

    expect(uuidv4).toHaveBeenCalledTimes(1);
    expect(uploadImgToFirebaseStorage).toHaveBeenCalledTimes(store.new_images_buffer.length);
    expect(uploadDesignToRealtimeDb).toHaveBeenCalledTimes(1);
    expect(mockRoutePush).toHaveBeenCalled();
    expect(store.resetCreateScreen).toHaveBeenCalled();
  });

  it('calls handleSaveClick and processes saving existing design correctly', async () => {
    store.design = getAllDesignsFromStorageMockData[0];
    store.new_images_buffer = ["link1", "link2", "link3"];

    await wrapper.vm.handleSaveClick();

    expect(uuidv4).not.toHaveBeenCalled();
    expect(uploadImgToFirebaseStorage).toHaveBeenCalledTimes(store.new_images_buffer.length);
    expect(deleteImageFromStorage).toHaveBeenCalledTimes(store.deleted_images_buffer.length);
    expect(uploadDesignToRealtimeDb).toHaveBeenCalledTimes(1);
    expect(mockRoutePush).toHaveBeenCalled();
    expect(store.resetCreateScreen).toHaveBeenCalled();
  });

  it('switches and displays tabs correctly', async () => {
    wrapper.vm.changeActiveTab(1);
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.active).toBe(1);
    expect(wrapper.findComponent(StableDiffusionScreen).exists()).toBe(true);
  });

  it('displays images correctly when present', async () => {
    store.design = getAllDesignsFromStorageMockData[0];
    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent(ImageList).exists()).toBe(true);
  });
});
