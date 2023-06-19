<script setup>
const props = defineProps(useDefaultProps());
</script>

<template>
  <section
    class="contentblock tekst"
    v-if="info._id && info._name"
    :class="{
      'margin-none': data.marginBottom == 'margin-none',
      'margin-small': data.marginBottom == 'margin-small',
    }"
  >
    <template v-if="info._id == 33">
      <!--Tekst 1 koloms-->
      <div class="grid grid-pad">
        <h2 v-if="data.titel" class="col-1-1">{{ data.titel }}</h2>
        <div
          v-if="data.tekst"
          class="col-7-12 push-2-12"
          v-html="data.tekst"
        ></div>
      </div>
    </template>

    <template v-if="info._id == 54">
      <!--Tekst 2 koloms-->
      <div class="grid grid-pad">
        <h2 v-if="data.titel" class="col-1-1">{{ data.titel }}</h2>
        <div class="col-4-12 push-1-12" v-html="data.tekstLinks"></div>
        <div class="col-4-12 push-1-12" v-html="data.tekstRechts"></div>
      </div>
    </template>

    <template v-if="info._id == 58">
      <!--Tekst blok-->
      <div
        class="grid grid-pad col-10-12 push-1-12"
        :class="{
          'flex-row-reverse': data.weergave == 'right',
        }"
      >
        <div
          class="bg-primary align-self-start text-black col-5-12 p-2"
          v-html="`<h2>${data.titel}</h2> ${data.inleiding}`"
        ></div>
        <div class="bg-grey-dark col-7-12 p-5" v-html="data.tekst"></div>
      </div>
    </template>
  </section>
  <section class="contentblock text-danger" v-else>
    <p>no content available</p>
  </section>
</template>

<style lang="scss">
.contentblock {
  &.tekst {
    margin-top: 0;
    &.margin-none {
      margin-bottom: 0;
    }
    &.margin-small {
      margin-bottom: 5rem;
    }
  }
}
</style>
