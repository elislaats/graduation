<template>
  <main v-if="page">
    <component
      v-for="(block, index) in page.contentBlocks"
      :is="getContentBlockById(block.info._id)"
      :key="'cb' + index"
      :info="block.info"
      :data="block.data"
    />
  </main>
</template>

<script setup>
const currentPath = useRoute().path;
const page = computed(() => {
  return useState(currentPath).value;
});
</script>
