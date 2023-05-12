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
    :class="props.info._name.toLowerCase()"
    v-if="props.info && props.data"
  >
    <div class="inner grid grid-pad align-content-center ml-10">
      <div class="col-8-12">
        <h1 v-if="props.data.titel" v-html="props.data.titel" />
        <div v-if="props.data.tekst" v-html="props.data.tekst" />
      </div>
    </div>
  </section>
  <section class="contentblock text-danger" v-else>
    <p>no content available</p>
  </section>
</template>
