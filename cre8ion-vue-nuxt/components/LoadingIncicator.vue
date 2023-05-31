<template>
  <section
    v-if="fullscreen"
    class="loading-indicator-wrapper fullscreen"
    :class="color"
  >
    <div class="loading-indicator"></div>
  </section>
  <section class="loading-indicator-wrapper small" :class="color" v-else>
    <div class="loading-indicator"></div>
  </section>
</template>

<script setup>
const props = defineProps({
  color: {
    type: String,
    required: false,
  },
  fullscreen: {
    type: Boolean,
    required: false,
  },
});
</script>

<style lang="scss">
.loading-indicator-wrapper {
  &.fullscreen {
    background-color: $black;
    z-index: 99;
    height: 100vh;
    width: 100vw;
    padding: 0;
    margin: 0;
    position: fixed;
    top: 0;
    left: 0;
  }
  &.small {
    min-height: 10rem;
    min-width: 10rem;
    height: 100%;
    width: 100%;
  }
  display: flex;
  align-items: center;
  justify-content: center;
  .loading-indicator {
    width: 7rem;
    height: 7rem;
    border-radius: 100%;
    border: 1rem dotted $primary-color;
    animation: spinning 3s linear infinite;
  }
  &.white {
    div {
      border-color: $white;
    }
  }
}

@keyframes spinning {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
