<template>
  <div>{{ $route.params.name }}</div>
  <router-view></router-view>
  <router-link v-for="route in $router.getRoutes()" :key="route.path" :to="route.path">{{ route.name }}</router-link>
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';
import router from './router/index.js'
import MyPage from './components/MyPage.vue'
import axios from 'axios';

const API_URL_BASE = `https://api-cre8ion.tc8l.dev/api/`

export default {
  setup() {
    const store = useStore();
    const isAuthenticated = computed(() => store.getters.isAuthenticated);

    return { isAuthenticated };
  },
  async created() {
    await this.getRoutes()
  },
  methods: {
    async getRoutes() {
      const apiURl = API_URL_BASE + `navigation`
      try {
        axios.get(apiURl, {
          headers: { 'Content-Type': 'application/json;charset=UTF-8', "Access-Control-Allow-Origin": "*", }
        }).then(response => {
          response.data.forEach(page => {
            if (!router.hasRoute(page.name)) {
              const route = {
                path: page.url,
                name: page.name,
                component: MyPage,
                props: { id: page.id }
              }
              router.addRoute(route);
            }
          });
          router.push(router.getRoutes()[0].path)
        })
      } catch (error) {
        console.error(error)
      }
    }
  }
};
</script>
