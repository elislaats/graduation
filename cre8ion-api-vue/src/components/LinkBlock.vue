<script setup>
import { defineProps, onBeforeMount } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  content: {
    type: Object,
    value: null,
    required: true,
  },
});
const router = useRouter();

onBeforeMount(() => {
  createDetailRoute(router.currentRoute.value)
});

function createDetailRoute(parent){
  if (!router.hasRoute(`${parent.name}-detail`)) {
    const route = {
      name: `${parent.name}-detail`,
      path: `${parent.path}/:id`,
      component: () => import("../views/DetailView.vue"),
      props: true,
    };
    router.addRoute(route)
    console.log(router.getRoutes())
  }
}

function openDetailPage(id) {
  router.push(`${router.currentRoute.value.path}/${id}`);
}
</script>

<template>
  <!-- render element wanneer content beschikbaar is -->
  <div
    v-if="props.content"
    class="col-1-4 flex flex-column align-start border-info bg-white"
  >
    <h5 v-if="props.content.titel" v-text="props.content.titel" />
    <button @click="openDetailPage(props.id)" class="btn btn-secondary">
      meer
    </button>
    <router-link :to="`${router.currentRoute.value.path}/${id}`"></router-link>
  </div>

  <!-- indien geen content beschikbaar -->
  <div class="col-1-1 border-danger bg-white grid-pad" v-else>
    <p class="text-danger">Loading...</p>
  </div>
</template>
