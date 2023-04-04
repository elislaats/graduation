<template>
    <router-view></router-view>
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';

export default {
  setup() {
    const store = useStore();
    const isAuthenticated = computed(() => store.getters.isAuthenticated);

    store.dispatch('getRoutes')

    return { isAuthenticated };
  }
};
</script>
