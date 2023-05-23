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
    class="contentblock"
    :class="info._name.toLowerCase().replaceAll(' ', '-')"
    v-if="info && data"
  >
    <div class="inner grid no-p align-content-center">
      <div class="header-text col-8-12">
        <h1 v-if="data.titel" v-html="data.titel" />
        <div v-if="data.tekst" v-html="data.tekst" />
      </div>
    </div>
    <!--background-image-->
    <ImageComp
      v-if="data.afbeelding"
      :id="data.afbeelding"
      :width="1200"
      :className="'bg-image header-bg'"
    ></ImageComp>
  </section>
  <section class="contentblock text-danger" v-else>
    <p>no content available</p>
  </section>
</template>

<style lang="scss">
.header{
  .header-text{
    z-index: 4;
  }
  .header-bg{
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
  }
}
</style>