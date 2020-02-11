import { Commit, Dispatch } from 'vuex'
import { getAllproducts } from '@/service/DefaultService'

export const namespaced = true

export type Item = {
  id: string,
  name: string,
  description: string,
  price: number
}

export const state: IState = {
  SELECTED_STOCK: [],
  TOTAL_SELECTED_STOCK: 0,
  ALL_STOCK: []
}

export const mutations = {
  // register all products in vuex store
  SET_TOTAL_STOCK (state: IState, ALL_STOCK: any) {
    state.ALL_STOCK = ALL_STOCK
  },
  ADD_TO_CART (state: IState, ITEM: ISelectedItem) {
    // identify the pre-availability of the currently selected item and its quantity
    let item = state.SELECTED_STOCK.find((element: any) => element.id === ITEM.item.id)
    if (item === undefined) {
      // assign selected quantity to current product
      ITEM.item.quantity = 0
      ITEM.item.quantity = (+ITEM.item.quantity) + (+ITEM.qty)
      state.SELECTED_STOCK.push(ITEM.item)
    } else {
      item.quantity = (+item.quantity) + (+ITEM.qty)
    }
  },
  ADD_ONE_TO_COUNT (state: IState, ITEM: ISelectedItem) {
    // increase item stock by one
    let item = state.SELECTED_STOCK.find((element: any) => element.id === ITEM.item.id)
    item.quantity = ITEM.qty
  },
  REMOVE_ONE_FROM_COUNT (state: IState, ITEM: ISelectedItem) {
    let item = state.SELECTED_STOCK.find((element: any) => element.id === ITEM.item.id)
    item.quantity = ITEM.qty
  },
  REMOVE_FROM_CART (state: IState, ITEM: any) {
    state.SELECTED_STOCK = state.SELECTED_STOCK.filter(element => element.id !== ITEM.id)
  }
}

export const actions = {
  // fetch all product action
  fetchAllProducts (context: IActionContext) {
    getAllproducts().then(res => {
      // call mutation to add data from external data- source to vuex store
      context.commit('SET_TOTAL_STOCK', res)
    })
      .catch(error => {
        console.log(error)
      })
  },
  // add item to selected items list
  addItemToCart (context: IActionContext, item: any) {
    // the idea is to pass the item onto the store and filter from the main product list
    context.commit('ADD_TO_CART', item)
  },
  // add to selected item quantity
  addOneToCount (context: IActionContext, amount: number) {
    context.commit('ADD_ONE_TO_COUNT', amount)
  },
  // remove count on selected item by one
  removeOneFromCount (context: IActionContext, amount: any) {
    context.commit('REMOVE_ONE_FROM_COUNT', amount)
  },
  removeFromCart (context: IActionContext, item: any) {
    context.commit('REMOVE_FROM_CART', item)
  }
}

export const getters = {
  getAllStock: (state: IState) => {
    // universal getter to retrieve all available stock
    return state.ALL_STOCK
  },
  getAllCurrentlySelectedStock: (state: IState) => {
    // universal getter to retrieve all selected stock
    return state.SELECTED_STOCK
  },
  getProductById: (state: any) => (id: any) => {
    return state.ALL_STOCK.find((product: any) => product.id === id)
  }
}

export interface IState {
  SELECTED_STOCK: any[],
  TOTAL_SELECTED_STOCK: 0,
  ALL_STOCK: any[]
}

export interface IActionContext {
  commit: Commit,
  dispatch: Dispatch
}

export interface ISelectedItem {
  item: any,
  qty: number
}
