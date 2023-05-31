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
const route = useRoute();

const page = computed(() => {
  return useNuxtData(route.path).data.value;
});
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
