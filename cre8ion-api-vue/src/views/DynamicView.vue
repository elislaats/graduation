<script setup>
import LoadingView from "./LoadingView.vue";
import ContentBlock from "@/components/ContentBlock.vue";
import ImageComponent from "@/components/ImageComponent.vue";

import { watch, defineProps, ref, onMounted, onUpdated } from "vue";
import { useStore } from "vuex";

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
});

const store = useStore();
const pageContent = ref();

async function getPageData(id) {
  const storeData = await store.getters.getPageDataById(id);

  if (!storeData) {
    await store.dispatch("loadPageData", props.id);
    const data = await store.getters.getPageDataById(id);
    pageContent.value = data;
  } else {
    pageContent.value = storeData;
  }
}

function setMetaData(data) {
  for (const key in data) {
    const value = data[key];
    document[key] = value;
  }
}

onMounted(() => getPageData(props.id));

onUpdated(() => {
  if (pageContent.value.metadata) {
    setMetaData(pageContent.value.metadata);
  } else {
    setMetaData({ title: pageContent.value.titel + " | The Cre8ion.Lab" });
  }
});

watch(
  () => props.id,
  (id) => {
    getPageData(id);
  }
);
</script>

<template>
  <RouterView
    @update-metadata="(data) => setMetaData(data)"
    v-if="$route.name.includes('nested')"
  />
  <main class="grid align-content-start" v-else-if="pageContent">
    <div
      class="flex flex-column justify-center"
      :class="[pageContent.afbeelding ? 'col-1-3' : 'col-1-1']"
    >
      <h1 v-if="pageContent.titel">{{ pageContent.titel }}</h1>
      <p>
        Contentblokken opgehaald van <strong> /api/page/{{ props.id }}:</strong>
      </p>
    </div>
    <div class="col-2-3 flex justify-end" v-if="pageContent.afbeelding">
      <ImageComponent :key="pageContent.afbeelding" :id="pageContent.afbeelding" :width="300" />
    </div>
    <component
      v-for="(block, index) in pageContent.blocks"
      :is="ContentBlock"
      :key="'cb' + index"
      :content="block"
      :color="'primary'"
    />
  </main>
  <LoadingView v-else />
</template>
