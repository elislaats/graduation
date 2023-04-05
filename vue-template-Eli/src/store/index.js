
import { createStore } from 'vuex'
import axios from 'axios';

const API_URL_BASE = `https://api-cre8ion.tc8l.dev/api/`

export default createStore({
  state: {
    routes: [],
    pageid: 0,
    pagedata: null
  },
  getters: {
    routes: state => {
      return state.routes;
    },
    pageid: state => {
      return state.pageid;
    }
  },
  mutations: {
    setRoutes(state, routes) {
      state.routes = routes
    },
    setPageid(state, pageid){
      state.pageid = pageid
    },
    setPagedata(state, pagedata){
      state.pagedata = pagedata
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
              component: null, //component is set on add for stability
              props: { id: page.id }
            }
            newRoutes.push(route);
          })
        }).then(() => {
          commit('setRoutes', newRoutes)
        })
      } catch (error) {
        console.error(error)
      }
    },
    async loadPageData({ commit }) {
      try {
        const response = await axios.get( API_URL_BASE+ `page/` + this.getters.pageid)
        commit('setPagedata', response.data)
      } catch (error) {
        console.error(error)
      }
    }
  },
  modules: {
  }
})
