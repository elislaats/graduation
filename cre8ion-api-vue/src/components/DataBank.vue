<script setup>
import ContentBlock from "../components/ContentBlock.vue";
import LinkBlock from "./LinkBlock.vue";
import { defineProps, onBeforeUnmount, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const props = defineProps({
  id: {
    type: Number,
    required: false,
  },
  content: {
    type: Object,
    required: false,
  },
});

const store = useStore();
const router = useRouter();

const elements = ref([]);
const databank = ref({
  path: router.currentRoute.value.path,
  id: null,
});
const idList = ref([]);

async function getElements(id) {
  const check = await store.getters.getDatabankById(id);
  let allElements;

  if (!check) {
    await store.dispatch("loadDatabank", id);
    const data = await store.getters.getDatabankById(id);
    allElements = data.reverse();
  } else {
    allElements = check;
  }

  if (idList.value.length > 0) {
    allElements.forEach((el) => {
      idList.value.forEach((id) => {
        if (id == el._id) {
          elements.value.push(el);
        }
      });
    });
    elements.value.reverse();
  } else {
    elements.value = allElements;
  }
}

onMounted(() => {
  if (props.id) {
    databank.value.id = props.id;
  } else if (props.content) {
    for (const key in props.content) {
      if (
        props.content._name
          .toLowerCase()
          .replace(" ", "")
          .includes(key.toLowerCase())
      ) {
        //find uppercase letters, split with dash and make lowercase to
        databank.value.path =
          "/" +
          key
            .split(/(?=[A-Z])/)
            .join("-")
            .toLowerCase();
        databank.value.id = store.getters.findDatabankIdFromText(key);
        props.content[key]
          .split(", ")
          .forEach((number) => idList.value.push(parseInt(number)));
      }
    }
  }
  if (databank.value.id) {
    getElements(databank.value.id);
  } else {
    console.warn("No data provided");
  }
});

onBeforeUnmount(() => {
  store.dispatch("abortAxios", {
    actionName: "loadDatabank",
    id: databank.value.id,
  });
});
</script>

<template>
  <div v-if="elements" class="grid bg-info" :key="databank.id">
    <p class="col-1-1 text-grey-light">
      Databank opgehaald van <strong>/api/pages/{{ databank.id }}</strong
      >:
    </p>
    <template v-for="(element, index) in elements">
      <component
        v-if="index < 20"
        :is="element.metadata ? LinkBlock : ContentBlock"
        :id="element._id"
        :key="'el' + index"
        :parent="databank"
        :content="element.content"
        :color="'info'"
        :meta="element.metadata"
      />
    </template>
  </div>
  <!-- indien geen content beschikbaar -->
  <div class="load-spinner" v-else />
</template>
