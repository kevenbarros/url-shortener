import { createStore } from 'vuex'
import axios from "axios";


const token = sessionStorage.getItem('token') || ""
const userId = sessionStorage.getItem('userId') || ""
const email = sessionStorage.getItem('userEmail') || ""




export default createStore(
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
      }
    },
    actions: {
    },
    getters: {

    }
  })
