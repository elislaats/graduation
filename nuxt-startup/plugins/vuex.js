import { createStore } from "vuex";

const store = createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {},
});

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(store);
});
