<script setup>
import ContentBlock from "../components/ContentBlock.vue";
import LinkBlock from "./LinkBlock.vue"
import { defineProps, ref } from "vue";
import { useStore } from "vuex";

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
});

const store = useStore();

const elements = ref(null);

async function getElements(id) {
  const check = await store.getters.getDatabankById(id);

  if (!check) {
    await store.dispatch("loadDatabank", props.id);
    const data = await store.getters.getDatabankById(id);
    console.log("databank from api id:" + id);
    elements.value = data;
  } else {
    console.log("databank from store id:" + id);
    elements.value = check;
  }
}

getElements(props.id);

function getComponentType(content){
  if(content.slug) {
    return LinkBlock
  } else {
    return ContentBlock
  }
}
</script>

<template>
  <div v-if="elements" class="grid bg-info">
    <p class="col-1-1 text-grey-light">
      Databank opgehaald van <strong>/api/pages/{{ props.id }}</strong
      >:
    </p>
    <component
      v-for="(element, index) in elements"
      :is="getComponentType(element.content)"
      :id="element._id"
      :key="'el' + index"
      :content="element.content"
      :color="'info'"
    />
  </div>
  <div class="text-danger col-1-1" v-else>
    <p>loading...</p>
  </div>
</template>
