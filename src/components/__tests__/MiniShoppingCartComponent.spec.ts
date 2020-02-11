import Vue from 'vue'
import Vuex from 'vuex'
import MiniShoppingCartComponent from '@/components/MiniShoppingCartComponent.vue'
import { shallowMount } from '@vue/test-utils'
import { getters, mutations } from '../../store/modules/stock'

describe('MiniShoppingCartComponent', () => {
  let store: any
  let state
  let actions: any
  beforeEach(() => {
    Vue.use(Vuex)
    store = new Vuex.Store({
      modules: {
        stock: {
          namespaced: true,
          state: {
            ALL_STOCK: []
          },
          getters,
          mutations,
          actions
        }
      }
    })
  })

  it('hould render the componet without an error', () => {
    const wrapper = shallowMount(MiniShoppingCartComponent, { store })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
