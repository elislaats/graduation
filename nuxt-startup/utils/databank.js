export const getDatabank = async function (id) {
  const stateData = useState(`databank-${id}`).value;
  if (stateData) {
    return stateData;
  } else {
    const elements = await $fetch(`/api/pages/${id}`, {
      method: "GET",
      baseURL: "https://api-cre8ion.tc8l.dev",
    });
    if (elements) {
      return useState(`databank-${id}`, () => elements).value;
    } else {
      throw createError({
        statusCode: 400,
        statusMessage: "API Call mislukt",
        message: `geprobeerd op te halen: /api/pages/${id}}`,
      });
    }
  }
};

export const getItemsFromDatabank = async function (id, items) {
  const idList = items.split(",");

  const fullDatabank = await getDatabank(id);

  let foundElements = [];

  fullDatabank.forEach((element) => {
    idList.forEach((id) => {
      if (element._id == id) {
        foundElements.push(element);
      }
    });
  });

  return foundElements;
};

export const getDetailIdFromSlug = async function (databankId, slug) {
  const fullDatabank = await getDatabank(databankId);
  let foundId = null;

  fullDatabank.forEach((element) => {
    if (element.content.slug == slug) {
      foundId = element._id;
    }
  });
  return foundId;
};

export const getDatabankIdFromName = function (name) {
  const lookUpName = name.replaceAll(" ", "").replaceAll("-", "").toLowerCase();
  switch (lookUpName) {
    case "cases":
      return 6;
    case "onswerk":
      return 5;
    case "nieuws":
      return 7;
    case "vacatures":
      return 44;
    case "medewerkers":
      return 1017;
    default:
      throw createError({
        statusCode: 404,
        statusMessage: "geen databank gevonden",
        message: `Er is geen databank gedefinieerd met de naam ${name}`,
      });
  }
};
