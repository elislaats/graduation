<template>
  <nav class="navBar">
    <template v-for="route in $router.options.routes">
      <NuxtLink
        v-if="route.name && !route.name?.toString().includes('detail')"
        :to="route.path"
        :class="'btn navLink ' + route.name.toString().replaceAll(' ', '').toLowerCase()"
        :active-class="'text-primary'"
      >
        {{ route.name }}
      </NuxtLink>
    </template>
    <div class="spacer-top"></div>
    <div class="spacer-bottom"></div>
  </nav>
</template>

<style lang="scss">
.navBar {
  width: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  z-index: 9999;
  position: fixed;
  left: 0;
  top: 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.4);
  display: grid;
  grid-template: 1fr 1fr / 31rem 1fr repeat(3, max-content);
  .spacer-top {
    grid-area: 1 / 2 / 1 / 2;
    border-bottom: 1px solid rgba(255, 255, 255, 0.4);
  }
  .spacer-bottom {
    grid-area: 2 / 2 / last-line / 2;
  }
  .navLink {
    text-transform: uppercase;
    font-size: medium;
    &.homepage {
      grid-area: 1 / 1 / last-line / 1;
      border-right: 1px solid rgba(255, 255, 255, 0.4);
    }
    &.nieuws,
    &.vacatures,
    &.contact {
      grid-row: 1 / 1;
      border-bottom: 1px solid rgba(255, 255, 255, 0.4);
    }
    &.cases,
    &.onswerk,
    &.overons {
      grid-row: 2 / 2;
      border-left: 1px solid rgba(255, 255, 255, 0.4);
    }
  }
}
</style>
