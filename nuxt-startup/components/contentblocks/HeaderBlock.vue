<script setup>
const props = defineProps({
  info: {
    type: Object,
    required: true,
  },
  data: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <section
    class="contentblock"
    :class="info._name.toLowerCase().replaceAll(' ', '-')"
    v-if="info && data"
  >
    <!--background video-->
    <div v-if="data.videoUrl" class="video-wrapper">
      <VideoComp
        :url="data.videoUrl"
        :fallback="data.afbeelding"
        :className="'header-bg'"
      >
      </VideoComp>
    </div>
    <div class="image-wrapper" v-else-if="data.afbeelding">
      <ClientOnly>
        <ImageComp :id="data.afbeelding" :className="'bg-image header-bg'">
        </ImageComp>
      </ClientOnly>
    </div>

    <!--content: -->
    <div class="header-inner grid no-p align-content-center">
      <div class="header-text col-8-12">
        <h1 v-if="data.titel" v-html="data.titel" />
        <div v-if="data.tekst" v-html="data.tekst" />

        <NuxtLink
          class="btn btn-primary outline header-button"
          v-if="data.knop1.link"
          :to="data.knop1.link"
          :target="data.knop1.target"
        >
          {{ data.knop1.name }}
        </NuxtLink>
      </div>
    </div>
    <NuxtLink
      class="btn btn-secondary header-button-secondary"
      v-if="data.knop2.link"
      :to="data.knop2.link"
      :target="data.knop2.target"
    >
      {{ data.knop2.name }}
    </NuxtLink>
  </section>
  <section class="contentblock text-danger" v-else>
    <p>no content available</p>
  </section>
</template>

<style lang="scss">
.contentblock.header {
  position: relative;
  min-height: 100vh;
  margin-bottom: 10rem;
  overflow-x: hidden;
  overflow-y: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  .header-button-secondary {
    position: absolute;
    bottom: 0;
    right: 0;
    z-index: 2;
  }

  .header-inner {
    width: 100%;
    position: relative;
    z-index: 3;
    padding: 20rem 0;
    .header-text {
      z-index: 4;
    }
    .header-button {
      margin: 2rem 0;
    }
  }
  .video-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    align-items: center;
    z-index: 1;
    .header-bg {
      box-sizing: border-box;
      height: 56.25vw;
      left: 50%;
      min-height: 100%;
      min-width: 100%;
      transform: translate(-50%, -50%) scale(1.2);
      position: absolute;
      top: 50%;
      width: 177.77777778vh;
    }
  }
}
</style>
