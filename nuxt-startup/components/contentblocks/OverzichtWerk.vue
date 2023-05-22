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

const stateData = useState(`databank-${databankId}`).value;
if (stateData) {
  allElements.value = stateData;
} else {
  const response = await useFetch(`/api/pages/${databankId}`, {
    method: "GET",
    baseURL: "https://api-cre8ion.tc8l.dev",
  });
  allElements.value = response.data.value;
  useState(`databank-${databankId}`, () => allElements.value);
}

const filteredElements = computed(() => {
  if (
    props.data.maximaalWeerTeGevenArtikelen != "" &&
    max.value != parseInt(props.data.maximaalWeerTeGevenArtikelen)
  ) {
    max.value = parseInt(props.data.maximaalWeerTeGevenArtikelen);
  }
  if (props.data.onsWerk) {
    const idList = props.data.onsWerk.split(",");
    let specElements = [];
    allElements.value.forEach((element) => {
      idList.forEach((id) => {
        if (element._id == id) {
          specElements.push(element);
        }
      });
    });
    allElements.value = specElements;
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
          <div class="work flex col-1-3">
            <div class="work-inner flex bg-grey-dark">
              <NuxtLink
                class="work-link"
                :to="`/ons-werk/${element.content.slug}`"
              ></NuxtLink>
              <ImageComp
                v-if="element.content.transparantLogo400X400MargeAanZijden"
                :id="element.content.transparantLogo400X400MargeAanZijden"
                :altText="`Logo van ${element.content.titel}`"
                :className="'work-logo'"
              ></ImageComp>
              <div v-else class="work-logo">
                <h5>{{ element.content.titel }}</h5>
              </div>
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

<style lang="scss" scoped>
h2.titel-label {
  font-size: small;
  margin: 1rem;
  margin-bottom: 2rem;
  padding: 1rem 2.5rem;
  font-family: Inconsolata, monospace;
}
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
