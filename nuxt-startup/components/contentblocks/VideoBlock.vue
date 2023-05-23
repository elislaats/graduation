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
    <div class="grid grid-pad">
      <h2 class="col-1-1" v-if="data.titel">
        {{ props.data.titel }}
      </h2>
      <div class="video-wrapper col-1-1">
        <VideoComp :url="data.linkUrl"> </VideoComp>
      </div>
    </div>
  </section>
  <section class="contentblock text-danger" v-else>
    <p>no content available</p>
  </section>
</template>

<style lang="scss">
.video-wrapper {
  position: relative;
  padding-bottom: 56.25%;
  width: 100%;
  height: 0;
  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
