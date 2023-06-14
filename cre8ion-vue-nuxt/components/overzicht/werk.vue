<script setup>
const props = defineProps({
  elements: {
    required: true,
    type: Array,
  },
});

const emit = defineEmits(["scrolledDown"]);

const workgrid = ref();

onMounted(() => {
  window.addEventListener("scroll", () => {
    if (workgrid.value) {
      if (workgrid.value.getBoundingClientRect().bottom < window.innerHeight) {
        emit("scrolledDown");
      }
    }
  });
});
</script>
<template>
  <div class="grid" ref="workgrid">
    <div class="grid no-p">
      <TransitionGroup name="list" appear>
        <template v-for="element in elements" :key="'werk' + element._id">
          <div class="work flex col-1-3">
            <div class="work-inner flex">
              <!--link:-->
              <NuxtLink
                class="work-link"
                :to="`/ons-werk/${element.content.slug}`"
              >
                {{ element.content.titel }}
              </NuxtLink>

              <ClientOnly>
                <!--background:-->
                <ImageComp
                  v-if="
                    element.content.afbeelding700X700 &&
                    ($route.path == '/homepage' ||
                      !element.content.headerAfbeelding1920X800)
                  "
                  :id="element.content.afbeelding700X700"
                  :width="700"
                  :height="700"
                  :className="'bg-image work-bg'"
                ></ImageComp>
                <ImageComp
                  v-else-if="element.content.headerAfbeelding1920X800"
                  :id="element.content.headerAfbeelding1920X800"
                  :width="1920"
                  :height="800"
                  :className="'bg-image work-bg'"
                ></ImageComp>
                <div v-else class="work-bg no-bg"></div>

                <!--logo-->
                <ImageComp
                  v-if="element.content.transparantLogo400X400MargeAanZijden"
                  :id="element.content.transparantLogo400X400MargeAanZijden"
                  :altText="`Logo van ${element.content.titel}`"
                  :className="'logo work-logo'"
                  :width="400"
                  :height="400"
                ></ImageComp>
                <div v-else class="work-logo">
                  <h5>{{ element.content.titel }}</h5>
                </div>
                <template #fallback>
                  <LoadingIncicator></LoadingIncicator>
                </template>
              </ClientOnly>
            </div>
          </div>
        </template>
      </TransitionGroup>
    </div>

  </div>
</template>

<style lang="scss">
.work {
  aspect-ratio: 1/1;
  .work-inner {
    width: 100%;
    height: 100%;
    margin: 1rem 1rem 1rem 1rem;
    position: relative;
    overflow: hidden;
    &:hover {
      .work-bg {
        transform: scale(1.05);
      }
    }
    .work-link {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      z-index: 4;
      overflow: hidden;
      text-indent: -9999999px;
      opacity: 0;
    }
    .work-logo {
      position: absolute;
      z-index: 2;
      width: 50%;
      height: 50%;
      left: 25%;
      top: 25%;
    }
    .work-bg {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      opacity: 0.7;
      z-index: 1;
      transition: transform 3s ease-out;
      &.no-bg {
        background-color: #ffffff40;
      }
    }
  }
}
</style>