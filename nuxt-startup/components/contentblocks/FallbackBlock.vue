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
  <section class="contentblock" v-if="props.info && props.data">
    <h4>
      Geen component gevonden voor
      <em class="text-primary">
        {{ props.info._id }}: {{ props.info._name }}</em
      >
    </h4>
    <p><strong class="text-primary"> Data: </strong>{{ props.data }}</p>
  </section>
  <section class="contentblock text-danger" v-else>
    <p>no content available</p>
  </section>
</template>
