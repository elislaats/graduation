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

const databankId = 6;

const page = ref(0);
const max = ref(6);
const allElements = ref();

if (props.data.cases) {
  allElements.value = await getItemsFromDatabank(databankId, props.data.cases);
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
  <section class="contentblock" v-if="info._id && info._name">
    <div class="grid" v-if="allElements">
      <h2 class="titel-label border-white" v-if="data.titel">
        {{ data.titel }}
      </h2>

      <div class="grid no-p">
        <template v-for="element in filteredElements">
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

              <!--background-image-->
              <ImageComp
                v-if="element.content.afbeelding1200X900"
                :id="element.content.afbeelding1200X900"
                :width="1200"
                :className="'bg-image case-bg'"
              ></ImageComp>
            </div>
          </div>
        </template>

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
.case {
  aspect-ratio: 2/1;
  .case-inner {
    width: 100%;
    margin: 1rem 1rem 1rem 1rem;
    position: relative;
    overflow: hidden;
    &:hover {
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
      z-index: 4;
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
    opacity: .7;
    transition: transform 3s ease-out;
  }
}
</style>
