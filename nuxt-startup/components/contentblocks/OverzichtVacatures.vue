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

const databankId = 44;
const vacatures = ref();

vacatures.value = await getDatabank(databankId);
</script>

<template>
  <section
    class="contentblock"
    :class="info._name.toLowerCase().replaceAll(' ', '-')"
    v-if="info._id && info._name"
  >
    <div class="grid grid-pad" v-if="vacatures">
      <div class="col-8-12 push-2-12">
        <h4 class="titel-label border-white col-1-5" v-if="data.label">
          {{ data.label }}
        </h4>

        <div
          class="vacature grid no-p"
          v-for="vacature in vacatures"
          :key="vacature._id"
        >
          <div class="vacature-inner col-1-1">
            <h2
              class="title"
              v-html="
                vacature.content.titel.replace('<p>', '').replace('</p>', '')
              "
            ></h2>
            <div class="inleiding col-10-12">
              <p v-html="vacature.content.inleiding"></p>
            </div>

            <div class="button col-1-1 no-p">
              <NuxtLink class="btn" :to="`/vacatures/${vacature.content.slug}`">
                Bekijk vacature
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="contentblock text-danger" v-else>
    <p>no content available</p>
  </section>
</template>

<style lang="scss">
.vacature {
  border-top: 1px solid;
  .vacature-inner {
    padding: 5rem 0;
    position: relative;
    .title {
      strong {
        color: $primary-color;
      }
    }
    .inleiding {
      padding: 2rem 0;
    }
    .button {
      height: fit-content;
      a {
        text-decoration: none;
        min-height: 4.3rem;
        color: #fff;
        border: 0.1rem solid #fff;
        background-color: transparent;
        padding: 1rem 2.5rem;
        &:hover {
          background-color: white;
          color: black;
        }
      }
    }
  }
}
</style>
