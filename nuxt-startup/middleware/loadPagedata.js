export default defineNuxtRouteMiddleware(async (to) => {
  const mainPath = to.fullPath.split("/")[1];
  const subPath = to.params.subPath;

  if (subPath) {
    const databankId = getDatabankIdFromName(mainPath);
    const detailId = await getDetailIdFromSlug(databankId, subPath);
    if (detailId) {
      idList.value = [databankId, detailId];
    } else {
      throw createError({
        statusCode: 404,
        statusMessage: "route onbekend",
        message: "bij deze sub-route is geen id bekend",
        fatal: true,
      });
    }
  } else {
    const routes = useState("routes").value;
    routes.forEach((route) => {
      if (route.path.includes(mainPath)) {
        idList.value = [route.id];
      }
    });
  }
});
