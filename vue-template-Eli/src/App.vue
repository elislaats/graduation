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
  mounted(){
    this.$store.dispatch('loadRoutes')
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
        this.$router.addRoute(route)
      })
      this.currentRoutes = this.$router.getRoutes()
    }
  }
};
</script>
