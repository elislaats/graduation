import axios from 'axios'
import { createStore } from 'vuex'

const API_URL_BASE = `https://api-cre8ion.tc8l.dev/api/`

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    async getRoutes() {
      const apiURl = API_URL_BASE + `navigation`
      try {
        axios.get(apiURl, {
          headers: { 'Content-Type': 'application/json;charset=UTF-8', "Access-Control-Allow-Origin": "*", }
        }).then(response => {
          console.log(response)
        })
      } catch (error) {
        console.error(error)
      }
    }
  },
  modules: {
  }
})
