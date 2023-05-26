export const getPagedataByIds = async function (path, idList) {
  const stateData = useState(path).value;
  if (stateData) {
    return stateData;
  } else {
    const data = await $fetch(`/api/page/${idList.join("/")}`, {
      method: "GET",
      baseURL: "https://api-cre8ion.tc8l.dev",
    });
    if (data) {
      return mapPageData(data);
    } else {
      throw createError({
        statusCode: 400,
        statusMessage: "API Call mislukt",
        message: `geprobeerd op te halen: /api/page/${idList.join("/")}`,
      });
    }
  }
};

function mapPageData(apiData) {
  let mappedContent = {
    info: { id: apiData._id },
    contentBlocks: mapContentBlocks(apiData.content.content),
    metaData: apiData.metadata,
  };

  for (const key in apiData.content) {
    if (typeof apiData.content[key] != "object") {
      mappedContent.info[key] = apiData.content[key];
    }
  }
  return mappedContent;
}

function mapContentBlocks(apiBlocks) {
  let blockArray = [];
  apiBlocks.forEach((block) => {
    let mappedBlock = { info: {}, data: {} };
    for (const key in block) {
      if (key == "_block") {
        mappedBlock.info = block[key];
      } else {
        mappedBlock.data[key] = block[key];
      }
    }
    blockArray.push(mappedBlock);
  });
  return blockArray;
}
