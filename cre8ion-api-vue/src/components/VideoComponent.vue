<script setup>
import { defineProps, onBeforeMount, ref } from "vue";
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

const vid = ref({
  type: null,
  src: null,
  error: false,
  loading: true,
});

onBeforeMount(() => {
  if (props.url.includes("mp4")) {
    vid.value.type = "mp4";
    vid.value.src = props.url;
  } else if (props.url.includes("https://vimeo.com")) {
    vid.value.type = "iframe";
    const id = props.url.split('/')[props.url.split('/').length - 1]
    vid.value.src = `https://player.vimeo.com/video/${id}?rel=0`
  } else {
    vid.value.error = true;
  }
});
</script>

<template>
  <template v-if="!vid.error">
    <video
      id="videoEl"
      v-if="vid.type == 'mp4'"
      @loadeddata="vid.loading = false"
      @load="vid.loading = true"
      :style="{ maxWidth: '100%' }"
      loop
      webkit-playsinline
      playsinline
      muted
      autoplay
      preload="auto"
      :class="{
        'load-spinner': vid.loading,
      }"
    >
      <source :src="vid.src" @error="vid.error = true" type="video/mp4" />
    </video>
    <iframe
      v-else-if="vid.type == 'iframe'"
      width="100%"
      height="300"
      frameborder="0"
      allow="autoplay; encrypted-media"
      allowfullscreen
      :src="vid.src"
    ></iframe>
  </template>
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
