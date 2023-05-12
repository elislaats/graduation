export default function (blocks) {
  let blockArray = [];
  blocks.forEach((block) => {
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
