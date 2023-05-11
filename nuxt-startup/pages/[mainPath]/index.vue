<template>
  <main>
    <section v-if="pageData.loaded">
      <ContentBlock
        v-for="(block, index) in pageData.contentBlocks"
        :key="'cb' + index"
        :info="block.info"
        :data="block.data"
      />
    </section>
  </main>
</template>

<script setup>
definePageMeta({
  middleware: ["check-main-path"],
});

const currentId = ref();
const pageData = ref({
  loaded: false,
  info: null,
  contentBlocks: [],
  metaData: null,
});

function getContentId() {
  const currentRoute = useRoute();
  const routes = useState("routes").value;
  routes.forEach((route) => {
    if (route.path == currentRoute.fullPath) {
      currentId.value = route.id;
    }
  });
}

async function loadPageData(id) {
  const stateData = useState(`pagedata-${id}`);
  if (stateData.value) {
    pageData.value = stateData.value;
  } else {
    await $fetch(`/api/page/${id}`, {
      method: "GET",
      baseURL: "https://api-cre8ion.tc8l.dev",
    })
      .then((response) => {
        const loadedData = {
          loaded: true,
          info: response.content,
          contentBlocks: mapContentBlocks(response.content.content),
          metaData: response.content.metadata,
        };
        pageData.value = loadedData;
        useState(`pagedata-${id}`, () => loadedData);
      })
      .catch((error) => {
        console.warn(error);
      });
  }
}

onMounted(async () => {
  getContentId();
  await loadPageData(currentId.value);
});
</script>
