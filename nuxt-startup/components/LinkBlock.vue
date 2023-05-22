<script setup>
const props = defineProps({
  content: {
    type: Object,
    required: true,
  },
  parent: {
    type: String,
    required: true,
  },
  metaData: {
    type: Object,
    required: false,
  },
});

const loadedLogo = ref(null);

onMounted(async () => {
  if (props.parent == "ons-werk") {
    const id = props.content.transparantLogo400X400MargeAanZijden;
    await getImageSrc(id).then((src) => {
      loadedLogo.value = src;
    });
  }
});
</script>
<template>

  <template v-if="parent == 'ons-werk'">
    <div class="work flex col-1-3">
      <div class="work-inner flex bg-grey-dark">
        <NuxtLink
          class="work-link"
          :to="`/ons-werk/${content.slug}`"
        ></NuxtLink>
        <template v-if="loadedLogo">
          <figure class="work-logo">
            <img :src="loadedLogo" :alt="'logo van ' + content.titel" />
          </figure>
        </template>
      </div>
    </div>
  </template>
</template>

<style lang="scss" scoped>


.work {
  aspect-ratio: 1/1;
  .work-inner {
    width: 100%;
    height: 100%;
    margin: 1rem 1rem 1rem 1rem;
    position: relative;
    overflow: hidden;
    .work-link {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      z-index: 4;
      &:hover {
        background-color: rgba(0, 0, 0, 0.1);
      }
    }
    .work-logo {
      position: absolute;
      z-index: 2;
      width: 50%;
      height: 50%;
      left: 25%;
      top: 25%;
      img {
        width: 100%;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 0;
      }
    }
  }
}
</style>
