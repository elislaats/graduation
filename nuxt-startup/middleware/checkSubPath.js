export default defineNuxtRouteMiddleware(async (to, from) => {
  const databankId = getDatabankIdFromName(to.params.mainPath);
  const detailId = await getDetailIdFromSlug(databankId, to.params.subPath);

  if (detailId) {
    useState(`id-${to.params.subPath}`, () => detailId);
  } else {
    return abortNavigation({
      statusCode: 404,
      statusMessage: "route onbekend",
      message: "bij deze sub-route kan geen id gevonden worden",
    });
  }
});
