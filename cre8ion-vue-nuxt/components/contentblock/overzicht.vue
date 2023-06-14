<script setup>
const props = defineProps(useDefaultProps());

const databankName = props.info._name
  .replace(" overzicht", "")
  .replace(" ", "-")
  .toLowerCase();
const databankId = getDbId();

const { data: allElements, pending } = useLazyAsyncData(
  `databank-${databankId}`,
  () => getFullDatabank(databankId)
);

const page = ref({
  index: 0,
  amount: 6,
});

if (props.data.maximaalWeerTeGevenArtikelen) {
  page.value.amount = parseInt(props.data.maximaalWeerTeGevenArtikelen);
}

function getDbId() {
  if (props.data.aanvullenMet) {
    return parseInt(props.data.aanvullenMet);
  } else {
    return getDatabankIdFromName(databankName);
  }
}

const filteredElements = computed(() => {
  if (props.data[databankName]) {
    const setItems = props.data[databankName].split(", ");
    let foundItems = [];
    allElements.value.forEach((element) => {
      setItems.forEach((id) => {
        if (element._id == id) {
          foundItems.push(element);
        }
      });
    });
    return foundItems;
  } else {
    const endValue = page.value.index * page.value.amount + page.value.amount;
    return allElements.value.slice(0, endValue);
  }
});

function handleScroll() {
  if (filteredElements.value.length < allElements.value.length) {
    page.value.index++;
  }
}
</script>
<template>
  <section
    class="contentblock overzicht"
    :class="databankName"
    v-if="info && data"
  >
    <LoadingIncicator v-if="pending" color="white"></LoadingIncicator>
    <template v-else>
      <template v-if="databankId == 6">
        <OverzichtCases
          @scrolled-down="handleScroll()"
          :elements="filteredElements"
        ></OverzichtCases>
      </template>
      <template v-if="databankId == 5">
        <OverzichtWerk
          @update-page="(i) => (page.index += i)"
          :elements="filteredElements"
          :showButton="
            $route.name !== 'Homepage' &&
            allElements.length > filteredElements.length
          "
        ></OverzichtWerk>
      </template>
      <div id="crawl-links">
        <template v-for="el in allElements" :key="databankName + el._id">
          <NuxtLink
            v-if="el.content.slug"
            :to="`/${databankName}/${el.content.slug}`"
          ></NuxtLink>
        </template>
      </div>
    </template>
  </section>
  <section class="contentblock text-danger" v-else>
    <p>no content available</p>
  </section>
</template>

<style lang="scss" scoped>
#crawl-links {
  opacity: 0;
  visibility: hidden;
  position: absolute;
  bottom: -999vh;
}
</style>
