import { createStore } from "vuex";
import axios from "axios";

const storeController = new AbortController();

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
    },
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
    abortAxios() {
      storeController.abort();
    },
    async loadPageData({ commit }, pageId) {
      await axios
        .get(`https://api-cre8ion.tc8l.dev/api/page/` + pageId, {
          signal: storeController.signal,
        })
        .then((response) => {
          commit("addPageData", { data: response.data, id: pageId });
        })
        .catch(function (error) {
          if (axios.isCancel(error)) {
            console.warn(`loadPageData for ${pageId} cancelled in vuex`);
          } else {
            console.warn("Something went wrong:", error.message);
          }
        });
    },
    async loadDatabank({ commit }, dataId) {
      await axios
        .get(`https://api-cre8ion.tc8l.dev/api/pages/` + dataId, {
          signal: storeController.signal,
        })
        .then((response) => {
          commit("addDatabank", { data: response.data, id: dataId });
        })
        .catch(function (error) {
          if (axios.isCancel(error)) {
            console.warn(`loadDatabank for ${dataId} cancelled in vuex`);
          } else {
            console.warn("Something went wrong:", error.message);
          }
        });
    },
  },
  modules: {},
});
