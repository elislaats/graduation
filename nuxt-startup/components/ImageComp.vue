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
    default: "",
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
    return window.URL.createObjectURL(image.value);
  } catch (error) {
    imgError.value = true;
  }
});
</script>

<template>
  <template v-if="pending">
    <figure :class="className" class="img-loading"></figure>
  </template>
  <template v-else-if="apiError || imgError">
    <div :class="className" class="error">
      <img class="img-error" src="~/assets/images/fa-noimage.svg" alt="" />
    </div>
  </template>
  <template v-else>
    <figure
      v-if="className.includes('bg-image')"
      :class="className"
      :style="{ backgroundImage: `url(${imgSrc})` }"
    >
      <img :src="imgSrc" :alt="altText" />
    </figure>

    <figure v-else :class="className">
      <img :src="imgSrc" :alt="altText" />
    </figure>
  </template>
</template>

<style lang="scss">
.error {
  background-color: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  .img-error {
    max-width: 5rem;
    max-height: 5rem;
  }
}

.img-loading {
  width: 100%;
  height: 100%;
  background: linear-gradient(-35deg, #5e5e5e50, #d1d1d167, #66666650);
  background-size: 400% 400%;
  animation: gradient 4s ease infinite;
}

.bg-image {
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center !important;
  z-index: 1;
  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 0;
    object-position: center center;
  }
}

.logo {
  img {
    object-fit: contain;
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 0;
  }
}

figure {
  img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
