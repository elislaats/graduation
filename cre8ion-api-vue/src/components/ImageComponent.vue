<script setup>
import { defineProps, onBeforeMount, ref } from "vue";
import axios from "axios";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  altText: {
    type: String,
    default: "cre8ion image",
  },
  width: {
    type: String,
    value: null
  },
  height: {
    type: String,
    value: null
  },
});

const imageSrc = ref(null);
const imageError = ref(false);

async function getImage() {
  await axios
    .get(`https://api-cre8ion.tc8l.dev/api/media/${props.id}`, {
      params: {
        width: props.width,
        height: props.height,
      },
      responseType: "blob",
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
      console.log(error);
    });
}

onBeforeMount(() => {
  getImage();
});
</script>

<template>
  <!-- render element wanneer content beschikbaar is -->
  <img v-if="imageSrc" :src="imageSrc" :alt="altText" />

  <!-- bij geen content beschikbaar, maar geen foutmelding -->
  <div
    v-else-if="!imageError"
    class="load-spinner"
    :style="{ width: width + 'px', height: height + 'px' }"
  />

  <!-- als er een foutmelding geweest is -->
  <img
    v-else
    class="image-unavailable"
    src="../assets/fa-noimage.svg"
    alt="afbeelding niet gevonden"
  />
</template>

<style lang="scss" scoped>
.image-unavailable {
  width: 75px;
  height: 75px;
  padding: 10px;
  background-color: #00000015;
}
</style>
