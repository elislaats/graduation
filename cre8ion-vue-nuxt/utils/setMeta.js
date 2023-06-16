export default function (page) {
  const meta = page.metaData;
  if (meta && meta['title']) {
    useSeoMeta(meta);
  } else {
    useSeoMeta({ title: page.info.titel + " | The Cre8ion.Lab" });
  }
}