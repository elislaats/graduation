<script setup>
import { defineProps } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  content: {
    type: Object,
    value: null,
    required: true,
  },
});

const router = useRouter();
const currentRoute = router.currentRoute.value.path;

function openDetailPage(detailContent) {
const detailPath = currentRoute + "/" + detailContent.slug

  if (!router.hasRoute(detailContent.slug)) {
    const route = {
      name: detailContent.slug,
      path: detailPath,
      component: () => import("../views/DetailView.vue"),
      props: {
        content: detailContent,
      },
    };
    router.addRoute(route);
  }

  router.push(detailPath);
}
</script>

<template>
  <!-- render element wanneer content beschikbaar is -->
  <div
    v-if="props.content"
    class="col-1-4 flex flex-column align-start border-info bg-white"
  >
    <h5 v-if="props.content.titel" v-text="props.content.titel" />
    <button @click="openDetailPage(props.content)" class="btn btn-secondary">
      meer
    </button>
  </div>

  <!-- indien geen content beschikbaar -->
  <div class="col-1-1 border-danger bg-white grid-pad" v-else>
    <p class="text-danger">Loading...</p>
  </div>
</template>
