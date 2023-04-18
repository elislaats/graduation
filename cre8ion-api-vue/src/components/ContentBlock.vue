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
    v-if="props.content"
    class="bg-white grid-pad flex flex-column"
    :class="{
      'col-1-3': !props.content.aanvullenMet,
      'border-primary': props.color == 'primary',
      'border-info': props.color == 'info',
    }"
  >
    <!-- loop over all content-elements -->
    <template v-for="(value, key, index) in props.content" :key="index + key">
      <!-- contentblock bevat een object van specs, loop over de specs -->
      <div
        v-if="key == '_block' && value"
        class="text-align-right"
        :class="[
          {
            'text-primary': props.color === 'primary',
            'text-info': props.color === 'false',
          },
          key,
        ]"
      >
        <p v-for="(item, key, index) in value" :key="key + index">
          <span class="key" v-text="key.replace('_', '') + ': '" />
          <span class="value" v-text="item" />
        </p>
      </div>

      <!-- Header element voor de titel, indien gevuld -->
      <h3 :class="key" v-else-if="key === 'titel' && value" v-text="value" />

      <!-- Elementen uit databank inladen indien nodig -->
      <DataBank
        :class="key"
        v-else-if="key === 'aanvullenMet' && value"
        :id="parseInt(props.content.aanvullenMet)"
      />

      <!-- Image Component voor de afbeelding -->
      <div class="afbeelding" v-else-if="key === 'afbeelding' && value">
        <p
          class="key"
          :class="{
            'text-primary': props.color === 'primary',
            'text-info': props.color === 'info',
          }"
          v-text="key + ': '"
        />
        <ImageComponent :id="value.toString()" />
      </div>

      <!-- Voor alle andere elementen die een waarde hebben, voeg toe -->
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
          v-if="key == 'url' || key == 'link'"
          :href="value"
          class="value"
          v-text="value"
        ></a>

        <!-- inhoud als html -->
        <span class="value text-grey-dark" v-html="value" v-else />
      </p>

      <!-- lege keys toevoegen ter info -->
      <p class="empty" v-else>
        <span class="key" v-text="key + ': '" />
        <span v-text="'leeg'" />
      </p>
    </template>
  </div>

  <!-- indien geen content beschikbaar -->
  <div class="load-spinner" v-else />
</template>

<style lang="scss" scoped>
.key {
  font-weight: bold;
}
._block {
  order: -5;
  font-style: italic;
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
