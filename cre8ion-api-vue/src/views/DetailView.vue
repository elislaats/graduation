<script setup>
import { defineProps, onBeforeMount, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import ImageComponent from "@/components/ImageComponent.vue";

const props = defineProps({
  slug: {
    type: String,
    required: true,
  },
});

const content = ref(null);
const store = useStore();
const router = useRouter();

async function getDetails(slug) {
  const dbID = getDbId(router.currentRoute.value.path);
  let data = null;
  const storeData = await store.getters.getDatabankById(dbID);

  if (!storeData) {
    await store.dispatch("loadDatabank", dbID);
    data = await store.getters.getDatabankById(dbID);
  } else {
    data = storeData;
  }

  data.forEach((item) => {
    if (item.content.slug == slug) {
      content.value = item.content;
    }
  });
}

// temporary solution to get databank ID:
function getDbId(url) {
  if (url.includes("case")) {
    return 6;
  } else if (url.includes("werk")) {
    return 5;
  } else if (url.includes("nieuws")) {
    return 7;
  } else {
    return undefined;
  }
}

onBeforeMount(async () => {
  await getDetails(props.slug);
  if (!content.value) {
    // redirect to 404 if unable to find data
    router.replace({
      name: "404",
      params: { pathMatch: router.currentRoute.value.path.replace('/', '')},
    });
  }
});
</script>

<template>
  <main class="grid align-start" v-if="content">
    <h1 class="col-1-1">{{ content.titel }}</h1>

    <template v-for="(value, key, index) in content" :key="index + key">
      <div
        class="col-1-1 afbeelding"
        v-if="
          (key.includes('afbeelding') || key.includes('Afbeelding')) && value
        "
      >
        <!--To do: give width/heigth to image component-->
        <p>
          <strong>{{ key }}: </strong>
        </p>
        <ImageComponent :id="value.toString()" :width="800" />
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
</style>
