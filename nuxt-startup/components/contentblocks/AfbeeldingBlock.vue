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
    <div class="grid grid-pad">
      <div class="img-container col-1-1">
        <template v-if="data.link">
          <NuxtLink :to="data.link">
            <ClientOnly>
              <ImageComp
                v-if="data.afbeelding"
                :id="data.afbeelding"
                :className="'link-img'"
              ></ImageComp>
            </ClientOnly>
          </NuxtLink>
        </template>
        <template v-else>
          <ClientOnly>
            <ImageComp v-if="data.afbeelding" :id="data.afbeelding"></ImageComp>
          </ClientOnly>
        </template>
        <p v-if="data.ondertitel" v-html="data.ondertitel"></p>
      </div>
    </div>
  </section>
  <section class="contentblock text-danger" v-else>
    <p>no content available</p>
  </section>
</template>

<style lang="scss">
.contentblock.afbeelding {
  img {
    display: block;
    width: 100%;
    max-width: 100%;
    margin: 0;
    margin-bottom: 2rem;
  }
}
</style>
