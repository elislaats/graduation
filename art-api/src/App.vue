<template>
  <button id="menu-btn" @click="showMenu = !showMenu">
    <img :class="{ up: !showMenu }" src="./assets/fa-chevron-down.svg" alt="toggle menu">
  </button>

  <Transition name="menuitem">
    <nav v-if="showMenu">
      <router-link @click="showMenu = false" class="one" to="/">Home</router-link>
      <router-link @click="showMenu = false" class="two" to="/art">Art</router-link>
    </nav>
  </Transition>
  <router-view />
</template>


<script>
import './assets/main.scss'
import axios from 'axios';

export default {
  data() {
    return {
      showMenu: false
    }
  },
  created() {

  },
  methods: {
    async getIdList() {
      try {
        axios.get(`https://api.artic.edu/api/v1/artworks?fields=id`)
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>


<style scoped lang="scss">
#menu-btn {
  z-index: 10;
  position: fixed;
  top: 1rem;
  right: 1rem;
  width: 2.2rem;
  background: none;
  border: none;

  &:hover {
    cursor: pointer;
  }

  img {
    transition: transform .75s ease-out;

    &.up {
      transform: rotate(540deg);
    }
  }

}

nav {
  z-index: 10;
  position: fixed;
  top: 1rem;
  right: 5rem;
  display: flex;
  flex-direction: row-reverse;
  justify-content: stretch;
  gap: 1vw;

  a {
    text-align: center;
    text-decoration: none;
    color: var(--chocolate-cosmos);
    text-transform: uppercase;
    font-weight: bolder;
    font-size: .8vw;
    padding: .5rem 1vw;
    border-radius: 30px;
    background-color: var(--tan);
    box-shadow: 3px 3px 7px rgba(0, 0, 0, .7);
    transition: .15s ease;

    &:hover {
      transform: scale(.95);
      box-shadow: none;
    }
  }
}
</style>
