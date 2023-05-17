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
  const stateData = useState(`sitemap-${databank.value}`).value;
  if (stateData) {
    elements.value = stateData;
  } else {
    const response = await useFetch(`/api/pages/${databank.value}`, {
      method: "GET",
      baseURL: "https://api-cre8ion.tc8l.dev",
    });
    elements.value = response.data.value;
    useState(`sitemap-${databank.value}`, () => elements.value);
  }
}
</script>

<template>
  <section class="contentblock" v-if="info._id && info._name">
    <div class="grid" v-if="elements">
      <h2 class="titel-label border-white">
        {{ data.titel }}
      </h2>
      <div class="grid no-p">
        <LinkBlock
          v-for="element in elements"
          :metaData="element.metadata"
          :content="element.content"
          :parent="parent"
        >
        </LinkBlock>
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
</style>
