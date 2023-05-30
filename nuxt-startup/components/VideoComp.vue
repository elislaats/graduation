<script setup>
const props = defineProps({
  url: {
    type: String,
    required: true,
  },
  fallback: {
    type: Number,
    required: false,
  },
  className: {
    type: String,
    required: false,
    default: "",
  },
});

const error = ref(false);
const loading = ref(true);

const video = computed(() => {
  if (props.url.includes("mp4")) {
    return { type: "mp4", src: props.url };
  } else if (props.url.includes("https://vimeo.com")) {
    const id = props.url.split("/")[props.url.split("/").length - 1];
    return {
      type: "iframe",
      src: `https://player.vimeo.com/video/${id}?rel=0`,
    };
  } else {
    error.value = true;
    return false;
  }
});
</script>

<template>
  <div v-if="loading && !error" class="vid-loading" :class="className"></div>
  <template v-if="error">
    <!-- error herkend -->
    <ClientOnly>
      <ImageComp
        v-if="fallback"
        :id="fallback"
        :altText="'video unavailable'"
        :className="'bg-image ' + className"
      >
      </ImageComp>
      <img
        v-else
        class="bg-grey-light"
        :style="{ width: '75px', padding: '15px' }"
        src="~/assets/images/fa-noimage.svg"
        alt="video unavailable"
      />
    </ClientOnly>
  </template>

  <template v-else-if="video.type == 'mp4'">
    <!--type: mp4-->
    <video
      @loadeddata="loading = false"
      @load="loading = true"
      :class="className"
      loop
      webkit-playsinline
      playsinline
      muted
      autoplay
      preload="auto"
    >
      <source :src="video.src" @error="error = true" type="video/mp4" />
    </video>
  </template>
  <template v-else-if="video.type == 'iframe'">
    <!--type: iframe-->
    <iframe
      width="560"
      height="315"
      frameborder="0"
      allow="autoplay; encrypted-media"
      allowfullscreen
      :src="video.src"
    ></iframe>
  </template>

  <template v-else>
    <p>er ging iets onbekends mis</p>
  </template>
</template>

<style>
.vid-loading {
  width: 100%;
  height: 100%;
  background-image: linear-gradient(
    -45deg,
    #ffffff50,
    #ffffff30,
    #ffffff50,
    #ffffff30,
    #ffffff50
  );
  background-repeat: no-repeat;
  background-position: 100% 100%;
  background-size: 200% 200%;
  animation: loading 3s linear infinite;
}
</style>
