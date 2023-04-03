<template>
  <button id="menu-btn" @click="showMenu = !showMenu">
    <img :class="{ up: !showMenu }" src="./assets/fa-chevron-down.svg" alt="toggle menu">
  </button>

  <Transition name="menuitem">
    <nav v-if="showMenu">
      <router-link class="one" to="/">Home</router-link>
      <router-link class="two" to="/about">About</router-link>
    </nav>
  </Transition>
  <router-view />
</template>


<script>
import './assets/main.scss'

export default {
  data() {
    return {
      showMenu: false
    }
  }
}
</script>


<style lang="scss">
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
    font-weight: bold;
    font-size: .8vw;
    padding: .5rem 1vw;
    border-radius: 30px;
    background-color: var(--tan);

  }
}

.menuitem-enter-active,
.menuitem-leave-active {
  transition-duration: .7s;

  a {
    transition: all .5s ease-in-out;
  }
}

.menuitem-leave-active .one,
.menuitem-enter-active .two {
  transition-delay: .2s;
}

.menuitem-enter-from,
.menuitem-leave-to {
  a {
    transform: translateY(-200%);
  }
}

.menubtn-enter-active {
  transition: all .3s ease-out;
}

.menubtn-enter-from {
  transform: rotate(270deg);
}
</style>
