<script setup>
import ContentBlock from "../components/ContentBlock.vue";
import LinkBlock from "./LinkBlock.vue";
import { defineProps, onBeforeUnmount, ref } from "vue";
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
    elements.value = data;
  } else {
    elements.value = check;
  }
}

getElements(props.id);

onBeforeUnmount(() => {
  store.dispatch('abortAxios', {actionName: "loadDatabank", id: props.id})
})
</script>

<template>
  <div v-if="elements" class="grid bg-info">
    <p class="col-1-1 text-grey-light">
      Databank opgehaald van <strong>/api/pages/{{ props.id }}</strong
      >:
    </p>
    <template v-for="(element, index) in elements">
      <component
        v-if="index < 100"
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
