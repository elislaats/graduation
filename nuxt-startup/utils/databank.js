export const getDatabank = async function (id) {
  const stateData = useState(`databank-${id}`).value;
  if (stateData) {
    return stateData;
  } else {
    const { data: elements } = await useFetch(`/api/pages/${id}`, {
      method: "GET",
      baseURL: "https://api-cre8ion.tc8l.dev",
    });
    useState(`databank-${id}`, () => elements.value);
    return elements.value;
  }
};

export const getItemsFromDatabank = async function (id, items) {
    const idList = items.split(',')

    const fullDatabank = await getDatabank(id)

    let foundElements = [];

    fullDatabank.forEach((element) => {
      idList.forEach((id) => {
        if (element._id == id) {
          foundElements.push(element);
        }
      });
    });

    return foundElements;
}