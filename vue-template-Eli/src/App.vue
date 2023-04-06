<template>
    <NavBar :routes="currentRoutes"></NavBar>
    <router-view></router-view>
</template>

<script>
import NavBar from './components/NavBar.vue'

export default {
  created() {
    this.$store.dispatch('loadRoutes')
  },
  components: {
    NavBar
  },
  data() {
    return {
      currentRoutes: this.$router.getRoutes()
    }
  },
  computed: {
    routes() {
      return this.$store.state.routes
    }
  },
  watch: {
    routes(value) {
      const newRoutes = JSON.parse(JSON.stringify(value))
      newRoutes.forEach(route => {
        route.component = () => import('@/views/DynamicView.vue')
        this.$router.addRoute(route)
      })
      this.$router.push('/homepage')
      this.$router.removeRoute('loading')
      this.currentRoutes = this.$router.getRoutes()
    }
  }
};
</script>
