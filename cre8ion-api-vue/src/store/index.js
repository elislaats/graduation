import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    pageData: {},
    databank: {},
  },
  getters: {
    getPageDataById: (state) => (id) => {
      if (state.pageData[id] != undefined) {
        return state.pageData[id];
      } else {
        return false;
      }
    },
    getDatabankById: (state) => (id) => {
      if (state.databank[id] != undefined) {
        return state.databank[id];
      } else {
        return false;
      }
    }
  },
  mutations: {
    addPageData(state, { data, id }) {
      state.pageData[id] = data;
    },
    addDatabank(state, { data, id }) {
      state.databank[id] = data;
    },
  },
  actions: {
    async loadPageData({ commit }, pageId) {
      try {
        const response = await axios.get(
          `https://api-cre8ion.tc8l.dev/api/page/` + pageId
        );
        commit("addPageData", { data: response.data, id: pageId });
      } catch (error) {
        console.error(error);
      }
    },
    async loadDatabank({ commit }, dataId) {
      try {
        const response = await axios.get(
          `https://api-cre8ion.tc8l.dev/api/pages/` + dataId
        );
        commit("addDatabank", { data: response.data, id: dataId });
      } catch (error) {
        console.error(error);
      }
    },
  },
  modules: {},
});
