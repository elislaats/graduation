<script setup>
import { defineEmits, defineProps, onBeforeMount, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import ContentBlock from "@/components/ContentBlock.vue";
import ImageComponent from "@/components/ImageComponent.vue";
import VideoComponent from "@/components/VideoComponent.vue";

const props = defineProps({
  slug: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["updateMetadata"]);

const content = ref(null);
const store = useStore();
const router = useRouter();

async function getDetailId(slug) {
  const dbID = store.getters.findDatabankIdFromText(router.currentRoute.value.path);
  let data = null;
  const storeData = await store.getters.findDatabankItemBySlug({
    id: dbID,
    slug: slug,
  });

  if (!storeData) {
    await store.dispatch("loadDatabank", dbID);
    data = await store.getters.findDatabankItemBySlug({
      id: dbID,
      slug: slug,
    });
  } else {
    data = storeData;
  }
  return data._id;
}

async function getDetailPageData(pageId) {
  const parentId = store.getters.findDatabankIdFromText(
    router.currentRoute.value.path
  );
  let foundContent = null;
  const storeData = await store.getters.getDetailPageById({
    parentId: parentId,
    pageId: pageId,
  });

  if (!storeData) {
    await store.dispatch("loadDetailpageData", {
      parentId: parentId,
      pageId: pageId,
    });
    foundContent = await store.getters.getDetailPageById({
      parentId: parentId,
      pageId: pageId,
    });
  } else {
    foundContent = storeData;
  }
  content.value = foundContent;
  emit("updateMetadata", foundContent.metadata);
}

onBeforeMount(async () => {
  const detailId = await getDetailId(props.slug);
  if (detailId) {
    getDetailPageData(detailId);
  } else {
    // redirect to 404 if unable to find data
    router.replace({
      name: "404",
      params: { pathMatch: router.currentRoute.value.path.replace("/", "") },
    });
  }
});
</script>

<template>
  <main class="grid align-start" v-if="content">
    <h1 class="col-1-1">{{ content.titel }}</h1>
    <template v-for="(value, key, index) in content" :key="index + key">
      <template v-if="key == 'blocks'">
        <h2 class="blocks header text-success">Contentblokken</h2>
        <component
          v-for="(block, index) in value"
          :is="ContentBlock"
          :key="'cb' + index"
          :content="block"
          :color="'success'"
          class="blocks"
        />
      </template>

      <div class="col-1-2 video" v-else-if="key.includes('vimeo') && value">
        <!-- laad video-component voor video(s)-->
        <p>
          <strong>{{ key }}: </strong>
        </p>
        <VideoComponent :url="value" />
      </div>

      <div
        class="col-1-2 afbeelding"
        v-else-if="
          (key.includes('afbeelding') || key.includes('Afbeelding')) && value
        "
      >
        <p>
          <strong>{{ key }}: </strong>
        </p>
        <ImageComponent :id="value" :width="800" />
      </div>

      <p :class="['col-1-1', key]" v-else>
        <strong>{{ key }}: </strong>
        <span v-html="value" />
      </p>
    </template>
  </main>
  <main v-else>
    <div class="load-spinner"></div>
  </main>
</template>

<style lang="scss" scoped>
.afbeelding {
  order: 10;
}
.video {
  order: 11;
}

.blocks {
  order: 20;
  &.header {
    width: 100%;
    padding-top: 10vh;
  }
}
</style>
