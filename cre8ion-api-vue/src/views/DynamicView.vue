<script setup>
import { watch, defineProps, ref } from "vue";
import { useStore } from "vuex";
import { onBeforeRouteLeave } from "vue-router";
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
  pageContent.value = null;
  const check = await store.getters.getPageDataById(id);

  if (!check) {
    await store.dispatch("loadPageData", props.id);
    const data = await store.getters.getPageDataById(id);
    pageContent.value = data.content;
  } else {
    pageContent.value = check.content;
  }
}

getPageData(props.id);

onBeforeRouteLeave(() => {
  if(!pageContent.value){
    store.dispatch("abortAxios");
  }
});

watch(
  () => props.id,
  (value) => {
      getPageData(value)
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
    <div class="load-spinner" v-else />
  </main>
</template>
