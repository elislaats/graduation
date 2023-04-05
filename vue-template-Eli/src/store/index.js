
import { createStore } from 'vuex'
import DynamicView from '../views/DynamicView.vue'
import axios from 'axios';

const API_URL_BASE = `https://api-cre8ion.tc8l.dev/api/`

export default createStore({
  state: {
    routes: [],
  },
  getters: {
    routes: state => {
      return state.routes;
    }
  },
  mutations: {
    SET_ROUTES(state, routes) {
      state.routes = routes
    }
  },
  actions: {
    async loadRoutes({ commit }) {
      const apiURl = API_URL_BASE + `navigation`
      let newRoutes = []
      try {
        axios.get(apiURl, {
          headers: { 'Content-Type': 'application/json;charset=UTF-8', "Access-Control-Allow-Origin": "*", }
        }).then(response => {
          response.data.forEach(page => {
            const route = {
              path: page.url,
              name: page.name,
              component: DynamicView,
              props: { id: page.id }
            }
            newRoutes.push(route);
          })
        }).then(() => {
          commit('SET_ROUTES', newRoutes)
        })
      } catch (error) {
        console.error(error)
      }
    },
    /*
    async loadPageData(id) {
      const apiUrl = API_URL_BASE + "pages/" + id
      try {
        await axios.get(apiUrl).then(response => {
          console.log(response.data.content)
          return response.data.content
        })
      } catch (error) {
        console.error(error)
      }
    }
    */
  },
  modules: {
  }
})
