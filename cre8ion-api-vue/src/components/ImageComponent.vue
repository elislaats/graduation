<script setup>
import { defineProps, onBeforeMount, onBeforeUnmount, ref } from "vue";
import axios from "axios";
import router from "@/router";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  altText: {
    type: String,
    default: "cre8ion image",
  },
  width: String,
  height: String,
});

const imageSrc = ref(null);
const imageError = ref(false);

const imageController = new AbortController();

async function getImage() {
  await axios
    .get(`https://api-cre8ion.tc8l.dev/api/media/${props.id}`, {
      params: {
        width: props.width,
        height: props.height,
      },
      responseType: "blob",
      signal: imageController.signal,
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
      if (axios.isCancel(error)) {
        console.warn("Image request canceled at ", router.currentRoute.value.path);
      } else {
        console.warn("Something went wrong:", error.message);
      }
    });
}

onBeforeMount(() => {
  getImage();
});

onBeforeUnmount(() => {
  imageController.abort()
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
