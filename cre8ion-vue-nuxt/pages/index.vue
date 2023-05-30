<script setup>
const { data: page } = useNuxtData(useRoute().path);

if (page.value.metaData) {
  useSeoMeta(() => page.value.metaData);
}
</script>

<template>
  <main>
    <template v-if="page">
      <ContentblockFallback
        v-for="block in page.contentBlocks"
        :info="block.info"
        :data="block.data"
      ></ContentblockFallback>
    </template>
  </main>
</template>
