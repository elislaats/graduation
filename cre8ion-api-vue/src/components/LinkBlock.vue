<script setup>
import { defineProps } from "vue";

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  content: {
    type: Object,
    required: true,
  },
  parent: {
    type: Object,
    required: false
  },
  meta: {
    type: Object,
    required: false,
  },
});
</script>

<template>
  <!-- render element wanneer content beschikbaar is -->
  <div
    v-if="props.content"
    class="col-1-3 flex flex-column align-start border-info bg-white"
  >
    <h5 v-if="props.content.titel" v-text="props.content.titel" />
    <router-link :to="`${props.parent.path}/${content.slug}`"
      >meer lezen</router-link
    >
  </div>

  <!-- indien geen content beschikbaar -->
  <div class="load-spinner" v-else />
</template>
