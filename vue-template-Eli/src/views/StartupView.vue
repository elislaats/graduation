<template>
  <div class="grid">
    <div class="col-1-1 flex justify-end">
    </div>
  </div>
  <div class="grid">
    <div class="col-1-1">
      <h2>Loading</h2>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';

export default {
  name: 'StartupView',
  setup() {
    return { store: useStore() };
  }
};
</script>
