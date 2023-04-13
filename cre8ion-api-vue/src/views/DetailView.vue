<script setup>
import { defineProps, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const props = defineProps({
  id: {
    type: String,
    required: false,
  },
});

const content = ref(null);
const store = useStore();
const router = useRouter();

// TO DO: replace with API call to get certain databank element based on ID
async function getDetails(id) {
  const data = await store.getters.getDatabankById(6);
  data.forEach((item) => {
    if (item._id == id) {
      content.value = item.content;
      router.replace(
        router.currentRoute.value.path.replace(id, content.value.slug)
      );
    }
  });
}

getDetails(props.id);
</script>

<template>
  <main class="grid align-start" v-if="content">
    <h1 class="col-1-1">{{ content.titel }}</h1>

    <p
      v-for="(value, key, index) in content"
      class="col-1-1"
      :key="index + key"
    >
      <strong>{{ key }}:</strong>
      <span v-html="value" />
    </p>
  </main>
  <main v-else class="text-danger">
    <p>geen content</p>
  </main>
</template>
