<template>
  <nav
    id="navbar"
    class="flex col-1-1 justify-space-around bg-white"
  >
    <template v-for="(route, index) in $router.getRoutes()">
      <NuxtLink
        class="text-grey"
        v-if="route.meta.mainRoute"
        v-bind:key="route.name"
        v-bind:to="route.path"
        v-text="route.name"
      />
    </template>
  </nav>
</template>