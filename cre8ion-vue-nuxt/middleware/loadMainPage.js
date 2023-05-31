export default defineNuxtRouteMiddleware(async (to) => {
  await useFetch(`/page/${to.meta.id}`, {
    key: to.path,
    baseURL: useRuntimeConfig().public.apiBase,
    transform: (data) => {
      return mapPageData(data);
    },
  }).then((res) => {
    if (res.error.value) {
      return abortNavigation(`Geen paginainhoud gevonden voor id: ${to.meta.id}`);
    }
  });
});
