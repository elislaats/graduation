<script setup>
const props = defineProps(useDefaultProps());
</script>

<template>
  <section
    class="contentblock titel"
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