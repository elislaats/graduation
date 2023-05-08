<script setup>
import ContentBlock from "../components/ContentBlock.vue";
import LinkBlock from "./LinkBlock.vue";
import { defineProps, onBeforeUnmount, onMounted, ref } from "vue";
import { useStore } from "vuex";

const props = defineProps({
  id: {
    type: Number,
    required: false,
  },
  content: {
    type: Object,
    required: false
  }
});

const store = useStore();

const elements = ref(null);

const databank = ref(null)

const idList = ref([]);

async function getElements(id) {
  databank.value = id;
  const check = await store.getters.getDatabankById(id);

  if (!check) {
    await store.dispatch("loadDatabank", id);
    const data = await store.getters.getDatabankById(id);
    elements.value = data;
  } else {
    elements.value = check;
  }
}

onMounted(() => {
  if (props.id) {
    getElements(props.id);
  } else if (props.content){
    for(const key in props.content){
      if(props.content._name.toLowerCase().replace(' ', '').includes(key.toLowerCase())){
        console.log('sending', key)
        const dbId = store.getters.findDatabankIdFromUrl(key);
        console.log('found', dbId)
        getElements(dbId);
        props.content[key].split(', ').forEach((number) => idList.value.push(parseInt(number)))
        console.log(idList.value)
      }
    }
  } else {
    console.warn('No data provided')
  }
});

onBeforeUnmount(() => {
  store.dispatch("abortAxios", { actionName: "loadDatabank", id: props.id });
});
</script>

<template>
  <div v-if="elements" class="grid bg-info">
    <p class="col-1-1 text-grey-light">
      Databank opgehaald van <strong>/api/pages/{{ databank }}</strong
      >:
    </p>
    <template v-for="(element, index) in elements">
      <component
        v-if="index < 20"
        :is="element.metadata ? LinkBlock : ContentBlock"
        :id="element._id"
        :key="'el' + index"
        :content="element.content"
        :color="'info'"
        :meta="element.metadata"
      />
    </template>
  </div>
  <!-- indien geen content beschikbaar -->
  <div class="load-spinner" v-else />
</template>
