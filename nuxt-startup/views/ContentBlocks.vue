<template>
  <div v-for="block in contentBlocks">
    {{ block }}
  </div>
</template>

<script setup>
const props = defineProps({
  contentBlocks: {
    type: Array,
    required: true,
  },
});
</script>
