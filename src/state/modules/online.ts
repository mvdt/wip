export const namespaced = true

export interface IState {
    WAITING_FOR_CONNECTION: Boolean,
    ONLINE: Boolean
}

export const state: IState = {
  WAITING_FOR_CONNECTION: false,
  ONLINE: false
}

export const mutations = {
  SET_ONLINE: (state: IState) => {
    state.ONLINE = true
  },
  SET_OFFLINE: (state: IState) => {
    state.ONLINE = false
  },
  SET_WAITING_FOR_CONNECTION: (state: IState) => {
    state.WAITING_FOR_CONNECTION = true
  },
  UNSET_WAITING_FOR_CONNECTION: (state: IState) => {
    state.WAITING_FOR_CONNECTION = false
  }
}
