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
  if (props.data.cases) {
    const idList = props.data.cases.split(",");
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
          <div class="case flex col-1-2">
            <div class="case-inner flex bg-grey-dark">
              <NuxtLink
                class="case-link"
                :to="`/cases/${element.content.slug}`"
              ></NuxtLink>
              <NuxtLink
                class="link-secondary bg-black"
                :to="`/cases/${element.content.slug}`"
              >
                &#8594;
              </NuxtLink>
              <div class="case-content flex flex-column align-start p-6">
                <h4 class="bg-black p-1">{{ element.content.titel }}</h4>
                <h3>{{ element.content.subtitel }}</h3>
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
    <div v-else>
      <h4>
        <em class="text-primary"> {{ info._id }}: {{ info._name }}</em>
        Bevat geen 'aanvullenMet'
      </h4>
      <p><strong class="text-primary"> Data: </strong>{{ data }}</p>
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
</style>
