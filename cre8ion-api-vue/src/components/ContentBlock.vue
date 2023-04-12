<script setup>
import DataBank from "../components/DataBank.vue";
import { defineProps } from "vue";

const props = defineProps({
  content: {
    type: Object,
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
    <div
      v-for="(value, key, index) in props.content"
      :key="index + key"
      class="content-wrapper"
      :class="[{ empty: !value }, key]"
    >
      <!-- contentblock bevat een object van specs, loop over de specs -->
      <div
        v-if="key == '_block' && value"
        class="text-align-right"
        :class="[
          {
            'text-primary': props.color === 'primary',
            'text-info': props.color === 'false',
          },
          key + '-item',
        ]"
      >
        <p v-for="(item, key, index) in value" :key="key + index">
          <span class="key" v-text="key.replace('_', '') + ': '" />
          <span class="value" v-text="item" />
        </p>
      </div>

      <!-- Header element voor de titel, indien gevuld -->
      <h3 v-else-if="key === 'titel' && value" v-text="value" />

      <!-- Elementen uit databank inladen indien nodig -->
      <DataBank
        v-else-if="key === 'aanvullenMet' && value"
        :id="parseInt(props.content.aanvullenMet)"
      />

      <!-- Voor alle andere elementen die een waarde hebben, voeg toe -->
      <p v-else-if="value" :class="key + '-item'">
        <span
          class="key"
          :class="{
            'text-primary': props.color === 'primary',
            'text-info': props.color === 'info',
          }"
          v-text="key + ': '"
        />

        <!-- url invoegen als hyperlink -->
        <a v-if="key == 'url' || key == 'link'" :href="value" class="value" v-text="value"></a>

        <!-- inhoud als html -->
        <span class="value text-grey-dark" v-html="value" v-else />
      </p>

      <!-- lege keys toevoegen ter info -->
      <p v-else>
        <span class="key" v-text="key + ': '" />
        <span v-text="'leeg'" />
      </p>
    </div>
  </div>

  <!-- indien geen content beschikbaar -->
  <div class="col-1-1 border-danger bg-white grid-pad" v-else>
    <p class="text-danger">Loading...</p>
  </div>
</template>

<style lang="scss">
.content-wrapper {
  .key {
    font-weight: bold;
  }
  &._block {
    order: -5;
    ._block-item {
      font-style: italic;
    }
  }

  &.titel {
    order: -4;
  }

  &.empty {
    order: 5;
    p span {
      font-size: smaller;
    }
  }

  li {
    list-style-position: inside;
  }
}
</style>
