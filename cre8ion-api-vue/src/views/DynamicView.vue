<script setup>
import { defineProps, watch, ref } from "vue";
import { useStore } from "vuex";
import ContentBlock from "../components/ContentBlock.vue";

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
});

const store = useStore();
const pageContent = ref(null);

async function getPageData(id) {
  const check = await store.getters.getPageDataById(id);

  if (!check) {
    await store.dispatch("loadPageData", props.id);
    const data = await store.getters.getPageDataById(id);
    pageContent.value = data.content;
    console.log("page content from api id:" + id);
  } else {
    pageContent.value = check.content;
    console.log("page content from store id:" + id);
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
  <main class="grid align-start">
    <div class="grid col-1-1" v-if="pageContent">
      <h1 class="col-1-1">{{ pageContent.titel }}</h1>
      <p class="col-1-1">
        Contentblokken opgehaald van <strong>/api/page/{{ props.id }}</strong
        >:
      </p>
      <ContentBlock
        v-for="(block, index) in pageContent.content"
        :key="'cb' + index"
        :content="block"
        :color="'primary'"
      >
      </ContentBlock>
    </div>
    <div v-else class="text-danger col-1-1">Loading...</div>
  </main>
</template>
