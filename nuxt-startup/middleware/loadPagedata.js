import { getDatabankIdFromName, getDetailIdFromSlug } from "~/utils/databank";
import { getPagedataByIds } from "~/utils/page";

export default defineNuxtRouteMiddleware(async (to) => {
  const mainPath = to.path.split("/")[1];
  const subPath = to.params.subPath;
  let loadedData = null;

  if (subPath) {
    const databankId = getDatabankIdFromName(mainPath);
    const detailId = await getDetailIdFromSlug(databankId, subPath);
    if (detailId) {
      loadedData = await getPagedataByIds(to.path, [databankId, detailId]);
    } else {
      throw abortNavigation({
        statusCode: 404,
        statusMessage: "route onbekend",
        message: "bij deze sub-route is geen id bekend",
      });
    }
  } else {
    const pageid = to.matched[0].props.default.id;
    loadedData = await getPagedataByIds(to.path, [pageid]);
  }

  if (loadedData) {
    useState(to.path, () => loadedData);
    setMetadata(to.name, loadedData.metaData);
  }
});
