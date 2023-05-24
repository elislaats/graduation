<template>
  <ErrorComp v-if="error" :error="error"></ErrorComp>
  <LoadingComp v-if="pending" color="white"></LoadingComp>
  <main v-if="!pending && !error">
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
  middleware: ["check-main-path", "check-sub-path"],
});

const pageId = computed(() => {
  return useState(`id-${useRoute().params.subPath}`).value;
});

const parentId = getDatabankIdFromName(useRoute().params.mainPath);

const {
  data: apidata,
  pending,
  error,
} = useLazyFetch(`/api/page/${parentId}/${pageId.value}`, {
  key: `pagedata-${parentId}-${pageId.value}`,
  method: "GET",
  baseURL: "https://api-cre8ion.tc8l.dev",
});

const page = computed(() => {
  if (apidata.value) {
    const mappedData = mapPageData(apidata.value);
    useState(`pagedata-${parentId}-${pageId.value}`, () => mappedData);
    return mappedData;
  } else {
    return {
      info: null,
      contentBlocks: null,
      metaData: null,
    };
  }
});
</script>
