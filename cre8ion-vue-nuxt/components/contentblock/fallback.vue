<script setup>
const props = defineProps(useDefaultProps());
</script>

<template>
  <section class="contentblock" v-if="info && data">
    <div class="grid grid-pad bg-grey-dark p-2">
      <div class="col-1-3">
        <h4 class="text-primary">{{ info._id }}: {{ info._name }}</h4>
        <h5>Geen component gevonden</h5>
      </div>
      <div class="col-2-3">
        <p :style="{ fontSize: 'larger' }" class="mb-1">
          <strong>Data:</strong>
        </p>
        <p v-for="(value, key) in data" class="mb-1">
          <span class="text-primary">{{ key }}: </span>
          <span v-if="value">{{ value }}</span>
          <i class="text-danger" v-else>leeg</i>
        </p>
      </div>
    </div>
  </section>
  <section class="contentblock text-danger" v-else>
    <p>no content available</p>
  </section>
</template>