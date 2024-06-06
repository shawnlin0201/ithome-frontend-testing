import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import DemoZero from '../components/DemoZero.vue'

window.alert = vi.fn()

describe('DemoZero.vue', () => {
  it('當表單填寫完整時，應該顯示送出提示', async () => {
    const wrapper = mount(DemoZero)
    const titleInput = wrapper.find('[data-test="titleInput"]')
    const dateInput = wrapper.find('[data-test="dateInput"]')
    const submitButton = wrapper.find('[data-test="submitButton"]')

    await titleInput.setValue('ithome 鐵人講堂')
    await dateInput.setValue('2024-08-28')

    await submitButton.trigger('click')
    expect(window.alert).toHaveBeenCalledWith('表單送出')
  })
  it('當表單未填寫完整時，應該顯示填寫提示', async () => {
    const wrapper = mount(DemoZero)
    const submitButton = wrapper.find('[data-test="submitButton"]')
    await submitButton.trigger('click')
    expect(window.alert).toHaveBeenCalledWith('請填寫必填欄位')
  })
})
