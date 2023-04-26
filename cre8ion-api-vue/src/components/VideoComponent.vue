<script setup>
import { defineProps, ref } from "vue";
import ImageComponent from "./ImageComponent.vue";

const props = defineProps({
  url: {
    type: String,
    required: true,
  },
  fallback: {
    type: Number,
    required: false,
  },
});

const vidError = ref(false);
const vidLoading = ref(true);
</script>

<template>
  <video
    id="videoEl"
    v-if="!vidError"
    @loadeddata="vidLoading = false"
    @load="vidLoading = true"
    :style="{ maxWidth: '100%' }"
    loop
    webkit-playsinline
    playsinline
    muted
    autoplay
    preload="auto"
    :class="{
      'load-spinner': vidLoading,
    }"
  >
    <source :src="props.url" @error="vidError = true" type="video/mp4" />
  </video>
  <template v-else>
    <ImageComponent
      v-if="props.fallback"
      :id="props.fallback"
      :altText="'video unavailable'"
    />
    <img
      v-else
      class="bg-grey-light"
      :style="{ width: '75px', padding: '15px' }"
      src="@/assets/fa-novideo.svg"
      alt="video unavailable"
    />
  </template>
</template>
