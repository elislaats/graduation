<template>
  <div class="grid">
    <div class="col-1-1 flex justify-end">
      <button
        @click="store.dispatch('logout')"
        class="btn btn-primary text-uppercase rounded-corners"
      >
        Uitloggen
      </button>
    </div>
  </div>
  <div class="grid">
    <div class="col-1-1">
      <h2>Home screen</h2>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';

export default {
  name: 'HomeScreen',
  setup() {
    return { store: useStore() };
  }
};
</script>
