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

const databankId = 5;

const page = ref(0);
const max = ref(6);
const allElements = ref();

if (props.data.onsWerk) {
  allElements.value = await getItemsFromDatabank(
    databankId,
    props.data.onsWerk
  );
} else {
  allElements.value = await getDatabank(databankId);
}

const filteredElements = computed(() => {
  if (
    props.data.maximaalWeerTeGevenArtikelen != "" &&
    max.value != parseInt(props.data.maximaalWeerTeGevenArtikelen)
  ) {
    max.value = parseInt(props.data.maximaalWeerTeGevenArtikelen);
  }
  return allElements.value.slice(0, max.value + max.value * page.value);
});
</script>

<template>
  <section
    class="contentblock"
    :class="info._name.toLowerCase().replaceAll(' ', '-')"
    v-if="info._id && info._name"
  >
    <div class="grid" v-if="allElements">
      <h2 class="titel-label border-white" v-if="data.titel">
        {{ data.titel }}
      </h2>

      <div class="grid no-p">
        <TransitionGroup name="list" appear>
          <template v-for="element in filteredElements" :key="element._id">
            <div class="work flex col-1-3">
              <div class="work-inner flex">
                <!--link:-->
                <NuxtLink
                  class="work-link"
                  :to="`/ons-werk/${element.content.slug}`"
                >
                  {{ element.content.titel }}
                </NuxtLink>

                <!--background:-->
                <ImageComp
                  v-if="
                    element.content.afbeelding700X700 &&
                    ($route.path == '/homepage' || !element.content.headerAfbeelding1920X800)
                  "
                  :id="element.content.afbeelding700X700"
                  :width="700"
                  :className="'bg-image work-bg'"
                ></ImageComp>

                <ImageComp
                  v-else-if="element.content.headerAfbeelding1920X800"
                  :id="element.content.headerAfbeelding1920X800"
                  :width="1920"
                  :className="'bg-image work-bg'"
                ></ImageComp>

                <div v-else class="work-bg no-bg">
                </div>

                <!--logo-->
                <ImageComp
                  v-if="element.content.transparantLogo400X400MargeAanZijden"
                  :id="element.content.transparantLogo400X400MargeAanZijden"
                  :altText="`Logo van ${element.content.titel}`"
                  :className="'logo work-logo'"
                ></ImageComp>
                <div v-else class="work-logo">
                  <h5>{{ element.content.titel }}</h5>
                </div>
              </div>
            </div>
          </template>
        </TransitionGroup>
        <button
          v-if="allElements.length > filteredElements.length"
          @click="page++"
          class="col-2-3 push-1-6 btn btn-secondary"
        >
          meer weergeven
        </button>
      </div>
    </div>
  </section>
  <section class="contentblock text-danger" v-else>
    <p>no content available</p>
  </section>
</template>

<style lang="scss">
.overview-filter {
  select {
    height: 4.5rem;
    padding: 0 2rem;
    border: 1px solid;
    color: #fff;
    letter-spacing: 0.1rem;
    background-color: #000;
    font-size: 1rem;
    margin-left: 3rem;
    border-radius: 0;
    box-shadow: none;
    background: 0 0;
    outline: 0;
  }
}
.btn {
  font-family: monospace;
}

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
      &.no-bg{
        background-color: #ffffff40;
      }
    }
  }
}
</style>
