<template>
  <main>
    <section v-if="contentLoaded">
      <component
        v-for="(block, index) in page.contentBlocks"
        :is="getContentBlockById(block.info._id)"
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
const contentLoaded = ref(false);
const page = ref({
  info: null,
  contentBlocks: null,
  metaData: null,
});

function getContentId(path) {
  const routes = useState("routes").value;
  routes.forEach((route) => {
    if (route.path == path) {
      currentId.value = route.id;
    }
  });
}

async function loadPageData(id) {
  const stateData = useState(`pagedata-${id}`);
  if (stateData.value) {
    page.value = stateData.value;
    contentLoaded.value = true;
  } else {
    await $fetch(`/api/page/${id}`, {
      method: "GET",
      baseURL: "https://api-cre8ion.tc8l.dev",
    })
      .then((response) => {
        const loadedData = mapPageData(response);
        page.value = loadedData;
        useState(`pagedata-${id}`, () => loadedData);
        contentLoaded.value = true;
      })
      .catch((error) => {
        console.warn(error);
      });
  }
}

onMounted(async () => {
  contentLoaded.value = false;
  getContentId(useRoute().fullPath);
  await loadPageData(currentId.value);
  if (contentLoaded.value) {
    setMetadata(page.value.info.titel, page.value.metaData);
  }
});
</script>
