<script setup>
const props = defineProps(useDefaultProps());

const databankName = props.info._name
  .replace(" overzicht", "")
  .replace("overzicht", "")
  .replace("Vacature", "vacatures")
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

const specificItems = computed(() => {
  if (props.data["cases"]) {
    return props.data["cases"];
  } else if (props.data["onsWerk"]) {
    return props.data["onsWerk"];
  } else {
    return null;
  }
});

if (props.data.maximaalWeerTeGevenArtikelen) {
  page.value.amount = parseInt(props.data.maximaalWeerTeGevenArtikelen);
} else if (props.info._name == "Nieuwsoverzicht") {
  page.value.amount = 1;
}

function getDbId() {
  if (props.data.aanvullenMet) {
    return parseInt(props.data.aanvullenMet);
  } else {
    return getDatabankIdFromName(databankName);
  }
}

const filteredElements = computed(() => {
  if (specificItems.value) {
    const idList = specificItems.value.split(", ");
    let foundItems = [];
    allElements.value.forEach((element) => {
      idList.forEach((id) => {
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
          @scrolled-down="handleScroll()"
          :elements="filteredElements"
        ></OverzichtWerk>
      </template>

      <template v-if="databankId == 1071">
        <div class="grid">
          <h2 class="col-1-1">{{ data.titel }}</h2>
          <OverzichtMedewerkers
            :elements="filteredElements"
          ></OverzichtMedewerkers>
        </div>
      </template>

      <template v-if="info._id == 71">
        <OverzichtVacatures
          :titel="data.label"
          :elements="filteredElements"
        ></OverzichtVacatures>
      </template>

      <template v-if="info._id == 50">
        <OverzichtNieuws
          @scrolled-down="handleScroll()"
          :elements="filteredElements"
        ></OverzichtNieuws>
      </template>

      <div id="crawl-links">
        <!-- hidden div just to create crawlable links-->
        <template v-for="el in allElements" :key="databankName + el._id">
          <NuxtLink
            v-if="el.content.slug && databankName != 'medewerkers'"
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
