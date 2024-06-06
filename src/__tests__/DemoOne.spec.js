import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import App from '../App.vue'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import InputText from 'primevue/inputtext'
import Calendar from 'primevue/calendar'
import Button from 'primevue/button'
import Toast from 'primevue/toast'

// 模擬 window.matchMedia （因為 JSDOM 並未涵蓋）
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn()
  }))
})

describe('表單送出時', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(App, {
      global: {
        plugins: [PrimeVue, ToastService],
        components: { InputText, Calendar, Button, Toast }
      }
    })
  })
  it('當表單填寫完整時，應該顯示送出提示', async () => {
    const titleInput = wrapper.find('[data-test="titleInput"]')
    const dateInput = wrapper.find('[data-test="dateInput"] > input')
    const submitButton = wrapper.find('[data-test="submitButton"]')

    await titleInput.setValue('ithome 鐵人講堂')
    await dateInput.setValue('2024/8/28')
    await submitButton.trigger('click')

    const toastService = wrapper.findComponent(Toast)
    const toastMessages = toastService.vm.messages

    expect(toastMessages).toHaveLength(1)
    expect(toastMessages[0].severity).toBe('success')
    expect(toastMessages[0].detail).toBe('表單送出')
  })
  it('當表單未填寫完整時，應該顯示填寫提示', async () => {
    const submitButton = wrapper.find('[data-test="submitButton"]')
    await submitButton.trigger('click')

    const toastService = wrapper.findComponent(Toast)
    const toastMessages = toastService.vm.messages

    expect(toastMessages).toHaveLength(1)
    expect(toastMessages[0].severity).toBe('error')
    expect(toastMessages[0].detail).toBe('請填寫必填欄位')
  })
})
