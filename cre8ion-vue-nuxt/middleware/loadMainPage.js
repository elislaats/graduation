export default defineNuxtRouteMiddleware(async (to) => {
  let key = to.path.replace(`${to.params.slug}`, "");
  if (key.endsWith("/") && key.length > 1) {
    key = key.replace(/.$/, "");
  }
  if (useNuxtData(key).data.value == null) {
    await useFetch(`/page/${to.meta.id}`, {
      key: key,
      baseURL: useRuntimeConfig().public.apiBase,
      transform: (data) => {
        return mapPageData(data, key);
      },
    }).then((res) => {
      if (res.error.value) {
        return abortNavigation(
          `Geen paginainhoud gevonden voor id: ${to.meta.id}`
        );
      }
    });
  }
  if (!to.meta.middleware.includes("load-sub-page")) {
    useSeoMeta(useNuxtData(key).data.value.metaData);
  }
});
