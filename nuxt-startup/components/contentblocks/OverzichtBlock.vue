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

const databank = ref(null);
const parent = ref(useRoute().params.mainPath);
const elements = ref();

if (props.data.aanvullenMet) {
  databank.value = props.data.aanvullenMet;
  const stateData = useState(`databank-${databank.value}`).value;
  if (stateData) {
    elements.value = stateData;
  } else {
    const response = await useFetch(`/api/pages/${databank.value}`, {
      method: "GET",
      baseURL: "https://api-cre8ion.tc8l.dev",
    });
    elements.value = response.data.value;
    useState(`databank-${databank.value}`, () => elements.value);
  }
}

const page = ref(0);
const max = ref(6);

const filteredElements = computed(() => {
  if (props.data.maximaalWeerTeGevenArtikelen) {
    max.value = props.data.maximaalWeerTeGevenArtikelen;
  }
  return elements.value.slice(0, max.value + max.value * page.value);
});
</script>

<template>
  <section class="contentblock" v-if="info._id && info._name">
    <div class="grid" v-if="elements">
      <h2 class="titel-label border-white">
        {{ data.titel }}
      </h2>

      <form
        v-if="data.filterWeergeven"
        class="overview-filter col-1-1 flex flex-nowrap justify-end"
      >
        <select>
          <option value>FILTER</option>
        </select>
      </form>

      <div class="grid no-p">
        <LinkBlock
          v-for="element in filteredElements"
          :metaData="element.metadata"
          :content="element.content"
          :parent="parent"
        >
        </LinkBlock>
        <button
          v-if="elements.length > filteredElements.length"
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
</style>
