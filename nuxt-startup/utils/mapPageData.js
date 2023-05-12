export default function (data) {
  let mappedContent = {
    info: { id: data._id },
    contentBlocks: mapContentBlocks(data.content.content),
    metaData: data.metadata,
  };

  for (const key in data.content) {
    if (typeof data.content[key] != "object") {
      mappedContent.info[key] = data.content[key];
    }
  }
  return mappedContent;
}
