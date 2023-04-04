<template>
  <ArtworkComp></ArtworkComp>
</template>

<script>
import ArtworkComp from '../components/ArtworkComp.vue'

export default {
  name: 'HomeView',
  components: {
    ArtworkComp
  }
}
</script>

<style lang="scss">
#app {
  display: grid;
  justify-content: center;
  align-items: center;
}
</style>