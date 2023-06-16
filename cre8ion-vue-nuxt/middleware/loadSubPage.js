export default defineNuxtRouteMiddleware(async (to) => {
  const key = to.path
  if (useNuxtData(key).data.value == null) {
    const databank = getDatabankIdFromName(to.path.split("/")[1]);
    const id = await getDetailIdFromSlug(databank, to.params.slug);
    if (!id) {
      return abortNavigation(
        `De slug: ${to.params.slug} werd niet gevonden in databank: ${databank}`
      );
    } else {
      await useFetch(`/page/${databank}/${id}`, {
        key: key,
        baseURL: useRuntimeConfig().public.apiBase,
        transform: (data) => {
          return mapPageData(data);
        },
      }).then((res) => {
        if (res.error.value) {
          return abortNavigation(
            `Geen paginainhoud gevonden voor databank: ${databank} en id: ${id}`
          );
        } else if (res.data.value.metaData) {
          setMeta(res.data.value);
        }
      });
    }
  } else if (useNuxtData(key).data.value.metaData) {
    setMeta(useNuxtData(key).data.value);
  }
});