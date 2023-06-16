export default function (apiData) {
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
