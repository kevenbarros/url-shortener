import type { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'

const token = sessionStorage.getItem('token') || ""
const userId = sessionStorage.getItem('userId') || ""
const email = sessionStorage.getItem('userEmail') || ""

export interface State {
  userId: string,
  userEmail: string,
  token: string,
  logged: boolean
}
export const key: InjectionKey<Store<State>> = Symbol()
export const store = createStore<State>(
  {
    state: {
      userId: userId,
      userEmail: email,
      token: token,
      logged: false
    },
    mutations: {
      logged(state, data) {
        state.logged = data
      },
      login(state, data) {
        state.userEmail = data.person.email
        state.logged = true
        state.userId = data.person._id
        state.token = data.token
      }
    },
    actions: {
    },
    getters: {

    }
  })
