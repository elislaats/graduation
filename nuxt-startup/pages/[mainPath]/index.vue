<template>
  <main class="grid align-content-start" v-if="pageData.loaded">
    <h3 class="col-1-1">{{ pageData.info.titel }}</h3>
    <div
      v-for="contentBlock in pageData.contentBlocks"
      :key="contentBlock._block._id"
      class="col-1-1 border-primary"
    >
      <p v-for="(value, key) in contentBlock" :key="key">
        <strong>{{ key }}</strong>
        {{ value }}
      </p>
    </div>
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
    contentBlocks: response.content.content,
    metaData: response.content.metadata,
  };
  return true;
}

onMounted(async () => {
  getContentId();
  await loadPageData(currentId.value);
});
</script>
