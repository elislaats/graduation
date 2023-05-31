<script setup>
const props = defineProps({
  elements: {
    required: true,
    type: Array,
  },
  showButton: {
    required: false,
    type: Boolean,
  },
});
const emits = defineEmits(["updatePage"]);
</script>
<template>
  <div v-for="el in elements">
    <NuxtLink :to="`ons-werk/${el.content.slug}`">
      {{ el.content.titel }}
    </NuxtLink>
  </div>
  <button
    @click="emits('updatePage', 1)"
    v-if="showButton"
    class="btn btn-primary"
  >
    more cases
  </button>
</template>
