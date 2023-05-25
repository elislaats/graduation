<template>
  <ErrorComp v-if="error" :error="error"></ErrorComp>
  <LoadingComp v-if="!page.contentBlocks"></LoadingComp>
  <main v-else>
    <component
      v-for="(block, index) in page.contentBlocks"
      :is="getContentBlockById(block.info._id)"
      :key="'cb' + index"
      :info="block.info"
      :data="block.data"
    />
  </main>
</template>

<script setup>
definePageMeta({
  middleware: ["check-path"],
});

const error = ref(null);
const idList = ref([]);
const page = ref({
  info: null,
  contentBlocks: null,
  metaData: null,
});

onMounted(async () => {
  const currentPaths = useRoute().params.paths;
  if (currentPaths.length > 1 && currentPaths[1] != "") {
    const databankId = getDatabankIdFromName(currentPaths[0]);
    const detailId = await getDetailIdFromSlug(databankId, currentPaths[1]);
    if (detailId) {
      idList.value = [databankId, detailId];
    } else {
      throw createError({
        statusCode: 404,
        statusMessage: "route onbekend",
        fatal: true,
      });
    }
  } else {
    const routes = useState("routes").value;
    routes.forEach((route) => {
      if (route.path.includes(currentPaths[0])) {
        idList.value = [route.id];
      }
    });
  }
});

watch(idList, async (idList) => {
  if (idList.length > 0) {
    try {
      const { data: apidata } = await useFetch(
        `/api/page/${idList.join("/")}`,
        {
          key: `pagina-${idList.join("-")}`,
          method: "GET",
          baseURL: "https://api-cre8ion.tc8l.dev",
        }
      );
      if (apidata.value) {
        page.value = mapPageData(apidata.value);
      } else {
        throw createError({
          statusCode: 400,
          statusMessage: "API Call mislukt",
          message: `geprobeerd op te halen: /api/page/${idList.join("/")}`,
        });
      }
    } catch (err) {
      error.value = err;
    }
  }
});
</script>
