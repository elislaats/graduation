<script setup>
const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  width: {
    type: Number,
    default: 400,
    required: false,
  },
  height: {
    type: Number,
    default: 300,
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
  error,
} = useLazyFetch(
  `media/${props.id}?width=${props.width}&height=${props.height}`,
  {
    immediate: false,
    key: `image-${props.id}`,
    baseURL: useRuntimeConfig().public.apiBase,
  }
)

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
    <div :class="className.replace('bg-image', '')" class="img-loading"></div>
  </template>
  <template v-else-if="error || imgError">
    <figure :class="className" class="error">
      <img class="img-error" src="~/assets/images/fa-noimage.svg" alt="" loading="lazy"/>
    </figure>
  </template>
  <template v-else>
    <figure
      v-if="className.includes('bg-image')"
      :class="className"
    >
      <img :src="imgSrc" :alt="altText" loading="lazy"/>
    </figure>

    <figure v-else :class="className">
      <img :src="imgSrc" :alt="altText" loading="lazy" />
    </figure>
  </template>
</template>

<style lang="scss">
.error {
  background-color: rgba(255, 255, 255, 0.2);
  .img-error {
    width: 50%;
    height: 50%;
    max-width: 7rem;
    max-height: 7rem;
    object-fit: contain;
    left: 50%;
    top: 50%;
    z-index: 0;
  }
}

.img-loading {
  width: 100%;
  height: 100%;
  background-image: linear-gradient(
    -45deg,
    #ffffff50,
    #ffffff30,
    #ffffff50,
    #ffffff30,
    #ffffff50
  );
  background-repeat: no-repeat;
  background-position: 100% 100%;
  background-size: 200% 200%;
  animation: loading 3s linear infinite;
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

@keyframes loading {
  0% {
    background-position: 100% 100%;
  }
  100% {
    background-position: 0 0;
  }
}
</style>
