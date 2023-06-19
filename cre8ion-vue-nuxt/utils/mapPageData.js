export default function (apiData, path) {
  let mappedContent = {
    info: { id: apiData._id },
    contentBlocks: mapContentBlocks(apiData.content.content),
    metaData: {}
  };

  for (const key in apiData.content) {
    if (typeof apiData.content[key] != "object") {
      mappedContent.info[key] = apiData.content[key];
    }
  }
  mappedContent.metaData = mapMetadata(apiData.metadata, mappedContent.info, path)

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

function mapMetadata(apiMeta, mappedInfo, path) {
  let mappedMeta = {
    ogType: "website",
    ogImage: `https://api-cre8ion.tc8l.dev/api/media/${findMetaImageId(mappedInfo)}`,
    ogUrl: `https://cre8ionvue.tc8l.dev${path}`,
  };

  if (apiMeta) {
    for (const key in apiMeta) {
        if(apiMeta[key]){
          mappedMeta[key] = apiMeta[key];
          const ogKey = "og" + key.charAt(0).toUpperCase() + key.slice(1);
          mappedMeta[ogKey] = mappedMeta[key];
        }
    }
  }

  if (!mappedMeta["title"]) {
    mappedMeta['title'] = mappedInfo.titel.replace(/<[^>]*>?/gm, ''),
    mappedMeta['ogTitle'] = mappedMeta.title
  }
  return mappedMeta;
}

function findMetaImageId(info) {
  for (const key in info) {
    if (
      (key.includes("afbeelding") || key.includes("Afbeelding")) &&
      info[key]
    ) {
      return info[key];
    }
  }
  return 3848; //default image if no image was found
}