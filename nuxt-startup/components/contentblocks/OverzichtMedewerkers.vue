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

const databankId = 1071;
const allElements = ref();

const page = ref({
  index: 0,
  amount: 4,
});

allElements.value = await getDatabank(databankId);

const filteredElements = computed(() => {
  if (page.value.index * page.value.amount >= allElements.value.length) {
    page.value.index = 0;
  }
  const startValue = page.value.index * page.value.amount;
  const endValue = page.value.index * page.value.amount + page.value.amount;

  return allElements.value.slice(startValue, endValue);
});
</script>

<template>
  <section class="contentblock" v-if="info._id && info._name">
    <div class="grid" v-if="allElements">
      <h2 v-if="data.titel">
        {{ data.titel }}
      </h2>

      <div class="grid">
        <div
          v-for="element in filteredElements"
          class="col-1-4 employee"
          :key="element.content.afbeelding"
        >
          <ImageComp
            :key="element.content.afbeelding"
            :id="element.content.afbeelding"
            :className="'employee-image'"
          >
          </ImageComp>
          <div class="employee-info">
            <h5>{{ element.content.titel }}</h5>
            <span class="text-primary"> {{ element.content.functie }} </span>
          </div>
        </div>
      </div>
      <button class="btn btn-primary push-1-1 align-self-end employee-more" @click="page.index++">
        +
     </button>
    </div>
  </section>
  <section class="contentblock text-danger" v-else>
    <p>no content available</p>
  </section>
</template>

<style lang="scss" scoped>
.employee {
  .employee-info {
    h5 {
      margin: 0;
    }
  }
  .employee-image {
    width: 100%;
  }
}
</style>
