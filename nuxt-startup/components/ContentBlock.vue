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
</script>

<template>
  <section
    ref="outerblock"
    class="contentblock"
    :class="props.info._name.toLowerCase()"
    v-if="props.info && props.data"
  >
    <template v-if="props.info._id == 60">
      <div class="inner grid grid-pad align-content-center ml-10">
        <div class="col-8-12">
          <h1 v-if="props.data.titel" v-html="props.data.titel" />
          <div v-if="props.data.tekst" v-html="props.data.tekst" />
        </div>
      </div>
    </template>

    <template v-else-if="props.info._id == 58">
      <div
        class="grid grid-pad"
        :class="{
          'flex-row-reverse': props.data.weergave == 'right',
        }"
      >
        <div
          class="bg-primary align-self-start text-black col-5-12 p-2"
          v-html="`<h2>${props.data.titel}</h2> ${props.data.inleiding}`"
        ></div>
        <div class="bg-grey-dark col-7-12 p-5" v-html="props.data.tekst"></div>
      </div>
    </template>

    <template v-else>
      <h3>
        Geen template bekend voor type <em> {{ props.info._name }}</em>
      </h3>
      <p>{{ props.data }}</p>
    </template>
  </section>
  <section class="contentblock text-danger" v-else>
    <p>no content available</p>
  </section>
</template>
