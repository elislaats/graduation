<template>
  <main v-if="contentLoaded">
    <component
      v-for="(block, index) in page.contentBlocks"
      :is="getContentBlockById(block.info._id)"
      :key="'cb' + index"
      :info="block.info"
      :data="block.data"
    />
  </main>
  <section class="loading-indicator" v-else>
    <div></div>
  </section>
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
    if (path.includes(route.path)) {
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

<style lang="scss">
.loading-indicator {
  z-index: 0;
  height: 100vh;
  width: 100vw;
  padding: 0;
  margin: 0;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  div {
    width: 7rem;
    height: 7rem;
    border-radius: 100%;
    border: 1rem dotted $primary-color;
    animation: spinning 3s linear infinite;
  }
}

@keyframes spinning {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
