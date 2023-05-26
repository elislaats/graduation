<template>
  <main v-if="page.contentBlocks">
    <component
      v-for="(block, index) in page.contentBlocks"
      :is="getContentBlockById(block.info._id)"
      :key="'cb' + index"
      :info="block.info"
      :data="block.data"
    />
  </main>
  <LoadingComp v-else></LoadingComp>
</template>

<script setup>
const page = computed(() => {
  return useState(useRoute().path).value;
});
</script>
