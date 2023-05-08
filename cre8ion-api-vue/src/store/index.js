import { createStore } from "vuex";
import axios from "axios";

const storeController = {};

const DatabankMap = { onswerk: 5, cases: 6, nieuws: 7 };

export default createStore({
  state: {
    pages: {},
    databank: {},
    detailPages: {},
  },
  getters: {
    findDatabankIdFromUrl: () => (path) => {
      for (const [key, value] of Object.entries(DatabankMap)) {
        if (path.replace("-", "").toLowerCase().includes(key)) {
          return value;
        }
      }
    },
    getPageDataById: (state) => (id) => {
      if (state.pages[id] != undefined) {
        return state.pages[id];
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
    findDatabankItemBySlug:
      (state) =>
      ({ id, slug }) => {
        let found = false;
        if (state.databank[id] != undefined) {
          const databank = state.databank[id];
          databank.forEach((item) => {
            if (item.content.slug == slug) {
              found = item;
            }
          });
        }
        return found;
      },
    getDetailPageById:
      (state) =>
      ({ parentId, pageId }) => {
        if (state.detailPages[parentId] != undefined) {
          if (state.detailPages[parentId][pageId] != undefined) {
            return state.detailPages[parentId][pageId];
          }
        } else {
          return false;
        }
      },
  },
  mutations: {
    addPageData(state, { data, id }) {
      state.pages[id] = {
        blocks: [],
      };
      mapContent(data, state.pages[id]);
    },
    addDatabank(state, { data, id }) {
      state.databank[id] = data;
    },
    addDetailpageData(state, { parentId, data }) {
      const pageId = data._id;
      state.detailPages[parentId] = {};
      state.detailPages[parentId][pageId] = {
        blocks: []
      }
      mapContent(data, state.detailPages[parentId][pageId]);
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
    async loadDetailpageData({ commit }, { parentId, pageId }) {
      storeController["loadDetailpageData" + pageId] = new AbortController();

      await axios
        .get(`https://api-cre8ion.tc8l.dev/api/page/${parentId}/${pageId}`, {
          signal: storeController["loadDetailpageData" + pageId].signal,
        })
        .then((response) => {
          commit("addDetailpageData", {
            parentId: parentId,
            data: response.data,
          });
        })
        .catch(function (error) {
          console.warn(
            `loadDetailpageData(${pageId}) did not succeed. Reason: ${error.message}`
          );
        });
    },
  },
  modules: {},
});

function mapContent(data, target) {
  const content = data["content"];
  const blocks = content["content"];
  let mappedBlock = {};

  for (const key in data) {
    if (data[key] != content) {
      target[key] = data[key];
    } else {
      for (const key in content) {
        if (content[key] != blocks) {
          target[key] = content[key];
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

    target["blocks"].push(mappedBlock);
  });
}
