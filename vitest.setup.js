import { config } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'

// Global setup for Vue Test Utils
config.global.plugins = [createTestingPinia()]