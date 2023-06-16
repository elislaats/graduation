export default defineNuxtRouteMiddleware(async (to) => {
  let key = to.path.replace(`/${to.params.slug}`, "");
  if(useNuxtData(key).data.value == null){
    await useFetch(`/page/${to.meta.id}`, {
      key: key,
      baseURL: useRuntimeConfig().public.apiBase,
      transform: (data) => {
        return mapPageData(data);
      },
    }).then((res) => {
      if (res.error.value) {
        return abortNavigation(
          `Geen paginainhoud gevonden voor id: ${to.meta.id}`
        );
      } else {
        setMeta(res.data.value);
      }
    });
  }
});
