<script setup>
const props = defineProps({
  elements: {
    required: true,
    type: Array,
  },
  titel: {
    required: false,
    type: String,
  },
});
</script>
<template>
  <div class="grid grid-pad vacature-overzicht">
    <div class="col-8-12 push-2-12">
      <h4 class="titel-label border-white col-1-5" v-if="titel">
        {{ titel }}
      </h4>

      <div
        class="vacature grid no-p"
        v-for="vacature in elements"
        :key="'vacature' + vacature._id"
      >
        <div class="vacature-inner col-1-1">
          <h2
            class="title"
            v-html="
              vacature.content.titel.replace('<p>', '').replace('</p>', '')
            "
          ></h2>
          <div class="inleiding col-10-12" v-html="vacature.content.inleiding">
          </div>

          <div class="button col-1-1 no-p">
            <NuxtLink
              class="btn btn-primary outline"
              :to="`/vacatures/${vacature.content.slug}`"
            >
              Bekijk vacature
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.vacature-overzicht {
  .vacature {
    &:first-of-type {
      border-top: 1px solid;
    }
    border-bottom: 1px solid;
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
      }
    }
  }
}
</style>
