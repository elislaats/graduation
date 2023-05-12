<template>
  <main>
    <section v-if="page.info && page.contentBlocks">
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
const page = ref({
  info: null,
  contentBlocks: null,
  metaData: null,
});

function setContentId(path) {
  const routes = useState("routes").value;
  console.log(path);
  routes.forEach((route) => {
    if (path.includes(route.path)) {
      currentId.value = route.id;
    }
  });
}

setContentId(useRoute().path);
page.value = useState(`pagedata-${currentId.value}`).value;

onBeforeMount(() => {
  setMetadata(page.value.info.titel, page.value.metaData);
});
</script>
