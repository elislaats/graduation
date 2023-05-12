<script setup>
const props = defineProps({
  content: {
    type: Object,
    required: true,
  },
  metaData: {
    type: Object,
    required: false,
  },
});

function createLink(slug) {
  const parent = useRoute().fullPath;
  const path = `${parent}/${slug}`;
  return path;
}
</script>

<template>
  <div class="link-wrapper col-1-2 flex p-1">
    <NuxtLink class="link border-white" :to="createLink(props.content.slug)">
      {{ props.content.titel }}
    </NuxtLink>
  </div>
</template>

<style lang="scss" scoped>
.link-wrapper {
  aspect-ratio: 2/1;
  a {
    width: 100%;
    height: 100%;
  }
}
</style>
