export const getPagedataByIds = async function (idList) {
  const stateData = useState(`pagedata-${idList.join("-")}`).value;
  if (stateData) {
    return stateData;
  } else {
    const content = await $fetch(`/api/page/${idList.join("/")}`, {
      method: "GET",
      baseURL: "https://api-cre8ion.tc8l.dev",
    });
    if (content) {
        const mapped = mapPageData(content)
      return useState(`pagedata-${idList.join("-")}`, () => mapped).value;
    } else {
      throw createError({
        statusCode: 400,
        statusMessage: "API Call mislukt",
        message: `geprobeerd op te halen: /api/pages/${id}}`,
      });
    }
  }
};
