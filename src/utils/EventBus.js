import { ref } from 'vue'

const bus = ref(new Map())

export default {
  on(event, callback) {
    if (!bus.value.has(event)) {
      bus.value.set(event, [])
    }
    bus.value.get(event).push(callback)
  },
  off(event, callback) {
    if (bus.value.has(event)) {
      bus.value.set(event, bus.value.get(event).filter(cb => cb !== callback))
    }
  },
  emit(event, data) {
    if (bus.value.has(event)) {
      bus.value.get(event).forEach(callback => callback(data))
    }
  }
}