<script setup>
import { ref } from "vue";
const hover = ref(false);
</script>

<template>
  <a
    class="gh-link bg-primary flex align-center"
    href="https://github.com/elislaats/graduation/issues/new/choose"
    target="_blank"
    @mouseover="hover = true"
    @mouseleave="hover = false"
    :class="{active : hover}"
  >
    <img src="../assets/github-mark-white.svg" alt="github logo" />
    <Transition name="text">
      <span class="text-white" v-show="hover">Feedback geven</span>
    </Transition>
  </a>
</template>

<style lang="scss" scoped>
.gh-link {
  text-decoration: none;
  position: absolute;
  border-radius: 5rem;
  width: 5rem;
  height: 5rem;
  padding: 1rem;
  gap: 1rem;
  right: 3vh;
  bottom: 3vh;
  transition: width 0.3s ease-out;
  border: 2px solid white;
  overflow:hidden;

  &.active {
    width: 16rem;
  }

  span{
    font-size: small;
  }

  img {
    height: 100%;
    aspect-ratio: 1 / 1;
  }
}

.text-enter-active{
    transition: all 0.3s ease-out;
    transition-delay: .3s;
}

.text-enter-from{
    opacity: 0;
    transform: scaleX(0.3)
}
</style>