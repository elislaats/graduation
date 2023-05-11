<template>
  <main>
    <section v-if="pageData.loaded">
      <ContentBlock
        v-for="block in pageData.contentBlocks"
        :key="block.info._id"
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
  const response = await $fetch(`/api/page/${id}`, {
    method: "GET",
    baseURL: "https://api-cre8ion.tc8l.dev",
  });
  pageData.value = {
    loaded: true,
    info: response.content,
    contentBlocks: mapContentBlocks(response.content.content),
    metaData: response.content.metadata,
  };
  return true;
}

onMounted(async () => {
  getContentId();
  await loadPageData(currentId.value);
});
</script>
