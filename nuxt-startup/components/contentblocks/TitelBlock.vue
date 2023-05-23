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
    v-if="info._id && info._name"
  >
    <div class="grid grid-pad">
      <div
        class="col-10-12"
        v-html="`<${data.titelOpmaak}>${data.titel}</${data.titelOpmaak}>`"
      ></div>
    </div>
  </section>
  <section class="contentblock text-danger" v-else>
    <p>no content available</p>
  </section>
</template>
