import { shallowMount } from '@vue/test-utils'
import Vue from 'vue'
import Vuex, { mapState } from 'vuex'
import ProductsComponent from '@/components/ProductsComponent.vue'
import { getters, mutations } from '../../store/modules/stock'

describe('ProductsComponent', () => {
  let store: any
  let state
  let actions: any
  beforeEach(() => {
    Vue.use(Vuex)
    actions = {
      fetchAllProducts: jest.fn(() => {
        return Promise.resolve(true).then(() => {
          return [
            { id: 1 }
          ]
        })
      })
    }
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
    const wrapper = shallowMount(ProductsComponent, { store })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('should load all of the product catelog', () => {
    const wrapper = shallowMount(ProductsComponent, {
      store: store,
      props: {
        product: []
      },
      created () {
        store.dispatch('stock/fetchAllProducts')
      },
      computed: mapState({
        products: store.getters['stock/getAllStock']
      })
    })
    jest.useFakeTimers()
    jest.runAllTimers()

    const products = wrapper.findAll('.product')
    expect(products.length).toBe(2)
  })
})
