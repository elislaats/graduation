<script setup>
import { defineProps, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import ImageComponent from "@/components/ImageComponent.vue";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const content = ref(null);
const store = useStore();
const router = useRouter();

// TO DO: replace with API call to get certain databank element based on ID
async function getDetails(id) {
  const data = await store.getters.getDatabankById(
    getDbId(router.currentRoute.value.path)
  );
  data.forEach((item) => {
    if (item._id == id) {
      content.value = item.content;

      // Laat slug zien in url i.p.v. id
      // to do: dit oplossen op een manier dat geschiedenis beter behouden wordt
      router.replace(
        router.currentRoute.value.path.replace(id, content.value.slug)
      );
    }
  });
}

// temporary solution to get databank ID:
function getDbId(url) {
  if (url.includes("cases")) {
    return 6;
  } else if (url.includes("werk")) {
    return 5;
  } else if (url.includes("nieuws")) {
    return 7;
  } else if (url.includes("vacatures")) {
    return 1071;
  } else {
    return undefined;
  }
}

getDetails(props.id);
</script>

<template>
  <main class="grid align-start" v-if="content">
    <h1 class="col-1-1">{{ content.titel }}</h1>

    <template v-for="(value, key) in content" :key="index + key">
      <div class="col-1-1 afbeelding" v-if="(key.includes('afbeelding') || key.includes('Afbeelding') ) && value">
        <p>
          <strong>{{ key }}:</strong>
        </p>
        <ImageComponent
          :id="value.toString()"
        />
      </div>

      <p :class="['col-1-1', key]" v-else>
        <strong>{{ key }}:</strong>
        <span v-html="value" />
      </p>
    </template>
  </main>
  <main v-else>
    <p class="text-danger">inhoud niet gevonden</p>
  </main>
</template>

<style lang='scss' scoped>
.afbeelding{
  order: 10;
  img {
    width: 50%;
  }

}
</style>