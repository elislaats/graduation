export default function (title, metaData) {
  useHead({
    htmlAttrs: {
      lang: "nl",
    },
    link: [
      {
        rel: "icon",
        type: "image/png",
        href: "/icon.png",
      },
    ],
  });
  if (metaData) {
    useHead({
      title: metaData.title,
    });

    for (const key in metaData) {
      if (key != "title") {
        useHead({
          meta: [
            {
              name: key,
              content: metaData[key],
            },
          ],
        });
      }
    }
  } else {
    useHead({
      title: title + " | The Cre8ion.Lab",
    });
  }
}
