import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import Login from '../../views/home/index'
import ButtonPrimary from '../buttonPrimary/ButtonPrimary.vue'

describe('HelloWorld', () => {
  it('renders properly', () => {
    const wrapper = mount(Login)
    const input = wrapper.find('input')
    const buttom = wrapper.find('button')
    const eventos = wrapper.emitted('onKeyDown')
    input.setValue('')
    buttom.trigger('click')
    expect(eventos).toBeTruthy()
  })
})
