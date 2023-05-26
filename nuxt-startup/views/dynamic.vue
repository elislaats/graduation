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
const error = ref(null);
const idList = ref([]);
const page = ref({
  info: null,
  contentBlocks: null,
  metaData: null,
});

onMounted(async () => {
  const mainPath = useRoute().fullPath.split('/')[1]
  const subPath = useRoute().params.subPath

  if (subPath) {
    const databankId = getDatabankIdFromName(mainPath);
    const detailId = await getDetailIdFromSlug(databankId, subPath);
    if (detailId) {
      idList.value = [databankId, detailId];
    } else {
      throw createError({
        statusCode: 404,
        statusMessage: "route onbekend",
        message: "bij deze sub-route is geen id bekend",
        fatal: true,
      });
    }
  } else {
    const routes = useState("routes").value;
    routes.forEach((route) => {
      if (route.path.includes(mainPath)) {
        idList.value = [route.id];
      }
    });
  }
});

watch(
  idList, async (idList) => {
  if (idList.length > 0) {
    page.value = await getPagedataByIds(idList);
  }
});

watch(page, (newpage) => {
  if(newpage.metaData) {
    setMetadata(newpage.info.titel, newpage.metaData)
  }
})
</script>
