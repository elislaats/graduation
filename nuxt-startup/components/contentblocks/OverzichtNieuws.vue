<script setup>
const props = defineProps({
  info: {
    type: Object,
    required: true,
  },
  data: {
    type: Object,
    required: true,
  },
});

const databankId = 7;

const page = ref({
  index: 0,
  amount: 8,
});
const allElements = ref();

await getDatabank(databankId).then((elements) => {
  const orderedElements = elements.toReversed();
  let elementsNotEmpty = [];

  orderedElements.forEach((element) => {
    if (
      element.content.titel ||
      element.content.inleiding ||
      element.content.afbeelding
    ) {
      elementsNotEmpty.push(element);
    }
  });

  allElements.value = elementsNotEmpty;
});

const filteredElements = computed(() => {
  if (page.value.index * page.value.amount >= allElements.value.length) {
    page.value.index = 0;
  }
  const endValue = page.value.index * page.value.amount + page.value.amount;
  return allElements.value.slice(0, endValue);
});
</script>

<template>
  <section class="contentblock" :class="info._name.toLowerCase().replaceAll(' ', '-')" v-if="info._id && info._name">
    <div class="grid" v-if="allElements">
      <template v-for="element in filteredElements">
        <div class="col-1-1 pt-2 pb-3 m-1 news-item">
            {{ element.content }}
        </div>
      </template>
      <button
        v-if="allElements.length > filteredElements.length"
        @click="page.index++"
        class="col-2-3 push-1-6 btn btn-secondary"
      >
        meer weergeven
      </button>
    </div>
  </section>
  <section class="contentblock text-danger" v-else>
    <p>no content available</p>
  </section>
</template>

<style lang="scss" scoped>
.btn {
  font-family: monospace;
}

.news-item{
    background-color: rgba(255,255,255,.1);
}
</style>
