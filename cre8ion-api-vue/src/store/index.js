import { createStore } from "vuex";
import axios from "axios";

const storeController = {};

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
      state.pageData[id] = {
        blocks: [],
      };
      const content = data["content"];
      const blocks = content["content"];
      let mappedBlock = {};

      for (const key in data) {
        if (data[key] != content) {
          state.pageData[id][key] = data[key];
        } else {
          for (const key in content) {
            if (content[key] != blocks) {
              state.pageData[id][key] = content[key];
            }
          }
        }
      }
      
      blocks.forEach((block) => {
        mappedBlock = {};
        for (const key in block) {
          if (typeof block[key] == "object") {
            const subBlock = block[key];
            for (const subKey in subBlock) {
              mappedBlock[subKey] = subBlock[subKey];
            }
          } else {
            mappedBlock[key] = block[key];
          }
        }

        state.pageData[id]["blocks"].push(mappedBlock);
      });
    },
    addDatabank(state, { data, id }) {
      state.databank[id] = data;
    },
  },
  actions: {
    abortAxios(state, { actionName, id }) {
      if (storeController[`${actionName}${id}`] != null) {
        storeController[actionName + id].abort();
      }
    },
    async loadPageData({ commit }, pageId) {
      storeController["loadPageData" + pageId] = new AbortController();

      await axios
        .get(`https://api-cre8ion.tc8l.dev/api/page/` + pageId, {
          signal: storeController["loadPageData" + pageId].signal,
        })
        .then((response) => {
          commit("addPageData", { data: response.data, id: pageId });
        })
        .catch(function (error) {
          console.warn(
            `Store.loadPageData(${pageId}) did not succeed. Reason: ${error.message}`
          );
        });
    },
    async loadDatabank({ commit }, dataId) {
      storeController["loadDatabank" + dataId] = new AbortController();
      await axios
        .get(`https://api-cre8ion.tc8l.dev/api/pages/` + dataId, {
          signal: storeController["loadDatabank" + dataId].signal,
        })
        .then((response) => {
          commit("addDatabank", { data: response.data, id: dataId });
        })
        .catch(function (error) {
          console.warn(
            `Store.loadDatabank(${dataId}) did not succeed. Reason: ${error.message}`
          );
        });
    },
  },
  modules: {},
});
