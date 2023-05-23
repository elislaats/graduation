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
    :class="props.info._name.toLowerCase().replaceAll(' ', '-')"
    v-if="props.info && props.data"
  >
    <template v-if="props.info._id == 54">
      <!--Tekst 2 koloms-->
      <div class="grid grid-pad p-5">
        <h2 v-if="props.data.titel" class="col-1-1">{{ props.data.titel }}</h2>
        <div class="col-4-12 push-1-12" v-html="props.data.tekstLinks"></div>
        <div class="col-4-12 push-1-12" v-html="props.data.tekstRechts"></div>
      </div>
    </template>
    <template v-if="props.info._id == 55">
      <!--Tekst en afbeelding-->
      <div
        class="text-and-image grid pr-0 mr-0 justify-space-between"
        :class="{
          'flex-row-reverse': props.data.weergaveTekst == 'right',
        }"
      >
        <div class="col-text col-7-12">
          <h2
            class="titel"
            v-if="props.data.titel"
            v-html="props.data.titel.replace('<p>', '').replace('</p>', '')"
          ></h2>
          <div
            class="col-8-12 push-4-12"
            v-if="props.data.tekst"
            v-html="props.data.tekst"
          ></div>
        </div>
        <div class="col-img col-4-12 flex">
          <ImageComp v-if="data.afbeelding" :id="data.afbeelding" className="image"></ImageComp>
        </div>
      </div>
    </template>
    <template v-if="props.info._id == 58">
      <!--Tekst blok-->
      <div
        class="grid grid-pad col-10-12 push-1-12"
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
  </section>
  <section class="contentblock text-danger" v-else>
    <p>no content available</p>
  </section>
</template>

<style lang="scss">
.text-and-image {
  .col-text{
    .titel {
      font-size: 6rem;
      margin-bottom: 5rem;
      strong{
        color: $primary-color
      }
    }
  }


  .col-img{
    position: relative;
    top: 0;
    bottom: 0;
    right: 0;
    padding:0;
    .image{
      display: flex;
      width: 100%;
    }
  }
}
</style>
