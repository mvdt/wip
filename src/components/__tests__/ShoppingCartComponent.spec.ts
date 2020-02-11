import Vue from 'vue'
import Vuex from 'vuex'
import { createLocalVue } from '@vue/test-utils'
import ShoppingCartComponent from '@/components/ShoppingCartComponent.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('ShoppingCartComponent', () => {
  let wrapper: any
  let store
  let h
  beforeEach(() => {
    Vue.use(Vuex)
    store = new Vuex.Store({})
  })
})
