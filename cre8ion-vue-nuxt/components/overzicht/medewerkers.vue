<script setup>
const props = defineProps({
  elements: {
    required: true,
    type: Array,
  },
});
</script>
<template>
  <div class="flex flex-nowrap employee-wrapper">
    <div
      v-for="medewerker in elements"
      class="employee"
      :key="medewerker.content.afbeelding"
    >
      <ClientOnly>
        <ImageComp
          :key="medewerker.content.afbeelding"
          :id="medewerker.content.afbeelding"
          :className="'employee-image'"
          :width="700"
          :height="700"
        >
        </ImageComp>
      </ClientOnly>
      <div class="employee-info">
        <h5>{{ medewerker.content.titel }}</h5>
        <span class="text-primary"> {{ medewerker.content.functie }} </span>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.employee-wrapper {
  gap: 2rem;
  width: max-content;
  .employee {
    .employee-image {
      width: calc(100vw / 4);
      img {
        width: calc(100vw / 4);
      }
    }
  }
}
</style>
