
import { createStore } from 'vuex'
import axios from 'axios';

const API_URL_BASE = `https://api-cre8ion.tc8l.dev/api/`

export default createStore({
  state: {
    routes: [],
    pagedata: null,
    allseries: {}
  },
  getters: {
    routes: state => {
      return state.routes;
    },
    pagedata: state => {
      return state.pagedata
    },
    series: state => {
      return state.series
    }
  },
  mutations: {
    setRoutes(state, routes) {
      state.routes = routes
    },
    setPagedata(state, pagedata) {
      state.pagedata = pagedata
    },
    addSeries(state, { series, seriesid }) {
      state.allseries[seriesid] = series;
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
    async loadPageData({ commit }, id) {
      try {
        const response = await axios.get(API_URL_BASE + `page/` + id)
        commit('setPagedata', response.data)
      } catch (error) {
        console.error(error)
      }
    },
    async loadSeries({ commit }, id) {
      try {
        const response = await axios.get(API_URL_BASE + `pages/` + id)
        commit('addSeries', { series: response.data, seriesid: id })
      } catch (error) {
        console.error(error)
      }
    }
  },
  modules: {
  }
})
