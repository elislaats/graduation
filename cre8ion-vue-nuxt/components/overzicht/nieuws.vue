<script setup>
const props = defineProps({
  elements: {
    required: true,
    type: Array,
  },
});

const newsgrid = ref();

const emit = defineEmits(["scrolledDown"]);

onMounted(() => {
  window.addEventListener("scroll", () => {
    if (newsgrid.value) {
      if (newsgrid.value.getBoundingClientRect().bottom < window.innerHeight) {
        emit("scrolledDown");
      }
    }
  });
});
</script>

<template>
  <div class="grid no-p mr-0 news-inner" ref="newsgrid">
    <div class="news-date col-1-4">
      <span class="year">2022</span>
      <span class="month">12</span>
      <span class="day">02</span>
    </div>

    <div class="news-item-col col-2-3 push-1-3">
      <TransitionGroup name="list">
        <div
          class="news-item"
          v-for="element in elements"
          :key="'nieuws' + element._id"
        >
          <div class="news-image-wrapper">
            <NuxtLink :to="`/nieuws/${element.content.slug}`">
              <ClientOnly>
                <ImageComp
                  v-if="element.content.afbeelding"
                  :id="element.content.afbeelding"
                  :width="1000"
                  :height="600"
                  className="news-image"
                >
                </ImageComp>
              </ClientOnly>
            </NuxtLink>
          </div>

          <h2
            v-if="element.content.titel"
            v-html="
              element.content.titel.replace('<p>', '').replace('</p>', '')
            "
          ></h2>
          <div
            v-if="element.content.inleiding"
            v-html="element.content.inleiding"
          ></div>
          <NuxtLink
            v-if="element.content.slug"
            :to="`/nieuws/${element.content.slug}`"
            class="btn btn-primary"
          >
            Lees Meer
          </NuxtLink>
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<style lang="scss">
.news-inner {
  .news-date {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    position: fixed;
    left: 0;
    top: 15rem;
    span {
      font-weight: 600;
      font-family: $font-source-sans-pro;
      line-height: 0.8;
    }
    .year {
      font-size: 10vw;
    }
    .month {
      font-size: 5vw;
    }
    .day {
      font-size: 2vw;
    }
  }
}

.news-item-col {
  .news-item {
    min-height: 80vh;
    margin-bottom: 5rem;
    h2,
    p {
      margin: 1.5rem 0;
    }
    .news-image-wrapper {
      width: 100%;
      aspect-ratio: 16/9;
      .news-image {
        width: 100%;
      }
    }
  }
}
</style>
