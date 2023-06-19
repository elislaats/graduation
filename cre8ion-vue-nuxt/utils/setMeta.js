export default function (page, path) {
  const meta = page.metaData;

  // created mapped meta obect with required Open Graph items
  let mappedMeta = {
    ogType: "website",
    ogImage: `https://api-cre8ion.tc8l.dev/api/media/${findImageId(page.info)}`,
    ogUrl: `https://cre8ionvue.tc8l.dev${path}`,
  };

  if (meta) {
    for (const key in meta) {
      // add a normal and Open Graph item for each element in the provided metadata
      if(meta[key]){
        mappedMeta[key] = meta[key];
        const ogKey = "og" + key.charAt(0).toUpperCase() + key.slice(1);
        mappedMeta[ogKey] = meta[key];
      }
    }
  }

  if (!mappedMeta["title"]) {
    // add a default title if not title was provided
    useSeoMeta({
      title: page.info.titel + " | The Cre8ion.Lab",
      ogTitle: page.info.titel + " | The Cre8ion.Lab",
    });
  }
  useSeoMeta(mappedMeta);
}

function findImageId(info) {
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
