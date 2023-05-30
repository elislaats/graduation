<script setup>
const navRoutes = computed(() => {
  const allRoutes = useRouter().getRoutes();
  let routes = [];
  allRoutes.forEach((route) => {
    if (route.name && !route.aliasOf) {
      routes.push(route);
    }
  });
  return routes;
});

const topMenu = computed(() => {
  const topEx = /Nieuws|Vacatures|Contact/i;
  return checkRoutes(topEx, navRoutes.value);
});
const bottomMenu = computed(() => {
  const bottomEx = /Cases|Ons werk|Over ons/i;
  return checkRoutes(bottomEx, navRoutes.value);
});

function checkRoutes(expression, routeList) {
  const passed = [];
  routeList.forEach((route) => {
    if (expression.test(route.name)) {
      passed.push(route);
    }
  });
  return passed;
}
</script>

<template>
  <header class="header" v-if="navRoutes">
    <!-- allways display: logo with link to homepage-->
    <NuxtLink class="logo-link" :to="'/'">
      <img
        class="logo-img"
        src="~/assets/images/logo_cre8ion_white.svg"
        alt="The Cre8ion.Lab"
      />
    </NuxtLink>
    <div class="main-menu">
      <nav class="menu-bar top" v-if="topMenu">
        <!-- top menu items-->
        <ul class="menu-bar-inner">
          <li class="menu-item" v-for="route in topMenu">
            <NuxtLink :to="route.path"> {{ route.name }} </NuxtLink>
          </li>
        </ul>
      </nav>

      <nav class="menu-bar bottom" v-if="bottomMenu">
        <!-- bottom menu items-->
        <ul class="menu-bar-inner">
          <li class="menu-item" v-for="route in bottomMenu">
            <NuxtLink :to="route.path"> {{ route.name }} </NuxtLink>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  width: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  z-index: 9999;
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  align-items: stretch;
  .logo-link {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2.5rem 3rem;
    border-right: 1px solid rgba(255, 255, 255, 0.4);
    border-bottom: 1px solid rgba(255, 255, 255, 0.4);
    .logo-image {
      height: 5rem;
    }
  }
  .main-menu {
    flex-grow: 2;
    display: flex;
    flex-direction: column;
    justify-content: stretch;
    align-items: stretch;
    .menu-bar {
      display: flex;
      align-items: stretch;
      justify-content: flex-end;
      flex-grow: 1;
      border-bottom: 1px solid rgba(255, 255, 255, 0.4);
      .menu-bar-inner {
        list-style: none;
        display: flex;
        .menu-item {
          display: flex;
          justify-content: center;
          align-items: center;
          a {
            text-transform: uppercase;
            text-decoration: none;
            &:hover{
                color: $primary-color;
            }
          }
        }
      }
      &.top {
        .menu-item {
          padding: 0 1.5rem;
        }
      }
      &.bottom {
        .menu-item {
          padding: 0 3rem;
          border-left: 1px solid rgba(255, 255, 255, 0.4);
        }
      }
    }
  }
}
</style>
