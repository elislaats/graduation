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
    class="contentblock" :class="info._name.toLowerCase().replaceAll(' ', '-')"
    v-if="props.info && props.data"
  >
    <h2 class="col-1-1" v-if="props.data.titel">
      {{ props.data.titel }}
    </h2>
    <div class="col-1-1 border-white text-primary">
      video with url {{ props.data.linkUrl }}
    </div>
  </section>
  <section class="contentblock text-danger" v-else>
    <p>no content available</p>
  </section>
</template>
