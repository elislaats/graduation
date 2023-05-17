export default async function (id) {
  const width = 300;
  const height = undefined;

  const response = await $fetch(
    `https://api-cre8ion.tc8l.dev/api/media/${id}`,
    {
      params: {
        width: width,
        height: height,
      },
      responseType: "blob",
    }
  ).catch(function (error) {
    console.warn(
      `ImageComponent.getImage() did not succeed. Reason: ${error.message}`
    );
    return "error";
  });

  return window.URL.createObjectURL(response);
}
