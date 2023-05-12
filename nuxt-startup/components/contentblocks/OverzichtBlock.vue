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
  <section class="contentblock" v-if="props.info._id && props.info._name">
    <div v-if="elements" class="grid no-p">
      <h3 class="col-1-1">
        {{ props.data.titel }}
      </h3>
      <LinkBlock
        v-for="element in elements"
        :metaData="element.metadata"
        :content="element.content"
      >
      </LinkBlock>
    </div>
    <div v-else>
      <h4>
        <em class="text-primary">
          {{ props.info._id }}: {{ props.info._name }}</em
        >
        Bevat geen 'aanvullenMet'
      </h4>
      <p><strong class="text-primary"> Data: </strong>{{ props.data }}</p>
    </div>
  </section>
  <section class="contentblock text-danger" v-else>
    <p>no content available</p>
  </section>
</template>
