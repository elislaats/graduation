<script setup>
import LoadingView from "./LoadingView.vue";
import ContentBlock from "@/components/ContentBlock.vue";

import { watch, defineProps, ref } from "vue";
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

getPageData(props.id);

watch(
  () => props.id,
  (value) => {
    getPageData(value);
  }
);
</script>

<template>
  <RouterView v-if="$route.name.includes('nested')" />
  <main class="grid" v-else-if="pageContent">
    <h1 class='col-1-1' v-if="pageContent.titel">{{ pageContent.titel }}</h1>
    <p class='col-1-1'> Contentblokken opgehaald van <strong> /api/page/{{ props.id }}:</strong> </p>
    <component
      v-for="block in pageContent.blocks"
      :is="ContentBlock"
      :key="block._id"
      :content="block"
      :color="'primary'"
    />
  </main>
  <LoadingView v-else />
</template>
