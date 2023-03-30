<script>
import Picture from '../components/Picture.vue'

export default {
  components: {
    Picture
  }
}

</script>

<template>
  <main>
    <Picture> </Picture>
    <Picture> </Picture>
    <Picture> </Picture>
    <Picture> </Picture>
    <Picture> </Picture>
    <Picture> </Picture>
  </main>
</template>

<style scoped>
main {
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr 1fr;
  gap: 2rem;
  align-items: center;
  justify-items: center;
  justify-content: center;
}
</style>
