<script setup>
const props = defineProps({
  elements: {
    required: true,
    type: Array,
  },
});

const emit = defineEmits(["scrolledDown"]);

const werkgrid = ref();

onMounted(() => {
  window.addEventListener("scroll", () => {
    if (werkgrid.value) {
      if (werkgrid.value.getBoundingClientRect().bottom < window.innerHeight) {
        emit("scrolledDown");
      }
    }
  });
});
</script>
<template>
  <div class="grid" ref="werkgrid">
    <div v-for="el in elements">
      <NuxtLink :to="`/ons-werk/${el.content.slug}`">
        {{ el.content.titel }}
      </NuxtLink>
    </div>
  </div>
</template>
