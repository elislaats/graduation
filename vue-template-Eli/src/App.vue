<template>
  <router-view></router-view>
  <NavBar :routes="currentRoutes"></NavBar>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex'
import NavBar from './components/NavBar.vue'

export default {
  setup() {
    const store = useStore()
    const isAuthenticated = computed(() => store.getters.isAuthenticated);
    store.dispatch('loadRoutes')
    return { isAuthenticated };
  },
  components: {
    NavBar
  },
  data(){
    return{
      currentRoutes: this.$router.getRoutes()
    }
  },
  computed: {
    routes () {
      return this.$store.state.routes
    }
  },
  watch: {
    routes(value){
      const newRoutes = JSON.parse(JSON.stringify(value))
      newRoutes.forEach(route => {
        route.component = () => import('@/views/DynamicView.vue')
        this.$router.addRoute(route)
      })
      this.$router.push('/homepage')
      this.currentRoutes = this.$router.getRoutes()
    }
  }
};
</script>
