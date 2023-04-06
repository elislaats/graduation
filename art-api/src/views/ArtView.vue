<template>
  <ArtworkComp :key="index"></ArtworkComp>
  <button @click="this.index++"><img src="../assets/fa-refresh.svg" alt="refresh"></button>
</template>

<script>
import ArtworkComp from '../components/ArtworkComp.vue'

export default {
  name: 'ArtView',
  data() {
    return {
      index: 0
    }
  },
  components: {
    ArtworkComp
  }
}
</script>

<style lang="scss" scoped>
button {
  background-color: var(--offwhite);
  border: none;
  position: absolute;
  width: 3vw;
  height: 3vw;
  border-radius: 3vw;
  bottom: 5vh;
  right: 5vh;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: .1s ease-out;
  box-shadow: 3px 3px 6px var(--oxford-blue);

  img {
    width: 60%;
    height: auto;
  }

  &:hover {
    box-shadow: none;

    img {
      animation: 1.5s rotate linear infinite;
    }
  }

}
</style>