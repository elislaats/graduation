<script setup>
import { defineProps, onBeforeMount, onBeforeUnmount, ref } from "vue";
import axios from "axios";

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  altText: {
    type: String,
    default: "cre8ion image",
  },
  width: Number,
  height: Number,
});

const imageSrc = ref(null);
const imageError = ref(false);

const imageControllers = ref({});

async function getImage() {
  imageControllers.value[props.id] = new AbortController();
  await axios
    .get(`https://api-cre8ion.tc8l.dev/api/media/${props.id}`, {
      params: {
        width: props.width,
        height: props.height,
      },
      responseType: "blob",
      signal: imageControllers.value[props.id].signal,
    })
    .then((response) => {
      const imageUrl = window.URL.createObjectURL(response.data);
      const image = new Image();
      image.src = imageUrl;

      image.onload = function () {
        imageSrc.value = imageUrl;
      };
      image.onabort = function () {
        imageError.value = true;
      };
    })
    .catch(function (error) {
      imageError.value = true;
      console.warn(
        `ImageComponent.getImage() did not succeed. Reason: ${error.message}`
      );
    });
}

onBeforeMount(() => {
  getImage();
});

onBeforeUnmount(() => {
  imageControllers.value[props.id].abort();
});
</script>

<template>
  <!-- render element wanneer content beschikbaar is -->
  <img
    class="image-available"
    v-if="imageSrc"
    :src="imageSrc"
    :alt="props.altText"
    :style="{ width: props.width + 'px', height: props.height + 'px' }"
  />

  <!-- bij geen content beschikbaar, maar geen foutmelding -->
  <div v-else-if="!imageError" class="load-spinner" />

  <!-- als er een foutmelding geweest is -->
  <img
    v-else
    class="image-unavailable"
    src="../assets/fa-noimage.svg"
    alt="afbeelding niet gevonden"
  />
</template>

<style lang="scss" scoped>
.image-available {
  max-width: 100%;
}
.image-unavailable {
  width: 75px;
  height: 75px;
  padding: 10px;
  background-color: #00000015;
}
</style>
