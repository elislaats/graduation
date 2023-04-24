<script setup>
import { defineProps } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  content: {
    type: Object,
    required: true,
  },
  meta: {
    type: Object,
    required: false,
  },
});

const router = useRouter();

function getRoute() {
  const parent = router.currentRoute.value;

  if (!router.hasRoute(`${parent.name}-detail-hidden`)) {
    const route = {
      name: `${parent.name}-detail-hidden`,
      path: `${parent.path}/:slug`,
      component: () => import("../views/DetailView.vue"),
      props: true,
    };
    router.addRoute(route);
    console.warn("router: ", router.getRoutes());
  }
  return `${parent.path}/${props.content.slug}`;
}
</script>

<template>
  <!-- render element wanneer content beschikbaar is -->
  <div
    v-if="props.content"
    class="col-1-4 flex flex-column align-start border-info bg-white"
  >
    <h5 v-if="props.content.titel" v-text="props.content.titel" />
    <router-link :to="getRoute()">meer lezen</router-link>
  </div>

  <!-- indien geen content beschikbaar -->
  <div class="load-spinner" v-else />
</template>
