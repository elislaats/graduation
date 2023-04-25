<script setup>
import DataBank from "../components/DataBank.vue";
import ImageComponent from "./ImageComponent.vue";
import { defineProps } from "vue";

const props = defineProps({
  content: {
    type: Object,
    value: null,
    required: true,
  },
  color: {
    type: String,
    required: false,
  },
});
</script>

<template>
  <!-- render element when content is provided -->
  <div
    class="bg-white grid-pad flex flex-column"
    :class="{
      'col-1-3': !props.content.aanvullenMet,
      'border-primary': props.color == 'primary',
      'border-info': props.color == 'info',
    }"
  >
    <!-- loop over all content-elements -->
    <template v-for="(value, key, index) in props.content" :key="index + key">
      <!-- Header element voor de titel, indien gevuld -->
      <h3 v-if="key === 'titel' && value" :class="key" v-text="value" />

      <!-- info-element voor de data die begint met '_' -->
      <p
        v-else-if="key.includes('_')"
        class="info text-align-right"
        :class="key"
      >
        <strong
          class="key"
          :class="{
            'text-primary': props.color === 'primary',
            'text-info': props.color === 'info',
          }"
          v-text="key + ': '"
        />
        {{ value }}
      </p>

      <div class="afbeelding" v-else-if="key === 'afbeelding' && value">
        <!-- laad image-component voor afbeelding(en)-->
        <p
          class="afbeelding key"
          :class="{
            'text-primary': props.color === 'primary',
            'text-info': props.color === 'info',
          }"
          v-text="key + ': '"
        />
        <ImageComponent :id="value.toString()" :width="300" />
      </div>

      <!-- Elementen uit databank inladen indien nodig -->
      <DataBank
        :class="key"
        v-else-if="key === 'aanvullenMet' && value"
        :id="parseInt(value)"
      />

      <!-- Voor alle andere elementen die een waarde hebben, voeg ze toe -->
      <p v-else-if="value" :class="key">
        <span
          class="key"
          :class="{
            'text-primary': props.color === 'primary',
            'text-info': props.color === 'info',
          }"
          v-text="key + ': '"
        />

        <!-- url invoegen als hyperlink -->
        <a
          v-if="key.toLowerCase().includes('url') || key.toLowerCase().includes('link')"
          :href="value"
          class="value"
          v-text="value"
        ></a>

        <!-- andere inhoud invoegen als html -->
        <span class="value text-grey-dark" v-html="value" v-else />
      </p>

      <p class="empty" v-else>
        <!-- aanwezige keys zonder value toevoegen ter info -->
        <span class="key" v-text="key + ': '" />
        <span v-text="'leeg'" />
      </p>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.key {
  font-weight: bold;
}
.info {
  order: -5;
  font-style: italic;
  align-items: end;
}

.titel {
  order: -4;
}
.afbeelding {
  order: 1;
  img {
    margin: 1%;
    max-width: 96%;
  }
}

.empty {
  order: 5;
  span {
    font-size: smaller;
  }
}

.aanvullenMet {
  order: 10;
}
</style>
