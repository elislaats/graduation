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
  let key = route.path
  if (key.endsWith('/') && key.length > 1){
    key = key.replace(/.$/,"")
  }
  return useNuxtData(key).data.value;
});

watch(page, () => {
  window.scrollTo(0, 0);
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
