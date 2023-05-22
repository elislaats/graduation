<script setup>
const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  width: {
    type: Number,
    default: 500,
    required: false,
  },
  height: {
    type: Number,
    default: 500,
    required: false,
  },
  altText: {
    type: String,
    required: false,
    default: "",
  },
  className: {
    type: String,
    required: false,
  },
});

const imgError = ref(false);

const {
  data: image,
  pending,
  apiError,
} = await useLazyFetch(
  `https://api-cre8ion.tc8l.dev/api/media/${props.id}?width=${props.width}&height=${props.height}`,
  {
    key: `image-${props.id}`,
    responseType: "blob",
  }
);

const imgSrc = computed(() => {
  try {
    console.log(image);
    return window.URL.createObjectURL(image.value);
  } catch (error) {
    imgError.value = true;
  }
});
</script>

<template>
  <template v-if="pending">
    <div :class="className">...</div>
  </template>
  <template v-else-if="apiError || imgError">
    <div :class="className" class="error">
      <img class="imgError" src="~/assets/images/fa-noimage.svg" alt="" />
    </div>
  </template>
  <template v-else>
    <img :class="className" :src="imgSrc" :alt="altText" />
  </template>
</template>

<style lang="scss" scoped>
.error {
  background-color: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  .imgError {
    max-width: 5rem;
    max-height: 5rem;
  }
}
</style>
