<script setup>
import { defineProps, onMounted, ref } from "vue";
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
  width: String,
  height: String,
});

const imageSrc = ref(null);
const imageError = ref(false);

async function getImage() {
    await axios
      .get(`https://api-cre8ion.tc8l.dev/api/media/${props.id}`, {
        params: { width: props.width, height: props.heigth },
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
      })
}

onMounted(() => {
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
  <div
    v-else
    class="image-unavailable"
    :style="{ width: width + 'px', height: height + 'px' }"
  />
</template>

<style lang="scss" scoped>
.load-spinner {
  background-color: #ffffff75;
  aspect-ratio: 1 / 1;
  min-width: 25px;
  min-height: 25px;
}
.image-unavailable {
  aspect-ratio: 1 / 1;
  min-width: 25px;
  min-height: 25px;
  background-color: #ffffff75;
  background-image: url("../assets/fa-noimage.svg");
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
