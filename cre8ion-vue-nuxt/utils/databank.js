export const getFullDatabank = async function (id) {
  const databank = await useFetch(`/pages/${id}`, {
    key: `databank-${id}`,
    baseURL: useRuntimeConfig().public.apiBase,
  }).then((res) => {
    if (res.error.value) {
      throw createError({
        statusCode: 400,
        statusMessage: "Ophalen Databank mislukt",
        message: `geprobeerd op te halen: /api/pages/${id}}`,
      });
    } else {
      return res.data.value;
    }
  });
  return databank;
};

export const getDetailIdFromSlug = async function (databankId, slug) {
  const fullDatabank = await getFullDatabank(databankId);
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
