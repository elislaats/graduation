<script setup>
const props = defineProps({
  elements: {
    required: true,
    type: Array,
  },
});

const emit = defineEmits(["scrolledDown"]);

const casesgrid = ref();

onMounted(() => {
  window.addEventListener("scroll", () => {
    if (casesgrid.value) {
      if (casesgrid.value.getBoundingClientRect().bottom < window.innerHeight) {
        emit("scrolledDown");
      }
    }
  });
});
</script>
<template>
  <div class="grid" ref="casesgrid">
    <h2 class="titel-label border-white">Cases</h2>
    <div class="grid no-p" v-if="elements">
      <TransitionGroup name="list" appear>
        <template v-for="element in elements" :key="'case' + element._id">
          <div class="case flex col-1-2">
            <div class="case-inner flex">
              <!--link-->
              <NuxtLink
                class="case-link"
                :to="`/cases/${element.content.slug}`"
              ></NuxtLink>

              <!--secondary link-->
              <NuxtLink
                class="link-secondary bg-black"
                :to="`/cases/${element.content.slug}`"
              >
                &#8594;
              </NuxtLink>

              <!--content-->
              <div class="case-content flex flex-column align-start p-6">
                <h4 class="bg-black p-1">{{ element.content.titel }}</h4>
                <h3>{{ element.content.subtitel }}</h3>
              </div>

              <template v-if="element.content.afbeelding1200X900">
                <ClientOnly>
                  <!--background-image-->
                  <ImageComp
                    :id="element.content.afbeelding1200X900"
                    :width="900"
                    :height="600"
                    :className="'bg-image case-bg'"
                  ></ImageComp>
                  <template #fallback>
                    <LoadingIncicator></LoadingIncicator>
                  </template>
                </ClientOnly>
              </template>
              <div v-else class="case-bg no-bg"></div>
            </div>
          </div>
        </template>
      </TransitionGroup>
    </div>
  </div>
</template>

<style lang="scss">
.case {
  aspect-ratio: 2/1;
  .case-inner {
    width: 100%;
    margin: 1rem 1rem 1rem 1rem;
    position: relative;
    overflow: hidden;
    &:hover {
      cursor: pointer;
      .case-bg {
        transform: scale(1.05);
      }
      .case-content {
        h3 {
          transform: translateY(0.5rem);
        }
      }
    }
    .case-link {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      z-index: 5;
    }
    .case-content {
      z-index: 4;
      padding: 3rem 3rem 7rem 3rem;
      h4 {
        padding: 1rem 1.5rem 0.8rem 1.5rem;
        font-size: 1.4rem;
        font-family: Inconsolata, monospace;
        margin-bottom: 3rem;
      }
      h3 {
        transition: transform 1s ease;
        width: 70%;
      }
    }
    .link-secondary {
      font-family: monospace;
      text-decoration: none;
      color: $white;
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
  .case-bg {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    opacity: 0.7;
    transition: transform 3s ease-out;
    &.no-bg {
      background-color: #ffffff50;
    }
  }
}
</style>
