<script setup>
const props = defineProps({
  info: {
    type: Object,
    required: true,
  },
  data: {
    type: Object,
    required: true,
  },
});

const databankId = 7;

const page = ref({
  index: 0,
  amount: 1,
});
const allElements = ref();

getDatabank(databankId).then((elements) => {
  allElements.value = elements.toReversed();
});

const filteredElements = computed(() => {
  if (page.value.index * page.value.amount >= allElements.value.length) {
    page.value.index = 0;
  }
  const endValue = page.value.index * page.value.amount + page.value.amount;
  return allElements.value.slice(0, endValue);
});

onMounted(() => {
  window.onscroll = () => {
    let bottomOfWindow =
      Math.max(
        window.pageYOffset,
        document.documentElement.scrollTop,
        document.body.scrollTop
      ) +
        window.innerHeight ===
      document.documentElement.offsetHeight;
    if (
      bottomOfWindow &&
      page.value.index * page.value.amount < allElements.value.length
    ) {
      page.value.index++;
    }
  };
});
</script>

<template>
  <section
    class="contentblock"
    :class="info._name.toLowerCase().replaceAll(' ', '-')"
    v-if="info._id && info._name"
    @scroll="onScroll"
  >
    <div class="grid no-p mr-0 news-inner" v-if="allElements">
      <div class="news-date col-1-4">
        <span class="year">2022</span>
        <span class="month">12</span>
        <span class="day">02</span>
      </div>

      <div class="news-item-col col-2-3 push-1-3">
        <div class="news-item" v-for="element in filteredElements">
          <div class="news-image-wrapper">
            <NuxtLink :to="`/nieuws/${element.content.slug}`">
              <ImageComp
                v-if="element.content.afbeelding"
                :id="element.content.afbeelding"
                :class-name="'news-image'"
              >
              </ImageComp>
            </NuxtLink>
          </div>

          <h2
            v-if="element.content.titel"
            v-html="
              element.content.titel.replace('<p>', '').replace('</p>', '')
            "
          ></h2>
          <p
            v-if="element.content.inleiding"
            v-html="element.content.inleiding"
          ></p>
          <NuxtLink
            v-if="element.content.slug"
            :to="`/nieuws/${element.content.slug}`"
            class="btn btn-primary"
          >
            Lees Meer
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
  <section class="contentblock text-danger" v-else>
    <p>no content available</p>
  </section>
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
