export default defineNuxtRouteMiddleware(async (to) => {
  if (useNuxtData(to.path).data.value == null) {
    const databank = getDatabankIdFromName(to.path.split("/")[1]);
    const id = await getDetailIdFromSlug(databank, to.params.slug);
    if (!id) {
      return abortNavigation(
        `De slug: ${to.params.slug} werd niet gevonden in databank: ${databank}`
      );
    } else {
      await useFetch(`/page/${databank}/${id}`, {
        key: to.path,
        baseURL: useRuntimeConfig().public.apiBase,
        transform: (data) => {
          return mapPageData(data);
        },
      }).then((res) => {
        if (res.error.value) {
          return abortNavigation(
            `Geen paginainhoud gevonden voor databank: ${databank} en id: ${id}`
          );
        } else {
          setMeta(res.data.value);
        }
      });
    }
  }
});
