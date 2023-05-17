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
</script>
right
<template>
  <template v-if="parent == 'cases'">
    <div class="case flex col-1-2">
      <div class="case-inner flex bg-grey-dark">
        <NuxtLink class="case-link" :to="`/cases/${content.slug}`"></NuxtLink>
        <NuxtLink
          class="link-secondary bg-black"
          :to="`/cases/${content.slug}`"
        >
          &#8594;
        </NuxtLink>
        <div class="case-content flex flex-column align-start p-6">
          <h4 class="bg-black p-1">{{ content.titel }}</h4>
          <h3>{{ content.subtitel }}</h3>
        </div>
      </div>
    </div>
  </template>
  <template v-if="parent == 'ons-werk'">
    <div class="work flex col-1-3">
      <div class="work-inner flex bg-grey-dark">
        <NuxtLink
          class="work-link"
          :to="`/ons-werk/${content.slug}`"
        ></NuxtLink>
        <figure class="work-logo border-white">
          <img :alt="'logo van ' + content.titel" />
        </figure>
      </div>
    </div>
  </template>
</template>

<style lang="scss" scoped>
.case {
  aspect-ratio: 2/1;
  .case-inner {
    width: 100%;
    margin: 1rem 1rem 1rem 1rem;
    position: relative;
    overflow: hidden;
    .case-link {
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
    .case-content {
      padding: 3rem 3rem 7rem 3rem;
      h4 {
        padding: 1rem 1.5rem 0.8rem 1.5rem;
        font-size: 1.4rem;
        font-family: Inconsolata, monospace;
        margin-bottom: 3rem;
      }
      h3 {
        width: 70%;
      }
    }
    .link-secondary {
      font-family: monospace;
      text-decoration: none;
      font-size: 3rem;
      padding: 1rem 2rem;
      position: absolute;
      right: 0;
      bottom: 0;
      margin: 0;
      z-index: 4;
      pointer-events: none;
    }
  }
}

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
        object-fit: cover;
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 0;
      }
    }
  }
}
</style>
