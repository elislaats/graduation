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
    <Picture> </Picture>
  </main>
</template>

<style scoped>

main{
  grid-template-columns: repeat(auto-fit, minmax(200px, 300px));
  grid-template-rows: repeat(auto-fit, minmax(200px, 300px));
  gap: 1rem;
  align-items: center;
  justify-content: center;
}
</style>
