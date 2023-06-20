export default defineNuxtRouteMiddleware(async (to) => {
  let key = to.path;
  if (key.endsWith("/")) {
    key = key.replace(/.$/, "");
  }
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
          return mapPageData(data, key);
        },
      }).then((res) => {
        if (res.error.value) {
          return abortNavigation(
            `Geen paginainhoud gevonden voor databank: ${databank} en id: ${id}`
          );
        }
      });
    }
  }
  useSeoMeta(useNuxtData(key).data.value.metaData);
});
