<script setup>
useHead({
  htmlAttrs: {
    lang: "NL",
  },
  link: [
    {
      rel: "icon",
      type: "image/png",
      href: "/icon.png",
    },
  ],
});
const { data: page } = useNuxtData(useRoute().path);

if (page.value.metaData) {
  useSeoMeta(() => page.value.metaData);
}
</script>

<template>
  <main>
    <template v-if="page">
      <component
        v-for="(block, index) in page.contentBlocks"
        :key="$route.name + '-cb-' + index"
        :is="getContentblock(block.info._id)"
        :info="block.info"
        :data="block.data"
      >
      </component>
    </template>
  </main>
</template>
